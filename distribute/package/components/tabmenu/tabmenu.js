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
var TabMenu = (function () {
    function TabMenu() {
    }
    TabMenu.prototype.itemClick = function (event, item) {
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
        this.activeItem = item;
    };
    return TabMenu;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TabMenu.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabMenu.prototype, "activeItem", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TabMenu.prototype, "popup", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabMenu.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabMenu.prototype, "styleClass", void 0);
TabMenu = __decorate([
    core_1.Component({
        selector: 'p-tabMenu',
        template: "\n        <div [ngClass]=\"'ui-tabmenu ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\">\n                <li *ngFor=\"let item of model\" \n                    [ngClass]=\"{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,\n                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item,'ui-helper-hidden': item.visible === false}\"\n                        [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\">\n                    <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\">\n                        <span class=\"ui-menuitem-icon fa\" [ngClass]=\"item.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\">\n                        <span class=\"ui-menuitem-icon fa\" [ngClass]=\"item.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler]
    })
], TabMenu);
exports.TabMenu = TabMenu;
var TabMenuModule = (function () {
    function TabMenuModule() {
    }
    return TabMenuModule;
}());
TabMenuModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, router_1.RouterModule],
        exports: [TabMenu, router_1.RouterModule],
        declarations: [TabMenu]
    })
], TabMenuModule);
exports.TabMenuModule = TabMenuModule;
//# sourceMappingURL=tabmenu.js.map