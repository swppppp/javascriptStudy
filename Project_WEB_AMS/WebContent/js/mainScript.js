/**
 * 
 */
var manager = new AccountManager();
//브라우저 로드될때 실행
window.onload = function() {
		
	init();
	eventResist();

};

// 샘플데이터 생성 및 계좌관리객체에 담기
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

function eventResist() {
	// 계좌 종류 선택에 따른 대출금액항목 비활성
	document.getElementsByName('accType')[0].onchange= function() {
		if(document.getElementsByName('accType')[0].value.trim() == '입출금계좌'){
			document.getElementsByName('loanVal')[0].setAttribute('disabled', 'disabled');
		}
	};
	
	var btn = document.querySelectorAll('.subBtn');
	
	// 조회 버튼... 계좌번호로 조회
	btn[0].onclick = function() {
		
	}
	
	// 삭제 버튼... 계좌번호로 삭제
	btn[1].onclick = function() {
		var ansTarget = document.getElementById('ans');
		var rAcc = document.getElementsByName('accountNum')[0].value;
		rAcc.trim();
		var result = manager.remove(rAcc);
		if(result){
			ansTarget.innerText = ' 삭제 성공!';
			ansTarget.setAttribute("style", "visibility: visible; color: #1c5d79");
		}else{
			ansTarget.innerText = ' 계좌번호를 확인하세요!';
			ansTarget.setAttribute("style", "visibility: visible; color: #1c5d79");
		}
	}
	
	// 검색 버튼... 예금주명으로 계좌 조회
	btn[2].onclick = function() {
		var accOwn = document.getElementsByName('accOwn')[0].value;
		accOwn.trim();
		// table 내용 삭제
		while (document.getElementsByTagName('tr').length != 1) {

			document.getElementsByTagName('tr')[1].remove();
		}
		
		manager.search(accOwn);
	}
	
	// 신규등록 버튼... 
	btn[3].onclick = function() {
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
	
	// 전체조회 버튼
	btn[4].onclick = function(){
		getList();
	}
}

function getList(){
	var optionVal = document.getElementsByName('accType')[0].value;
	
	// table 내용 삭제
	while (document.getElementsByTagName('tr').length != 1) {

		document.getElementsByTagName('tr')[1].remove();
	}
	
	if(optionVal.trim() ==='전체'){
		manager.listAll();
	}else if(optionVal.trim() === '입출금계좌'){
		manager.accList();
	}else if(optionVal.trim() === '대출계좌'){
		manager.mAccList();
	}
}






