(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/utils'), require('primeng/dom'), require('@angular/animations'), require('@angular/forms'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/cascadeselect', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/utils', 'primeng/dom', '@angular/animations', '@angular/forms', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.cascadeselect = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.utils, global.primeng.dom, global.ng.animations, global.ng.forms, global.primeng.ripple));
}(this, (function (exports, core, common, api, utils, dom, animations, forms, ripple) { 'use strict';

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

    var CASCADESELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return CascadeSelect; }),
        multi: true
    };
    var CascadeSelectSub = /** @class */ (function () {
        function CascadeSelectSub(el) {
            this.el = el;
            this.level = 0;
            this.onSelect = new core.EventEmitter();
            this.onGroupSelect = new core.EventEmitter();
            this.activeOption = null;
        }
        Object.defineProperty(CascadeSelectSub.prototype, "parentActive", {
            get: function () {
                return this._parentActive;
            },
            set: function (val) {
                if (!val) {
                    this.activeOption = null;
                }
                this._parentActive = val;
            },
            enumerable: false,
            configurable: true
        });
        ;
        CascadeSelectSub.prototype.ngOnInit = function () {
            var e_1, _a;
            if (this.selectionPath && this.options && !this.dirty) {
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var option = _c.value;
                        if (this.selectionPath.includes(option)) {
                            this.activeOption = option;
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
            }
            if (!this.root) {
                this.position();
            }
        };
        CascadeSelectSub.prototype.onOptionClick = function (event, option) {
            if (this.isOptionGroup(option)) {
                this.activeOption = (this.activeOption === option) ? null : option;
                this.onGroupSelect.emit({
                    originalEvent: event,
                    value: option
                });
            }
            else {
                this.onSelect.emit({
                    originalEvent: event,
                    value: this.getOptionValue(option)
                });
            }
        };
        CascadeSelectSub.prototype.onOptionSelect = function (event) {
            this.onSelect.emit(event);
        };
        CascadeSelectSub.prototype.onOptionGroupSelect = function (event) {
            this.onGroupSelect.emit(event);
        };
        CascadeSelectSub.prototype.getOptionLabel = function (option) {
            return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        };
        CascadeSelectSub.prototype.getOptionValue = function (option) {
            return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        };
        CascadeSelectSub.prototype.getOptionGroupLabel = function (optionGroup) {
            return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
        };
        CascadeSelectSub.prototype.getOptionGroupChildren = function (optionGroup) {
            return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[this.level]);
        };
        CascadeSelectSub.prototype.isOptionGroup = function (option) {
            return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[this.level]);
        };
        CascadeSelectSub.prototype.getOptionLabelToRender = function (option) {
            return this.isOptionGroup(option) ? this.getOptionGroupLabel(option) : this.getOptionLabel(option);
        };
        CascadeSelectSub.prototype.getItemClass = function (option) {
            return {
                'p-cascadeselect-item': true,
                'p-cascadeselect-item-group': this.isOptionGroup(option),
                'p-cascadeselect-item-active p-highlight': this.isOptionActive(option)
            };
        };
        CascadeSelectSub.prototype.isOptionActive = function (option) {
            return this.activeOption === option;
        };
        CascadeSelectSub.prototype.onKeyDown = function (event, option, index) {
            var listItem = event.currentTarget.parentElement;
            switch (event.key) {
                case 'Down':
                case 'ArrowDown':
                    var nextItem = this.el.nativeElement.children[0].children[index + 1];
                    if (nextItem) {
                        nextItem.children[0].focus();
                    }
                    break;
                case 'Up':
                case 'ArrowUp':
                    var prevItem = this.el.nativeElement.children[0].children[index - 1];
                    if (prevItem) {
                        prevItem.children[0].focus();
                    }
                    break;
                case 'Right':
                case 'ArrowRight':
                    if (this.isOptionGroup(option)) {
                        if (this.isOptionActive(option)) {
                            listItem.children[1].children[0].children[0].children[0].focus();
                        }
                        else {
                            this.activeOption = option;
                        }
                    }
                    break;
                case 'Left':
                case 'ArrowLeft':
                    this.activeOption = null;
                    var parentList = listItem.parentElement.parentElement.parentElement;
                    if (parentList) {
                        parentList.children[0].focus();
                    }
                    break;
                case 'Enter':
                    this.onOptionClick(event, option);
                    break;
            }
            event.preventDefault();
        };
        CascadeSelectSub.prototype.position = function () {
            var parentItem = this.el.nativeElement.parentElement;
            var containerOffset = dom.DomHandler.getOffset(parentItem);
            var viewport = dom.DomHandler.getViewport();
            var sublistWidth = this.el.nativeElement.children[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
            var itemOuterWidth = dom.DomHandler.getOuterWidth(parentItem.children[0]);
            if ((parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth) > (viewport.width - dom.DomHandler.calculateScrollbarWidth())) {
                this.el.nativeElement.children[0].style.left = '-200%';
            }
        };
        return CascadeSelectSub;
    }());
    CascadeSelectSub.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-cascadeSelectSub',
                    template: "\n        <ul class=\"p-cascadeselect-panel p-cascadeselect-items\" [ngClass]=\"{'p-cascadeselect-panel-root': root}\" role=\"listbox\" aria-orientation=\"horizontal\">\n            <ng-template ngFor let-option [ngForOf]=\"options\" let-i=\"index\">\n                <li [ngClass]=\"getItemClass(option)\" role=\"none\">\n                    <div class=\"p-cascadeselect-item-content\" (click)=\"onOptionClick($event, option)\" tabindex=\"0\" (keydown)=\"onKeyDown($event, option, i)\" pRipple>\n                        <ng-container *ngIf=\"optionTemplate;else defaultOptionTemplate\">\n                            <ng-container *ngTemplateOutlet=\"optionTemplate; context: {$implicit: option}\"></ng-container>\n                        </ng-container>\n                        <ng-template #defaultOptionTemplate>\n                            <span class=\"p-cascadeselect-item-text\">{{getOptionLabelToRender(option)}}</span>\n                        </ng-template>\n                        <span class=\"p-cascadeselect-group-icon pi pi-angle-right\" *ngIf=\"isOptionGroup(option)\"></span>\n                    </div>\n                    <p-cascadeSelectSub *ngIf=\"isOptionGroup(option) && isOptionActive(option)\" class=\"p-cascadeselect-sublist\" [selectionPath]=\"selectionPath\" [options]=\"getOptionGroupChildren(option)\"\n                        [optionLabel]=\"optionLabel\" [optionValue]=\"optionValue\" [level]=\"level + 1\" (onSelect)=\"onOptionSelect($event)\" (onOptionGroupSelect)=\"onOptionGroupSelect()\"\n                        [optionGroupLabel]=\"optionGroupLabel\" [optionGroupChildren]=\"optionGroupChildren\" [parentActive]=\"isOptionActive(option)\" [dirty]=\"dirty\" [optionTemplate]=\"optionTemplate\">\n                    </p-cascadeSelectSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    CascadeSelectSub.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    CascadeSelectSub.propDecorators = {
        selectionPath: [{ type: core.Input }],
        options: [{ type: core.Input }],
        optionGroupChildren: [{ type: core.Input }],
        optionTemplate: [{ type: core.Input }],
        level: [{ type: core.Input }],
        optionLabel: [{ type: core.Input }],
        optionValue: [{ type: core.Input }],
        optionGroupLabel: [{ type: core.Input }],
        dirty: [{ type: core.Input }],
        root: [{ type: core.Input }],
        onSelect: [{ type: core.Output }],
        onGroupSelect: [{ type: core.Output }],
        parentActive: [{ type: core.Input }]
    };
    var CascadeSelect = /** @class */ (function () {
        function CascadeSelect(el, cd) {
            this.el = el;
            this.cd = cd;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onChange = new core.EventEmitter();
            this.onGroupChange = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.onBeforeShow = new core.EventEmitter();
            this.onBeforeHide = new core.EventEmitter();
            this.selectionPath = null;
            this.focused = false;
            this.filled = false;
            this.overlayVisible = false;
            this.dirty = false;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        CascadeSelect.prototype.ngOnInit = function () {
            this.updateSelectionPath();
        };
        CascadeSelect.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'value':
                        _this.valueTemplate = item.template;
                        break;
                    case 'option':
                        _this.optionTemplate = item.template;
                        break;
                }
            });
        };
        CascadeSelect.prototype.onOptionSelect = function (event) {
            this.value = event.value;
            this.updateSelectionPath();
            this.onModelChange(this.value);
            this.onChange.emit(event);
            this.hide();
            this.focusInputEl.nativeElement.focus();
        };
        CascadeSelect.prototype.onOptionGroupSelect = function (event) {
            this.dirty = true;
            this.onGroupChange.emit(event);
        };
        CascadeSelect.prototype.getOptionLabel = function (option) {
            return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        };
        CascadeSelect.prototype.getOptionValue = function (option) {
            return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        };
        CascadeSelect.prototype.getOptionGroupChildren = function (optionGroup, level) {
            return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[level]);
        };
        CascadeSelect.prototype.isOptionGroup = function (option, level) {
            return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
        };
        CascadeSelect.prototype.updateSelectionPath = function () {
            var e_2, _a;
            var path;
            if (this.value != null && this.options) {
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var option = _c.value;
                        path = this.findModelOptionInGroup(option, 0);
                        if (path) {
                            break;
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
            this.selectionPath = path;
            this.updateFilledState();
        };
        CascadeSelect.prototype.updateFilledState = function () {
            this.filled = !(this.selectionPath == null || this.selectionPath.length == 0);
        };
        CascadeSelect.prototype.findModelOptionInGroup = function (option, level) {
            var e_3, _a;
            if (this.isOptionGroup(option, level)) {
                var selectedOption = void 0;
                try {
                    for (var _b = __values(this.getOptionGroupChildren(option, level)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var childOption = _c.value;
                        selectedOption = this.findModelOptionInGroup(childOption, level + 1);
                        if (selectedOption) {
                            selectedOption.unshift(option);
                            return selectedOption;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else if ((utils.ObjectUtils.equals(this.value, this.getOptionValue(option), this.dataKey))) {
                return [option];
            }
            return null;
        };
        CascadeSelect.prototype.show = function () {
            this.onBeforeShow.emit();
            this.overlayVisible = true;
        };
        CascadeSelect.prototype.hide = function () {
            this.onBeforeHide.emit();
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        CascadeSelect.prototype.onClick = function (event) {
            if (this.disabled) {
                return;
            }
            if (!this.overlayEl || !this.overlayEl || !this.overlayEl.contains(event.target)) {
                if (this.overlayVisible) {
                    this.hide();
                }
                else {
                    this.show();
                }
                this.focusInputEl.nativeElement.focus();
            }
        };
        CascadeSelect.prototype.onFocus = function () {
            this.focused = true;
        };
        CascadeSelect.prototype.onBlur = function () {
            this.focused = false;
        };
        CascadeSelect.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.overlayEl = event.element;
                    this.onOverlayEnter();
                    break;
            }
        };
        CascadeSelect.prototype.onOverlayAnimationDone = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onOverlayLeave();
                    break;
            }
        };
        CascadeSelect.prototype.onOverlayEnter = function () {
            this.overlayEl.style.zIndex = String(dom.DomHandler.generateZIndex());
            this.appendContainer();
            this.alignOverlay();
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();
            this.onShow.emit();
        };
        CascadeSelect.prototype.onOverlayLeave = function () {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
            this.onHide.emit();
            this.overlayEl = null;
            this.dirty = false;
        };
        CascadeSelect.prototype.writeValue = function (value) {
            this.value = value;
            this.updateSelectionPath();
            this.cd.markForCheck();
        };
        CascadeSelect.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        CascadeSelect.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        CascadeSelect.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        CascadeSelect.prototype.alignOverlay = function () {
            if (this.appendTo) {
                dom.DomHandler.absolutePosition(this.overlayEl, this.containerEl.nativeElement);
                this.overlayEl.style.minWidth = dom.DomHandler.getOuterWidth(this.containerEl.nativeElement) + 'px';
            }
            else {
                dom.DomHandler.relativePosition(this.overlayEl, this.containerEl.nativeElement);
            }
        };
        CascadeSelect.prototype.bindOutsideClickListener = function () {
            var _this = this;
            if (!this.outsideClickListener) {
                this.outsideClickListener = function (event) {
                    if (_this.overlayVisible && _this.overlayEl && !_this.containerEl.nativeElement.contains(event.target) && !_this.overlayEl.contains(event.target)) {
                        _this.hide();
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        };
        CascadeSelect.prototype.unbindOutsideClickListener = function () {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        };
        CascadeSelect.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerEl.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        CascadeSelect.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        CascadeSelect.prototype.bindResizeListener = function () {
            var _this = this;
            if (!this.resizeListener) {
                this.resizeListener = function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                };
                window.addEventListener('resize', this.resizeListener);
            }
        };
        CascadeSelect.prototype.unbindResizeListener = function () {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        };
        CascadeSelect.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlayEl);
                else
                    document.getElementById(this.appendTo).appendChild(this.overlayEl);
            }
        };
        CascadeSelect.prototype.restoreAppend = function () {
            if (this.overlayEl && this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.removeChild(this.overlayEl);
                else
                    document.getElementById(this.appendTo).removeChild(this.overlayEl);
            }
        };
        CascadeSelect.prototype.label = function () {
            if (this.selectionPath)
                return this.getOptionLabel(this.selectionPath[this.selectionPath.length - 1]);
            else
                return this.placeholder || 'p-emptylabel';
        };
        CascadeSelect.prototype.onKeyDown = function (event) {
            switch (event.key) {
                case 'Down':
                case 'ArrowDown':
                    if (this.overlayVisible) {
                        dom.DomHandler.findSingle(this.overlayEl, '.p-cascadeselect-item').children[0].focus();
                    }
                    else if (event.altKey && this.options && this.options.length) {
                        this.show();
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                    if (this.overlayVisible) {
                        this.hide();
                        event.preventDefault();
                    }
                    break;
                case 'Tab':
                    this.hide();
                    break;
            }
        };
        CascadeSelect.prototype.containerClass = function () {
            return {
                'p-cascadeselect p-component p-inputwrapper': true,
                'p-disabled': this.disabled,
                'p-focus': this.focused
            };
        };
        CascadeSelect.prototype.labelClass = function () {
            return {
                'p-cascadeselect-label': true,
                'p-placeholder': this.label() === this.placeholder,
                'p-cascadeselect-label-empty': !this.value && (this.label() === 'p-emptylabel' || this.label().length === 0)
            };
        };
        CascadeSelect.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.unbindOutsideClickListener();
            this.unbindResizeListener();
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            this.overlayEl = null;
        };
        return CascadeSelect;
    }());
    CascadeSelect.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-cascadeSelect',
                    template: "\n        <div #container [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input #focusInput type=\"text\" [attr.id]=\"inputId\" readonly [disabled]=\"disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"  (keydown)=\"onKeyDown($event)\" [attr.tabindex]=\"tabindex\"\n                    aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n            </div>\n            <span [ngClass]=\"labelClass()\">\n                <ng-container *ngIf=\"valueTemplate;else defaultValueTemplate\">\n                        <ng-container *ngTemplateOutlet=\"valueTemplate; context: {$implicit: value, placeholder: placeholder}\"></ng-container>\n                </ng-container>\n                <ng-template #defaultValueTemplate>\n                    {{label()}}\n                </ng-template>\n            </span>\n            <div class=\"p-cascadeselect-trigger\" role=\"button\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\">\n                <span class=\"p-cascadeselect-trigger-icon pi pi-chevron-down\"></span>\n            </div>\n            <div class=\"p-cascadeselect-panel p-component\" *ngIf=\"overlayVisible\" \n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\">\n                <div class=\"p-cascadeselect-items-wrapper\">\n                    <p-cascadeSelectSub [options]=\"options\" [selectionPath]=\"selectionPath\" class=\"p-cascadeselect-items\" \n                        [optionLabel]=\"optionLabel\" [optionValue]=\"optionValue\" [level]=\"0\" [optionTemplate]=\"optionTemplate\"\n                        [optionGroupLabel]=\"optionGroupLabel\" [optionGroupChildren]=\"optionGroupChildren\" \n                        (onSelect)=\"onOptionSelect($event)\" (onGroupSelect)=\"onOptionGroupSelect($event)\" [dirty]=\"dirty\" [root]=\"true\">\n                    </p-cascadeSelectSub>\n                </div>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations.trigger('overlayAnimation', [
                            animations.transition(':enter', [
                                animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animations.animate('{{showTransitionParams}}')
                            ]),
                            animations.transition(':leave', [
                                animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                            ])
                        ])
                    ],
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                    },
                    providers: [CASCADESELECT_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-cascadeselect{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;display:inline-flex;position:relative;user-select:none}.p-cascadeselect-trigger{align-items:center;display:flex;flex-shrink:0;justify-content:center}.p-cascadeselect-label{cursor:pointer;display:block;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:1%}.p-cascadeselect-label-empty{overflow:hidden;visibility:hidden}.p-cascadeselect .p-cascadeselect-panel{min-width:100%}.p-cascadeselect-panel{position:absolute}.p-cascadeselect-item{cursor:pointer;font-weight:400;white-space:nowrap}.p-cascadeselect-item-content{align-items:center;display:flex;overflow:hidden;position:relative}.p-cascadeselect-group-icon{margin-left:auto}.p-cascadeselect-items{list-style-type:none;margin:0;padding:0}.p-fluid .p-cascadeselect{display:flex}.p-fluid .p-cascadeselect .p-cascadeselect-label{width:1%}.p-cascadeselect-sublist{display:none;min-width:100%;position:absolute;z-index:1}.p-cascadeselect-item-active{overflow:visible!important}.p-cascadeselect-item-active>.p-cascadeselect-sublist{display:block;left:100%;top:0}"]
                },] }
    ];
    CascadeSelect.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    CascadeSelect.propDecorators = {
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        options: [{ type: core.Input }],
        optionLabel: [{ type: core.Input }],
        optionValue: [{ type: core.Input }],
        optionGroupLabel: [{ type: core.Input }],
        optionGroupChildren: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        value: [{ type: core.Input }],
        dataKey: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        rounded: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        focusInputEl: [{ type: core.ViewChild, args: ['focusInput',] }],
        containerEl: [{ type: core.ViewChild, args: ['container',] }],
        onChange: [{ type: core.Output }],
        onGroupChange: [{ type: core.Output }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        onBeforeShow: [{ type: core.Output }],
        onBeforeHide: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var CascadeSelectModule = /** @class */ (function () {
        function CascadeSelectModule() {
        }
        return CascadeSelectModule;
    }());
    CascadeSelectModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, ripple.RippleModule],
                    exports: [CascadeSelect, CascadeSelectSub, api.SharedModule],
                    declarations: [CascadeSelect, CascadeSelectSub]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CASCADESELECT_VALUE_ACCESSOR = CASCADESELECT_VALUE_ACCESSOR;
    exports.CascadeSelect = CascadeSelect;
    exports.CascadeSelectModule = CascadeSelectModule;
    exports.CascadeSelectSub = CascadeSelectSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-cascadeselect.umd.js.map
