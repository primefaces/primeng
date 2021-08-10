(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/utils'), require('primeng/dom'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/galleria', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/utils', 'primeng/dom', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.galleria = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.utils, global.primeng.dom, global.primeng.ripple));
}(this, (function (exports, core, common, api, utils, dom, ripple) { 'use strict';

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

    var Galleria = /** @class */ (function () {
        function Galleria(element, cd) {
            this.element = element;
            this.cd = cd;
            this.fullScreen = false;
            this.numVisible = 3;
            this.showItemNavigators = false;
            this.showThumbnailNavigators = true;
            this.showItemNavigatorsOnHover = false;
            this.changeItemOnIndicatorHover = false;
            this.circular = false;
            this.autoPlay = false;
            this.transitionInterval = 4000;
            this.showThumbnails = true;
            this.thumbnailsPosition = "bottom";
            this.verticalThumbnailViewPortHeight = "300px";
            this.showIndicators = false;
            this.showIndicatorsOnItem = false;
            this.indicatorsPosition = "bottom";
            this.baseZIndex = 0;
            this.activeIndexChange = new core.EventEmitter();
            this.visibleChange = new core.EventEmitter();
            this._visible = false;
            this._activeIndex = 0;
        }
        Object.defineProperty(Galleria.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._activeIndex = activeIndex;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(Galleria.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (visible) {
                this._visible = visible;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Galleria.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerFacet = item.template;
                        break;
                    case 'footer':
                        _this.footerFacet = item.template;
                        break;
                    case 'indicator':
                        _this.indicatorFacet = item.template;
                        break;
                    case 'caption':
                        _this.captionFacet = item.template;
                        break;
                }
            });
        };
        Galleria.prototype.ngOnChanges = function (simpleChanges) {
            if (this.fullScreen && simpleChanges.visible) {
                if (simpleChanges.visible.currentValue) {
                    dom.DomHandler.addClass(document.body, 'p-overflow-hidden');
                    this.zIndex = String(this.baseZIndex + ++dom.DomHandler.zindex);
                }
                else {
                    dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
            }
        };
        Galleria.prototype.onMaskHide = function () {
            this.visible = false;
            this.visibleChange.emit(false);
        };
        Galleria.prototype.onActiveItemChange = function (index) {
            if (this.activeIndex !== index) {
                this.activeIndex = index;
                this.activeIndexChange.emit(index);
            }
        };
        Galleria.prototype.ngOnDestroy = function () {
            if (this.fullScreen) {
                dom.DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
        };
        return Galleria;
    }());
    Galleria.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-galleria',
                    template: "\n        <div *ngIf=\"fullScreen;else windowed\">\n            <div *ngIf=\"visible\" #mask [ngClass]=\"{'p-galleria-mask p-component-overlay':true, 'p-galleria-visible': this.visible}\" [class]=\"maskClass\" [ngStyle]=\"{'zIndex':zIndex}\">\n                <p-galleriaContent [value]=\"value\" [activeIndex]=\"activeIndex\" (maskHide)=\"onMaskHide()\" (activeItemChange)=\"onActiveItemChange($event)\" [ngStyle]=\"containerStyle\"></p-galleriaContent>\n            </div>\n        </div>\n\n        <ng-template #windowed>\n            <p-galleriaContent [value]=\"value\" [activeIndex]=\"activeIndex\" (activeItemChange)=\"onActiveItemChange($event)\"></p-galleriaContent>\n        </ng-template>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-galleria-content,.p-galleria-item-wrapper{display:flex;flex-direction:column}.p-galleria-item-wrapper{position:relative}.p-galleria-item-container{display:flex;height:100%;position:relative}.p-galleria-item-nav{align-items:center;display:inline-flex;justify-content:center;margin-top:-.5rem;overflow:hidden;position:absolute;top:50%}.p-galleria-item-prev{border-bottom-left-radius:0;border-top-left-radius:0;left:0}.p-galleria-item-next{border-bottom-right-radius:0;border-top-right-radius:0;right:0}.p-galleria-item{align-items:center;display:flex;height:100%;justify-content:center;width:100%}.p-galleria-item-nav-onhover .p-galleria-item-nav{opacity:0;pointer-events:none;transition:opacity .2s ease-in-out}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav{opacity:1;pointer-events:all}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled{pointer-events:none}.p-galleria-caption{bottom:0;left:0;position:absolute;width:100%}.p-galleria-thumbnail-wrapper{display:flex;flex-direction:column;flex-shrink:0;overflow:auto}.p-galleria-thumbnail-next,.p-galleria-thumbnail-prev{-ms-grid-row-align:center;align-self:center;flex:0 0 auto;overflow:hidden;position:relative}.p-galleria-thumbnail-next,.p-galleria-thumbnail-next span,.p-galleria-thumbnail-prev,.p-galleria-thumbnail-prev span{align-items:center;display:flex;justify-content:center}.p-galleria-thumbnail-container{display:flex;flex-direction:row}.p-galleria-thumbnail-items-container{overflow:hidden}.p-galleria-thumbnail-items{display:flex}.p-galleria-thumbnail-item{align-items:center;cursor:pointer;display:flex;justify-content:center;opacity:.5;overflow:auto}.p-galleria-thumbnail-item:hover{opacity:1;transition:opacity .3s}.p-galleria-thumbnail-item-current{opacity:1}.p-galleria-thumbnails-left .p-galleria-content,.p-galleria-thumbnails-left .p-galleria-item-wrapper,.p-galleria-thumbnails-right .p-galleria-content,.p-galleria-thumbnails-right .p-galleria-item-wrapper{flex-direction:row}.p-galleria-thumbnails-left p-galleriaitem,.p-galleria-thumbnails-top p-galleriaitem{order:2}.p-galleria-thumbnails-left p-galleriathumbnails,.p-galleria-thumbnails-top p-galleriathumbnails{order:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-container,.p-galleria-thumbnails-right .p-galleria-thumbnail-container{flex-direction:column;flex-grow:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-items,.p-galleria-thumbnails-right .p-galleria-thumbnail-items{flex-direction:column;height:100%}.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,.p-galleria-thumbnails-right .p-galleria-thumbnail-wrapper{height:100%}.p-galleria-indicators{align-items:center;display:flex;justify-content:center}.p-galleria-indicator>button{align-items:center;display:inline-flex}.p-galleria-indicators-left .p-galleria-item-wrapper,.p-galleria-indicators-right .p-galleria-item-wrapper{align-items:center;flex-direction:row}.p-galleria-indicators-left .p-galleria-item-container,.p-galleria-indicators-top .p-galleria-item-container{order:2}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-top .p-galleria-indicators{order:1}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-right .p-galleria-indicators{flex-direction:column}.p-galleria-indicator-onitem .p-galleria-indicators{display:flex;position:absolute;z-index:1}.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators{align-items:flex-start;left:0;top:0;width:100%}.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators{align-items:flex-end;height:100%;right:0;top:0}.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators{align-items:flex-end;bottom:0;left:0;width:100%}.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators{align-items:flex-start;height:100%;left:0;top:0}.p-galleria-mask{background-color:transparent;height:100%;left:0;position:fixed;transition-property:background-color;width:100%}.p-galleria-close,.p-galleria-mask{align-items:center;display:flex;justify-content:center;top:0}.p-galleria-close{overflow:hidden;position:absolute;right:0}.p-galleria-mask .p-galleria-item-nav{margin-top:-.5rem;position:fixed;top:50%}.p-galleria-mask.p-galleria-mask-leave{background-color:transparent}.p-items-hidden .p-galleria-thumbnail-item{visibility:hidden}.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active{visibility:visible}"]
                },] }
    ];
    Galleria.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    Galleria.propDecorators = {
        activeIndex: [{ type: core.Input }],
        fullScreen: [{ type: core.Input }],
        id: [{ type: core.Input }],
        value: [{ type: core.Input }],
        numVisible: [{ type: core.Input }],
        responsiveOptions: [{ type: core.Input }],
        showItemNavigators: [{ type: core.Input }],
        showThumbnailNavigators: [{ type: core.Input }],
        showItemNavigatorsOnHover: [{ type: core.Input }],
        changeItemOnIndicatorHover: [{ type: core.Input }],
        circular: [{ type: core.Input }],
        autoPlay: [{ type: core.Input }],
        transitionInterval: [{ type: core.Input }],
        showThumbnails: [{ type: core.Input }],
        thumbnailsPosition: [{ type: core.Input }],
        verticalThumbnailViewPortHeight: [{ type: core.Input }],
        showIndicators: [{ type: core.Input }],
        showIndicatorsOnItem: [{ type: core.Input }],
        indicatorsPosition: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        maskClass: [{ type: core.Input }],
        containerClass: [{ type: core.Input }],
        containerStyle: [{ type: core.Input }],
        mask: [{ type: core.ViewChild, args: ['mask', { static: false },] }],
        visible: [{ type: core.Input }],
        activeIndexChange: [{ type: core.Output }],
        visibleChange: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var GalleriaContent = /** @class */ (function () {
        function GalleriaContent(galleria, cd) {
            this.galleria = galleria;
            this.cd = cd;
            this.value = [];
            this.maskHide = new core.EventEmitter();
            this.activeItemChange = new core.EventEmitter();
            this.id = this.galleria.id || utils.UniqueComponentId();
            this.slideShowActicve = false;
            this._activeIndex = 0;
            this.slideShowActive = true;
        }
        Object.defineProperty(GalleriaContent.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._activeIndex = activeIndex;
            },
            enumerable: false,
            configurable: true
        });
        ;
        GalleriaContent.prototype.galleriaClass = function () {
            var thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.galleria.thumbnailsPosition);
            var indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('p-galleria-indicators', this.galleria.indicatorsPosition);
            return (this.galleria.containerClass ? this.galleria.containerClass + " " : '') + (thumbnailsPosClass ? thumbnailsPosClass + " " : '') + (indicatorPosClass ? indicatorPosClass + " " : '');
        };
        GalleriaContent.prototype.startSlideShow = function () {
            var _this = this;
            this.interval = setInterval(function () {
                var activeIndex = (_this.galleria.circular && (_this.value.length - 1) === _this.activeIndex) ? 0 : (_this.activeIndex + 1);
                _this.onActiveIndexChange(activeIndex);
                _this.activeIndex = activeIndex;
            }, this.galleria.transitionInterval);
            this.slideShowActive = true;
        };
        GalleriaContent.prototype.stopSlideShow = function () {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.slideShowActive = false;
        };
        GalleriaContent.prototype.getPositionClass = function (preClassName, position) {
            var positions = ['top', 'left', 'bottom', 'right'];
            var pos = positions.find(function (item) { return item === position; });
            return pos ? preClassName + "-" + pos : '';
        };
        GalleriaContent.prototype.isVertical = function () {
            return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
        };
        GalleriaContent.prototype.onActiveIndexChange = function (index) {
            if (this.activeIndex !== index) {
                this.activeIndex = index;
                this.activeItemChange.emit(this.activeIndex);
            }
        };
        return GalleriaContent;
    }());
    GalleriaContent.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-galleriaContent',
                    template: "\n        <div [attr.id]=\"id\" *ngIf=\"value && value.length > 0\" [ngClass]=\"{'p-galleria p-component': true, 'p-galleria-fullscreen': this.galleria.fullScreen, \n            'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem, 'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen}\"\n            [ngStyle]=\"!galleria.fullScreen ? galleria.containerStyle : {}\" [class]=\"galleriaClass()\">\n            <button *ngIf=\"galleria.fullScreen\" type=\"button\" class=\"p-galleria-close p-link\" (click)=\"maskHide.emit()\" pRipple>\n                <span class=\"p-galleria-close-icon pi pi-times\"></span>\n            </button>\n            <div *ngIf=\"galleria.templates && galleria.headerFacet\" class=\"p-galleria-header\">\n                <p-galleriaItemSlot type=\"header\" [templates]=\"galleria.templates\"></p-galleriaItemSlot>\n            </div>\n            <div class=\"p-galleria-content\">\n                <p-galleriaItem [value]=\"value\" [activeIndex]=\"activeIndex\" [circular]=\"galleria.circular\" [templates]=\"galleria.templates\" (onActiveIndexChange)=\"onActiveIndexChange($event)\" \n                    [showIndicators]=\"galleria.showIndicators\" [changeItemOnIndicatorHover]=\"galleria.changeItemOnIndicatorHover\" [indicatorFacet]=\"galleria.indicatorFacet\"\n                    [captionFacet]=\"galleria.captionFacet\" [showItemNavigators]=\"galleria.showItemNavigators\" [autoPlay]=\"galleria.autoPlay\" [slideShowActive]=\"slideShowActive\"\n                    (startSlideShow)=\"startSlideShow()\" (stopSlideShow)=\"stopSlideShow()\"></p-galleriaItem>\n\n                <p-galleriaThumbnails *ngIf=\"galleria.showThumbnails\" [containerId]=\"id\" [value]=\"value\" (onActiveIndexChange)=\"onActiveIndexChange($event)\" [activeIndex]=\"activeIndex\" [templates]=\"galleria.templates\"\n                    [numVisible]=\"galleria.numVisible\" [responsiveOptions]=\"galleria.responsiveOptions\" [circular]=\"galleria.circular\"\n                    [isVertical]=\"isVertical()\" [contentHeight]=\"galleria.verticalThumbnailViewPortHeight\" [showThumbnailNavigators]=\"galleria.showThumbnailNavigators\"\n                    [slideShowActive]=\"slideShowActive\" (stopSlideShow)=\"stopSlideShow()\"></p-galleriaThumbnails>\n            </div>\n            <div *ngIf=\"galleria.templates && galleria.footerFacet\" class=\"p-galleria-footer\">\n                <p-galleriaItemSlot type=\"footer\" [templates]=\"galleria.templates\"></p-galleriaItemSlot>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GalleriaContent.ctorParameters = function () { return [
        { type: Galleria },
        { type: core.ChangeDetectorRef }
    ]; };
    GalleriaContent.propDecorators = {
        activeIndex: [{ type: core.Input }],
        value: [{ type: core.Input }],
        maskHide: [{ type: core.Output }],
        activeItemChange: [{ type: core.Output }]
    };
    var GalleriaItemSlot = /** @class */ (function () {
        function GalleriaItemSlot() {
        }
        Object.defineProperty(GalleriaItemSlot.prototype, "item", {
            get: function () {
                return this._item;
            },
            set: function (item) {
                var _this = this;
                this._item = item;
                if (this.templates) {
                    this.templates.forEach(function (item) {
                        if (item.getType() === _this.type) {
                            switch (_this.type) {
                                case 'item':
                                case 'caption':
                                case 'thumbnail':
                                    _this.context = { $implicit: _this.item };
                                    _this.contentTemplate = item.template;
                                    break;
                            }
                        }
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        GalleriaItemSlot.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                if (item.getType() === _this.type) {
                    switch (_this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            _this.context = { $implicit: _this.item };
                            _this.contentTemplate = item.template;
                            break;
                        case 'indicator':
                            _this.context = { $implicit: _this.index };
                            _this.contentTemplate = item.template;
                            break;
                        default:
                            _this.context = {};
                            _this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        };
        return GalleriaItemSlot;
    }());
    GalleriaItemSlot.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-galleriaItemSlot',
                    template: "\n        <ng-container *ngIf=\"contentTemplate\">\n            <ng-container *ngTemplateOutlet=\"contentTemplate; context: context\"></ng-container>\n        </ng-container>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GalleriaItemSlot.propDecorators = {
        templates: [{ type: core.Input }],
        index: [{ type: core.Input }],
        item: [{ type: core.Input }],
        type: [{ type: core.Input }]
    };
    var GalleriaItem = /** @class */ (function () {
        function GalleriaItem() {
            this.circular = false;
            this.showItemNavigators = false;
            this.showIndicators = true;
            this.slideShowActive = true;
            this.changeItemOnIndicatorHover = true;
            this.autoPlay = false;
            this.startSlideShow = new core.EventEmitter();
            this.stopSlideShow = new core.EventEmitter();
            this.onActiveIndexChange = new core.EventEmitter();
            this._activeIndex = 0;
        }
        Object.defineProperty(GalleriaItem.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._activeIndex = activeIndex;
                this.activeItem = this.value[this._activeIndex];
            },
            enumerable: false,
            configurable: true
        });
        ;
        GalleriaItem.prototype.ngOnInit = function () {
            if (this.autoPlay) {
                this.startSlideShow.emit();
            }
        };
        GalleriaItem.prototype.next = function () {
            var nextItemIndex = this.activeIndex + 1;
            var activeIndex = this.circular && this.value.length - 1 === this.activeIndex
                ? 0
                : nextItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
        };
        GalleriaItem.prototype.prev = function () {
            var prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
            var activeIndex = this.circular && this.activeIndex === 0
                ? this.value.length - 1
                : prevItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
        };
        GalleriaItem.prototype.stopTheSlideShow = function () {
            if (this.slideShowActive && this.stopSlideShow) {
                this.stopSlideShow.emit();
            }
        };
        GalleriaItem.prototype.navForward = function (e) {
            this.stopTheSlideShow();
            this.next();
            if (e && e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaItem.prototype.navBackward = function (e) {
            this.stopTheSlideShow();
            this.prev();
            if (e && e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaItem.prototype.onIndicatorClick = function (index) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        };
        GalleriaItem.prototype.onIndicatorMouseEnter = function (index) {
            if (this.changeItemOnIndicatorHover) {
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
            }
        };
        GalleriaItem.prototype.onIndicatorKeyDown = function (index) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        };
        GalleriaItem.prototype.isNavForwardDisabled = function () {
            return !this.circular && this.activeIndex === (this.value.length - 1);
        };
        GalleriaItem.prototype.isNavBackwardDisabled = function () {
            return !this.circular && this.activeIndex === 0;
        };
        GalleriaItem.prototype.isIndicatorItemActive = function (index) {
            return this.activeIndex === index;
        };
        return GalleriaItem;
    }());
    GalleriaItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-galleriaItem',
                    template: "\n        <div class=\"p-galleria-item-wrapper\">\n            <div class=\"p-galleria-item-container\">\n                <button *ngIf=\"showItemNavigators\" type=\"button\" [ngClass]=\"{'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled()}\" (click)=\"navBackward($event)\" [disabled]=\"isNavBackwardDisabled()\" pRipple>\n                    <span class=\"p-galleria-item-prev-icon pi pi-chevron-left\"></span>\n                </button>\n                <p-galleriaItemSlot type=\"item\" [item]=\"activeItem\" [templates]=\"templates\" class=\"p-galleria-item\"></p-galleriaItemSlot>\n                <button *ngIf=\"showItemNavigators\" type=\"button\" [ngClass]=\"{'p-galleria-item-next p-galleria-item-nav p-link': true,'p-disabled': this.isNavForwardDisabled()}\" (click)=\"navForward($event)\"  [disabled]=\"isNavForwardDisabled()\" pRipple>\n                    <span class=\"p-galleria-item-next-icon pi pi-chevron-right\"></span>\n                </button>\n                <div class=\"p-galleria-caption\" *ngIf=\"captionFacet\">\n                    <p-galleriaItemSlot type=\"caption\" [item]=\"activeItem\" [templates]=\"templates\"></p-galleriaItemSlot>\n                </div>\n            </div>\n            <ul *ngIf=\"showIndicators\" class=\"p-galleria-indicators p-reset\">\n                <li *ngFor=\"let item of value; let index = index;\" tabindex=\"0\"\n                    (click)=\"onIndicatorClick(index)\" (mouseenter)=\"onIndicatorMouseEnter(index)\" (keydown.enter)=\"onIndicatorKeyDown(index)\"\n                    [ngClass]=\"{'p-galleria-indicator': true,'p-highlight': isIndicatorItemActive(index)}\">\n                    <button type=\"button\" tabIndex=\"-1\" class=\"p-link\" *ngIf=\"!indicatorFacet\">\n                    </button>\n                    <p-galleriaItemSlot type=\"indicator\" [index]=\"index\" [templates]=\"templates\"></p-galleriaItemSlot>\n                </li>\n            </ul>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GalleriaItem.propDecorators = {
        circular: [{ type: core.Input }],
        value: [{ type: core.Input }],
        showItemNavigators: [{ type: core.Input }],
        showIndicators: [{ type: core.Input }],
        slideShowActive: [{ type: core.Input }],
        changeItemOnIndicatorHover: [{ type: core.Input }],
        autoPlay: [{ type: core.Input }],
        templates: [{ type: core.Input }],
        indicatorFacet: [{ type: core.Input }],
        captionFacet: [{ type: core.Input }],
        startSlideShow: [{ type: core.Output }],
        stopSlideShow: [{ type: core.Output }],
        onActiveIndexChange: [{ type: core.Output }],
        activeIndex: [{ type: core.Input }]
    };
    var GalleriaThumbnails = /** @class */ (function () {
        function GalleriaThumbnails(cd) {
            this.cd = cd;
            this.isVertical = false;
            this.slideShowActive = false;
            this.circular = false;
            this.contentHeight = "300px";
            this.showThumbnailNavigators = true;
            this.onActiveIndexChange = new core.EventEmitter();
            this.stopSlideShow = new core.EventEmitter();
            this.startPos = null;
            this.thumbnailsStyle = null;
            this.sortedResponsiveOptions = null;
            this.totalShiftedItems = 0;
            this.page = 0;
            this._numVisible = 0;
            this.d_numVisible = 0;
            this._oldNumVisible = 0;
            this._activeIndex = 0;
            this._oldactiveIndex = 0;
        }
        Object.defineProperty(GalleriaThumbnails.prototype, "numVisible", {
            get: function () {
                return this._numVisible;
            },
            set: function (numVisible) {
                this._numVisible = numVisible;
                this._oldNumVisible = this.d_numVisible;
                this.d_numVisible = numVisible;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(GalleriaThumbnails.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (activeIndex) {
                this._oldactiveIndex = this._activeIndex;
                this._activeIndex = activeIndex;
            },
            enumerable: false,
            configurable: true
        });
        ;
        GalleriaThumbnails.prototype.ngOnInit = function () {
            this.createStyle();
            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
        };
        GalleriaThumbnails.prototype.ngAfterContentChecked = function () {
            var totalShiftedItems = this.totalShiftedItems;
            if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
                if (this._activeIndex <= this.getMedianItemIndex()) {
                    totalShiftedItems = 0;
                }
                else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                    totalShiftedItems = this.d_numVisible - this.value.length;
                }
                else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                    totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex() + 1;
                }
                else {
                    totalShiftedItems = (this._activeIndex * -1) + this.getMedianItemIndex();
                }
                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
                if (this.itemsContainer && this.itemsContainer.nativeElement) {
                    this.itemsContainer.nativeElement.style.transform = this.isVertical ? "translate3d(0, " + totalShiftedItems * (100 / this.d_numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this.d_numVisible) + "%, 0, 0)";
                }
                if (this._oldactiveIndex !== this._activeIndex) {
                    dom.DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                    this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
                }
                this._oldactiveIndex = this._activeIndex;
                this._oldNumVisible = this.d_numVisible;
            }
        };
        GalleriaThumbnails.prototype.ngAfterViewInit = function () {
            this.calculatePosition();
        };
        GalleriaThumbnails.prototype.createStyle = function () {
            if (!this.thumbnailsStyle) {
                this.thumbnailsStyle = document.createElement('style');
                this.thumbnailsStyle.type = 'text/css';
                document.body.appendChild(this.thumbnailsStyle);
            }
            var innerHTML = "\n            #" + this.containerId + " .p-galleria-thumbnail-item {\n                flex: 1 0 " + (100 / this.d_numVisible) + "%\n            }\n        ";
            if (this.responsiveOptions) {
                this.sortedResponsiveOptions = __spread(this.responsiveOptions);
                this.sortedResponsiveOptions.sort(function (data1, data2) {
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
                for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    var res = this.sortedResponsiveOptions[i];
                    innerHTML += "\n                    @media screen and (max-width: " + res.breakpoint + ") {\n                        #" + this.containerId + " .p-galleria-thumbnail-item {\n                            flex: 1 0 " + (100 / res.numVisible) + "%\n                        }\n                    }\n                ";
                }
            }
            this.thumbnailsStyle.innerHTML = innerHTML;
        };
        GalleriaThumbnails.prototype.calculatePosition = function () {
            if (this.itemsContainer && this.sortedResponsiveOptions) {
                var windowWidth = window.innerWidth;
                var matchedResponsiveData = {
                    numVisible: this._numVisible
                };
                for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    var res = this.sortedResponsiveOptions[i];
                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
                if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                    this.d_numVisible = matchedResponsiveData.numVisible;
                    this.cd.markForCheck();
                }
            }
        };
        GalleriaThumbnails.prototype.getTabIndex = function (index) {
            return this.isItemActive(index) ? 0 : null;
        };
        GalleriaThumbnails.prototype.navForward = function (e) {
            this.stopTheSlideShow();
            var nextItemIndex = this._activeIndex + 1;
            if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1 || this.circular)) {
                this.step(-1);
            }
            var activeIndex = this.circular && (this.value.length - 1) === this._activeIndex ? 0 : nextItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaThumbnails.prototype.navBackward = function (e) {
            this.stopTheSlideShow();
            var prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
            var diff = prevItemIndex + this.totalShiftedItems;
            if ((this.d_numVisible - diff - 1) > this.getMedianItemIndex() && ((-1 * this.totalShiftedItems) !== 0 || this.circular)) {
                this.step(1);
            }
            var activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
            this.onActiveIndexChange.emit(activeIndex);
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaThumbnails.prototype.onItemClick = function (index) {
            this.stopTheSlideShow();
            var selectedItemIndex = index;
            if (selectedItemIndex !== this._activeIndex) {
                var diff = selectedItemIndex + this.totalShiftedItems;
                var dir = 0;
                if (selectedItemIndex < this._activeIndex) {
                    dir = (this.d_numVisible - diff - 1) - this.getMedianItemIndex();
                    if (dir > 0 && (-1 * this.totalShiftedItems) !== 0) {
                        this.step(dir);
                    }
                }
                else {
                    dir = this.getMedianItemIndex() - diff;
                    if (dir < 0 && (-1 * this.totalShiftedItems) < this.getTotalPageNumber() - 1) {
                        this.step(dir);
                    }
                }
                this.activeIndex = selectedItemIndex;
                this.onActiveIndexChange.emit(this.activeIndex);
            }
        };
        GalleriaThumbnails.prototype.step = function (dir) {
            var totalShiftedItems = this.totalShiftedItems + dir;
            if (dir < 0 && (-1 * totalShiftedItems) + this.d_numVisible > (this.value.length - 1)) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
            else if (dir > 0 && totalShiftedItems > 0) {
                totalShiftedItems = 0;
            }
            if (this.circular) {
                if (dir < 0 && this.value.length - 1 === this._activeIndex) {
                    totalShiftedItems = 0;
                }
                else if (dir > 0 && this._activeIndex === 0) {
                    totalShiftedItems = this.d_numVisible - this.value.length;
                }
            }
            if (this.itemsContainer) {
                dom.DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? "translate3d(0, " + totalShiftedItems * (100 / this.d_numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this.d_numVisible) + "%, 0, 0)";
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this.totalShiftedItems = totalShiftedItems;
        };
        GalleriaThumbnails.prototype.stopTheSlideShow = function () {
            if (this.slideShowActive && this.stopSlideShow) {
                this.stopSlideShow.emit();
            }
        };
        GalleriaThumbnails.prototype.changePageOnTouch = function (e, diff) {
            if (diff < 0) { // left
                this.navForward(e);
            }
            else { // right
                this.navBackward(e);
            }
        };
        GalleriaThumbnails.prototype.getTotalPageNumber = function () {
            return this.value.length > this.d_numVisible ? (this.value.length - this.d_numVisible) + 1 : 0;
        };
        GalleriaThumbnails.prototype.getMedianItemIndex = function () {
            var index = Math.floor(this.d_numVisible / 2);
            return (this.d_numVisible % 2) ? index : index - 1;
        };
        GalleriaThumbnails.prototype.onTransitionEnd = function () {
            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                dom.DomHandler.addClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transition = '';
            }
        };
        GalleriaThumbnails.prototype.onTouchEnd = function (e) {
            var touchobj = e.changedTouches[0];
            if (this.isVertical) {
                this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
            }
            else {
                this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
            }
        };
        GalleriaThumbnails.prototype.onTouchMove = function (e) {
            if (e.cancelable) {
                e.preventDefault();
            }
        };
        GalleriaThumbnails.prototype.onTouchStart = function (e) {
            var touchobj = e.changedTouches[0];
            this.startPos = {
                x: touchobj.pageX,
                y: touchobj.pageY
            };
        };
        GalleriaThumbnails.prototype.isNavBackwardDisabled = function () {
            return (!this.circular && this._activeIndex === 0) || (this.value.length <= this.d_numVisible);
        };
        GalleriaThumbnails.prototype.isNavForwardDisabled = function () {
            return (!this.circular && this._activeIndex === (this.value.length - 1)) || (this.value.length <= this.d_numVisible);
        };
        GalleriaThumbnails.prototype.firstItemAciveIndex = function () {
            return this.totalShiftedItems * -1;
        };
        GalleriaThumbnails.prototype.lastItemActiveIndex = function () {
            return this.firstItemAciveIndex() + this.d_numVisible - 1;
        };
        GalleriaThumbnails.prototype.isItemActive = function (index) {
            return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
        };
        GalleriaThumbnails.prototype.bindDocumentListeners = function () {
            var _this = this;
            if (!this.documentResizeListener) {
                this.documentResizeListener = function () {
                    _this.calculatePosition();
                };
                window.addEventListener('resize', this.documentResizeListener);
            }
        };
        GalleriaThumbnails.prototype.unbindDocumentListeners = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        GalleriaThumbnails.prototype.ngOnDestroy = function () {
            if (this.responsiveOptions) {
                this.unbindDocumentListeners();
            }
            if (this.thumbnailsStyle) {
                this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
            }
        };
        return GalleriaThumbnails;
    }());
    GalleriaThumbnails.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-galleriaThumbnails',
                    template: "\n        <div class=\"p-galleria-thumbnail-wrapper\">\n            <div class=\"p-galleria-thumbnail-container\">\n                <button *ngIf=\"showThumbnailNavigators\" type=\"button\" [ngClass]=\"{'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled()}\" (click)=\"navBackward($event)\" [disabled]=\"isNavBackwardDisabled()\" pRipple>\n                    <span [ngClass]=\"{'p-galleria-thumbnail-prev-icon pi': true, 'pi-chevron-left': !this.isVertical, 'pi-chevron-up': this.isVertical}\"></span>\n                </button>\n                <div class=\"p-galleria-thumbnail-items-container\" [ngStyle]=\"{'height': isVertical ? contentHeight : ''}\">\n                    <div #itemsContainer class=\"p-galleria-thumbnail-items\" (transitionend)=\"onTransitionEnd()\"\n                        (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd($event)\">\n                        <div *ngFor=\"let item of value; let index = index;\" [ngClass]=\"{'p-galleria-thumbnail-item': true, 'p-galleria-thumbnail-item-current': activeIndex === index, 'p-galleria-thumbnail-item-active': isItemActive(index),\n                            'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index, 'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index }\">\n                            <div class=\"p-galleria-thumbnail-item-content\" [attr.tabindex]=\"getTabIndex(index)\" (click)=\"onItemClick(index)\" (keydown.enter)=\"onItemClick(index)\">\n                                <p-galleriaItemSlot type=\"thumbnail\" [item]=\"item\" [templates]=\"templates\"></p-galleriaItemSlot>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <button *ngIf=\"showThumbnailNavigators\" type=\"button\" [ngClass]=\"{'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled()}\" (click)=\"navForward($event)\" [disabled]=\"isNavForwardDisabled()\" pRipple>\n                    <span [ngClass]=\"{'p-galleria-thumbnail-next-icon pi': true, 'pi-chevron-right': !this.isVertical, 'pi-chevron-down': this.isVertical}\"></span>\n                </button>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    GalleriaThumbnails.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    GalleriaThumbnails.propDecorators = {
        containerId: [{ type: core.Input }],
        value: [{ type: core.Input }],
        isVertical: [{ type: core.Input }],
        slideShowActive: [{ type: core.Input }],
        circular: [{ type: core.Input }],
        responsiveOptions: [{ type: core.Input }],
        contentHeight: [{ type: core.Input }],
        showThumbnailNavigators: [{ type: core.Input }],
        templates: [{ type: core.Input }],
        onActiveIndexChange: [{ type: core.Output }],
        stopSlideShow: [{ type: core.Output }],
        itemsContainer: [{ type: core.ViewChild, args: ['itemsContainer',] }],
        numVisible: [{ type: core.Input }],
        activeIndex: [{ type: core.Input }]
    };
    var GalleriaModule = /** @class */ (function () {
        function GalleriaModule() {
        }
        return GalleriaModule;
    }());
    GalleriaModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, ripple.RippleModule],
                    exports: [common.CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, api.SharedModule],
                    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Galleria = Galleria;
    exports.GalleriaContent = GalleriaContent;
    exports.GalleriaItem = GalleriaItem;
    exports.GalleriaItemSlot = GalleriaItemSlot;
    exports.GalleriaModule = GalleriaModule;
    exports.GalleriaThumbnails = GalleriaThumbnails;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-galleria.umd.js.map
