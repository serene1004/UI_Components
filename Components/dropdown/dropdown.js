/**
 * ## select Tag를 멀티/단일선택이 가능한 커스텀 UI로 변경해주는 기능
 * 
 * - init()     - 셀렉트태그를 드롭다운으로 변환하고 동작 될 수 있도록합니다.
 * - add()      - 드롭다운의 목록에서 특정값을 선택처리합니다.
 * - remove()   - 드롭다운의 선택되어있는 목록에서 특정값을 선택해제합니다.
 * - getData()  - 드롭다운에서 선택되어있는 목록데이터를 array로 가져옵니다.
 * - reset()    - 드롭다운을 선택목록을 모두 초기화합니다. unmodifiable된 값은 예외입니다.
 */
class Dropdown {
    /**
     * @param {string} selectId - select id
     */
    constructor(selectId) {
        this.selectTag = document.querySelector(`#${selectId}`);
        this.id = selectId;
        this.data = [];
        this.multiple;
        this.selectedItem = [];
        this.placeholder;
        this.unmodifiable = [];

        for (let key of this.selectTag.children) {
            const title = key.innerText;
            const value = key.value;
            const selected = false;
            const dropdownData = {
                title,
                value,
                selected
            };
            this.data.push(dropdownData);
        }

        /**
         * Dropdown 실행
         * @param {Object} options : 드롭다운실행 시 설정할 옵션값.
         * 
         * - multiple : true|false,   (default: true)      - 다중선택 가능여부에 대한 선택입니다.
         * - placeholder : string     (default: undefined) - 플레이스홀더 문구를 설정합니다.
         * - selectedItem : array     (default: undefined) - 셀렉트박스 렌더링 시 선택되어있는 아이템목록입니다.
         * - unmodifiable : array     (default: undefined) - chip목록에서 삭제할 수 없는 값을 설정합니다.
         * - resetButtonLang : string (default: 'reset')   - reset버튼의 텍스트를 설정합니다.
         */
        this.init = function(options) {
            if (options) {
                this.multiple = options.multiple !== undefined ? options.multiple : true;
                this.placeholder = options.placeholder !== undefined ? options.placeholder : this.placeholder;
                this.selectedItem = options.selectedItem !== undefined ? options.selectedItem : this.selectedItem;
                this.unmodifiable = options.unmodifiable !== undefined ? options.unmodifiable : this.unmodifiable;
                this.resetButtonLang = options.resetButtonLang !== undefined ? options.resetButtonLang : 'reset';

                if (this.selectedItem.length !== 0) {
                    this.data.forEach(dataItem => {
                        if (this.selectedItem.includes(dataItem.value)) {
                            dataItem.selected = true;
                        }
                    });
                }
            } else {
                this.multiple = true;
                this.placeholder = this.placeholder;
                this.selectedItem = this.selectedItem;
                this.unmodifiable = this.unmodifiable;
                this.resetButtonLang = 'reset';
            }

            const select = document.querySelector(`#${this.id}`);
            const dropdown = document.createElement('div');
            
            dropdown.setAttribute('id', this.id);
            dropdown.classList.add('dropdown');
            
            // 드롭다운 추가 후 기존 select태그 제거
            select.parentElement.appendChild(dropdown);
            select.remove();

            // 커스텀을 위한 태그생성
            const dropdownBtn = document.createElement('button');
            const dropdownBtnText = document.createElement('span');
            
            dropdownBtn.setAttribute('type', 'button');
            dropdownBtn.classList.add('dropdown_btn');
            dropdownBtnText.classList.add('dropdown_btn_text');
            dropdownBtnText.textContent = this.placeholder;
            
            dropdownBtn.appendChild(dropdownBtnText);
            
            const option = document.createElement('div');
            const optionList = document.createElement('div');
            
            option.classList.add('option');
            optionList.classList.add('option_list');
            
            dropdown.appendChild(dropdownBtn);
            dropdown.appendChild(option);
            option.appendChild(optionList);

            if (this.multiple === true) {
                const chipBox = document.createElement('div');
                const resetBtn = document.createElement('button');

                chipBox.setAttribute('class', 'chipBox');
                resetBtn.setAttribute('type', 'button');
                resetBtn.classList.add('dropdown_reset');
                dropdown.classList.add('dropdown', 'multiple');

                resetBtn.textContent = this.resetButtonLang;
                
                dropdownBtn.appendChild(chipBox);
                dropdownBtn.appendChild(resetBtn);

                const paddingRightValue = resetBtn.clientWidth + 16;
                dropdownBtn.style.paddingRight = `${paddingRightValue}px`;
            }

            // 옵션리스트 생성
            for (let i = 0; i < this.data.length; i++) {
                const optionItem = document.createElement('button');
                optionItem.setAttribute('type', 'button');
                optionItem.setAttribute('class', this.data[i].selected ? 'option_item selected' : 'option_item');
                optionItem.setAttribute('value', this.data[i].value);
                optionItem.textContent = this.data[i].title;
            
                if (this.data[i].selected) {
                    const chip = createChip(this.data[i].title, this.data[i].value, this.unmodifiable);
                    dropdownBtnText.classList.add('hide');
                    dropdown.querySelector('.chipBox').insertAdjacentElement('beforeend', chip);
                }
            
                optionList.insertAdjacentElement('beforeend', optionItem);
            }
            
            // 클릭이벤트
            document.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdowns = document.querySelectorAll('.dropdown');

                dropdowns.forEach((el) => {
                    if (!el.contains(e.target)) {
                        el.classList.remove('on');
                    }
                });
                
                if (e.target.parentNode.id === dropdown.id) {
                    if (!e.target.parentNode.classList.contains('on')) {
                        e.target.parentNode.classList.add('on');
                    } else {
                        e.target.parentNode.classList.remove('on')
                    }
                };
            });

