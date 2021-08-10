(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/avatar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.avatar = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var Avatar = /** @class */ (function () {
        function Avatar() {
            this.size = "normal";
            this.shape = "square";
        }
        Avatar.prototype.containerClass = function () {
            return {
                'p-avatar p-component': true,
                'p-avatar-image': this.image != null,
                'p-avatar-circle': this.shape === 'circle',
                'p-avatar-lg': this.size === 'large',
                'p-avatar-xl': this.size === 'xlarge'
            };
        };
        return Avatar;
    }());
    Avatar.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-avatar',
                    template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n            <span class=\"p-avatar-text\" *ngIf=\"label; else iconTemplate\">{{label}}</span>\n            <ng-template #iconTemplate><span [class]=\"icon\" [ngClass]=\"'p-avatar-icon'\" *ngIf=\"icon; else imageTemplate\"></span></ng-template>\n            <ng-template #imageTemplate><img [src]=\"image\" *ngIf=\"image\"></ng-template>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-avatar{align-items:center;display:inline-flex;font-size:1rem;height:2rem;justify-content:center;width:2rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{height:100%;width:100%}"]
                },] }
    ];
    Avatar.propDecorators = {
        label: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        image: [{ type: core.Input }],
        size: [{ type: core.Input }],
        shape: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }]
    };
    var AvatarModule = /** @class */ (function () {
        function AvatarModule() {
        }
        return AvatarModule;
    }());
    AvatarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Avatar],
                    declarations: [Avatar]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Avatar = Avatar;
    exports.AvatarModule = AvatarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-avatar.umd.js.map
