/*
  Expose functions.
*/
module.exports =
  { toSolarHijri: toSolarHijri
  , toGregorian: toGregorian
  , isValidSolarHijriDate: isValidSolarHijriDate
  , isLeapSolarHijriYear: isLeapSolarHijriYear
  , solarHijriMonthLength: solarHijriMonthLength
  , solarHijriCal: solarHijriCal
  , h2j: h2j // solarHijri to Julian
  , j2h: j2h // Julian to solarHijri
  , g2j: g2j // Gregoria to Julian
  , j2g: j2g // Julian to Gregoria
  }

/*
  Converts a Gregorian date to SolarHijri.
*/
function toSolarHijri(gy, gm, gd) {
  if (Object.prototype.toString.call(gy) === '[object Date]') {
    gd = gy.getDate()
    gm = gy.getMonth() + 1
    gy = gy.getFullYear()
  }
  return j2h(g2j(gy, gm, gd))
}

/*
  Converts a SolarHijri date to Gregorian.
*/
function toGregorian(hy, hm, hd) {
  return j2g(h2j(hy, hm, hd))
}

/*
  Checks whether a SolarHijri date is valid or not.
*/
function isValidSolarHijriDate(hy, hm, hd) {
  return  hy >= -61 && hy <= 3177 &&
          hm >= 1 && hm <= 12 &&
          hd >= 1 && hd <= solarHijriMonthLength(hy, hm)
}

/*
  Is this a leap year or not?
*/
function isLeapSolarHijriYear(hy) {
  return solarHijriCal(hy).leap == true
}

/*
  Number of days in a given month in a SolarHijri year.
*/
function solarHijriMonthLength(hy, hm) {
  if (hm <= 5) return 30
  if (hm >= 7) return 31
  // here where hm = 6.
  if (isLeapSolarHijriYear(hy)) {
    return 30
  } else {
    return 29
  }
}

/*
  This function determines if the SolarHijri year is
  leap (366-day long) or is the common year (365 days), and
  finds the day in September (Gregorian calendar) of the first
  day of the SolarHijri year (hy).

  @param hy SolarHijri calendar year (-61 to 3177)
  @return
    leap: number of years since the last leap year (0 to 4)
    gy: Gregorian year of the beginning of SolarHijri year
    startDate: the 1st Libra (Mizān) date which matches 23 September of the givin
    Solar Hijri year (1st day of hy)
*/
function solarHijriCal(hy) {
  var gy = hy + 621,
    pgy = gy + 1

  return  { leap: ((pgy % 4 == 0) && (pgy % 100 != 0)) || (pgy % 400 == 0)
          , gy: gy
          , startDate: 23 // 23 Sep
          }
}

/*
  Converts a date of the SolarHijri calendar to the Julian Day number.

  @param hy SolarHijri year (1 to 3100)
  @param hm SolarHijri month (1 to 12)
  @param hd SolarHijri day (1 to 29/31)
  @return Julian Day number
*/
function h2j(hy, hm, hd) {
  var r = solarHijriCal(hy),
    leap = r.leap ? 0:-1
  return g2j(r.gy, 9, r.startDate) + (hm - 1) * 30 + div(hm, 7) * (hm - 7) + hd - 1 + (div(hm, 7) * leap)
}

/*
  Converts the Julian Day number to a date in the SolarHijri calendar.

  @param hdn Julian Day number
  @return
    hy: SolarHijri year (1 to 3100)
    hm: SolarHijri month (1 to 12)
    hd: SolarHijri day (1 to 29/31)
*/
function j2h(hdn) {
  var gy = j2g(hdn).gy // Calculate Gregorian year (gy).
    , hy = gy - 621
    , r = solarHijriCal(hy)
    , hdn1l = g2j(gy, 9, r.startDate)// Julian day number of 1st Libra(Mizān)
    , leap = r.leap ? 1:0
    , hd
    , hm
    , k

    k = hdn - hdn1l
    if(k >= 0 && k <= 99) {
      // 23/9G to 31/12G
      hm = 1 + div(k, 30)
      hd = mod(k, 30) + 1
      return  { hy: hy
              , hm: hm
              , hd: hd
              }
    } else {
      // k is less than 0
      // Previous SolarHijri year.
      k += 365
      hy -= 1
      r = solarHijriCal(hy)
      leap = r.leap ? 1:0


      if(k <= 178) {
        // the 4th to 6th month are 30 days.
        k += leap
        hm = 1 + div(k, 30)
        hd = mod(k, 30) + 1
        return  { hy: hy
                , hm: hm
                , hd: hd
                }
      } else {
        // the 7th to 12th month are 31 days.
        k -= 179
        hm = 7 + div(k, 31)
        hd = mod(k, 31) + 1
        return  { hy: hy
                , hm: hm
                , hd: hd
                }
      }

    }


}

/*
  Calculates the Julian Day number from Gregorian or Julian
  calendar dates. This integer number corresponds to the noon of
  the date (i.e. 12 hours of Universal Time).
  The procedure was tested to be good since 1 March, -100100 (of both
  calendars) up to a few million years into the future.

  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
  @param gm Calendar month (1 to 12)
  @param gd Calendar day of the month (1 to 28/29/30/31)
  @return Julian Day number
*/
function g2j(gy, gm, gd) {
  var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
      + div(153 * mod(gm + 9, 12) + 2, 5)
      + gd - 34840408
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
  return d
}

/*
  Calculates Gregorian and Julian calendar dates from the Julian Day number
  (hdn) for the period since hdn=-34839655 (i.e. the year -100100 of both
  calendars) to some millions years ahead of the present.

  @param hdn Julian Day number
  @return
    gy: Calendar year (years BC numbered 0, -1, -2, ...)
    gm: Calendar month (1 to 12)
    gd: Calendar day of the month M (1 to 28/29/30/31)
*/
function j2g(hdn) {
  var j
    , i
    , gd
    , gm
    , gy
  j = 4 * hdn + 139361631
  j = j + div(div(4 * hdn + 183187720, 146097) * 3, 4) * 4 - 3908
  i = div(mod(j, 1461), 4) * 5 + 308
  gd = div(mod(i, 153), 5) + 1
  gm = mod(div(i, 153), 12) + 1
  gy = div(j, 1461) - 100100 + div(8 - gm, 6)
  return  { gy: gy
          , gm: gm
          , gd: gd
          }
}

/*
  Utility helper functions.
*/

function div(a, b) {
  return ~~(a / b)
}

function mod(a, b) {
  return a - ~~(a / b) * b
}