            if (this.multiple) {    // 다중선택이 가능한 셀렉트박스인경우
                dropdown.querySelectorAll('.option_item').forEach(el => {
                    el.addEventListener('click', e => {
                        this.add(e.target.value);
                    })
                });

                // X버튼 클릭시 chip제거
                dropdown.querySelector('.chipBox').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (e.target.tagName === 'BUTTON') {
                        this.remove(e.target.nextElementSibling.value);
                    }
                });

                // reset버튼 클릭이벤트
                dropdown.querySelector('.dropdown_reset').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.reset();
                });
            } else {    // 단일선택 셀렉트박스인 경우
                dropdown.querySelectorAll('.option_item').forEach(el => {
                    el.addEventListener('click', function() {
                        removeClass();
                        el.classList.add('selected');
                        dropdownBtnText.textContent = el.innerText;
                    })
                });

                function removeClass() {
                    dropdown.querySelectorAll('.option_item').forEach(el => {
                        el.classList.remove('selected');
                    })
                }
            }

            // 칩생성함수
            function createChip(title, value, unmodifiable) {
                const chip = document.createElement('span');
                const itemName = document.createElement('span');
                const chipBtn = document.createElement('button');
                const inputHidden = document.createElement('input');
            
                chip.setAttribute('class', 'chip');
                inputHidden.setAttribute('type', 'hidden');
                inputHidden.setAttribute('value', value);
                itemName.textContent = title;
            
                chipBtn.setAttribute('type', 'button');
                chip.appendChild(itemName);
                chip.appendChild(chipBtn);
                chip.appendChild(inputHidden);
            
                if (unmodifiable.includes(value)) {
                    chipBtn.setAttribute('disabled', true);
                }
            
                return chip;
            }
        }
    }

    /**
     * 드롭다운 목록선택 및 칩 생성
     * @param {string|array} - 드롭다운에서 선택처리할 값
     */
    add(data) {
        const dropdown = document.querySelector(`#${this.id}`);
        const dropdownBtnText = dropdown.querySelector('.dropdown_btn_text');

        /**
         * 새로운 칩을 생성
         * @param {string} title - 칩에 표시할 텍스트
         * @param {string} value - 칩과 연결될 값
         */
        function createChip(title, value) {
            const chip = document.createElement('span');
            const itemName = document.createElement('span');
            const chipBtn = document.createElement('button');
            const inputHidden = document.createElement('input');

            chip.setAttribute('class', 'chip');
            inputHidden.setAttribute('type', 'hidden');
            inputHidden.setAttribute('value', value);
            itemName.textContent = title;

            chipBtn.setAttribute('type', 'button');
            chip.appendChild(itemName);
            chip.appendChild(chipBtn);
            chip.appendChild(inputHidden);

            return chip;
        }

        function handleDataItem(dataItem) {
            const selectedOption = dropdown.querySelector(`.option_item[value="${dataItem}"]`);
          
            if (selectedOption && !selectedOption.classList.contains('selected')) {
                const chip = createChip(selectedOption.innerText, dataItem);
                dropdown.querySelector('.chipBox').appendChild(chip);
                selectedOption.classList.add('selected');
            }
        }
          
        if (Array.isArray(data)) {
            data.forEach(handleDataItem);
        } else if (typeof data === 'string') {
            handleDataItem(data);
        }
        
        dropdownBtnText.classList.add('hide');
    }
    
    /**
     * 드롭다운 선택해제 및 칩 제거
     * @param {string|array} - 드롭다운에서 선택해제할 값
     */
    remove(data) {
        const dropdown = document.querySelector(`#${this.id}`);
        const dropdownBtnText = dropdown.querySelector('.dropdown_btn_text');
        const chipBox = dropdown.querySelector('.chipBox');
        const valuesToRemove = Array.isArray(data) ? data : [data];
      
        valuesToRemove.forEach(value => {
            const chip = chipBox.querySelector(`.chip input[value="${value}"]`);
            
            if (this.unmodifiable.includes(value)) {
                console.log(`${value}는 삭제할 수 없습니다.`);
                return;
            }
            
            dropdown.querySelectorAll('.option_item').forEach(el => {
                if (el.value === value) {
                    el.classList.remove('selected');
                }
            });
            
            if (chip) {
                chip.parentElement.remove();
            }
        });
      
        if (chipBox.children.length === 0) {
            dropdownBtnText.classList.remove('hide');
        }
    }

    /**
     * Dropdown의 데이터 배열 반환.
     * @returns {Array<Object>|null} Dropdown의 데이터배열 반환
     */
    getData() {
        const dropdown = document.querySelector(`#${this.id}`);
        const data = [];
    
        dropdown.querySelectorAll('.option_item').forEach((el) => {
            if (el.classList.contains('selected')) {
                const title = el.innerText;
                const value = el.value;
                const dropdownData = {
                    title,
                    value
                };
                data.push(dropdownData);
            }
        });

        if (data.length === 0) {
            console.log(`${this.id}의 데이터가 없습니다.`, null);
            return null;
        } else {
            console.log(`${this.id}의 데이터`, data);
            return data;
        }
    }

    /**
     * Dropdown 초기화
     * unmodifiable로 지정된 값은 reset의 영향을 받지않음.
     */
    reset() {
        const dropdown = document.querySelector(`#${this.id}`);
        dropdown.querySelectorAll('.option_item').forEach((el) => {
            if (!this.unmodifiable.includes(el.value)) {
                el.classList.remove('selected');
            }
        });
    
        if (this.multiple === true) {
            dropdown.querySelectorAll('.chipBox .chip').forEach((el) => {
                if (!this.unmodifiable.includes(el.querySelector('input').value)) {
                    el.remove();
                }
            });
            if (this.unmodifiable.length === 0) {
                dropdown.querySelector('.dropdown_btn_text').classList.remove('hide');
            }
        } else {
            const dropdownBtnText = dropdown.querySelector('.dropdown_btn_text');
            dropdownBtnText.textContent = this.placeholder;
        }
    }
}