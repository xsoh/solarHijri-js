# SolarHijri JavaScript

A javascript functions for converting SolarHijri (Shamsi) and Gregorian calendar systems to each other based on Umm al-Qura Solar Hijri calculations.

## About

SolarHijri calendar is solar Hijri calendar based on Umm al-Qura Solar Hijri calculations which has little different than the Iranian [Jalali calculations](http://en.wikipedia.org/wiki/Jalali_calendar).

## Install

soon...

## API

### toSolarHijri(gy, gm, gd)

Converts a Gregorian date to SolarHijri.

```js
solarHijri.toSolarHijri(2017, 9, 23) // {  }
```

### toSolarHijri(date)

Converts a JavaScript Date object to SolarHijri.

```js
solarHijri.toSolarHijri(new Date(2017, 9, 23)) // { hy: 1396, hm: 1, hd: 1 }
```

### toGregorian(hy, hm, hd)

Converts a SolarHijri date to Gregorian.

```js
solarHijri.toGregorian(1396, 1, 1) // { gy: 2017, gm: 9, gd: 23 }
```

### isValidSolarHijriDate(hy, hm, hd)

Checks whether a SolarHijri date is valid or not.

```js
solarHijri.isValidSolarHijriDate(1393, 1, 31) // false
solarHijri.isValidSolarHijriDate(1393, 1, 30) // true
```

### isLeapSolarHijriYear(hy)

Is this a leap year or not?

```js
solarHijri.isLeapSolarHijriYear(1393) // false
solarHijri.isLeapSolarHijriYear(1394) // true
```

### solarHijriMonthLength(hy, hm)

Number of days in a given month in a SolarHijri year.

```js
solarHijri.solarHijriMonthLength(1393, 1) // 30
solarHijri.solarHijriMonthLength(1395, 6) // 29
```

### solarHijriCal(hy)

This function determines if the SolarHijri year is leap (366-day long) or is the common year (365 days), and finds the day in September (Gregorian calendar) of the first day of the SolarHijri year (hy).

```js
solarHijri.solarHijriCal(1390) // { leap: true, gy: 2011, startDate: 23 }
solarHijri.solarHijriCal(1393) // { leap: false, gy: 2014, startDate: 23 }
solarHijri.solarHijriCal(1394) // { leap: true, gy: 2015, startDate: 23 }
solarHijri.solarHijriCal(1395) // { leap: false, gy: 2016, startDate: 23 }
```

### h2j(hy, hm, hd)

Converts a date of the SolarHijri calendar to the Julian Day number.

```js
solarHijri.h2j(1395, 1, 23) // 2457677
```

### j2h(hdn)

Converts the Julian Day number to a date in the SolarHijri calendar.

```js
solarHijri.j2h(2457490) // { hy: 1394, hm: 7, hd: 22 }
```

### g2j(gy, gm, gd)

Calculates the Julian Day number from Gregorian or Julian calendar dates. This integer number corresponds to the noon of the date (i.e. 12 hours of Universal Time). The procedure was tested to be good since 1 March, -100100 (of both calendars) up to a few million years into the future.

```js
solarHijri.g2j(2016, 4, 11) // 2457490
```

### j2g(hdn)

Calculates Gregorian and Julian calendar dates from the Julian Day number (hdn) for the period since hdn=-34839655 (i.e. the year -100100 of both calendars) to some millions years ahead of the present.

```js
solarHijri.j2g(2457490) // { gy: 2016, gm: 4, gd: 11 }
```

## Acknowledgements

This project was built from the great work done by [Jalali-js project](https://github.com/solarHijri/solarHijri-js).

## License

MIT
