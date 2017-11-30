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
exports.TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ToggleButton; }),
    multi: true
};
var ToggleButton = (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.onChange = new core_1.EventEmitter();
        this.checked = false;
        this.focus = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    ToggleButton.prototype.ngAfterViewInit = function () {
        this.checkbox = this.checkboxViewChild.nativeElement;
    };
    ToggleButton.prototype.getIconClass = function () {
        var baseClass = 'ui-button-icon-left fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            this.checkbox.focus();
        }
    };
    ToggleButton.prototype.onFocus = function () {
        this.focus = true;
    };
    ToggleButton.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    ToggleButton.prototype.writeValue = function (value) {
        this.checked = value;
    };
    ToggleButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ToggleButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ToggleButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Object.defineProperty(ToggleButton.prototype, "hasOnLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "hasOffLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ToggleButton;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleButton.prototype, "onLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleButton.prototype, "offLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleButton.prototype, "onIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleButton.prototype, "offIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ToggleButton.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ToggleButton.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleButton.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToggleButton.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ToggleButton.prototype, "tabindex", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ToggleButton.prototype, "onChange", void 0);
__decorate([
    core_1.ViewChild('checkbox'),
    __metadata("design:type", core_1.ElementRef)
], ToggleButton.prototype, "checkboxViewChild", void 0);
ToggleButton = __decorate([
    core_1.Component({
        selector: 'p-toggleButton',
        template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), \n                'ui-button-text-icon-left': (onIcon&&offIcon&&hasOnLabel&&hasOffLabel), 'ui-button-icon-only': (onIcon&&offIcon&&!hasOnLabel&&!hasOffLabel),\n                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #checkbox type=\"checkbox\" [attr.id]=\"inputId\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.tabindex]=\"tabindex\">\n            </div>\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"getIconClass()\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>\n        </div>\n    ",
        providers: [exports.TOGGLEBUTTON_VALUE_ACCESSOR]
    })
], ToggleButton);
exports.ToggleButton = ToggleButton;
var ToggleButtonModule = (function () {
    function ToggleButtonModule() {
    }
    return ToggleButtonModule;
}());
ToggleButtonModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [ToggleButton],
        declarations: [ToggleButton]
    })
], ToggleButtonModule);
exports.ToggleButtonModule = ToggleButtonModule;
//# sourceMappingURL=togglebutton.js.map