class Dropdown {
    constructor(selectId) {
        this.selectTag = document.querySelector(`#${selectId}`);
        this.id = selectId;
        this.data = [];
        this.multiple;
        this.selectedItem = [];
        this.placeholder;
        this.unmodifiable;

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
         * 드롭다운 실행
         * @param {Object} options
         * multiple     - 다중선택 가능여부
         * placeholder  - 플레이스홀더문구
         * selectedItem - 선택되어있는 목록
         * unmodifiable - 수정불가한 값 지정
         */
        this.init = function(options) {
            if (options) {
                this.multiple = options.multiple !== undefined ? options.multiple : true;
                this.placeholder = options.placeholder !== undefined ? options.placeholder : this.placeholder;
                this.unmodifiable = options.unmodifiable !== undefined ? options.unmodifiable : this.unmodifiable;
                this.selectedItem = options.selectedItem !== undefined ? options.selectedItem : this.selectedItem;

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
                this.unmodifiable = this.unmodifiable;
                this.selectedItem = this.selectedItem;
            }

            const select = document.querySelector(`#${this.id}`);
            const dropdown = document.createElement('div');
            
            dropdown.setAttribute('id', this.id);
            dropdown.classList.add('dropdown');
            
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

                resetBtn.textContent = 'reset';
                
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
                    const chip = createChips(this.data[i].title, this.data[i].value, this.unmodifiable);
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
                    el.addEventListener('click', function() {
                        el.classList.add('selected');
                        dropdown.querySelector('.chipBox').insertAdjacentElement('beforeend', createChips(el.innerText, el.value, this.unmodifiable));
                        dropdownBtnText.classList.add('hide');
                    })
                });

                // X버튼 클릭시 chip제거
                dropdown.querySelector('.chipBox').addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (e.target.tagName === 'BUTTON') {
                        dropdown.querySelectorAll('.option_item').forEach(el => {
                            if (el.value === e.target.nextElementSibling.value) {
                                el.classList.remove('selected');
                            }
                        })
                        e.target.parentElement.remove();
                    }

                    if (dropdown.querySelector('.chipBox').children.length === 0) {
                        dropdownBtnText.classList.remove('hide');
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

            // 멀티드롭다운의 칩생성함수
            function createChips(title, value, unmodifiable) {
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
            
                if (value === unmodifiable) {
                    chipBtn.setAttribute('disabled', true);
                }
            
                return chip;
            }
        }
    }

    /**
     * dropdown의 데이터를 추출하는 메서드
     *
     * @returns {Array<Object>|null} 드롭다운의 데이터배열을 반환.
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
     * 드롭다운을 초기화하는 메서드
     */
    reset() {
        const dropdown = document.querySelector(`#${this.id}`);
        dropdown.querySelectorAll('.option_item').forEach((el) => {
            el.classList.remove('selected');
        });
    
        if (this.multiple === true) {
            dropdown.querySelectorAll('.chipBox .chip').forEach((el) => {
                el.remove();
            });
            dropdown.querySelector('.dropdown_btn_text').classList.remove('hide');
        } else {
            const dropdownBtnText = dropdown.querySelector('.dropdown_btn_text');
            dropdownBtnText.textContent = this.placeholder;
        }
    }
}