/**
 * 
 */
var manager = new AccountManager();
//브라우저 로드될때 실행
window.onload = function() {
		
	init();
	eventResist();
};

/**
 * 샘플데이터 생성 및 accountManager에 데이터 담기
 */
function init() {
	//계좌 관리를 위한 AccountManager객체를 전역에 생성
	
	//샘플데이터 생성
	var acc1 = new Account('1002-654-832899', '박시원', '1234', 300000);
	var acc2 = new MinusAccount('1009-645-832899', '전상일', '1234', 30000, 1000000);
	var acc3 = new Account('1002-654-832900', '박호준', '1234', 500000);
	var acc4 = new MinusAccount('1009-654-832900', '박의수', '1234', 550000, 120000);
	var acc5 = new Account('1002-654-832901', '백욱기', '1234', 220000);
	var acc6 = new MinusAccount('1009-655-832899', '박시원', '1234', 300000, 1000);
	
	//매니저 객체에 담기
	manager.add(acc1);
	manager.add(acc2);
	manager.add(acc3);
	manager.add(acc4);
	manager.add(acc5);
	manager.add(acc6);
	
	//비번, 금액 input필드 비활성화
	disableInput();
}

/**
 * 브라우저에서 발생하는 이벤트 처리기능
 */
function eventResist() {
	
	// 계좌 종류 선택에 따른 입력영역 활성/비활성
	document.getElementsByName('accType')[0].onchange= accTypeEnabled;
	
	// 포커싱이벤트... 포커싱영역 style변경
	var curFocus = document.getElementsByClassName('inputField');
	for(var i=0; i<curFocus.length; i++){
		curFocus[i].setAttribute('onfocus', 'focused(this)');
		curFocus[i].setAttribute('onfocusout', 'focusOut(this)');
	}
	
	// 버튼이벤트
	var btn = document.querySelectorAll('.subBtn');
	
	// 조회 버튼... 계좌번호로 조회
	btn[0].onclick = accSearch;

	// 삭제 버튼... 계좌번호로 삭제
	btn[1].onclick = accRemove;
	
	//예금주명으로 계좌 조회
	// 검색 버튼 클릭 
	btn[2].onclick = ownSearch;
	// 예금주명 입력 후 enter
	var target = document.getElementsByName('accOwn')[0];
	target.onkeyup = function(e) {
		var event = e || window.event;
		if(event.keyCode == 13) //enter키일때
			ownSearch();
	}
	
	// 신규등록 
	// 신규등록버튼클릭 
	btn[3].onclick = addAcc;
	
	// 전체조회 버튼... 계좌타입에따라 다른 값 보여줌
	btn[4].onclick = getList;

	// input영역 입력값에 대한 검증을 위한 onchange속성 추가
	var inputF = document.querySelectorAll('.inputField')
	for(var i=0; i<inputF.length; i++){
		inputF[i].setAttribute('onchange', 'validate(this)');
	}
}

/**
 * 페이지가 로드될때 비밀번호, 금액 입력창 비활성화
 */
function disableInput() {
	document.getElementsByName('passwd')[0].setAttribute('disabled', 'disabled');
	document.getElementsByName('depositVal')[0].setAttribute('disabled', 'disabled');
	document.getElementsByName('loanVal')[0].setAttribute('disabled', 'disabled');
}

/**
 * 계좌종류 선택에따라 대출금액 비활성화해주는 기능
 */
function accTypeEnabled() {
	// 입력항목 선언 및 할당
	var inputs = document.getElementsByClassName('inputField');
	// 계좌종류가 입출금계좌이면
	if(document.getElementsByName('accType')[0].value.trim() == '입출금계좌'){
		// 대출금액 항목 제외하고 비활성 풀어줌
		for(var i=0; i<inputs.length; i++){
			inputs[i].removeAttribute('disabled');
		}
		document.getElementsByName('loanVal')[0].setAttribute('disabled', 'disabled');
		// 계좌선택 경고메시지 있으면 지워주기
		showAlertMsg('', document.getElementsByName('accType')[0].parentElement.getElementsByClassName('alertMsg')[0]);
	}else if(document.getElementsByName('accType')[0].value.trim() == '대출계좌'){
		// 입출금계좌가 아니면 대출금액항목 비활성 속성 삭제
		for(var i=0; i<inputs.length; i++){
			inputs[i].removeAttribute('disabled');
		}
		// 계좌선택 경고메시지 있으면 지워주기
		showAlertMsg('', document.getElementsByName('accType')[0].parentElement.getElementsByClassName('alertMsg')[0]);
	}else{
		disableInput();
	}
}

