var salesOffices = {}  //定义售楼处

salesOffices.clientList = []  //缓存列表，存放订阅者的回调函数
salesOffices.listen = function (key, fn) {  //增加订阅者
  if (!this.clientList[key]) {
    this.clientList[key] = []   // 订阅的消息添加进缓存列表  
  }
  this.clientList[key].push(fn)
}

salesOffices.trigger = function () {  //发布消息
  var key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key]

  if (!fns || fns.length === 0) {
    return false
  }
  for (var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments)  //订阅的消息添加进缓存列表
  }
}

// 小明订阅信息
salesOffices.listen('squareMeter88', function (price) {
  console.log('价格=' + price)
  console.log('squareMeter=88')
})

// 小红订阅信息
salesOffices.listen('squareMeter110', function (price) {
  console.log('价格=' + price)
  console.log('squareMeter=110')
})

salesOffices.trigger('squareMeter88', 2000000)  // 输出：200万，88平米
salesOffices.trigger('squareMeter110', 3000000) // 输出：300万，110平方米

