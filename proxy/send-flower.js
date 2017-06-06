/**
 * 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问
 */

var Flower = function () {}

var xiaoming = {
  sendFlower: function (target) {
    var flower = new Flower()
    target.receiveFlower(flower)
  }
}

var B = {
  reveiveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.receiveFlower(flower)
    })
  }
}

var A = {
  receiveFlower: function (flower) {
    console.log('收到花 ' + flower)
  },
  listenGoodMood: function (fn) {
    setTimeout(function () { // 假设10s之后A心情变好
      fn()
    }, 10000)
  }
}

xiaoming.sendFlower(B)