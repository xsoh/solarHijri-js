//typings
declare module "solarHijri-js" {

    namespace SolarHijriJS {

        interface gregorianDate {
            gy: number;
            gm: number;
            gd: number;
        }

        interface hijriDate {
            hy: number;
            hm: number;
            hd: number;
        }

        interface hijriCal {
            leap: number;
            gy: number;
            startDate: number;
        }

        function toSolarHijri(gy: number, gm: number, gd: number): hijriDate;

        function toGregorian(hy: number, hm: number, hd: number): gregorianDate;

        function isValidSolarHijriDate(hy: number, hm: number, hd: number): boolean;

        function isLeapSolarHijriYear(hy: number): boolean;

        function solarHijriMonthLength(hy: number, hm: number): number;

        function solarHijriCal(hy:number): hijriCal;

        function h2j(hy: number, hm: number, hd: number): gregorianDate;

        function j2h(hdn: number): hijriDate;

        function g2j(gy: number, gm: number, gd: number): number;

        function j2g(hdn: number): gregorianDate;

    }

    export = SolarHijriJS
}