# 풀페이지 스크롤

![풀페이지 마우스휠](./fullpage_mousewheel.gif)

![풀페이지 터치](./fullpage_touch.gif)

풀페이지 스크롤이벤트를 적용해야하는 일이 생겨서 직접 구현함.

mousewheel로 구현하여 모바일에서는 touch이벤트를 사용

터치이벤트는 아래처럼 구현해봄.

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
        tE = tM;            // 터치엔드 Y값 = 터치무브 Y값
        tEX = tMX;          // 터치엔드 X값 = 터치무브 X값

        if (Math.abs(tS - tE) > Math.abs(tSX - tEX)) {  // 터치Y값이 터치X값보다 클 경우
            if (tS-tE > 0) {        // 터치시작지점과 끝나는 지점이 0보다 클경우
                pageDown ()         // pageDown() 실행
            } else if (tS-tE < 0) { // 터치시작지점과 끝나는 지점이 0보다 작을경우
                pageUp();           // pageUp() 실행
            }
        }
    })