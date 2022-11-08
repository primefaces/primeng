import { Component, OnInit } from '@angular/core';
import { defineFullCalendarElement } from '@fullcalendar/web-component';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventService } from '../../service/eventservice';

defineFullCalendarElement();

@Component({
    templateUrl: './fullcalendardemo.html',
    styles: [
        `
            :host ::ng-deep .fc-header-toolbar {
                display: flex;
                flex-wrap: wrap;
            }
        `
    ]
})
export class FullCalendarDemo implements OnInit {
    events: any[];

    options: any;

    header: any;

    constructor(private eventService: EventService) {}

    ngOnInit() {
        this.eventService.getEvents().then((events) => {
            this.events = events;
            this.options = { ...this.options, ...{ events: events } };
        });

        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate: '2019-01-01',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true
        };
    }
}
