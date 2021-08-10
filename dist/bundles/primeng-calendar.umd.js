(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/button'), require('primeng/ripple'), require('primeng/dom'), require('primeng/api'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/calendar', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/button', 'primeng/ripple', 'primeng/dom', 'primeng/api', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.calendar = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.button, global.primeng.ripple, global.primeng.dom, global.primeng.api, global.ng.forms));
}(this, (function (exports, core, animations, common, button, ripple, dom, api, forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var CALENDAR_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Calendar; }),
        multi: true
    };
    var Calendar = /** @class */ (function () {
        function Calendar(el, renderer, cd, zone, config) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.config = config;
            this.dateFormat = 'mm/dd/yy';
            this.multipleSeparator = ',';
            this.rangeSeparator = '-';
            this.inline = false;
            this.showOtherMonths = true;
            this.icon = 'pi pi-calendar';
            this.shortYearCutoff = '+10';
            this.hourFormat = '24';
            this.stepHour = 1;
            this.stepMinute = 1;
            this.stepSecond = 1;
            this.showSeconds = false;
            this.showOnFocus = true;
            this.showWeek = false;
            this.dataType = 'date';
            this.selectionMode = 'single';
            this.todayButtonStyleClass = 'p-button-text';
            this.clearButtonStyleClass = 'p-button-text';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.keepInvalid = false;
            this.hideOnDateTimeSelect = true;
            this.numberOfMonths = 1;
            this.view = 'date';
            this.timeSeparator = ":";
            this.focusTrap = true;
            this.firstDayOfWeek = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onInput = new core.EventEmitter();
            this.onTodayClick = new core.EventEmitter();
            this.onClearClick = new core.EventEmitter();
            this.onMonthChange = new core.EventEmitter();
            this.onYearChange = new core.EventEmitter();
            this.onClickOutside = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.inputFieldValue = null;
            this.navigationState = null;
            this.convertTo24Hour = function (hours, pm) {
                if (this.hourFormat == '12') {
                    if (hours === 12) {
                        return (pm ? 12 : 0);
                    }
                    else {
                        return (pm ? hours + 12 : hours);
                    }
                }
                return hours;
            };
        }
        Object.defineProperty(Calendar.prototype, "content", {
            set: function (content) {
                var _this = this;
                this.contentViewChild = content;
                if (this.contentViewChild) {
                    if (this.isMonthNavigate) {
                        Promise.resolve(null).then(function () { return _this.updateFocus(); });
                        this.isMonthNavigate = false;
                    }
                    else {
                        this.initFocusableCell();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(Calendar.prototype, "defaultDate", {
            get: function () {
                return this._defaultDate;
            },
            set: function (defaultDate) {
                this._defaultDate = defaultDate;
                if (this.initialized) {
                    var date = defaultDate || new Date();
                    this.currentMonth = date.getMonth();
                    this.currentYear = date.getFullYear();
                    this.initTime(date);
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(Calendar.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (date) {
                this._minDate = date;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (date) {
                this._maxDate = date;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "disabledDates", {
            get: function () {
                return this._disabledDates;
            },
            set: function (disabledDates) {
                this._disabledDates = disabledDates;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "disabledDays", {
            get: function () {
                return this._disabledDays;
            },
            set: function (disabledDays) {
                this._disabledDays = disabledDays;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "yearRange", {
            get: function () {
                return this._yearRange;
            },
            set: function (yearRange) {
                this._yearRange = yearRange;
                if (yearRange) {
                    var years = yearRange.split(':');
                    var yearStart = parseInt(years[0]);
                    var yearEnd = parseInt(years[1]);
                    this.populateYearOptions(yearStart, yearEnd);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "showTime", {
            get: function () {
                return this._showTime;
            },
            set: function (showTime) {
                this._showTime = showTime;
                if (this.currentHour === undefined) {
                    this.initTime(this.value || new Date());
                }
                this.updateInputfield();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "locale", {
            get: function () {
                return this._locale;
            },
            set: function (newLocale) {
                console.warn("Locale property has no effect, use new i18n API instead.");
            },
            enumerable: false,
            configurable: true
        });
        Calendar.prototype.ngOnInit = function () {
            var _this = this;
            var date = this.defaultDate || new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            if (this.view === 'date') {
                this.createWeekDays();
                this.initTime(date);
                this.createMonths(this.currentMonth, this.currentYear);
                this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
            }
            else if (this.view === 'month') {
                this.createMonthPickerValues();
            }
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                _this.createWeekDays();
            });
            this.initialized = true;
        };
        Calendar.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'date':
                        _this.dateTemplate = item.template;
                        break;
                    case 'disabledDate':
                        _this.disabledDateTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.dateTemplate = item.template;
                        break;
                }
            });
        };
        Calendar.prototype.getTranslation = function (option) {
            return this.config.getTranslation(option);
        };
        Calendar.prototype.populateYearOptions = function (start, end) {
            this.yearOptions = [];
            for (var i = start; i <= end; i++) {
                this.yearOptions.push(i);
            }
        };
        Calendar.prototype.createWeekDays = function () {
            this.weekDays = [];
            var dayIndex = this.firstDayOfWeek;
            var dayLabels = this.getTranslation(api.TranslationKeys.DAY_NAMES_MIN);
            for (var i = 0; i < 7; i++) {
                this.weekDays.push(dayLabels[dayIndex]);
                dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
            }
        };
        Calendar.prototype.createMonthPickerValues = function () {
            this.monthPickerValues = [];
            var monthLabels = this.getTranslation(api.TranslationKeys.MONTH_NAMES_SHORT);
            for (var i = 0; i <= 11; i++) {
                this.monthPickerValues.push(monthLabels[i]);
            }
        };
        Calendar.prototype.createMonths = function (month, year) {
            this.months = this.months = [];
            for (var i = 0; i < this.numberOfMonths; i++) {
                var m = month + i;
                var y = year;
                if (m > 11) {
                    m = m % 11 - 1;
                    y = year + 1;
                }
                this.months.push(this.createMonth(m, y));
            }
        };
        Calendar.prototype.getWeekNumber = function (date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
        };
        Calendar.prototype.createMonth = function (month, year) {
            var dates = [];
            var firstDay = this.getFirstDayOfMonthIndex(month, year);
            var daysLength = this.getDaysCountInMonth(month, year);
            var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
            var dayNo = 1;
            var today = new Date();
            var weekNumbers = [];
            var monthRows = Math.ceil((daysLength + firstDay) / 7);
            for (var i = 0; i < monthRows; i++) {
                var week = [];
                if (i == 0) {
                    for (var j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                        var prev = this.getPreviousMonthAndYear(month, year);
                        week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                            today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                    }
                    var remainingDaysLength = 7 - week.length;
                    for (var j = 0; j < remainingDaysLength; j++) {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false) });
                        dayNo++;
                    }
                }
                else {
                    for (var j = 0; j < 7; j++) {
                        if (dayNo > daysLength) {
                            var next = this.getNextMonthAndYear(month, year);
                            week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                                today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                                selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true) });
                        }
                        else {
                            week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                                selectable: this.isSelectable(dayNo, month, year, false) });
                        }
                        dayNo++;
                    }
                }
                if (this.showWeek) {
                    weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
                }
                dates.push(week);
            }
            return {
                month: month,
                year: year,
                dates: dates,
                weekNumbers: weekNumbers
            };
        };
        Calendar.prototype.initTime = function (date) {
            this.pm = date.getHours() > 11;
            if (this.showTime) {
                this.currentMinute = date.getMinutes();
                this.currentSecond = date.getSeconds();
                this.setCurrentHourPM(date.getHours());
            }
            else if (this.timeOnly) {
                this.currentMinute = 0;
                this.currentHour = 0;
                this.currentSecond = 0;
            }
        };
        Calendar.prototype.navBackward = function (event) {
            var _this = this;
            event.stopPropagation();
            if (this.disabled) {
                event.preventDefault();
                return;
            }
            this.isMonthNavigate = true;
            if (this.view === 'month') {
                this.decrementYear();
                setTimeout(function () {
                    _this.updateFocus();
                }, 1);
            }
            else {
                if (this.currentMonth === 0) {
                    this.currentMonth = 11;
                    this.decrementYear();
                }
                else {
                    this.currentMonth--;
                }
                this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
                this.createMonths(this.currentMonth, this.currentYear);
            }
        };
        Calendar.prototype.navForward = function (event) {
            var _this = this;
            event.stopPropagation();
            if (this.disabled) {
                event.preventDefault();
                return;
            }
            this.isMonthNavigate = true;
            if (this.view === 'month') {
                this.incrementYear();
                setTimeout(function () {
                    _this.updateFocus();
                }, 1);
            }
            else {
                if (this.currentMonth === 11) {
                    this.currentMonth = 0;
                    this.incrementYear();
                }
                else {
                    this.currentMonth++;
                }
                this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
                this.createMonths(this.currentMonth, this.currentYear);
            }
        };
        Calendar.prototype.decrementYear = function () {
            this.currentYear--;
            if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
                var difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
                this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
            }
        };
        Calendar.prototype.incrementYear = function () {
            this.currentYear++;
            if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
                var difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
                this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
            }
        };
        Calendar.prototype.onDateSelect = function (event, dateMeta) {
            var _this = this;
            if (this.disabled || !dateMeta.selectable) {
                event.preventDefault();
                return;
            }
            if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
                this.value = this.value.filter(function (date, i) {
                    return !_this.isDateEquals(date, dateMeta);
                });
                if (this.value.length === 0) {
                    this.value = null;
                }
                this.updateModel(this.value);
            }
            else {
                if (this.shouldSelectDate(dateMeta)) {
                    this.selectDate(dateMeta);
                }
            }
            if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
                setTimeout(function () {
                    event.preventDefault();
                    _this.hideOverlay();
                    if (_this.mask) {
                        _this.disableModality();
                    }
                    _this.cd.markForCheck();
                }, 150);
            }
            this.updateInputfield();
            event.preventDefault();
        };
        Calendar.prototype.shouldSelectDate = function (dateMeta) {
            if (this.isMultipleSelection())
                return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
            else
                return true;
        };
        Calendar.prototype.onMonthSelect = function (event, index) {
            if (!dom.DomHandler.hasClass(event.target, 'p-disabled')) {
                this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
            }
        };
        Calendar.prototype.updateInputfield = function () {
            var formattedValue = '';
            if (this.value) {
                if (this.isSingleSelection()) {
                    formattedValue = this.formatDateTime(this.value);
                }
                else if (this.isMultipleSelection()) {
                    for (var i = 0; i < this.value.length; i++) {
                        var dateAsString = this.formatDateTime(this.value[i]);
                        formattedValue += dateAsString;
                        if (i !== (this.value.length - 1)) {
                            formattedValue += this.multipleSeparator + ' ';
                        }
                    }
                }
                else if (this.isRangeSelection()) {
                    if (this.value && this.value.length) {
                        var startDate = this.value[0];
                        var endDate = this.value[1];
                        formattedValue = this.formatDateTime(startDate);
                        if (endDate) {
                            formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                        }
                    }
                }
            }
            this.inputFieldValue = formattedValue;
            this.updateFilledState();
            if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
                this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
            }
        };
        Calendar.prototype.formatDateTime = function (date) {
            var formattedValue = null;
            if (date) {
                if (this.timeOnly) {
                    formattedValue = this.formatTime(date);
                }
                else {
                    formattedValue = this.formatDate(date, this.getDateFormat());
                    if (this.showTime) {
                        formattedValue += ' ' + this.formatTime(date);
                    }
                }
            }
            return formattedValue;
        };
        Calendar.prototype.setCurrentHourPM = function (hours) {
            if (this.hourFormat == '12') {
                this.pm = hours > 11;
                if (hours >= 12) {
                    this.currentHour = (hours == 12) ? 12 : hours - 12;
                }
                else {
                    this.currentHour = (hours == 0) ? 12 : hours;
                }
            }
            else {
                this.currentHour = hours;
            }
        };
        Calendar.prototype.selectDate = function (dateMeta) {
            var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            if (this.showTime) {
                if (this.hourFormat == '12') {
                    if (this.currentHour === 12)
                        date.setHours(this.pm ? 12 : 0);
                    else
                        date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
                }
                else {
                    date.setHours(this.currentHour);
                }
                date.setMinutes(this.currentMinute);
                date.setSeconds(this.currentSecond);
            }
            if (this.minDate && this.minDate > date) {
                date = this.minDate;
                this.setCurrentHourPM(date.getHours());
                this.currentMinute = date.getMinutes();
                this.currentSecond = date.getSeconds();
            }
            if (this.maxDate && this.maxDate < date) {
                date = this.maxDate;
                this.setCurrentHourPM(date.getHours());
                this.currentMinute = date.getMinutes();
                this.currentSecond = date.getSeconds();
            }
            if (this.isSingleSelection()) {
                this.updateModel(date);
            }
            else if (this.isMultipleSelection()) {
                this.updateModel(this.value ? __spread(this.value, [date]) : [date]);
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    var startDate = this.value[0];
                    var endDate = this.value[1];
                    if (!endDate && date.getTime() >= startDate.getTime()) {
                        endDate = date;
                    }
                    else {
                        startDate = date;
                        endDate = null;
                    }
                    this.updateModel([startDate, endDate]);
                }
                else {
                    this.updateModel([date, null]);
                }
            }
            this.onSelect.emit(date);
        };
        Calendar.prototype.updateModel = function (value) {
            var _this = this;
            this.value = value;
            if (this.dataType == 'date') {
                this.onModelChange(this.value);
            }
            else if (this.dataType == 'string') {
                if (this.isSingleSelection()) {
                    this.onModelChange(this.formatDateTime(this.value));
                }
                else {
                    var stringArrValue = null;
                    if (this.value) {
                        stringArrValue = this.value.map(function (date) { return _this.formatDateTime(date); });
                    }
                    this.onModelChange(stringArrValue);
                }
            }
        };
        Calendar.prototype.getFirstDayOfMonthIndex = function (month, year) {
            var day = new Date();
            day.setDate(1);
            day.setMonth(month);
            day.setFullYear(year);
            var dayIndex = day.getDay() + this.getSundayIndex();
            return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
        };
        Calendar.prototype.getDaysCountInMonth = function (month, year) {
            return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
        };
        Calendar.prototype.getDaysCountInPrevMonth = function (month, year) {
            var prev = this.getPreviousMonthAndYear(month, year);
            return this.getDaysCountInMonth(prev.month, prev.year);
        };
        Calendar.prototype.getPreviousMonthAndYear = function (month, year) {
            var m, y;
            if (month === 0) {
                m = 11;
                y = year - 1;
            }
            else {
                m = month - 1;
                y = year;
            }
            return { 'month': m, 'year': y };
        };
        Calendar.prototype.getNextMonthAndYear = function (month, year) {
            var m, y;
            if (month === 11) {
                m = 0;
                y = year + 1;
            }
            else {
                m = month + 1;
                y = year;
            }
            return { 'month': m, 'year': y };
        };
        Calendar.prototype.getSundayIndex = function () {
            return this.firstDayOfWeek > 0 ? 7 - this.firstDayOfWeek : 0;
        };
        Calendar.prototype.isSelected = function (dateMeta) {
            var e_1, _a;
            if (this.value) {
                if (this.isSingleSelection()) {
                    return this.isDateEquals(this.value, dateMeta);
                }
                else if (this.isMultipleSelection()) {
                    var selected = false;
                    try {
                        for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var date = _c.value;
                            selected = this.isDateEquals(date, dateMeta);
                            if (selected) {
                                break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return selected;
                }
                else if (this.isRangeSelection()) {
                    if (this.value[1])
                        return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                    else
                        return this.isDateEquals(this.value[0], dateMeta);
                }
            }
            else {
                return false;
            }
        };
        Calendar.prototype.isMonthSelected = function (month) {
            var day = this.value ? (Array.isArray(this.value) ? this.value[0].getDate() : this.value.getDate()) : 1;
            return this.isSelected({ year: this.currentYear, month: month, day: day, selectable: true });
        };
        Calendar.prototype.isDateEquals = function (value, dateMeta) {
            if (value)
                return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
            else
                return false;
        };
        Calendar.prototype.isDateBetween = function (start, end, dateMeta) {
            var between = false;
            if (start && end) {
                var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
                return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
            }
            return between;
        };
        Calendar.prototype.isSingleSelection = function () {
            return this.selectionMode === 'single';
        };
        Calendar.prototype.isRangeSelection = function () {
            return this.selectionMode === 'range';
        };
        Calendar.prototype.isMultipleSelection = function () {
            return this.selectionMode === 'multiple';
        };
        Calendar.prototype.isToday = function (today, day, month, year) {
            return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        };
        Calendar.prototype.isSelectable = function (day, month, year, otherMonth) {
            var validMin = true;
            var validMax = true;
            var validDate = true;
            var validDay = true;
            if (otherMonth && !this.selectOtherMonths) {
                return false;
            }
            if (this.minDate) {
                if (this.minDate.getFullYear() > year) {
                    validMin = false;
                }
                else if (this.minDate.getFullYear() === year) {
                    if (this.minDate.getMonth() > month) {
                        validMin = false;
                    }
                    else if (this.minDate.getMonth() === month) {
                        if (this.minDate.getDate() > day) {
                            validMin = false;
                        }
                    }
                }
            }
            if (this.maxDate) {
                if (this.maxDate.getFullYear() < year) {
                    validMax = false;
                }
                else if (this.maxDate.getFullYear() === year) {
                    if (this.maxDate.getMonth() < month) {
                        validMax = false;
                    }
                    else if (this.maxDate.getMonth() === month) {
                        if (this.maxDate.getDate() < day) {
                            validMax = false;
                        }
                    }
                }
            }
            if (this.disabledDates) {
                validDate = !this.isDateDisabled(day, month, year);
            }
            if (this.disabledDays) {
                validDay = !this.isDayDisabled(day, month, year);
            }
            return validMin && validMax && validDate && validDay;
        };
        Calendar.prototype.isDateDisabled = function (day, month, year) {
            var e_2, _a;
            if (this.disabledDates) {
                try {
                    for (var _b = __values(this.disabledDates), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var disabledDate = _c.value;
                        if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                            return true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return false;
        };
        Calendar.prototype.isDayDisabled = function (day, month, year) {
            if (this.disabledDays) {
                var weekday = new Date(year, month, day);
                var weekdayNumber = weekday.getDay();
                return this.disabledDays.indexOf(weekdayNumber) !== -1;
            }
            return false;
        };
        Calendar.prototype.onInputFocus = function (event) {
            this.focus = true;
            if (this.showOnFocus) {
                this.showOverlay();
            }
            this.onFocus.emit(event);
        };
        Calendar.prototype.onInputClick = function () {
            if (this.overlay && this.autoZIndex) {
                this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            if (this.showOnFocus && !this.overlayVisible) {
                this.showOverlay();
            }
        };
        Calendar.prototype.onInputBlur = function (event) {
            this.focus = false;
            this.onBlur.emit(event);
            if (!this.keepInvalid) {
                this.updateInputfield();
            }
            this.onModelTouched();
        };
        Calendar.prototype.onButtonClick = function (event, inputfield) {
            if (!this.overlayVisible) {
                inputfield.focus();
                this.showOverlay();
            }
            else {
                this.hideOverlay();
            }
        };
        Calendar.prototype.onPrevButtonClick = function (event) {
            this.navigationState = { backward: true, button: true };
            this.navBackward(event);
        };
        Calendar.prototype.onNextButtonClick = function (event) {
            this.navigationState = { backward: false, button: true };
            this.navForward(event);
        };
        Calendar.prototype.onContainerButtonKeydown = function (event) {
            switch (event.which) {
                //tab
                case 9:
                    if (!this.inline) {
                        this.trapFocus(event);
                    }
                    break;
                //escape
                case 27:
                    this.overlayVisible = false;
                    event.preventDefault();
                    break;
                default:
                    //Noop
                    break;
            }
        };
        Calendar.prototype.onInputKeydown = function (event) {
            this.isKeydown = true;
            if (event.keyCode === 40 && this.contentViewChild) {
                this.trapFocus(event);
            }
            else if (event.keyCode === 27) {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                    event.preventDefault();
                }
            }
            else if (event.keyCode === 13) {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                    event.preventDefault();
                }
            }
            else if (event.keyCode === 9 && this.contentViewChild) {
                dom.DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach(function (el) { return el.tabIndex = '-1'; });
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                }
            }
        };
        Calendar.prototype.onDateCellKeydown = function (event, date, groupIndex) {
            var cellContent = event.currentTarget;
            var cell = cellContent.parentElement;
            switch (event.which) {
                //down arrow
                case 40: {
                    cellContent.tabIndex = '-1';
                    var cellIndex = dom.DomHandler.index(cell);
                    var nextRow = cell.parentElement.nextElementSibling;
                    if (nextRow) {
                        var focusCell = nextRow.children[cellIndex].children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'p-disabled')) {
                            this.navigationState = { backward: false };
                            this.navForward(event);
                        }
                        else {
                            nextRow.children[cellIndex].children[0].tabIndex = '0';
                            nextRow.children[cellIndex].children[0].focus();
                        }
                    }
                    else {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    }
                    event.preventDefault();
                    break;
                }
                //up arrow
                case 38: {
                    cellContent.tabIndex = '-1';
                    var cellIndex = dom.DomHandler.index(cell);
                    var prevRow = cell.parentElement.previousElementSibling;
                    if (prevRow) {
                        var focusCell = prevRow.children[cellIndex].children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'p-disabled')) {
                            this.navigationState = { backward: true };
                            this.navBackward(event);
                        }
                        else {
                            focusCell.tabIndex = '0';
                            focusCell.focus();
                        }
                    }
                    else {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    }
                    event.preventDefault();
                    break;
                }
                //left arrow
                case 37: {
                    cellContent.tabIndex = '-1';
                    var prevCell = cell.previousElementSibling;
                    if (prevCell) {
                        var focusCell = prevCell.children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'p-disabled') || dom.DomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
                            this.navigateToMonth(true, groupIndex);
                        }
                        else {
                            focusCell.tabIndex = '0';
                            focusCell.focus();
                        }
                    }
                    else {
                        this.navigateToMonth(true, groupIndex);
                    }
                    event.preventDefault();
                    break;
                }
                //right arrow
                case 39: {
                    cellContent.tabIndex = '-1';
                    var nextCell = cell.nextElementSibling;
                    if (nextCell) {
                        var focusCell = nextCell.children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'p-disabled')) {
                            this.navigateToMonth(false, groupIndex);
                        }
                        else {
                            focusCell.tabIndex = '0';
                            focusCell.focus();
                        }
                    }
                    else {
                        this.navigateToMonth(false, groupIndex);
                    }
                    event.preventDefault();
                    break;
                }
                //enter
                case 13: {
                    this.onDateSelect(event, date);
                    event.preventDefault();
                    break;
                }
                //escape
                case 27: {
                    this.overlayVisible = false;
                    event.preventDefault();
                    break;
                }
                //tab
                case 9: {
                    if (!this.inline) {
                        this.trapFocus(event);
                    }
                    break;
                }
                default:
                    //no op
                    break;
            }
        };
        Calendar.prototype.onMonthCellKeydown = function (event, index) {
            var cell = event.currentTarget;
            switch (event.which) {
                //arrows
                case 38:
                case 40: {
                    cell.tabIndex = '-1';
                    var cells = cell.parentElement.children;
                    var cellIndex = dom.DomHandler.index(cell);
                    var nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                    if (nextCell) {
                        nextCell.tabIndex = '0';
                        nextCell.focus();
                    }
                    event.preventDefault();
                    break;
                }
                //left arrow
                case 37: {
                    cell.tabIndex = '-1';
                    var prevCell = cell.previousElementSibling;
                    if (prevCell) {
                        prevCell.tabIndex = '0';
                        prevCell.focus();
                    }
                    event.preventDefault();
                    break;
                }
                //right arrow
                case 39: {
                    cell.tabIndex = '-1';
                    var nextCell = cell.nextElementSibling;
                    if (nextCell) {
                        nextCell.tabIndex = '0';
                        nextCell.focus();
                    }
                    event.preventDefault();
                    break;
                }
                //enter
                case 13: {
                    this.onMonthSelect(event, index);
                    event.preventDefault();
                    break;
                }
                //escape
                case 27: {
                    this.overlayVisible = false;
                    event.preventDefault();
                    break;
                }
                //tab
                case 9: {
                    if (!this.inline) {
                        this.trapFocus(event);
                    }
                    break;
                }
                default:
                    //no op
                    break;
            }
        };
        Calendar.prototype.navigateToMonth = function (prev, groupIndex) {
            if (prev) {
                if (this.numberOfMonths === 1 || (groupIndex === 0)) {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                else {
                    var prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                    var cells = dom.DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    var focusCell = cells[cells.length - 1];
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
            else {
                if (this.numberOfMonths === 1 || (groupIndex === this.numberOfMonths - 1)) {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                else {
                    var nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                    var focusCell = dom.DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
        };
        Calendar.prototype.updateFocus = function () {
            var cell;
            if (this.navigationState) {
                if (this.navigationState.button) {
                    this.initFocusableCell();
                    if (this.navigationState.backward)
                        dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
                    else
                        dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
                }
                else {
                    if (this.navigationState.backward) {
                        var cells = dom.DomHandler.find(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                        cell = cells[cells.length - 1];
                    }
                    else {
                        cell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    }
                    if (cell) {
                        cell.tabIndex = '0';
                        cell.focus();
                    }
                }
                this.navigationState = null;
            }
            else {
                this.initFocusableCell();
            }
        };
        Calendar.prototype.initFocusableCell = function () {
            var cell;
            if (this.view === 'month') {
                var cells = dom.DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
                var selectedCell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-highlight');
                cells.forEach(function (cell) { return cell.tabIndex = -1; });
                cell = selectedCell || cells[0];
                if (cells.length === 0) {
                    var disabledCells = dom.DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
                    disabledCells.forEach(function (cell) { return cell.tabIndex = -1; });
                }
            }
            else {
                cell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, 'span.p-highlight');
                if (!cell) {
                    var todayCell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                    if (todayCell)
                        cell = todayCell;
                    else
                        cell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                }
            }
            if (cell) {
                cell.tabIndex = '0';
            }
        };
        Calendar.prototype.trapFocus = function (event) {
            var focusableElements = dom.DomHandler.getFocusableElements(this.contentViewChild.nativeElement);
            if (focusableElements && focusableElements.length > 0) {
                if (!focusableElements[0].ownerDocument.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    var focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                    if (event.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0) {
                            if (this.focusTrap) {
                                focusableElements[focusableElements.length - 1].focus();
                            }
                            else {
                                if (focusedIndex === -1)
                                    return this.hideOverlay();
                                else if (focusedIndex === 0)
                                    return;
                            }
                        }
                        else {
                            focusableElements[focusedIndex - 1].focus();
                        }
                    }
                    else {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1)) {
                            if (!this.focusTrap && focusedIndex != -1)
                                return this.hideOverlay();
                            else
                                focusableElements[0].focus();
                        }
                        else {
                            focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
            event.preventDefault();
        };
        Calendar.prototype.onMonthDropdownChange = function (m) {
            this.currentMonth = parseInt(m);
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        };
        Calendar.prototype.onYearDropdownChange = function (y) {
            this.currentYear = parseInt(y);
            this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        };
        Calendar.prototype.validateTime = function (hour, minute, second, pm) {
            var value = this.value;
            var convertedHour = this.convertTo24Hour(hour, pm);
            if (this.isRangeSelection()) {
                value = this.value[1] || this.value[0];
            }
            if (this.isMultipleSelection()) {
                value = this.value[this.value.length - 1];
            }
            var valueDateString = value ? value.toDateString() : null;
            if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
                if (this.minDate.getHours() > convertedHour) {
                    return false;
                }
                if (this.minDate.getHours() === convertedHour) {
                    if (this.minDate.getMinutes() > minute) {
                        return false;
                    }
                    if (this.minDate.getMinutes() === minute) {
                        if (this.minDate.getSeconds() > second) {
                            return false;
                        }
                    }
                }
            }
            if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
                if (this.maxDate.getHours() < convertedHour) {
                    return false;
                }
                if (this.maxDate.getHours() === convertedHour) {
                    if (this.maxDate.getMinutes() < minute) {
                        return false;
                    }
                    if (this.maxDate.getMinutes() === minute) {
                        if (this.maxDate.getSeconds() < second) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        Calendar.prototype.incrementHour = function (event) {
            var prevHour = this.currentHour;
            var newHour = this.currentHour + this.stepHour;
            var newPM = this.pm;
            if (this.hourFormat == '24')
                newHour = (newHour >= 24) ? (newHour - 24) : newHour;
            else if (this.hourFormat == '12') {
                // Before the AM/PM break, now after
                if (prevHour < 12 && newHour > 11) {
                    newPM = !this.pm;
                }
                newHour = (newHour >= 13) ? (newHour - 12) : newHour;
            }
            if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
                this.currentHour = newHour;
                this.pm = newPM;
            }
            event.preventDefault();
        };
        Calendar.prototype.onTimePickerElementMouseDown = function (event, type, direction) {
            if (!this.disabled) {
                this.repeat(event, null, type, direction);
                event.preventDefault();
            }
        };
        Calendar.prototype.onTimePickerElementMouseUp = function (event) {
            if (!this.disabled) {
                this.clearTimePickerTimer();
                this.updateTime();
            }
        };
        Calendar.prototype.onTimePickerElementMouseLeave = function () {
            if (!this.disabled && this.timePickerTimer) {
                this.clearTimePickerTimer();
                this.updateTime();
            }
        };
        Calendar.prototype.repeat = function (event, interval, type, direction) {
            var _this = this;
            var i = interval || 500;
            this.clearTimePickerTimer();
            this.timePickerTimer = setTimeout(function () {
                _this.repeat(event, 100, type, direction);
                _this.cd.markForCheck();
            }, i);
            switch (type) {
                case 0:
                    if (direction === 1)
                        this.incrementHour(event);
                    else
                        this.decrementHour(event);
                    break;
                case 1:
                    if (direction === 1)
                        this.incrementMinute(event);
                    else
                        this.decrementMinute(event);
                    break;
                case 2:
                    if (direction === 1)
                        this.incrementSecond(event);
                    else
                        this.decrementSecond(event);
                    break;
            }
            this.updateInputfield();
        };
        Calendar.prototype.clearTimePickerTimer = function () {
            if (this.timePickerTimer) {
                clearTimeout(this.timePickerTimer);
                this.timePickerTimer = null;
            }
        };
        Calendar.prototype.decrementHour = function (event) {
            var newHour = this.currentHour - this.stepHour;
            var newPM = this.pm;
            if (this.hourFormat == '24')
                newHour = (newHour < 0) ? (24 + newHour) : newHour;
            else if (this.hourFormat == '12') {
                // If we were at noon/midnight, then switch
                if (this.currentHour === 12) {
                    newPM = !this.pm;
                }
                newHour = (newHour <= 0) ? (12 + newHour) : newHour;
            }
            if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
                this.currentHour = newHour;
                this.pm = newPM;
            }
            event.preventDefault();
        };
        Calendar.prototype.incrementMinute = function (event) {
            var newMinute = this.currentMinute + this.stepMinute;
            newMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
            if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
                this.currentMinute = newMinute;
            }
            event.preventDefault();
        };
        Calendar.prototype.decrementMinute = function (event) {
            var newMinute = this.currentMinute - this.stepMinute;
            newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
            if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
                this.currentMinute = newMinute;
            }
            event.preventDefault();
        };
        Calendar.prototype.incrementSecond = function (event) {
            var newSecond = this.currentSecond + this.stepSecond;
            newSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
            if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
                this.currentSecond = newSecond;
            }
            event.preventDefault();
        };
        Calendar.prototype.decrementSecond = function (event) {
            var newSecond = this.currentSecond - this.stepSecond;
            newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
            if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
                this.currentSecond = newSecond;
            }
            event.preventDefault();
        };
        Calendar.prototype.updateTime = function () {
            var value = this.value;
            if (this.isRangeSelection()) {
                value = this.value[1] || this.value[0];
            }
            if (this.isMultipleSelection()) {
                value = this.value[this.value.length - 1];
            }
            value = value ? new Date(value.getTime()) : new Date();
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    value.setHours(this.pm ? 12 : 0);
                else
                    value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                value.setHours(this.currentHour);
            }
            value.setMinutes(this.currentMinute);
            value.setSeconds(this.currentSecond);
            if (this.isRangeSelection()) {
                if (this.value[1])
                    value = [this.value[0], value];
                else
                    value = [value, null];
            }
            if (this.isMultipleSelection()) {
                value = __spread(this.value.slice(0, -1), [value]);
            }
            this.updateModel(value);
            this.onSelect.emit(value);
            this.updateInputfield();
        };
        Calendar.prototype.toggleAMPM = function (event) {
            var newPM = !this.pm;
            if (this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, newPM)) {
                this.pm = newPM;
                this.updateTime();
            }
            event.preventDefault();
        };
        Calendar.prototype.onUserInput = function (event) {
            // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
            if (!this.isKeydown) {
                return;
            }
            this.isKeydown = false;
            var val = event.target.value;
            try {
                var value = this.parseValueFromString(val);
                if (this.isValidSelection(value)) {
                    this.updateModel(value);
                    this.updateUI();
                }
            }
            catch (err) {
                //invalid date
                this.updateModel(null);
            }
            this.filled = val != null && val.length;
            this.onInput.emit(event);
        };
        Calendar.prototype.isValidSelection = function (value) {
            var _this = this;
            var isValid = true;
            if (this.isSingleSelection()) {
                if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                    isValid = false;
                }
            }
            else if (value.every(function (v) { return _this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false); })) {
                if (this.isRangeSelection()) {
                    isValid = value.length > 1 && value[1] > value[0] ? true : false;
                }
            }
            return isValid;
        };
        Calendar.prototype.parseValueFromString = function (text) {
            var e_3, _a;
            if (!text || text.trim().length === 0) {
                return null;
            }
            var value;
            if (this.isSingleSelection()) {
                value = this.parseDateTime(text);
            }
            else if (this.isMultipleSelection()) {
                var tokens = text.split(this.multipleSeparator);
                value = [];
                try {
                    for (var tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                        var token = tokens_1_1.value;
                        value.push(this.parseDateTime(token.trim()));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else if (this.isRangeSelection()) {
                var tokens = text.split(' ' + this.rangeSeparator + ' ');
                value = [];
                for (var i = 0; i < tokens.length; i++) {
                    value[i] = this.parseDateTime(tokens[i].trim());
                }
            }
            return value;
        };
        Calendar.prototype.parseDateTime = function (text) {
            var date;
            var parts = text.split(' ');
            if (this.timeOnly) {
                date = new Date();
                this.populateTime(date, parts[0], parts[1]);
            }
            else {
                var dateFormat = this.getDateFormat();
                if (this.showTime) {
                    var ampm = this.hourFormat == '12' ? parts.pop() : null;
                    var timeString = parts.pop();
                    date = this.parseDate(parts.join(' '), dateFormat);
                    this.populateTime(date, timeString, ampm);
                }
                else {
                    date = this.parseDate(text, dateFormat);
                }
            }
            return date;
        };
        Calendar.prototype.populateTime = function (value, timeString, ampm) {
            if (this.hourFormat == '12' && !ampm) {
                throw 'Invalid Time';
            }
            this.pm = (ampm === 'PM' || ampm === 'pm');
            var time = this.parseTime(timeString);
            value.setHours(time.hour);
            value.setMinutes(time.minute);
            value.setSeconds(time.second);
        };
        Calendar.prototype.updateUI = function () {
            var val = this.value || this.defaultDate || new Date();
            if (Array.isArray(val)) {
                val = val[0];
            }
            this.currentMonth = val.getMonth();
            this.currentYear = val.getFullYear();
            this.createMonths(this.currentMonth, this.currentYear);
            if (this.showTime || this.timeOnly) {
                this.setCurrentHourPM(val.getHours());
                this.currentMinute = val.getMinutes();
                this.currentSecond = val.getSeconds();
            }
        };
        Calendar.prototype.showOverlay = function () {
            if (!this.overlayVisible) {
                this.updateUI();
                this.overlayVisible = true;
            }
        };
        Calendar.prototype.hideOverlay = function () {
            this.overlayVisible = false;
            this.clearTimePickerTimer();
            if (this.touchUI) {
                this.disableModality();
            }
            this.cd.markForCheck();
        };
        Calendar.prototype.toggle = function () {
            if (!this.inline) {
                if (!this.overlayVisible) {
                    this.showOverlay();
                    this.inputfieldViewChild.nativeElement.focus();
                }
                else {
                    this.hideOverlay();
                }
            }
        };
        Calendar.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                case 'visibleTouchUI':
                    if (!this.inline) {
                        this.overlay = event.element;
                        this.appendOverlay();
                        if (this.autoZIndex) {
                            this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                        }
                        this.alignOverlay();
                        this.onShow.emit(event);
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onClose.emit(event);
                    break;
            }
        };
        Calendar.prototype.onOverlayAnimationDone = function (event) {
            switch (event.toState) {
                case 'visible':
                case 'visibleTouchUI':
                    if (!this.inline) {
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                        this.bindScrollListener();
                    }
                    break;
            }
        };
        Calendar.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
            }
        };
        Calendar.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        Calendar.prototype.alignOverlay = function () {
            if (this.touchUI) {
                this.enableModality(this.overlay);
            }
            else {
                if (this.appendTo)
                    dom.DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
                else
                    dom.DomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            }
        };
        Calendar.prototype.enableModality = function (element) {
            var _this = this;
            if (!this.mask) {
                this.mask = document.createElement('div');
                this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
                var maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker';
                dom.DomHandler.addMultipleClasses(this.mask, maskStyleClass);
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    _this.disableModality();
                });
                document.body.appendChild(this.mask);
                dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
            }
        };
        Calendar.prototype.disableModality = function () {
            if (this.mask) {
                document.body.removeChild(this.mask);
                var bodyChildren = document.body.children;
                var hasBlockerMasks = void 0;
                for (var i = 0; i < bodyChildren.length; i++) {
                    var bodyChild = bodyChildren[i];
                    if (dom.DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }
                if (!hasBlockerMasks) {
                    dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
                this.unbindMaskClickListener();
                this.mask = null;
            }
        };
        Calendar.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        Calendar.prototype.writeValue = function (value) {
            this.value = value;
            if (this.value && typeof this.value === 'string') {
                this.value = this.parseValueFromString(this.value);
            }
            this.updateInputfield();
            this.updateUI();
            this.cd.markForCheck();
        };
        Calendar.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Calendar.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Calendar.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Calendar.prototype.getDateFormat = function () {
            return this.dateFormat;
        };
        // Ported from jquery-ui datepicker formatDate
        Calendar.prototype.formatDate = function (date, format) {
            if (!date) {
                return '';
            }
            var iFormat;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            }, formatNumber = function (match, value, len) {
                var num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            }, formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            if (date) {
                for (iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                            literal = false;
                        }
                        else {
                            output += format.charAt(iFormat);
                        }
                    }
                    else {
                        switch (format.charAt(iFormat)) {
                            case 'd':
                                output += formatNumber('d', date.getDate(), 2);
                                break;
                            case 'D':
                                output += formatName('D', date.getDay(), this.getTranslation(api.TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(api.TranslationKeys.DAY_NAMES));
                                break;
                            case 'o':
                                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                    new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case 'm':
                                output += formatNumber('m', date.getMonth() + 1, 2);
                                break;
                            case 'M':
                                output += formatName('M', date.getMonth(), this.getTranslation(api.TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(api.TranslationKeys.MONTH_NAMES));
                                break;
                            case 'y':
                                output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                                break;
                            case '@':
                                output += date.getTime();
                                break;
                            case '!':
                                output += date.getTime() * 10000 + this.ticksTo1970;
                                break;
                            case '\'':
                                if (lookAhead('\'')) {
                                    output += '\'';
                                }
                                else {
                                    literal = true;
                                }
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                    }
                }
            }
            return output;
        };
        Calendar.prototype.formatTime = function (date) {
            if (!date) {
                return '';
            }
            var output = '';
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (this.hourFormat == '12' && hours > 11 && hours != 12) {
                hours -= 12;
            }
            if (this.hourFormat == '12') {
                output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
            }
            else {
                output += (hours < 10) ? '0' + hours : hours;
            }
            output += ':';
            output += (minutes < 10) ? '0' + minutes : minutes;
            if (this.showSeconds) {
                output += ':';
                output += (seconds < 10) ? '0' + seconds : seconds;
            }
            if (this.hourFormat == '12') {
                output += date.getHours() > 11 ? ' PM' : ' AM';
            }
            return output;
        };
        Calendar.prototype.parseTime = function (value) {
            var tokens = value.split(':');
            var validTokenLength = this.showSeconds ? 3 : 2;
            if (tokens.length !== validTokenLength) {
                throw "Invalid time";
            }
            var h = parseInt(tokens[0]);
            var m = parseInt(tokens[1]);
            var s = this.showSeconds ? parseInt(tokens[2]) : null;
            if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
                throw "Invalid time";
            }
            else {
                if (this.hourFormat == '12') {
                    if (h !== 12 && this.pm) {
                        h += 12;
                    }
                    else if (!this.pm && h === 12) {
                        h -= 12;
                    }
                }
                return { hour: h, minute: m, second: s };
            }
        };
        // Ported from jquery-ui datepicker parseDate
        Calendar.prototype.parseDate = function (value, format) {
            if (format == null || value == null) {
                throw "Invalid arguments";
            }
            value = (typeof value === "object" ? value.toString() : value + "");
            if (value === "") {
                return null;
            }
            var iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            }, getNumber = function (match) {
                var isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                    (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
                if (!num) {
                    throw "Missing number at position " + iValue;
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            }, getName = function (match, shortNames, longNames) {
                var index = -1;
                var arr = lookAhead(match) ? longNames : shortNames;
                var names = [];
                for (var i = 0; i < arr.length; i++) {
                    names.push([i, arr[i]]);
                }
                names.sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });
                for (var i = 0; i < names.length; i++) {
                    var name = names[i][1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                        index = names[i][0];
                        iValue += name.length;
                        break;
                    }
                }
                if (index !== -1) {
                    return index + 1;
                }
                else {
                    throw "Unknown name at position " + iValue;
                }
            }, checkLiteral = function () {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue;
                }
                iValue++;
            };
            if (this.view === 'month') {
                day = 1;
            }
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    }
                    else {
                        checkLiteral();
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", this.getTranslation(api.TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(api.TranslationKeys.DAY_NAMES));
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", this.getTranslation(api.TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(api.TranslationKeys.MONTH_NAMES));
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "!":
                            date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (iValue < value.length) {
                extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw "Extra/unparsed characters found in date: " + extra;
                }
            }
            if (year === -1) {
                year = new Date().getFullYear();
            }
            else if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                    (year <= shortYearCutoff ? 0 : -100);
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    dim = this.getDaysCountInMonth(year, month - 1);
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }
            date = this.daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw "Invalid date"; // E.g. 31/02/00
            }
            return date;
        };
        Calendar.prototype.daylightSavingAdjust = function (date) {
            if (!date) {
                return null;
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        };
        Calendar.prototype.updateFilledState = function () {
            this.filled = this.inputFieldValue && this.inputFieldValue != '';
        };
        Calendar.prototype.onTodayButtonClick = function (event) {
            var date = new Date();
            var dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
            this.onDateSelect(event, dateMeta);
            this.onTodayClick.emit(event);
        };
        Calendar.prototype.onClearButtonClick = function (event) {
            this.updateModel(null);
            this.updateInputfield();
            this.hideOverlay();
            this.onClearClick.emit(event);
        };
        Calendar.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.zone.runOutsideAngular(function () {
                    var documentTarget = _this.el ? _this.el.nativeElement.ownerDocument : 'document';
                    _this.documentClickListener = _this.renderer.listen(documentTarget, 'click', function (event) {
                        if (_this.isOutsideClicked(event) && _this.overlayVisible) {
                            _this.zone.run(function () {
                                _this.hideOverlay();
                                _this.onClickOutside.emit(event);
                                _this.cd.markForCheck();
                            });
                        }
                    });
                });
            }
        };
        Calendar.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        Calendar.prototype.bindDocumentResizeListener = function () {
            if (!this.documentResizeListener && !this.touchUI) {
                this.documentResizeListener = this.onWindowResize.bind(this);
                window.addEventListener('resize', this.documentResizeListener);
            }
        };
        Calendar.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        Calendar.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hideOverlay();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        Calendar.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        Calendar.prototype.isOutsideClicked = function (event) {
            return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) ||
                this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
        };
        Calendar.prototype.isNavIconClicked = function (event) {
            return (dom.DomHandler.hasClass(event.target, 'p-datepicker-prev') || dom.DomHandler.hasClass(event.target, 'p-datepicker-prev-icon')
                || dom.DomHandler.hasClass(event.target, 'p-datepicker-next') || dom.DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
        };
        Calendar.prototype.onWindowResize = function () {
            if (this.overlayVisible && !dom.DomHandler.isAndroid()) {
                this.hideOverlay();
            }
        };
        Calendar.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindMaskClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.overlay = null;
            this.disableModality();
        };
        Calendar.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
            this.clearTimePickerTimer();
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        return Calendar;
    }());
    Calendar.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-calendar',
                    template: "\n        <span #container [ngClass]=\"{'p-calendar':true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled':disabled, 'p-focus': focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-template [ngIf]=\"!inline\">\n                <input #inputfield type=\"text\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.required]=\"required\" [attr.aria-required]=\"required\" [value]=\"inputFieldValue\" (focus)=\"onInputFocus($event)\" (keydown)=\"onInputKeydown($event)\" (click)=\"onInputClick()\" (blur)=\"onInputBlur($event)\"\n                    [readonly]=\"readonlyInput\" (input)=\"onUserInput($event)\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [placeholder]=\"placeholder||''\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.inputmode]=\"touchUI ? 'off' : null\"\n                    [ngClass]=\"'p-inputtext p-component'\" autocomplete=\"off\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n                    ><button type=\"button\" [icon]=\"icon\" pButton pRipple *ngIf=\"showIcon\" (click)=\"onButtonClick($event,inputfield)\" class=\"p-datepicker-trigger\"\n                    [disabled]=\"disabled\" tabindex=\"0\"></button>\n            </ng-template>\n            <div #contentWrapper [class]=\"panelStyleClass\" [ngStyle]=\"panelStyle\" [ngClass]=\"{'p-datepicker p-component': true, 'p-datepicker-inline':inline,\n                'p-disabled':disabled,'p-datepicker-timeonly':timeOnly,'p-datepicker-multiple-month': this.numberOfMonths > 1, 'p-datepicker-monthpicker': (view === 'month'), 'p-datepicker-touch-ui': touchUI}\"\n                [@overlayAnimation]=\"touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}:\n                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                                            [@.disabled]=\"inline === true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\" *ngIf=\"inline || overlayVisible\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <ng-container *ngIf=\"!timeOnly\">\n                    <div class=\"p-datepicker-group-container\">\n                        <div class=\"p-datepicker-group\" *ngFor=\"let month of months; let i = index;\">\n                            <div class=\"p-datepicker-header\">\n                                <button (keydown)=\"onContainerButtonKeydown($event)\" class=\"p-datepicker-prev p-link\" (click)=\"onPrevButtonClick($event)\" *ngIf=\"i === 0\" type=\"button\" pRipple>\n                                    <span class=\"p-datepicker-prev-icon pi pi-chevron-left\"></span>\n                                </button>\n                                <div class=\"p-datepicker-title\">\n                                    <span class=\"p-datepicker-month\" *ngIf=\"!monthNavigator && (view !== 'month')\">{{getTranslation('monthNames')[month.month]}}</span>\n                                    <select tabindex=\"0\" class=\"p-datepicker-month\" *ngIf=\"monthNavigator && (view !== 'month') && numberOfMonths === 1\" (change)=\"onMonthDropdownChange($event.target.value)\">\n                                        <option [value]=\"i\" *ngFor=\"let monthName of getTranslation('monthNames');let i = index\" [selected]=\"i === month.month\">{{monthName}}</option>\n                                    </select>\n                                    <select tabindex=\"0\" class=\"p-datepicker-year\" *ngIf=\"yearNavigator && numberOfMonths === 1\" (change)=\"onYearDropdownChange($event.target.value)\">\n                                        <option [value]=\"year\" *ngFor=\"let year of yearOptions\" [selected]=\"year === currentYear\">{{year}}</option>\n                                    </select>\n                                    <span class=\"p-datepicker-year\" *ngIf=\"!yearNavigator\">{{view === 'month' ? currentYear : month.year}}</span>\n                                </div>\n                                <button (keydown)=\"onContainerButtonKeydown($event)\" class=\"p-datepicker-next p-link\" (click)=\"onNextButtonClick($event)\" *ngIf=\"numberOfMonths === 1 ? true : (i === numberOfMonths -1)\" type=\"button\" pRipple>\n                                    <span class=\"p-datepicker-next-icon pi pi-chevron-right\"></span>\n                                </button>\n                            </div>\n                            <div class=\"p-datepicker-calendar-container\" *ngIf=\"view ==='date'\">\n                                <table class=\"p-datepicker-calendar\">\n                                    <thead>\n                                        <tr>\n                                            <th *ngIf=\"showWeek\" class=\"p-datepicker-weekheader p-disabled\">\n                                                <span>{{getTranslation('weekHeader')}}</span>\n                                            </th>\n                                            <th scope=\"col\" *ngFor=\"let weekDay of weekDays;let begin = first; let end = last\">\n                                                <span>{{weekDay}}</span>\n                                            </th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr *ngFor=\"let week of month.dates; let j = index;\">\n                                            <td *ngIf=\"showWeek\" class=\"p-datepicker-weeknumber\">\n                                                <span class=\"p-disabled\">\n                                                    {{month.weekNumbers[j]}}\n                                                </span>\n                                            </td>\n                                            <td *ngFor=\"let date of week\" [ngClass]=\"{'p-datepicker-other-month': date.otherMonth,'p-datepicker-today':date.today}\">\n                                                <ng-container *ngIf=\"date.otherMonth ? showOtherMonths : true\">\n                                                    <span [ngClass]=\"{'p-highlight':isSelected(date), 'p-disabled': !date.selectable}\"\n                                                        (click)=\"onDateSelect($event,date)\" draggable=\"false\" (keydown)=\"onDateCellKeydown($event,date,i)\" pRipple>\n                                                        <ng-container *ngIf=\"!dateTemplate\">{{date.day}}</ng-container>\n                                                        <ng-container *ngTemplateOutlet=\"dateTemplate; context: {$implicit: date}\"></ng-container>\n                                                    </span>\n                                                </ng-container>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"p-monthpicker\" *ngIf=\"view === 'month'\">\n                        <span *ngFor=\"let m of monthPickerValues; let i = index\" (click)=\"onMonthSelect($event, i)\" (keydown)=\"onMonthCellKeydown($event,i)\" class=\"p-monthpicker-month\" [ngClass]=\"{'p-highlight': isMonthSelected(i), 'p-disabled':!isSelectable(1, i, this.currentYear, false)}\" pRipple>\n                            {{m}}\n                        </span>\n                    </div>\n                </ng-container>\n                <div class=\"p-timepicker\" *ngIf=\"showTime||timeOnly\">\n                    <div class=\"p-hour-picker\">\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"incrementHour($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 0, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseleave)=\"onTimePickerElementMouseLeave()\" pRipple>\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </button>\n                        <span><ng-container *ngIf=\"currentHour < 10\">0</ng-container>{{currentHour}}</span>\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"decrementHour($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 0, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseleave)=\"onTimePickerElementMouseLeave()\" pRipple>\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </button>\n                    </div>\n                    <div class=\"p-separator\">\n                        <span>{{timeSeparator}}</span>\n                    </div>\n                    <div class=\"p-minute-picker\">\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"incrementMinute($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 1, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseleave)=\"onTimePickerElementMouseLeave()\" pRipple>\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </button>\n                        <span><ng-container *ngIf=\"currentMinute < 10\">0</ng-container>{{currentMinute}}</span>\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"decrementMinute($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 1, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseleave)=\"onTimePickerElementMouseLeave()\" pRipple>\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </button>\n                    </div>\n                    <div class=\"p-separator\" *ngIf=\"showSeconds\">\n                        <span>{{timeSeparator}}</span>\n                    </div>\n                    <div class=\"p-second-picker\" *ngIf=\"showSeconds\">\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"incrementSecond($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 2, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseleave)=\"onTimePickerElementMouseLeave()\" pRipple>\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </button>\n                        <span><ng-container *ngIf=\"currentSecond < 10\">0</ng-container>{{currentSecond}}</span>\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"decrementSecond($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 2, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseleave)=\"onTimePickerElementMouseLeave()\" pRipple>\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </button>\n                    </div>\n                    <div class=\"p-ampm-picker\" *ngIf=\"hourFormat=='12'\">\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"toggleAMPM($event)\" (keydown.enter)=\"toggleAMPM($event)\" pRipple>\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </button>\n                        <span>{{pm ? 'PM' : 'AM'}}</span>\n                        <button class=\"p-link\" type=\"button\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"toggleAMPM($event)\" (keydown.enter)=\"toggleAMPM($event)\" pRipple>\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"p-datepicker-buttonbar\" *ngIf=\"showButtonBar\">\n                    <button type=\"button\" [label]=\"getTranslation('today')\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"onTodayButtonClick($event)\" pButton pRipple [ngClass]=\"[todayButtonStyleClass]\"></button>\n                    <button type=\"button\" [label]=\"getTranslation('clear')\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"onClearButtonClick($event)\" pButton pRipple [ngClass]=\"[clearButtonStyleClass]\"></button>\n                </div>\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </span>\n    ",
                    animations: [
                        animations.trigger('overlayAnimation', [
                            animations.state('visibleTouchUI', animations.style({
                                transform: 'translate(-50%,-50%)',
                                opacity: 1
                            })),
                            animations.transition('void => visible', [
                                animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animations.animate('{{showTransitionParams}}', animations.style({ opacity: 1, transform: '*' }))
                            ]),
                            animations.transition('visible => void', [
                                animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                            ]),
                            animations.transition('void => visibleTouchUI', [
                                animations.style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                                animations.animate('{{showTransitionParams}}')
                            ]),
                            animations.transition('visibleTouchUI => void', [
                                animations.animate(('{{hideTransitionParams}}'), animations.style({
                                    opacity: 0,
                                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                                }))
                            ])
                        ])
                    ],
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focus'
                    },
                    providers: [CALENDAR_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-calendar{display:inline-flex;position:relative}.p-calendar .p-inputtext{flex:1 1 auto;width:1%}.p-calendar-w-btn .p-inputtext{border-bottom-right-radius:0;border-top-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-bottom-left-radius:0;border-top-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{position:absolute;width:auto}.p-datepicker-inline{position:static}.p-datepicker-header{align-items:center;display:flex;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-next,.p-datepicker-prev{align-items:center;cursor:pointer;display:inline-flex;justify-content:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{border-collapse:collapse;width:100%}.p-datepicker td>span{display:flex;margin:0 auto}.p-datepicker td>span,.p-monthpicker-month{align-items:center;cursor:pointer;justify-content:center;overflow:hidden;position:relative}.p-monthpicker-month{display:inline-flex;width:33.3%}.p-datepicker-buttonbar{align-items:center;display:flex;justify-content:space-between}.p-timepicker,.p-timepicker button{align-items:center;display:flex;justify-content:center}.p-timepicker button{cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{align-items:center;display:flex;flex-direction:column}.p-calendar .p-datepicker-touch-ui,.p-datepicker-touch-ui{left:50%;min-width:80vw;position:fixed;top:50%;transform:translate(-50%,-50%)}"]
                },] }
    ];
    Calendar.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: api.PrimeNGConfig }
    ]; };
    Calendar.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        inputStyle: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        name: [{ type: core.Input }],
        inputStyleClass: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        dateFormat: [{ type: core.Input }],
        multipleSeparator: [{ type: core.Input }],
        rangeSeparator: [{ type: core.Input }],
        inline: [{ type: core.Input }],
        showOtherMonths: [{ type: core.Input }],
        selectOtherMonths: [{ type: core.Input }],
        showIcon: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        readonlyInput: [{ type: core.Input }],
        shortYearCutoff: [{ type: core.Input }],
        monthNavigator: [{ type: core.Input }],
        yearNavigator: [{ type: core.Input }],
        hourFormat: [{ type: core.Input }],
        timeOnly: [{ type: core.Input }],
        stepHour: [{ type: core.Input }],
        stepMinute: [{ type: core.Input }],
        stepSecond: [{ type: core.Input }],
        showSeconds: [{ type: core.Input }],
        required: [{ type: core.Input }],
        showOnFocus: [{ type: core.Input }],
        showWeek: [{ type: core.Input }],
        dataType: [{ type: core.Input }],
        selectionMode: [{ type: core.Input }],
        maxDateCount: [{ type: core.Input }],
        showButtonBar: [{ type: core.Input }],
        todayButtonStyleClass: [{ type: core.Input }],
        clearButtonStyleClass: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        panelStyleClass: [{ type: core.Input }],
        panelStyle: [{ type: core.Input }],
        keepInvalid: [{ type: core.Input }],
        hideOnDateTimeSelect: [{ type: core.Input }],
        numberOfMonths: [{ type: core.Input }],
        view: [{ type: core.Input }],
        touchUI: [{ type: core.Input }],
        timeSeparator: [{ type: core.Input }],
        focusTrap: [{ type: core.Input }],
        firstDayOfWeek: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        onClose: [{ type: core.Output }],
        onSelect: [{ type: core.Output }],
        onInput: [{ type: core.Output }],
        onTodayClick: [{ type: core.Output }],
        onClearClick: [{ type: core.Output }],
        onMonthChange: [{ type: core.Output }],
        onYearChange: [{ type: core.Output }],
        onClickOutside: [{ type: core.Output }],
        onShow: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        tabindex: [{ type: core.Input }],
        containerViewChild: [{ type: core.ViewChild, args: ['container', { static: false },] }],
        inputfieldViewChild: [{ type: core.ViewChild, args: ['inputfield', { static: false },] }],
        content: [{ type: core.ViewChild, args: ['contentWrapper', { static: false },] }],
        defaultDate: [{ type: core.Input }],
        minDate: [{ type: core.Input }],
        maxDate: [{ type: core.Input }],
        disabledDates: [{ type: core.Input }],
        disabledDays: [{ type: core.Input }],
        yearRange: [{ type: core.Input }],
        showTime: [{ type: core.Input }],
        locale: [{ type: core.Input }]
    };
    var CalendarModule = /** @class */ (function () {
        function CalendarModule() {
        }
        return CalendarModule;
    }());
    CalendarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, button.ButtonModule, api.SharedModule, ripple.RippleModule],
                    exports: [Calendar, button.ButtonModule, api.SharedModule],
                    declarations: [Calendar]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CALENDAR_VALUE_ACCESSOR = CALENDAR_VALUE_ACCESSOR;
    exports.Calendar = Calendar;
    exports.CalendarModule = CalendarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-calendar.umd.js.map
