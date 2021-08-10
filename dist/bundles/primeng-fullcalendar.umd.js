(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@fullcalendar/core')) :
    typeof define === 'function' && define.amd ? define('primeng/fullcalendar', ['exports', '@angular/core', '@angular/common', '@fullcalendar/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.fullcalendar = {}), global.ng.core, global.ng.common, global.core));
}(this, (function (exports, core$1, common, core) { 'use strict';

    var FullCalendar = /** @class */ (function () {
        function FullCalendar(el) {
            this.el = el;
        }
        FullCalendar.prototype.ngOnInit = function () {
            this.config = {
                theme: true
            };
            if (this.options) {
                for (var prop in this.options) {
                    this.config[prop] = this.options[prop];
                }
            }
        };
        FullCalendar.prototype.ngAfterViewChecked = function () {
            if (!this.initialized && this.el.nativeElement.offsetParent) {
                this.initialize();
            }
        };
        Object.defineProperty(FullCalendar.prototype, "events", {
            get: function () {
                return this._events;
            },
            set: function (value) {
                this._events = value;
                if (this._events && this.calendar) {
                    this.calendar.removeAllEventSources();
                    this.calendar.addEventSource(this._events);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FullCalendar.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (value) {
                this._options = value;
                if (this._options && this.calendar) {
                    for (var prop in this._options) {
                        var optionValue = this._options[prop];
                        this.config[prop] = optionValue;
                        this.calendar.setOption(prop, optionValue);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        FullCalendar.prototype.initialize = function () {
            this.calendar = new core.Calendar(this.el.nativeElement.children[0], this.config);
            this.calendar.render();
            this.initialized = true;
            if (this.events) {
                this.calendar.removeAllEventSources();
                this.calendar.addEventSource(this.events);
            }
        };
        FullCalendar.prototype.getCalendar = function () {
            return this.calendar;
        };
        FullCalendar.prototype.ngOnDestroy = function () {
            if (this.calendar) {
                this.calendar.destroy();
                this.initialized = false;
                this.calendar = null;
            }
        };
        return FullCalendar;
    }());
    FullCalendar.decorators = [
        { type: core$1.Component, args: [{
                    selector: 'p-fullCalendar',
                    template: '<div [ngStyle]="style" [class]="styleClass"></div>',
                    changeDetection: core$1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core$1.ViewEncapsulation.None
                },] }
    ];
    FullCalendar.ctorParameters = function () { return [
        { type: core$1.ElementRef }
    ]; };
    FullCalendar.propDecorators = {
        style: [{ type: core$1.Input }],
        styleClass: [{ type: core$1.Input }],
        events: [{ type: core$1.Input }],
        options: [{ type: core$1.Input }]
    };
    var FullCalendarModule = /** @class */ (function () {
        function FullCalendarModule() {
        }
        return FullCalendarModule;
    }());
    FullCalendarModule.decorators = [
        { type: core$1.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [FullCalendar],
                    declarations: [FullCalendar]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FullCalendar = FullCalendar;
    exports.FullCalendarModule = FullCalendarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fullcalendar.umd.js.map
