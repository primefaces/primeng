import {Component,OnInit} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Schedule} from '../../../components/schedule/schedule';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {EventService} from '../service/eventservice';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/schedule/scheduledemo.html',
    directives: [Schedule,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,EventService]
})
export class ScheduleDemo implements OnInit {

    events: any[];
    
    header: any;
    
    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents().then(events => {this.events = events;});
        
        this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
    }
}