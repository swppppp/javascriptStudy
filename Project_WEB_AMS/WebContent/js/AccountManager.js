/**
 * Account객체를 담을 배열 생성
 * 
 * 배열에 Account객체 추가, 
 * 전체배열출력, 
 * accountNum키값으로 일치하는 Account반환,
 * accountOwner일치하는 Account객체반환,
 * accountNum키값으로 배열에서 해당Account삭제
 * 기능 구현
 */

function AccountManager(){
	//Account인스턴스를 담을 배열 생성
	this.accounts = new Array();
}

//계좌종류 확인
AccountManager.prototype.typeofAcc = function(account){
	if(account.hasOwnProperty('loanMoney')){
		return false; //대출계좌
	}
	else{
		return true; //일반계좌
	}
}


// 계좌 추가
AccountManager.prototype.add = function(account) {
	for ( var i in this.accounts) {
		if(this.accounts[i]['accountNum']===account['accountNum']){
			return console.log('계좌정보를 확인해 주세요');
		}
	}
	this.accounts.push(account);
}

// 테이블에 계좌정보 추가하는 메소드
AccountManager.prototype.createRow = function(account) {
	var accRow = document.createElement('tr');
	var td1 =document.createElement('td');
	var td2 =document.createElement('td');
	var td3 =document.createElement('td');
	var td4 =document.createElement('td');
	var td5 =document.createElement('td');

	//대출계좌일때
	if(account instanceof MinusAccount){
		var accType = document.createTextNode('대출계좌');
		var accNum = document.createTextNode(account.accountNum);
		var accOwn = document.createTextNode(account.accountOwner);
		var restMoney = document.createTextNode(account.restMoney);
		var loanMoney = document.createTextNode(account.loanMoney);
		
		td1.appendChild(accType);
		td2.appendChild(accNum);
		td3.appendChild(accOwn);
		td4.appendChild(restMoney);
		td5.appendChild(loanMoney);
		
		accRow.appendChild(td1);
		accRow.appendChild(td2);
		accRow.appendChild(td3);
		accRow.appendChild(td4);
		accRow.appendChild(td5);
		
		document.getElementsByTagName('tbody')[0].appendChild(accRow);
	}else{
		var accType = document.createTextNode('일반계좌');
		var accNum = document.createTextNode(account.accountNum);
		var accOwn = document.createTextNode(account.accountOwner);
		var restMoney = document.createTextNode(account.restMoney);
		var loanMoney = document.createTextNode(0);
		
		td1.appendChild(accType);
		td2.appendChild(accNum);
		td3.appendChild(accOwn);
		td4.appendChild(restMoney);
		td5.appendChild(loanMoney);
		
		accRow.appendChild(td1);
		accRow.appendChild(td2);
		accRow.appendChild(td3);
		accRow.appendChild(td4);
		accRow.appendChild(td5);
		
		document.getElementsByTagName('tbody')[0].appendChild(accRow);
	}
}

AccountManager.prototype.listAll = function() {
	for ( var i in this.accounts) {
		this.createRow(this.accounts[i]);
		console.log(this.accounts[i].toString() + '\n');
	}
}

//입출금계좌만 모두 출력
AccountManager.prototype.accList = function(){
	for ( var i in this.accounts) {
		if(this.accounts[i] instanceof MinusAccount){
			continue;
		}else{
			this.createRow(this.accounts[i]);
			console.log(this.accounts[i].toString() + '\n');
		}
	}
}

//대출계좌만 모두 출력
AccountManager.prototype.mAccList = function() {
	for ( var i in this.accounts) {
		if(this.accounts[i] instanceof MinusAccount){
			this.createRow(this.accounts[i]);
			console.log(this.accounts[i].toString() + '\n');
		}else{
			continue;
		}
	}
}

//Account객체의 accountNum값이 주어졌을 때 일치하는 Account객체 반환
AccountManager.prototype.get = function(accountNum) {
	var acc;
	for ( var i in this.accounts) {
		if(this.accounts[i].accountNum === accountNum){
			acc = this.accounts[i];
		}
	}
	if(acc != null){
		return acc;
	}
	else console.log('일치하는 계좌가 없습니다.');
}

//Account객체의 accountOwner값이 주어졌을 때 일치하는 Account객체(들)을 담은 배열반환
AccountManager.prototype.search = function(accountOwner) {
	//var accArr = new Array();
	for ( var i in this.accounts) {
		if(this.accounts[i].accountOwner == accountOwner){
//			accArr.push(this.accounts[i]);
			this.createRow(this.accounts[i]);
		}
	}
//	if(accArr.length != 0){
//		for ( var i in accArr) {
//		}
//	}
//	else console.log('일치하는 예금주 명이 없습니다.');
}

//Account객체의 accountNum값이 주어졌을때 일치하는 Account객체 빼기(splice)
AccountManager.prototype.remove = function(accountNum) {
	var isRemove = false;
	console.log(accountNum);
	
	for ( var i in this.accounts) {
		console.log(this.accounts[i]);
		if(this.accounts[i].accountNum == accountNum){
			this.accounts.splice(i, 1);
			isRemove = true;
		}
	}
	return isRemove;
}


