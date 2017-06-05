/**
 * 策略模式的定义：定义一系列，把它们一个个封装起来，并且使它们可以相互替换。
 */

var calculateBonus = function (performancelevel, salary) {
  if (performancelevel === 'S') {
    return salary * 4
  }
  if (performancelevel === 'A') {
    return salary * 3
  }
  if (performancelevel === 'B') {
    return salary * 2
  }
}

calculateBonus('B', 20000)  // 40000
calculateBonus('S', 6000)   // 24000

// 策略类
var performanceS = function () {}

performanceS.prototype.calculate = function (salary) {
  return salary * 4
}

var performanceA = function () {}

performanceA.prototype.calculate = function (salary) {
  return salary * 3
}

var performanceB = function () {}

performanceB.prototype.calculate = function (salary) {
  return salary * 2
}

// 奖金类
var Bonus = function () {
  this.salary = null // 原始工资
  this.strategy = null // 绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}

Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}

Bonus.prototype.getBonus = function () {
  return this.strategy.calculate(this.salary)
}