/**
 * 계좌번호를 통해 조회하는 기능
 */
function accSearch() {
	var findAccElement = document.getElementsByName('accountNum')[0];
	var findAcc = findAccElement.value.trim();
	var acc = manager.get(findAcc);
	// table 내용 삭제
	removeTable();
	// 유효성검증
	if(validate(findAccElement)){
		// 패턴맞고 찾는 계좌 있을경우
		if(manager.get(findAcc)){
			manager.createRow(acc);
		}else{
			//패턴은 맞으나 일치하는 계좌가 없는경우 메세지띄우는거 스낵바..?
			console.log('cooooooola')
		}
	}
}

/**
 * 계좌번호를 통한 삭제
 */
function accRemove() {

	var rAccElement = document.getElementsByName('accountNum')[0];
	var rAcc = rAccElement.value.trim();
	var rResult = manager.remove(rAcc);  //boolean
	removeTable();
	// 유효성검증
	if(validate(rAccElement)){
		if(rResult){
			//삭제알람 스낵바
			console.log('삭제성공!!!!!!!!!');
			rAccElement.value='';
		}else{
			// 일치계좌 없는거 스낵바
			console.log('일치계좌없어용');
		}
	}
}

/**
 * 예금주명으로 계좌조회
 */
function ownSearch() {
	var accOwnElement = document.getElementsByName('accOwn')[0];
	var accOwn = accOwnElement.value.trim();
	// table 내용 삭제
	removeTable();
	// 패턴이 맞으면 테이블에 결과출력 및 알림메시지 초기화
	if(validate(accOwnElement)){
		// 찾은 계좌 테이블에 붙여주기
		manager.search(accOwn);
		// 패턴은 일치하지만 찾는 결과가 없는경우 메시지띄우기
		if(document.getElementsByTagName('tr').length == 1){
			showAlertMsg('* 일치하는계좌가 없습니다.', accOwnElement.parentElement.getElementsByTagName('div')[0]);
		}else{ //패턴일치, 결과 있으면 메시지 초기화
			showAlertMsg('', accOwnElement.parentElement.getElementsByTagName('div')[0])
		}
	}
}

/**
 * 새 계좌 등록
 */
function addAcc() {
	// 추가할 계좌를 담을 계좌객체 선언
	var addAcc;
	// 계좌에 담길 값들 입력받은 element 선언 및 할당
	var accNum = document.getElementsByName('accountNum')[0];
	var accOwn = document.getElementsByName('accOwn')[0];
	var passwd = document.getElementsByName('passwd')[0];
	var deposit = document.getElementsByName('depositVal')[0];
	var loan = document.getElementsByName('loanVal')[0];

	//계좌 종류 확인
	var acctype = document.getElementsByName('accType')[0];
	var idx = acctype.selectedIndex
	var optionVal = acctype.options[idx].innerText;

	// 계좌종류 선택 알림 띄울 div element
	var alertDiv = acctype.parentElement.getElementsByClassName('alertMsg')[0];

	// 계좌 종류 선택 안했을 시 메시지 띄움
	if(optionVal.trim() == '전체'){
		showAlertMsg('계좌종류를 선택해 주세요', alertDiv);
	}else if(optionVal.trim() == '입출금계좌'){
		// 계좌 종류 선택-> 관련 알림 초기화
		showAlertMsg('', alertDiv);
		
		// 입출금계좌일때 대출금액항목 비활성화
		document.getElementsByName('loanVal')[0].setAttribute('disabled', 'disabled');

		// 각 element 유효성 검사 모두 true일 경우
		if(validate(accNum) && validate(accOwn) && validate(passwd) && validate(deposit)){
			addAcc = new Account(accNum.value, accOwn.value, passwd.value, deposit.value);
			if(!manager.add(addAcc)){
				showAlertMsg('계좌번호를 확인해주세요', accNum.parentElement.getElementsByClassName('alertMsg')[0]);
			}else {
				manager.add(addAcc);
				showAlertMsg('새 계좌를 등록하였습니다.', document.getElementsByName('loanVal')[0].parentElement.getElementsByClassName('alertMsg')[0]);
			}
		}
		
	}else if(optionVal.trim() == '대출계좌'){
		// 계좌 종류 선택-> 관련 알림 초기화
		showAlertMsg('', alertDiv);
		
		// 각 element 유효성 검사 모두 true일 경우
		if(validate(accNum) && validate(accOwn) && validate(passwd) && validate(deposit) && validate(loan)){
			addAcc = new MinusAccount(accNum.value, accOwn.value, passwd.value, deposit.value, loan.value);
			if(!manager.add(addAcc)){
				showAlertMsg('계좌번호를 확인해주세요', accNum.parentElement.getElementsByClassName('alertMsg')[0]);
			}else {
				manager.add(addAcc);
				showAlertMsg('새 계좌를 등록하였습니다.', document.getElementsByName('loanVal')[0].parentElement.getElementsByClassName('alertMsg')[0]);
			}
		}
	}
}

