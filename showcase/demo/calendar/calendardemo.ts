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
    
    minDate: Date;
    
    maxDate: Date;
    
    es: any;
    
    tr: any;
    
    ngOnInit() {
        this.es = {
            closeText: "Cerrar",
        	prevText: "&#x3C;Ant",
        	nextText: "Sig&#x3E;",
        	currentText: "Hoy",
        	monthNames: [ "enero","febrero","marzo","abril","mayo","junio",
        	"julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        	monthNamesShort: [ "ene","feb","mar","abr","may","jun",
        	"jul","ago","sep","oct","nov","dic" ],
        	dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        	dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        	dayNamesMin: [ "D","L","M","X","J","V","S" ],
        	weekHeader: "Sm",
        	dateFormat: "dd/mm/yy",
        	firstDayOfWeek: 1,
        	isRTL: false,
        	showMonthAfterYear: false,
        	yearSuffix: "" 
        };
        
        this.tr = {
            firstDayOfWeek : 1
        };
        
        let today = new Date();
        let month = today.getMonth();
        let prevMonth = (month === 0) ? 11 : month -1;
        let nextMonth = (month === 11) ? 0 : month + 1;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
    }
}