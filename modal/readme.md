# 모달창만들기

![modal](./modal.gif)

모달창 생성시 화면 중앙에 배치시키기

1. top, left를 50%를 주고, transform으로 -50%씩 이동<br>
top, left: 50%, transform(-50%, -50%);

2. setProperty를 사용<br>
setProperty('top', 'calc(50% - '+(modalHeight/2)+'px)')<br>
setProperty('left', 'calc(50% - '+(modalWidth/2)+'px)')