(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/toolbar', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.toolbar = {}), global.ng.core, global.ng.common, global.primeng.api));
}(this, (function (exports, core, common, api) { 'use strict';

    var Toolbar = /** @class */ (function () {
        function Toolbar(el) {
            this.el = el;
        }
        Toolbar.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Toolbar.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'left':
                        _this.leftTemplate = item.template;
                        break;
                    case 'right':
                        _this.rightTemplate = item.template;
                        break;
                }
            });
        };
        return Toolbar;
    }());
    Toolbar.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-toolbar',
                    template: "\n        <div [ngClass]=\"'p-toolbar p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"toolbar\">\n            <ng-content></ng-content>\n            <div class=\"p-toolbar-group-left\" *ngIf=\"leftTemplate\">\n                <ng-container *ngTemplateOutlet=\"leftTemplate\"></ng-container>\n            </div>\n            <div class=\"p-toolbar-group-right\" *ngIf=\"rightTemplate\">\n                <ng-container *ngTemplateOutlet=\"rightTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-toolbar{flex-wrap:wrap;justify-content:space-between}.p-toolbar,.p-toolbar-group-left,.p-toolbar-group-right{align-items:center;display:flex}"]
                },] }
    ];
    Toolbar.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    Toolbar.propDecorators = {
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var ToolbarModule = /** @class */ (function () {
        function ToolbarModule() {
        }
        return ToolbarModule;
    }());
    ToolbarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Toolbar],
                    declarations: [Toolbar]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Toolbar = Toolbar;
    exports.ToolbarModule = ToolbarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-toolbar.umd.js.map
