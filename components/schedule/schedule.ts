import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,EventEmitter,IterableDiffers} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-schedule',
    template: `
        <div [ngStyle]="style" [class]="styleClass"></div>
    `
})
export class Schedule implements AfterViewInit,DoCheck,OnDestroy {
    
    @Input() events: any[];
    
    @Input() header: any;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() rtl: boolean;
    
    @Input() weekends: boolean;
    
    @Input() hiddenDays: number[];
        
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
    
    @Input() defaultView: string = 'month';
    
    @Input() allDaySlot: boolean = true;

    @Input() allDayText: string = 'all-day';

    @Input() slotDuration: any = '00:30:00';
    
    @Input() slotLabelInterval: any;
    
    @Input() snapDuration: any;
    
    @Input() scrollTime: any = '06:00:00';
    
    @Input() minTime: any = '00:00:00';
        
    @Input() maxTime: any = '24:00:00';
    
    @Input() slotEventOverlap: boolean = true;
    
    @Input() nowIndicator: boolean;
    
    @Input() dragRevertDuration: number = 500;
    
    @Input() dragOpacity: number = .75;
    
    @Input() dragScroll: boolean = true;
    
    @Input() eventOverlap: any;
        
    @Input() eventConstraint: any;
    
    @Input() locale: any;
    
    @Output() onDayClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventClick: EventEmitter<any> = new EventEmitter();
        
    @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();
            
    @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventDrop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventResize: EventEmitter<any> = new EventEmitter();
    
    @Output() viewRender: EventEmitter<any> = new EventEmitter();
    
    initialized: boolean;
    
    stopNgOnChangesPropagation: boolean;
    
    differ: any;
    
    schedule: any;

    constructor(protected el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.schedule = jQuery(this.el.nativeElement.children[0]);
        let options = {
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
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
            allDaySlot: this.allDaySlot,
            allDayText: this.allDayText,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            events: (start, end, timezone, callback) => {
                callback(this.events);
            },
            dayClick: (date, jsEvent, view) => {
                this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: (calEvent, jsEvent, view) => {
                this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: (calEvent, jsEvent, view) => {
                this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: (event, jsEvent, ui, view) => {
                this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: (event, jsEvent, ui, view) => {
                this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: (event, jsEvent, ui, view) => {
                this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: (event, jsEvent, ui, view) => {
                this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: (view, element) => {
                this.viewRender.emit({
                    'view': view,
                    'element': element                    
                });
            }
        };
        
        if(this.locale) {
            for(var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        
        this.schedule.fullCalendar(options);
        this.initialized = true;
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.events);
        
        if(this.schedule && changes) {
            this.schedule.fullCalendar('refetchEvents');
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    }
    
    gotoDate(date: any) {
        this.schedule.fullCalendar('gotoDate', date);
    }
    
    prev() {
        this.schedule.fullCalendar('prev');
    }
    
    next() {
        this.schedule.fullCalendar('next');
    }
    
    prevYear() {
        this.schedule.fullCalendar('prevYear');
    }
    
    nextYear() {
        this.schedule.fullCalendar('nextYear');
    }
    
    today() {
        this.schedule.fullCalendar('today');
    }
    
    incrementDate(duration: any) {
        this.schedule.fullCalendar('incrementDate', duration);
    }
    
    getDate() {
        return this.schedule.fullCalendar('getDate');
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Schedule],
    declarations: [Schedule]
})
export class ScheduleModule { }
