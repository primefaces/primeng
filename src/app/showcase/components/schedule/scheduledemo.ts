import {Component, OnInit} from '@angular/core';
import {EventService} from '../../service/eventservice';

import { v1 } from 'uuid';
import {Moment} from 'moment';
import moment from 'moment/src/moment';
import {EventObject, ViewObject} from 'fullcalendar';
import { Log, Level } from 'ng2-logger';

@Component({
    templateUrl: './scheduledemo.html',
    styles: [`
        .ui-grid-row div {
          padding: 4px 10px
        }

        .ui-grid-row div label {
          font-weight: bold;
        }
  `]
})
export class ScheduleDemo implements OnInit {

   // The list of event in the fullCalendar library
   events: MyEvent[];

   header: any;
   event: MyEvent;

   creationDialogVisible: boolean = false;
   modificationDialogVisible: boolean = false;

   // Fullcalendar configuration
   // the rendering function
   eventRender: (event: MyEvent, element) => void ;
   defaultView: string;
   timeFormat: string;
   log = Log.create('ScheduleDemo');

    constructor(private eventService: EventService) {
        this.log.data('constructor');
        this.defaultView = 'agendaWeek';
        this.timeFormat = 'HH:mm';
    }

    ngOnInit() {
        this.eventService.getEvents().then(events => {this.events = events; });

        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        // Custom rendering of the sessions
        this.eventRender = (event: EventObject, element: JQuery) => {
            // Example for adding html code after the title
            // element.append('<ul><li>custo</li></ul>');
            // Example for changing the element css
            // element.css('border-color', 'red');
        };

    }

    /**
     * This function should be called when a click occurs on an event in order to put in place the current
     *   fullcalendar event values into the dialog fields
     * @param fullCalendarEvent
     * @param {ViewObject} view
     */
    synchronizeFullCalendarToAngular(fullCalendarEvent: any, view: ViewObject): void {
        this.event = new MyEvent();
        this.event.title = fullCalendarEvent.title;
        const start = fullCalendarEvent.start;
        const end = fullCalendarEvent.end;
        if (end) {
            this.event.end = end.format();
        }

        this.event.id = fullCalendarEvent.id;
        this.event.start = start.format();
    }


    /**
     * Handle day click:
     *   Create a new angular event
     * @param {{date: moment.Moment}} event
     */
        handleDayClick(event: any): void {
        this.event = new MyEvent();
        // generates a unique id for each event or else events are mixed together by fullcalendar when they are moved close to one another
        this.event.id = v1();
        if (event.date.hasTime()) {
            this.event.allDay = false;
            this.event.start = event.date.format('YYYY-MM-DD HH:mm');
            // Creates 3-hour event by default
            this.event.end = event.date.add(3, 'hours').format('YYYY-MM-DD HH:mm');
        } else {
            this.event.allDay = true;
            this.event.start = event.date.format('YYYY-MM-DD');
        }
        this.creationDialogVisible = true;
    }

    /**
     * Handle event click:
     *   load the useful data to angular component into "this.event" and show the dialog
     * @param e {
     *            calEvent:Object, // the fullcalendar event (= session)
     *            jsEvent:n.Event,
     *            view:Et.function.e.constructor
     *          }
     *
     */
    handleEventClick(e): void {
        this.log.data('handleEventClick for id ' + e.calEvent.id);
        this.synchronizeFullCalendarToAngular(e.calEvent, e.view);
        this.modificationDialogVisible = true;
    }


    /**
     * Handle event duration change through resizing:
     *   load the useful data to angular component in "this" and update the mongo DB
     * @param e : {
     *              delta:Ab,
     *              event:Object,  // the fullcalendar event (= session)
     *              jsEvent:n.Event,
     *              revertFunc:function (),
     *              view:Et.function.e.constructor
     *            }
     */
    handleEventResize(e): void {
        this.log.data('handleEventResize for _id ' + e.event._id + ' and id ' + e.event.id);
    }

    /**
     * Handle event drop after being dragged (ie event was moved in time):
     *   load the useful data to angular component in "this" and update the mongo DB
     * @param e : {
     *              delta:Ab,
     *              event:Object,  // the fullcalendar event (= session)
     *              jsEvent:n.Event,
     *              revertFunc:function (),
     *              view:Et.function.e.constructor
     *            }
     */
    handleEventDrop(e): void {
        this.log.data('handleEventDrop for _id ' + e.event._id + ' and id ' + e.event.id);
    }

    /**
     * Create an event based on this.event content (the content is filled by handleDayClick)
     */
    createEvent(): void {
        this.log.data('createEvent with id ' + this.event.id + ' and title: ' + this.event.title);
        this.creationDialogVisible = false;
        this.events.push(this.event);
    }

   /**
     * Update the event title in fullcalendar EventObject
     */
    modifyEvent(): void {
        this.log.data('Modifying event id ' + this.event.id + ' with new title: ' + this.event.title);
        // As of fullcalendar 3.6.0, updating an event won't refresh fullcalendar display
        /*
        this.events.map(
            (event: EventObject) => {
                if (event.id === this.event.id) {
                    event.title = this.event.title;
                }
            }
        );
        */
        // See also this discussion https://github.com/angular-ui/ui-calendar/issues/167
        // For the changes to appear, we need to remove the event an put it back with the new values
        this.events = this.events.filter(
            (event: EventObject) => {
                return event.id !== this.event.id;
             });
        this.events.push(this.event);
        this.modificationDialogVisible = false;
        this.event = null;
    }

    /**
     * Remove an event
     */
    deleteEvent(): void {
        this.modificationDialogVisible = false;
        this.events = this.events.filter(
            (event: EventObject) => {
                return event.id !== this.event.id;
             });
        this.event = null;
    }


}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = false;
}
