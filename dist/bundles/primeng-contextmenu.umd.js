(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/ripple'), require('@angular/router'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('primeng/contextmenu', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/ripple', '@angular/router', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.contextmenu = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.ripple, global.ng.router, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, common, dom, api, ripple, router, rxjs, operators) { 'use strict';

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

    var ContextMenuSub = /** @class */ (function () {
        function ContextMenuSub(contextMenu) {
            this.leafClick = new core.EventEmitter();
            this.contextMenu = contextMenu;
        }
        ContextMenuSub.prototype.ngOnInit = function () {
            var _this = this;
            this.activeItemKeyChangeSubscription = this.contextMenu.contextMenuService.activeItemKeyChange$.pipe(operators.takeUntil(this.contextMenu.ngDestroy$)).subscribe(function (activeItemKey) {
                _this.activeItemKey = activeItemKey;
                if (_this.isActive(_this.parentItemKey) && dom.DomHandler.hasClass(_this.sublistViewChild.nativeElement, 'p-submenu-list-active')) {
                    _this.contextMenu.positionSubmenu(_this.sublistViewChild.nativeElement);
                }
                _this.contextMenu.cd.markForCheck();
            });
        };
        ContextMenuSub.prototype.onItemMouseEnter = function (event, item, key) {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            if (item.disabled) {
                return;
            }
            if (item.items) {
                var childSublist = dom.DomHandler.findSingle(event.currentTarget, '.p-submenu-list');
                dom.DomHandler.addClass(childSublist, 'p-submenu-list-active');
            }
            this.contextMenu.contextMenuService.changeKey(key);
        };
        ContextMenuSub.prototype.onItemMouseLeave = function (event, item) {
            if (item.disabled) {
                return;
            }
            if (this.contextMenu.el.nativeElement.contains(event.toElement)) {
                if (item.items) {
                    this.contextMenu.removeActiveFromSubLists(event.currentTarget);
                }
                if (!this.root) {
                    this.contextMenu.contextMenuService.changeKey(this.parentItemKey);
                }
            }
        };
        ContextMenuSub.prototype.onItemClick = function (event, item, menuitem, key) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url && !item.routerLink) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items) {
                var childSublist = dom.DomHandler.findSingle(menuitem, '.p-submenu-list');
                if (childSublist) {
                    if (this.isActive(key) && dom.DomHandler.hasClass(childSublist, 'p-submenu-list-active')) {
                        this.contextMenu.removeActiveFromSubLists(menuitem);
                    }
                    else {
                        dom.DomHandler.addClass(childSublist, 'p-submenu-list-active');
                    }
                    this.contextMenu.contextMenuService.changeKey(key);
                }
            }
            if (!item.items) {
                this.onLeafClick();
            }
        };
        ContextMenuSub.prototype.onLeafClick = function () {
            if (this.root) {
                this.contextMenu.hide();
            }
            this.leafClick.emit();
        };
        ContextMenuSub.prototype.getKey = function (index) {
            return this.root ? String(index) : this.parentItemKey + '_' + index;
        };
        ContextMenuSub.prototype.isActive = function (key) {
            return (this.activeItemKey && (this.activeItemKey.startsWith(key + '_') || this.activeItemKey === key));
        };
        return ContextMenuSub;
    }());
    ContextMenuSub.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-contextMenuSub',
                    template: "\n        <ul #sublist [ngClass]=\"{'p-submenu-list':!root}\">\n            <ng-template ngFor let-child let-index=\"index\" [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" #menuitem class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #menuitem [ngClass]=\"{'p-menuitem':true,'p-menuitem-active': isActive(getKey(index)),'p-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\"\n                    (mouseenter)=\"onItemMouseEnter($event,child,getKey(index))\" (mouseleave)=\"onItemMouseLeave($event,child)\" role=\"none\" [attr.data-ik]=\"getKey(index)\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url ? child.url : null\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" \n                        [attr.tabindex]=\"child.disabled ? null : '0'\" (click)=\"onItemClick($event, child, menuitem, getKey(index))\" [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\" pRipple\n                        [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"isActive(getKey(index))\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" role=\"menuitem\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\"\n                        (click)=\"onItemClick($event, child, menuitem, getKey(index))\" [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                         pRipple [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi pi-angle-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-contextMenuSub [parentItemKey]=\"getKey(index)\" [item]=\"child\" *ngIf=\"child.items\" (leafClick)=\"onLeafClick()\"></p-contextMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    ContextMenuSub.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return ContextMenu; }),] }] }
    ]; };
    ContextMenuSub.propDecorators = {
        item: [{ type: core.Input }],
        root: [{ type: core.Input }],
        parentItemKey: [{ type: core.Input }],
        leafClick: [{ type: core.Output }],
        sublistViewChild: [{ type: core.ViewChild, args: ['sublist',] }],
        menuitemViewChild: [{ type: core.ViewChild, args: ['menuitem',] }]
    };
    var ContextMenu = /** @class */ (function () {
        function ContextMenu(el, renderer, cd, zone, contextMenuService) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.contextMenuService = contextMenuService;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.triggerEvent = 'contextmenu';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.ngDestroy$ = new rxjs.Subject();
        }
        ContextMenu.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.global) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.triggerEventListener = this.renderer.listen(documentTarget, this.triggerEvent, function (event) {
                    _this.show(event);
                    event.preventDefault();
                });
            }
            else if (this.target) {
                this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, function (event) {
                    _this.show(event);
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
        };
        ContextMenu.prototype.show = function (event) {
            this.clearActiveItem();
            this.position(event);
            this.moveOnTop();
            this.containerViewChild.nativeElement.style.display = 'block';
            dom.DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
            this.bindGlobalListeners();
            if (event) {
                event.preventDefault();
            }
            this.onShow.emit();
        };
        ContextMenu.prototype.hide = function () {
            this.containerViewChild.nativeElement.style.display = 'none';
            this.unbindGlobalListeners();
            this.onHide.emit();
        };
        ContextMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        ContextMenu.prototype.toggle = function (event) {
            if (this.containerViewChild.nativeElement.offsetParent)
                this.hide();
            else
                this.show(event);
        };
        ContextMenu.prototype.position = function (event) {
            if (event) {
                var left = event.pageX + 1;
                var top = event.pageY + 1;
                var width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
                var height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : dom.DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
                var viewport = dom.DomHandler.getViewport();
                //flip
                if (left + width - document.body.scrollLeft > viewport.width) {
                    left -= width;
                }
                //flip
                if (top + height - document.body.scrollTop > viewport.height) {
                    top -= height;
                }
                //fit
                if (left < document.body.scrollLeft) {
                    left = document.body.scrollLeft;
                }
                //fit
                if (top < document.body.scrollTop) {
                    top = document.body.scrollTop;
                }
                this.containerViewChild.nativeElement.style.left = left + 'px';
                this.containerViewChild.nativeElement.style.top = top + 'px';
            }
        };
        ContextMenu.prototype.positionSubmenu = function (sublist) {
            var parentMenuItem = sublist.parentElement.parentElement;
            var viewport = dom.DomHandler.getViewport();
            var sublistWidth = sublist.offsetParent ? sublist.offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(sublist);
            var sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : dom.DomHandler.getHiddenElementOuterHeight(sublist);
            var itemOuterWidth = dom.DomHandler.getOuterWidth(parentMenuItem.children[0]);
            var itemOuterHeight = dom.DomHandler.getOuterHeight(parentMenuItem.children[0]);
            var containerOffset = dom.DomHandler.getOffset(parentMenuItem.parentElement);
            sublist.style.zIndex = ++dom.DomHandler.zindex;
            if ((parseInt(containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - dom.DomHandler.calculateScrollbarHeight())) {
                sublist.style.removeProperty('top');
                sublist.style.bottom = '0px';
            }
            else {
                sublist.style.removeProperty('bottom');
                sublist.style.top = '0px';
            }
            if ((parseInt(containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - dom.DomHandler.calculateScrollbarWidth())) {
                sublist.style.left = -sublistWidth + 'px';
            }
            else {
                sublist.style.left = itemOuterWidth + 'px';
            }
        };
        ContextMenu.prototype.isItemMatched = function (menuitem) {
            return dom.DomHandler.hasClass(menuitem, 'p-menuitem') && !dom.DomHandler.hasClass(menuitem.children[0], 'p-disabled');
        };
        ContextMenu.prototype.findNextItem = function (menuitem, isRepeated) {
            var nextMenuitem = menuitem.nextElementSibling;
            if (nextMenuitem) {
                return this.isItemMatched(nextMenuitem) ? nextMenuitem : this.findNextItem(nextMenuitem, isRepeated);
            }
            else {
                var firstItem = menuitem.parentElement.children[0];
                return this.isItemMatched(firstItem) ? firstItem : (!isRepeated ? this.findNextItem(firstItem, true) : null);
            }
        };
        ContextMenu.prototype.findPrevItem = function (menuitem, isRepeated) {
            var prevMenuitem = menuitem.previousElementSibling;
            if (prevMenuitem) {
                return this.isItemMatched(prevMenuitem) ? prevMenuitem : this.findPrevItem(prevMenuitem, isRepeated);
            }
            else {
                var lastItem = menuitem.parentElement.children[menuitem.parentElement.children.length - 1];
                return this.isItemMatched(lastItem) ? lastItem : (!isRepeated ? this.findPrevItem(lastItem, true) : null);
            }
        };
        ContextMenu.prototype.getActiveItem = function () {
            var activeItemKey = this.contextMenuService.activeItemKey;
            return activeItemKey == null ? null : dom.DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-menuitem[data-ik="' + activeItemKey + '"]');
        };
        ContextMenu.prototype.clearActiveItem = function () {
            if (this.contextMenuService.activeItemKey) {
                this.removeActiveFromSubLists(this.containerViewChild.nativeElement);
                this.contextMenuService.reset();
            }
        };
        ContextMenu.prototype.removeActiveFromSubLists = function (el) {
            var e_1, _a;
            var sublists = dom.DomHandler.find(el, '.p-submenu-list-active');
            try {
                for (var sublists_1 = __values(sublists), sublists_1_1 = sublists_1.next(); !sublists_1_1.done; sublists_1_1 = sublists_1.next()) {
                    var sublist = sublists_1_1.value;
                    dom.DomHandler.removeClass(sublist, 'p-submenu-list-active');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (sublists_1_1 && !sublists_1_1.done && (_a = sublists_1.return)) _a.call(sublists_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        ContextMenu.prototype.removeActiveFromSublist = function (menuitem) {
            if (menuitem) {
                var sublist = dom.DomHandler.findSingle(menuitem, '.p-submenu-list');
                if (sublist && dom.DomHandler.hasClass(menuitem, 'p-submenu-list-active')) {
                    dom.DomHandler.removeClass(menuitem, 'p-submenu-list-active');
                }
            }
        };
        ContextMenu.prototype.bindGlobalListeners = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function (event) {
                    if (_this.containerViewChild.nativeElement.offsetParent && _this.isOutsideClicked(event) && !event.ctrlKey && event.button !== 2) {
                        _this.hide();
                    }
                });
            }
            this.zone.runOutsideAngular(function () {
                if (!_this.windowResizeListener) {
                    _this.windowResizeListener = _this.onWindowResize.bind(_this);
                    window.addEventListener('resize', _this.windowResizeListener);
                }
            });
            if (!this.documentKeydownListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentKeydownListener = this.renderer.listen(documentTarget, 'keydown', function (event) {
                    var activeItem = _this.getActiveItem();
                    switch (event.key) {
                        case 'ArrowDown':
                            if (activeItem) {
                                _this.removeActiveFromSublist(activeItem);
                                activeItem = _this.findNextItem(activeItem);
                            }
                            else {
                                var firstItem = dom.DomHandler.findSingle(_this.containerViewChild.nativeElement, '.p-menuitem-link').parentElement;
                                activeItem = _this.isItemMatched(firstItem) ? firstItem : _this.findNextItem(firstItem);
                            }
                            if (activeItem) {
                                _this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                            }
                            event.preventDefault();
                            break;
                        case 'ArrowUp':
                            if (activeItem) {
                                _this.removeActiveFromSublist(activeItem);
                                activeItem = _this.findPrevItem(activeItem);
                            }
                            else {
                                var sublist = dom.DomHandler.findSingle(_this.containerViewChild.nativeElement, 'ul');
                                var lastItem = sublist.children[sublist.children.length - 1];
                                activeItem = _this.isItemMatched(lastItem) ? lastItem : _this.findPrevItem(lastItem);
                            }
                            if (activeItem) {
                                _this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                            }
                            event.preventDefault();
                            break;
                        case 'ArrowRight':
                            if (activeItem) {
                                var sublist = dom.DomHandler.findSingle(activeItem, '.p-submenu-list');
                                if (sublist) {
                                    dom.DomHandler.addClass(sublist, 'p-submenu-list-active');
                                    activeItem = dom.DomHandler.findSingle(sublist, '.p-menuitem-link:not(.p-disabled)').parentElement;
                                    if (activeItem) {
                                        _this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                                    }
                                }
                            }
                            event.preventDefault();
                            break;
                        case 'ArrowLeft':
                            if (activeItem) {
                                var sublist = activeItem.parentElement;
                                if (sublist && dom.DomHandler.hasClass(sublist, 'p-submenu-list-active')) {
                                    dom.DomHandler.removeClass(sublist, 'p-submenu-list-active');
                                    activeItem = sublist.parentElement.parentElement;
                                    if (activeItem) {
                                        _this.contextMenuService.changeKey(activeItem.getAttribute('data-ik'));
                                    }
                                }
                            }
                            event.preventDefault();
                            break;
                        case 'Escape':
                            _this.hide();
                            event.preventDefault();
                            break;
                        case 'Enter':
                            if (activeItem) {
                                _this.handleItemClick(event, _this.findModelItemFromKey(_this.contextMenuService.activeItemKey), activeItem);
                            }
                            event.preventDefault();
                            break;
                        default:
                            break;
                    }
                });
            }
        };
        ContextMenu.prototype.findModelItemFromKey = function (key) {
            var _this = this;
            if (key == null || !this.model) {
                return null;
            }
            var indexes = key.split('_');
            return indexes.reduce(function (item, currentIndex) {
                return item ? item.items[currentIndex] : _this.model[currentIndex];
            }, null);
        };
        ContextMenu.prototype.handleItemClick = function (event, item, menuitem) {
            if (!item || item.disabled) {
                return;
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items) {
                var childSublist = dom.DomHandler.findSingle(menuitem, '.p-submenu-list');
                if (childSublist) {
                    if (dom.DomHandler.hasClass(childSublist, 'p-submenu-list-active')) {
                        this.removeActiveFromSubLists(menuitem);
                    }
                    else {
                        dom.DomHandler.addClass(childSublist, 'p-submenu-list-active');
                        this.positionSubmenu(childSublist);
                    }
                }
            }
            if (!item.items) {
                this.hide();
            }
        };
        ContextMenu.prototype.unbindGlobalListeners = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
            if (this.windowResizeListener) {
                window.removeEventListener('resize', this.windowResizeListener);
                this.windowResizeListener = null;
            }
            if (this.documentKeydownListener) {
                this.documentKeydownListener();
                this.documentKeydownListener = null;
            }
        };
        ContextMenu.prototype.onWindowResize = function (event) {
            if (this.containerViewChild.nativeElement.offsetParent) {
                this.hide();
            }
        };
        ContextMenu.prototype.isOutsideClicked = function (event) {
            return !(this.containerViewChild.nativeElement.isSameNode(event.target) || this.containerViewChild.nativeElement.contains(event.target));
        };
        ContextMenu.prototype.ngOnDestroy = function () {
            this.unbindGlobalListeners();
            if (this.triggerEventListener) {
                this.triggerEventListener();
            }
            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
            this.ngDestroy$.next(true);
            this.ngDestroy$.complete();
        };
        return ContextMenu;
    }());
    ContextMenu.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-contextMenu',
                    template: "\n        <div #container [ngClass]=\"'p-contextmenu p-component'\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-contextMenuSub [item]=\"model\" [root]=\"true\"></p-contextMenuSub>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-contextmenu{display:none;position:absolute}.p-contextmenu ul{list-style:none;margin:0;padding:0}.p-contextmenu .p-submenu-list{display:none;min-width:100%;position:absolute;z-index:1}.p-contextmenu .p-menuitem-link{align-items:center;cursor:pointer;display:flex;overflow:hidden;position:relative;text-decoration:none}.p-contextmenu .p-menuitem-text{line-height:1}.p-contextmenu .p-menuitem{position:relative}.p-contextmenu .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-contextmenu .p-menuitem-active>p-contextmenusub>.p-submenu-list.p-submenu-list-active{display:block!important}"]
                },] }
    ];
    ContextMenu.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: api.ContextMenuService }
    ]; };
    ContextMenu.propDecorators = {
        model: [{ type: core.Input }],
        global: [{ type: core.Input }],
        target: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        triggerEvent: [{ type: core.Input }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }]
    };
    var ContextMenuModule = /** @class */ (function () {
        function ContextMenuModule() {
        }
        return ContextMenuModule;
    }());
    ContextMenuModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule, ripple.RippleModule],
                    exports: [ContextMenu, router.RouterModule],
                    declarations: [ContextMenu, ContextMenuSub],
                    providers: [api.ContextMenuService]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ContextMenu = ContextMenu;
    exports.ContextMenuModule = ContextMenuModule;
    exports.ContextMenuSub = ContextMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-contextmenu.umd.js.map
