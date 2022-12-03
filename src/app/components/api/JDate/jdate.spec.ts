/* بسم الله الرحمن الرحیم */
import { JDate } from './jdate';

describe('JDate', () => {
  describe('JDate Constructor', () => {
    it('should create an instance', () => {
      expect(new JDate()).toBeTruthy();
    });

    it('should create a valid JDate object from date and time values', () => {
      const jalalyDate = new JDate(1397, 11, 12, 12, 13, 14, 255);
      expect(jalalyDate.format('yyyy-mm-dd HH:MM:SS.l')).toBe(
        '1397-12-12 12:13:14.255'
      );
    });
  });

  describe('pars', () => {
    [
      ['11 دی 1348 00:00:00', -12600000],
      ['11 Dey 1348 00:00:00', -12600000],
    ].forEach(([input, expectedOutput]) => {
      it(`should return passed milliseconds from January 1, 1970, 00:00:00 UTC until given time`, () => {
        // @ts-ignore
        expect(JDate.parse(input)).toBe(expectedOutput);
      });
    });

    ['12:35:30', '11 Day 1348 00:12:00', '-12600000'].forEach((input) => {
      it(`should throw InvalidJalaliDate error when input value (${input}) does not follow the proper pattern`, () => {
        expect(() => {
          JDate.parse(input);
        }).toThrow(new Error('JDateValidatorService: Invalid jalali date.'));
      });
    });
  });

  describe('getDate', () => {
    [
      [new JDate(1397, 11, 29), 29],
      [new JDate('11 دی 1348 00:12:00'), 11],
      [new JDate(1375, 1, 1, 12, 32, 55, 321), 1],
    ].forEach(([jDateObj, day]) => {
      it(`should returns the day of the month for the specified date`, () => {
        // @ts-ignore
        expect(jDateObj.getDate()).toBe(day);
      });
    });
  });

  describe('getDay', () => {
    [
      [new JDate(1397, 11, 24), 0],
      [new JDate(1397, 2, 19), 1],
      [new JDate(1370, 7, 5), 2],
      [new JDate(1370, 7, 27), 3],
      [new JDate(1370, 7, 21), 4],
      [new JDate(1397, 11, 1), 5],
      [new JDate(1397, 11, 23), 6],
    ].forEach(([jDateObj, dayOfWeek]) => {
      it('should return number of the day in the week.', () => {
        // @ts-ignore
        expect(jDateObj.getDay()).toBe(dayOfWeek);
      });
    });
  });

  describe('getFullYear', () => {
    [
      [new JDate(1397, 11, 29), 1397],
      [new JDate('11 دی 1348 00:12:00'), 1348],
      [new JDate(1375, 1, 1, 12, 32, 55, 321), 1375],
    ].forEach(([jDateObj, day]) => {
      it(`should returns the day of the month for the specified date`, () => {
        // @ts-ignore
        expect(jDateObj.getFullYear()).toBe(day);
      });
    });
  });

  describe('getHours', () => {
    [
      [new JDate(1397, 11, 29), 0],
      [new JDate('11 دی 1348 00:12:00'), 0],
      [new JDate(1375, 1, 1, 12, 32, 55, 321), 12],
    ].forEach(([jDateObj, hour]) => {
      it(`should returns the day of the month for the specified date`, () => {
        // @ts-ignore
        expect(jDateObj.getHours()).toBe(hour);
      });
    });
  });

  describe('getMilliseconds', () => {
    [
      [new JDate(1397, 11, 29), 0],
      [new JDate('11 دی 1348 00:12:00'), 0],
      [new JDate(1375, 1, 1, 12, 32, 55, 321), 321],
    ].forEach(([jDateObj, milliseconds]) => {
      it(`should returns the milliseconds of the time`, () => {
        // @ts-ignore
        expect(jDateObj.getMilliseconds()).toBe(milliseconds);
      });
    });
  });

  describe('getMinutes', () => {
    [
      [new JDate(1397, 11, 29), 0],
      [new JDate('11 دی 1348 00:12:00'), 12],
      [new JDate(1375, 1, 1, 12, 32, 55, 321), 32],
    ].forEach(([jDateObj, minutes]) => {
      it(`should returns the getMinutes of the time`, () => {
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(minutes);
      });
    });
  });

  describe('getMonth', () => {
    [
      [new JDate('30 اسفند 1375 13:54:58'), 11],
      [new JDate(1397, 0, 1), 0],
      [new JDate(1375, 5, 1, 12, 32, 55, 321), 5],
    ].forEach(([jDateObj, month]) => {
      it('should return number of the month in the date.', () => {
        // @ts-ignore
        expect(jDateObj.getMonth()).toBe(month);
      });
    });
  });

  describe('getSeconds', () => {
    [
      [new JDate('30 اسفند 1375 13:54:58'), 58],
      [new JDate(1397, 0, 1), 0],
      [new JDate(1375, 5, 1, 12, 32, 55, 321), 55],
    ].forEach(([jDateObj, seconds]) => {
      it('should return number of the seconds in the date.', () => {
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(seconds);
      });
    });
  });

  describe('getTime', () => {
    [
      [new JDate('11 دی 1348 00:00:00'), -12600000],
      [new JDate('11 Dey 1348 00:00:00'), -12600000],
    ].forEach(([jDateObj, time]) => {
      it('should return number of milliseconds since the unix epoch', () => {
        // @ts-ignore
        expect(jDateObj.getTime()).toBe(time);
      });
    });
  });

  describe('setDate', () => {
    [
      [new JDate('29 دی 1348 00:00:00'), 11, -12600000],
      [new JDate('03 Dey 1348 00:00:00'), 11, -12600000],
    ].forEach(([jDateObj, newDate, time]) => {
      it('should return number of milliseconds since the unix epoch', () => {
        // @ts-ignore
        expect(jDateObj.setDate(newDate)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getDate()).toBe(newDate);
      });
    });
  });

  describe('setFullYear', () => {
    [
      [new JDate('11 دی 1397 00:00:00'), 1348, -12600000],
      [new JDate('11 Dey 1400 00:00:00'), 1348, -12600000],
    ].forEach(([jDateObj, newYear, time]) => {
      it('should return number of milliseconds since the unix epoch', () => {
        // @ts-ignore
        expect(jDateObj.setFullYear(newYear)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getFullYear()).toBe(newYear);
      });
    });

    it('should return number of milliseconds since the unix epoch when year and month inputted', () => {
      const jDateObj = new JDate('11 مهر 1397 00:00:00');
      expect(jDateObj.setFullYear(1348, 9)).toBe(-12600000);
    });

    it('should return number of milliseconds since the unix epoch when year and month and day inputted', () => {
      const jDateObj = new JDate('10 مهر 1397 00:00:00');
      expect(jDateObj.setFullYear(1348, 9, 11)).toBe(-12600000);
    });
  });

  describe('setHours', () => {
    [
      [new JDate('11 دی 1348 01:00:00'), 0, -12600000],
      [new JDate('11 Dey 1348 23:00:00'), 0, -12600000],
    ].forEach(([jDateObj, hour, time]) => {
      it('should return number of milliseconds since the unix epoch when only new hour inputted', () => {
        // @ts-ignore
        expect(jDateObj.setHours(hour)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getHours()).toBe(hour);
      });
    });

    [
      [new JDate('11 دی 1348 01:20:00'), 0, 0, -12600000],
      [new JDate('11 Dey 1348 23:59:00'), 0, 0, -12600000],
    ].forEach(([jDateObj, hour, min, time]) => {
      it('should return number of milliseconds since the unix epoch when new hour and minutes inputted', () => {
        // @ts-ignore
        expect(jDateObj.setHours(hour, min)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getHours()).toBe(hour);
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(min);
      });
    });

    [
      [new JDate('11 دی 1348 01:20:03'), 0, 0, 0, -12600000],
      [new JDate('11 Dey 1348 23:59:29'), 0, 0, 0, -12600000],
    ].forEach(([jDateObj, hour, min, sec, time]) => {
      it('should return number of milliseconds since the unix epoch when new hour, minutes and seconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setHours(hour, min, sec)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getHours()).toBe(hour);
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(min);
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(sec);
      });
    });

    [
      [new JDate('11 دی 1348 01:20:03'), 0, 0, 0, 0, -12600000],
      [new JDate('11 Dey 1348 23:59:29'), 0, 0, 0, 0, -12600000],
    ].forEach(([jDateObj, hour, min, sec, milli, time]) => {
      it('should return number of milliseconds since the unix epoch when new hour, minutes, seconds and milliseconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setHours(hour, min, sec, milli)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getHours()).toBe(hour);
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(min);
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(sec);
        // @ts-ignore
        expect(jDateObj.getMilliseconds()).toBe(milli);
      });
    });
  });

  describe('setMilliseconds', () => {
    [
      [new JDate('11 دی 1348 00:00:00'), 0, -12600000],
      [new JDate('11 Dey 1348 00:00:00'), 0, -12600000],
    ].forEach(([jDateObj, milli, time]) => {
      it('should return number of milliseconds since the unix epoch when new milliseconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setMilliseconds(milli)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getMilliseconds()).toBe(milli);
      });
    });
  });

  describe('setMinutes', () => {
    [
      [new JDate('11 دی 1348 00:20:00'), 0, -12600000],
      [new JDate('11 Dey 1348 00:59:00'), 0, -12600000],
    ].forEach(([jDateObj, min, time]) => {
      it('should return number of milliseconds since the unix epoch when new minutes inputted', () => {
        // @ts-ignore
        expect(jDateObj.setMinutes(min)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(min);
      });
    });

    [
      [new JDate('11 دی 1348 00:20:03'), 0, 0, -12600000],
      [new JDate('11 Dey 1348 00:59:29'), 0, 0, -12600000],
    ].forEach(([jDateObj, min, sec, time]) => {
      it('should return number of milliseconds since the unix epoch when new minutes and seconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setMinutes(min, sec)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(min);
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(sec);
      });
    });

    [
      [new JDate('11 دی 1348 00:20:03'), 0, 0, 0, -12600000],
      [new JDate('11 Dey 1348 00:59:29'), 0, 0, 0, -12600000],
    ].forEach(([jDateObj, min, sec, milli, time]) => {
      it('should return number of milliseconds since the unix epoch when new minutes, seconds and milliseconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setMinutes(min, sec, milli)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getMinutes()).toBe(min);
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(sec);
        // @ts-ignore
        expect(jDateObj.getMilliseconds()).toBe(milli);
      });
    });
  });

  describe('setMonth', () => {
    [
      [new JDate('11 اسفند 1348 00:00:00'), 9, -12600000],
      [new JDate('11 Tir 1348 00:00:00'), 9, -12600000],
    ].forEach(([jDateObj, month, time]) => {
      it('should return number of milliseconds since the unix epoch when new Month inputted', () => {
        // @ts-ignore
        expect(jDateObj.setMonth(month)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getMonth()).toBe(month);
      });
    });

    [
      [new JDate('27 خرداد 1348 00:00:00'), 9, 11, -12600000],
      [new JDate('01 Mordad 1348 00:00:00'), 9, 11, -12600000],
    ].forEach(([jDateObj, month, date, time]) => {
      it('should return number of milliseconds since the unix epoch when new month and day inputted', () => {
        // @ts-ignore
        expect(jDateObj.setMonth(month, date)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getMonth()).toBe(month);
        // @ts-ignore
        expect(jDateObj.getDate()).toBe(date);
      });
    });
  });

  describe('setSeconds', () => {
    [
      [new JDate('11 دی 1348 00:00:03'), 0, -12600000],
      [new JDate('11 Dey 1348 00:00:29'), 0, -12600000],
    ].forEach(([jDateObj, sec, time]) => {
      it('should return number of milliseconds since the unix epoch when new seconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setSeconds(sec)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(sec);
      });
    });

    [
      [new JDate('11 دی 1348 00:00:03'), 0, 0, -12600000],
      [new JDate('11 Dey 1348 00:00:29'), 0, 0, -12600000],
    ].forEach(([jDateObj, sec, milli, time]) => {
      it('should return number of milliseconds since the unix epoch when new seconds and milliseconds inputted', () => {
        // @ts-ignore
        expect(jDateObj.setSeconds(sec, milli)).toBe(time);
        // @ts-ignore
        expect(jDateObj.getSeconds()).toBe(sec);
        // @ts-ignore
        expect(jDateObj.getMilliseconds()).toBe(milli);
      });
    });
  });

  describe('setTime', () => {
    [
      [new JDate('11 دی 1348 00:00:00'), -12600000],
      [new JDate('11 Dey 1348 00:00:00'), -12600000],
    ].forEach(([jDateObj, time]) => {
      it('should create JDate object from number of milliseconds since January 1, 1970, 00:00:00 UTC', () => {
        const newDate = new JDate();
        // @ts-ignore
        newDate.setTime(time);
        // @ts-ignore
        expect(jDateObj).toEqual(newDate);
      });
    });
  });

  describe('getNameOfTheDay', () => {
    [
      [new JDate(1397, 11, 24), 'جمعه'],
      [new JDate(1397, 2, 19), 'شنبه'],
      [new JDate(1370, 7, 5), 'یکشنبه'],
      [new JDate(1370, 7, 27), 'دوشنبه'],
      [new JDate(1370, 7, 21), 'سه‌شنبه'],
      [new JDate(1397, 11, 1), 'چهارشنبه'],
      [new JDate(1397, 11, 23), 'پنج‌شنبه'],
    ].forEach(([jDateObj, dayOfWeek]) => {
      it('should return number of the day in the week.', () => {
        // @ts-ignore
        expect(jDateObj.getNameOfTheDay()).toBe(dayOfWeek);
      });
    });
  });

  describe('getNameOfTheMonth', () => {
    [
      [new JDate('30 اسفند 1375 13:54:58'), 'اسفند'],
      [new JDate(1397, 0, 1), 'فروردین'],
      [new JDate(1375, 5, 1, 12, 32, 55, 321), 'شهریور'],
    ].forEach(([jDateObj, month]) => {
      it('should return number of the month in the date.', () => {
        // @ts-ignore
        expect(jDateObj.getNameOfTheMonth()).toBe(month);
      });
    });
  });

  describe('toDateString', () => {
    [
      [new JDate('30 Esfand 1375 13:54:58'), 'پنج‌شنبه اسفند 30 1375'],
      [new JDate(1397, 0, 1), 'چهارشنبه فروردین 1 1397'],
      [new JDate(1377, 5, 1, 12, 32, 55, 321), 'یکشنبه شهریور 1 1377'],
    ].forEach(([jDateObj, dateString]) => {
      it('should return number of the month in the date.', () => {
        // @ts-ignore
        expect(jDateObj.toDateString()).toBe(dateString);
      });
    });
  });

  describe('getHours12hourClock', () => {
    [
      [new JDate(1397, 1, 1, 12), 12],
      [new JDate(1397, 1, 1, 13), 1],
      [new JDate(1397, 1, 1, 14), 2],
      [new JDate(1397, 1, 1, 15), 3],
      [new JDate(1397, 1, 1, 16), 4],
      [new JDate(1397, 1, 1, 17), 5],
      [new JDate(1397, 1, 1, 18), 6],
      [new JDate(1397, 1, 1, 19), 7],
      [new JDate(1397, 1, 1, 20), 8],
      [new JDate(1397, 1, 1, 21), 9],
      [new JDate(1397, 1, 1, 22), 10],
      [new JDate(1397, 1, 1, 23), 11],
      [new JDate(1397, 1, 1, 0), 12],
      [new JDate(1397, 1, 1, 1), 1],
      [new JDate(1397, 1, 1, 2), 2],
      [new JDate(1397, 1, 1, 3), 3],
      [new JDate(1397, 1, 1, 4), 4],
      [new JDate(1397, 1, 1, 5), 5],
      [new JDate(1397, 1, 1, 6), 6],
      [new JDate(1397, 1, 1, 7), 7],
      [new JDate(1397, 1, 1, 8), 8],
      [new JDate(1397, 1, 1, 9), 9],
      [new JDate(1397, 1, 1, 10), 10],
      [new JDate(1397, 1, 1, 11), 11],
    ].forEach(([jDateObj, hour]) => {
      // @ts-ignore
      it(`should convert JDate hour (${jDateObj.getHours()}) to 12-hour clock version (${hour})`, () => {
        // @ts-ignore
        expect(jDateObj.getHours12hourClock()).toBe(hour);
      });
    });
  });

  describe('getTimeMarker', () => {
    [
      [new JDate(1397, 1, 1, 0), false, 'قبل از ظهر'],
      [new JDate(1397, 1, 1, 5), false, 'قبل از ظهر'],
      [new JDate(1397, 1, 1, 13), false, 'بعد از ظهر'],
      [new JDate(1397, 1, 1, 12), false, 'بعد از ظهر'],
      [new JDate(1397, 1, 1, 0), true, 'ق.ظ'],
      [new JDate(1397, 1, 1, 3), true, 'ق.ظ'],
      [new JDate(1397, 1, 1, 13), true, 'ب.ظ'],
      [new JDate(1397, 1, 1, 23), true, 'ب.ظ'],
    ].forEach(([jDateObj, isShortVersion, marker]) => {
      it('should return time marker according to the hour value of the JDate object.', () => {
        // @ts-ignore
        expect(jDateObj.getTimeMarker(isShortVersion)).toBe(marker);
      });
    });
  });

  describe('format', () => {
    [
      [new JDate(1397, 11, 25, 11, 31, 30, 158), 'yyyy-mm-dd', '1397-12-25'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'yyyy-m-d', '1397-1-1'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'yyyy-mm-dd', '1397-01-01'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'yy-mm-dd', '97-01-01'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'yyyy', '1397'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'yy', '97'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'mm', '01'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'm', '1'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'mmm', 'فروردین'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'mmmm', 'Farvardin'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'd', '1'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'dd', '01'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'ddd', 'چهارشنبه'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'dddd', 'Cheharshanbe'],
      [new JDate(1397, 0, 1, 11, 31, 30, 158), 'HH:MM:SS.l', '11:31:30.158'],
      [new JDate(1397, 0, 1, 1, 31, 30, 158), 'HH', '01'],
      [new JDate(1397, 0, 1, 1, 31, 30, 158), 'H', '1'],
      [new JDate(1397, 0, 1, 13, 31, 30, 158), 'hh', '01'],
      [new JDate(1397, 0, 1, 13, 31, 30, 158), 'h', '1'],
      [new JDate(1397, 0, 1, 13, 4, 30, 158), 'MM', '04'],
      [new JDate(1397, 0, 1, 13, 4, 30, 158), 'M', '4'],
      [new JDate(1397, 0, 1, 13, 4, 3, 158), 'SS', '03'],
      [new JDate(1397, 0, 1, 13, 4, 3, 158), 'S', '3'],
      [new JDate(1397, 0, 1, 13, 4, 3, 158), 'l', '158'],
      [new JDate(1397, 0, 1, 13, 4, 3, 158), 'T', 'بعد از ظهر'],
      [new JDate(1397, 0, 1, 3, 4, 3, 158), 't', 'ق.ظ'],
      [
        new JDate(1397, 0, 1, 11, 31, 30, 158),
        'yyyy-mm-dd HH:MM:SS.l',
        '1397-01-01 11:31:30.158',
      ],
    ].forEach(([jDateObj, pattern, formattedString]) => {
      it(`should return formatted string from JDate object.`, () => {
        // @ts-ignore
        expect(jDateObj.format(pattern)).toBe(formattedString);
      });
    });
  });

  describe('toISOString', () => {
    [
      [new JDate(1397, 11, 12, 12, 12, 12, 0), '1397-12-12T12:12:12.0Z'],
      [new JDate(1397, 0, 5, 1, 2, 9, 123), '1397-01-05T01:02:09.123Z'],
    ].forEach(([jDateObj, isoString]) => {
      it('should return iso string from JDate object in Jalali Date', () => {
        // @ts-ignore
        expect(jDateObj.toISOString()).toBe(isoString);
      });
    });
  });

  describe('changeTimeZone', () => {
    [
      [
        new Date(Date.UTC(2022, 2, 11, 23, 0, 10, 20)),
        'Asia/Tehran',
        2022,
        2,
        12,
        2,
        30,
        10,
        20,
      ],
      [
        new Date(Date.parse('20 March 2021 12:00 GMT+0330')),
        'UTC',
        2021,
        2,
        20,
        8,
        30,
        0,
        0,
      ],
    ].forEach(
      ([
        inputDate,
        timezone,
        expectedYear,
        expectedMonth,
        expectedDay,
        expectedHour,
        expectedMinute,
        expectedSeconds,
        expectedMsSeconds,
      ]) => {
        it('should convert input date to the target timezone', () => {
          const convertedDate = JDate.changeTimeZone(
            inputDate as Date,
            timezone as string
          );
          expect(convertedDate.getFullYear()).toEqual(expectedYear as number);
          expect(convertedDate.getMonth()).toEqual(expectedMonth as number);
          expect(convertedDate.getDate()).toEqual(expectedDay as number);
          expect(convertedDate.getHours()).toEqual(expectedHour as number);
          expect(convertedDate.getMinutes()).toEqual(expectedMinute as number);
          expect(convertedDate.getSeconds()).toEqual(expectedSeconds as number);
          expect(convertedDate.getMilliseconds()).toEqual(
            expectedMsSeconds as number
          );
        });
      }
    );
  });
});
