const main    = document.querySelector('.main');        // 메인
const section = document.querySelectorAll('section');   // 메인 섹션
const footer  = document.querySelector('.footer');      // 메인 푸터
let cnt = 0;        // 페이지를 구분하는 cnt값
let scrolling;      // 스크롤여부 제어

// 리사이즈 이벤트 발생 시 위치 재지정
window.addEventListener('resize', () => {
    if (cnt < section.length-1) {
        section.forEach(el => {
            el.style.transform = `translateY(-${el.clientHeight * cnt}px)`;
        })
    } else if (cnt == section.length-1 || cnt > section.length-1) {
        cnt = section.length-1;
        section.forEach(el => {
            el.style.transform = `translateY(-${el.clientHeight * (cnt-1)}px)`;
        })
    }
    footer.style.transform = `translateY(-${section[0].clientHeight * (cnt-1) + footer.clientHeight}px)`;
})

// PC모드 휠이벤트
document.querySelector('html').addEventListener('mousewheel', (e) => {
    if (!scrolling) {           // 스크롤중이 아니라면
        scrolling = setTimeout(() => {
            scrolling = null;   // 스크롤값 초기화
            
            if (e.deltaY > 0) {         // e.deltaY가 0보다 작으면
                pageDown();             // pageDown() 실행
            } else if (e.deltaY < 0) {  // e.deltaY가 0보다 크면
                pageUp();               // pageUp() 실행
            }
        }, 600)
    }
})

// 휠을 내리기 & 밑에서 위로 터치
function pageDown () {
    cnt++;                          // cnt증가
    if (cnt < section.length-1) {   // cnt가 마지막 섹션값보다 작을때
        // 섹션들의 translateY값 설정
        section.forEach(el => {
            el.style.transform = `translateY(-${el.clientHeight * cnt}px)`;
        })
    } else if (cnt == section.length-1 || cnt > section.length-1) { // cnt가 마지막 섹션값이거나 클때
        cnt = section.length-1;     // cnt는 length-1
    }
    // 푸터의 높이가 다르므로 translateY값을 따로 지정해줌
    footer.style.transform = `translateY(-${section[0].clientHeight * (cnt-1) + footer.clientHeight}px)`;
}

// 휠을 올리기 & 위에서 아래로 터치
function pageUp () {
    cnt--;          // cnt감소
    if (cnt < 0) {  // cnt가 0보다 작다면
        cnt = 0;    // cnt는 0
    }
    // 섹션들의 translateY값 설정
    section.forEach(el => {
        el.style.transform = `translateY(-${el.clientHeight * cnt}px)`;
    })
    // 푸터의 높이가 다르므로 translateY값을 따로 지정해줌
    footer.style.transform = `translateY(-${section[0].clientHeight * cnt}px)`;
}

// Mobile 터치이벤트 관련 변수
let tS, tM, tE, tSX, tMX, tEX;

// 터치이벤트 시작
window.addEventListener('touchstart', (e) => {
    tS = e.touches[0].pageY;    // 터치스타트 Y값
    tSX = e.touches[0].pageX;   // 터치스타트 X값
})
// 터치이벤트 이동
window.addEventListener('touchmove', (e) => {
    tM = e.touches[0].pageY;    // 터치무브 Y값
    tMX = e.touches[0].pageX;   // 터치무브 X값
})
// 터치이벤트 종료
window.addEventListener('touchend', (e) => {
    if (!scrolling) {           // 스크롤중이 아니라면
        scrolling = setTimeout(() => {
            scrolling = null;   // 스크롤값 초기화
            tE = tM;            // 터치엔드 Y값 = 터치무브 Y값
            tEX = tMX;          // 터치엔드 X값 = 터치무브 X값
            
            if (Math.abs(tS - tE) > Math.abs(tSX - tEX)) {  // 터치Y값이 터치X값보다 클 경우
                if (tS-tE > 0) {        // 터치시작지점과 끝나는 지점이 0보다 클경우
                    pageDown ()         // pageDown() 실행
                } else if (tS-tE < 0) { // 터치시작지점과 끝나는 지점이 0보다 작을경우
                    pageUp();           // pageUp() 실행
                }
            }
        }, 600)
    }
})