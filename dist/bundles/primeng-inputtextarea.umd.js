(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/inputtextarea', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputtextarea = {}), global.ng.core, global.ng.forms, global.ng.common));
}(this, (function (exports, core, forms, common) { 'use strict';

    var InputTextarea = /** @class */ (function () {
        function InputTextarea(el, ngModel, control, cd) {
            this.el = el;
            this.ngModel = ngModel;
            this.control = control;
            this.cd = cd;
            this.onResize = new core.EventEmitter();
        }
        InputTextarea.prototype.ngOnInit = function () {
            var _this = this;
            if (this.ngModel) {
                this.ngModelSubscription = this.ngModel.valueChanges.subscribe(function () {
                    _this.updateState();
                });
            }
            if (this.control) {
                this.ngControlSubscription = this.control.valueChanges.subscribe(function () {
                    _this.updateState();
                });
            }
        };
        InputTextarea.prototype.ngAfterViewInit = function () {
            if (this.autoResize)
                this.resize();
            this.updateFilledState();
            this.cd.detectChanges();
        };
        InputTextarea.prototype.onInput = function (e) {
            this.updateState();
        };
        InputTextarea.prototype.updateFilledState = function () {
            this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
        };
        InputTextarea.prototype.onFocus = function (e) {
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.onBlur = function (e) {
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.resize = function (event) {
            this.el.nativeElement.style.height = 'auto';
            this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
            if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
                this.el.nativeElement.style.overflowY = "scroll";
                this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
            }
            else {
                this.el.nativeElement.style.overflow = "hidden";
            }
            this.onResize.emit(event || {});
        };
        InputTextarea.prototype.updateState = function () {
            this.updateFilledState();
            if (this.autoResize) {
                this.resize();
            }
        };
        InputTextarea.prototype.ngOnDestroy = function () {
            if (this.ngModelSubscription) {
                this.ngModelSubscription.unsubscribe();
            }
            if (this.ngControlSubscription) {
                this.ngControlSubscription.unsubscribe();
            }
        };
        return InputTextarea;
    }());
    InputTextarea.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pInputTextarea]',
                    host: {
                        '[class.p-inputtextarea]': 'true',
                        '[class.p-inputtext]': 'true',
                        '[class.p-component]': 'true',
                        '[class.p-filled]': 'filled',
                        '[class.p-inputtextarea-resizable]': 'autoResize'
                    }
                },] }
    ];
    InputTextarea.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: forms.NgModel, decorators: [{ type: core.Optional }] },
        { type: forms.NgControl, decorators: [{ type: core.Optional }] },
        { type: core.ChangeDetectorRef }
    ]; };
    InputTextarea.propDecorators = {
        autoResize: [{ type: core.Input }],
        onResize: [{ type: core.Output }],
        onInput: [{ type: core.HostListener, args: ['input', ['$event'],] }],
        onFocus: [{ type: core.HostListener, args: ['focus', ['$event'],] }],
        onBlur: [{ type: core.HostListener, args: ['blur', ['$event'],] }]
    };
    var InputTextareaModule = /** @class */ (function () {
        function InputTextareaModule() {
        }
        return InputTextareaModule;
    }());
    InputTextareaModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [InputTextarea],
                    declarations: [InputTextarea]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.InputTextarea = InputTextarea;
    exports.InputTextareaModule = InputTextareaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputtextarea.umd.js.map
