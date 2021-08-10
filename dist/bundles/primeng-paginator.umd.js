(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('primeng/dropdown'), require('primeng/ripple'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/paginator', ['exports', '@angular/core', '@angular/common', '@angular/forms', 'primeng/dropdown', 'primeng/ripple', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.paginator = {}), global.ng.core, global.ng.common, global.ng.forms, global.primeng.dropdown, global.primeng.ripple, global.primeng.api));
}(this, (function (exports, core, common, forms, dropdown, ripple, api) { 'use strict';

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

    var Paginator = /** @class */ (function () {
        function Paginator(cd) {
            this.cd = cd;
            this.pageLinkSize = 5;
            this.onPageChange = new core.EventEmitter();
            this.alwaysShow = true;
            this.dropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.showFirstLastIcon = true;
            this.totalRecords = 0;
            this.rows = 0;
            this.showPageLinks = true;
            this._first = 0;
            this._page = 0;
        }
        Paginator.prototype.ngOnInit = function () {
            this.updatePaginatorState();
        };
        Paginator.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.totalRecords) {
                this.updatePageLinks();
                this.updatePaginatorState();
                this.updateFirst();
                this.updateRowsPerPageOptions();
            }
            if (simpleChange.first) {
                this._first = simpleChange.first.currentValue;
                this.updatePageLinks();
                this.updatePaginatorState();
            }
            if (simpleChange.rows) {
                this.updatePageLinks();
                this.updatePaginatorState();
            }
            if (simpleChange.rowsPerPageOptions) {
                this.updateRowsPerPageOptions();
            }
        };
        Object.defineProperty(Paginator.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
            },
            enumerable: false,
            configurable: true
        });
        Paginator.prototype.updateRowsPerPageOptions = function () {
            var e_1, _a;
            if (this.rowsPerPageOptions) {
                this.rowsPerPageItems = [];
                try {
                    for (var _b = __values(this.rowsPerPageOptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (typeof opt == 'object' && opt['showAll']) {
                            this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                        }
                        else {
                            this.rowsPerPageItems.push({ label: String(opt), value: opt });
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
            }
        };
        Paginator.prototype.isFirstPage = function () {
            return this.getPage() === 0;
        };
        Paginator.prototype.isLastPage = function () {
            return this.getPage() === this.getPageCount() - 1;
        };
        Paginator.prototype.getPageCount = function () {
            return Math.ceil(this.totalRecords / this.rows) || 1;
        };
        Paginator.prototype.calculatePageLinkBoundaries = function () {
            var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
            //calculate range, keep current in middle if necessary
            var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
            //check when approaching to last page
            var delta = this.pageLinkSize - (end - start + 1);
            start = Math.max(0, start - delta);
            return [start, end];
        };
        Paginator.prototype.updatePageLinks = function () {
            this.pageLinks = [];
            var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
            for (var i = start; i <= end; i++) {
                this.pageLinks.push(i + 1);
            }
            if (this.showJumpToPageDropdown) {
                this.pageItems = [];
                for (var i = 0; i < this.getPageCount(); i++) {
                    this.pageItems.push({ label: String(i + 1), value: i });
                }
            }
        };
        Paginator.prototype.changePage = function (p) {
            var pc = this.getPageCount();
            if (p >= 0 && p < pc) {
                this._first = this.rows * p;
                var state = {
                    page: p,
                    first: this.first,
                    rows: this.rows,
                    pageCount: pc
                };
                this.updatePageLinks();
                this.onPageChange.emit(state);
                this.updatePaginatorState();
            }
        };
        Paginator.prototype.updateFirst = function () {
            var _this = this;
            var page = this.getPage();
            if (page > 0 && this.totalRecords && (this.first >= this.totalRecords)) {
                Promise.resolve(null).then(function () { return _this.changePage(page - 1); });
            }
        };
        Paginator.prototype.getPage = function () {
            return Math.floor(this.first / this.rows);
        };
        Paginator.prototype.changePageToFirst = function (event) {
            if (!this.isFirstPage()) {
                this.changePage(0);
            }
            event.preventDefault();
        };
        Paginator.prototype.changePageToPrev = function (event) {
            this.changePage(this.getPage() - 1);
            event.preventDefault();
        };
        Paginator.prototype.changePageToNext = function (event) {
            this.changePage(this.getPage() + 1);
            event.preventDefault();
        };
        Paginator.prototype.changePageToLast = function (event) {
            if (!this.isLastPage()) {
                this.changePage(this.getPageCount() - 1);
            }
            event.preventDefault();
        };
        Paginator.prototype.onPageLinkClick = function (event, page) {
            this.changePage(page);
            event.preventDefault();
        };
        Paginator.prototype.onRppChange = function (event) {
            this.changePage(this.getPage());
        };
        Paginator.prototype.onPageDropdownChange = function (event) {
            this.changePage(event.value);
        };
        Paginator.prototype.updatePaginatorState = function () {
            this.paginatorState = {
                page: this.getPage(),
                pageCount: this.getPageCount(),
                rows: this.rows,
                first: this.first,
                totalRecords: this.totalRecords
            };
        };
        Object.defineProperty(Paginator.prototype, "currentPageReport", {
            get: function () {
                return this.currentPageReportTemplate
                    .replace("{currentPage}", String(this.getPage() + 1))
                    .replace("{totalPages}", String(this.getPageCount()))
                    .replace("{first}", String((this.totalRecords > 0) ? this._first + 1 : 0))
                    .replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords)))
                    .replace("{rows}", String(this.rows))
                    .replace("{totalRecords}", String(this.totalRecords));
            },
            enumerable: false,
            configurable: true
        });
        return Paginator;
    }());
    Paginator.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-paginator',
                    template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-paginator p-component'\" *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\">\n            <div class=\"p-paginator-left-content\" *ngIf=\"templateLeft\">\n                <ng-container *ngTemplateOutlet=\"templateLeft; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n            <span class=\"p-paginator-current\" *ngIf=\"showCurrentPageReport\">{{currentPageReport}}</span>\n            <button *ngIf=\"showFirstLastIcon\" type=\"button\" [disabled]=\"isFirstPage()\" (click)=\"changePageToFirst($event)\" pRipple\n                    class=\"p-paginator-first p-paginator-element p-link\" [ngClass]=\"{'p-disabled':isFirstPage()}\">\n                <span class=\"p-paginator-icon pi pi-angle-double-left\"></span>\n            </button>\n            <button type=\"button\" [disabled]=\"isFirstPage()\" (click)=\"changePageToPrev($event)\" pRipple\n                    class=\"p-paginator-prev p-paginator-element p-link\" [ngClass]=\"{'p-disabled':isFirstPage()}\">\n                <span class=\"p-paginator-icon pi pi-angle-left\"></span>\n            </button>\n            <span class=\"p-paginator-pages\" *ngIf=\"showPageLinks\">\n                <button type=\"button\" *ngFor=\"let pageLink of pageLinks\" class=\"p-paginator-page p-paginator-element p-link\" [ngClass]=\"{'p-highlight': (pageLink-1 == getPage())}\"\n                    (click)=\"onPageLinkClick($event, pageLink - 1)\" pRipple>{{pageLink}}</button>\n            </span>\n            <p-dropdown [options]=\"pageItems\" [ngModel]=\"getPage()\" *ngIf=\"showJumpToPageDropdown\"  styleClass=\"p-paginator-page-options\"\n                (onChange)=\"onPageDropdownChange($event)\" [appendTo]=\"dropdownAppendTo\" [scrollHeight]=\"dropdownScrollHeight\">\n                <ng-template pTemplate=\"selectedItem\">{{currentPageReport}}</ng-template>\n            </p-dropdown>\n            <button type=\"button\" [disabled]=\"isLastPage()\" (click)=\"changePageToNext($event)\" pRipple\n                    class=\"p-paginator-next p-paginator-element p-link\" [ngClass]=\"{'p-disabled':isLastPage()}\">\n                <span class=\"p-paginator-icon pi pi-angle-right\"></span>\n            </button>\n            <button *ngIf=\"showFirstLastIcon\" type=\"button\" [disabled]=\"isLastPage()\" (click)=\"changePageToLast($event)\" pRipple\n                    class=\"p-paginator-last p-paginator-element p-link\" [ngClass]=\"{'p-disabled':isLastPage()}\">\n                <span class=\"p-paginator-icon pi pi-angle-double-right\"></span>\n            </button>\n            <p-dropdown [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" styleClass=\"p-paginator-rpp-options\"\n                (onChange)=\"onRppChange($event)\" [appendTo]=\"dropdownAppendTo\" [scrollHeight]=\"dropdownScrollHeight\">\n                <ng-container *ngIf=\"dropdownItemTemplate\">\n                    <ng-template let-item pTemplate=\"item\">\n                        <ng-container *ngTemplateOutlet=\"dropdownItemTemplate; context: {$implicit: item}\">\n                        </ng-container>\n                    </ng-template>\n                </ng-container>\n            </p-dropdown>\n            <div class=\"p-paginator-right-content\" *ngIf=\"templateRight\">\n                <ng-container *ngTemplateOutlet=\"templateRight; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-paginator{align-items:center;display:flex;flex-wrap:wrap;justify-content:center}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-current,.p-paginator-first,.p-paginator-last,.p-paginator-next,.p-paginator-page,.p-paginator-prev{-ms-user-select:none;-webkit-user-select:none;align-items:center;cursor:pointer;display:inline-flex;justify-content:center;line-height:1;overflow:hidden;position:relative;user-select:none}.p-paginator-element:focus{position:relative;z-index:1}"]
                },] }
    ];
    Paginator.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    Paginator.propDecorators = {
        pageLinkSize: [{ type: core.Input }],
        onPageChange: [{ type: core.Output }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        alwaysShow: [{ type: core.Input }],
        templateLeft: [{ type: core.Input }],
        templateRight: [{ type: core.Input }],
        dropdownAppendTo: [{ type: core.Input }],
        dropdownScrollHeight: [{ type: core.Input }],
        currentPageReportTemplate: [{ type: core.Input }],
        showCurrentPageReport: [{ type: core.Input }],
        showFirstLastIcon: [{ type: core.Input }],
        totalRecords: [{ type: core.Input }],
        rows: [{ type: core.Input }],
        rowsPerPageOptions: [{ type: core.Input }],
        showJumpToPageDropdown: [{ type: core.Input }],
        showPageLinks: [{ type: core.Input }],
        dropdownItemTemplate: [{ type: core.Input }],
        first: [{ type: core.Input }]
    };
    var PaginatorModule = /** @class */ (function () {
        function PaginatorModule() {
        }
        return PaginatorModule;
    }());
    PaginatorModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, dropdown.DropdownModule, forms.FormsModule, api.SharedModule, ripple.RippleModule],
                    exports: [Paginator, dropdown.DropdownModule, forms.FormsModule, api.SharedModule],
                    declarations: [Paginator]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Paginator = Paginator;
    exports.PaginatorModule = PaginatorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-paginator.umd.js.map
