let rouletteList = [];  // 룰렛에 적용할 배열
let cnt = 2;            // 최소개수 기본값 2개

// reset버튼 클릭시 룰렛초기화 함수 실행
document.querySelector('.btn-reset').addEventListener('click', () => {
    resetRoulette();
})

// 룰렛초기화
function resetRoulette () {
    document.querySelector('.option').style.display = 'flex';
    document.querySelector('.roulette').style.display = 'none';

    cnt = 2;
    document.querySelector('.cnt').innerText = `${cnt}개`
    document.querySelectorAll('.option_box .input-box').forEach(el => {
        el.remove();
    })
    let baseTemplate = `
        <div class="input-box">
            <label for="menu1">옵션1</label>
            <input type="text" id="menu1">
        </div>
        <div class="input-box">
            <label for="menu2">옵션2</label>
            <input type="text" id="menu2">
        </div>
    `
    document.querySelector('.option_box').insertAdjacentHTML('beforeend', baseTemplate);
    document.querySelector('.container h3').innerText = `룰렛 설정`;
    document.querySelector('.roulette-btn').innerText = `룰렛 돌리기`;
}

// 룰렛설정
function rouletteOptions () {
    let optionSet = document.querySelector('.option_set');
    let optCnt = document.querySelector('.cnt');
    let optionBox = document.querySelector('.option_box');
    cnt = 2;
    optCnt.innerText = `${cnt}개`
    
    optionSet.addEventListener('click', (e) => {        // optionSet클릭시
        if (e.target.classList.contains('min-btn')) {   // e.target가 min-btn클래스를 가지고있다면
            cnt--;                                      // cnt--
            if (cnt < 2) {                              // cnt가 2보다 작다면 cnt=2
                cnt = 2;
                alert('최소 2개까지 설정가능해요.');
                return;
            }
            optCnt.innerText = `${cnt}개`
            
            optionBox.children[cnt].remove();           // optionBox내 input-box remove.
        } else if (e.target.classList.contains('add-btn')) {    // e.target가 add-btn클래스를 가지고있다면
            cnt++;                                              // cnt++
            if (cnt > 12) {                                     // cnt가12보다 크다면 cnt=12
                cnt = 12;
                alert('최대 12개까지 설정가능해요.');
                return;
            }
            optCnt.innerText = `${cnt}개`

            // input-box템플릿을 optionBox에 추가
            let template = `
                <div class="input-box">
                    <label for="menu${cnt}">옵션${cnt}</label>
                    <input type="text" id="menu${cnt}">
                </div>
            `
            optionBox.insertAdjacentHTML('beforeend', template);
        }
    })

    // 룰렛설정 버튼 클릭시 룰렛생성 함수 실행
    document.querySelector('.btn-set').addEventListener('click', () => {
        document.querySelector('.container h3').innerText = `커스텀 룰렛`;
        createRoulette(cnt);
    })
}
rouletteOptions()

// 룰렛생성
function createRoulette (cnt) {
    const roulette = document.querySelector('#lunchRoulette');
    const rouletteBtn = document.querySelector('.roulette-btn');
    const ctx = roulette.getContext('2d');
    let colors   = ['#D2E5F7', '#FFFFFF']
    let rouletteListItem = document.querySelectorAll('.option_box input');

    rouletteList = [];  // 룰렛리스트
    
    for (let i = 0; i < cnt; i ++) {
        rouletteList.push(rouletteListItem[i].value)
    }

    // 옵션박스 숨기고 룰렛박스 보여지도록
    document.querySelector('.option').style.display = 'none';
    document.querySelector('.roulette').style.display = 'flex';

    const lunchRoulette = () => {
        const rad = roulette.width/2;
        const arc = Math.PI / (rouletteList.length / 2);

        for (let i = 0; i < rouletteList.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % (colors.length)];
            ctx.moveTo(rad, rad);
            ctx.arc(rad, rad, rad, arc * (i - 1), arc * i);
            ctx.fill();
            ctx.closePath();
        }

        ctx.font = "bold 18px Pretendard";
        ctx.textAlign = "center";

        const blueCircle = roulette.getContext('2d');
        blueCircle.beginPath();
        blueCircle.arc(rad, rad, rad/5, 0, 2 * Math.PI)
        blueCircle.fillStyle = `rgba(75, 150, 225, 0.25)`;
        blueCircle.fill();

        const whiteCircle = roulette.getContext('2d');
        whiteCircle.beginPath();
        whiteCircle.arc(rad, rad, rad/6, 0, 2 * Math.PI)
        whiteCircle.fillStyle = `white`;
        whiteCircle.fill();

        for (let i = 0; i < rouletteList.length; i++) {
            const angle = (arc * i) + (arc / 2);
            const posX = rad + Math.cos(angle) * (rad - 40);
            const posY = rad + Math.sin(angle) * (rad - 40);

            ctx.save();
            ctx.translate(posX, posY);
            ctx.rotate(angle + Math.PI / 2);
            
            rouletteList[i].split(" ").forEach(text => {
                ctx.fillStyle = "#191919";
                ctx.fillText(text, 0, 0);
            });
            ctx.restore();
        }
    }
    lunchRoulette();

    rouletteBtn.addEventListener('click', () => {
        roulette.style.transform = `rotate(0deg)`;
        roulette.style.transition = `all 0s`;
        rouletteBtn.setAttribute('disabled', true);

        setTimeout(() => {
            const random = Math.random() * 1000;
            const rRotate = Math.floor(random) + 1800;

            roulette.style.transform = `rotate(${rRotate}deg)`;
            roulette.style.transition = `all 3s cubic-bezier(0.5, 1, 0.5, 1)`;
        }, setTimeout(() => {
            rouletteBtn.removeAttribute('disabled');
            rouletteBtn.innerText = '다시 돌리기';
        }, 3000))
    })
}