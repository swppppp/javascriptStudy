/** 사용자정의 객체 */
function Student(name, korean, math, english, science){
	
	this.name = name;
	this.korean = korean;
	this.math = math;
	this.english = english;
	this.science = science;
	
	//메소드는 프로토타입에 저장해봅시다!	
}//얘는 Function객체의 프로토타입이 부모
//얘로만든 인스턴스는 Object의 프로토타입이 부모

// java의 class변수(static)와 비슷하게 Student객체의 공유변수 저장
// 생성자안에 var schoolName ="~~"; 하면 생성자 내에서만 사용가능한 변수(지역)
Student.schoolName = "KOSTA대학교";

// 프로토타입에 생성자의 메소드 저장
Student.prototype.getSum = function () {
	return this.korean + this.math + this.english + this.science;	
};

Student.prototype.getAvg = function() {
	return this.getSum()/4;
};

Student.prototype.toString = function(){
	return this.name +'\t'+this.korean+'\t'+this.math+'\t'+this.english+'\t'+this.science;
};

