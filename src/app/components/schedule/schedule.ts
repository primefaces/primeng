import {
    NgModule,
    Component,
    ElementRef,
    OnDestroy,
    DoCheck,
    OnChanges,
    Input,
    Output,
    EventEmitter,
    IterableDiffers,
    OnInit,
    AfterViewChecked,
    SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';

declare var jQuery: any;

// tslint:disable:no-output-on-prefix
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-schedule',
    template: '<div [ngStyle]="style" [class]="styleClass"></div>'
})
export class ScheduleComponent implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked {

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

    @Input() aspectRatio = 1.35;

    @Input() eventLimit: any;

    @Input() defaultDate: any;

    @Input() editable: boolean;

    @Input() droppable: boolean;

    @Input() eventStartEditable: boolean;

    @Input() eventDurationEditable: boolean;

    @Input() defaultView = 'month';

    @Input() allDaySlot = true;

    @Input() allDayText = 'all-day';

    @Input() slotDuration: any = '00:30:00';

    @Input() slotLabelInterval: any;

    @Input() snapDuration: any;

    @Input() scrollTime: any = '06:00:00';

    @Input() minTime: any = '00:00:00';

    @Input() maxTime: any = '24:00:00';

    @Input() slotEventOverlap = true;

    @Input() nowIndicator: boolean;

    @Input() dragRevertDuration = 500;

    @Input() dragOpacity = .75;

    @Input() dragScroll = true;

    @Input() eventOverlap: any;

    @Input() eventConstraint: any;

    @Input() locale: string;

    @Input() timezone: boolean | string = false;

    @Input() timeFormat: string | null = null;

    @Input() eventRender: Function;

    @Input() dayRender: Function;

    @Input() navLinks: boolean;

    @Input() options: any;

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

    schedule: any;

    config: any;

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
                this.onDayClick.emit({ date, jsEvent, view });
            },
            drop: (date, jsEvent, ui, resourceId) => {
                this.onDrop.emit({ date, jsEvent, ui, resourceId });
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.onEventClick.emit({ calEvent, jsEvent, view });
            },
            eventMouseover: (calEvent, jsEvent, view) => {
                this.onEventMouseover.emit({ calEvent, jsEvent, view });
            },
            eventMouseout: (calEvent, jsEvent, view) => {
                this.onEventMouseout.emit({ calEvent, jsEvent, view });
            },
            eventDragStart: (event, jsEvent, ui, view) => {
                this.onEventDragStart.emit({ event, jsEvent, view });
            },
            eventDragStop: (event, jsEvent, ui, view) => {
                this.onEventDragStop.emit({ event, jsEvent, view });
            },
            eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                this._updateEvent(event);

                this.onEventDrop.emit({ event, delta, revertFunc, jsEvent, view });
            },
            eventResizeStart: (event, jsEvent, ui, view) => {
                this.onEventResizeStart.emit({ event, jsEvent, view });
            },
            eventResizeStop: (event, jsEvent, ui, view) => {
                this.onEventResizeStop.emit({ event, jsEvent, view });
            },
            eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                this._updateEvent(event);

                this.onEventResize.emit({ event, delta, revertFunc, jsEvent, view });
            },
            viewRender: (view, element) => {
                this.onViewRender.emit({ view, element });
            },
            viewDestroy: (view, element) => {
              this.onViewDestroy.emit({ view, element });
            },
            navLinkDayClick: (weekStart, event) => {
                this.onNavLinkDayClick.emit({ weekStart, event });
            },
            navLinkWeekClick: (weekStart, event) => {
                this.onNavLinkWeekClick.emit({ weekStart, event });
            }
        };

        if (this.options) {
            for (const prop of Object.keys(this.options)) {
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
        if (this.schedule) {
            const options = {};
            for (const change in changes) {
                if (change !== 'events') {
                    options[change] = changes[change].currentValue;
                }
            }

            if (Object.keys(options).length) {
                this.schedule.fullCalendar('option', options);
            }
        }
    }

    initialize() {
        this.schedule = jQuery(this.el.nativeElement.children[0]);
        this.schedule.fullCalendar(this.config);
        if (this.events) {
            this.schedule.fullCalendar('addEventSource', this.events);
        }
        this.initialized = true;
    }

    ngDoCheck() {
        const changes = this.differ.diff(this.events);

        if (this.schedule && changes) {
            this.schedule.fullCalendar('removeEventSources');

            if (this.events) {
                this.schedule.fullCalendar('addEventSource', this.events);
            }
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

    changeView(viewName: string) {
        this.schedule.fullCalendar('changeView', viewName);
    }

    getDate() {
        return this.schedule.fullCalendar('getDate');
    }

    updateEvent(event: any) {
        this.schedule.fullCalendar('updateEvent', event);
    }

    _findEvent(id: string) {
        let event;
        if (this.events) {
            for (const e of this.events) {
                if (e.id === id) {
                    event = e;
                    break;
                }
            }
        }
        return event;
    }

    _updateEvent(event: any) {
        const sourceEvent = this._findEvent(event.id);
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
    exports: [ScheduleComponent],
    declarations: [ScheduleComponent]
})
export class ScheduleModule { }
