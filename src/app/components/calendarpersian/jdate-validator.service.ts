/* بسم الله الرحمن الرحیم */

import { Injectable } from '@angular/core';
import { ArithmeticsService } from './arithmetics.service';

@Injectable()
export class JDateValidatorService {
    private static _minAcceptableYear: number = -61;
    private static _maxAcceptableYear: number = 3177;

    constructor(private arithmetics: ArithmeticsService) {}

    /**
     * Returns number of days in a given month counting from 1.
     *
     * @param jYear full jalali year like 1397
     * @param jMonth number of month from 0 for Farvardin to 11 for Esfand.
     */
    public jMonthLength(jYear: number, jMonth: number): number {
        if (jMonth < 6) {
            return 31;
        }

        if (jMonth < 11 || this.isJYearLeap(jYear)) {
            return 30;
        }

        return 29;
    }

    /**
     * Calculates the number of the leap years in jalali Calendar.
     *
     * @param targetJYear should be full year like: 1397 and should be between -61 to 3177.
     *
     * [Implementation in source code]{@link https://github.com/sijad/ts-jalaali/blob/296a7c2fa1816a5bbb0b11bbe3eb03ebc17059f6/src/jalaali.ts#L71}
     */
    public numOfJLeapYears(targetJYear: number): number {
        // Jalali years starting the 33-year rule.
        const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];

        const breaksLength = breaks.length;

        let jp = breaks[0];

        let jump = 0;

        let leapJ = -14;

        if (!this.isValidJYear(targetJYear)) {
            throw new Error('JDateValidatorService: Invalid jalali date.');
        }

        // Find the limiting years for the Jalali year jy.
        for (let i = 1; i < breaksLength; i += 1) {
            const jm = breaks[i];

            jump = jm - jp;

            if (targetJYear < jm) {
                break;
            }

            leapJ = leapJ + this.arithmetics.div(jump, 33) * 8 + this.arithmetics.div(this.arithmetics.mod(jump, 33), 4);

            jp = jm;
        }

        const n = targetJYear - jp;

        // Find the number of leap years from AD 621 to the beginning
        // Of the current Jalali year in the Persian Calendar.
        leapJ = leapJ + this.arithmetics.div(n, 33) * 8 + this.arithmetics.div(this.arithmetics.mod(n, 33) + 3, 4);

        if (this.arithmetics.mod(jump, 33) === 4 && jump - n === 4) {
            leapJ += 1;
        }

        return leapJ;
    }

    /**
     * If JYear is a leap year in jalali Calendar, return true. We using the fact that if a year is leap, number of leap years until that year
     * and the year after it is not equal.
     *
     * @param jYear full jalali year like: 1397
     */
    public isJYearLeap(jYear: number): boolean {
        return this.numOfJLeapYears(jYear) !== this.numOfJLeapYears(jYear + 1);
    }

    /**
     * Checks if jalali year is in acceptable range or not.
     *
     * [Implementation in source code]{@link https://github.com/sijad/ts-jalaali/blob/296a7c2fa1816a5bbb0b11bbe3eb03ebc17059f6/src/jalaali.ts#L27}
     *
     * @param jYear full jalali year like 1397
     */
    public isValidJYear(jYear: number): boolean {
        return jYear >= JDateValidatorService._minAcceptableYear && jYear <= JDateValidatorService._maxAcceptableYear;
    }

    /**
     * Checks if jalali month is in valid range or not. In default, jMonth should start from zero.
     * If you want to start month number from one instead of zero, you should make startFromZero parameter to false.
     */
    public isValidJMonth(jMonth: number, startFromZero: boolean = true): boolean {
        let minMonthNumber = 0;

        let maxMonthNumber = 11;

        if (!startFromZero) {
            minMonthNumber++;

            maxMonthNumber++;
        }

        return jMonth >= minMonthNumber && jMonth <= maxMonthNumber;
    }

    /**
     * Checks if day number is in valid range according to the given year and month.
     *
     * @param jYear full jalali year like 1397
     * @param jMonth month number starting from zero
     * @param jDay day number starting from one
     */
    public isValidJDay(jYear: number, jMonth: number, jDay: number): boolean {
        return jDay <= this.jMonthLength(jYear, jMonth) && jDay > 0;
    }

    /**
     * If Jalali date is not a valid Jalali date, return false. otherwise returns true.
     *
     * @param jYear full year number like: 1397
     * @param jMonth starts from zero
     * @param jDay starts from one
     */
    public isValidJDate(jYear: number, jMonth: number, jDay: number): boolean {
        return this.isValidJYear(jYear) && this.isValidJMonth(jMonth) && this.isValidJDay(jYear, jMonth, jDay);
    }
}
