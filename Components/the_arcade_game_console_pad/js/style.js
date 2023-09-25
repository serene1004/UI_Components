let joystickWrap = document.querySelector('.joystick');
let joystick = document.querySelector('.joystick button');
let button = document.querySelectorAll('.button_wrap button');

let mouseDown = null;
let x = 0;
let y = 0;

joystick.addEventListener('mousedown', function() {
    mouseDown = true;
})
joystick.addEventListener('mousemove', function(e) {
    if (mouseDown === true){
        x = e.offsetX - 40;
        y = e.offsetY - 40;

        // console.log(x);
        // console.log(y);
        joystick.style.transform = 'translate('+ x +'px, '+ y +'px)';
    }
    // joystick 영역에서 마우스가 벗어나면 move이벤트가 풀리도록
    joystickWrap.addEventListener('mouseleave', function() {
        joystick.style.transform = 'translate('+ 0 +'px, '+ 0 +'px)';
    });
});
document.addEventListener('mouseup', function() {
    mouseDown = false;
    joystick.style.transform = 'translate('+ 0 +'px, '+ 0 +'px)';
})

button.forEach(function (button) {
    button.addEventListener('click', function() {
        this.classList.add('on');

        setTimeout (function() {
            button.classList.remove('on');
        }, 100)
    })
});