(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('@angular/router'), require('primeng/ripple')) :
    typeof define === 'function' && define.amd ? define('primeng/menubar', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api', '@angular/router', 'primeng/ripple'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.menubar = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api, global.ng.router, global.primeng.ripple));
}(this, (function (exports, core, common, dom, api, router, ripple) { 'use strict';

    var MenubarSub = /** @class */ (function () {
        function MenubarSub(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.leafClick = new core.EventEmitter();
            this.menuHoverActive = false;
        }
        Object.defineProperty(MenubarSub.prototype, "parentActive", {
            get: function () {
                return this._parentActive;
            },
            set: function (value) {
                if (!this.root) {
                    this._parentActive = value;
                    if (!value)
                        this.activeItem = null;
                }
            },
            enumerable: false,
            configurable: true
        });
        MenubarSub.prototype.onItemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url && !item.routerLink) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (item.items) {
                if (this.activeItem && item === this.activeItem) {
                    this.activeItem = null;
                    this.unbindDocumentClickListener();
                }
                else {
                    this.activeItem = item;
                    if (this.root) {
                        this.bindDocumentClickListener();
                    }
                }
            }
            if (!item.items) {
                this.onLeafClick();
            }
        };
        MenubarSub.prototype.onItemMouseEnter = function (event, item) {
            if (item.disabled || this.mobileActive) {
                event.preventDefault();
                return;
            }
            if (this.root) {
                if (this.activeItem || this.autoDisplay) {
                    this.activeItem = item;
                    this.bindDocumentClickListener();
                }
            }
            else {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        };
        MenubarSub.prototype.onLeafClick = function () {
            this.activeItem = null;
            if (this.root) {
                this.unbindDocumentClickListener();
            }
            this.leafClick.emit();
        };
        MenubarSub.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (_this.el && !_this.el.nativeElement.contains(event.target)) {
                        _this.activeItem = null;
                        _this.cd.markForCheck();
                        _this.unbindDocumentClickListener();
                    }
                };
                document.addEventListener('click', this.documentClickListener);
            }
        };
        MenubarSub.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        };
        MenubarSub.prototype.ngOnDestroy = function () {
            this.unbindDocumentClickListener();
        };
        return MenubarSub;
    }());
    MenubarSub.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-menubarSub',
                    template: "\n        <ul [ngClass]=\"{'p-submenu-list': !root, 'p-menubar-root-list': root}\" [attr.role]=\"root ? 'menubar' : 'menu'\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"p-menu-separator\" [ngClass]=\"{'p-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'p-menuitem':true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" role=\"none\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\" \n                         [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlLabel\">{{child.label}}</span>\n                        <ng-template #htmlLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi\" *ngIf=\"child.items\" [ngClass]=\"{'pi-angle-down':root,'pi-angle-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'p-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" role=\"menuitem\"\n                        (click)=\"onItemClick($event, child)\" (mouseenter)=\"onItemMouseEnter($event,child)\" \n                        [ngClass]=\"{'p-menuitem-link':true,'p-disabled':child.disabled}\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\" pRipple>\n                        <span class=\"p-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"p-menuitem-text\" *ngIf=\"child.escape !== false; else htmlRouteLabel\">{{child.label}}</span>\n                        <ng-template #htmlRouteLabel><span class=\"p-menuitem-text\" [innerHTML]=\"child.label\"></span></ng-template>\n                        <span class=\"p-submenu-icon pi\" *ngIf=\"child.items\" [ngClass]=\"{'pi-angle-down':root,'pi-angle-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub [parentActive]=\"child === activeItem\" [item]=\"child\" *ngIf=\"child.items\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\" (leafClick)=\"onLeafClick()\"></p-menubarSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    MenubarSub.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef }
    ]; };
    MenubarSub.propDecorators = {
        item: [{ type: core.Input }],
        root: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        mobileActive: [{ type: core.Input }],
        autoDisplay: [{ type: core.Input }],
        parentActive: [{ type: core.Input }],
        leafClick: [{ type: core.Output }]
    };
    var Menubar = /** @class */ (function () {
        function Menubar(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.autoZIndex = true;
            this.baseZIndex = 0;
        }
        Menubar.prototype.ngAfterContentInit = function () {
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
        Menubar.prototype.toggle = function (event) {
            this.mobileActive = !this.mobileActive;
            var rootmenu = dom.DomHandler.findSingle(this.el.nativeElement, ".p-menubar-root-list");
            rootmenu.style.zIndex = String(dom.DomHandler.generateZIndex());
            this.bindOutsideClickListener();
            event.preventDefault();
        };
        Menubar.prototype.bindOutsideClickListener = function () {
            var _this = this;
            if (!this.outsideClickListener) {
                this.outsideClickListener = function (event) {
                    if (_this.mobileActive && _this.rootmenu.el.nativeElement !== event.target && !_this.rootmenu.el.nativeElement.contains(event.target)
                        && _this.menubutton.nativeElement !== event.target && !_this.menubutton.nativeElement.contains(event.target)) {
                        _this.mobileActive = false;
                        _this.cd.markForCheck();
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        };
        Menubar.prototype.onLeafClick = function () {
            this.mobileActive = false;
            this.unbindOutsideClickListener();
        };
        Menubar.prototype.unbindOutsideClickListener = function () {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        };
        Menubar.prototype.ngOnDestroy = function () {
            this.unbindOutsideClickListener();
        };
        return Menubar;
    }());
    Menubar.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-menubar',
                    template: "\n        <div [ngClass]=\"{'p-menubar p-component':true, 'p-menubar-mobile-active': mobileActive}\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <div class=\"p-menubar-start\" *ngIf=\"startTemplate\">\n                <ng-container *ngTemplateOutlet=\"startTemplate\"></ng-container>\n            </div>\n            <a #menubutton tabindex=\"0\" class=\"p-menubar-button\" (click)=\"toggle($event)\">\n                <i class=\"pi pi-bars\"></i>\n            </a>\n            <p-menubarSub #rootmenu [item]=\"model\" root=\"root\" [baseZIndex]=\"baseZIndex\" (leafClick)=\"onLeafClick()\" [autoZIndex]=\"autoZIndex\" [mobileActive]=\"mobileActive\" [autoDisplay]=\"autoDisplay\"></p-menubarSub>\n            <div class=\"p-menubar-end\" *ngIf=\"endTemplate; else legacy\">\n                <ng-container *ngTemplateOutlet=\"endTemplate\"></ng-container>\n            </div>\n            <ng-template #legacy>\n                <div class=\"p-menubar-end\">\n                    <ng-content></ng-content>\n                </div>\n            </ng-template>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-menubar{align-items:center;display:flex}.p-menubar ul{list-style:none;margin:0;padding:0}.p-menubar .p-menuitem-link{align-items:center;cursor:pointer;display:flex;overflow:hidden;position:relative;text-decoration:none}.p-menubar .p-menuitem-text{line-height:1}.p-menubar .p-menuitem{position:relative}.p-menubar-root-list{align-items:center;display:flex}.p-menubar-root-list>li ul{display:none;z-index:1}.p-menubar-root-list>.p-menuitem-active>p-menubarsub>.p-submenu-list{display:block}.p-menubar .p-submenu-list{display:none;position:absolute;z-index:1}.p-menubar .p-submenu-list>.p-menuitem-active>p-menubarsub>.p-submenu-list{display:block;left:100%;top:0}.p-menubar .p-submenu-list .p-menuitem-link .p-submenu-icon{margin-left:auto}.p-menubar .p-menubar-custom,.p-menubar .p-menubar-end{-ms-grid-row-align:center;align-self:center;margin-left:auto}.p-menubar-button{align-items:center;cursor:pointer;display:none;justify-content:center}"]
                },] }
    ];
    Menubar.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef }
    ]; };
    Menubar.propDecorators = {
        model: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        autoZIndex: [{ type: core.Input }],
        baseZIndex: [{ type: core.Input }],
        autoDisplay: [{ type: core.Input }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        menubutton: [{ type: core.ViewChild, args: ['menubutton',] }],
        rootmenu: [{ type: core.ViewChild, args: ['rootmenu',] }]
    };
    var MenubarModule = /** @class */ (function () {
        function MenubarModule() {
        }
        return MenubarModule;
    }());
    MenubarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, router.RouterModule, ripple.RippleModule],
                    exports: [Menubar, router.RouterModule],
                    declarations: [Menubar, MenubarSub]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Menubar = Menubar;
    exports.MenubarModule = MenubarModule;
    exports.MenubarSub = MenubarSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-menubar.umd.js.map
