(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('primeng/organizationchart', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.organizationchart = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api, global.rxjs));
}(this, (function (exports, core, animations, common, api, rxjs) { 'use strict';

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

    var OrganizationChartNode = /** @class */ (function () {
        function OrganizationChartNode(chart, cd) {
            var _this = this;
            this.cd = cd;
            this.chart = chart;
            this.subscription = this.chart.selectionSource$.subscribe(function () {
                _this.cd.markForCheck();
            });
        }
        Object.defineProperty(OrganizationChartNode.prototype, "leaf", {
            get: function () {
                return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrganizationChartNode.prototype, "colspan", {
            get: function () {
                return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
            },
            enumerable: false,
            configurable: true
        });
        OrganizationChartNode.prototype.onNodeClick = function (event, node) {
            this.chart.onNodeClick(event, node);
        };
        OrganizationChartNode.prototype.toggleNode = function (event, node) {
            node.expanded = !node.expanded;
            if (node.expanded)
                this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node });
            else
                this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node });
            event.preventDefault();
        };
        OrganizationChartNode.prototype.isSelected = function () {
            return this.chart.isSelected(this.node);
        };
        OrganizationChartNode.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        return OrganizationChartNode;
    }());
    OrganizationChartNode.decorators = [
        { type: core.Component, args: [{
                    selector: '[pOrganizationChartNode]',
                    template: "\n        <tbody *ngIf=\"node\">\n            <tr>\n                <td [attr.colspan]=\"colspan\">\n                    <div [class]=\"node.styleClass\" [ngClass]=\"{'p-organizationchart-node-content': true, 'p-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'p-highlight':isSelected()}\"\n                        (click)=\"onNodeClick($event,node)\">\n                        <div *ngIf=\"!chart.getTemplateForNode(node)\">{{node.label}}</div>\n                        <div *ngIf=\"chart.getTemplateForNode(node)\">\n                            <ng-container *ngTemplateOutlet=\"chart.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                        </div>\n                        <a *ngIf=\"!leaf\" tabindex=\"0\" class=\"p-node-toggler\" (click)=\"toggleNode($event, node)\" (keydown.enter)=\"toggleNode($event, node)\">\n                            <i class=\"p-node-toggler-icon pi\" [ngClass]=\"{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}\"></i>\n                        </a>\n                    </div>\n                </td>\n            </tr>\n            <tr [ngClass]=\"!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'\" class=\"p-organizationchart-lines\" [@childState]=\"'in'\">\n                <td [attr.colspan]=\"colspan\">\n                    <div class=\"p-organizationchart-line-down\"></div>\n                </td>\n            </tr>\n            <tr [ngClass]=\"!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'\" class=\"p-organizationchart-lines\" [@childState]=\"'in'\">\n                <ng-container *ngIf=\"node.children && node.children.length === 1\">\n                    <td [attr.colspan]=\"colspan\">\n                        <div class=\"p-organizationchart-line-down\"></div>\n                    </td>\n                </ng-container>\n                <ng-container *ngIf=\"node.children && node.children.length > 1\">\n                    <ng-template ngFor let-child [ngForOf]=\"node.children\" let-first=\"first\" let-last=\"last\">\n                        <td class=\"p-organizationchart-line-left\" [ngClass]=\"{'p-organizationchart-line-top':!first}\">&nbsp;</td>\n                        <td class=\"p-organizationchart-line-right\" [ngClass]=\"{'p-organizationchart-line-top':!last}\">&nbsp;</td>\n                    </ng-template>\n                </ng-container>\n            </tr>\n            <tr [ngClass]=\"!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'\" class=\"p-organizationchart-nodes\" [@childState]=\"'in'\">\n                <td *ngFor=\"let child of node.children\" colspan=\"2\">\n                    <table class=\"p-organizationchart-table\" pOrganizationChartNode [node]=\"child\"></table>\n                </td>\n            </tr>\n        </tbody>\n    ",
                    animations: [
                        animations.trigger('childState', [
                            animations.state('in', animations.style({ opacity: 1 })),
                            animations.transition('void => *', [
                                animations.style({ opacity: 0 }),
                                animations.animate(150)
                            ]),
                            animations.transition('* => void', [
                                animations.animate(150, animations.style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".p-organizationchart-table{border-collapse:separate;border-spacing:0;margin:0 auto}.p-organizationchart-table>tbody>tr>td{padding:0 .75rem;text-align:center;vertical-align:top}.p-organizationchart-node-content{display:inline-block;position:relative}.p-organizationchart-node-content .p-node-toggler{-ms-user-select:none;-webkit-user-select:none;bottom:-.75rem;cursor:pointer;height:1.5rem;left:50%;margin-left:-.75rem;position:absolute;user-select:none;width:1.5rem;z-index:2}.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon{position:relative;top:.25rem}.p-organizationchart-line-down{height:20px;margin:0 auto;width:1px}.p-organizationchart-line-left,.p-organizationchart-line-right{border-radius:0}.p-organizationchart-selectable-node{cursor:pointer}.p-organizationchart .p-organizationchart-node-hidden{display:none}.p-organizationchart-preservespace .p-organizationchart-node-hidden{display:inherit;visibility:hidden}"]
                },] }
    ];
    OrganizationChartNode.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return OrganizationChart; }),] }] },
        { type: core.ChangeDetectorRef }
    ]; };
    OrganizationChartNode.propDecorators = {
        node: [{ type: core.Input }],
        root: [{ type: core.Input }],
        first: [{ type: core.Input }],
        last: [{ type: core.Input }]
    };
    var OrganizationChart = /** @class */ (function () {
        function OrganizationChart(el, cd) {
            this.el = el;
            this.cd = cd;
            this.preserveSpace = true;
            this.selectionChange = new core.EventEmitter();
            this.onNodeSelect = new core.EventEmitter();
            this.onNodeUnselect = new core.EventEmitter();
            this.onNodeExpand = new core.EventEmitter();
            this.onNodeCollapse = new core.EventEmitter();
            this.selectionSource = new rxjs.Subject();
            this.selectionSource$ = this.selectionSource.asObservable();
        }
        Object.defineProperty(OrganizationChart.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (val) {
                this._selection = val;
                if (this.initialized)
                    this.selectionSource.next();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OrganizationChart.prototype, "root", {
            get: function () {
                return this.value && this.value.length ? this.value[0] : null;
            },
            enumerable: false,
            configurable: true
        });
        OrganizationChart.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.templates.length) {
                this.templateMap = {};
            }
            this.templates.forEach(function (item) {
                _this.templateMap[item.getType()] = item.template;
            });
            this.initialized = true;
        };
        OrganizationChart.prototype.getTemplateForNode = function (node) {
            if (this.templateMap)
                return node.type ? this.templateMap[node.type] : this.templateMap['default'];
            else
                return null;
        };
        OrganizationChart.prototype.onNodeClick = function (event, node) {
            var eventTarget = event.target;
            if (eventTarget.className && (eventTarget.className.indexOf('p-node-toggler') !== -1 || eventTarget.className.indexOf('p-node-toggler-icon') !== -1)) {
                return;
            }
            else if (this.selectionMode) {
                if (node.selectable === false) {
                    return;
                }
                var index_1 = this.findIndexInSelection(node);
                var selected = (index_1 >= 0);
                if (this.selectionMode === 'single') {
                    if (selected) {
                        this.selection = null;
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        this.selection = node;
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else if (this.selectionMode === 'multiple') {
                    if (selected) {
                        this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        this.selection = __spread(this.selection || [], [node]);
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                this.selectionChange.emit(this.selection);
                this.selectionSource.next();
            }
        };
        OrganizationChart.prototype.findIndexInSelection = function (node) {
            var index = -1;
            if (this.selectionMode && this.selection) {
                if (this.selectionMode === 'single') {
                    index = (this.selection == node) ? 0 : -1;
                }
                else if (this.selectionMode === 'multiple') {
                    for (var i = 0; i < this.selection.length; i++) {
                        if (this.selection[i] == node) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
        OrganizationChart.prototype.isSelected = function (node) {
            return this.findIndexInSelection(node) != -1;
        };
        return OrganizationChart;
    }());
    OrganizationChart.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-organizationChart',
                    template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'p-organizationchart p-component': true, 'p-organizationchart-preservespace': preserveSpace}\">\n            <table class=\"p-organizationchart-table\" pOrganizationChartNode [node]=\"root\" *ngIf=\"root\"></table>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    OrganizationChart.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    OrganizationChart.propDecorators = {
        value: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        selectionMode: [{ type: core.Input }],
        preserveSpace: [{ type: core.Input }],
        selection: [{ type: core.Input }],
        selectionChange: [{ type: core.Output }],
        onNodeSelect: [{ type: core.Output }],
        onNodeUnselect: [{ type: core.Output }],
        onNodeExpand: [{ type: core.Output }],
        onNodeCollapse: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var OrganizationChartModule = /** @class */ (function () {
        function OrganizationChartModule() {
        }
        return OrganizationChartModule;
    }());
    OrganizationChartModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [OrganizationChart, api.SharedModule],
                    declarations: [OrganizationChart, OrganizationChartNode]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.OrganizationChart = OrganizationChart;
    exports.OrganizationChartModule = OrganizationChartModule;
    exports.OrganizationChartNode = OrganizationChartNode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-organizationchart.umd.js.map
