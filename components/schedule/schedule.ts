import {Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,EventEmitter,IterableDiffers} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-schedule',
    template: `
        <div [attr.style]="style" [attr.class]="styleClass"></div>
    `
})
export class Schedule {
    
    @Input() events: any[];
    
    @Input() header: any;

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() rtl: boolean;
    
    @Input() weekends: boolean;
    
    @Input() hiddenDays: number[];
    
    @Input() lang: string;
    
    @Input() fixedWeekCount: boolean;
    
    @Input() weekNumbers: boolean;
    
    @Input() businessHours: any;
    
    @Input() height: any;
    
    @Input() contentHeight: any;
    
    @Input() aspectRatio: number = 1.35;
    
    @Input() eventLimit: any;
    
    @Input() defaultDate: any;
    
    @Input() editable: boolean;
    
    @Input() eventStartEditable: boolean;
    
    @Input() eventDurationEditable: boolean;
    
    @Input() defaultView: string;
    
    initialized: boolean;
    
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
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            lang: this.lang,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            editable: this.editable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
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
        this.schedule = null;
    }

}