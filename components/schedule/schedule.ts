import {Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,EventEmitter,IterableDiffers} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-schedule',
    template: `
        <div></div>
    `
})
export class Schedule {

    initialized: boolean;

    @Input() events: any[];

    @Input() style: string;

    @Input() styleClass: string;
    
    stopNgOnChangesPropagation: boolean;
    
    differ: any;
    
    schedule: any;

    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.schedule = jQuery(this.el.nativeElement.children[0]);
        this.schedule.fullCalendar({
            theme: true,
            events: (start, end, timezone, callback) => {
                callback(this.events);
            }
        });
        this.initialized = true;
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.events);
        
        if(changes) {
            this.schedule.fullCalendar('refetchEvents');
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
    }

}