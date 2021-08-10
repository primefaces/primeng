(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/card', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.card = {}), global.ng.core, global.ng.common, global.primeng.api));
}(this, (function (exports, core, common, api) { 'use strict';

    var Card = /** @class */ (function () {
        function Card(el) {
            this.el = el;
        }
        Card.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'title':
                        _this.titleTemplate = item.template;
                        break;
                    case 'subtitle':
                        _this.subtitleTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Card.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        return Card;
    }());
    Card.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-card',
                    template: "\n        <div [ngClass]=\"'p-card p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-card-header\" *ngIf=\"headerFacet || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div class=\"p-card-body\">\n                <div class=\"p-card-title\" *ngIf=\"header || titleTemplate\">\n                    {{header}}\n                    <ng-container *ngTemplateOutlet=\"titleTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-subtitle\" *ngIf=\"subheader || subtitleTemplate\">\n                    {{subheader}}\n                    <ng-container *ngTemplateOutlet=\"subtitleTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n                <div class=\"p-card-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-card-header img{width:100%}"]
                },] }
    ];
    Card.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    Card.propDecorators = {
        header: [{ type: core.Input }],
        subheader: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        headerFacet: [{ type: core.ContentChild, args: [api.Header,] }],
        footerFacet: [{ type: core.ContentChild, args: [api.Footer,] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var CardModule = /** @class */ (function () {
        function CardModule() {
        }
        return CardModule;
    }());
    CardModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Card, api.SharedModule],
                    declarations: [Card]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Card = Card;
    exports.CardModule = CardModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-card.umd.js.map
