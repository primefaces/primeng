(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/splitter', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.splitter = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api));
}(this, (function (exports, core, common, dom, api) { 'use strict';

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

    var Splitter = /** @class */ (function () {
        function Splitter(cd, el) {
            this.cd = cd;
            this.el = el;
            this.stateStorage = "session";
            this.stateKey = null;
            this.layout = "horizontal";
            this.gutterSize = 4;
            this.panelSizes = [];
            this.minSizes = [];
            this.onResizeEnd = new core.EventEmitter();
            this.nested = false;
            this.panels = [];
            this.dragging = false;
            this.mouseMoveListener = null;
            this.mouseUpListener = null;
            this.touchMoveListener = null;
            this.touchEndListener = null;
            this.size = null;
            this.gutterElement = null;
            this.startPos = null;
            this.prevPanelElement = null;
            this.nextPanelElement = null;
            this.nextPanelSize = null;
            this.prevPanelSize = null;
            this._panelSizes = null;
            this.prevPanelIndex = null;
        }
        Splitter.prototype.ngOnInit = function () {
            this.nested = this.isNested();
        };
        Splitter.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'panel':
                        _this.panels.push(item.template);
                        break;
                    default:
                        _this.panels.push(item.template);
                        break;
                }
            });
        };
        Splitter.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.panels && this.panels.length) {
                var initialized = false;
                if (this.isStateful()) {
                    initialized = this.restoreState();
                }
                if (!initialized) {
                    var children_1 = __spread(this.el.nativeElement.children[0].children).filter(function (child) { return dom.DomHandler.hasClass(child, 'p-splitter-panel'); });
                    var _panelSizes_1 = [];
                    this.panels.map(function (panel, i) {
                        var panelInitialSize = _this.panelSizes.length - 1 >= i ? _this.panelSizes[i] : null;
                        var panelSize = panelInitialSize || (100 / _this.panels.length);
                        _panelSizes_1[i] = panelSize;
                        children_1[i].style.flexBasis = 'calc(' + panelSize + '% - ' + ((_this.panels.length - 1) * _this.gutterSize) + 'px)';
                    });
                    this._panelSizes = _panelSizes_1;
                }
            }
        };
        Splitter.prototype.onResizeStart = function (event, index) {
            this.gutterElement = event.currentTarget;
            this.size = this.horizontal() ? dom.DomHandler.getWidth(this.containerViewChild.nativeElement) : dom.DomHandler.getHeight(this.containerViewChild.nativeElement);
            this.dragging = true;
            this.startPos = this.horizontal() ? (event.pageX || event.changedTouches[0].pageX) : (event.pageY || event.changedTouches[0].pageY);
            this.prevPanelElement = this.gutterElement.previousElementSibling;
            this.nextPanelElement = this.gutterElement.nextElementSibling;
            this.prevPanelSize = 100 * (this.horizontal() ? dom.DomHandler.getOuterWidth(this.prevPanelElement, true) : dom.DomHandler.getOuterHeight(this.prevPanelElement, true)) / this.size;
            this.nextPanelSize = 100 * (this.horizontal() ? dom.DomHandler.getOuterWidth(this.nextPanelElement, true) : dom.DomHandler.getOuterHeight(this.nextPanelElement, true)) / this.size;
            this.prevPanelIndex = index;
            dom.DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
            dom.DomHandler.addClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        };
        Splitter.prototype.onResize = function (event) {
            var newPos;
            if (this.horizontal())
                newPos = ((event.pageX || event.changedTouches[0].pageX) * 100 / this.size) - (this.startPos * 100 / this.size);
            else
                newPos = ((event.pageY || event.changedTouches[0].pageY) * 100 / this.size) - (this.startPos * 100 / this.size);
            var newPrevPanelSize = this.prevPanelSize + newPos;
            var newNextPanelSize = this.nextPanelSize - newPos;
            if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
                this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
                this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
                this._panelSizes[this.prevPanelIndex] = newPrevPanelSize;
                this._panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
            }
        };
        Splitter.prototype.resizeEnd = function (event) {
            if (this.isStateful()) {
                this.saveState();
            }
            this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
            dom.DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
            dom.DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
            this.clear();
        };
        Splitter.prototype.onGutterMouseDown = function (event, index) {
            this.onResizeStart(event, index);
            this.bindMouseListeners();
        };
        Splitter.prototype.onGutterTouchStart = function (event, index) {
            if (event.cancelable) {
                this.onResizeStart(event, index);
                this.bindTouchListeners();
                event.preventDefault();
            }
        };
        Splitter.prototype.onGutterTouchEnd = function (event) {
            this.resizeEnd(event);
            this.unbindTouchListeners();
            if (event.cancelable)
                event.preventDefault();
        };
        Splitter.prototype.validateResize = function (newPrevPanelSize, newNextPanelSize) {
            if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
                return false;
            }
            if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
                return false;
            }
            return true;
        };
        Splitter.prototype.bindMouseListeners = function () {
            var _this = this;
            if (!this.mouseMoveListener) {
                this.mouseMoveListener = function (event) { return _this.onResize(event); };
                document.addEventListener('mousemove', this.mouseMoveListener);
            }
            if (!this.mouseUpListener) {
                this.mouseUpListener = function (event) {
                    _this.resizeEnd(event);
                    _this.unbindMouseListeners();
                };
                document.addEventListener('mouseup', this.mouseUpListener);
            }
        };
        Splitter.prototype.bindTouchListeners = function () {
            var _this = this;
            if (!this.touchMoveListener) {
                this.touchMoveListener = function (event) { return _this.onResize(event); };
                document.addEventListener('touchmove', this.touchMoveListener);
            }
            if (!this.touchEndListener) {
                this.touchEndListener = function (event) {
                    _this.resizeEnd(event);
                    _this.unbindTouchListeners();
                };
                document.addEventListener('touchend', this.touchEndListener);
            }
        };
        Splitter.prototype.unbindMouseListeners = function () {
            if (this.mouseMoveListener) {
                document.removeEventListener('mousemove', this.mouseMoveListener);
                this.mouseMoveListener = null;
            }
            if (this.mouseUpListener) {
                document.removeEventListener('mouseup', this.mouseUpListener);
                this.mouseUpListener = null;
            }
        };
        Splitter.prototype.unbindTouchListeners = function () {
            if (this.touchMoveListener) {
                document.removeEventListener('touchmove', this.touchMoveListener);
                this.touchMoveListener = null;
            }
            if (this.touchEndListener) {
                document.removeEventListener('touchend', this.touchEndListener);
                this.touchEndListener = null;
            }
        };
        Splitter.prototype.clear = function () {
            this.dragging = false;
            this.size = null;
            this.startPos = null;
            this.prevPanelElement = null;
            this.nextPanelElement = null;
            this.prevPanelSize = null;
            this.nextPanelSize = null;
            this.gutterElement = null;
            this.prevPanelIndex = null;
        };
        Splitter.prototype.isNested = function () {
            if (this.el.nativeElement) {
                var parent = this.el.nativeElement.parentElement;
                while (parent && !dom.DomHandler.hasClass(parent, 'p-splitter')) {
                    parent = parent.parentElement;
                }
                return parent !== null;
            }
            else {
                return false;
            }
        };
        Splitter.prototype.isStateful = function () {
            return this.stateKey != null;
        };
        Splitter.prototype.getStorage = function () {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;
                case 'session':
                    return window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        };
        Splitter.prototype.saveState = function () {
            this.getStorage().setItem(this.stateKey, JSON.stringify(this._panelSizes));
        };
        Splitter.prototype.restoreState = function () {
            var _this = this;
            var storage = this.getStorage();
            var stateString = storage.getItem(this.stateKey);
            if (stateString) {
                this._panelSizes = JSON.parse(stateString);
                var children = __spread(this.containerViewChild.nativeElement.children).filter(function (child) { return dom.DomHandler.hasClass(child, 'p-splitter-panel'); });
                children.forEach(function (child, i) {
                    child.style.flexBasis = 'calc(' + _this._panelSizes[i] + '% - ' + ((_this.panels.length - 1) * _this.gutterSize) + 'px)';
                });
                return true;
            }
            return false;
        };
        Splitter.prototype.containerClass = function () {
            return {
                'p-splitter p-component': true,
                'p-splitter-horizontal': this.layout === "horizontal",
                'p-splitter-vertical': this.layout === "vertical"
            };
        };
        Splitter.prototype.panelContainerClass = function () {
            return {
                'p-splitter-panel': true,
                'p-splitter-panel-nested': true
            };
        };
        Splitter.prototype.gutterStyle = function () {
            if (this.horizontal())
                return { width: this.gutterSize + 'px' };
            else
                return { height: this.gutterSize + 'px' };
        };
        Splitter.prototype.horizontal = function () {
            return this.layout === 'horizontal';
        };
        return Splitter;
    }());
    Splitter.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-splitter',
                    template: "\n        <div #container [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-template ngFor let-panel let-i=\"index\" [ngForOf]=\"panels\">\n                <div [ngClass]=\"panelContainerClass()\" [class]=\"panelStyleClass\" [ngStyle]=\"panelStyle\">\n                    <ng-container *ngTemplateOutlet=\"panel\"></ng-container>\n                </div>\n                <div class=\"p-splitter-gutter\" *ngIf=\"i !== (panels.length - 1)\" [ngStyle]=\"gutterStyle()\" \n                    (mousedown)=\"onGutterMouseDown($event, i)\" (touchstart)=\"onGutterTouchStart($event, i)\">\n                    <div class=\"p-splitter-gutter-handle\"></div>\n                </div>\n            </ng-template>\n        </div>\n    ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.p-splitter-panel-nested]': 'nested'
                    },
                    styles: [".p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{border:0;flex-grow:1}.p-splitter-gutter{align-items:center;cursor:col-resize;display:flex;flex-grow:0;flex-shrink:0;justify-content:center}.p-splitter-horizontal.p-splitter-resizing{-ms-user-select:none;-webkit-user-select:none;cursor:col-resize;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{-ms-user-select:none;-webkit-user-select:none;cursor:row-resize;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{height:100%;width:24px}"]
                },] }
    ];
    Splitter.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: core.ElementRef }
    ]; };
    Splitter.propDecorators = {
        styleClass: [{ type: core.Input }],
        panelStyleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        panelStyle: [{ type: core.Input }],
        stateStorage: [{ type: core.Input }],
        stateKey: [{ type: core.Input }],
        layout: [{ type: core.Input }],
        gutterSize: [{ type: core.Input }],
        panelSizes: [{ type: core.Input }],
        minSizes: [{ type: core.Input }],
        onResizeEnd: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        containerViewChild: [{ type: core.ViewChild, args: ['container', { static: false },] }]
    };
    var SplitterModule = /** @class */ (function () {
        function SplitterModule() {
        }
        return SplitterModule;
    }());
    SplitterModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Splitter, api.SharedModule],
                    declarations: [Splitter]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Splitter = Splitter;
    exports.SplitterModule = SplitterModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-splitter.umd.js.map
