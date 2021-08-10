(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/inplace', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inplace = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.api));
}(this, (function (exports, core, common, button, api) { 'use strict';

    var InplaceDisplay = /** @class */ (function () {
        function InplaceDisplay() {
        }
        return InplaceDisplay;
    }());
    InplaceDisplay.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-inplaceDisplay',
                    template: '<ng-content></ng-content>'
                },] }
    ];
    var InplaceContent = /** @class */ (function () {
        function InplaceContent() {
        }
        return InplaceContent;
    }());
    InplaceContent.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-inplaceContent',
                    template: '<ng-content></ng-content>'
                },] }
    ];
    var Inplace = /** @class */ (function () {
        function Inplace(cd) {
            this.cd = cd;
            this.closeIcon = 'pi pi-times';
            this.onActivate = new core.EventEmitter();
            this.onDeactivate = new core.EventEmitter();
        }
        Inplace.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'display':
                        _this.displayTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Inplace.prototype.onActivateClick = function (event) {
            if (!this.preventClick)
                this.activate(event);
        };
        Inplace.prototype.onDeactivateClick = function (event) {
            if (!this.preventClick)
                this.deactivate(event);
        };
        Inplace.prototype.activate = function (event) {
            if (!this.disabled) {
                this.active = true;
                this.onActivate.emit(event);
                this.cd.markForCheck();
            }
        };
        Inplace.prototype.deactivate = function (event) {
            if (!this.disabled) {
                this.active = false;
                this.hover = false;
                this.onDeactivate.emit(event);
                this.cd.markForCheck();
            }
        };
        Inplace.prototype.onKeydown = function (event) {
            if (event.which === 13) {
                this.activate(event);
                event.preventDefault();
            }
        };
        return Inplace;
    }());
    Inplace.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-inplace',
                    template: "\n        <div [ngClass]=\"{'p-inplace p-component': true, 'p-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-inplace-display\" (click)=\"onActivateClick($event)\" tabindex=\"0\" (keydown)=\"onKeydown($event)\"   \n                [ngClass]=\"{'p-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"displayTemplate\"></ng-container>\n            </div>\n            <div class=\"p-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                <button type=\"button\" [icon]=\"closeIcon\" pButton (click)=\"onDeactivateClick($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-inplace .p-inplace-display{cursor:pointer;display:inline}.p-inplace .p-inplace-content{display:inline}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content{display:flex}.p-fluid .p-inplace.p-inplace-closable .p-inplace-content>.p-inputtext{flex:1 1 auto;width:1%}"]
                },] }
    ];
    Inplace.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    Inplace.propDecorators = {
        active: [{ type: core.Input }],
        closable: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        preventClick: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        closeIcon: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        onActivate: [{ type: core.Output }],
        onDeactivate: [{ type: core.Output }]
    };
    var InplaceModule = /** @class */ (function () {
        function InplaceModule() {
        }
        return InplaceModule;
    }());
    InplaceModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, button.ButtonModule],
                    exports: [Inplace, InplaceDisplay, InplaceContent, button.ButtonModule],
                    declarations: [Inplace, InplaceDisplay, InplaceContent]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Inplace = Inplace;
    exports.InplaceContent = InplaceContent;
    exports.InplaceDisplay = InplaceDisplay;
    exports.InplaceModule = InplaceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inplace.umd.js.map
