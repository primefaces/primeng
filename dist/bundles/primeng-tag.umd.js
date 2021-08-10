(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/tag', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tag = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var Tag = /** @class */ (function () {
        function Tag() {
        }
        Tag.prototype.containerClass = function () {
            return {
                'p-tag p-component': true,
                'p-tag-info': this.severity === 'info',
                'p-tag-success': this.severity === 'success',
                'p-tag-warning': this.severity === 'warning',
                'p-tag-danger': this.severity === 'danger',
                'p-tag-rounded': this.rounded
            };
        };
        return Tag;
    }());
    Tag.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-tag',
                    template: "\n        <span [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <ng-content></ng-content>\n            <span class=\"p-tag-icon\" [ngClass]=\"icon\" *ngIf=\"icon\"></span>\n            <span class=\"p-tag-value\">{{value}}</span>\n        </span>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-tag{align-items:center;display:inline-flex;justify-content:center}.p-tag-icon,.p-tag-icon.pi,.p-tag-value{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}"]
                },] }
    ];
    Tag.propDecorators = {
        styleClass: [{ type: core.Input }],
        style: [{ type: core.Input }],
        severity: [{ type: core.Input }],
        value: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        rounded: [{ type: core.Input }]
    };
    var TagModule = /** @class */ (function () {
        function TagModule() {
        }
        return TagModule;
    }());
    TagModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Tag],
                    declarations: [Tag]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Tag = Tag;
    exports.TagModule = TagModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tag.umd.js.map
