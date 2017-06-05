// 单例模式的核心是确保只有一个实例，并提供全局访问

// 惰性单例

/**
 * 惰性单例指的是在需要的时候才创建对象实例。惰性单例释单例模式的重点。
 */

// var obj;
// if (!obj) {
//   obj = {}
// }

// var createDiv = (function () {
//   var div
//   return function (html) {
//     if (!div) {
//       div = document.createElement('div')
//       div.innerHTML = html
//       document.body.appendChild(div)
//     }
//     return div
//   }
// })()

// createDiv(111)


var getSingle = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

var createLoginLayer = function () {
  var div = document.createElement('div')
  div.innerHTML = '我是登陆浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

var createSingleLoginLayer = getSingle(createLoginLayer)

var loginLayer = createSingleLoginLayer()
setTimeout(function () {
  loginLayer.style.display = 'block'
  setTimeout(function () {
    var loginLayer = createSingleLoginLayer()
    loginLayer.style.display = 'none'
  }, 1000)
}, 4000)






