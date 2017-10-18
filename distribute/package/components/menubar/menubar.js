"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var router_1 = require("@angular/router");
var MenubarSub = (function () {
    function MenubarSub(domHandler) {
        this.domHandler = domHandler;
    }
    MenubarSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (menuitem.disabled) {
            return;
        }
        this.activeItem = item;
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            sublist.style.zIndex = String(++domhandler_1.DomHandler.zindex);
            if (this.root) {
                sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist.style.left = '0px';
            }
            else {
                sublist.style.top = '0px';
                sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    };
    MenubarSub.prototype.onItemMouseLeave = function (event) {
        this.activeItem = null;
    };
    MenubarSub.prototype.itemClick = function (event, item) {
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
    MenubarSub.prototype.listClick = function (event) {
        this.activeItem = null;
    };
    return MenubarSub;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MenubarSub.prototype, "item", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MenubarSub.prototype, "root", void 0);
MenubarSub = __decorate([
    core_1.Component({
        selector: 'p-menubarSub',
        template: "\n        <ul [ngClass]=\"{'ui-menubar-root-list ui-helper-clearfix':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event,listItem,child)\" (mouseleave)=\"onItemMouseLeave($event)\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" (click)=\"itemClick($event, child)\"\n                         [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled,'ui-helper-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon fa fa-fw\" *ngIf=\"child.items\" [ngClass]=\"{'fa-caret-down':root,'fa-caret-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" \n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled,'ui-helper-hidden': child.visible === false}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon fa fa-fw\" *ngIf=\"child.items\" [ngClass]=\"{'fa-caret-down':root,'fa-caret-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-menubarSub>\n                </li>\n            </ng-template>\n            <li class=\"ui-menuitem ui-menuitem-custom ui-widget ui-corner-all\">\n                <ng-content></ng-content>\n            </li>\n        </ul>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [domhandler_1.DomHandler])
], MenubarSub);
exports.MenubarSub = MenubarSub;
var Menubar = (function () {
    function Menubar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    return Menubar;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], Menubar.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Menubar.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Menubar.prototype, "styleClass", void 0);
Menubar = __decorate([
    core_1.Component({
        selector: 'p-menubar',
        template: "\n        <div [ngClass]=\"{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-menubarSub [item]=\"model\" root=\"root\">\n                <ng-content></ng-content>\n            </p-menubarSub>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2])
], Menubar);
exports.Menubar = Menubar;
var MenubarModule = (function () {
    function MenubarModule() {
    }
    return MenubarModule;
}());
MenubarModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, router_1.RouterModule],
        exports: [Menubar, router_1.RouterModule],
        declarations: [Menubar, MenubarSub]
    })
], MenubarModule);
exports.MenubarModule = MenubarModule;
//# sourceMappingURL=menubar.js.map