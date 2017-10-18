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
var domhandler_1 = require("../dom/domhandler");
exports.INPUTSWITCH_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputSwitch; }),
    multi: true
};
var InputSwitch = (function () {
    function InputSwitch(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.ariaLabelTemplate = "InputSwitch {0}";
        this.onChange = new core_1.EventEmitter();
        this.checked = false;
        this.focused = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.initialized = false;
    }
    InputSwitch.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.handle = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-inputswitch-handle');
        this.onContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-on');
        this.offContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-off');
        this.onLabelChild = this.domHandler.findSingle(this.onContainer, 'span.ui-inputswitch-onlabel');
        this.offLabelChild = this.domHandler.findSingle(this.offContainer, 'span.ui-inputswitch-offlabel');
    };
    InputSwitch.prototype.ngAfterViewChecked = function () {
        if (this.container.offsetParent && !this.initialized) {
            this.render();
        }
    };
    InputSwitch.prototype.render = function () {
        var onContainerWidth = this.domHandler.width(this.onContainer), offContainerWidth = this.domHandler.width(this.offContainer), spanPadding = this.domHandler.innerWidth(this.offLabelChild) - this.domHandler.width(this.offLabelChild), handleMargins = this.domHandler.getOuterWidth(this.handle) - this.domHandler.innerWidth(this.handle);
        var containerWidth = (onContainerWidth > offContainerWidth) ? onContainerWidth : offContainerWidth, handleWidth = containerWidth;
        this.handle.style.width = handleWidth + 'px';
        handleWidth = this.domHandler.width(this.handle);
        containerWidth = containerWidth + handleWidth + 6;
        var labelWidth = containerWidth - handleWidth - spanPadding - handleMargins;
        this.container.style.width = containerWidth + 'px';
        this.onLabelChild.style.width = labelWidth + 'px';
        this.offLabelChild.style.width = labelWidth + 'px';
        //position
        this.offContainer.style.width = (this.domHandler.width(this.container) - 5) + 'px';
        this.offset = this.domHandler.width(this.container) - this.domHandler.getOuterWidth(this.handle);
        //default value
        if (this.checked) {
            this.handle.style.left = this.offset + 'px';
            this.onContainer.style.width = this.offset + 'px';
            this.offLabelChild.style.marginRight = -this.offset + 'px';
        }
        else {
            this.onContainer.style.width = 0 + 'px';
            this.onLabelChild.style.marginLeft = -this.offset + 'px';
        }
        this.initialized = true;
    };
    InputSwitch.prototype.toggle = function (event, checkbox) {
        if (!this.disabled) {
            if (this.checked) {
                this.checked = false;
                this.uncheckUI();
            }
            else {
                this.checked = true;
                this.checkUI();
            }
            this.onModelChange(this.checked);
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            checkbox.focus();
        }
    };
    InputSwitch.prototype.checkUI = function () {
        this.onContainer.style.width = this.offset + 'px';
        this.onLabelChild.style.marginLeft = 0 + 'px';
        this.offLabelChild.style.marginRight = -this.offset + 'px';
        this.handle.style.left = this.offset + 'px';
        this.updateAriaLabel();
    };
    InputSwitch.prototype.uncheckUI = function () {
        this.onContainer.style.width = 0 + 'px';
        this.onLabelChild.style.marginLeft = -this.offset + 'px';
        this.offLabelChild.style.marginRight = 0 + 'px';
        this.handle.style.left = 0 + 'px';
        this.updateAriaLabel();
    };
    InputSwitch.prototype.onFocus = function (event) {
        this.focused = true;
    };
    InputSwitch.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    InputSwitch.prototype.writeValue = function (checked) {
        this.checked = checked;
        if (this.initialized) {
            if (this.checked === true)
                this.checkUI();
            else
                this.uncheckUI();
        }
    };
    InputSwitch.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputSwitch.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputSwitch.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    InputSwitch.prototype.updateAriaLabel = function () {
        var pattern = /{(.*?)}/, value = this.checked ? this.onLabel : this.offLabel;
        this.ariaLabel = this.ariaLabelTemplate.replace(this.ariaLabelTemplate.match(pattern)[0], value);
    };
    return InputSwitch;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputSwitch.prototype, "onLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputSwitch.prototype, "offLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputSwitch.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputSwitch.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputSwitch.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputSwitch.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputSwitch.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputSwitch.prototype, "ariaLabelTemplate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputSwitch.prototype, "onChange", void 0);
InputSwitch = __decorate([
    core_1.Component({
        selector: 'p-inputSwitch',
        template: "\n        <div [ngClass]=\"{'ui-inputswitch ui-widget ui-widget-content ui-corner-all': true,\n            'ui-state-disabled': disabled,'ui-inputswitch-checked':checked, 'ui-state-focus':focused}\" (click)=\"toggle($event, in)\"\n            [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inputswitch-off\">\n                <span class=\"ui-inputswitch-offlabel\">{{offLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-on\">\n                <span class=\"ui-inputswitch-onlabel\">{{onLabel}}</span>\n            </div>\n            <div [ngClass]=\"{'ui-inputswitch-handle ui-state-default':true, 'ui-state-focus':focused}\"></div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"checkbox\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" aria-live=\"polite\" [attr.id]=\"inputId\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" readonly=\"readonly\" [attr.tabindex]=\"tabindex\"/>\n            </div>\n        </div>\n    ",
        providers: [exports.INPUTSWITCH_VALUE_ACCESSOR, domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
], InputSwitch);
exports.InputSwitch = InputSwitch;
var InputSwitchModule = (function () {
    function InputSwitchModule() {
    }
    return InputSwitchModule;
}());
InputSwitchModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [InputSwitch],
        declarations: [InputSwitch]
    })
], InputSwitchModule);
exports.InputSwitchModule = InputSwitchModule;
//# sourceMappingURL=inputswitch.js.map