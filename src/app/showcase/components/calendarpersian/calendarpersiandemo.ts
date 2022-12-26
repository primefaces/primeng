/* بسم الله الرحمن الرحیم */

import { Component } from '@angular/core';

import { JDate } from 'src/app/components/calendarpersian/JDate/jdate';

@Component({
    templateUrl: './calendarpersiandemo.html'
})
export class CalendarPersianDemo {
    public date1!: JDate;

    public date2!: JDate;

    public date3!: JDate;

    public date4!: JDate;

    public date5!: JDate;

    public date6!: JDate;

    public date7!: JDate;

    public date8!: JDate;

    public date9!: JDate;

    public date10!: JDate;

    public date11!: JDate;

    public date12!: JDate;

    public date13!: JDate;

    public date14!: JDate;

    public dates!: JDate[];

    public rangeDates!: JDate[];

    public minDate!: JDate;

    public maxDate!: JDate;

    public invalidDates!: Array<JDate>;

    ngOnInit() {
        let today = new JDate();

        let month = today.getMonth();

        let year = today.getFullYear();

        let prevMonth = month === 0 ? 11 : month - 1;

        let prevYear = prevMonth === 11 ? year - 1 : year;

        let nextMonth = month === 11 ? 0 : month + 1;

        let nextYear = nextMonth === 0 ? year + 1 : year;

        this.minDate = new JDate();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);

        this.maxDate = new JDate();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new JDate();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today, invalidDate];
    }
}
