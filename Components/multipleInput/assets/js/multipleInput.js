const multipleInput = {
    init : function(id) {
        this.id = id;
        const multipleInputList = document.querySelector(`#${this.id} label`);
        const input = document.querySelector(`#${this.id} input`);
        const resetBtn = document.querySelector(`#${this.id} .reset-btn`);
        let values;
        let setValue;
        let data = [];

        input.setAttribute('id', `${this.id}Input`);
        multipleInputList.setAttribute('for', `${this.id}Input`);

        input.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                values = this.value.replace(/\t/g, ' ').split(' ');
                setValue = new Set(values);
                setValue = [...setValue];
                
                setValue = setValue.filter(function(item) {
                    return item !== '';
                });

                // multipleInputList에 item이 없다면 데이터초기화
                if (multipleInputList.querySelectorAll('.multipleInput_item').length === 0) {
                    data = [];
                }

                setValue.forEach(el => {
                    if (!data.includes(el)) {
                        multipleInputList.insertAdjacentElement('beforeend', multipleInput.createTagItem(el));
                    } else {
                        alert(`${el}은 이미 입력되어있습니다.`)
                    }
                })
                input.value = '';

                multipleInputList.querySelectorAll('.multipleInput_item').forEach(el => {
                    if (!data.includes(el.innerText)) {
                        data.push(el.querySelector('input').value);
                    }
                })
            }
        });

        // x버튼 클릭 시 데이터초기화 후 multipleInputList에 남아있는 item의 value들로 데이터변경
        multipleInputList.addEventListener('click', function(e) {
            data = [];

            if (e.target.classList.contains('remove-btn')) {
                e.target.parentNode.remove();
            }
            multipleInputList.querySelectorAll('.multipleInput_item').forEach(el => {
                data.push(el.querySelector('input').value);
            })
        });

        resetBtn.addEventListener('click', this.reset);
    },
    getData : function(id) {
        const multipleInputList = document.querySelector(`#${id} label`);
        data = [];
        
        multipleInputList.querySelectorAll('.multipleInput_item').forEach(el => {
            data.push(el.querySelector('input').value);
        });

        if (data.length !== 0) {
            return console.log(id, data);
        } else {
            return console.log(id, '데이터가 없습니다.');
        }
    },
    reset : function() {
        const multipleInputList = document.querySelector(`#${this.parentNode.parentNode.id} label`);

        multipleInputList.querySelectorAll('.multipleInput_item').forEach(el => {
            el.remove();
        });
    },
    clear : function(id) {
        const multipleInputList = document.querySelector(`#${id} label`);

        multipleInputList.querySelectorAll('.multipleInput_item').forEach(el => {
            el.remove();
        });
    },
    createTagItem : function(value) {
        let tagItem = document.createElement('DIV');
        let span = document.createElement('SPAN');
        let removeBtn = document.createElement('BUTTON');
        let inputHidden = document.createElement('INPUT');

        tagItem.setAttribute('class', 'multipleInput_item');

        span.textContent = value;

        removeBtn.setAttribute('type', 'button');
        removeBtn.setAttribute('class', 'remove-btn');

        inputHidden.setAttribute('type', 'hidden');
        inputHidden.setAttribute('value', value);

        tagItem.insertAdjacentElement('beforeend', span);
        tagItem.insertAdjacentElement('beforeend', removeBtn);
        tagItem.insertAdjacentElement('beforeend', inputHidden);

        return tagItem;
    }
}