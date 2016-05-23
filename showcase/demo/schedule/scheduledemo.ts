import {Component,OnInit,ChangeDetectorRef} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {Schedule} from '../../../components/schedule/schedule';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Calendar} from '../../../components/calendar/calendar';
import {Button} from '../../../components/button/button';
import {InputText} from '../../../components/inputtext/inputtext';
import {Dialog} from '../../../components/dialog/dialog';
import {Checkbox} from '../../../components/checkbox/checkbox';
import {EventService} from '../service/eventservice';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/schedule/scheduledemo.html',
    directives: [Schedule,Button,InputText,Calendar,Dialog,Checkbox,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,EventService],
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

    events: any[];
    
    header: any;
    
    event: MyEvent;
    
    dialogVisible: boolean = false;
    
    idGen: number = 100;
    
    constructor(private eventService: EventService, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.eventService.getEvents().then(events => {this.events = events;});
        
        this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
    }
    
    handleDayClick(event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }
    
    handleEventClick(e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }
        
        if(end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }
    
    saveEvent() {
        //update
        if(this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            if(index >= 0) {
                this.events[index] = this.event;
            }
        }
        //new
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        
        this.dialogVisible = false;
    }
    
    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if(index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }
    
    findEventIndexById(id: number) {
        let index = -1;
        for(let i = 0; i < this.events.length; i++) {
            if(id == this.events[i].id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}