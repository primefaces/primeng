(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/router'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/megamenu', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/router', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.megamenu = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.router, global.primeng.ripple));
}(this, (function (exports, core, common, api, router, ripple) { 'use strict';

    var MegaMenu = /** @class */ (function () {
        function MegaMenu(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.orientation = 'horizontal';
            this.autoZIndex = true;
            this.baseZIndex = 0;
        }
        MegaMenu.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'start':
                        _this.startTemplate = item.template;
                        break;
                    case 'end':
                        _this.endTemplate = item.template;
                        break;
                }
            });
        };
        MegaMenu.prototype.onCategoryMouseEnter = function (event, menuitem) {
            if (menuitem.disabled) {
                event.preventDefault();
                return;
            }
            if (this.activeItem) {
                this.activeItem = menuitem;
            }
        };
        MegaMenu.prototype.onCategoryClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items) {
                if (this.activeItem && this.activeItem === item) {
                    this.activeItem = null;
                    this.unbindDocumentClickListener();
                }
                else {
                    this.activeItem = item;
                    this.bindDocumentClickListener();
                }
            }
        };
        MegaMenu.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            this.activeItem = null;
        };
        MegaMenu.prototype.getColumnClass = function (menuitem) {
            var length = menuitem.items ? menuitem.items.length : 0;
            var columnClass;
            switch (length) {
                case 2:
                    columnClass = 'p-megamenu-col-6';
                    break;
                case 3:
                    columnClass = 'p-megamenu-col-4';
                    break;
                case 4:
                    columnClass = 'p-megamenu-col-3';
                    break;
                case 6:
                    columnClass = 'p-megamenu-col-2';
                    break;
                default:
                    columnClass = 'p-megamenu-col-12';
                    break;
            }
            return columnClass;
        };
        MegaMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (_this.el && !_this.el.nativeElement.contains(event.target)) {
                        _this.activeItem = null;
                        _this.unbindDocumentClickListener();
                        _this.cd.markForCheck();
                    }
                };
                document.addEventListener('click', this.documentClickListener);
            }
        };
        MegaMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        };
        return MegaMenu;
    }());
    MegaMenu.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-megaMenu',
                    template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'p-megamenu p-component':true,'p-megamenu-horizontal': orientation == 'horizontal','p-megamenu-vertical': orientation == 'vertical'}\">\n            <div class=\"p-megamenu-start\" *ngIf=\"startTemplate\">\n                <ng-container *ngTemplateOutlet=\"startTemplate\"></ng-container>\n            </div>\n            <ul class=\"p-megamenu-root-list\" role=\"menubar\">\n                <ng-template ngFor let-category [ngForOf]=\"model\">\n                    <li *ngIf=\"category.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': category.visible === false}\">\n                    <li *ngIf=\"!category.separator\" [ngClass]=\"{'p-menuitem':true,'p-menuitem-active':category==activeItem, 'p-hidden': category.visible === false}\"\n                        (mouseenter)=\"onCategoryMouseEnter($event, category)\">\n                        <a *ngIf=\"!category.routerLink\" [href]=\"category.url||'#'\" [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\" (click)=\"onCategoryClick($event, category)\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [ngClass]=\"{'p-menuitem-link':true,'p-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\" pRipple>\n                            <span class=\"p-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"category.escape !== false; else categoryHtmlLabel\">{{category.label}}</span>\n                            <ng-template #categoryHtmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"category.label\"></span></ng-template>\n                            <span *ngIf=\"category.items\" class=\"p-submenu-icon pi\" [ngClass]=\"{'pi-angle-down':orientation=='horizontal','pi-angle-right':orientation=='vertical'}\"></span>\n                        </a>\n                        <a *ngIf=\"category.routerLink\" [routerLink]=\"category.routerLink\" [queryParams]=\"category.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"category.routerLinkActiveOptions||{exact:false}\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\" \n                            [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\"\n                            (click)=\"onCategoryClick($event, category)\" [ngClass]=\"{'p-menuitem-link':true,'p-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\"\n                            [fragment]=\"category.fragment\" [queryParamsHandling]=\"category.queryParamsHandling\" [preserveFragment]=\"category.preserveFragment\" [skipLocationChange]=\"category.skipLocationChange\" [replaceUrl]=\"category.replaceUrl\" [state]=\"category.state\" pRipple>\n                            <span class=\"p-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"category.escape !== false; else categoryHtmlRouteLabel\">{{category.label}}</span>\n                            <ng-template #categoryHtmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"category.label\"></span></ng-template>\n                        </a>\n                        <div class=\"p-megamenu-panel\" *ngIf=\"category.items\">\n                            <div class=\"p-megamenu-grid\">\n                                <ng-template ngFor let-column [ngForOf]=\"category.items\">\n                                    <div [class]=\"getColumnClass(category)\">\n                                        <ng-template ngFor let-submenu [ngForOf]=\"column\">\n                                            <ul class=\"p-megamenu-submenu\" role=\"menu\">\n                                                <li class=\"p-megamenu-submenu-header\">\n                                                    <span *ngIf=\"submenu.escape !== false; else submenuHtmlLabel\">{{submenu.label}}</span>\n                                                    <ng-template #submenuHtmlLabel><span [innerHTML]=\"submenu.label\"></span></ng-template>\n                                                </li>\n                                                <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                                                    <li *ngIf=\"item.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': item.visible === false}\" role=\"separator\">\n                                                    <li *ngIf=\"!item.separator\" class=\"p-menuitem\" [ngClass]=\"{'p-hidden': item.visible === false}\" role=\"none\">\n                                                        <a *ngIf=\"!item.routerLink\" role=\"menuitem\" [href]=\"item.url||'#'\" class=\"p-menuitem-link\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [ngClass]=\"{'p-disabled':item.disabled}\" (click)=\"itemClick($event, item)\" pRipple>\n                                                            <span class=\"p-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                                                            <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                                                        </a>\n                                                        <a *ngIf=\"item.routerLink\" role=\"menuitem\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" \n                                                             [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                                                            [ngClass]=\"{'p-disabled':item.disabled}\" (click)=\"itemClick($event, item)\"\n                                                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\" pRipple>\n                                                            <span class=\"p-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                                                            <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                                                        </a>\n                                                    </li>\n                                                </ng-template>\n                                            </ul>\n                                        </ng-template>\n                                    </div>\n                                </ng-template>\n                            </div>\n                        </div>\n                    </li>\n                </ng-template>\n                <div class=\"p-megamenu-end\" *ngIf=\"endTemplate; else legacy\">\n                    <ng-container *ngTemplateOutlet=\"endTemplate\"></ng-container>\n                </div>\n                <ng-template #legacy>\n                    <div class=\"p-megamenu-end\">\n                        <ng-content></ng-content>\n                    </div>\n                </ng-template>\n            </ul>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-megamenu-root-list{list-style:none;margin:0;padding:0}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{align-items:center;cursor:pointer;display:flex;overflow:hidden;position:relative;text-decoration:none}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{list-style:none;margin:0;padding:0}.p-megamenu-horizontal .p-megamenu-root-list{align-items:center;display:flex;flex-wrap:wrap}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-link>.p-submenu-icon{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}"]
                },] }
    ];
    MegaMenu.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef }
    ]; };
    MegaMenu.propDecorators = {
        model: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        orientation: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var MegaMenuModule = /** @class */ (function () {
        function MegaMenuModule() {
        }
        return MegaMenuModule;
    }());
    MegaMenuModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule, ripple.RippleModule],
                    exports: [MegaMenu, router.RouterModule],
                    declarations: [MegaMenu]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MegaMenu = MegaMenu;
    exports.MegaMenuModule = MegaMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-megamenu.umd.js.map
