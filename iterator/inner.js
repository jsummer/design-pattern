/**
 * 内部迭代器
 * 我们刚刚编写的each函数属于内部迭代器，each函数的内部已经定义好迭代规则，它完全接手整个迭代过程，
 * 外部只需要一次调用
 */

var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i])
  }
}

var compare = function (ary1, ary2) {
  if (ary1.length !== ary2.length) {
    throw new Error('ary1 和 ary2 不相等')
  }
  each(ary1, function (i, n) {
    if (n !== ary2[i]) {
      throw new Error('ary1 和 ary2 不相等')
    }
  })
  console.log('ary1 和 ary2 相等')
}

compare([1, 2, 3], [1, 2, 3])