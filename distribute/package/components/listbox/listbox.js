"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var objectutils_1 = require("../utils/objectutils");
var forms_1 = require("@angular/forms");
exports.LISTBOX_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = (function () {
    function Listbox(el, domHandler, objectUtils, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.checkbox = false;
        this.filter = false;
        this.filterMode = 'contains';
        this.metaKeySelection = true;
        this.showToggleAll = true;
        this.onChange = new core_1.EventEmitter();
        this.onDblClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Listbox.prototype.ngAfterContentInit = function () {
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
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.markForCheck();
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        if (!this.checkboxClick) {
            if (this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
        this.optionTouched = false;
    };
    Listbox.prototype.onOptionTouchEnd = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.optionTouched = true;
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = option.value;
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [option.value];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = this.value.concat([option.value]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = (this.value || []).concat([option.value]);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.removeOption = function (option) {
        var _this = this;
        this.value = this.value.filter(function (val) { return !_this.objectUtils.equals(val, option.value, _this.dataKey); });
    };
    Listbox.prototype.isSelected = function (option) {
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (this.objectUtils.equals(val, option.value, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = this.objectUtils.equals(this.value, option.value, this.dataKey);
        }
        return selected;
    };
    Object.defineProperty(Listbox.prototype, "allChecked", {
        get: function () {
            if (this.filterValue)
                return this.allFilteredSelected();
            else
                return this.value && this.options && (this.value.length === this.options.length);
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.allFilteredSelected = function () {
        var allSelected;
        if (this.value && this.options && this.options.length) {
            allSelected = true;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                if (this.isItemVisible(opt)) {
                    if (!this.isSelected(opt)) {
                        allSelected = false;
                        break;
                    }
                }
            }
        }
        return allSelected;
    };
    Listbox.prototype.onFilter = function (event) {
        var query = event.target.value.trim().toLowerCase();
        this.filterValue = query.length ? query : null;
    };
    Listbox.prototype.toggleAll = function (event, checkbox) {
        if (this.disabled || !this.options || this.options.length === 0) {
            return;
        }
        if (checkbox.checked) {
            this.value = [];
        }
        else {
            if (this.options) {
                this.value = [];
                for (var i = 0; i < this.options.length; i++) {
                    var opt = this.options[i];
                    if (this.isItemVisible(opt)) {
                        this.value.push(opt.value);
                    }
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue) {
            var visible = void 0;
            switch (this.filterMode) {
                case 'startsWith':
                    visible = option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) === 0;
                    break;
                case 'contains':
                    visible = option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1;
                    break;
                default:
                    visible = true;
            }
            return visible;
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onDoubleClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.onCheckboxClick = function (event, option) {
        if (this.disabled) {
            return;
        }
        this.checkboxClick = true;
        var selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = this.value.concat([option.value]);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.onInputFocus = function (event) {
        this.focus = true;
    };
    Listbox.prototype.onInputBlur = function (event) {
        this.focus = false;
    };
    return Listbox;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], Listbox.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Listbox.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Listbox.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Listbox.prototype, "listStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "checkbox", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "filter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Listbox.prototype, "filterMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "metaKeySelection", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Listbox.prototype, "dataKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Listbox.prototype, "showToggleAll", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Listbox.prototype, "onChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Listbox.prototype, "onDblClick", void 0);
__decorate([
    core_1.ContentChild(shared_1.Footer),
    __metadata("design:type", Object)
], Listbox.prototype, "footerFacet", void 0);
__decorate([
    core_1.ContentChildren(shared_1.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], Listbox.prototype, "templates", void 0);
Listbox = __decorate([
    core_1.Component({
        selector: 'p-listbox',
        template: "\n        <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"text\" readonly=\"readonly\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            </div>\n            <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple) || filter\" [ngClass]=\"{'ui-listbox-header-w-checkbox': checkbox}\">\n                <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple && showToggleAll\">\n                    <div class=\"ui-helper-hidden-accessible\">\n                        <input #cb type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\">\n                    </div>\n                    <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':allChecked}\" (click)=\"toggleAll($event,cb)\">\n                        <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'fa fa-check':allChecked}\"></span>\n                    </div>\n                </div>\n                <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n                    <input type=\"text\" role=\"textbox\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n            </div>\n            <div class=\"ui-listbox-list-wrapper\">\n                <ul class=\"ui-listbox-list\" [ngStyle]=\"listStyle\">\n                    <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\"\n                        [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option)}\"\n                        (click)=\"onOptionClick($event,option)\" (dblclick)=\"onDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\">\n                        <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\" (click)=\"onCheckboxClick($event,option)\">\n                            <div class=\"ui-helper-hidden-accessible\">\n                                <input type=\"checkbox\" [checked]=\"isSelected(option)\" [disabled]=\"disabled\">\n                            </div>\n                            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'fa fa-check':isSelected(option)}\"></span>\n                            </div>\n                        </div>\n                        <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n                        <ng-template *ngIf=\"itemTemplate\" [pTemplateWrapper]=\"itemTemplate\" [item]=\"option\" [index]=\"i\"></ng-template>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"ui-listbox-footer ui-widget-header ui-corner-all\" *ngIf=\"footerFacet\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, exports.LISTBOX_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, objectutils_1.ObjectUtils, core_1.ChangeDetectorRef])
], Listbox);
exports.Listbox = Listbox;
var ListboxModule = (function () {
    function ListboxModule() {
    }
    return ListboxModule;
}());
ListboxModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, shared_1.SharedModule],
        exports: [Listbox, shared_1.SharedModule],
        declarations: [Listbox]
    })
], ListboxModule);
exports.ListboxModule = ListboxModule;
//# sourceMappingURL=listbox.js.map