/**
 * 전체조회 버튼 눌렀을때 실행
 * 계좌종류에 따라 accountManager의 다른 메소드 호출
 */
function getList(){
	var optionVal = document.getElementsByName('accType')[0].value;
	
	// table 내용 삭제
	removeTable();
	
	// 계좌타입에 따라 AccountManager의 각각 다른 메소드 호출
	if(optionVal.trim() ==='전체'){
		manager.listAll();
	}else if(optionVal.trim() === '입출금계좌'){
		manager.accList();
	}else if(optionVal.trim() === '대출계좌'){
		manager.mAccList();
	}
}

/**
 * table 내용을 모두 삭제해주는 메소드
 */
function removeTable(){
	while(document.getElementsByTagName('tr').length != 1){
		document.getElementsByTagName('tr')[1].remove();
	}
}

/**
 * 유효성(입력패턴) 검증
 * @param inputField 입력값을 받는 element
 * @return 패턴일치여부
 */
function validate(inputField){
	// 알림메시지를 띄울 div에 접근
	var alertDiv = inputField.parentElement.getElementsByTagName('div')[0];
	// 유효성검증할 입력값
	var inputVal = inputField.value.trim();
	// 유효성검증에 쓸 정규식을 위한 변수 선언
	var reg;
	// 입력 element의 name속성에 따라
	switch(inputField.getAttribute('name')){
	case 'accountNum':
		reg = /^[0-9]{4}-[0-9]{3}-[0-9]{6}$/;
		console.log(reg.test(inputVal));
		if(!reg.test(inputVal)){
			showAlertMsg('* 0000-000-000000 형식으로 입력해 주세요', alertDiv);
			return false;
		}else{
			showAlertMsg('', alertDiv);
			return true;
		}
		break;
	case 'accOwn': //|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}
		reg = /^[가-힣]{2,4}$/;
		if(!reg.test(inputVal)){
			showAlertMsg('* 한글 2~4글자(공백없음)로 입력해 주세요', alertDiv);
			return false;
		}else{
			showAlertMsg('', alertDiv);
			return true;
		}
		break;
	case 'passwd':
		reg = /^[0-9]{4}$/;
		if(!reg.test(inputVal)){
			showAlertMsg('* 비밀번호는 네자리 숫자형식 입니다.', alertDiv);
			return false;
		}else{
			showAlertMsg('', alertDiv);
			return true;
		}
		break;
	case 'depositVal':
		if(Number(inputVal)<0){
			showAlertMsg('* 입금금액은 마이너스일 수 없습니다.', alertDiv);
			return false;
		}else{
			showAlertMsg('', alertDiv);
			return true;
		}
		break;
	case 'loanVal':
		if(Number(inputVal)<0){
			showAlertMsg('* 대출금액을 확인해 주세요', alertDiv);
			return false;
		}else{
			showAlertMsg('', alertDiv);
			return true;
		}
		break;
	}
}

/**
 * inpuField의 유효성검증에 따른 알림메세지 보여주는 기능
 * @param msg	 보여줄 메세지
 * @param inputElement 입력필드 element
 * @returns
 */
function showAlertMsg(msg, inputElement) {
	var target = inputElement.parentElement.getElementsByTagName('div')[0];
	target.innerText = msg;
}

/**
 * 포커싱된 영역 인풋의 스타일 변경
 * @param focusedElement 선택된 input영역
 */
function focused(focusedElement){
	focusedElement.setAttribute('style', 'border-bottom: #1c5d79 1.3px solid');
}

/**
 * 포커싱되지 않은 input의 스타일속성 제거(원래 적용된 css스타일로 되돌림)
 * @param focuseOutElement 선택되지 않은 input영역
 */
function focusOut(focuseOutElement){
	focuseOutElement.removeAttribute('style');
}





