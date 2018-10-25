import {Component,OnInit} from '@angular/core';
import {EventService} from '../../service/eventservice';

@Component({
    templateUrl: './fullcalendardemo.html'
})
export class FullCalendarDemo implements OnInit {

    events: any[];

    options: any;
    
    header: any;
            
    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents().then(events => {this.events = events;});
        
        this.options = {
            defaultDate: '2017-02-01',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true
        };
    }
}