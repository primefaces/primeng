(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/scrolling'), require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api'), require('primeng/dom'), require('primeng/utils'), require('@angular/forms'), require('primeng/tooltip'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/dropdown', ['exports', '@angular/cdk/scrolling', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api', 'primeng/dom', 'primeng/utils', '@angular/forms', 'primeng/tooltip', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dropdown = {}), global.ng.cdk.scrolling, global.ng.core, global.ng.animations, global.ng.common, global.primeng.api, global.primeng.dom, global.primeng.utils, global.ng.forms, global.primeng.tooltip, global.primeng.ripple));
}(this, (function (exports, scrolling, core, animations, common, api, dom, utils, forms, tooltip, ripple) { 'use strict';

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

    var DROPDOWN_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Dropdown; }),
        multi: true
    };
    var DropdownItem = /** @class */ (function () {
        function DropdownItem() {
            this.onClick = new core.EventEmitter();
        }
        DropdownItem.prototype.onOptionClick = function (event) {
            this.onClick.emit({
                originalEvent: event,
                option: this.option
            });
        };
        return DropdownItem;
    }());
    DropdownItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-dropdownItem',
                    template: "\n        <li (click)=\"onOptionClick($event)\" role=\"option\" pRipple\n            [attr.aria-label]=\"label\" [attr.aria-selected]=\"selected\"\n            [ngStyle]=\"{'height': itemSize + 'px'}\"\n            [ngClass]=\"{'p-dropdown-item':true, 'p-highlight': selected, 'p-disabled': disabled}\">\n            <span *ngIf=\"!template\">{{label||'empty'}}</span>\n            <ng-container *ngTemplateOutlet=\"template; context: {$implicit: option}\"></ng-container>\n        </li>\n    "
                },] }
    ];
    DropdownItem.propDecorators = {
        option: [{ type: core.Input }],
        selected: [{ type: core.Input }],
        label: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        visible: [{ type: core.Input }],
        itemSize: [{ type: core.Input }],
        template: [{ type: core.Input }],
        onClick: [{ type: core.Output }]
    };
    var Dropdown = /** @class */ (function () {
        function Dropdown(el, renderer, cd, zone, filterService, config) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.filterService = filterService;
            this.config = config;
            this.scrollHeight = '200px';
            this.resetFilterOnHide = false;
            this.dropdownIcon = 'pi pi-chevron-down';
            this.optionGroupChildren = "items";
            this.autoDisplayFirst = true;
            this.emptyFilterMessage = '';
            this.emptyMessage = '';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.filterMatchMode = "contains";
            this.tooltip = '';
            this.tooltipPosition = 'right';
            this.tooltipPositionStyle = 'absolute';
            this.autofocusFilter = true;
            this.onChange = new core.EventEmitter();
            this.onFilter = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onClick = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.viewPortOffsetTop = 0;
        }
        Object.defineProperty(Dropdown.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (_disabled) {
                if (_disabled) {
                    this.focused = false;
                    if (this.overlayVisible)
                        this.hide();
                }
                this._disabled = _disabled;
                if (!this.cd.destroyed) {
                    this.cd.detectChanges();
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Dropdown.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'selectedItem':
                        _this.selectedItemTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    case 'emptyfilter':
                        _this.emptyFilterTemplate = item.template;
                        break;
                    case 'empty':
                        _this.emptyTemplate = item.template;
                        break;
                    case 'group':
                        _this.groupTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        Dropdown.prototype.ngOnInit = function () {
            this.optionsToDisplay = this.options;
            this.updateSelectedOption(null);
        };
        Object.defineProperty(Dropdown.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (val) {
                this._options = val;
                this.optionsToDisplay = this._options;
                this.updateSelectedOption(this.value);
                this.optionsChanged = true;
                if (this._filterValue && this._filterValue.length) {
                    this.activateFilter();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown.prototype, "filterValue", {
            get: function () {
                return this._filterValue;
            },
            set: function (val) {
                this._filterValue = val;
                this.activateFilter();
            },
            enumerable: false,
            configurable: true
        });
        Dropdown.prototype.ngAfterViewInit = function () {
            if (this.editable) {
                this.updateEditableLabel();
            }
        };
        Object.defineProperty(Dropdown.prototype, "label", {
            get: function () {
                return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown.prototype, "emptyMessageLabel", {
            get: function () {
                return this.emptyMessage || this.config.getTranslation(api.TranslationKeys.EMPTY_MESSAGE);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown.prototype, "emptyFilterMessageLabel", {
            get: function () {
                return this.emptyFilterMessage || this.config.getTranslation(api.TranslationKeys.EMPTY_FILTER_MESSAGE);
            },
            enumerable: false,
            configurable: true
        });
        Dropdown.prototype.updateEditableLabel = function () {
            if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
                this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.getOptionLabel(this.selectedOption) : this.value || '');
            }
        };
        Dropdown.prototype.getOptionLabel = function (option) {
            return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
        };
        Dropdown.prototype.getOptionValue = function (option) {
            return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
        };
        Dropdown.prototype.isOptionDisabled = function (option) {
            return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
        };
        Dropdown.prototype.getOptionGroupLabel = function (optionGroup) {
            return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
        };
        Dropdown.prototype.getOptionGroupChildren = function (optionGroup) {
            return this.optionGroupChildren ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
        };
        Dropdown.prototype.onItemClick = function (event) {
            var _this = this;
            var option = event.option;
            if (!this.isOptionDisabled(option)) {
                this.selectItem(event, option);
                this.accessibleViewChild.nativeElement.focus();
            }
            setTimeout(function () {
                _this.hide();
            }, 150);
        };
        Dropdown.prototype.selectItem = function (event, option) {
            var _this = this;
            if (this.selectedOption != option) {
                this.selectedOption = option;
                this.value = this.getOptionValue(option);
                this.onModelChange(this.value);
                this.updateEditableLabel();
                this.onChange.emit({
                    originalEvent: event.originalEvent,
                    value: this.value
                });
                if (this.virtualScroll) {
                    setTimeout(function () {
                        _this.viewPortOffsetTop = _this.viewPort ? _this.viewPort.measureScrollOffset() : 0;
                    }, 1);
                }
            }
        };
        Dropdown.prototype.ngAfterViewChecked = function () {
            var _this = this;
            if (this.optionsChanged && this.overlayVisible) {
                this.optionsChanged = false;
                if (this.virtualScroll) {
                    this.updateVirtualScrollSelectedIndex(true);
                }
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.alignOverlay();
                    }, 1);
                });
            }
            if (this.selectedOptionUpdated && this.itemsWrapper) {
                if (this.virtualScroll && this.viewPort) {
                    var range = this.viewPort.getRenderedRange();
                    this.updateVirtualScrollSelectedIndex(false);
                    if (range.start > this.virtualScrollSelectedIndex || range.end < this.virtualScrollSelectedIndex) {
                        this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
                    }
                }
                var selectedItem = dom.DomHandler.findSingle(this.overlay, 'li.p-highlight');
                if (selectedItem) {
                    dom.DomHandler.scrollInView(this.itemsWrapper, dom.DomHandler.findSingle(this.overlay, 'li.p-highlight'));
                }
                this.selectedOptionUpdated = false;
            }
        };
        Dropdown.prototype.writeValue = function (value) {
            if (this.filter) {
                this.resetFilter();
            }
            this.value = value;
            this.updateSelectedOption(value);
            this.updateEditableLabel();
            this.cd.markForCheck();
        };
        Dropdown.prototype.resetFilter = function () {
            this._filterValue = null;
            if (this.filterViewChild && this.filterViewChild.nativeElement) {
                this.filterViewChild.nativeElement.value = '';
            }
            this.optionsToDisplay = this.options;
        };
        Dropdown.prototype.updateSelectedOption = function (val) {
            this.selectedOption = this.findOption(val, this.optionsToDisplay);
            if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
                this.selectedOption = this.optionsToDisplay[0];
            }
            this.selectedOptionUpdated = true;
        };
        Dropdown.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Dropdown.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Dropdown.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Dropdown.prototype.onMouseclick = function (event) {
            if (this.disabled || this.readonly || this.isInputClick(event)) {
                return;
            }
            this.onClick.emit(event);
            this.accessibleViewChild.nativeElement.focus();
            if (this.overlayVisible)
                this.hide();
            else
                this.show();
            this.cd.detectChanges();
        };
        Dropdown.prototype.isInputClick = function (event) {
            return dom.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') ||
                event.target.isSameNode(this.accessibleViewChild.nativeElement) ||
                (this.editableInputViewChild && event.target.isSameNode(this.editableInputViewChild.nativeElement));
        };
        Dropdown.prototype.isOutsideClicked = function (event) {
            return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
        };
        Dropdown.prototype.isEmpty = function () {
            return !this.optionsToDisplay || (this.optionsToDisplay && this.optionsToDisplay.length === 0);
        };
        Dropdown.prototype.onEditableInputClick = function () {
            this.bindDocumentClickListener();
        };
        Dropdown.prototype.onEditableInputFocus = function (event) {
            this.focused = true;
            this.hide();
            this.onFocus.emit(event);
        };
        Dropdown.prototype.onEditableInputChange = function (event) {
            this.value = event.target.value;
            this.updateSelectedOption(this.value);
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        };
        Dropdown.prototype.show = function () {
            this.overlayVisible = true;
        };
        Dropdown.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.overlay = event.element;
                    var itemsWrapperSelector = this.virtualScroll ? '.cdk-virtual-scroll-viewport' : '.p-dropdown-items-wrapper';
                    this.itemsWrapper = dom.DomHandler.findSingle(this.overlay, itemsWrapperSelector);
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                    if (this.options && this.options.length) {
                        if (!this.virtualScroll) {
                            var selectedListItem = dom.DomHandler.findSingle(this.itemsWrapper, '.p-dropdown-item.p-highlight');
                            if (selectedListItem) {
                                dom.DomHandler.scrollInView(this.itemsWrapper, selectedListItem);
                            }
                        }
                    }
                    if (this.filterViewChild && this.filterViewChild.nativeElement) {
                        this.preventModelTouched = true;
                        if (this.autofocusFilter) {
                            this.filterViewChild.nativeElement.focus();
                        }
                    }
                    this.onShow.emit(event);
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onHide.emit(event);
                    break;
            }
        };
        Dropdown.prototype.scrollToSelectedVirtualScrollElement = function () {
            if (!this.virtualAutoScrolled) {
                if (this.viewPortOffsetTop) {
                    this.viewPort.scrollToOffset(this.viewPortOffsetTop);
                }
                else if (this.virtualScrollSelectedIndex > -1) {
                    this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
                }
            }
            this.virtualAutoScrolled = true;
        };
        Dropdown.prototype.updateVirtualScrollSelectedIndex = function (resetOffset) {
            if (this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
                if (resetOffset) {
                    this.viewPortOffsetTop = 0;
                }
                this.virtualScrollSelectedIndex = this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay);
            }
        };
        Dropdown.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
                if (!this.overlay.style.minWidth) {
                    this.overlay.style.minWidth = dom.DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
                }
            }
        };
        Dropdown.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        Dropdown.prototype.hide = function () {
            this.overlayVisible = false;
            if (this.filter && this.resetFilterOnHide) {
                this.resetFilter();
            }
            if (this.virtualScroll) {
                this.virtualAutoScrolled = false;
            }
            this.cd.markForCheck();
        };
        Dropdown.prototype.alignOverlay = function () {
            if (this.overlay) {
                if (this.appendTo)
                    dom.DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
            }
        };
        Dropdown.prototype.onInputFocus = function (event) {
            this.focused = true;
            this.onFocus.emit(event);
        };
        Dropdown.prototype.onInputBlur = function (event) {
            this.focused = false;
            this.onBlur.emit(event);
            if (!this.preventModelTouched) {
                this.onModelTouched();
            }
            this.preventModelTouched = false;
        };
        Dropdown.prototype.findPrevEnabledOption = function (index) {
            var prevEnabledOption;
            if (this.optionsToDisplay && this.optionsToDisplay.length) {
                for (var i = (index - 1); 0 <= i; i--) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
                if (!prevEnabledOption) {
                    for (var i = this.optionsToDisplay.length - 1; i >= index; i--) {
                        var option = this.optionsToDisplay[i];
                        if (this.isOptionDisabled(option)) {
                            continue;
                        }
                        else {
                            prevEnabledOption = option;
                            break;
                        }
                    }
                }
            }
            return prevEnabledOption;
        };
        Dropdown.prototype.findNextEnabledOption = function (index) {
            var nextEnabledOption;
            if (this.optionsToDisplay && this.optionsToDisplay.length) {
                for (var i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
                    var option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
                if (!nextEnabledOption) {
                    for (var i = 0; i < index; i++) {
                        var option = this.optionsToDisplay[i];
                        if (this.isOptionDisabled(option)) {
                            continue;
                        }
                        else {
                            nextEnabledOption = option;
                            break;
                        }
                    }
                }
            }
            return nextEnabledOption;
        };
        Dropdown.prototype.onKeydown = function (event, search) {
            if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
                return;
            }
            switch (event.which) {
                //down
                case 40:
                    if (!this.overlayVisible && event.altKey) {
                        this.show();
                    }
                    else {
                        if (this.group) {
                            var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                            if (selectedItemIndex !== -1) {
                                var nextItemIndex = selectedItemIndex.itemIndex + 1;
                                if (nextItemIndex < (this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex]).length)) {
                                    this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[nextItemIndex]);
                                    this.selectedOptionUpdated = true;
                                }
                                else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                    this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex + 1])[0]);
                                    this.selectedOptionUpdated = true;
                                }
                            }
                            else {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[0])[0]);
                            }
                        }
                        else {
                            var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                            var nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                            if (nextEnabledOption) {
                                this.selectItem(event, nextEnabledOption);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    if (this.group) {
                        var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                        if (selectedItemIndex !== -1) {
                            var prevItemIndex = selectedItemIndex.itemIndex - 1;
                            if (prevItemIndex >= 0) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[prevItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (prevItemIndex < 0) {
                                var prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                                if (prevGroup) {
                                    this.selectItem(event, this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1]);
                                    this.selectedOptionUpdated = true;
                                }
                            }
                        }
                    }
                    else {
                        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                        var prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                        if (prevEnabledOption) {
                            this.selectItem(event, prevEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                    event.preventDefault();
                    break;
                //space
                case 32:
                case 32:
                    if (!this.overlayVisible) {
                        this.show();
                        event.preventDefault();
                    }
                    break;
                //enter
                case 13:
                    if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                        this.hide();
                    }
                    event.preventDefault();
                    break;
                //escape and tab
                case 27:
                case 9:
                    this.hide();
                    break;
                //search item based on keyboard input
                default:
                    if (search && !event.metaKey) {
                        this.search(event);
                    }
                    break;
            }
        };
        Dropdown.prototype.search = function (event) {
            var _this = this;
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            var char = event.key;
            this.previousSearchChar = this.currentSearchChar;
            this.currentSearchChar = char;
            if (this.previousSearchChar === this.currentSearchChar)
                this.searchValue = this.currentSearchChar;
            else
                this.searchValue = this.searchValue ? this.searchValue + char : char;
            var newOption;
            if (this.group) {
                var searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : { groupIndex: 0, itemIndex: 0 };
                newOption = this.searchOptionWithinGroup(searchIndex);
            }
            else {
                var searchIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                newOption = this.searchOption(++searchIndex);
            }
            if (newOption && !this.isOptionDisabled(newOption)) {
                this.selectItem(event, newOption);
                this.selectedOptionUpdated = true;
            }
            this.searchTimeout = setTimeout(function () {
                _this.searchValue = null;
            }, 250);
        };
        Dropdown.prototype.searchOption = function (index) {
            var option;
            if (this.searchValue) {
                option = this.searchOptionInRange(index, this.optionsToDisplay.length);
                if (!option) {
                    option = this.searchOptionInRange(0, index);
                }
            }
            return option;
        };
        Dropdown.prototype.searchOptionInRange = function (start, end) {
            for (var i = start; i < end; i++) {
                var opt = this.optionsToDisplay[i];
                if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                    return opt;
                }
            }
            return null;
        };
        Dropdown.prototype.searchOptionWithinGroup = function (index) {
            var option;
            if (this.searchValue) {
                for (var i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                    for (var j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.getOptionGroupChildren(this.optionsToDisplay[i]).length; j++) {
                        var opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                        if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                            return opt;
                        }
                    }
                }
                if (!option) {
                    for (var i = 0; i <= index.groupIndex; i++) {
                        for (var j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.getOptionGroupChildren(this.optionsToDisplay[i]).length); j++) {
                            var opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                            if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                                return opt;
                            }
                        }
                    }
                }
            }
            return null;
        };
        Dropdown.prototype.findOptionIndex = function (val, opts) {
            var index = -1;
            if (opts) {
                for (var i = 0; i < opts.length; i++) {
                    if ((val == null && this.getOptionValue(opts[i]) == null) || utils.ObjectUtils.equals(val, this.getOptionValue(opts[i]), this.dataKey)) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        Dropdown.prototype.findOptionGroupIndex = function (val, opts) {
            var groupIndex, itemIndex;
            if (opts) {
                for (var i = 0; i < opts.length; i++) {
                    groupIndex = i;
                    itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));
                    if (itemIndex !== -1) {
                        break;
                    }
                }
            }
            if (itemIndex !== -1) {
                return { groupIndex: groupIndex, itemIndex: itemIndex };
            }
            else {
                return -1;
            }
        };
        Dropdown.prototype.findOption = function (val, opts, inGroup) {
            var e_1, _a;
            if (this.group && !inGroup) {
                var opt = void 0;
                if (opts && opts.length) {
                    try {
                        for (var opts_1 = __values(opts), opts_1_1 = opts_1.next(); !opts_1_1.done; opts_1_1 = opts_1.next()) {
                            var optgroup = opts_1_1.value;
                            opt = this.findOption(val, this.getOptionGroupChildren(optgroup), true);
                            if (opt) {
                                break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (opts_1_1 && !opts_1_1.done && (_a = opts_1.return)) _a.call(opts_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                return opt;
            }
            else {
                var index = this.findOptionIndex(val, opts);
                return (index != -1) ? opts[index] : null;
            }
        };
        Dropdown.prototype.onFilterInputChange = function (event) {
            var inputValue = event.target.value;
            if (inputValue && inputValue.length) {
                this._filterValue = inputValue;
                this.activateFilter();
            }
            else {
                this._filterValue = null;
                this.optionsToDisplay = this.options;
            }
            this.optionsChanged = true;
            this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
        };
        Dropdown.prototype.activateFilter = function () {
            var e_2, _a, _b;
            var searchFields = (this.filterBy || this.optionLabel || 'label').split(',');
            if (this.options && this.options.length) {
                if (this.group) {
                    var filteredGroups = [];
                    try {
                        for (var _c = __values(this.options), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var optgroup = _d.value;
                            var filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                            if (filteredSubOptions && filteredSubOptions.length) {
                                filteredGroups.push(Object.assign(Object.assign({}, optgroup), (_b = {}, _b[this.optionGroupChildren] = filteredSubOptions, _b)));
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    this.optionsToDisplay = filteredGroups;
                }
                else {
                    this.optionsToDisplay = this.filterService.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                }
                this.optionsChanged = true;
            }
        };
        Dropdown.prototype.applyFocus = function () {
            if (this.editable)
                dom.DomHandler.findSingle(this.el.nativeElement, '.p-dropdown-label.p-inputtext').focus();
            else
                dom.DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
        };
        Dropdown.prototype.focus = function () {
            this.applyFocus();
        };
        Dropdown.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function (event) {
                    if (_this.isOutsideClicked(event)) {
                        _this.hide();
                        _this.unbindDocumentClickListener();
                    }
                    _this.cd.markForCheck();
                });
            }
        };
        Dropdown.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        Dropdown.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        Dropdown.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        Dropdown.prototype.onWindowResize = function () {
            if (!dom.DomHandler.isAndroid()) {
                this.hide();
            }
        };
        Dropdown.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, function (event) {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        Dropdown.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        Dropdown.prototype.clear = function (event) {
            this.value = null;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
            this.updateSelectedOption(this.value);
            this.updateEditableLabel();
        };
        Dropdown.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.overlay = null;
            this.itemsWrapper = null;
            this.onModelTouched();
        };
        Dropdown.prototype.ngOnDestroy = function () {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        return Dropdown;
    }());
    Dropdown.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-dropdown',
                    template: "\n         <div #container [ngClass]=\"{'p-dropdown p-component':true,\n            'p-disabled':disabled, 'p-dropdown-open':overlayVisible, 'p-focus':focused, 'p-dropdown-clearable': showClear && !disabled}\"\n            (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-hidden-accessible\">\n                <input #in [attr.id]=\"inputId\" type=\"text\" readonly (focus)=\"onInputFocus($event)\" aria-haspopup=\"listbox\"\n                    aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\" [attr.aria-labelledby]=\"ariaLabelledBy\" (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\"\n                    [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n            </div>\n            <span [ngClass]=\"{'p-dropdown-label p-inputtext':true,'p-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\" [pTooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" [positionStyle]=\"tooltipPositionStyle\" [tooltipStyleClass]=\"tooltipStyleClass\">\n                <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n                <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n            </span>\n            <span [ngClass]=\"{'p-dropdown-label p-inputtext p-placeholder':true,'p-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</span>\n            <input #editableInput type=\"text\" [attr.maxlength]=\"maxlength\" class=\"p-dropdown-label p-inputtext\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n                aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\" (click)=\"onEditableInputClick()\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <i class=\"p-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n            <div class=\"p-dropdown-trigger\" role=\"button\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\">\n                <span class=\"p-dropdown-trigger-icon\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div *ngIf=\"overlayVisible\" [ngClass]=\"'p-dropdown-panel p-component'\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <div class=\"p-dropdown-header\" *ngIf=\"filter\" >\n                    <div class=\"p-dropdown-filter-container\" (click)=\"$event.stopPropagation()\">\n                        <input #filter type=\"text\" autocomplete=\"off\" [value]=\"filterValue||''\" class=\"p-dropdown-filter p-inputtext p-component\" [attr.placeholder]=\"filterPlaceholder\"\n                        (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event, false)\" (input)=\"onFilterInputChange($event)\" [attr.aria-label]=\"ariaFilterLabel\">\n                        <span class=\"p-dropdown-filter-icon pi pi-search\"></span>\n                    </div>\n                </div>\n                <div class=\"p-dropdown-items-wrapper\" [style.max-height]=\"virtualScroll ? 'auto' : (scrollHeight||'auto')\">\n                    <ul class=\"p-dropdown-items\" [ngClass]=\"{'p-dropdown-virtualscroll': virtualScroll}\" role=\"listbox\">\n                        <ng-container *ngIf=\"group\">\n                            <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n                                <li class=\"p-dropdown-item-group\">\n                                    <span *ngIf=\"!groupTemplate\">{{getOptionGroupLabel(optgroup)||'empty'}}</span>\n                                    <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                                </li>\n                                <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: getOptionGroupChildren(optgroup), selectedOption: selectedOption}\"></ng-container>\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n                        </ng-container>\n                        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n                            <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n                                <ng-template ngFor let-option let-i=\"index\" [ngForOf]=\"options\">\n                                    <p-dropdownItem [option]=\"option\" [selected]=\"selectedOption == option\" [label]=\"getOptionLabel(option)\" [disabled]=\"isOptionDisabled(option)\"\n                                                    (onClick)=\"onItemClick($event)\"\n                                                    [template]=\"itemTemplate\"></p-dropdownItem>\n                                </ng-template>\n                            </ng-container>\n                            <ng-template #virtualScrollList>\n                                <cdk-virtual-scroll-viewport (scrolledIndexChange)=\"scrollToSelectedVirtualScrollElement()\" #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll && optionsToDisplay && optionsToDisplay.length\">\n                                    <ng-container *cdkVirtualFor=\"let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">\n                                        <p-dropdownItem [option]=\"option\" [selected]=\"selectedOption == option\" [label]=\"getOptionLabel(option)\" [disabled]=\"isOptionDisabled(option)\"\n                                                                   (onClick)=\"onItemClick($event)\"\n                                                                   [template]=\"itemTemplate\"></p-dropdownItem>\n                                    </ng-container>\n                                </cdk-virtual-scroll-viewport>\n                            </ng-template>\n                        </ng-template>\n                        <li *ngIf=\"filterValue && isEmpty()\" class=\"p-dropdown-empty-message\">\n                            <ng-container *ngIf=\"!emptyFilterTemplate && !emptyTemplate; else emptyFilter\">\n                                {{emptyFilterMessageLabel}}\n                            </ng-container>\n                            <ng-container #emptyFilter *ngTemplateOutlet=\"emptyFilterTemplate || emptyTemplate\"></ng-container>\n                        </li>\n                        <li *ngIf=\"!filterValue && isEmpty()\" class=\"p-dropdown-empty-message\">\n                            <ng-container *ngIf=\"!emptyTemplate; else empty\">\n                                {{emptyMessageLabel}}\n                            </ng-container>\n                            <ng-container #empty *ngTemplateOutlet=\"emptyTemplate\"></ng-container>\n                        </li>\n                    </ul>\n                </div>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
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
                        '[class.p-inputwrapper-filled]': 'value',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                    },
                    providers: [DROPDOWN_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-dropdown{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;display:inline-flex;position:relative;user-select:none}.p-dropdown-clear-icon{margin-top:-.5rem;position:absolute;top:50%}.p-dropdown-trigger{align-items:center;display:flex;flex-shrink:0;justify-content:center}.p-dropdown-label{cursor:pointer;display:block;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:1%}.p-dropdown-label-empty{overflow:hidden;visibility:hidden}input.p-dropdown-label{cursor:default}.p-dropdown .p-dropdown-panel{min-width:100%}.p-dropdown-panel{position:absolute}.p-dropdown-items-wrapper{overflow:auto}.p-dropdown-item{cursor:pointer;font-weight:400;overflow:hidden;position:relative;white-space:nowrap}.p-dropdown-items{list-style-type:none;margin:0;padding:0}.p-dropdown-filter{width:100%}.p-dropdown-filter-container{position:relative}.p-dropdown-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-fluid .p-dropdown{display:flex}.p-fluid .p-dropdown .p-dropdown-label{width:1%}"]
                },] }
    ];
    Dropdown.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: api.FilterService },
        { type: api.PrimeNGConfig }
    ]; };
    Dropdown.propDecorators = {
        scrollHeight: [{ type: core.Input }],
        filter: [{ type: core.Input }],
        name: [{ type: core.Input }],
        style: [{ type: core.Input }],
        panelStyle: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        panelStyleClass: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        required: [{ type: core.Input }],
        editable: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        filterPlaceholder: [{ type: core.Input }],
        filterLocale: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        selectId: [{ type: core.Input }],
        dataKey: [{ type: core.Input }],
        filterBy: [{ type: core.Input }],
        autofocus: [{ type: core.Input }],
        resetFilterOnHide: [{ type: core.Input }],
        dropdownIcon: [{ type: core.Input }],
        optionLabel: [{ type: core.Input }],
        optionValue: [{ type: core.Input }],
        optionDisabled: [{ type: core.Input }],
        optionGroupLabel: [{ type: core.Input }],
        optionGroupChildren: [{ type: core.Input }],
        autoDisplayFirst: [{ type: core.Input }],
        group: [{ type: core.Input }],
        showClear: [{ type: core.Input }],
        emptyFilterMessage: [{ type: core.Input }],
        emptyMessage: [{ type: core.Input }],
        virtualScroll: [{ type: core.Input }],
        itemSize: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        ariaFilterLabel: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        filterMatchMode: [{ type: core.Input }],
        maxlength: [{ type: core.Input }],
        tooltip: [{ type: core.Input }],
        tooltipPosition: [{ type: core.Input }],
        tooltipPositionStyle: [{ type: core.Input }],
        tooltipStyleClass: [{ type: core.Input }],
        autofocusFilter: [{ type: core.Input }],
        onChange: [{ type: core.Output }],
        onFilter: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        onClick: [{ type: core.Output }],
        onShow: [{ type: core.Output }],
        onHide: [{ type: core.Output }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }],
        filterViewChild: [{ type: core.ViewChild, args: ['filter',] }],
        accessibleViewChild: [{ type: core.ViewChild, args: ['in',] }],
        viewPort: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport,] }],
        editableInputViewChild: [{ type: core.ViewChild, args: ['editableInput',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        disabled: [{ type: core.Input }],
        options: [{ type: core.Input }],
        filterValue: [{ type: core.Input }]
    };
    var DropdownModule = /** @class */ (function () {
        function DropdownModule() {
        }
        return DropdownModule;
    }());
    DropdownModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, scrolling.ScrollingModule, tooltip.TooltipModule, ripple.RippleModule],
                    exports: [Dropdown, api.SharedModule, scrolling.ScrollingModule],
                    declarations: [Dropdown, DropdownItem]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DROPDOWN_VALUE_ACCESSOR = DROPDOWN_VALUE_ACCESSOR;
    exports.Dropdown = Dropdown;
    exports.DropdownItem = DropdownItem;
    exports.DropdownModule = DropdownModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dropdown.umd.js.map
