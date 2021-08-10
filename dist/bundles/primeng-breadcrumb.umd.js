(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/breadcrumb', ['exports', '@angular/core', '@angular/common', '@angular/router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.breadcrumb = {}), global.ng.core, global.ng.common, global.ng.router));
}(this, (function (exports, core, common, router) { 'use strict';

    var Breadcrumb = /** @class */ (function () {
        function Breadcrumb() {
            this.onItemClick = new core.EventEmitter();
        }
        Breadcrumb.prototype.itemClick = function (event, item) {
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
            this.onItemClick.emit({
                originalEvent: event,
                item: item
            });
        };
        Breadcrumb.prototype.onHomeClick = function (event) {
            if (this.home) {
                this.itemClick(event, this.home);
            }
        };
        return Breadcrumb;
    }());
    Breadcrumb.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-breadcrumb',
                    template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'p-breadcrumb p-component'\">\n            <ul>\n                <li [class]=\"home.styleClass\" [ngClass]=\"{'p-breadcrumb-home': true, 'p-disabled':home.disabled}\" [ngStyle]=\"home.style\" *ngIf=\"home\">\n                    <a *ngIf=\"!home.routerLink\" [href]=\"home.url ? home.url : null\" class=\"p-menuitem-link\" (click)=\"itemClick($event, home)\" \n                        [attr.target]=\"home.target\" [attr.title]=\"home.title\" [attr.id]=\"home.id\" [attr.tabindex]=\"home.disabled ? null : '0'\">\n                        <span *ngIf=\"home.icon\" class=\"p-menuitem-icon\" [ngClass]=\"home.icon||'pi pi-home'\"></span>\n                        <ng-container *ngIf=\"home.label\">\n                            <span *ngIf=\"home.escape !== false; else htmlHomeLabel\" class=\"p-menuitem-text\">{{home.label}}</span>\n                            <ng-template #htmlHomeLabel><span class=\"p-menuitem-text\" [innerHTML]=\"home.label\"></span></ng-template>\n                        </ng-container>\n                    </a>\n                    <a *ngIf=\"home.routerLink\" [routerLink]=\"home.routerLink\" [queryParams]=\"home.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"home.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" (click)=\"itemClick($event, home)\" \n                        [attr.target]=\"home.target\" [attr.title]=\"home.title\" [attr.id]=\"home.id\" [attr.tabindex]=\"home.disabled ? null : '0'\"\n                        [fragment]=\"home.fragment\" [queryParamsHandling]=\"home.queryParamsHandling\" [preserveFragment]=\"home.preserveFragment\" [skipLocationChange]=\"home.skipLocationChange\" [replaceUrl]=\"home.replaceUrl\" [state]=\"home.state\">\n                        <span *ngIf=\"home.icon\" class=\"p-menuitem-icon\" [ngClass]=\"home.icon||'pi pi-home'\"></span>\n                        <ng-container *ngIf=\"home.label\">\n                            <span *ngIf=\"home.escape !== false; else htmlHomeRouteLabel\" class=\"p-menuitem-text\">{{home.label}}</span>\n                            <ng-template #htmlHomeRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"home.label\"></span></ng-template>\n                        </ng-container>\n                    </a>\n                </li>\n                <li class=\"p-breadcrumb-chevron pi pi-chevron-right\" *ngIf=\"model&&home\"></li>\n                <ng-template ngFor let-item let-end=\"last\" [ngForOf]=\"model\">\n                    <li [class]=\"item.styleClass\" [ngStyle]=\"item.style\" [ngClass]=\"{'p-disabled':item.disabled}\">\n                        <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url ? item.url : null\" class=\"p-menuitem-link\" (click)=\"itemClick($event, item)\" \n                            [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled ? null : '0'\">\n                            <span *ngIf=\"item.icon\" class=\"p-menuitem-icon\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngIf=\"item.label\">\n                                <span *ngIf=\"item.escape !== false; else htmlLabel\" class=\"p-menuitem-text\">{{item.label}}</span>\n                                <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                            </ng-container>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\"  [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"p-menuitem-link\" (click)=\"itemClick($event, item)\" \n                            [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled ? null : '0'\"\n                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                            <span *ngIf=\"item.icon\" class=\"p-menuitem-icon\" [ngClass]=\"item.icon\"></span>\n                            <ng-container *ngIf=\"item.label\">\n                                <span *ngIf=\"item.escape !== false; else htmlRouteLabel\" class=\"p-menuitem-text\">{{item.label}}</span>\n                                <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"item.label\"></span></ng-template>\n                            </ng-container>\n                        </a>\n                    </li>\n                    <li class=\"p-breadcrumb-chevron pi pi-chevron-right\" *ngIf=\"!end\"></li>\n                </ng-template>\n            </ul>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-breadcrumb ul{align-items:center;display:flex;flex-wrap:wrap;list-style-type:none;margin:0;padding:0}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none}"]
                },] }
    ];
    Breadcrumb.propDecorators = {
        model: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        home: [{ type: core.Input }],
        onItemClick: [{ type: core.Output }]
    };
    var BreadcrumbModule = /** @class */ (function () {
        function BreadcrumbModule() {
        }
        return BreadcrumbModule;
    }());
    BreadcrumbModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule],
                    exports: [Breadcrumb, router.RouterModule],
                    declarations: [Breadcrumb]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Breadcrumb = Breadcrumb;
    exports.BreadcrumbModule = BreadcrumbModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-breadcrumb.umd.js.map
