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
}

/**
 * 브라우저에서 발생하는 이벤트 처리기능
 */
function eventResist() {
	
	// 계좌 종류 선택에 따른 대출금액항목 비활성
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
	
	// 검색 버튼... 예금주명으로 계좌 조회
	btn[2].onclick = ownSearch;
	
	// 신규등록 버튼... 
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
 * 계좌종류 선택에따라 대출금액 비활성화해주는 기능
 */
function accTypeEnabled() {
	// 계좌종류가 입출금계좌이면
	if(document.getElementsByName('accType')[0].value.trim() == '입출금계좌'){
		// 대출금액항목의 비활성속성 주가
		document.getElementsByName('loanVal')[0].setAttribute('disabled', 'disabled');
	}else{
		// 입출금계좌가 아니면 대출금액항목 비활성 속성 삭제
		document.getElementsByName('loanVal')[0].removeAttribute('disabled');
	}
}

/**
 * 계좌번호를 통해 조회하는 기능
 */
function accSearch() {
	var findAcc;
	var acc = document.getElementsByName('accountNum')[0];
	findAcc = manager.get(acc.value.trim());
	// 테이블 내용 삭제
	removeTable();
	// 입력한 값과 일치하는 계좌가 있다면 해당 계좌를 테이블에 뿌려주는 함수 호출
	if(findAcc != null){
		manager.createRow(findAcc);
	}else{
		console.log(acc);
		validate(acc);
	}
}

/**
 * 계좌번호를 통한 삭제
 */
function accRemove() {
	// 입력받은 지울 계좌번호 접근
	var rAcc = document.getElementsByName('accountNum')[0].value;
	rAcc.trim();
	////결과메시지 보여줄 div영역 접근
	var alertDiv = document.getElementsByClassName('alertMsg')[0];
	// AccountManager의 삭제기능 호출, 결과(boolean)받아오기
	var result = manager.remove(rAcc);
	// 정상 삭제하였으면
	if(result){
		// 결과메시지 영역에 성공메시지 보여주기
		alertDiv.innerText = '* 삭제성공!';
		alertDiv.setAttribute("style", "color: #1c5d79");
	}else{
		// 입력받은 값이 없거나 잘못된경우 경고메시지 출력
		alertDiv.innerText = '* 계좌번호를 확인해 주세요';
	}
}

/**
 * 예금주명으로 계좌조회
 */
function ownSearch() {
	var accOwn = document.getElementsByName('accOwn')[0].value;
	accOwn.trim();
	// table 내용 삭제
	removeTable();
	// 찾은 계좌 테이블에 붙여주기
	manager.search(accOwn);
}

/**
 * 새 계좌 등록
 */
function addAcc() {
	//계좌 종류 확인
	var acctype = document.getElementsByName('accType');
	var idx = acctype[0].selectedIndex
	var optionVal = acctype[0].options[idx].innerText;
	
	// 추가할 계좌를 담을 계좌객체 선언
	var addAcc;
	// 계좌에 담길 값들 선언
	var accNum = document.getElementsByName('accountNum')[0].value;
	var accOwn = document.getElementsByName('accOwn')[0].value;
	var passwd = document.getElementsByName('passwd')[0].value;
	var deposit = document.getElementsByName('depositVal')[0].value;
	var loan = document.getElementsByName('loanVal')[0].value;
	
	if(optionVal.trim() == '전체'){
		var ansTarget = document.getElementById('ans');
		ansTarget.innerText = '계좌종류선택 필';
		ansTarget.setAttribute('style', 'visibility: visible; color: #1c5d79');
	}else if(optionVal.trim() == '입출금계좌'){
		// 입출금계좌일때 대출금액항목 비활성화
		document.getElementsByName('loanVal')[0].setAttribute('disabled', 'disabled');
		
		// 계좌 property 값 할당
		accNum = document.getElementsByName('accountNum')[0].value;
		accOwn = document.getElementsByName('accOwn')[0].value;
		passwd = document.getElementsByName('passwd')[0].value;
		deposit = document.getElementsByName('depositVal')[0].value;
		addAcc = new Account(accNum, accOwn, passwd, deposit);
		// manager의 계좌배열에 add
		manager.add(addAcc);
		
	}else if(optionVa.trim() == '대출계좌'){
		// 계좌 property 값 할당
		accNum = document.getElementsByName('accountNum')[0].value;
		accOwn = document.getElementsByName('accOwn')[0].value;
		passwd = document.getElementsByName('passwd')[0].value;
		deposit = document.getElementsByName('depositVal')[0].value;
		loan = document.getElementsByName('loanVal')[0].value;
		addAcc = new MinusAccount(accNum, accOwn, passwd, deposit, loan);
		
		// manager의 계좌배열에 add
		manager.add(addAcc);
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
 * 유효성 검증
 * @param inputField 입력값을 받는 element
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
			alertDiv.innerText = '* 0000-000-000000 형식';
		}else{
			alertDiv.innerText = '* 일치하는 계좌가 없습니다. 계좌번호를 확인하세요';
		}
		break;
	case 'accOwn':
		reg = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
		if(!reg.test(inputVal)){
			alertDiv.innerText = '* 한글은 2~4글자(공백없음) 영문은 firstName(2~10글자) 공백 lastName(2~10글자)로 입력해 주세요';
		}
		break;
	case 'passwd':
		reg = /^[0-9]{4}$/;
		if(!reg.test(inputVal)){
			alertDiv.innerText = '* 비밀번호는 네자리 숫자형식 입니다.';
		}
		break;
	case 'depositVal':
		console.log(inputVal);
		if(Number(inputVal)<0){
			console.log
			alertDiv.innerText = '* 입금금액은 마이너스일 수 없습니다.';
		}
		break;
	case 'loanVal':
		if(Number(inputVal)<0){
			alertDiv.innerText = '* 대출금액을 확인해 주세요';
		}
		break;
	}
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





