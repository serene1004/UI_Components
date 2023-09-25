document.addEventListener('DOMContentLoaded', () => {
    const drawingBoard = document.getElementById('drawingBoard');
    const ctx = drawingBoard.getContext('2d');
    
    // header btn event
    function drawingBoardHeaderBtn () {
        let fold = document.querySelector('.fold');
        let full = document.querySelector('.full');
        let close = document.querySelector('.close');
    
        fold.addEventListener('click', ()=>{
            drawingBoard.classList.toggle('fold');
        })
        full.addEventListener('click', ()=>{
            drawingBoard.classList.toggle('full');
            document.querySelector('.canvas-box').classList.toggle('full');
        })
        close.addEventListener('click', ()=>{
            alert('창 닫을게~')
        })
    }
    drawingBoardHeaderBtn ();

    // draw event
    function drawing () {
        let mousedownState = false;

        const draw = e => {
            const x = e.offsetX;
            const y = e.offsetY;
            
            if (mousedownState === false) {
                return;
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        drawingBoard.addEventListener('mousedown', () => (mousedownState = true));
        drawingBoard.addEventListener('mousemove', draw);
        drawingBoard.addEventListener('mouseup', () => (mousedownState = false));

        // 설정버튼 같은걸 만들어서 크기나 색상등을 변경할수있게 만들어야할듯
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
    }
    drawing ();
})