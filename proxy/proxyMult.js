var mult = function () {
  var a = 1
  for (var i = 0; i < arguments.length; i++) {
    a = a * arguments[i]
  }
  console.log('mult')
  return a
}

var proxyMult = (function () {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = mult.apply(this, arguments)
  }
})()

console.log(proxyMult(1, 2, 3, 4))
console.log(proxyMult(1, 2, 3, 4))
