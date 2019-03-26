import {Component,OnInit} from '@angular/core';
import {EventService} from '../../service/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

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
            plugins: [interactionPlugin,dayGridPlugin,timeGridPlugin],
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