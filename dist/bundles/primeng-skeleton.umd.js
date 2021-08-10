(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/skeleton', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.skeleton = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var Skeleton = /** @class */ (function () {
        function Skeleton() {
            this.shape = "rectangle";
            this.animation = "wave";
            this.borderRadius = null;
            this.size = null;
            this.width = "100%";
            this.height = "1rem";
        }
        Skeleton.prototype.containerClass = function () {
            return {
                'p-skeleton p-component': true,
                'p-skeleton-circle': this.shape === 'circle',
                'p-skeleton-none': this.animation === 'none'
            };
        };
        Skeleton.prototype.containerStyle = function () {
            if (this.size)
                return Object.assign(Object.assign({}, this.style), { width: this.size, height: this.size, borderRadius: this.borderRadius });
            else
                return Object.assign(Object.assign({}, this.style), { width: this.width, height: this.height, borderRadius: this.borderRadius });
        };
        return Skeleton;
    }());
    Skeleton.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-skeleton',
                    template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"containerStyle()\">\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-skeleton{overflow:hidden;position:relative}.p-skeleton:after{animation:p-skeleton-animation 1.2s infinite;content:\"\";height:100%;left:0;position:absolute;right:0;top:0;transform:translateX(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translateX(-100%)}to{transform:translateX(100%)}}"]
                },] }
    ];
    Skeleton.propDecorators = {
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        shape: [{ type: core.Input }],
        animation: [{ type: core.Input }],
        borderRadius: [{ type: core.Input }],
        size: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }]
    };
    var SkeletonModule = /** @class */ (function () {
        function SkeletonModule() {
        }
        return SkeletonModule;
    }());
    SkeletonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Skeleton],
                    declarations: [Skeleton]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Skeleton = Skeleton;
    exports.SkeletonModule = SkeletonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-skeleton.umd.js.map
