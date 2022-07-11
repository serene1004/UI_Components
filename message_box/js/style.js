window.addEventListener('DOMContentLoaded', (event) => {
    function resizeMessageBox () {
        let app = document.querySelector('.app');
        let resizeBox = document.querySelector('.box-wrap');
        let leftBox = document.querySelector('.box-wrap .left-box');
        let rightBox = document.querySelector('.box-wrap .right-box');
        let resizeLine = document.querySelector('.resize-line');
        let mouseDownState = false;

        resizeLine.addEventListener('mousedown', (e)=>{
            mouseDownState = true;
            app.classList.add('on');
        })
        resizeBox.addEventListener('mousemove', (e)=>{
            if (mouseDownState === true) {
                leftBox.style.width = e.clientX +'px';
                rightBox.style.width = 'calc(100% - '+ e.clientX +'px)';
            }
        })

        resizeBox.addEventListener('mouseup', (e)=>{
            mouseDownState = false;
            app.classList.remove('on');
        })
        resizeBox.addEventListener('mouseleave', (e)=>{
            mouseDownState = false;
            app.classList.remove('on');
        })
    }
    resizeMessageBox ();
});