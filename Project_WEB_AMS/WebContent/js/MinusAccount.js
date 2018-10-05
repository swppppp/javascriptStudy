/**

// 부모가될 생성자 정의
function Shape(x, y){
	this.x = x;
	this.y = y;
}
// 부모생성자의 메소드를 프로토타입에 넣어줌
Shape.prototype.getArea = function() {
	return 0;
}
Shape.prototype.getRound = function() {
	return 0;
}

// Shpae을 상속받는 자식 생성자 정의
function Rectangle(x, y, width, height) {
	Shape.call(this, x, y); //체이닝
	this.width = width;
	this.height = height;
}
//Rectangle의 프로토타입에 부모의 프로토타입에있는 메소드 내려받기
Rectangle.prototype = new Shape(0, 0);
// 부모에있는 메소드 자식에 맞게 다시 정의
Rectangle.prototype.getArea = function() {
	return this.width * this.height;
}
Rectangle.prototype.getRound = function() {
	return 2*(this.width + this.height);
}

delete Rectangle.prototype.x;
delete Rectangle.prototype.y;

Rectangle.prototype.constructor = Rectangle;
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



