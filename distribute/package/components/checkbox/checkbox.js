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
var forms_1 = require("@angular/forms");
exports.CHECKBOX_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Checkbox; }),
    multi: true
};
var Checkbox = (function () {
    function Checkbox(cd) {
        this.cd = cd;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.focused = false;
        this.checked = false;
    }
    Checkbox.prototype.onClick = function (event, checkbox, focus) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.checked = !this.checked;
        this.updateModel();
        if (focus) {
            checkbox.focus();
        }
    };
    Checkbox.prototype.updateModel = function () {
        if (!this.binary) {
            if (this.checked)
                this.addValue();
            else
                this.removeValue();
            this.onModelChange(this.model);
            if (this.formControl) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.onModelChange(this.checked);
        }
        this.onChange.emit(this.checked);
    };
    Checkbox.prototype.handleChange = function (event) {
        this.checked = event.target.checked;
        this.updateModel();
    };
    Checkbox.prototype.isChecked = function () {
        if (this.binary)
            return this.model;
        else
            return this.model && this.model.indexOf(this.value) > -1;
    };
    Checkbox.prototype.removeValue = function () {
        var _this = this;
        this.model = this.model.filter(function (val) { return val !== _this.value; });
    };
    Checkbox.prototype.addValue = function () {
        if (this.model)
            this.model = this.model.concat([this.value]);
        else
            this.model = [this.value];
    };
    Checkbox.prototype.onFocus = function (event) {
        this.focused = true;
    };
    Checkbox.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    Checkbox.prototype.writeValue = function (model) {
        this.model = model;
        this.checked = this.isChecked();
        this.cd.markForCheck();
    };
    Checkbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Checkbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Checkbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    return Checkbox;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Checkbox.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Checkbox.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Checkbox.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Checkbox.prototype, "binary", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Checkbox.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Checkbox.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Checkbox.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Checkbox.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Checkbox.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], Checkbox.prototype, "formControl", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Checkbox.prototype, "onChange", void 0);
Checkbox = __decorate([
    core_1.Component({
        selector: 'p-checkbox',
        template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"'ui-chkbox ui-widget'\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [name]=\"name\" [value]=\"value\" [checked]=\"checked\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\"\n                [ngClass]=\"{'ui-state-focus':focused}\" (change)=\"handleChange($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,cb,true)\"\n                        [ngClass]=\"{'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'fa fa-check':checked}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-chkbox-label\" (click)=\"onClick($event,cb,true)\" \n                [ngClass]=\"{'ui-label-active':checked, 'ui-label-disabled':disabled, 'ui-label-focus':focused}\"\n                *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
        providers: [exports.CHECKBOX_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], Checkbox);
exports.Checkbox = Checkbox;
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    return CheckboxModule;
}());
CheckboxModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Checkbox],
        declarations: [Checkbox]
    })
], CheckboxModule);
exports.CheckboxModule = CheckboxModule;
//# sourceMappingURL=checkbox.js.map