(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/inputtext'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/chips', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/inputtext', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.chips = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.inputtext, global.ng.forms));
}(this, (function (exports, core, common, api, inputtext, forms) { 'use strict';

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

    var CHIPS_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Chips; }),
        multi: true
    };
    var Chips = /** @class */ (function () {
        function Chips(el, cd) {
            this.el = el;
            this.cd = cd;
            this.allowDuplicate = true;
            this.onAdd = new core.EventEmitter();
            this.onRemove = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onChipClick = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Chips.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        Chips.prototype.onClick = function () {
            this.inputViewChild.nativeElement.focus();
        };
        Chips.prototype.onInput = function () {
            this.updateFilledState();
        };
        Chips.prototype.onPaste = function (event) {
            var _this = this;
            if (!this.disabled) {
                if (this.separator) {
                    var pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
                    pastedData.split(this.separator).forEach(function (val) {
                        _this.addItem(event, val, true);
                    });
                    this.inputViewChild.nativeElement.value = '';
                }
                this.updateFilledState();
            }
        };
        Chips.prototype.updateFilledState = function () {
            if (!this.value || this.value.length === 0) {
                this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '');
            }
            else {
                this.filled = true;
            }
        };
        Chips.prototype.onItemClick = function (event, item) {
            this.onChipClick.emit({
                originalEvent: event,
                value: item
            });
        };
        Chips.prototype.writeValue = function (value) {
            this.value = value;
            this.updateMaxedOut();
            this.cd.markForCheck();
        };
        Chips.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Chips.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Chips.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Chips.prototype.resolveFieldData = function (data, field) {
            if (data && field) {
                if (field.indexOf('.') == -1) {
                    return data[field];
                }
                else {
                    var fields = field.split('.');
                    var value = data;
                    for (var i = 0, len = fields.length; i < len; ++i) {
                        value = value[fields[i]];
                    }
                    return value;
                }
            }
            else {
                return null;
            }
        };
        Chips.prototype.onInputFocus = function (event) {
            this.focus = true;
            this.onFocus.emit(event);
        };
        Chips.prototype.onInputBlur = function (event) {
            this.focus = false;
            if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
                this.addItem(event, this.inputViewChild.nativeElement.value, false);
            }
            this.onModelTouched();
            this.onBlur.emit(event);
        };
        Chips.prototype.removeItem = function (event, index) {
            if (this.disabled) {
                return;
            }
            var removedItem = this.value[index];
            this.value = this.value.filter(function (val, i) { return i != index; });
            this.onModelChange(this.value);
            this.onRemove.emit({
                originalEvent: event,
                value: removedItem
            });
            this.updateFilledState();
            this.updateMaxedOut();
        };
        Chips.prototype.addItem = function (event, item, preventDefault) {
            this.value = this.value || [];
            if (item && item.trim().length) {
                if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                    this.value = __spread(this.value, [item]);
                    this.onModelChange(this.value);
                    this.onAdd.emit({
                        originalEvent: event,
                        value: item
                    });
                }
            }
            this.updateFilledState();
            this.updateMaxedOut();
            this.inputViewChild.nativeElement.value = '';
            if (preventDefault) {
                event.preventDefault();
            }
        };
        Chips.prototype.onKeydown = function (event) {
            switch (event.which) {
                //backspace
                case 8:
                    if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                        this.value = __spread(this.value);
                        var removedItem = this.value.pop();
                        this.onModelChange(this.value);
                        this.onRemove.emit({
                            originalEvent: event,
                            value: removedItem
                        });
                        this.updateFilledState();
                    }
                    break;
                //enter
                case 13:
                    this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    break;
                case 9:
                    if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                    break;
                default:
                    if (this.max && this.value && this.max === this.value.length) {
                        event.preventDefault();
                    }
                    else if (this.separator) {
                        if (this.separator === ',' && event.which === 188) {
                            this.addItem(event, this.inputViewChild.nativeElement.value, true);
                        }
                    }
                    break;
            }
        };
        Chips.prototype.updateMaxedOut = function () {
            if (this.inputViewChild && this.inputViewChild.nativeElement) {
                if (this.max && this.value && this.max === this.value.length)
                    this.inputViewChild.nativeElement.disabled = true;
                else
                    this.inputViewChild.nativeElement.disabled = this.disabled || false;
            }
        };
        return Chips;
    }());
    Chips.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-chips',
                    template: "\n        <div [ngClass]=\"'p-chips p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick()\">\n            <ul [ngClass]=\"{'p-inputtext p-chips-multiple-container':true,'p-focus':focus,'p-disabled':disabled}\">\n                <li #token *ngFor=\"let item of value; let i = index;\" class=\"p-chips-token\" (click)=\"onItemClick($event, item)\">\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                    <span *ngIf=\"!itemTemplate\" class=\"p-chips-token-label\">{{field ? resolveFieldData(item,field) : item}}</span>\n                    <span *ngIf=\"!disabled\" class=\"p-chips-token-icon pi pi-times-circle\" (click)=\"removeItem($event,i)\"></span>\n                </li>\n                <li class=\"p-chips-input-token\">\n                    <input #inputtext type=\"text\" [attr.id]=\"inputId\" [attr.placeholder]=\"(value && value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\"\n                    (input)=\"onInput()\" (paste)=\"onPaste($event)\" [attr.aria-labelledby]=\"ariaLabelledBy\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\">\n                </li>\n            </ul>\n        </div>\n    ",
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focus'
                    },
                    providers: [CHIPS_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-chips{display:inline-flex}.p-chips-multiple-container{align-items:center;cursor:text;display:flex;flex-wrap:wrap;list-style-type:none;margin:0;overflow:hidden;padding:0}.p-chips-token{align-items:center;cursor:default;display:inline-flex;flex:0 0 auto}.p-chips-input-token{display:inline-flex;flex:1 1 auto}.p-chips-token-icon{cursor:pointer}.p-chips-input-token input{background-color:transparent;border:0;border-radius:0;box-shadow:none;margin:0;outline:0 none;padding:0;width:100%}.p-fluid .p-chips{display:flex}"]
                },] }
    ];
    Chips.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    Chips.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        field: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        max: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        allowDuplicate: [{ type: core.Input }],
        inputStyle: [{ type: core.Input }],
        inputStyleClass: [{ type: core.Input }],
        addOnTab: [{ type: core.Input }],
        addOnBlur: [{ type: core.Input }],
        separator: [{ type: core.Input }],
        onAdd: [{ type: core.Output }],
        onRemove: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        onChipClick: [{ type: core.Output }],
        inputViewChild: [{ type: core.ViewChild, args: ['inputtext',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var ChipsModule = /** @class */ (function () {
        function ChipsModule() {
        }
        return ChipsModule;
    }());
    ChipsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, inputtext.InputTextModule, api.SharedModule],
                    exports: [Chips, inputtext.InputTextModule, api.SharedModule],
                    declarations: [Chips]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CHIPS_VALUE_ACCESSOR = CHIPS_VALUE_ACCESSOR;
    exports.Chips = Chips;
    exports.ChipsModule = ChipsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-chips.umd.js.map
