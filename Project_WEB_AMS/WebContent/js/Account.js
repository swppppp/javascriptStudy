/**
 * 
 */
function Account(accountNum, accountOwner, passwd, restMoney){
	this.accountNum = accountNum;
	this.accountOwner = accountOwner;
	this.passwd = passwd;
	this.restMoney = restMoney;
}

Account.bankName = 'HanaBank';

//메소드
Account.prototype.deposit = function(money) {
	if(money>0){
		this.restMoney + money;
	}else console.log('입금금액을 확인해 주세요.\n');
	return this.restMoney;
}

Account.prototype.withdraw = function(money) {
	if(money<=0){
		console.log('출금금액을 확인해 주세요.\n');
		break;
	}else{
		if(money<this.restMoney){
			this.restMoney - money;
		}else{
			console.log('잔액이 부족합니다.\n');
			break;
		}
	}
	return this.restMoney;
}

Account.prototype.getRestMoney = function() {
	return restMoney;
}

Account.prototype.checkPasswd = function(passwd) {
	return this.passwd == passwd;
}

Account.prototype.equals = function(acc) {
	var eq = false;
	if(acc instanceof this){
		eq = this.toString().equals(acc.toString());
	}
	return eq;
}

Account.prototype.toString = function() {
	return '입출금계좌 ' + this.accountNum + ' ' + 
			this.accountOwner + ' ' + this.passwd + ' ' + this.restMoney;
}


