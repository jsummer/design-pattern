var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach((fn, index) => {
      fn.apply(this, arguments)
    })
  },
  remove: function (key, fn) {
    var fns = this.clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && fns.length = 0
    } else {
      for (var i = 0; i < fns.length; i++) {
        if (fns[i] === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
}

var installEvent = function (obj) {
  for (var key in event) {
    obj[key] = event(key)
  }
}



