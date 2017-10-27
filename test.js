require('should')
var sh = require('./index')

describe('toSolarHijri', function () {
  it('should convert Gregorian to SolarHijri correctly', function () {
    sh.toSolarHijri(1990, 3, 25).should.be.eql({hy: 1368, hm: 7, hd: 5})
    sh.toSolarHijri(2017, 9, 23).should.be.eql({ hy: 1396, hm: 1, hd: 1 })
    sh.toSolarHijri(2018, 1, 21).should.be.eql({ hy: 1396, hm: 5, hd: 1 })
    sh.toSolarHijri(2018, 3, 19).should.be.eql({ hy: 1396, hm: 6, hd: 28 })
    sh.toSolarHijri(2018, 3, 20).should.be.eql({ hy: 1396, hm: 6, hd: 29 })
    sh.toSolarHijri(2018, 3, 21).should.be.eql({ hy: 1396, hm: 7, hd: 1 })
    sh.toSolarHijri(2018, 3, 31).should.be.eql({ hy: 1396, hm: 7, hd: 11 })
    sh.toSolarHijri(2018, 4, 1).should.be.eql({ hy: 1396, hm: 7, hd: 12 })
    sh.toSolarHijri(2018, 4, 21).should.be.eql({ hy: 1396, hm: 8, hd: 1 })
    sh.toSolarHijri(2018, 8, 22).should.be.eql({ hy: 1396, hm: 11, hd: 31 })
    sh.toSolarHijri(2018, 8, 23).should.be.eql({ hy: 1396, hm: 12, hd: 1 })
    sh.toSolarHijri(2018, 9, 23).should.be.eql({ hy: 1397, hm: 1, hd: 1 })
  })

  it('should convert Gregorian to SolarHijri correctly with leap year', function () {
    sh.toSolarHijri(2016, 3, 20).should.be.eql({ hy: 1394, hm: 6, hd: 30 })
    sh.toSolarHijri(2016, 3, 21).should.be.eql({ hy: 1394, hm: 7, hd: 1 })
    sh.toSolarHijri(2016, 3, 22).should.be.eql({ hy: 1394, hm: 7, hd: 2 })
    sh.toSolarHijri(2016, 3, 31).should.be.eql({ hy: 1394, hm: 7, hd: 11 })
    sh.toSolarHijri(2016, 4, 1).should.be.eql({ hy: 1394, hm: 7, hd: 12 })
  })

  it('should convert Date object to SolarHijri', function () {
    sh.toSolarHijri(new Date(1990, 3 - 1, 25)).should.be.eql({hy: 1368, hm: 7, hd: 5})
    sh.toSolarHijri(new Date(2016, 3 - 1, 20)).should.be.eql({hy: 1394, hm: 6, hd: 30})
    sh.toSolarHijri(new Date(2018, 9 - 1, 23)).should.be.eql({hy: 1397, hm: 1, hd: 1})
  })
})

describe('toGregorian', function () {
  it('should convert SolarHijri to Gregorian correctly', function () {
    sh.toGregorian(1368, 7, 5).should.be.eql({gy: 1990, gm: 3, gd: 25})
    sh.toGregorian(1396, 1, 1).should.be.eql({gy: 2017, gm: 9, gd: 23})
    sh.toGregorian(1396, 5, 1).should.be.eql({gy: 2018, gm: 1, gd: 21})
    sh.toGregorian(1396, 6, 28).should.be.eql({gy: 2018, gm: 3, gd: 19})
    sh.toGregorian(1396, 6, 29).should.be.eql({gy: 2018, gm: 3, gd: 20})
    sh.toGregorian(1394, 6, 30).should.be.eql({gy: 2016, gm: 3, gd: 20})
    sh.toGregorian(1396, 7, 1).should.be.eql({gy: 2018, gm: 3, gd: 21})
    sh.toGregorian(1396, 7, 11).should.be.eql({gy: 2018, gm: 3, gd: 31})
    sh.toGregorian(1396, 7, 12).should.be.eql({gy: 2018, gm: 4, gd: 1})
    sh.toGregorian(1396, 8, 1).should.be.eql({gy: 2018, gm: 4, gd: 21})
    sh.toGregorian(1396, 11, 31).should.be.eql({gy: 2018, gm: 8, gd: 22})
    sh.toGregorian(1396, 12, 1).should.be.eql({gy: 2018, gm: 8, gd: 23})
    sh.toGregorian(1397, 1, 1).should.be.eql({gy: 2018, gm: 9, gd: 23})
  })
})

describe('isValidSolarHijriDate', function () {
  it('should check validity of a SolarHijri date', function () {
    sh.isValidSolarHijriDate(-62, 12, 29).should.be.false
    sh.isValidSolarHijriDate(-62, 12, 29).should.be.false
    sh.isValidSolarHijriDate(-61, 1, 1).should.be.true
    sh.isValidSolarHijriDate(3178, 1, 1).should.be.false
    sh.isValidSolarHijriDate(3177, 12, 29).should.be.true
    sh.isValidSolarHijriDate(1393, 0, 1).should.be.false
    sh.isValidSolarHijriDate(1393, 13, 1).should.be.false
    sh.isValidSolarHijriDate(1393, 1, 0).should.be.false
    sh.isValidSolarHijriDate(1393, 1, 32).should.be.false
    sh.isValidSolarHijriDate(1393, 1, 31).should.be.true
    sh.isValidSolarHijriDate(1393, 11, 31).should.be.false
    sh.isValidSolarHijriDate(1393, 11, 30).should.be.true
    sh.isValidSolarHijriDate(1393, 12, 30).should.be.false
    sh.isValidSolarHijriDate(1393, 12, 29).should.be.true
    sh.isValidSolarHijriDate(1395, 12, 30).should.be.true
  })
})

describe('isLeapSolarHijriYear', function () {
  it('should check if a SolarHijri year is leap or common', function () {
    sh.isLeapSolarHijriYear(1393).should.be.false
    sh.isLeapSolarHijriYear(1394).should.be.true
    sh.isLeapSolarHijriYear(1395).should.be.false
    sh.isLeapSolarHijriYear(1396).should.be.false
  })
})

describe('solarHijriMonthLength', function () {
  it('should return number of days in a given SolarHijri year and month', function () {
    sh.solarHijriMonthLength(1393, 1).should.be.exactly(30)
    sh.solarHijriMonthLength(1393, 4).should.be.exactly(30)
    sh.solarHijriMonthLength(1393, 6).should.be.exactly(29)
    sh.solarHijriMonthLength(1394, 6).should.be.exactly(30)
    sh.solarHijriMonthLength(1395, 6).should.be.exactly(29)
    sh.solarHijriMonthLength(1393, 7).should.be.exactly(31)
    sh.solarHijriMonthLength(1393, 10).should.be.exactly(31)
    sh.solarHijriMonthLength(1393, 12).should.be.exactly(31)
  })
})
