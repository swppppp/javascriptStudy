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
	
	//매니저 객체에 담기
	manager.add(acc1);
	manager.add(acc2);
	manager.add(acc3);
	manager.add(acc4);
	manager.add(acc5);
}

function eventResist() {
	// 전체조회-->select태그 option값에 따라 다르게
	document.querySelectorAll('.subBtn')[4].onclick = function(){
		getList();
	}

	
}




function getList(){
	var acctype = document.getElementsByName('accType');
	console.log(acctype[0]);
	console.log(document.getElementsByName('accType')[0].selectedIndex);
	var idx = acctype[0].selectedIndex
	var optionVal = acctype[0].options[idx].innerText;
	console.log(optionVal);
	if(optionVal.trim() ==='전체'){
		console.log('hi');
		manager.listAll();
	}else if(optionVal.trim() === '입출금계좌'){
		manager.accList();
	}else if(optionVal.trim() === '대출계좌'){
		manager.mAccList();
	}
}

//버튼에 접근

//전체조회버튼 접근





