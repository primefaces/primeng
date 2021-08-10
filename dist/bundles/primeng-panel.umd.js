(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/ripple'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('primeng/panel', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/ripple', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.panel = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.ripple, global.ng.animations));
}(this, (function (exports, core, common, api, ripple, animations) { 'use strict';

    var idx = 0;
    var Panel = /** @class */ (function () {
        function Panel(el) {
            this.el = el;
            this.collapsed = false;
            this.expandIcon = 'pi pi-plus';
            this.collapseIcon = 'pi pi-minus';
            this.showHeader = true;
            this.toggler = "icon";
            this.collapsedChange = new core.EventEmitter();
            this.onBeforeToggle = new core.EventEmitter();
            this.onAfterToggle = new core.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "p-panel-" + idx++;
        }
        Panel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    case 'icons':
                        _this.iconTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Panel.prototype.onHeaderClick = function (event) {
            if (this.toggler === 'header') {
                this.toggle(event);
            }
        };
        Panel.prototype.onIconClick = function (event) {
            if (this.toggler === 'icon') {
                this.toggle(event);
            }
        };
        Panel.prototype.toggle = function (event) {
            if (this.animating) {
                return false;
            }
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.toggleable) {
                if (this.collapsed)
                    this.expand(event);
                else
                    this.collapse(event);
            }
            event.preventDefault();
        };
        Panel.prototype.expand = function (event) {
            this.collapsed = false;
            this.collapsedChange.emit(this.collapsed);
        };
        Panel.prototype.collapse = function (event) {
            this.collapsed = true;
            this.collapsedChange.emit(this.collapsed);
        };
        Panel.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Panel.prototype.onToggleDone = function (event) {
            this.animating = false;
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        };
        return Panel;
    }());
    Panel.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-panel',
                    template: "\n        <div [attr.id]=\"id\" [ngClass]=\"{'p-panel p-component': true, 'p-panel-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-panel-header\" *ngIf=\"showHeader\" (click)=\"onHeaderClick($event)\" [attr.id]=\"id + '-titlebar'\">\n                <span class=\"p-panel-title\" *ngIf=\"header\" [attr.id]=\"id + '_header'\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <div class=\"p-panel-icons\">\n                    <ng-template *ngTemplateOutlet=\"iconTemplate\"></ng-template>\n                    <button *ngIf=\"toggleable\" type=\"button\" [attr.id]=\"id + '-label'\" class=\"p-panel-header-icon p-panel-toggler p-link\" pRipple\n                        (click)=\"onIconClick($event)\" (keydown.enter)=\"onIconClick($event)\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"!collapsed\">\n                        <span [class]=\"collapsed ? expandIcon : collapseIcon\"></span>\n                    </button>\n                </div>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"p-toggleable-content\" [@panelContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}\" (@panelContent.done)=\"onToggleDone($event)\"\n                role=\"region\" [attr.aria-hidden]=\"collapsed\" [attr.aria-labelledby]=\"id  + '-titlebar'\">\n                <div class=\"p-panel-content\">\n                    <ng-content></ng-content>\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </div>\n                \n                <div class=\"p-panel-footer\" *ngIf=\"footerFacet || footerTemplate\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                    <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n                </div>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations.trigger('panelContent', [
                            animations.state('hidden', animations.style({
                                height: '0',
                                overflow: 'hidden'
                            })),
                            animations.state('void', animations.style({
                                height: '{{height}}'
                            }), { params: { height: '0' } }),
                            animations.state('visible', animations.style({
                                height: '*'
                            })),
                            animations.transition('visible <=> hidden', [animations.style({ overflow: 'hidden' }), animations.animate('{{transitionParams}}')]),
                            animations.transition('void => hidden', animations.animate('{{transitionParams}}')),
                            animations.transition('void => visible', animations.animate('{{transitionParams}}'))
                        ])
                    ],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-panel-header{align-items:center;display:flex;justify-content:space-between}.p-panel-title{line-height:1}.p-panel-header-icon{align-items:center;cursor:pointer;display:inline-flex;justify-content:center;overflow:hidden;position:relative;text-decoration:none}"]
                },] }
    ];
    Panel.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    Panel.propDecorators = {
        toggleable: [{ type: core.Input }],
        header: [{ type: core.Input }],
        collapsed: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        expandIcon: [{ type: core.Input }],
        collapseIcon: [{ type: core.Input }],
        showHeader: [{ type: core.Input }],
        toggler: [{ type: core.Input }],
        collapsedChange: [{ type: core.Output }],
        onBeforeToggle: [{ type: core.Output }],
        onAfterToggle: [{ type: core.Output }],
        transitionOptions: [{ type: core.Input }],
        footerFacet: [{ type: core.ContentChild, args: [api.Footer,] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var PanelModule = /** @class */ (function () {
        function PanelModule() {
        }
        return PanelModule;
    }());
    PanelModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, ripple.RippleModule],
                    exports: [Panel, api.SharedModule],
                    declarations: [Panel]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Panel = Panel;
    exports.PanelModule = PanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-panel.umd.js.map
