(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('primeng/api'), require('primeng/ripple'), require('@angular/common'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/carousel', ['exports', '@angular/core', 'primeng/api', 'primeng/ripple', '@angular/common', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.carousel = {}), global.ng.core, global.primeng.api, global.primeng.ripple, global.ng.common, global.primeng.utils));
}(this, (function (exports, core, api, ripple, common, utils) { 'use strict';

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

    var Carousel = /** @class */ (function () {
        function Carousel(el, zone, cd) {
            this.el = el;
            this.zone = zone;
            this.cd = cd;
            this.orientation = "horizontal";
            this.verticalViewPortHeight = "300px";
            this.contentClass = "";
            this.indicatorsContentClass = "";
            this.indicatorStyleClass = "";
            this.circular = false;
            this.showIndicators = true;
            this.showNavigators = true;
            this.autoplayInterval = 0;
            this.onPage = new core.EventEmitter();
            this._numVisible = 1;
            this._numScroll = 1;
            this._oldNumScroll = 0;
            this.prevState = {
                numScroll: 0,
                numVisible: 0,
                value: []
            };
            this.defaultNumScroll = 1;
            this.defaultNumVisible = 1;
            this._page = 0;
            this.isRemainingItemsAdded = false;
            this.remainingItems = 0;
            this.swipeThreshold = 20;
            this.totalShiftedItems = this.page * this.numScroll * -1;
        }
        Object.defineProperty(Carousel.prototype, "page", {
            get: function () {
                return this._page;
            },
            set: function (val) {
                if (this.isCreated && val !== this._page) {
                    if (this.autoplayInterval) {
                        this.stopAutoplay();
                        this.allowAutoplay = false;
                    }
                    if (val > this._page && val <= (this.totalDots() - 1)) {
                        this.step(-1, val);
                    }
                    else if (val < this._page) {
                        this.step(1, val);
                    }
                }
                this._page = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Carousel.prototype, "numVisible", {
            get: function () {
                return this._numVisible;
            },
            set: function (val) {
                this._numVisible = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Carousel.prototype, "numScroll", {
            get: function () {
                return this._numVisible;
            },
            set: function (val) {
                this._numScroll = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Carousel.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Carousel.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.value) {
                if (this.circular && this._value) {
                    this.setCloneItems();
                }
            }
            if (this.isCreated) {
                if (simpleChange.numVisible) {
                    if (this.responsiveOptions) {
                        this.defaultNumVisible = this.numVisible;
                    }
                    if (this.isCircular()) {
                        this.setCloneItems();
                    }
                    this.createStyle();
                    this.calculatePosition();
                }
                if (simpleChange.numScroll) {
                    if (this.responsiveOptions) {
                        this.defaultNumScroll = this.numScroll;
                    }
                }
            }
        };
        Carousel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.id = utils.UniqueComponentId();
            this.allowAutoplay = !!this.autoplayInterval;
            if (this.circular) {
                this.setCloneItems();
            }
            if (this.responsiveOptions) {
                this.defaultNumScroll = this._numScroll;
                this.defaultNumVisible = this._numVisible;
            }
            this.createStyle();
            this.calculatePosition();
            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        Carousel.prototype.ngAfterContentChecked = function () {
            var isCircular = this.isCircular();
            var totalShiftedItems = this.totalShiftedItems;
            if (this.value && this.itemsContainer && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
                if (this.autoplayInterval) {
                    this.stopAutoplay();
                }
                this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
                var page = this._page;
                if (this.totalDots() !== 0 && page >= this.totalDots()) {
                    page = this.totalDots() - 1;
                    this._page = page;
                    this.onPage.emit({
                        page: this.page
                    });
                }
                totalShiftedItems = (page * this._numScroll) * -1;
                if (isCircular) {
                    totalShiftedItems -= this._numVisible;
                }
                if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
                    totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
                    this.isRemainingItemsAdded = true;
                }
                else {
                    this.isRemainingItemsAdded = false;
                }
                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
                this._oldNumScroll = this._numScroll;
                this.prevState.numScroll = this._numScroll;
                this.prevState.numVisible = this._numVisible;
                this.prevState.value = __spread(this._value);
                if (this.totalDots() > 0 && this.itemsContainer.nativeElement) {
                    this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
                }
                this.isCreated = true;
                if (this.autoplayInterval && this.isAutoplay()) {
                    this.startAutoplay();
                }
            }
            if (isCircular) {
                if (this.page === 0) {
                    totalShiftedItems = -1 * this._numVisible;
                }
                else if (totalShiftedItems === 0) {
                    totalShiftedItems = -1 * this.value.length;
                    if (this.remainingItems > 0) {
                        this.isRemainingItemsAdded = true;
                    }
                }
                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
            }
        };
        Carousel.prototype.createStyle = function () {
            if (!this.carouselStyle) {
                this.carouselStyle = document.createElement('style');
                this.carouselStyle.type = 'text/css';
                document.body.appendChild(this.carouselStyle);
            }
            var innerHTML = "\n            #" + this.id + " .p-carousel-item {\n\t\t\t\tflex: 1 0 " + (100 / this.numVisible) + "%\n\t\t\t}\n        ";
            if (this.responsiveOptions) {
                this.responsiveOptions.sort(function (data1, data2) {
                    var value1 = data1.breakpoint;
                    var value2 = data2.breakpoint;
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2, undefined, { numeric: true });
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return -1 * result;
                });
                for (var i = 0; i < this.responsiveOptions.length; i++) {
                    var res = this.responsiveOptions[i];
                    innerHTML += "\n                    @media screen and (max-width: " + res.breakpoint + ") {\n                        #" + this.id + " .p-carousel-item {\n                            flex: 1 0 " + (100 / res.numVisible) + "%\n                        }\n                    }\n                ";
                }
            }
            this.carouselStyle.innerHTML = innerHTML;
        };
        Carousel.prototype.calculatePosition = function () {
            if (this.responsiveOptions) {
                var windowWidth = window.innerWidth;
                var matchedResponsiveData = {
                    numVisible: this.defaultNumVisible,
                    numScroll: this.defaultNumScroll
                };
                for (var i = 0; i < this.responsiveOptions.length; i++) {
                    var res = this.responsiveOptions[i];
                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
                if (this._numScroll !== matchedResponsiveData.numScroll) {
                    var page = this._page;
                    page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                    var totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
                    if (this.isCircular()) {
                        totalShiftedItems -= matchedResponsiveData.numVisible;
                    }
                    this.totalShiftedItems = totalShiftedItems;
                    this._numScroll = matchedResponsiveData.numScroll;
                    this._page = page;
                    this.onPage.emit({
                        page: this.page
                    });
                }
                if (this._numVisible !== matchedResponsiveData.numVisible) {
                    this._numVisible = matchedResponsiveData.numVisible;
                    this.setCloneItems();
                }
                this.cd.markForCheck();
            }
        };
        Carousel.prototype.setCloneItems = function () {
            var _a, _b;
            this.clonedItemsForStarting = [];
            this.clonedItemsForFinishing = [];
            if (this.isCircular()) {
                (_a = this.clonedItemsForStarting).push.apply(_a, __spread(this.value.slice(-1 * this._numVisible)));
                (_b = this.clonedItemsForFinishing).push.apply(_b, __spread(this.value.slice(0, this._numVisible)));
            }
        };
        Carousel.prototype.firstIndex = function () {
            return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
        };
        Carousel.prototype.lastIndex = function () {
            return this.firstIndex() + this.numVisible - 1;
        };
        Carousel.prototype.totalDots = function () {
            return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
        };
        Carousel.prototype.totalDotsArray = function () {
            var totalDots = this.totalDots();
            return totalDots <= 0 ? [] : Array(totalDots).fill(0);
        };
        Carousel.prototype.isVertical = function () {
            return this.orientation === 'vertical';
        };
        Carousel.prototype.isCircular = function () {
            return this.circular && this.value && this.value.length >= this.numVisible;
        };
        Carousel.prototype.isAutoplay = function () {
            return this.autoplayInterval && this.allowAutoplay;
        };
        Carousel.prototype.isForwardNavDisabled = function () {
            return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
        };
        Carousel.prototype.isBackwardNavDisabled = function () {
            return this.isEmpty() || (this._page <= 0 && !this.isCircular());
        };
        Carousel.prototype.isEmpty = function () {
            return !this.value || this.value.length === 0;
        };
        Carousel.prototype.navForward = function (e, index) {
            if (this.isCircular() || this._page < (this.totalDots() - 1)) {
                this.step(-1, index);
            }
            if (this.autoplayInterval) {
                this.stopAutoplay();
                this.allowAutoplay = false;
            }
            if (e && e.cancelable) {
                e.preventDefault();
            }
        };
        Carousel.prototype.navBackward = function (e, index) {
            if (this.isCircular() || this._page !== 0) {
                this.step(1, index);
            }
            if (this.autoplayInterval) {
                this.stopAutoplay();
                this.allowAutoplay = false;
            }
            if (e && e.cancelable) {
                e.preventDefault();
            }
        };
        Carousel.prototype.onDotClick = function (e, index) {
            var page = this._page;
            if (this.autoplayInterval) {
                this.stopAutoplay();
                this.allowAutoplay = false;
            }
            if (index > page) {
                this.navForward(e, index);
            }
            else if (index < page) {
                this.navBackward(e, index);
            }
        };
        Carousel.prototype.step = function (dir, page) {
            var totalShiftedItems = this.totalShiftedItems;
            var isCircular = this.isCircular();
            if (page != null) {
                totalShiftedItems = (this._numScroll * page) * -1;
                if (isCircular) {
                    totalShiftedItems -= this._numVisible;
                }
                this.isRemainingItemsAdded = false;
            }
            else {
                totalShiftedItems += (this._numScroll * dir);
                if (this.isRemainingItemsAdded) {
                    totalShiftedItems += this.remainingItems - (this._numScroll * dir);
                    this.isRemainingItemsAdded = false;
                }
                var originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
                page = Math.abs(Math.floor((originalShiftedItems / this._numScroll)));
            }
            if (isCircular && this.page === (this.totalDots() - 1) && dir === -1) {
                totalShiftedItems = -1 * (this.value.length + this._numVisible);
                page = 0;
            }
            else if (isCircular && this.page === 0 && dir === 1) {
                totalShiftedItems = 0;
                page = (this.totalDots() - 1);
            }
            else if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
                totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
                this.isRemainingItemsAdded = true;
            }
            if (this.itemsContainer) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this.totalShiftedItems = totalShiftedItems;
            this._page = page;
            this.onPage.emit({
                page: this.page
            });
        };
        Carousel.prototype.startAutoplay = function () {
            var _this = this;
            this.interval = setInterval(function () {
                if (_this.totalDots() > 0) {
                    if (_this.page === (_this.totalDots() - 1)) {
                        _this.step(-1, 0);
                    }
                    else {
                        _this.step(-1, _this.page + 1);
                    }
                }
            }, this.autoplayInterval);
        };
        Carousel.prototype.stopAutoplay = function () {
            if (this.interval) {
                clearInterval(this.interval);
            }
        };
        Carousel.prototype.onTransitionEnd = function () {
            if (this.itemsContainer) {
                this.itemsContainer.nativeElement.style.transition = '';
                if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                    this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + this.totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + this.totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
                }
            }
        };
        Carousel.prototype.onTouchStart = function (e) {
            var touchobj = e.changedTouches[0];
            this.startPos = {
                x: touchobj.pageX,
                y: touchobj.pageY
            };
        };
        Carousel.prototype.onTouchMove = function (e) {
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        Carousel.prototype.onTouchEnd = function (e) {
            var touchobj = e.changedTouches[0];
            if (this.isVertical()) {
                this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
            }
            else {
                this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
            }
        };
        Carousel.prototype.changePageOnTouch = function (e, diff) {
            if (Math.abs(diff) > this.swipeThreshold) {
                if (diff < 0) {
                    this.navForward(e);
                }
                else {
                    this.navBackward(e);
                }
            }
        };
        Carousel.prototype.bindDocumentListeners = function () {
            var _this = this;
            if (!this.documentResizeListener) {
                this.documentResizeListener = function (e) {
                    _this.calculatePosition();
                };
                window.addEventListener('resize', this.documentResizeListener);
            }
        };
        Carousel.prototype.unbindDocumentListeners = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        Carousel.prototype.ngOnDestroy = function () {
            if (this.responsiveOptions) {
                this.unbindDocumentListeners();
            }
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
        };
        return Carousel;
    }());
    Carousel.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-carousel',
                    template: "\n\t\t<div [attr.id]=\"id\" [ngClass]=\"{'p-carousel p-component':true, 'p-carousel-vertical': isVertical(), 'p-carousel-horizontal': !isVertical()}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n\t\t\t<div class=\"p-carousel-header\" *ngIf=\"headerFacet || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n\t\t\t</div>\n\t\t\t<div [class]=\"contentClass\" [ngClass]=\"'p-carousel-content'\">\n\t\t\t\t<div class=\"p-carousel-container\">\n\t\t\t\t\t<button type=\"button\" *ngIf=\"showNavigators\" [ngClass]=\"{'p-carousel-prev p-link':true, 'p-disabled': isBackwardNavDisabled()}\" [disabled]=\"isBackwardNavDisabled()\" (click)=\"navBackward($event)\" pRipple>\n\t\t\t\t\t\t<span [ngClass]=\"{'p-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"p-carousel-items-content\" [ngStyle]=\"{'height': isVertical() ? verticalViewPortHeight : 'auto'}\">\n\t\t\t\t\t\t<div #itemsContainer class=\"p-carousel-items-container\" (transitionend)=\"onTransitionEnd()\" (touchend)=\"onTouchEnd($event)\" (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\">\n                            <div *ngFor=\"let item of clonedItemsForStarting; let index = index\" [ngClass]= \"{'p-carousel-item p-carousel-item-cloned': true,\n                                'p-carousel-item-active': (totalShiftedItems * -1) === (value.length),\n\t\t\t\t\t\t\t    'p-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t    'p-carousel-item-end': (clonedItemsForStarting.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n                            <div *ngFor=\"let item of value; let index = index\" [ngClass]= \"{'p-carousel-item': true,\n                                'p-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),\n\t\t\t\t\t\t\t    'p-carousel-item-start': firstIndex() === index,\n\t\t\t\t\t\t\t    'p-carousel-item-end': lastIndex() === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n                            <div *ngFor=\"let item of clonedItemsForFinishing; let index = index\" [ngClass]= \"{'p-carousel-item p-carousel-item-cloned': true,\n                                'p-carousel-item-active': ((totalShiftedItems *-1) === numVisible),\n\t\t\t\t\t\t\t    'p-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t    'p-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"button\" *ngIf=\"showNavigators\" [ngClass]=\"{'p-carousel-next p-link': true, 'p-disabled': isForwardNavDisabled()}\" [disabled]=\"isForwardNavDisabled()\" (click)=\"navForward($event)\" pRipple>\n\t\t\t\t\t\t<span [ngClass]=\"{'p-carousel-prev-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<ul [ngClass]=\"'p-carousel-indicators p-reset'\" [class]=\"indicatorsContentClass\" [ngStyle]=\"indicatorsContentStyle\" *ngIf=\"showIndicators\">\n\t\t\t\t\t<li *ngFor=\"let totalDot of totalDotsArray(); let i = index\" [ngClass]=\"{'p-carousel-indicator':true,'p-highlight': _page === i}\">\n\t\t\t\t\t\t<button type=\"button\" [ngClass]=\"'p-link'\" (click)=\"onDotClick($event, i)\" [class]=\"indicatorStyleClass\" [ngStyle]=\"indicatorStyle\"></button>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"p-carousel-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n\t\t\t</div>\n\t\t</div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-carousel,.p-carousel-content{display:flex;flex-direction:column}.p-carousel-content{overflow:auto}.p-carousel-next,.p-carousel-prev{-ms-grid-row-align:center;align-items:center;align-self:center;display:flex;flex-grow:0;flex-shrink:0;justify-content:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-indicators,.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{flex-wrap:wrap;justify-content:center}.p-carousel-indicator>button{align-items:center;display:flex;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}"]
                },] }
    ];
    Carousel.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: core.ChangeDetectorRef }
    ]; };
    Carousel.propDecorators = {
        page: [{ type: core.Input }],
        numVisible: [{ type: core.Input }],
        numScroll: [{ type: core.Input }],
        responsiveOptions: [{ type: core.Input }],
        orientation: [{ type: core.Input }],
        verticalViewPortHeight: [{ type: core.Input }],
        contentClass: [{ type: core.Input }],
        indicatorsContentClass: [{ type: core.Input }],
        indicatorsContentStyle: [{ type: core.Input }],
        indicatorStyleClass: [{ type: core.Input }],
        indicatorStyle: [{ type: core.Input }],
        value: [{ type: core.Input }],
        circular: [{ type: core.Input }],
        showIndicators: [{ type: core.Input }],
        showNavigators: [{ type: core.Input }],
        autoplayInterval: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        onPage: [{ type: core.Output }],
        itemsContainer: [{ type: core.ViewChild, args: ['itemsContainer',] }],
        headerFacet: [{ type: core.ContentChild, args: [api.Header,] }],
        footerFacet: [{ type: core.ContentChild, args: [api.Footer,] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var CarouselModule = /** @class */ (function () {
        function CarouselModule() {
        }
        return CarouselModule;
    }());
    CarouselModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, ripple.RippleModule],
                    exports: [common.CommonModule, Carousel, api.SharedModule],
                    declarations: [Carousel]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Carousel = Carousel;
    exports.CarouselModule = CarouselModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-carousel.umd.js.map
