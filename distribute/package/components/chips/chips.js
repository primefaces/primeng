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
var inputtext_1 = require("../inputtext/inputtext");
var domhandler_1 = require("../dom/domhandler");
var forms_1 = require("@angular/forms");
exports.CHIPS_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Chips; }),
    multi: true
};
var Chips = (function () {
    function Chips(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onAdd = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.allowDuplicate = true;
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
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
    Chips.prototype.writeValue = function (value) {
        this.value = value;
    };
    Chips.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Chips.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Chips.prototype.setDisabledState = function (val) {
        this.disabled = val;
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
    Chips.prototype.onInputFocus = function () {
        this.focus = true;
        this.onFocus.emit();
    };
    Chips.prototype.onInputBlur = function () {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit();
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
    };
    Chips.prototype.addItem = function (event, item) {
        this.value = this.value || [];
        if (item && item.trim().length && (!this.max || this.max > item.length)) {
            if (this.allowDuplicate || !this.value.includes(item)) {
                this.value = this.value.concat([item]);
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
    };
    Chips.prototype.onKeydown = function (event, inputEL) {
        switch (event.which) {
            //backspace
            case 8:
                if (inputEL.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = this.value.slice();
                    var removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                }
                break;
            //enter
            case 13:
                this.addItem(event, inputEL.value);
                inputEL.value = '';
                event.preventDefault();
                break;
            case 9:
                if (this.addOnTab && inputEL.value !== '') {
                    this.addItem(event, inputEL.value);
                    inputEL.value = '';
                    event.preventDefault();
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                break;
        }
    };
    Object.defineProperty(Chips.prototype, "maxedOut", {
        get: function () {
            return this.max && this.value && this.max === this.value.length;
        },
        enumerable: true,
        configurable: true
    });
    return Chips;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Chips.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Chips.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Chips.prototype, "disabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Chips.prototype, "onAdd", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Chips.prototype, "onRemove", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Chips.prototype, "field", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Chips.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Chips.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Chips.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Chips.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Chips.prototype, "allowDuplicate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Chips.prototype, "inputStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Chips.prototype, "inputStyleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Chips.prototype, "addOnTab", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Chips.prototype, "onFocus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Chips.prototype, "onBlur", void 0);
__decorate([
    core_1.ContentChildren(shared_1.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], Chips.prototype, "templates", void 0);
Chips = __decorate([
    core_1.Component({
        selector: 'p-chips',
        template: "\n        <div [ngClass]=\"'ui-chips ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul [ngClass]=\"{'ui-inputtext ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled':disabled}\" (click)=\"inputtext.focus()\">\n                <li #token *ngFor=\"let item of value; let i = index;\" class=\"ui-chips-token ui-state-highlight ui-corner-all\">\n                    <span *ngIf=\"!disabled\" class=\"ui-chips-token-icon fa fa-fw fa-close\" (click)=\"removeItem($event,i)\"></span>\n                    <span *ngIf=\"!itemTemplate\" class=\"ui-chips-token-label\">{{field ? resolveFieldData(item,field) : item}}</span>\n                    <ng-template *ngIf=\"itemTemplate\" [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\n                </li>\n                <li class=\"ui-chips-input-token\">\n                    <input #inputtext type=\"text\" [attr.id]=\"inputId\" [attr.placeholder]=\"placeholder\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event,inputtext)\" \n                        (focus)=\"onInputFocus()\" (blur)=\"onInputBlur()\" [disabled]=\"maxedOut||disabled\" [disabled]=\"disabled\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\">\n                </li>\n            </ul>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler, exports.CHIPS_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
], Chips);
exports.Chips = Chips;
var ChipsModule = (function () {
    function ChipsModule() {
    }
    return ChipsModule;
}());
ChipsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, inputtext_1.InputTextModule, shared_1.SharedModule],
        exports: [Chips, inputtext_1.InputTextModule, shared_1.SharedModule],
        declarations: [Chips]
    })
], ChipsModule);
exports.ChipsModule = ChipsModule;
//# sourceMappingURL=chips.js.map