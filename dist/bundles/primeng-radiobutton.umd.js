(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/radiobutton', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.radiobutton = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, i0, common, forms) { 'use strict';

    var RADIO_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return RadioButton; }),
        multi: true
    };
    var RadioControlRegistry = /** @class */ (function () {
        function RadioControlRegistry() {
            this.accessors = [];
        }
        RadioControlRegistry.prototype.add = function (control, accessor) {
            this.accessors.push([control, accessor]);
        };
        RadioControlRegistry.prototype.remove = function (accessor) {
            this.accessors = this.accessors.filter(function (c) {
                return c[1] !== accessor;
            });
        };
        RadioControlRegistry.prototype.select = function (accessor) {
            var _this = this;
            this.accessors.forEach(function (c) {
                if (_this.isSameGroup(c, accessor) && c[1] !== accessor) {
                    c[1].writeValue(accessor.value);
                }
            });
        };
        RadioControlRegistry.prototype.isSameGroup = function (controlPair, accessor) {
            if (!controlPair[0].control) {
                return false;
            }
            return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name === accessor.name;
        };
        return RadioControlRegistry;
    }());
    RadioControlRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function RadioControlRegistry_Factory() { return new RadioControlRegistry(); }, token: RadioControlRegistry, providedIn: "root" });
    RadioControlRegistry.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    var RadioButton = /** @class */ (function () {
        function RadioButton(cd, injector, registry) {
            this.cd = cd;
            this.injector = injector;
            this.registry = registry;
            this.onClick = new i0.EventEmitter();
            this.onFocus = new i0.EventEmitter();
            this.onBlur = new i0.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        RadioButton.prototype.ngOnInit = function () {
            this.control = this.injector.get(forms.NgControl);
            this.checkName();
            this.registry.add(this.control, this);
        };
        RadioButton.prototype.handleClick = function (event, radioButton, focus) {
            event.preventDefault();
            if (this.disabled) {
                return;
            }
            this.select(event);
            if (focus) {
                radioButton.focus();
            }
        };
        RadioButton.prototype.select = function (event) {
            if (!this.disabled) {
                this.inputViewChild.nativeElement.checked = true;
                this.checked = true;
                this.onModelChange(this.value);
                this.registry.select(this);
                this.onClick.emit(event);
            }
        };
        RadioButton.prototype.writeValue = function (value) {
            this.checked = (value == this.value);
            if (this.inputViewChild && this.inputViewChild.nativeElement) {
                this.inputViewChild.nativeElement.checked = this.checked;
            }
            this.cd.markForCheck();
        };
        RadioButton.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        RadioButton.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        RadioButton.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        RadioButton.prototype.onInputFocus = function (event) {
            this.focused = true;
            this.onFocus.emit(event);
        };
        RadioButton.prototype.onInputBlur = function (event) {
            this.focused = false;
            this.onModelTouched();
            this.onBlur.emit(event);
        };
        RadioButton.prototype.onChange = function (event) {
            this.select(event);
        };
        RadioButton.prototype.focus = function () {
            this.inputViewChild.nativeElement.focus();
        };
        RadioButton.prototype.ngOnDestroy = function () {
            this.registry.remove(this);
        };
        RadioButton.prototype.checkName = function () {
            if (this.name && this.formControlName && this.name !== this.formControlName) {
                this.throwNameError();
            }
            if (!this.name && this.formControlName) {
                this.name = this.formControlName;
            }
        };
        RadioButton.prototype.throwNameError = function () {
            throw new Error("\n          If you define both a name and a formControlName attribute on your radio button, their values\n          must match. Ex: <p-radioButton formControlName=\"food\" name=\"food\"></p-radioButton>\n        ");
        };
        return RadioButton;
    }());
    RadioButton.decorators = [
        { type: i0.Component, args: [{
                    selector: 'p-radioButton',
                    template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'p-radiobutton p-component':true,'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled, 'p-radiobutton-focused': focused}\" [class]=\"styleClass\">\n            <div class=\"p-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" [attr.aria-checked]=\"checked\" [attr.aria-label]=\"ariaLabel\"\n                    [attr.aria-labelledby]=\"ariaLabelledBy\" [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\">\n            </div>\n            <div (click)=\"handleClick($event, rb, true)\" [ngClass]=\"{'p-radiobutton-box':true, 'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused}\">\n                <span class=\"p-radiobutton-icon\"></span>\n            </div>\n        </div>\n        <label (click)=\"select($event)\" [class]=\"labelStyleClass\"\n            [ngClass]=\"{'p-radiobutton-label':true, 'p-radiobutton-label-active':rb.checked, 'p-disabled':disabled, 'p-radiobutton-label-focus':focused}\"\n            *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
                    providers: [RADIO_VALUE_ACCESSOR],
                    changeDetection: i0.ChangeDetectionStrategy.OnPush
                },] }
    ];
    RadioButton.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.Injector },
        { type: RadioControlRegistry }
    ]; };
    RadioButton.propDecorators = {
        value: [{ type: i0.Input }],
        formControlName: [{ type: i0.Input }],
        name: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        label: [{ type: i0.Input }],
        tabindex: [{ type: i0.Input }],
        inputId: [{ type: i0.Input }],
        ariaLabelledBy: [{ type: i0.Input }],
        ariaLabel: [{ type: i0.Input }],
        style: [{ type: i0.Input }],
        styleClass: [{ type: i0.Input }],
        labelStyleClass: [{ type: i0.Input }],
        onClick: [{ type: i0.Output }],
        onFocus: [{ type: i0.Output }],
        onBlur: [{ type: i0.Output }],
        inputViewChild: [{ type: i0.ViewChild, args: ['rb',] }]
    };
    var RadioButtonModule = /** @class */ (function () {
        function RadioButtonModule() {
        }
        return RadioButtonModule;
    }());
    RadioButtonModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [RadioButton],
                    declarations: [RadioButton]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RADIO_VALUE_ACCESSOR = RADIO_VALUE_ACCESSOR;
    exports.RadioButton = RadioButton;
    exports.RadioButtonModule = RadioButtonModule;
    exports.RadioControlRegistry = RadioControlRegistry;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-radiobutton.umd.js.map
