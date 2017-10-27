var j = require('./index')
  , n = 1000000

console.log('Benchmarking, %s times', n)

console.time('toGregorian')
toGregorianBench()
console.timeEnd('toGregorian')

console.time('toSolarHijri')
toSolarHijriBench()
console.timeEnd('toSolarHijri')

console.time('isLeapSolarHijriYear')
isLeapSolarHijriYearBench()
console.timeEnd('isLeapSolarHijriYear')

console.time('isValidSolarHijriDate')
isValidSolarHijriDateBench()
console.timeEnd('isValidSolarHijriDate')

function toGregorianBench() {
  var count = n
    , f = j.toGregorian
  while (true)
    for (var y = 1; y <= 3000; y += 1)
      for (var m = 1; m <= 12; m += 1)
        for (var d = 1; d <= 30; d += 1) {
          f(y, m, d)
          if (--count === 0) return
        }
}

function toSolarHijriBench() {
  var count = n
    , f = j.toSolarHijri
  while (true)
    for (var y = 560; y <= 3560; y += 1)
      for (var m = 1; m <= 12; m += 1)
        for (var d = 1; d <= 30; d += 1) {
          f(y, m, d)
          if (--count === 0) return
        }
}

function isLeapSolarHijriYearBench() {
  var count = n
    , f = j.isLeapSolarHijriYear
  while (true)
    for (var y = 1; y <= 3000; y += 1) {
      f(y)
      if (--count === 0) return
    }
}

function isValidSolarHijriDateBench() {
  var count = n
    , f = j.isValidSolarHijriDate
  while (true)
    for (var y = 1; y <= 3000; y += 1)
      for (var m = 1; m <= 13; m += 1)
        for (var d = 1; d <= 32; d += 1) {
          f(y, m, d)
          if (--count === 0) return
        }
}
