(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/progressbar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.progressbar = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var ProgressBar = /** @class */ (function () {
        function ProgressBar() {
            this.showValue = true;
            this.unit = '%';
            this.mode = 'determinate';
        }
        return ProgressBar;
    }());
    ProgressBar.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-progressBar',
                    template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\"\n            [ngClass]=\"{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}\">\n            <div *ngIf=\"mode === 'determinate'\" class=\"p-progressbar-value p-progressbar-value-animate\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div *ngIf=\"mode === 'determinate' && showValue\" class=\"p-progressbar-label\" [style.display]=\"value != null ? 'block' : 'none'\">{{value}}{{unit}}</div>\n            <div *ngIf=\"mode === 'indeterminate'\" class=\"p-progressbar-indeterminate-container\">\n                <div class=\"p-progressbar-value p-progressbar-value-animate\"></div>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-progressbar{overflow:hidden;position:relative}.p-progressbar-determinate .p-progressbar-value{border:0;display:none;height:100%;position:absolute;width:0}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-determinate .p-progressbar-label{font-weight:700;height:100%;position:absolute;text-align:center;width:100%}.p-progressbar-indeterminate .p-progressbar-value:before{animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite;background-color:inherit;bottom:0;content:\"\";left:0;position:absolute;top:0;will-change:left,right}.p-progressbar-indeterminate .p-progressbar-value:after{animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s;background-color:inherit;bottom:0;content:\"\";left:0;position:absolute;top:0;will-change:left,right}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}"]
                },] }
    ];
    ProgressBar.propDecorators = {
        value: [{ type: core.Input }],
        showValue: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        unit: [{ type: core.Input }],
        mode: [{ type: core.Input }]
    };
    var ProgressBarModule = /** @class */ (function () {
        function ProgressBarModule() {
        }
        return ProgressBarModule;
    }());
    ProgressBarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [ProgressBar],
                    declarations: [ProgressBar]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ProgressBar = ProgressBar;
    exports.ProgressBarModule = ProgressBarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-progressbar.umd.js.map
