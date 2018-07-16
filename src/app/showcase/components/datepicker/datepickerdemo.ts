import {Component} from '@angular/core';
import {DatePickerLocaleData} from '../../../components/datepicker/datepicker';


@Component({
    templateUrl: './datepickerdemo.html'
})
export class DatepickerDemo {

    date1: Date;

    date2: Date;

    date3: Date;

    date4: Date;

    date5: Date;

    date6: Date;

    date7: Date;

    date8: Date;

    date9: Date;

    date10: Date;

    date11: Date;

    dates: Date[];

    rangeDates: Date[];

    minDate: Date;

    maxDate: Date;

    invalidDates: Array<Date>;


    public esFirstDayOfWeek: number;
    public esLocale: DatePickerLocaleData;

    ngOnInit() {
        this.esFirstDayOfWeek = 3;
        this.esLocale = {
            dayNames: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
            dayNamesShort: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'],
            dayNamesMin: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            pm: 'PM',
            am: 'AM',
            today: 'Hoy',
            clear: 'Borrar',
            year: 'Año',
            month: 'Mes',
            hour: 'Hora',
            minute: 'Minuto',
            second: 'Segundo',
            fromHour: 'Desde la Hora',
            fromMinute: 'Desde el Minuto',
            fromSecond: 'Desde el segundo',
            toHour: 'A la Hora',
            toMinute: 'Al Minuto',
            toSecond: 'Al Segundo'
        };

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() + 3);
        this.invalidDates = [today, invalidDate];
    }
}
