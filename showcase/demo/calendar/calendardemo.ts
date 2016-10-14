import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/calendar/calendardemo.html'
})
export class CalendarDemo {

    date1: string;

    date2: string;

    date3: string;

    date4: string;

    date5: string;

    date6: string;

    date7: string;

    date8: string;

    date9: string;

    date10: string;
    
    date11: string;
    
    date12: string;
    
    date13: string;
    
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