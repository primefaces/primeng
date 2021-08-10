(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/tristatecheckbox', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tristatecheckbox = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, core, common, forms) { 'use strict';

    var TRISTATECHECKBOX_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return TriStateCheckbox; }),
        multi: true
    };
    var TriStateCheckbox = /** @class */ (function () {
        function TriStateCheckbox(cd) {
            this.cd = cd;
            this.checkboxTrueIcon = 'pi pi-check';
            this.checkboxFalseIcon = 'pi pi-times';
            this.onChange = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        TriStateCheckbox.prototype.onClick = function (event, input) {
            if (!this.disabled && !this.readonly) {
                this.toggle(event);
                this.focused = true;
                input.focus();
            }
        };
        TriStateCheckbox.prototype.onKeydown = function (event) {
            if (event.keyCode == 32) {
                event.preventDefault();
            }
        };
        TriStateCheckbox.prototype.onKeyup = function (event) {
            if (event.keyCode == 32 && !this.readonly) {
                this.toggle(event);
                event.preventDefault();
            }
        };
        TriStateCheckbox.prototype.toggle = function (event) {
            if (this.value == null || this.value == undefined)
                this.value = true;
            else if (this.value == true)
                this.value = false;
            else if (this.value == false)
                this.value = null;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        };
        TriStateCheckbox.prototype.onFocus = function () {
            this.focused = true;
        };
        TriStateCheckbox.prototype.onBlur = function () {
            this.focused = false;
            this.onModelTouched();
        };
        TriStateCheckbox.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        TriStateCheckbox.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        TriStateCheckbox.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        TriStateCheckbox.prototype.setDisabledState = function (disabled) {
            this.disabled = disabled;
            this.cd.markForCheck();
        };
        return TriStateCheckbox;
    }());
    TriStateCheckbox.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-triStateCheckbox',
                    template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'p-checkbox p-component': true,'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused}\" [class]=\"styleClass\">\n            <div class=\"p-hidden-accessible\">\n                <input #input type=\"text\" [attr.id]=\"inputId\" [name]=\"name\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.aria-labelledby]=\"ariaLabelledBy\" inputmode=\"none\">\n            </div>\n            <div class=\"p-checkbox-box\" (click)=\"onClick($event,input)\"  role=\"checkbox\" [attr.aria-checked]=\"value === true\"\n                [ngClass]=\"{'p-highlight':value!=null,'p-disabled':disabled,'p-focus':focused}\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"value === true ? checkboxTrueIcon : value === false ? checkboxFalseIcon : ''\"></span>\n            </div>\n        </div>\n        <label class=\"p-checkbox-label\" (click)=\"onClick($event,input)\"\n               [ngClass]=\"{'p-checkbox-label-active':value!=null, 'p-disabled':disabled, 'p-checkbox-label-focus':focused}\"\n               *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
                    providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    TriStateCheckbox.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    TriStateCheckbox.propDecorators = {
        disabled: [{ type: core.Input }],
        name: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        label: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        checkboxTrueIcon: [{ type: core.Input }],
        checkboxFalseIcon: [{ type: core.Input }],
        onChange: [{ type: core.Output }]
    };
    var TriStateCheckboxModule = /** @class */ (function () {
        function TriStateCheckboxModule() {
        }
        return TriStateCheckboxModule;
    }());
    TriStateCheckboxModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [TriStateCheckbox],
                    declarations: [TriStateCheckbox]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TRISTATECHECKBOX_VALUE_ACCESSOR = TRISTATECHECKBOX_VALUE_ACCESSOR;
    exports.TriStateCheckbox = TriStateCheckbox;
    exports.TriStateCheckboxModule = TriStateCheckboxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tristatecheckbox.umd.js.map
