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
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var Sidebar = (function () {
    function Sidebar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.position = 'left';
        this.blockScroll = false;
        this.baseZIndex = 0;
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
    }
    Sidebar.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        if (this.visible) {
            this.show();
        }
    };
    Object.defineProperty(Sidebar.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
                if (this._visible)
                    this.show();
                else {
                    if (this.preventVisibleChangePropagation)
                        this.preventVisibleChangePropagation = false;
                    else
                        this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Sidebar.prototype.ngAfterViewChecked = function () {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.executePostDisplayActions = false;
        }
    };
    Sidebar.prototype.show = function () {
        this.executePostDisplayActions = true;
        this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        this.enableModality();
    };
    Sidebar.prototype.hide = function () {
        this.onHide.emit({});
        this.disableModality();
    };
    Sidebar.prototype.close = function (event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Sidebar.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-sidebar-mask');
            this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                _this.close(event);
            });
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                this.domHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    };
    Sidebar.prototype.disableModality = function () {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.mask = null;
        }
    };
    Sidebar.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Sidebar.prototype.ngOnDestroy = function () {
        this.initialized = false;
        if (this.visible) {
            this.hide();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindMaskClickListener();
    };
    return Sidebar;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Sidebar.prototype, "position", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Sidebar.prototype, "fullScreen", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Sidebar.prototype, "appendTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Sidebar.prototype, "blockScroll", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Sidebar.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Sidebar.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Sidebar.prototype, "baseZIndex", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], Sidebar.prototype, "containerViewChild", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Sidebar.prototype, "onShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Sidebar.prototype, "onHide", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Sidebar.prototype, "visibleChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Sidebar.prototype, "visible", null);
Sidebar = __decorate([
    core_1.Component({
        selector: 'p-sidebar',
        template: "\n        <div #container [ngClass]=\"{'ui-sidebar ui-widget ui-widget-content ui-shadow':true, 'ui-sidebar-active': visible, \n            'ui-sidebar-left': (position === 'left'), 'ui-sidebar-right': (position === 'right'),\n            'ui-sidebar-top': (position === 'top'), 'ui-sidebar-bottom': (position === 'bottom'), \n            'ui-sidebar-full': fullScreen}\"\n            [@panelState]=\"visible ? 'visible' : 'hidden'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <a [ngClass]=\"{'ui-sidebar-close ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"close($event)\">\n                <span class=\"fa fa-fw fa-close\"></span>\n            </a>\n            <ng-content></ng-content>\n        </div>\n    ",
        animations: [
            animations_1.trigger('panelState', [
                animations_1.state('hidden', animations_1.style({
                    opacity: 0
                })),
                animations_1.state('visible', animations_1.style({
                    opacity: 1
                })),
                animations_1.transition('visible => hidden', animations_1.animate('300ms ease-in')),
                animations_1.transition('hidden => visible', animations_1.animate('300ms ease-out'))
            ])
        ],
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2])
], Sidebar);
exports.Sidebar = Sidebar;
var SidebarModule = (function () {
    function SidebarModule() {
    }
    return SidebarModule;
}());
SidebarModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Sidebar],
        declarations: [Sidebar]
    })
], SidebarModule);
exports.SidebarModule = SidebarModule;
//# sourceMappingURL=sidebar.js.map