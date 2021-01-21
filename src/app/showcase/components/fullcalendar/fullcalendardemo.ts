import {Component,OnInit} from '@angular/core';
import {EventService} from '../../service/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
            plugins:[ dayGridPlugin, timeGridPlugin, interactionPlugin ],
            defaultDate: '2017-02-01',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };
    }
}