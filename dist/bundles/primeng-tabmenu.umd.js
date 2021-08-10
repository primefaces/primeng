(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/ripple'), require('primeng/api'), require('@angular/router'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/tabmenu', ['exports', '@angular/core', '@angular/common', 'primeng/ripple', 'primeng/api', '@angular/router', 'primeng/dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.tabmenu = {}), global.ng.core, global.ng.common, global.primeng.ripple, global.primeng.api, global.ng.router, global.primeng.dom));
}(this, (function (exports, core, common, ripple, api, router, dom) { 'use strict';

    var TabMenu = /** @class */ (function () {
        function TabMenu() {
        }
        TabMenu.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        TabMenu.prototype.ngAfterViewInit = function () {
            this.updateInkBar();
        };
        TabMenu.prototype.ngAfterViewChecked = function () {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        };
        TabMenu.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            this.activeItem = item;
            this.tabChanged = true;
        };
        TabMenu.prototype.updateInkBar = function () {
            var tabHeader = dom.DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
            if (tabHeader) {
                this.inkbar.nativeElement.style.width = dom.DomHandler.getWidth(tabHeader) + 'px';
                this.inkbar.nativeElement.style.left = dom.DomHandler.getOffset(tabHeader).left - dom.DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
            }
        };
        return TabMenu;
    }());
    TabMenu.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-tabMenu',
                    template: "\n        <div [ngClass]=\"'p-tabmenu p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul #navbar class=\"p-tabmenu-nav p-reset\" role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" role=\"tab\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\" [attr.aria-selected]=\"activeItem==item\" [attr.aria-expanded]=\"activeItem==item\"\n                    [ngClass]=\"{'p-tabmenuitem':true,'p-disabled':item.disabled,'p-highlight':activeItem==item,'p-hidden': item.visible === false}\">\n                    <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url\" class=\"p-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event,item)\" (keydown.enter)=\"itemClick($event,item)\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" pRipple>\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"p-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlLabel\">{{item.label}}</span>\n                            <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\"\n                        role=\"presentation\" class=\"p-menuitem-link\" (click)=\"itemClick($event,item)\" (keydown.enter)=\"itemClick($event,item)\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\" pRipple>\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"p-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"p-menuitem-text\" *ngIf=\"item.escape !== false; else htmlRouteLabel\">{{item.label}}</span>\n                            <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                </li>\n                <li #inkbar class=\"p-tabmenu-ink-bar\"></li>\n            </ul>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-tabmenu-nav{display:flex;flex-wrap:wrap;list-style-type:none;margin:0;padding:0}.p-tabmenu-nav a{-ms-user-select:none;-webkit-user-select:none;align-items:center;cursor:pointer;display:flex;overflow:hidden;position:relative;text-decoration:none;user-select:none}.p-tabmenu-nav a:focus{z-index:1}.p-tabmenu-nav .p-menuitem-text{line-height:1}.p-tabmenu-ink-bar{display:none;z-index:1}"]
                },] }
    ];
    TabMenu.propDecorators = {
        model: [{ type: core.Input }],
        activeItem: [{ type: core.Input }],
        popup: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        navbar: [{ type: core.ViewChild, args: ['navbar',] }],
        inkbar: [{ type: core.ViewChild, args: ['inkbar',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var TabMenuModule = /** @class */ (function () {
        function TabMenuModule() {
        }
        return TabMenuModule;
    }());
    TabMenuModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule, api.SharedModule, ripple.RippleModule],
                    exports: [TabMenu, router.RouterModule, api.SharedModule],
                    declarations: [TabMenu]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TabMenu = TabMenu;
    exports.TabMenuModule = TabMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tabmenu.umd.js.map
