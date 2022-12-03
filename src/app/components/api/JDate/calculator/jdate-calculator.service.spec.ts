/* بسم الله الرحمن الرحیم */

import { ISimpleDate } from '../simple-date.interface';
import { JDateValidatorService } from '../validator/jdate-validator.service';
import { JDateCalculatorService } from './jdate-calculator.service';

describe('JalaliDateCalculatorService', () => {
  let jalaliDateCalculatorService: JDateCalculatorService;
  beforeEach(() => {
    jalaliDateCalculatorService = new JDateCalculatorService(
      new JDateValidatorService()
    );
  });

  describe('numberOfPassedGDays', () => {
    [
      [new Date(2019, 8, 9), 2458736],
      [new Date(1932, 11, 12), 2427054],
      [new Date(2020, 0, 1), 2458850],
      [new Date(1996, 10, 28), 2450416],
    ].forEach(([dateObj, expectedOutput]) => {
      it(`should return number of passed days in Gregorian date. input: ${dateObj.toString()} expected output: ${expectedOutput}`, () => {
        let jDateObj: JDateCalculatorService;
        if (dateObj instanceof Date) {
          jDateObj = new JDateCalculatorService(new JDateValidatorService());
        }
        // @ts-ignore
        expect(jDateObj.numberOfPassedGDays(dateObj)).toBe(expectedOutput);
      });
    });
  });

  describe('createGDateFromDays', () => {
    [
      [new Date(2019, 8, 9), 2458736],
      [new Date(1932, 11, 12), 2427054],
      [new Date(2020, 0, 1), 2458850],
    ].forEach(([expectedOutput, input]) => {
      it(`should return Gregorian date as a Date object from number of passed days . input: ${input} expected output:
                     ${expectedOutput.toString()}`, () => {
        const jDateObj = new JDateCalculatorService(
          new JDateValidatorService()
        );
        // @ts-ignore
        expect(jDateObj.createGDateFromDays(input)).toEqual(expectedOutput);
      });
    });
  });

  describe('numberOfPassedGDays', () => {
    [
      [new Date(2019, 8, 9), 2458736],
      [new Date(1932, 11, 12), 2427054],
      [new Date(2020, 0, 1), 2458850],
      [new Date(1996, 10, 28), 2450416],
    ].forEach(([dateObj, expectedOutput]) => {
      it(`should return number of passed days in Gregorian date. input: ${dateObj.toString()} expected output: ${expectedOutput}`, () => {
        let jDateObj: JDateCalculatorService;
        if (dateObj instanceof Date) {
          jDateObj = new JDateCalculatorService(new JDateValidatorService());
        }
        // @ts-ignore
        expect(jDateObj.numberOfPassedGDays(dateObj)).toBe(expectedOutput);
      });
    });
  });

  describe('numberOfPassedJDays', () => {
    [
      [1397, 0, 1, 2458199],
      [1375, 11, 30, 2450528],
      [1450, 5, 31, 2477742],
      [1397, 11, 22, 2458556],
    ].forEach(([jYear, jMonth, jDay, expectedOutput]) => {
      it(`should return number of passed days from source date to the given jalali date.
                     numberOfPassedJDays(${jYear}, ${jMonth}, ${jDay}) === ${expectedOutput}`, () => {
        expect(
          jalaliDateCalculatorService.numberOfPassedJDays(jYear, jMonth, jDay)
        ).toBe(expectedOutput);
      });
    });
  });

  describe('createGDateFromDays', () => {
    [
      [new Date(2019, 8, 9), 2458736],
      [new Date(1932, 11, 12), 2427054],
      [new Date(2020, 0, 1), 2458850],
      [new Date(2019, 2, 13), 2458556],
    ].forEach(([expectedOutput, input]) => {
      it(`should return Gregorian date as a Date object from number of passed days . input: ${input} expected output:
                     ${expectedOutput.toString()}`, () => {
        const jDateObj = new JDateCalculatorService(
          new JDateValidatorService()
        );
        // @ts-ignore
        expect(jDateObj.createGDateFromDays(input)).toEqual(expectedOutput);
      });
    });
  });

  describe('numOfGLeapYears', () => {
    [
      [2018, 339],
      [1951, 322],
      [2030, 342],
      [1900, 310],
    ].forEach(([input, expectedOutput]) => {
      it(`should return number of passed leap years from AD 621 until input year. numOfGLeapYears(${input}) === ${expectedOutput} `, () => {
        expect(jalaliDateCalculatorService.numOfGLeapYears(input)).toBe(
          expectedOutput
        );
      });
    });
  });

  describe('firstDayOfJYearInMarch', () => {
    [
      [1398, 21],
      [1375, 20],
      [1395, 20],
      [1400, 21],
    ].forEach(([input, expectedOutput]) => {
      it(`should return number of the day in march that new jalali year begin.
                     firstDayOfJYearInMarch(${input}) === ${expectedOutput}`, () => {
        expect(jalaliDateCalculatorService.firstDayOfJYearInMarch(input)).toBe(
          expectedOutput
        );
      });
    });
  });

  describe('convertToJalali', () => {
    [
      [new Date(2019, 2, 13), { year: 1397, month: 11, day: 22 }],
      [new Date(1924, 2, 28), { year: 1303, month: 0, day: 8 }],
      [new Date(1996, 10, 28), { year: 1375, month: 8, day: 8 }],
      [new Date(2022, 2, 20), { year: 1400, month: 11, day: 29 }],
      [new Date(2019, 2, 21), { year: 1398, month: 0, day: 1 }],
      [new Date(1920, 8, 22), { year: 1299, month: 5, day: 31 }],
    ].forEach(([gDate, jDate]) => {
      // @ts-ignore
      it(`should convert georgian Date (${gDate.toString()}) to jalali date.`, () => {
        // @ts-ignore
        expect(jalaliDateCalculatorService.convertToJalali(gDate)).toEqual(
          jDate as ISimpleDate
        );
      });
    });
  });

  describe('convertToGeorgian', () => {
    [
      [1397, 11, 22, new Date(2019, 2, 13)],
      [1303, 0, 8, new Date(1924, 2, 28)],
      [1375, 8, 8, new Date(1996, 10, 28)],
      [1400, 11, 29, new Date(2022, 2, 20)],
      [1398, 0, 1, new Date(2019, 2, 21)],
      [1299, 5, 31, new Date(1920, 8, 22)],
    ].forEach(([jYear, jMonth, jDay, gDate]) => {
      // @ts-ignore
      it(`should convert Jalali Date {${jYear}, ${jMonth}, ${jDay}}to Georgian date (${gDate.toString()})`, () => {
        // @ts-ignore
        expect(
          jalaliDateCalculatorService.convertToGeorgian(
            jYear as number,
            jMonth as number,
            jDay as number
          )
        ).toEqual(gDate as Date);
      });
    });

    it('should throw InvalidJalaliDateError when inputted date is not a valid date in Jalali calendar.', () => {
      expect(() => {
        jalaliDateCalculatorService.convertToGeorgian(1397, 11, 30);
      }).toThrow(new Error('Invalid JDate.'));
    });
  });
});
