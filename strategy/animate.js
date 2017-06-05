var tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  strongEaseOut: function (t, b, c, d) {
    console.log(c)
    return c * ((t = t/d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t/d - 1) * t * t + 1) + b
  }
}

var Animate = function (dom) {
  this.dom = dom  // 进行运动的dom节点
  this.startTime = 0  // 动画开始时间
  this.startPos = 0  // 动画开始时，dom节点的位置，即dom的初始位置
  this.endPos = 0  // 动画结束时，dom节点的位置，即dom的目标位置
  this.propertyName = null  // dom节点需要被改变的css属性名
  this.easing = null // 缓动算法
  this.duration = null // 动画持续时间
}

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date() // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[propertyName]
  this.propertyName = propertyName
  this.endPos = endPos
  this.duration = duration
  this.easing = tween[easing]
  var self = this
  var timeId = setInterval(function () {
    if (self.step() === false) {
      clearInterval(timeId)
    }
  }, 19)
}

Animate.prototype.step = function () {
  var t = +new Date()  // 取得当前时间
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos)  // 更新小球的css属性
    return false
  }
  var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)  //小球当前位置
  // console.log(pos)
  this.update(pos)  // 更新小球的CSS属性
}

Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + 'px'
}

let ball = document.getElementById('ball')
let BallAnimate = new Animate(ball)
BallAnimate.start('left', 500, 1000, 'easeIn')