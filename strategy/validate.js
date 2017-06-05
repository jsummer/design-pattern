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


