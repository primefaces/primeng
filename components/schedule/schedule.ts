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
    
    @Input() defaultView: string = 'month';
    
    @Input() allDaySlot: boolean = true;
    
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
            allDayslot: this.allDaySlot,
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
            eventOverlay: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            events: (start, end, timezone, callback) => {
                callback(this.events);
            },
            dayClick: (date, jsEvent, view) => {
                this.onDayClick.next({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.onEventClick.next({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: (calEvent, jsEvent, view) => {
                this.onEventMouseover.next({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: (calEvent, jsEvent, view) => {
                this.onEventMouseover.next({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: (event, jsEvent, ui, view) => {
                this.onEventDragStart.next({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: (event, jsEvent, ui, view) => {
                this.onEventDragStop.next({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventDragStop.next({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: (event, jsEvent, ui, view) => {
                this.onEventResizeStart.next({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: (event, jsEvent, ui, view) => {
                this.onEventResizeStop.next({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventResize.next({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
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