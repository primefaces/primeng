import {NgModule,Component,ElementRef,OnDestroy,Input,OnInit,AfterViewChecked} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Calendar} from 'fullcalendar';

@Component({
    selector: 'p-fullCalendar',
    template: '<div [ngStyle]="style" [class]="styleClass"></div>'
})
export class FullCalendar implements OnDestroy,OnInit,AfterViewChecked {
        
    @Input() style: any;

    @Input() styleClass: string;
             
    initialized: boolean;
            
    calendar: any;
    
    config: any;

    _options: any;

    _events: any[];

    constructor(public el: ElementRef) {}
    
    ngOnInit() {
        this.config = {
            theme: true
        };

        if (this.options) {
            for (let prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    }
    
    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    
    @Input() get events(): any {
        return this._events;
    }

    set events(value: any) {
        this._events = value;

        if (this._events && this.calendar) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this._events);
        }
    }

    @Input() get options(): any {
        return this._options;
    }

    set options(value: any) {
        this._options = value;

        if (this._options && this.calendar) {
            for (let prop in this._options) {
                let optionValue = this._options[prop];
                this.config[prop] = optionValue;
                this.calendar.setOption(prop, optionValue);
            }
        }
    }

    initialize() {
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        
        if (this.events) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this.events);
        }
    }

    getCalendar() {
        return this.calendar;
    }
     
    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
            this.initialized = false;
            this.calendar = null;
        }        
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [FullCalendar],
    declarations: [FullCalendar]
})
export class FullCalendarModule { }
