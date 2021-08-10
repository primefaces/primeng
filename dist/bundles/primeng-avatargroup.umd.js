(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/avatargroup', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.avatargroup = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var AvatarGroup = /** @class */ (function () {
        function AvatarGroup() {
        }
        return AvatarGroup;
    }());
    AvatarGroup.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-avatarGroup',
                    template: "\n        <div [ngClass]=\"'p-avatar-group p-component'\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-avatar-group p-avatar+p-avatar{margin-left:-1rem}.p-avatar-group{align-items:center;display:flex}"]
                },] }
    ];
    AvatarGroup.propDecorators = {
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }]
    };
    var AvatarGroupModule = /** @class */ (function () {
        function AvatarGroupModule() {
        }
        return AvatarGroupModule;
    }());
    AvatarGroupModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [AvatarGroup],
                    declarations: [AvatarGroup]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AvatarGroup = AvatarGroup;
    exports.AvatarGroupModule = AvatarGroupModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-avatargroup.umd.js.map
