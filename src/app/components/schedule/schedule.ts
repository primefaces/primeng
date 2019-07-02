import {NgModule,Component,ElementRef,OnDestroy,DoCheck,OnChanges,Input,Output,EventEmitter,IterableDiffers,OnInit,AfterViewChecked,SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

declare const FullCalendar: any;

@Component({
    selector: 'p-schedule',
    template: '<div [ngStyle]="style" [class]="styleClass"></div>'
})
export class Schedule implements DoCheck,OnDestroy,OnInit,OnChanges,AfterViewChecked {
    
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
    
    @Input() droppable: boolean;
    
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
    
    @Input() locale: string;

    @Input() timezone: boolean | string = false;
    
    @Input() timeFormat: string | null = null;

    @Input() eventRender: Function;
    
    @Input() dayRender: Function;
    
    @Input() navLinks: boolean;
        
    @Output() onDayClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onDrop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventClick: EventEmitter<any> = new EventEmitter();
        
    @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();
            
    @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventDrop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();
    
    @Output() onEventResize: EventEmitter<any> = new EventEmitter();
    
    @Output() onViewRender: EventEmitter<any> = new EventEmitter();
    
    @Output() onViewDestroy: EventEmitter<any> = new EventEmitter();

    @Output() onNavLinkDayClick: EventEmitter<any> = new EventEmitter();

    @Output() onNavLinkWeekClick: EventEmitter<any> = new EventEmitter();
        
    initialized: boolean;
    
    stopNgOnChangesPropagation: boolean;
    
    differ: any;
    
    calendar: any;
    
    config: any;

    _options: any;

    constructor(public el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }
    
    ngOnInit() {
        this.config = {
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
            locale: this.locale,
            timezone: this.timezone,
            timeFormat: this.timeFormat,
            editable: this.editable,
            droppable: this.droppable,
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
            eventRender: this.eventRender,
            dayRender: this.dayRender,
            navLinks: this.navLinks,
            dayClick: (date, jsEvent, view) => {
                this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            drop: (date, jsEvent, ui, resourceId) => {
                this.onDrop.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'ui': ui,
                    'resourceId': resourceId
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
                this._updateEvent(event);
                
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
                this._updateEvent(event);
                
                this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: (view, element) => {
                this.onViewRender.emit({
                    'view': view,
                    'element': element                    
                });
            },
            viewDestroy: (view, element) => {
              this.onViewDestroy.emit({
                'view': view,
                'element': element
              });
            },
            navLinkDayClick: (weekStart, jsEvent) => {
                this.onNavLinkDayClick.emit({
                    'weekStart': weekStart,
                    'event': jsEvent
                });
            },
            navLinkWeekClick: (weekStart, jsEvent) => {
                this.onNavLinkWeekClick.emit({
                    'weekStart': weekStart,
                    'event': jsEvent
                });
            }
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
    
    ngOnChanges(changes: SimpleChanges) {
        if (this.calendar) {
            for (let propName in changes) {
                if (propName !== 'options' && propName !== 'events') {
                    this.calendar.option(propName, changes[propName].currentValue);
                }                
            }
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
                this.calendar.option(prop, optionValue);
            }
        }
    }

    initialize() {
        this.calendar = new FullCalendar.Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.addEventSource(this.events);
        }
    }
     
    ngDoCheck() {
        let changes = this.differ.diff(this.events);
        
        if (this.calendar && changes) {
            this.calendar.removeEventSources();
            
            if (this.events) {
                this.calendar.addEventSource(this.events);
            }
        }
    }

    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy;
            this.initialized = false;
            this.calendar = null;
        }        
    }
    
    gotoDate(date: any) {
        this.calendar.gotoDate(date);
    }
    
    prev() {
        this.calendar.prev();
    }
    
    next() {
        this.calendar.next();
    }
    
    prevYear() {
        this.calendar.prevYear();
    }
    
    nextYear() {
        this.calendar.nextYear();
    }
    
    today() {
        this.calendar.today();
    }
    
    incrementDate(duration: any) {
        this.calendar.incrementDate(duration);
    }
     
    changeView(viewName: string, dateOrRange: any) {
        this.calendar.changeView(viewName, dateOrRange);
    }
    
    getDate() {
        return this.calendar.getDate();
    }
   
    updateEvent(event: any) {
        this.calendar.updateEvent(event);
    }
 
    _findEvent(id: string) {
        let event;
        if (this.events) {
            for (let e of this.events) {
                if (e.id === id) {
                    event = e;
                    break;
                }
            }
        }
        return event;
    }
    
    _updateEvent(event: any) {
        let sourceEvent = this._findEvent(event.id);
        if (sourceEvent) {
            sourceEvent.start = event.start.format();
            if (event.end) {
                sourceEvent.end = event.end.format();
            }    
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Schedule],
    declarations: [Schedule]
})
export class ScheduleModule { }