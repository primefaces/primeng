(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/focustrap', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.focustrap = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var FocusTrap = /** @class */ (function () {
        function FocusTrap(el) {
            this.el = el;
        }
        FocusTrap.prototype.onkeydown = function (e) {
            if (this.pFocusTrapDisabled !== true) {
                e.preventDefault();
                var focusableElements = dom.DomHandler.getFocusableElements(this.el.nativeElement);
                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        var focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                        if (e.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        };
        return FocusTrap;
    }());
    FocusTrap.decorators = [
        { type: core.Directive, args: [{
                    selector: '[pFocusTrap]',
                },] }
    ];
    FocusTrap.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    FocusTrap.propDecorators = {
        pFocusTrapDisabled: [{ type: core.Input }],
        onkeydown: [{ type: core.HostListener, args: ['keydown.tab', ['$event'],] }, { type: core.HostListener, args: ['keydown.shift.tab', ['$event'],] }]
    };
    var FocusTrapModule = /** @class */ (function () {
        function FocusTrapModule() {
        }
        return FocusTrapModule;
    }());
    FocusTrapModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [FocusTrap],
                    declarations: [FocusTrap]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FocusTrap = FocusTrap;
    exports.FocusTrapModule = FocusTrapModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-focustrap.umd.js.map
