var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (function () {
  var img = new Image;
  img.onload = function () {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function (src) {
      myImage.set('file:// /c:/loading.gif')
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://www.example.com/1.jpg')

// 不使用代理的图片预加载
var MyImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  var img = new Image
  img.onload = function () {
    imgNode.src = img.src
  }

  return {
    setSrc: function (src) {
      imgNode.src = 'file:// /c:/loading.gif'
      img.src = src
    }
  }
})()
MyImage.setSrc('http://www.example.com/1.jpg')

/**
 * 代理的意义
 * 
 * 单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。如果一个对象
 * 承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可能会有多个。面向对象设计鼓励将行为分布到
 * 细粒度的对象之中，如果一个对象承担的职责过多，等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的
 * 设计。当变化发生时，设计可能会遭到意外的破坏。
 *
 * 职责被定义为“引起变化的原因”。上面代码中的MyImage对象除了负责给img节点设置src之外，还要负责预加载图
 * 片。我们在处理其中一个职责时，有可能因为强耦合性影响另外一个职责的实现。
 *
 * 我们需要的只是给img节点设置src，预加载图片只是一个锦上添花的功能。如果能把这个操作放在另一个对象里面，
 * 自然是一个非常好的方法。于是代理的作用就在这里体现出来了，代理负责与加载图片，预加载的操作完成之后，把
 * 请求重新交给本体MyImage
 * 
 */