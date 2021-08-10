(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/inputtext'), require('primeng/button'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputnumber', ['exports', '@angular/core', '@angular/common', 'primeng/inputtext', 'primeng/button', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputnumber = {}), global.ng.core, global.ng.common, global.primeng.inputtext, global.primeng.button, global.ng.forms));
}(this, (function (exports, core, common, inputtext, button, forms) { 'use strict';

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

    var INPUTNUMBER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return InputNumber; }),
        multi: true
    };
    var InputNumber = /** @class */ (function () {
        function InputNumber(el, cd) {
            this.el = el;
            this.cd = cd;
            this.showButtons = false;
            this.format = true;
            this.buttonLayout = "stacked";
            this.incrementButtonIcon = 'pi pi-angle-up';
            this.decrementButtonIcon = 'pi pi-angle-down';
            this.step = 1;
            this.onInput = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onKeyDown = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.groupChar = '';
            this.prefixChar = '';
            this.suffixChar = '';
            this._modeOption = "decimal";
            this._useGroupingOption = true;
        }
        Object.defineProperty(InputNumber.prototype, "locale", {
            get: function () {
                return this._localeOption;
            },
            set: function (localeOption) {
                this._localeOption = localeOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "localeMatcher", {
            get: function () {
                return this._localeMatcherOption;
            },
            set: function (localeMatcherOption) {
                this._localeMatcherOption = localeMatcherOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "mode", {
            get: function () {
                return this._modeOption;
            },
            set: function (modeOption) {
                this._modeOption = modeOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "currency", {
            get: function () {
                return this._currencyOption;
            },
            set: function (currencyOption) {
                this._currencyOption = currencyOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "currencyDisplay", {
            get: function () {
                return this._currencyDisplayOption;
            },
            set: function (currencyDisplayOption) {
                this._currencyDisplayOption = currencyDisplayOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "useGrouping", {
            get: function () {
                return this._useGroupingOption;
            },
            set: function (useGroupingOption) {
                this._useGroupingOption = useGroupingOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "minFractionDigits", {
            get: function () {
                return this._minFractionDigitsOption;
            },
            set: function (minFractionDigitsOption) {
                this._minFractionDigitsOption = minFractionDigitsOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "maxFractionDigits", {
            get: function () {
                return this._maxFractionDigitsOption;
            },
            set: function (maxFractionDigitsOption) {
                this._maxFractionDigitsOption = maxFractionDigitsOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "prefix", {
            get: function () {
                return this._prefixOption;
            },
            set: function (prefixOption) {
                this._prefixOption = prefixOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "suffix", {
            get: function () {
                return this._suffixOption;
            },
            set: function (suffixOption) {
                this._suffixOption = suffixOption;
                this.updateConstructParser();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputNumber.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                if (disabled)
                    this.focused = false;
                this._disabled = disabled;
                if (this.timer)
                    this.clearTimer();
            },
            enumerable: false,
            configurable: true
        });
        InputNumber.prototype.ngOnInit = function () {
            this.constructParser();
            this.initialized = true;
        };
        InputNumber.prototype.getOptions = function () {
            return {
                localeMatcher: this.localeMatcher,
                style: this.mode,
                currency: this.currency,
                currencyDisplay: this.currencyDisplay,
                useGrouping: this.useGrouping,
                minimumFractionDigits: this.minFractionDigits,
                maximumFractionDigits: this.maxFractionDigits
            };
        };
        InputNumber.prototype.constructParser = function () {
            this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
            var numerals = __spread(new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)).reverse();
            var index = new Map(numerals.map(function (d, i) { return [d, i]; }));
            this._numeral = new RegExp("[" + numerals.join('') + "]", 'g');
            this._decimal = this.getDecimalExpression();
            this._group = this.getGroupingExpression();
            this._minusSign = this.getMinusSignExpression();
            this._currency = this.getCurrencyExpression();
            this._suffix = this.getSuffixExpression();
            this._prefix = this.getPrefixExpression();
            this._index = function (d) { return index.get(d); };
        };
        InputNumber.prototype.updateConstructParser = function () {
            if (this.initialized) {
                this.constructParser();
            }
        };
        InputNumber.prototype.escapeRegExp = function (text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        };
        InputNumber.prototype.getDecimalExpression = function () {
            var formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
            return new RegExp("[" + formatter.format(1.1).trim().replace(this._numeral, '') + "]", 'g');
        };
        InputNumber.prototype.getGroupingExpression = function () {
            var formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
            this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
            return new RegExp("[" + this.groupChar + "]", 'g');
        };
        InputNumber.prototype.getMinusSignExpression = function () {
            var formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
            return new RegExp("[" + formatter.format(-1).trim().replace(this._numeral, '') + "]", 'g');
        };
        InputNumber.prototype.getCurrencyExpression = function () {
            if (this.currency) {
                var formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay });
                return new RegExp("[" + formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._decimal, '').replace(this._group, '') + "]", 'g');
            }
            return new RegExp("[]", 'g');
        };
        InputNumber.prototype.getPrefixExpression = function () {
            if (this.prefix) {
                this.prefixChar = this.prefix;
            }
            else {
                var formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });
                this.prefixChar = formatter.format(1).split('1')[0];
            }
            return new RegExp("" + this.escapeRegExp(this.prefixChar || ''), 'g');
        };
        InputNumber.prototype.getSuffixExpression = function () {
            if (this.suffix) {
                this.suffixChar = this.suffix;
            }
            else {
                var formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay,
                    minimumFractionDigits: 0, maximumFractionDigits: 0 });
                this.suffixChar = formatter.format(1).split('1')[1];
            }
            return new RegExp("" + this.escapeRegExp(this.suffixChar || ''), 'g');
        };
        InputNumber.prototype.formatValue = function (value) {
            if (value != null) {
                if (value === '-') { // Minus sign
                    return value;
                }
                if (this.format) {
                    var formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                    var formattedValue = formatter.format(value);
                    if (this.prefix) {
                        formattedValue = this.prefix + formattedValue;
                    }
                    if (this.suffix) {
                        formattedValue = formattedValue + this.suffix;
                    }
                    return formattedValue;
                }
                return value.toString();
            }
            return '';
        };
        InputNumber.prototype.parseValue = function (text) {
            var filteredText = text
                .replace(this._suffix, '')
                .replace(this._prefix, '')
                .trim()
                .replace(/\s/g, '')
                .replace(this._currency, '')
                .replace(this._group, '')
                .replace(this._minusSign, '-')
                .replace(this._decimal, '.')
                .replace(this._numeral, this._index);
            if (filteredText) {
                if (filteredText === '-') // Minus sign
                    return filteredText;
                var parsedValue = +filteredText;
                return isNaN(parsedValue) ? null : parsedValue;
            }
            return null;
        };
        InputNumber.prototype.repeat = function (event, interval, dir) {
            var _this = this;
            var i = interval || 500;
            this.clearTimer();
            this.timer = setTimeout(function () {
                _this.repeat(event, 40, dir);
            }, i);
            this.spin(event, dir);
        };
        InputNumber.prototype.spin = function (event, dir) {
            var step = this.step * dir;
            var currentValue = this.parseValue(this.input.nativeElement.value) || 0;
            var newValue = this.validateValue(currentValue + step);
            if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
                return;
            }
            this.updateInput(newValue, null, 'spin');
            this.updateModel(event, newValue);
            this.handleOnInput(event, currentValue, newValue);
        };
        InputNumber.prototype.onUpButtonMouseDown = function (event) {
            this.input.nativeElement.focus();
            this.repeat(event, null, 1);
            event.preventDefault();
        };
        InputNumber.prototype.onUpButtonMouseUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onUpButtonMouseLeave = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onUpButtonKeyDown = function (event) {
            if (event.keyCode === 32 || event.keyCode === 13) {
                this.repeat(event, null, 1);
            }
        };
        InputNumber.prototype.onUpButtonKeyUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonMouseDown = function (event) {
            this.input.nativeElement.focus();
            this.repeat(event, null, -1);
            event.preventDefault();
        };
        InputNumber.prototype.onDownButtonMouseUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonMouseLeave = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonKeyUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonKeyDown = function (event) {
            if (event.keyCode === 32 || event.keyCode === 13) {
                this.repeat(event, null, -1);
            }
        };
        InputNumber.prototype.onUserInput = function (event) {
            if (this.isSpecialChar) {
                event.target.value = this.lastValue;
            }
            this.isSpecialChar = false;
        };
        InputNumber.prototype.onInputKeyDown = function (event) {
            this.lastValue = event.target.value;
            if (event.shiftKey || event.altKey) {
                this.isSpecialChar = true;
                return;
            }
            var selectionStart = event.target.selectionStart;
            var selectionEnd = event.target.selectionEnd;
            var inputValue = event.target.value;
            var newValueStr = null;
            if (event.altKey) {
                event.preventDefault();
            }
            switch (event.which) {
                //up
                case 38:
                    this.spin(event, 1);
                    event.preventDefault();
                    break;
                //down
                case 40:
                    this.spin(event, -1);
                    event.preventDefault();
                    break;
                //left
                case 37:
                    if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                        event.preventDefault();
                    }
                    break;
                //right
                case 39:
                    if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                        event.preventDefault();
                    }
                    break;
                //enter
                case 13:
                    var newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
                    this.input.nativeElement.value = this.formatValue(newValue);
                    this.input.nativeElement.setAttribute('aria-valuenow', newValue);
                    this.updateModel(event, newValue);
                    break;
                //backspace
                case 8: {
                    event.preventDefault();
                    if (selectionStart === selectionEnd) {
                        var deleteChar = inputValue.charAt(selectionStart - 1);
                        var decimalCharIndex = inputValue.search(this._decimal);
                        this._decimal.lastIndex = 0;
                        if (this.isNumeralChar(deleteChar)) {
                            if (this._group.test(deleteChar)) {
                                this._group.lastIndex = 0;
                                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                            }
                            else if (this._decimal.test(deleteChar)) {
                                this._decimal.lastIndex = 0;
                                this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            }
                            else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                            }
                            else if (decimalCharIndex > 0 && decimalCharIndex === 1) {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                            }
                        }
                        this.updateValue(event, newValueStr, null, 'delete-single');
                    }
                    else {
                        newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, null, 'delete-range');
                    }
                    break;
                }
                // del
                case 46:
                    event.preventDefault();
                    if (selectionStart === selectionEnd) {
                        var deleteChar = inputValue.charAt(selectionStart);
                        var decimalCharIndex = inputValue.search(this._decimal);
                        this._decimal.lastIndex = 0;
                        if (this.isNumeralChar(deleteChar)) {
                            if (this._group.test(deleteChar)) {
                                this._group.lastIndex = 0;
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                            }
                            else if (this._decimal.test(deleteChar)) {
                                this._decimal.lastIndex = 0;
                                this.input.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
                            }
                            else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                            }
                            else if (decimalCharIndex > 0 && decimalCharIndex === 1) {
                                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                            }
                        }
                        this.updateValue(event, newValueStr, null, 'delete-back-single');
                    }
                    else {
                        newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, null, 'delete-range');
                    }
                    break;
                default:
                    break;
            }
            this.onKeyDown.emit(event);
        };
        InputNumber.prototype.onInputKeyPress = function (event) {
            event.preventDefault();
            var code = event.which || event.keyCode;
            var char = String.fromCharCode(code);
            var isDecimalSign = this.isDecimalSign(char);
            var isMinusSign = this.isMinusSign(char);
            if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
                this.insert(event, char, { isDecimalSign: isDecimalSign, isMinusSign: isMinusSign });
            }
        };
        InputNumber.prototype.onPaste = function (event) {
            if (!this.disabled) {
                event.preventDefault();
                var data = (event.clipboardData || window['clipboardData']).getData('Text');
                if (data) {
                    var filteredData = this.parseValue(data);
                    if (filteredData != null) {
                        this.insert(event, filteredData.toString());
                    }
                }
            }
        };
        InputNumber.prototype.isMinusSign = function (char) {
            if (this._minusSign.test(char)) {
                this._minusSign.lastIndex = 0;
                return true;
            }
            return false;
        };
        InputNumber.prototype.isDecimalSign = function (char) {
            if (this._decimal.test(char)) {
                this._decimal.lastIndex = 0;
                return true;
            }
            return false;
        };
        InputNumber.prototype.insert = function (event, text, sign) {
            if (sign === void 0) { sign = { isDecimalSign: false, isMinusSign: false }; }
            var selectionStart = this.input.nativeElement.selectionStart;
            var selectionEnd = this.input.nativeElement.selectionEnd;
            var inputValue = this.input.nativeElement.value.trim();
            var decimalCharIndex = inputValue.search(this._decimal);
            this._decimal.lastIndex = 0;
            var minusCharIndex = inputValue.search(this._minusSign);
            this._minusSign.lastIndex = 0;
            var newValueStr;
            if (sign.isMinusSign) {
                if (selectionStart === 0) {
                    newValueStr = inputValue;
                    if (minusCharIndex === -1 || selectionEnd !== 0) {
                        newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                    }
                    this.updateValue(event, newValueStr, text, 'insert');
                }
            }
            else if (sign.isDecimalSign) {
                if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                    this.updateValue(event, inputValue, text, 'insert');
                }
                else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                    newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, text, 'insert');
                }
            }
            else {
                var maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
                var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
                if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                    if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                        newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length);
                        this.updateValue(event, newValueStr, text, operation);
                    }
                }
                else {
                    newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, text, operation);
                }
            }
        };
        InputNumber.prototype.insertText = function (value, text, start, end) {
            var textSplit = text.split('.');
            if (textSplit.length == 2) {
                var decimalCharIndex = value.slice(start, end).search(this._decimal);
                this._decimal.lastIndex = 0;
                return (decimalCharIndex > 0) ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : (value || this.formatValue(text));
            }
            else if ((end - start) === value.length) {
                return this.formatValue(text);
            }
            else if (start === 0) {
                return text + value.slice(end);
            }
            else if (end === value.length) {
                return value.slice(0, start) + text;
            }
            else {
                return value.slice(0, start) + text + value.slice(end);
            }
        };
        InputNumber.prototype.deleteRange = function (value, start, end) {
            var newValueStr;
            if ((end - start) === value.length)
                newValueStr = '';
            else if (start === 0)
                newValueStr = value.slice(end);
            else if (end === value.length)
                newValueStr = value.slice(0, start);
            else
                newValueStr = value.slice(0, start) + value.slice(end);
            return newValueStr;
        };
        InputNumber.prototype.initCursor = function () {
            var selectionStart = this.input.nativeElement.selectionStart;
            var inputValue = this.input.nativeElement.value;
            var valueLength = inputValue.length;
            var index = null;
            var char = inputValue.charAt(selectionStart);
            if (this.isNumeralChar(char)) {
                return;
            }
            //left
            var i = selectionStart - 1;
            while (i >= 0) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i;
                    break;
                }
                else {
                    i--;
                }
            }
            if (index !== null) {
                this.input.nativeElement.setSelectionRange(index + 1, index + 1);
            }
            else {
                i = selectionStart + 1;
                while (i < valueLength) {
                    char = inputValue.charAt(i);
                    if (this.isNumeralChar(char)) {
                        index = i;
                        break;
                    }
                    else {
                        i++;
                    }
                }
                if (index !== null) {
                    this.input.nativeElement.setSelectionRange(index, index);
                }
            }
        };
        InputNumber.prototype.onInputClick = function () {
            this.initCursor();
        };
        InputNumber.prototype.isNumeralChar = function (char) {
            if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
                this.resetRegex();
                return true;
            }
            return false;
        };
        InputNumber.prototype.resetRegex = function () {
            this._numeral.lastIndex = 0;
            this._decimal.lastIndex = 0;
            this._group.lastIndex = 0;
            this._minusSign.lastIndex = 0;
        };
        InputNumber.prototype.updateValue = function (event, valueStr, insertedValueStr, operation) {
            var currentValue = this.input.nativeElement.value;
            var newValue = null;
            if (valueStr != null) {
                newValue = this.parseValue(valueStr);
                this.updateInput(newValue, insertedValueStr, operation);
            }
            this.handleOnInput(event, currentValue, newValue);
        };
        InputNumber.prototype.handleOnInput = function (event, currentValue, newValue) {
            if (this.isValueChanged(currentValue, newValue)) {
                this.onInput.emit({ originalEvent: event, value: newValue });
            }
        };
        InputNumber.prototype.isValueChanged = function (currentValue, newValue) {
            if (newValue === null && currentValue !== null) {
                return true;
            }
            if (newValue != null) {
                var parsedCurrentValue = (typeof currentValue === 'string') ? this.parseValue(currentValue) : currentValue;
                return newValue !== parsedCurrentValue;
            }
            return false;
        };
        InputNumber.prototype.validateValue = function (value) {
            if (this.min !== null && value < this.min) {
                return this.min;
            }
            if (this.max !== null && value > this.max) {
                return this.max;
            }
            if (value === '-') { // Minus sign
                return null;
            }
            return value;
        };
        InputNumber.prototype.updateInput = function (value, insertedValueStr, operation) {
            insertedValueStr = insertedValueStr || '';
            var inputValue = this.input.nativeElement.value;
            var newValue = this.formatValue(value);
            var currentLength = inputValue.length;
            if (currentLength === 0) {
                this.input.nativeElement.value = newValue;
                this.input.nativeElement.setSelectionRange(0, 0);
                this.initCursor();
                var prefixLength = (this.prefixChar || '').length;
                var selectionEnd = prefixLength + insertedValueStr.length;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else {
                var selectionStart = this.input.nativeElement.selectionStart;
                var selectionEnd = this.input.nativeElement.selectionEnd;
                if (this.maxlength && this.maxlength < newValue.length) {
                    return;
                }
                this.input.nativeElement.value = newValue;
                var newLength = newValue.length;
                if (operation === 'range-insert') {
                    var startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                    var startValueStr = startValue !== null ? startValue.toString() : '';
                    var startExpr = startValueStr.split('').join("(" + this.groupChar + ")?");
                    var sRegex = new RegExp(startExpr, 'g');
                    sRegex.test(newValue);
                    var tExpr = insertedValueStr.split('').join("(" + this.groupChar + ")?");
                    var tRegex = new RegExp(tExpr, 'g');
                    tRegex.test(newValue.slice(sRegex.lastIndex));
                    selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
                else if (newLength === currentLength) {
                    if (operation === 'insert' || operation === 'delete-back-single')
                        this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                    else if (operation === 'delete-single')
                        this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                    else if (operation === 'delete-range' || operation === 'spin')
                        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
                else if (operation === 'delete-back-single') {
                    var prevChar = inputValue.charAt(selectionEnd - 1);
                    var nextChar = inputValue.charAt(selectionEnd);
                    var diff = currentLength - newLength;
                    var isGroupChar = this._group.test(nextChar);
                    if (isGroupChar && diff === 1) {
                        selectionEnd += 1;
                    }
                    else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                        selectionEnd += (-1 * diff) + 1;
                    }
                    this._group.lastIndex = 0;
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
                else {
                    selectionEnd = selectionEnd + (newLength - currentLength);
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
            }
            this.input.nativeElement.setAttribute('aria-valuenow', value);
        };
        InputNumber.prototype.onInputFocus = function (event) {
            this.focused = true;
            this.onFocus.emit(event);
        };
        InputNumber.prototype.onInputBlur = function (event) {
            this.focused = false;
            var newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
            this.input.nativeElement.value = this.formatValue(newValue);
            this.input.nativeElement.setAttribute('aria-valuenow', newValue);
            this.updateModel(event, newValue);
            this.onBlur.emit(event);
        };
        InputNumber.prototype.formattedValue = function () {
            return this.formatValue(this.value);
        };
        InputNumber.prototype.updateModel = function (event, value) {
            if (this.value !== value) {
                this.value = value;
                this.onModelChange(value);
            }
            this.onModelTouched();
        };
        InputNumber.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        InputNumber.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        InputNumber.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        InputNumber.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Object.defineProperty(InputNumber.prototype, "filled", {
            get: function () {
                return (this.value != null && this.value.toString().length > 0);
            },
            enumerable: false,
            configurable: true
        });
        InputNumber.prototype.clearTimer = function () {
            if (this.timer) {
                clearInterval(this.timer);
            }
        };
        return InputNumber;
    }());
    InputNumber.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-inputNumber',
                    template: "\n        <span [ngClass]=\"{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',\n                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}\"\n                [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input #input [ngClass]=\"'p-inputnumber-input'\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" pInputText [value]=\"formattedValue()\" [attr.placeholder]=\"placeholder\" [attr.title]=\"title\" [attr.id]=\"inputId\"\n                [attr.size]=\"size\" [attr.name]=\"name\" [attr.autocomplete]=\"autocomplete\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.aria-label]=\"ariaLabel\"\n                [attr.aria-required]=\"ariaRequired\" [disabled]=\"disabled\" [attr.required]=\"required\" [attr.aria-valuemin]=\"min\" [attr.aria-valuemax]=\"max\"\n                (input)=\"onUserInput($event)\" (keydown)=\"onInputKeyDown($event)\" (keypress)=\"onInputKeyPress($event)\" (paste)=\"onPaste($event)\" (click)=\"onInputClick()\"\n                (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <span class=\"p-inputnumber-button-group\" *ngIf=\"showButtons && buttonLayout === 'stacked'\">\n                <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n                <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n            </span>\n            <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n            <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n        </span>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [INPUTNUMBER_VALUE_ACCESSOR],
                    encapsulation: core.ViewEncapsulation.None,
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused'
                    },
                    styles: [".p-inputnumber{display:inline-flex}.p-inputnumber-button{align-items:center;display:flex;flex:0 0 auto;justify-content:center}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-bottom-right-radius:0;border-top-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-bottom-left-radius:0;border-top-left-radius:0;border-top-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{border-bottom-left-radius:0;border-top-left-radius:0;order:3}.p-inputnumber-buttons-horizontal .p-inputnumber-input{border-radius:0;order:2}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{border-bottom-right-radius:0;border-top-right-radius:0;order:1}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{border-bottom-left-radius:0;border-bottom-right-radius:0;order:1;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{border-radius:0;order:2;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;order:3;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid .p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}"]
                },] }
    ];
    InputNumber.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    InputNumber.propDecorators = {
        showButtons: [{ type: core.Input }],
        format: [{ type: core.Input }],
        buttonLayout: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        size: [{ type: core.Input }],
        maxlength: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        title: [{ type: core.Input }],
        ariaLabel: [{ type: core.Input }],
        ariaRequired: [{ type: core.Input }],
        name: [{ type: core.Input }],
        required: [{ type: core.Input }],
        autocomplete: [{ type: core.Input }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        incrementButtonClass: [{ type: core.Input }],
        decrementButtonClass: [{ type: core.Input }],
        incrementButtonIcon: [{ type: core.Input }],
        decrementButtonIcon: [{ type: core.Input }],
        step: [{ type: core.Input }],
        inputStyle: [{ type: core.Input }],
        inputStyleClass: [{ type: core.Input }],
        input: [{ type: core.ViewChild, args: ['input',] }],
        onInput: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        onKeyDown: [{ type: core.Output }],
        locale: [{ type: core.Input }],
        localeMatcher: [{ type: core.Input }],
        mode: [{ type: core.Input }],
        currency: [{ type: core.Input }],
        currencyDisplay: [{ type: core.Input }],
        useGrouping: [{ type: core.Input }],
        minFractionDigits: [{ type: core.Input }],
        maxFractionDigits: [{ type: core.Input }],
        prefix: [{ type: core.Input }],
        suffix: [{ type: core.Input }],
        disabled: [{ type: core.Input }]
    };
    var InputNumberModule = /** @class */ (function () {
        function InputNumberModule() {
        }
        return InputNumberModule;
    }());
    InputNumberModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, inputtext.InputTextModule, button.ButtonModule],
                    exports: [InputNumber],
                    declarations: [InputNumber]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.INPUTNUMBER_VALUE_ACCESSOR = INPUTNUMBER_VALUE_ACCESSOR;
    exports.InputNumber = InputNumber;
    exports.InputNumberModule = InputNumberModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputnumber.umd.js.map
