(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputswitch', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputswitch = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, core, common, forms) { 'use strict';

    var INPUTSWITCH_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return InputSwitch; }),
        multi: true
    };
    var InputSwitch = /** @class */ (function () {
        function InputSwitch(cd) {
            this.cd = cd;
            this.onChange = new core.EventEmitter();
            this.checked = false;
            this.focused = false;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        InputSwitch.prototype.onClick = function (event, cb) {
            if (!this.disabled && !this.readonly) {
                event.preventDefault();
                this.toggle(event);
                cb.focus();
            }
        };
        InputSwitch.prototype.onInputChange = function (event) {
            if (!this.readonly) {
                var inputChecked = event.target.checked;
                this.updateModel(event, inputChecked);
            }
        };
        InputSwitch.prototype.toggle = function (event) {
            this.updateModel(event, !this.checked);
        };
        InputSwitch.prototype.updateModel = function (event, value) {
            this.checked = value;
            this.onModelChange(this.checked);
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
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
            this.cd.markForCheck();
        };
        InputSwitch.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        InputSwitch.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        InputSwitch.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        return InputSwitch;
    }());
    InputSwitch.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-inputSwitch',
                    template: "\n        <div [ngClass]=\"{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}\" \n            [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick($event, cb)\">\n            <div class=\"p-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.tabindex]=\"tabindex\" [checked]=\"checked\" (change)=\"onInputChange($event)\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [disabled]=\"disabled\" role=\"switch\" [attr.aria-checked]=\"checked\" [attr.aria-labelledby]=\"ariaLabelledBy\"/>\n            </div>\n            <span class=\"p-inputswitch-slider\"></span>\n        </div>\n    ",
                    providers: [INPUTSWITCH_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-inputswitch{-ms-user-select:none;-webkit-user-select:none;display:inline-block;position:relative;user-select:none}.p-inputswitch-slider{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.p-inputswitch-slider:before{content:\"\";position:absolute;top:50%}"]
                },] }
    ];
    InputSwitch.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    InputSwitch.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        name: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        onChange: [{ type: core.Output }]
    };
    var InputSwitchModule = /** @class */ (function () {
        function InputSwitchModule() {
        }
        return InputSwitchModule;
    }());
    InputSwitchModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [InputSwitch],
                    declarations: [InputSwitch]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.INPUTSWITCH_VALUE_ACCESSOR = INPUTSWITCH_VALUE_ACCESSOR;
    exports.InputSwitch = InputSwitch;
    exports.InputSwitchModule = InputSwitchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputswitch.umd.js.map
