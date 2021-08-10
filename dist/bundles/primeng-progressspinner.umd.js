(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/progressspinner', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.progressspinner = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var ProgressSpinner = /** @class */ (function () {
        function ProgressSpinner() {
            this.strokeWidth = "2";
            this.fill = "none";
            this.animationDuration = "2s";
        }
        return ProgressSpinner;
    }());
    ProgressSpinner.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-progressSpinner',
                    template: "\n        <div class=\"p-progress-spinner\" [ngStyle]=\"style\" [ngClass]=\"styleClass\"  role=\"alert\" aria-busy=\"true\">\n            <svg class=\"p-progress-spinner-svg\" viewBox=\"25 25 50 50\" [style.animation-duration]=\"animationDuration\">\n                <circle class=\"p-progress-spinner-circle\" cx=\"50\" cy=\"50\" r=\"20\" [attr.fill]=\"fill\" [attr.stroke-width]=\"strokeWidth\" stroke-miterlimit=\"10\"/>\n            </svg>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-progress-spinner{display:inline-block;height:100px;margin:0 auto;position:relative;width:100px}.p-progress-spinner:before{content:\"\";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;bottom:0;height:100%;left:0;margin:auto;position:absolute;right:0;top:0;transform-origin:center center;width:100%}.p-progress-spinner-circle{animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke:#d62d20;stroke-dasharray:89,200;stroke-dashoffset:0;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(1turn)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{0%,to{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}"]
                },] }
    ];
    ProgressSpinner.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        strokeWidth: [{ type: core.Input }],
        fill: [{ type: core.Input }],
        animationDuration: [{ type: core.Input }]
    };
    var ProgressSpinnerModule = /** @class */ (function () {
        function ProgressSpinnerModule() {
        }
        return ProgressSpinnerModule;
    }());
    ProgressSpinnerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [ProgressSpinner],
                    declarations: [ProgressSpinner]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ProgressSpinner = ProgressSpinner;
    exports.ProgressSpinnerModule = ProgressSpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-progressspinner.umd.js.map
