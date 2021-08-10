(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('primeng/utils'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/api', ['exports', '@angular/core', 'rxjs', 'primeng/utils', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.api = {}), global.ng.core, global.rxjs, global.primeng.utils, global.ng.common));
}(this, (function (exports, i0, rxjs, utils, common) { 'use strict';

    var FilterMatchMode = /** @class */ (function () {
        function FilterMatchMode() {
        }
        return FilterMatchMode;
    }());
    FilterMatchMode.STARTS_WITH = 'startsWith';
    FilterMatchMode.CONTAINS = 'contains';
    FilterMatchMode.NOT_CONTAINS = 'notContains';
    FilterMatchMode.ENDS_WITH = 'endsWith';
    FilterMatchMode.EQUALS = 'equals';
    FilterMatchMode.NOT_EQUALS = 'notEquals';
    FilterMatchMode.IN = 'in';
    FilterMatchMode.LESS_THAN = 'lt';
    FilterMatchMode.LESS_THAN_OR_EQUAL_TO = 'lte';
    FilterMatchMode.GREATER_THAN = 'gt';
    FilterMatchMode.GREATER_THAN_OR_EQUAL_TO = 'gte';
    FilterMatchMode.BETWEEN = 'between';
    FilterMatchMode.IS = 'is';
    FilterMatchMode.IS_NOT = 'isNot';
    FilterMatchMode.BEFORE = 'before';
    FilterMatchMode.AFTER = 'after';
    FilterMatchMode.DATE_IS = 'dateIs';
    FilterMatchMode.DATE_IS_NOT = 'dateIsNot';
    FilterMatchMode.DATE_BEFORE = 'dateBefore';
    FilterMatchMode.DATE_AFTER = 'dateAfter';

    var PrimeNGConfig = /** @class */ (function () {
        function PrimeNGConfig() {
            this.ripple = false;
            this.filterMatchModeOptions = {
                text: [
                    FilterMatchMode.STARTS_WITH,
                    FilterMatchMode.CONTAINS,
                    FilterMatchMode.NOT_CONTAINS,
                    FilterMatchMode.ENDS_WITH,
                    FilterMatchMode.EQUALS,
                    FilterMatchMode.NOT_EQUALS
                ],
                numeric: [
                    FilterMatchMode.EQUALS,
                    FilterMatchMode.NOT_EQUALS,
                    FilterMatchMode.LESS_THAN,
                    FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                    FilterMatchMode.GREATER_THAN,
                    FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
                ],
                date: [
                    FilterMatchMode.DATE_IS,
                    FilterMatchMode.DATE_IS_NOT,
                    FilterMatchMode.DATE_BEFORE,
                    FilterMatchMode.DATE_AFTER
                ]
            };
            this.translation = {
                startsWith: 'Starts with',
                contains: 'Contains',
                notContains: 'Not contains',
                endsWith: 'Ends with',
                equals: 'Equals',
                notEquals: 'Not equals',
                noFilter: 'No Filter',
                lt: 'Less than',
                lte: 'Less than or equal to',
                gt: 'Greater than',
                gte: 'Greater than or equal to',
                is: 'Is',
                isNot: 'Is not',
                before: 'Before',
                after: 'After',
                dateIs: 'Date is',
                dateIsNot: 'Date is not',
                dateBefore: 'Date is before',
                dateAfter: 'Date is after',
                clear: 'Clear',
                apply: 'Apply',
                matchAll: 'Match All',
                matchAny: 'Match Any',
                addRule: 'Add Rule',
                removeRule: 'Remove Rule',
                accept: 'Yes',
                reject: 'No',
                choose: 'Choose',
                upload: 'Upload',
                cancel: 'Cancel',
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: 'Today',
                weekHeader: 'Wk',
                weak: 'Weak',
                medium: 'Medium',
                strong: 'Strong',
                passwordPrompt: 'Enter a password',
                emptyMessage: 'No results found',
                emptyFilterMessage: 'No results found'
            };
            this.translationSource = new rxjs.Subject();
            this.translationObserver = this.translationSource.asObservable();
        }
        PrimeNGConfig.prototype.getTranslation = function (key) {
            return this.translation[key];
        };
        PrimeNGConfig.prototype.setTranslation = function (value) {
            this.translation = Object.assign(Object.assign({}, this.translation), value);
            this.translationSource.next(this.translation);
        };
        return PrimeNGConfig;
    }());
    PrimeNGConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function PrimeNGConfig_Factory() { return new PrimeNGConfig(); }, token: PrimeNGConfig, providedIn: "root" });
    PrimeNGConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var TranslationKeys = /** @class */ (function () {
        function TranslationKeys() {
        }
        return TranslationKeys;
    }());
    TranslationKeys.STARTS_WITH = 'startsWith';
    TranslationKeys.CONTAINS = 'contains';
    TranslationKeys.NOT_CONTAINS = 'notContains';
    TranslationKeys.ENDS_WITH = 'endsWith';
    TranslationKeys.EQUALS = 'equals';
    TranslationKeys.NOT_EQUALS = 'notEquals';
    TranslationKeys.NO_FILTER = 'noFilter';
    TranslationKeys.LT = 'lt';
    TranslationKeys.LTE = 'lte';
    TranslationKeys.GT = 'gt';
    TranslationKeys.GTE = 'gte';
    TranslationKeys.IS = 'is';
    TranslationKeys.IS_NOT = 'isNot';
    TranslationKeys.BEFORE = 'before';
    TranslationKeys.AFTER = 'after';
    TranslationKeys.CLEAR = 'clear';
    TranslationKeys.APPLY = 'apply';
    TranslationKeys.MATCH_ALL = 'matchAll';
    TranslationKeys.MATCH_ANY = 'matchAny';
    TranslationKeys.ADD_RULE = 'addRule';
    TranslationKeys.REMOVE_RULE = 'removeRule';
    TranslationKeys.ACCEPT = 'accept';
    TranslationKeys.REJECT = 'reject';
    TranslationKeys.CHOOSE = 'choose';
    TranslationKeys.UPLOAD = 'upload';
    TranslationKeys.CANCEL = 'cancel';
    TranslationKeys.DAY_NAMES = 'dayNames';
    TranslationKeys.DAY_NAMES_SHORT = 'dayNamesShort';
    TranslationKeys.DAY_NAMES_MIN = 'dayNamesMin';
    TranslationKeys.MONTH_NAMES = 'monthNames';
    TranslationKeys.MONTH_NAMES_SHORT = 'monthNamesShort';
    TranslationKeys.TODAY = 'today';
    TranslationKeys.WEEK_HEADER = 'weekHeader';
    TranslationKeys.WEAK = 'weak';
    TranslationKeys.MEDIUM = 'medium';
    TranslationKeys.STRONG = 'strong';
    TranslationKeys.PASSWORD_PROMPT = 'passwordPrompt';
    TranslationKeys.EMPTY_MESSAGE = 'emptyMessage';
    TranslationKeys.EMPTY_FILTER_MESSAGE = 'emptyFilterMessage';

    (function (ConfirmEventType) {
        ConfirmEventType[ConfirmEventType["ACCEPT"] = 0] = "ACCEPT";
        ConfirmEventType[ConfirmEventType["REJECT"] = 1] = "REJECT";
        ConfirmEventType[ConfirmEventType["CANCEL"] = 2] = "CANCEL";
    })(exports.ConfirmEventType || (exports.ConfirmEventType = {}));

    var ConfirmationService = /** @class */ (function () {
        function ConfirmationService() {
            this.requireConfirmationSource = new rxjs.Subject();
            this.acceptConfirmationSource = new rxjs.Subject();
            this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
            this.accept = this.acceptConfirmationSource.asObservable();
        }
        ConfirmationService.prototype.confirm = function (confirmation) {
            this.requireConfirmationSource.next(confirmation);
            return this;
        };
        ConfirmationService.prototype.close = function () {
            this.requireConfirmationSource.next(null);
            return this;
        };
        ConfirmationService.prototype.onAccept = function () {
            this.acceptConfirmationSource.next();
        };
        return ConfirmationService;
    }());
    ConfirmationService.decorators = [
        { type: i0.Injectable }
    ];

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

    var FilterService = /** @class */ (function () {
        function FilterService() {
            var _this = this;
            this.filters = {
                startsWith: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null || filter.trim() === '') {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                    var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
                    return stringValue.slice(0, filterValue.length) === filterValue;
                },
                contains: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                    var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
                    return stringValue.indexOf(filterValue) !== -1;
                },
                notContains: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                    var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
                    return stringValue.indexOf(filterValue) === -1;
                },
                endsWith: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null || filter.trim() === '') {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                    var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
                    return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
                },
                equals: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    if (value.getTime && filter.getTime)
                        return value.getTime() === filter.getTime();
                    else
                        return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                },
                notEquals: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                        return false;
                    }
                    if (value === undefined || value === null) {
                        return true;
                    }
                    if (value.getTime && filter.getTime)
                        return value.getTime() !== filter.getTime();
                    else
                        return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                },
                in: function (value, filter) {
                    if (filter === undefined || filter === null || filter.length === 0) {
                        return true;
                    }
                    for (var i = 0; i < filter.length; i++) {
                        if (utils.ObjectUtils.equals(value, filter[i])) {
                            return true;
                        }
                    }
                    return false;
                },
                between: function (value, filter) {
                    if (filter == null || filter[0] == null || filter[1] == null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    if (value.getTime)
                        return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
                    else
                        return filter[0] <= value && value <= filter[1];
                },
                lt: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    if (value.getTime && filter.getTime)
                        return value.getTime() < filter.getTime();
                    else
                        return value < filter;
                },
                lte: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    if (value.getTime && filter.getTime)
                        return value.getTime() <= filter.getTime();
                    else
                        return value <= filter;
                },
                gt: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    if (value.getTime && filter.getTime)
                        return value.getTime() > filter.getTime();
                    else
                        return value > filter;
                },
                gte: function (value, filter, filterLocale) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    if (value.getTime && filter.getTime)
                        return value.getTime() >= filter.getTime();
                    else
                        return value >= filter;
                },
                is: function (value, filter, filterLocale) {
                    return _this.filters.equals(value, filter, filterLocale);
                },
                isNot: function (value, filter, filterLocale) {
                    return _this.filters.notEquals(value, filter, filterLocale);
                },
                before: function (value, filter, filterLocale) {
                    return _this.filters.lt(value, filter, filterLocale);
                },
                after: function (value, filter, filterLocale) {
                    return _this.filters.gt(value, filter, filterLocale);
                },
                dateIs: function (value, filter) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    return value.toDateString() === filter.toDateString();
                },
                dateIsNot: function (value, filter) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    return value.toDateString() !== filter.toDateString();
                },
                dateBefore: function (value, filter) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    return value.getTime() < filter.getTime();
                },
                dateAfter: function (value, filter) {
                    if (filter === undefined || filter === null) {
                        return true;
                    }
                    if (value === undefined || value === null) {
                        return false;
                    }
                    return value.getTime() > filter.getTime();
                }
            };
        }
        FilterService.prototype.filter = function (value, fields, filterValue, filterMatchMode, filterLocale) {
            var e_1, _a, e_2, _b;
            var filteredItems = [];
            if (value) {
                try {
                    for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var item = value_1_1.value;
                        try {
                            for (var fields_1 = (e_2 = void 0, __values(fields)), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                                var field = fields_1_1.value;
                                var fieldValue = utils.ObjectUtils.resolveFieldData(item, field);
                                if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                                    filteredItems.push(item);
                                    break;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (fields_1_1 && !fields_1_1.done && (_b = fields_1.return)) _b.call(fields_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return filteredItems;
        };
        FilterService.prototype.register = function (rule, fn) {
            this.filters[rule] = fn;
        };
        return FilterService;
    }());
    FilterService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FilterService_Factory() { return new FilterService(); }, token: FilterService, providedIn: "root" });
    FilterService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var ContextMenuService = /** @class */ (function () {
        function ContextMenuService() {
            this.activeItemKeyChange = new rxjs.Subject();
            this.activeItemKeyChange$ = this.activeItemKeyChange.asObservable();
        }
        ContextMenuService.prototype.changeKey = function (key) {
            this.activeItemKey = key;
            this.activeItemKeyChange.next(this.activeItemKey);
        };
        ContextMenuService.prototype.reset = function () {
            this.activeItemKey = null;
            this.activeItemKeyChange.next(this.activeItemKey);
        };
        return ContextMenuService;
    }());
    ContextMenuService.decorators = [
        { type: i0.Injectable }
    ];

    var MessageService = /** @class */ (function () {
        function MessageService() {
            this.messageSource = new rxjs.Subject();
            this.clearSource = new rxjs.Subject();
            this.messageObserver = this.messageSource.asObservable();
            this.clearObserver = this.clearSource.asObservable();
        }
        MessageService.prototype.add = function (message) {
            if (message) {
                this.messageSource.next(message);
            }
        };
        MessageService.prototype.addAll = function (messages) {
            if (messages && messages.length) {
                this.messageSource.next(messages);
            }
        };
        MessageService.prototype.clear = function (key) {
            this.clearSource.next(key || null);
        };
        return MessageService;
    }());
    MessageService.decorators = [
        { type: i0.Injectable }
    ];

    var PrimeIcons = /** @class */ (function () {
        function PrimeIcons() {
        }
        return PrimeIcons;
    }());
    PrimeIcons.ALIGN_CENTER = 'pi pi-align-center';
    PrimeIcons.ALIGN_JUSTIFY = 'pi pi-align-justify';
    PrimeIcons.ALIGN_LEFT = 'pi pi-align-left';
    PrimeIcons.ALIGN_RIGHT = 'pi pi-align-right';
    PrimeIcons.AMAZON = 'pi pi-amazon';
    PrimeIcons.ANDROID = 'pi pi-android';
    PrimeIcons.ANGLE_DOUBLE_DOWN = 'pi pi-angle-double-down';
    PrimeIcons.ANGLE_DOUBLE_LEFT = 'pi pi-angle-double-left';
    PrimeIcons.ANGLE_DOUBLE_RIGHT = 'pi pi-angle-double-right';
    PrimeIcons.ANGLE_DOUBLE_UP = 'pi pi-angle-double-up';
    PrimeIcons.ANGLE_DOWN = 'pi pi-angle-down';
    PrimeIcons.ANGLE_LEFT = 'pi pi-angle-left';
    PrimeIcons.ANGLE_RIGHT = 'pi pi-angle-right';
    PrimeIcons.ANGLE_UP = 'pi pi-angle-up';
    PrimeIcons.APPLE = 'pi pi-apple';
    PrimeIcons.ARROW_CIRCLE_DOWN = 'pi pi-arrow-circle-down';
    PrimeIcons.ARROW_CIRCLE_LEFT = 'pi pi-arrow-circle-left';
    PrimeIcons.ARROW_CIRCLE_RIGHT = 'pi pi-arrow-circle-right';
    PrimeIcons.ARROW_CIRCLE_UP = 'pi pi-arrow-circle-up';
    PrimeIcons.ARROW_DOWN = 'pi pi-arrow-down';
    PrimeIcons.ARROW_LEFT = 'pi pi-arrow-left';
    PrimeIcons.ARROW_RIGHT = 'pi pi-arrow-right';
    PrimeIcons.ARROW_UP = 'pi pi-arrow-up';
    PrimeIcons.BACKWARD = 'pi pi-backward';
    PrimeIcons.BAN = 'pi pi-ban';
    PrimeIcons.BARS = 'pi pi-bars';
    PrimeIcons.BELL = 'pi pi-bell';
    PrimeIcons.BOOK = 'pi pi-book';
    PrimeIcons.BOOKMARK = 'pi pi-bookmark';
    PrimeIcons.BRIEFCASE = 'pi pi-briefcase';
    PrimeIcons.CALENDAR_MINUS = 'pi pi-calendar-minus';
    PrimeIcons.CALENDAR_PLUS = 'pi pi-calendar-plus';
    PrimeIcons.CALENDAR_TIMES = 'pi pi-calendar-times';
    PrimeIcons.CALENDAR = 'pi pi-calendar';
    PrimeIcons.CAMERA = 'pi pi-camera';
    PrimeIcons.CARET_DOWN = 'pi pi-caret-down';
    PrimeIcons.CARET_LEFT = 'pi pi-caret-left';
    PrimeIcons.CARET_RIGHT = 'pi pi-caret-right';
    PrimeIcons.CARET_UP = 'pi pi-caret-up';
    PrimeIcons.CHART_BAR = 'pi pi-chart-bar';
    PrimeIcons.CHART_LINE = 'pi pi-chart-line';
    PrimeIcons.CHECK_CIRCLE = 'pi pi-check-circle';
    PrimeIcons.CHECK_SQUARE = 'pi pi-check-square';
    PrimeIcons.CHECK = 'pi pi-check';
    PrimeIcons.CHEVRON_CIRCLE_DOWN = 'pi pi-chevron-circle-down';
    PrimeIcons.CHEVRON_CIRCLE_LEFT = 'pi pi-chevron-circle-left';
    PrimeIcons.CHEVRON_CIRCLE_RIGHT = 'pi pi-chevron-circle-right';
    PrimeIcons.CHEVRON_CIRCLE_UP = 'pi pi-chevron-circle-up';
    PrimeIcons.CHEVRON_DOWN = 'pi pi-chevron-down';
    PrimeIcons.CHEVRON_LEFT = 'pi pi-chevron-left';
    PrimeIcons.CHEVRON_RIGHT = 'pi pi-chevron-right';
    PrimeIcons.CHEVRON_UP = 'pi pi-chevron-up';
    PrimeIcons.CLOCK = 'pi pi-clock';
    PrimeIcons.CLONE = 'pi pi-clone';
    PrimeIcons.CLOUD_DOWNLOAD = 'pi pi-cloud-download';
    PrimeIcons.CLOUD_UPLOAD = 'pi pi-cloud-upload';
    PrimeIcons.CLOUD = 'pi pi-cloud';
    PrimeIcons.COG = 'pi pi-cog';
    PrimeIcons.COMMENT = 'pi pi-comment';
    PrimeIcons.COMMENTS = 'pi pi-comments';
    PrimeIcons.COMPASS = 'pi pi-compass';
    PrimeIcons.COPY = 'pi pi-copy';
    PrimeIcons.CREDIT_CARD = 'pi pi-credit-card';
    PrimeIcons.DESKTOP = 'pi pi-desktop';
    PrimeIcons.DISCORD = 'pi pi-discord';
    PrimeIcons.DIRECTIONS_ALT = 'pi pi-directions-alt';
    PrimeIcons.DIRECTIONS = 'pi pi-directions';
    PrimeIcons.DOLLAR = 'pi pi-dollar';
    PrimeIcons.DOWNLOAD = 'pi pi-download';
    PrimeIcons.EJECT = 'pi pi-eject';
    PrimeIcons.ELLIPSIS_H = 'pi pi-ellipsis-h';
    PrimeIcons.ELLIPSIS_V = 'pi pi-ellipsis-v';
    PrimeIcons.ENVELOPE = 'pi pi-envelope';
    PrimeIcons.EXCLAMATION_CIRCLE = 'pi pi-exclamation-circle';
    PrimeIcons.EXCLAMATION_TRIANGLE = 'pi pi-exclamation-triangle ';
    PrimeIcons.EXTERNAL_LINK = 'pi pi-external-link';
    PrimeIcons.EYE_SLASH = 'pi pi-eye-slash';
    PrimeIcons.EYE = 'pi pi-eye';
    PrimeIcons.FACEBOOK = 'pi pi-facebook';
    PrimeIcons.FAST_BACKWARD = 'pi pi-fast-backward';
    PrimeIcons.FAST_FORWARD = 'pi pi-fast-forward';
    PrimeIcons.FILE_EXCEL = 'pi pi-file-excel';
    PrimeIcons.FILE_O = 'pi pi-file-o';
    PrimeIcons.FILE_PDF = 'pi pi-file-pdf';
    PrimeIcons.FILE = 'pi pi-file';
    PrimeIcons.FILTER = 'pi pi-filter';
    PrimeIcons.FILTER_SLASH = 'pi pi-filter-slash';
    PrimeIcons.FLAG = 'pi pi-flag';
    PrimeIcons.FOLDER_OPEN = 'pi pi-folder-open';
    PrimeIcons.FOLDER = 'pi pi-folder';
    PrimeIcons.FORWARD = 'pi pi-forward';
    PrimeIcons.GITHUB = 'pi pi-github';
    PrimeIcons.GLOBE = 'pi pi-globe';
    PrimeIcons.GOOGLE = 'pi pi-google';
    PrimeIcons.HEART = 'pi pi-heart';
    PrimeIcons.HOME = 'pi pi-home';
    PrimeIcons.ID_CARD = 'pi pi-id-card';
    PrimeIcons.IMAGE = 'pi pi-image';
    PrimeIcons.IMAGES = 'pi pi-images';
    PrimeIcons.INBOX = 'pi pi-inbox';
    PrimeIcons.INFO_CIRCLE = 'pi pi-info-circle';
    PrimeIcons.INFO = 'pi pi-info';
    PrimeIcons.KEY = 'pi pi-key';
    PrimeIcons.LINK = 'pi pi-link';
    PrimeIcons.LIST = 'pi pi-list';
    PrimeIcons.LOCK_OPEN = 'pi pi-lock-open';
    PrimeIcons.LOCK = 'pi pi-lock';
    PrimeIcons.MAP = 'pi pi-map';
    PrimeIcons.MAP_MARKER = 'pi pi-map-marker';
    PrimeIcons.MICROSOFT = 'pi pi-microsoft';
    PrimeIcons.MINUS_CIRCLE = 'pi pi-minus-circle';
    PrimeIcons.MINUS = 'pi pi-minus';
    PrimeIcons.MOBILE = 'pi pi-mobile';
    PrimeIcons.MONEY_BILL = 'pi pi-money-bill';
    PrimeIcons.MOON = 'pi pi-moon';
    PrimeIcons.PALETTE = 'pi pi-palette';
    PrimeIcons.PAPERCLIP = 'pi pi-paperclip';
    PrimeIcons.PAUSE = 'pi pi-pause';
    PrimeIcons.PAYPAL = 'pi pi-paypal';
    PrimeIcons.PENCIL = 'pi pi-pencil';
    PrimeIcons.PERCENTAGE = 'pi pi-percentage';
    PrimeIcons.PHONE = 'pi pi-phone';
    PrimeIcons.PLAY = 'pi pi-play';
    PrimeIcons.PLUS_CIRCLE = 'pi pi-plus-circle';
    PrimeIcons.PLUS = 'pi pi-plus';
    PrimeIcons.POWER_OFF = 'pi pi-power-off';
    PrimeIcons.PRINT = 'pi pi-print';
    PrimeIcons.QUESTION_CIRCLE = 'pi pi-question-circle';
    PrimeIcons.QUESTION = 'pi pi-question';
    PrimeIcons.RADIO_OFF = 'pi pi-radio-off';
    PrimeIcons.RADIO_ON = 'pi pi-radio-on';
    PrimeIcons.REFRESH = 'pi pi-refresh';
    PrimeIcons.REPLAY = 'pi pi-replay';
    PrimeIcons.REPLY = 'pi pi-reply';
    PrimeIcons.SAVE = 'pi pi-save';
    PrimeIcons.SEARCH_MINUS = 'pi pi-search-minus';
    PrimeIcons.SEARCH_PLUS = 'pi pi-search-plus';
    PrimeIcons.SEARCH = 'pi pi-search';
    PrimeIcons.SEND = 'pi pi-send';
    PrimeIcons.SHARE_ALT = 'pi pi-share-alt';
    PrimeIcons.SHIELD = 'pi pi-shield';
    PrimeIcons.SHOPPING_CART = 'pi pi-shopping-cart';
    PrimeIcons.SIGN_IN = 'pi pi-sign-in';
    PrimeIcons.SIGN_OUT = 'pi pi-sign-out';
    PrimeIcons.SITEMAP = 'pi pi-sitemap';
    PrimeIcons.SLACK = 'pi pi-slack';
    PrimeIcons.SLIDERS_H = 'pi pi-sliders-h';
    PrimeIcons.SLIDERS_V = 'pi pi-sliders-v';
    PrimeIcons.SORT_ALPHA_ALT_DOWN = 'pi pi-sort-alpha-alt-down';
    PrimeIcons.SORT_ALPHA_ALT_UP = 'pi pi-sort-alpha-alt-up';
    PrimeIcons.SORT_ALPHA_DOWN = 'pi pi-sort-alpha-down';
    PrimeIcons.SORT_ALPHA_UP = 'pi pi-sort-alpha-up';
    PrimeIcons.SORT_ALT = 'pi pi-sort-alt';
    PrimeIcons.SORT_AMOUNT_DOWN_ALT = 'pi pi-sort-amount-down-alt';
    PrimeIcons.SORT_AMOUNT_DOWN = 'pi pi-sort-amount-down';
    PrimeIcons.SORT_AMOUNT_UP_ALT = 'pi pi-sort-amount-up-alt';
    PrimeIcons.SORT_AMOUNT_UP = 'pi pi-sort-amount-up';
    PrimeIcons.SORT_DOWN = 'pi pi-sort-down';
    PrimeIcons.SORT_NUMERIC_ALT_DOWN = 'pi pi-sort-numeric-alt-down';
    PrimeIcons.SORT_NUMERIC_ALT_UP = 'pi pi-sort-numeric-alt-up';
    PrimeIcons.SORT_NUMERIC_DOWN = 'pi pi-sort-numeric-down';
    PrimeIcons.SORT_NUMERIC_UP = 'pi pi-sort-numeric-up';
    PrimeIcons.SORT_UP = 'pi pi-sort-up';
    PrimeIcons.SORT = 'pi pi-sort';
    PrimeIcons.SPINNER = 'pi pi-spinner';
    PrimeIcons.STAR_O = 'pi pi-star-o';
    PrimeIcons.STAR = 'pi pi-star';
    PrimeIcons.STEP_BACKWARD_ALT = 'pi pi-step-backward-alt';
    PrimeIcons.STEP_BACKWARD = 'pi pi-step-backward';
    PrimeIcons.STEP_FORWARD_ALT = 'pi pi-step-forward-alt';
    PrimeIcons.STEP_FORWARD = 'pi pi-step-forward';
    PrimeIcons.SUN = 'pi pi-sun';
    PrimeIcons.TABLE = 'pi pi-table';
    PrimeIcons.TABLET = 'pi pi-tablet';
    PrimeIcons.TAG = 'pi pi-tag';
    PrimeIcons.TAGS = 'pi pi-tags';
    PrimeIcons.TH_LARGE = 'pi pi-th-large';
    PrimeIcons.THUMBS_DOWN = 'pi pi-thumbs-down';
    PrimeIcons.THUMBS_UP = 'pi pi-thumbs-up';
    PrimeIcons.TICKET = 'pi pi-ticket';
    PrimeIcons.TIMES_CIRCLE = 'pi pi-times-circle';
    PrimeIcons.TIMES = 'pi pi-times';
    PrimeIcons.TRASH = 'pi pi-trash';
    PrimeIcons.TWITTER = 'pi pi-twitter';
    PrimeIcons.UNDO = 'pi pi-undo';
    PrimeIcons.UNLOCK = 'pi pi-unlock';
    PrimeIcons.UPLOAD = 'pi pi-upload';
    PrimeIcons.USER_EDIT = 'pi pi-user-edit';
    PrimeIcons.USER_MINUS = 'pi pi-user-minus';
    PrimeIcons.USER_PLUS = 'pi pi-user-plus';
    PrimeIcons.USER = 'pi pi-user';
    PrimeIcons.USERS = 'pi pi-users';
    PrimeIcons.VIDEO = 'pi pi-video';
    PrimeIcons.VIMEO = 'pi pi-vimeo';
    PrimeIcons.VOLUME_DOWN = 'pi pi-volume-down';
    PrimeIcons.VOLUME_OFF = 'pi pi-volume-off';
    PrimeIcons.VOLUME_UP = 'pi pi-volume-up';
    PrimeIcons.YOUTUBE = 'pi pi-youtube';
    PrimeIcons.WALLET = 'pi pi-wallet';
    PrimeIcons.WIFI = 'pi pi-wifi';
    PrimeIcons.WINDOW_MAXIMIZE = 'pi pi-window-maximize';
    PrimeIcons.WINDOW_MINIMIZE = 'pi pi-window-minimize';

    var FilterOperator = /** @class */ (function () {
        function FilterOperator() {
        }
        return FilterOperator;
    }());
    FilterOperator.AND = 'and';
    FilterOperator.OR = 'or';

    var Header = /** @class */ (function () {
        function Header() {
        }
        return Header;
    }());
    Header.decorators = [
        { type: i0.Component, args: [{
                    selector: 'p-header',
                    template: '<ng-content></ng-content>'
                },] }
    ];
    var Footer = /** @class */ (function () {
        function Footer() {
        }
        return Footer;
    }());
    Footer.decorators = [
        { type: i0.Component, args: [{
                    selector: 'p-footer',
                    template: '<ng-content></ng-content>'
                },] }
    ];
    var PrimeTemplate = /** @class */ (function () {
        function PrimeTemplate(template) {
            this.template = template;
        }
        PrimeTemplate.prototype.getType = function () {
            return this.name;
        };
        return PrimeTemplate;
    }());
    PrimeTemplate.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[pTemplate]',
                    host: {}
                },] }
    ];
    PrimeTemplate.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    PrimeTemplate.propDecorators = {
        type: [{ type: i0.Input }],
        name: [{ type: i0.Input, args: ['pTemplate',] }]
    };
    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        return SharedModule;
    }());
    SharedModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Header, Footer, PrimeTemplate],
                    declarations: [Header, Footer, PrimeTemplate]
                },] }
    ];

    var TreeDragDropService = /** @class */ (function () {
        function TreeDragDropService() {
            this.dragStartSource = new rxjs.Subject();
            this.dragStopSource = new rxjs.Subject();
            this.dragStart$ = this.dragStartSource.asObservable();
            this.dragStop$ = this.dragStopSource.asObservable();
        }
        TreeDragDropService.prototype.startDrag = function (event) {
            this.dragStartSource.next(event);
        };
        TreeDragDropService.prototype.stopDrag = function (event) {
            this.dragStopSource.next(event);
        };
        return TreeDragDropService;
    }());
    TreeDragDropService.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConfirmationService = ConfirmationService;
    exports.ContextMenuService = ContextMenuService;
    exports.FilterMatchMode = FilterMatchMode;
    exports.FilterOperator = FilterOperator;
    exports.FilterService = FilterService;
    exports.Footer = Footer;
    exports.Header = Header;
    exports.MessageService = MessageService;
    exports.PrimeIcons = PrimeIcons;
    exports.PrimeNGConfig = PrimeNGConfig;
    exports.PrimeTemplate = PrimeTemplate;
    exports.SharedModule = SharedModule;
    exports.TranslationKeys = TranslationKeys;
    exports.TreeDragDropService = TreeDragDropService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-api.umd.js.map
