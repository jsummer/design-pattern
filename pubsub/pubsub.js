function Robot () {
  this.clientList = []
}

Robot.prototype.pub = function (name, content) {
  if (!this.clientList[name] || this.clientList[name].length === 0) {
    console.log(`没有订阅过 ${name} 消息.`)
    return false
  }
  for (var i = 0, fn; fn = this.clientList[name][i++];) {
    fn(content)
  }
}

Robot.prototype.remove = function (name, fn) {
  if (!this.clientList[name] || this.clientList[name].length === 0) {
    console.log(`没有订阅过 ${name} 信息.`)
    return false
  }
  var fns = this.clientList[name]
  for (var i = 0; i < fns.length; i++) {
    if (fns[i] === fn) {
      fns.splice(i, 1)
    }
  }
}

Robot.prototype.sub = function (name, fn) {
  if (!this.clientList[name]) {
    this.clientList[name] = []
  }
  this.clientList[name].push(fn)
}

var robot = new Robot()
function f1 (content) {
  console.log('小明收到: ' + content)
}
function f2 (content) {
  console.log('小红收到: ' + content)
}
// 订阅
robot.sub('news', f1 = function (content) {
  console.log('小明收到: ' + content)
})

robot.sub('news', f2 = function (content) {
  console.log('小红收到: ' + content)
})
// 发布
robot.pub('news', '伟大无产阶级革命家+1s')

robot.remove('news', f1)

robot.pub('news', '伟大无产阶级革命家+2s')
// robot.pub('books', '编译原理')
// robot.pub('games', 'Sid\'s')