/**
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该
 * 对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器
 * 模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
 */

$.each([1, 2, 3], function (i, n) {
  console.log('当前下标为： ' + i)
  console.log('当前值为:' + n)
})

var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i])
  }
}

each([1, 2, 3], function (i, n) {
  alert([i, n])
})
