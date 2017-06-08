/**
 * 外部迭代器必须显式地请求下一个元素
 * 外部迭代器增加了一些调用的复杂度，但相对也增加了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序
 */

var Iterator = function (obj) {
  var current = 0
  var next = function () {
    current += 1
  }
  var isDone = function () {
    return current >= obj.length
  }
  var getCurrItem = function () {
    return obj[current]
  }
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
}

var compare = function (iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error('iterator1 和 iterator2 不相等')
    }
    iterator1.next()
    iterator2.next()
  }
  console.log('iterator1 和 iterator2 相等')
}

var iterator1 = Iterator([1, 2, 3])
var iterator2 = Iterator([1, 2, 3, 4])

compare(iterator1, iterator2)
