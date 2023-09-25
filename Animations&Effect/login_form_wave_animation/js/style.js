const labels = document.querySelectorAll('.id_pw label');
const inputs = document.querySelectorAll('.id_pw input');

labels.forEach((label) => {        
    label.innerHTML = label.innerText
    .split("")
    .map((letter, idx) => {
        return `<span class="label_span" style="transition-delay: ${idx * 30}ms">${letter}</span>`;
    })
    .join("");
});

function setLoginFormAnimation () {
    let labelSpan = document.querySelectorAll('.label_span');

    window.addEventListener('load', function(){
        for (let i = 0; i < labels.length; i++) {
            if (inputs[i].value.length > 0) {
                for (let j = 0; j < labelSpan.length; j++) {
                    labels[i].children[j].classList.add('on');
                }
            }
        };
    });
    
    for (let i = 0; i < labels.length; i++) {
        inputs[i].addEventListener('focusout', function() {
            if (inputs[i].value.length > 0) {
                for (let j = 0; j < labelSpan.length; j++) {
                    labels[i].children[j].classList.add('on');
                }
            } else {
                for (let j = 0; j < labelSpan.length; j++) {
                    labels[i].children[j].classList.remove('on');
                }
            }
        });
    };        
};
setLoginFormAnimation();