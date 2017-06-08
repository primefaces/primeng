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
var button_1 = require("../button/button");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var SplitButton = (function () {
    function SplitButton(el, domHandler, renderer, router, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.cd = cd;
        this.iconPos = 'left';
        this.onClick = new core_1.EventEmitter();
        this.onDropdownClick = new core_1.EventEmitter();
        this.menuVisible = false;
    }
    SplitButton.prototype.ngOnInit = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listen('document', 'click', function () {
            if (_this.isDropdownClicked) {
                _this.isDropdownClicked = false;
            }
            else {
                _this.menuVisible = false;
                _this.cd.markForCheck();
            }
        });
    };
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new core_1.EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
        this.menuVisible = false;
    };
    SplitButton.prototype.onDropdownButtonClick = function (event, menu, container) {
        this.menuVisible = !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu, 25);
        menu.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.onDropdownClick.emit(event);
        this.isDropdownClicked = true;
    };
    SplitButton.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    return SplitButton;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SplitButton.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "iconPos", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "label", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SplitButton.prototype, "onClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SplitButton.prototype, "onDropdownClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SplitButton.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SplitButton.prototype, "menuStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButton.prototype, "menuStyleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SplitButton.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SplitButton.prototype, "tabindex", void 0);
SplitButton = __decorate([
    core_1.Component({
        selector: 'p-splitButton',
        template: "\n        <div #container [ngClass]=\"{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" cornerStyleClass=\"ui-corner-left\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </button><button type=\"button\" pButton class=\"ui-splitbutton-menubutton\" icon=\"fa-caret-down\" cornerStyleClass=\"ui-corner-right\" (click)=\"onDropdownButtonClick($event,menu,container)\" [disabled]=\"disabled\"></button>\n            <div #menu [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngFor=\"let item of model\">\n                        <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\"\n                            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\"\n                            class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, router_1.Router, core_1.ChangeDetectorRef])
], SplitButton);
exports.SplitButton = SplitButton;
var SplitButtonModule = (function () {
    function SplitButtonModule() {
    }
    return SplitButtonModule;
}());
SplitButtonModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, button_1.ButtonModule, router_2.RouterModule],
        exports: [SplitButton, button_1.ButtonModule, router_2.RouterModule],
        declarations: [SplitButton]
    })
], SplitButtonModule);
exports.SplitButtonModule = SplitButtonModule;
