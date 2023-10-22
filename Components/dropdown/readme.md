# 커스텀 드롭다운

select태그를 바꿔주는 드롭다운함수

    <!-- 기본 select -->
    <select id="customDropdown01">
        <option value="item01">아이템01</option>
        <option value="item02">아이템02</option>
        <option value="item03">아이템03</option>
        <option value="item04">아이템04</option>
        <option value="item05">아이템05</option>
        <option value="item06">아이템06</option>
        <option value="item07">아이템07</option>
    </select>

![multipleDropdown01](./multipleDropdown01.gif)

옵션으로 다중선택여부, 플레이스홀더 문구를 설정하여 드롭다운을 생성할 수 있다.

    const options = {
        multiple : true,
        placeholder : String, 
    }
    const dropdown = new Dropdown('selectId');
    dropdown.init(options);

![multipleDropdown01](./multipleDropdown02.gif)

옵션으로 선택되어있는 값과 수정 불가능한 값을 지정해 줄 수 있다.

    const selectedItemList = ['item01', 'item03'];
    const options = {
        multiple : true,
        placeholder : String, 
        selectedItem : selectedItemList,
        unmodifiable : 'item01'
    }
    const dropdown = new Dropdown('selectId');
    dropdown.init(options);

![dropdown](./dropdown.gif)

다중선택여부를 false로 설정하여 select태그를 커스터마이징한 형태로 생성할 수 있다.

    const options = {
        multiple : false,
        placeholder : String, 
    }
    const dropdown = new Dropdown('selectId');
    dropdown.init(options);

사용할 수 있는 메서드

    dropdown.getData(); // 드롭다운에서 선택되어있는 데이터
    dropdown.reset();   // 선택목록 초기화
