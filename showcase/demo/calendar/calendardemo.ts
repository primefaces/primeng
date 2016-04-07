import {Component} from 'angular2/core';
import {Calendar} from '../../../components/calendar/calendar';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/calendar/calendardemo.html',
    directives: [Calendar,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
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
    
    es: any;
    
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
        	firstDay: 1,
        	isRTL: false,
        	showMonthAfterYear: false,
        	yearSuffix: "" 
        };
    }
}