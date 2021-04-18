import {Component} from '@angular/core';
import * as moment from 'jalali-moment';


@Component({
    templateUrl: './calendardemo.html'
})
export class CalendarDemo {

    date1: moment.Moment;

    date2: moment.Moment;

    date3: moment.Moment;

    date4: moment.Moment;

    date5: moment.Moment;

    date6: moment.Moment;
    
    date7: moment.Moment;
    
    date8: moment.Moment;
    
    date9: moment.Moment;
    
    date10: moment.Moment;
    
    date11: moment.Moment;

    date12: moment.Moment;

    date13: moment.Moment;

    date14: moment.Moment;
    
    dates: moment.Moment[];
    
    rangeDates: moment.Moment[];
    
    minDate: moment.Moment;
    
    maxDate: moment.Moment;
    
    invalidDates: Array<moment.Moment>;
    
    es: any;

    ngOnInit() {
        this.es = {
        	firstDayOfWeek: 1,
        	dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        	dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        	dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        	monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        };
        
        let today = moment();
        let month = today.month();
        let year = today.year();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = moment();
        this.minDate.set('month',prevMonth);
        this.minDate.year(prevYear);
        this.maxDate = moment();
        this.maxDate.set('month' , nextMonth);
        this.maxDate.year(nextYear);
        
        let invalidDate = moment();
        invalidDate.set('day',today.date() - 1);
        this.invalidDates = [today,invalidDate];
    }
 }