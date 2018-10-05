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

//전체출력
AccountManager.prototype.listAll = function() {
	for ( var i in this.accounts) {
		console.log(this.accounts[i].toString() + '\n');
	}
}

//입출금계좌만 모두 출력
AccountManager.prototype.accList = function(){
	for ( var i in this.accounts) {
		if(this.accounts[i] instanceof MinusAccount){
			continue;
		}else{
			console.log(this.accounts[i].toString() + '\n');
		}
	}
}

//대출계좌만 모두 출력
AccountManager.prototype.mAccList = function() {
	for ( var i in this.accounts) {
		if(this.accounts[i] instanceof MinusAccount){
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
	var accArr = new Array();
	for ( var i in this.accounts) {
		if(this.accounts[i].accountOwner === accountOwner){
			accArr.push(this.accounts[i]);
		}
	}
	if(accArr.length != 0){
		return accArr;
	}
	else console.log('일치하는 예금주 명이 없습니다.');
}

//Account객체의 accountNum값이 주어졌을때 일치하는 Account객체 빼기(splice)
AccountManager.prototype.remove = function(accountNum) {
	var isRemove = false;
	for ( var i in this.accounts) {
		if(this.acocunts[i].accountNum === accountNum){
			this.accounts.splice(i, 1);
			isRemove = true;
		}
	}
	return isRemove;
}


