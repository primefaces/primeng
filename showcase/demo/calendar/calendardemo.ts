import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/calendar/calendardemo.html'
})
export class CalendarDemo {

    date1: Date;

    date2: Date;

    date3: Date;

    date4: Date;

    date5: Date;

    date6: Date;
    
    date7: Date;
    
    date8: Date;
    
    minDate: Date;
    
    maxDate: Date;
    
    es: any;

    ngOnInit() {
        this.onChangeLocaleES()
        
        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month -1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
    }

    onChangeLocaleES() {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
        }
    };

    onChangeLocalePL() {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
            dayNamesShort: ['pon.', 'wt.', 'śr.', 'czw.', 'piąt.', 'sob.', 'niedz.'],
            dayNamesMin: ['pn.', 'wt.', 'śr.', 'czw.', 'pt.', 'so.', 'ni.'],
            monthNames: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
            monthNamesShort: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
        };
    }

    onChangeLocaleEN() {
        this.es = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        };
    }
}