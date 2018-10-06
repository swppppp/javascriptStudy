/**
 * Account생성자 상속받는 MinusAccount 생성자
*/

function MinusAccount(accountNum, accountOwner, passwd, restMoney, loanMoney){
	Account.call(this, loanMoney);
	this.accountNum = accountNum;
	this.accountOwner = accountOwner;
	this.passwd = passwd;
	this.restMoney = restMoney;
	this.loanMoney = loanMoney;
}

//부모메소드 내려받기
MinusAccount.prototype = new Account();
//내려받은 부모메소드 재정의
MinusAccount.prototype.getRestMoney = function() {
	return this.restMoney - this.loanMoney;
};
MinusAccount.prototype.toString = function() {
	return '대출계좌 ' + this.accountNum + ' ' + this.accountOwner + ' ' +
			this.passwd + ' ' + this.getRestMoney() + ' ' + this.loanMoney;
}



