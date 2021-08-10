(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/inputtext'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/spinner', ['exports', '@angular/core', '@angular/common', 'primeng/inputtext', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.spinner = {}), global.ng.core, global.ng.common, global.primeng.inputtext, global.ng.forms));
}(this, (function (exports, core, common, inputtext, forms) { 'use strict';

    var SPINNER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Spinner; }),
        multi: true
    };
    var Spinner = /** @class */ (function () {
        function Spinner(el, cd) {
            this.el = el;
            this.cd = cd;
            this.onChange = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this._step = 1;
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.keyPattern = /[0-9\+\-]/;
            this.negativeSeparator = '-';
        }
        Object.defineProperty(Spinner.prototype, "step", {
            get: function () {
                return this._step;
            },
            set: function (val) {
                this._step = val;
                if (this._step != null) {
                    var tokens = this.step.toString().split(/[,]|[.]/);
                    this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
                }
            },
            enumerable: false,
            configurable: true
        });
        Spinner.prototype.ngOnInit = function () {
            if (this.formatInput) {
                this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
                this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
                this.thousandRegExp = new RegExp("[" + (this.thousandSeparator || this.localeThousandSeparator) + "]", 'gim');
                if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                    console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
                }
            }
        };
        Spinner.prototype.repeat = function (event, interval, dir) {
            var _this = this;
            var i = interval || 500;
            this.clearTimer();
            this.timer = setTimeout(function () {
                _this.repeat(event, 40, dir);
            }, i);
            this.spin(event, dir);
        };
        Spinner.prototype.spin = function (event, dir) {
            var step = this.step * dir;
            var currentValue;
            var precision = this.getPrecision();
            if (this.value)
                currentValue = (typeof this.value === 'string') ? this.parseValue(this.value) : this.value;
            else
                currentValue = 0;
            if (precision)
                this.value = parseFloat(this.toFixed(currentValue + step, precision));
            else
                this.value = currentValue + step;
            if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
                this.value = currentValue;
            }
            if (this.min !== undefined && this.value < this.min) {
                this.value = this.min;
            }
            if (this.max !== undefined && this.value > this.max) {
                this.value = this.max;
            }
            this.formatValue();
            this.onModelChange(this.value);
            this.onChange.emit(event);
        };
        Spinner.prototype.getPrecision = function () {
            return this.precision === undefined ? this.calculatedPrecision : this.precision;
        };
        Spinner.prototype.toFixed = function (value, precision) {
            var power = Math.pow(10, precision || 0);
            return String(Math.round(value * power) / power);
        };
        Spinner.prototype.onUpButtonMousedown = function (event) {
            if (!this.disabled) {
                this.inputfieldViewChild.nativeElement.focus();
                this.repeat(event, null, 1);
                this.updateFilledState();
                event.preventDefault();
            }
        };
        Spinner.prototype.onUpButtonMouseup = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onUpButtonMouseleave = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onDownButtonMousedown = function (event) {
            if (!this.disabled) {
                this.inputfieldViewChild.nativeElement.focus();
                this.repeat(event, null, -1);
                this.updateFilledState();
                event.preventDefault();
            }
        };
        Spinner.prototype.onDownButtonMouseup = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onDownButtonMouseleave = function (event) {
            if (!this.disabled) {
                this.clearTimer();
            }
        };
        Spinner.prototype.onInputKeydown = function (event) {
            if (event.which == 38) {
                this.spin(event, 1);
                event.preventDefault();
            }
            else if (event.which == 40) {
                this.spin(event, -1);
                event.preventDefault();
            }
        };
        Spinner.prototype.onInputChange = function (event) {
            this.onChange.emit(event);
        };
        Spinner.prototype.onInput = function (event) {
            this.value = this.parseValue(event.target.value);
            this.onModelChange(this.value);
            this.updateFilledState();
        };
        Spinner.prototype.onInputBlur = function (event) {
            this.focus = false;
            this.formatValue();
            this.onModelTouched();
            this.onBlur.emit(event);
        };
        Spinner.prototype.onInputFocus = function (event) {
            this.focus = true;
            this.onFocus.emit(event);
        };
        Spinner.prototype.parseValue = function (val) {
            var value;
            var precision = this.getPrecision();
            if (val.trim() === '') {
                value = null;
            }
            else {
                if (this.formatInput) {
                    val = val.replace(this.thousandRegExp, '');
                }
                if (precision) {
                    val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                    value = parseFloat(val);
                }
                else {
                    value = parseInt(val, 10);
                }
                if (!isNaN(value)) {
                    if (this.max !== null && value > this.max) {
                        value = this.max;
                    }
                    if (this.min !== null && value < this.min) {
                        value = this.min;
                    }
                }
                else {
                    value = null;
                }
            }
            return value;
        };
        Spinner.prototype.formatValue = function () {
            var value = this.value;
            var precision = this.getPrecision();
            if (value != null) {
                if (this.formatInput) {
                    value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                    if (this.decimalSeparator && this.thousandSeparator) {
                        value = value.split(this.localeDecimalSeparator);
                        if (precision && value[1]) {
                            value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                        }
                        if (this.thousandSeparator && value[0].length > 3) {
                            value[0] = value[0].replace(new RegExp("[" + this.localeThousandSeparator + "]", 'gim'), this.thousandSeparator);
                        }
                        value = value.join('');
                    }
                }
                this.formattedValue = value.toString();
            }
            else {
                this.formattedValue = null;
            }
            if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
                this.inputfieldViewChild.nativeElement.value = this.formattedValue;
            }
        };
        Spinner.prototype.clearTimer = function () {
            if (this.timer) {
                clearInterval(this.timer);
            }
        };
        Spinner.prototype.writeValue = function (value) {
            this.value = value;
            this.formatValue();
            this.updateFilledState();
            this.cd.markForCheck();
        };
        Spinner.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Spinner.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Spinner.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Spinner.prototype.updateFilledState = function () {
            this.filled = (this.value !== undefined && this.value != null);
        };
        return Spinner;
    }());
    Spinner.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-spinner',
                    template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #inputfield type=\"text\" [attr.id]=\"inputId\" [value]=\"formattedValue||null\" [attr.name]=\"name\" [attr.aria-valumin]=\"min\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"value\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n            (keydown)=\"onInputKeydown($event)\" (blur)=\"onInputBlur($event)\" (input)=\"onInput($event)\" (change)=\"onInputChange($event)\" (focus)=\"onInputFocus($event)\"\n            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [ngClass]=\"'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-up ui-clickable\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-down ui-clickable\"></span>\n            </button>\n        </span>\n    ",
                    host: {
                        '[class.ui-inputwrapper-filled]': 'filled',
                        '[class.ui-inputwrapper-focus]': 'focus'
                    },
                    providers: [SPINNER_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".ui-spinner{display:inline-block;overflow:visible;padding:0;position:relative;vertical-align:middle}.ui-spinner-input{padding-right:1.5em;vertical-align:middle}.ui-spinner-button{cursor:default;display:block;height:50%;margin:0;overflow:hidden;padding:0;position:absolute;right:0;text-align:center;vertical-align:middle;width:1.5em}.ui-spinner .ui-spinner-button-icon{left:50%;margin-left:-.5em;margin-top:-.5em;position:absolute;top:50%;width:1em}.ui-spinner-up{top:0}.ui-spinner-down{bottom:0}.ui-fluid .ui-spinner{width:100%}.ui-fluid .ui-spinner .ui-spinner-input{padding-right:2em;width:100%}.ui-fluid .ui-spinner .ui-spinner-button{width:1.5em}.ui-fluid .ui-spinner .ui-spinner-button .ui-spinner-button-icon{left:.7em}"]
                },] }
    ];
    Spinner.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    Spinner.propDecorators = {
        onChange: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        min: [{ type: core.Input }],
        max: [{ type: core.Input }],
        maxlength: [{ type: core.Input }],
        size: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        required: [{ type: core.Input }],
        name: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        inputStyle: [{ type: core.Input }],
        inputStyleClass: [{ type: core.Input }],
        formatInput: [{ type: core.Input }],
        decimalSeparator: [{ type: core.Input }],
        thousandSeparator: [{ type: core.Input }],
        precision: [{ type: core.Input }],
        inputfieldViewChild: [{ type: core.ViewChild, args: ['inputfield',] }],
        step: [{ type: core.Input }]
    };
    var SpinnerModule = /** @class */ (function () {
        function SpinnerModule() {
        }
        return SpinnerModule;
    }());
    SpinnerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, inputtext.InputTextModule],
                    exports: [Spinner],
                    declarations: [Spinner]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SPINNER_VALUE_ACCESSOR = SPINNER_VALUE_ACCESSOR;
    exports.Spinner = Spinner;
    exports.SpinnerModule = SpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-spinner.umd.js.map
