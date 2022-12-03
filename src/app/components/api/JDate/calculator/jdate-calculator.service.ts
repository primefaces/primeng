/* بسم الله الرحمن الرحیم */

import { Injectable } from '@angular/core';
import { div, mod } from '../arithmetics/arithmetics';
import { ISimpleDate } from '../simple-date.interface';
import { JDateValidatorService } from '../validator/jdate-validator.service';

@Injectable({
  providedIn: 'root',
})
export class JDateCalculatorService {
  /** Jalaali years starting the 33-year rule. */
  private breaks: number[] = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];

  constructor(public validator: JDateValidatorService) {}

  /**
   * Calculates the Julian Day number from Gregorian or Julian calendar dates.
   *
   * Only some code cleaning applied to the source code.
   *
   * The procedure was tested to be good since 1 March, -100100 (of both calendars) up to a few million years into the future.
   *
   * @param gDate an instance of javascript date representing a Georgian date.
   *
   * [Implementation in source code]{@link https://github.com/sijad/ts-jalaali/blob/296a7c2fa1816a5bbb0b11bbe3eb03ebc17059f6/src/jalaali.ts#L195}
   */
  public numberOfPassedGDays(gDate: Date): number {
    const gMonth = gDate.getMonth() - 7;
    const gYear = gDate.getFullYear() + 100100;
    const gMonthDiv = div(gMonth, 6);
    const result =
      div((gYear + gMonthDiv) * 1461, 4) +
      div(153 * mod(gMonth + 17, 12) + 2, 5) +
      gDate.getDate() -
      34840408;
    return result - div(div(gYear + gMonthDiv, 100) * 3, 4) + 752;
  }

  /**
   * Returns number of passed days from source day in jalali calendar to the given jalali date.
   *
   * @param jYear full jalali year like 1397
   * @param jMonth starts from zero
   * @param jDay day number starts from one
   */
  public numberOfPassedJDays(
    jYear: number,
    jMonth: number,
    jDay: number
  ): number {
    return (
      this.numberOfPassedGDays(
        new Date(
          this.jalaliYearToGeorgianYear(jYear),
          2,
          this.firstDayOfJYearInMarch(jYear)
        )
      ) +
      jMonth * 31 -
      div(jMonth + 1, 7) * (jMonth - 6) +
      jDay -
      1
    );
  }

  /**
   * Creates a javascript Date object from number of passed days in Georgian calendar representing Georgian date.
   *
   * [Implementation in source code]{@link https://github.com/sijad/ts-jalaali/blob/296a7c2fa1816a5bbb0b11bbe3eb03ebc17059f6/src/jalaali.ts#L213}
   */
  public createGDateFromDays(numOfDays: number): Date {
    const j =
      4 * numOfDays +
      139361631 +
      div(div(4 * numOfDays + 183187720, 146097) * 3, 4) * 4 -
      3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    const gDay = div(mod(i, 153), 5) + 1;
    const gMonth = mod(div(i, 153), 12);
    const gYear = div(j, 1461) - 100100 + div(7 - gMonth, 6);
    return new Date(gYear, gMonth, gDay);
  }

  /**
   * This function returns number of passed leap years from AD 621 until targetGYear.
   *
   * @param targetGYear is full year number like 2018
   *
   * [Implementation in source code]{@link https://github.com/sijad/ts-jalaali/blob/296a7c2fa1816a5bbb0b11bbe3eb03ebc17059f6/src/jalaali.ts#L110}
   */
  public numOfGLeapYears(targetGYear: number): number {
    return div(targetGYear, 4) - div((div(targetGYear, 100) + 1) * 3, 4) - 150;
  }

  /**
   * First day of the Farvardin month in Jalali calendar is in March month. This method returns the day number of new jalali year in March.
   * The day number starts from 1 not zero and is equal to the real numbers in the calendar.
   *
   * @param jYear full jalali year like 1397
   */
  public firstDayOfJYearInMarch(jYear: number): number {
    const gYear = jYear + 621;
    return (
      this.validator.numOfJLeapYears(jYear) - this.numOfGLeapYears(gYear) + 20
    );
  }

  /**
   * Converts jalali year number to the georgian year. Output year is the georgian year that jalali year starts within it, not the year
   * that starts in the winter of jalali year.
   *
   * @param jYear full jalali year like 1397
   */
  public jalaliYearToGeorgianYear(jYear: number): number {
    return jYear + 621;
  }

  /**
   * Converts georgian year to the jalali year. Output year is the jalali year that start within the Georgian year.
   *
   * @param gYear full georgian year like 2018
   */
  public georgianYearToJalaliYear(gYear: number): number {
    return gYear - 621;
  }

  /**
   * This method converts Georgian date to the jalali date. Output is an object implementing ISimpleDate.
   *
   * ATTENTION: month number starts from 0, but day number starts from 1. Just like native javascript Date object.
   *
   * @param gDate Georgian date as a javascript Date object.
   *
   * [Implementation in source code]{@link https://github.com/sijad/ts-jalaali/blob/296a7c2fa1816a5bbb0b11bbe3eb03ebc17059f6/src/jalaali.ts#L149}
   */
  public convertToJalali(gDate: Date): ISimpleDate {
    const georgianYear = gDate.getFullYear();
    let jalaliYear = this.georgianYearToJalaliYear(georgianYear);
    const passedDays = this.numberOfPassedGDays(gDate);
    const numOfPassedDaysTo1Farvardin = this.numberOfPassedGDays(
      new Date(georgianYear, 2, this.firstDayOfJYearInMarch(jalaliYear))
    );

    let jalaliDay: number;
    let jalaliMonth: number;

    // Find number of days that passed since 1 Farvardin.
    let numOfDayInJYear = passedDays - numOfPassedDaysTo1Farvardin;
    if (numOfDayInJYear >= 0) {
      if (numOfDayInJYear <= 185) {
        // The first 6 months.
        jalaliMonth = div(numOfDayInJYear, 31);
        jalaliDay = mod(numOfDayInJYear, 31) + 1;
        return { year: jalaliYear, month: jalaliMonth, day: jalaliDay };
      } else {
        // The remaining months.
        numOfDayInJYear -= 186;
      }
    } else {
      // Previous Jalali year.
      jalaliYear -= 1;
      numOfDayInJYear += 179;
      if (this.validator.isJYearLeap(jalaliYear)) {
        numOfDayInJYear += 1;
      }
    }
    jalaliMonth = 6 + div(numOfDayInJYear, 30);
    jalaliDay = mod(numOfDayInJYear, 30) + 1;
    return { year: jalaliYear, month: jalaliMonth, day: jalaliDay };
  }

  /**
   * Converts a valid jalali date to a javascript Date object representing a equivalent Georgian date.
   *
   * @param jYear a full Jalali year like 1397
   * @param jMonth starts from zero
   * @param jDay starts from 1
   * @throws InvalidJalaliDateError when inputted date is not a valid Jalali date.
   */
  public convertToGeorgian(jYear: number, jMonth: number, jDay: number): Date {
    if (!this.validator.isValidJDate(jYear, jMonth, jDay)) {
      throw new Error('JDateCalculatorService: Invalid jalali date.');
    }
    return this.createGDateFromDays(
      this.numberOfPassedJDays(jYear, jMonth, jDay)
    );
  }

  /**
    This function determines if the Jalaali (Persian) year is
    leap (366-day long) or is the common year (365 days)
    @param jy Jalaali calendar year (-61 to 3177)
    @returns number of years since the last leap year (0 to 4)
  */
  private jalCalLeap(jYear: number) {
    let bl = this.breaks.length,
      jp = this.breaks[0],
      jm,
      jump,
      leap,
      n,
      i;

    if (jYear < jp || jYear >= this.breaks[bl - 1])
      throw new Error('Invalid Jalaali year ' + jYear);

    for (i = 1; i < bl; i += 1) {
      jm = this.breaks[i];
      jump = jm - jp;
      if (jYear < jm) break;
      jp = jm;
    }
    n = jYear - jp;

    if (jump && jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
      leap = 4;
    }

    return leap;
  }

  /**
    Is this a leap year or not?
    @param jYear Jalaali calendar year (-61 to 3177)
  */
  public isLeapJalaaliYear(jYear: number) {
    return this.jalCalLeap(jYear) === 0;
  }

  /**
    Get days count in input year and month.
    @param year Jalaali calendar year (-61 to 3177)
    @param month Jalaali calendar month (0 to 11)
    @returns number of years since the last leap year (0 to 4)
  */
  public jDaysInMonth(year: number, month: number): number {
    year += div(month, 12);
    month = mod(month, 12);
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    if (month < 6) {
      return 31;
    } else if (month < 11) {
      return 30;
    } else if (this.isLeapJalaaliYear(year)) {
      return 30;
    } else {
      return 29;
    }
  }
}
