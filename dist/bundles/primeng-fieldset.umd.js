(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/fieldset', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.fieldset = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api, global.primeng.ripple));
}(this, (function (exports, core, animations, common, api, ripple) { 'use strict';

    var idx = 0;
    var Fieldset = /** @class */ (function () {
        function Fieldset(el) {
            this.el = el;
            this.collapsed = false;
            this.collapsedChange = new core.EventEmitter();
            this.onBeforeToggle = new core.EventEmitter();
            this.onAfterToggle = new core.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "p-fieldset-" + idx++;
        }
        Fieldset.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Fieldset.prototype.toggle = function (event) {
            if (this.animating) {
                return false;
            }
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            event.preventDefault();
        };
        Fieldset.prototype.expand = function (event) {
            this.collapsed = false;
            this.collapsedChange.emit(this.collapsed);
        };
        Fieldset.prototype.collapse = function (event) {
            this.collapsed = true;
            this.collapsedChange.emit(this.collapsed);
        };
        Fieldset.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Fieldset.prototype.onToggleDone = function (event) {
            this.animating = false;
        };
        return Fieldset;
    }());
    Fieldset.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-fieldset',
                    template: "\n        <fieldset [attr.id]=\"id\" [ngClass]=\"{'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"p-fieldset-legend\">\n                <ng-container *ngIf=\"toggleable; else legendContent\">\n                    <a tabindex=\"0\" (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"!collapsed\" pRipple>\n                        <span class=\"p-fieldset-toggler pi\" *ngIf=\"toggleable\" [ngClass]=\"{'pi-minus': !collapsed,'pi-plus':collapsed}\"></span>\n                        <ng-container *ngTemplateOutlet=\"legendContent\"></ng-container>\n                    </a>\n                </ng-container>\n                <ng-template #legendContent>\n                    <span class=\"p-fieldset-legend-text\">{{legend}}</span>\n                    <ng-content select=\"p-header\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                </ng-template>\n            </legend>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@fieldsetContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}\" \n                        [attr.aria-labelledby]=\"id\" [attr.aria-hidden]=\"collapsed\"\n                         (@fieldsetContent.done)=\"onToggleDone($event)\" role=\"region\">\n                <div class=\"p-fieldset-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n            </div>\n        </fieldset>\n    ",
                    animations: [
                        animations.trigger('fieldsetContent', [
                            animations.state('hidden', animations.style({
                                height: '0',
                                overflow: 'hidden'
                            })),
                            animations.state('visible', animations.style({
                                height: '*'
                            })),
                            animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                            animations.transition('void => *', animations.animate(0))
                        ])
                    ],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-fieldset-legend>a,.p-fieldset-legend>span{align-items:center;display:flex;justify-content:center}.p-fieldset-toggleable .p-fieldset-legend a{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;overflow:hidden;position:relative;user-select:none}.p-fieldset-legend-text{line-height:1}"]
                },] }
    ];
    Fieldset.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    Fieldset.propDecorators = {
        legend: [{ type: core.Input }],
        toggleable: [{ type: core.Input }],
        collapsed: [{ type: core.Input }],
        collapsedChange: [{ type: core.Output }],
        onBeforeToggle: [{ type: core.Output }],
        onAfterToggle: [{ type: core.Output }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        transitionOptions: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var FieldsetModule = /** @class */ (function () {
        function FieldsetModule() {
        }
        return FieldsetModule;
    }());
    FieldsetModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, ripple.RippleModule],
                    exports: [Fieldset, api.SharedModule],
                    declarations: [Fieldset]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Fieldset = Fieldset;
    exports.FieldsetModule = FieldsetModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fieldset.umd.js.map
