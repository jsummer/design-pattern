var reverseEach = function (ary, callback) {
  for (var i = ary.length - 1; i >= 0; i--) {
    callback.call(ary[i], i, ary[i])
  }
}

reverseEach([1, 2, 3], function (i, n) {
  console.log(n)
})

// var ary = [1, 5, 3, 10, 65, 4, 50]

// var bubbleSort = function (ary) {
//   for (var i = 0; i < ary.length; i++) {
//     for (var j = i + 1; j < ary.length; j++) {
//       if (ary[i] > ary[j]) {
//         var temp = ary[j]
//         ary[j] = ary[i]
//         ary[i] = temp
//       }
//     }
//   }
//   return ary
// }

// console.log(bubbleSort(ary))