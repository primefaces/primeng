import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';

class FullCalendar {
    constructor(el) {
        this.el = el;
    }
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
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
        if (this._events && this.calendar) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this._events);
        }
    }
    get options() {
        return this._options;
    }
    set options(value) {
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
FullCalendar.decorators = [
    { type: Component, args: [{
                selector: 'p-fullCalendar',
                template: '<div [ngStyle]="style" [class]="styleClass"></div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
FullCalendar.ctorParameters = () => [
    { type: ElementRef }
];
FullCalendar.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    events: [{ type: Input }],
    options: [{ type: Input }]
};
class FullCalendarModule {
}
FullCalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [FullCalendar],
                declarations: [FullCalendar]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { FullCalendar, FullCalendarModule };
//# sourceMappingURL=primeng-fullcalendar.js.map
