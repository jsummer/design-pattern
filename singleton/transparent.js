var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    console.log(html)
    if (instance) {
      return instance
    }
    this.html = html
    this.init()
    return instance = this
  }
  CreateDiv.prototype.init = function () {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
  }
  return CreateDiv
})()

new CreateDiv('sven1')
new CreateDiv('sven2')