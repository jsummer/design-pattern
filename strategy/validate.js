// 策略模式指的是定义一系列的算法，并且把它们封装起来。
// 从定义上看，策略模式就是用来封装算法的。但如果把策略模式仅仅用来封装算法，未免有一点大才小用。在实际开发中，我们通常会把算法的定义扩散开来，使策略模式也可以用来封装一系列的“业务规则”。只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以用策略模式来封装它们。

/**
 * 用户名不能为空
 * 密码长度不能少于6位
 * 手机号码必须符合格式
 */

let strategies = {
  isNonEmpty (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile (value, errorMsg) {
    if (!/^1[3|5|8][0-9]{9}/.test(value)) {
      return errorMsg
    }
  }
}


let Validator = function () {
  this.cache = [] //保存校验规则
}

Validator.prototype.add = function (dom, rule, errorMsg) {
  let ary = rule.split(':')  // 把strategy和参数分开
  this.cache.push(function () {
    let strategy = ary.shift()
    ary.unshift(dom.value)
    ary.push(errorMsg)
    return strategies[strategy].apply(dom, ary)
  })
}

Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var msg = validatorFunc()
    if (msg) {
      return msg
    }
  }
}

let registerForm = document.getElementById('registerForm')

let validatorFunc = function () {
  let validator = new Validator()
  validator.add(registerForm.username, 'isNonEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
  validator.add(registerForm.mobile, 'isMobile', '手机号码必须符合格式')

  let errorMsg = validator.start()
  return errorMsg
}


registerForm.onsubmit = function () {
  let errorMsg = validatorFunc()
  console.log('11')
  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}

/**
 * 把一件事情交给比人去做是  委托
 * 一个对象可以返回不同的结果是 多态
 */

/**
 * 策略模式是一种常用且有效的设计模式，本章提供了计算奖金、缓动动画、表单校验这三个例子。
 *
 *    策略模式利用组合、委托和多态等技术和思想，可以有效的避免多重条件选择语句
 *    策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展
 *    策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作
 *    在策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案
 */

