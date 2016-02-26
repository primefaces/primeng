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
}