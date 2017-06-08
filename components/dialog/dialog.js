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
var shared_1 = require("../common/shared");
var Dialog = (function () {
    function Dialog(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.draggable = true;
        this.resizable = true;
        this.minWidth = 150;
        this.minHeight = 150;
        this.closeOnEscape = true;
        this.closable = true;
        this.responsive = true;
        this.showHeader = true;
        this.breakpoint = 640;
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
    }
    Object.defineProperty(Dialog.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this.containerViewChild && this.containerViewChild.nativeElement) {
                if (this._visible)
                    this.show();
                else
                    this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.show = function () {
        this.onShow.emit({});
        this.positionOverlay();
        this.containerViewChild.nativeElement.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.bindGlobalListeners();
        if (this.modal) {
            this.enableModality();
        }
    };
    Dialog.prototype.positionOverlay = function () {
        if (this.positionLeft >= 0 && this.positionTop >= 0) {
            this.containerViewChild.nativeElement.style.left = this.positionLeft + 'px';
            this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
        }
        else if (this.positionTop >= 0) {
            this.center();
            this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
        }
        else {
            this.center();
        }
    };
    Dialog.prototype.hide = function () {
        this.onHide.emit({});
        this.unbindMaskClickListener();
        if (this.modal) {
            this.disableModality();
        }
    };
    Dialog.prototype.close = function (event) {
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Dialog.prototype.ngAfterViewInit = function () {
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
    Dialog.prototype.center = function () {
        var elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
        var elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
        if (elementWidth == 0 && elementHeight == 0) {
            this.containerViewChild.nativeElement.style.visibility = 'hidden';
            this.containerViewChild.nativeElement.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            this.containerViewChild.nativeElement.style.display = 'none';
            this.containerViewChild.nativeElement.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = Math.max((viewport.width - elementWidth) / 2, 0);
        var y = Math.max((viewport.height - elementHeight) / 2, 0);
        this.containerViewChild.nativeElement.style.left = x + 'px';
        this.containerViewChild.nativeElement.style.top = y + 'px';
    };
    Dialog.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            if (this.closable && this.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    _this.close(event);
                });
            }
            document.body.appendChild(this.mask);
        }
    };
    Dialog.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    };
    Dialog.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Dialog.prototype.moveOnTop = function () {
        this.containerViewChild.nativeElement.style.zIndex = String(++domhandler_1.DomHandler.zindex);
    };
    Dialog.prototype.onCloseMouseDown = function (event) {
        this.closeIconMouseDown = true;
    };
    Dialog.prototype.initDrag = function (event) {
        if (this.closeIconMouseDown) {
            this.closeIconMouseDown = false;
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onDrag = function (event) {
        if (this.dragging) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var leftPos = parseInt(this.containerViewChild.nativeElement.style.left);
            var topPos = parseInt(this.containerViewChild.nativeElement.style.top);
            this.containerViewChild.nativeElement.style.left = leftPos + deltaX + 'px';
            this.containerViewChild.nativeElement.style.top = topPos + deltaY + 'px';
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.endDrag = function (event) {
        if (this.draggable) {
            this.dragging = false;
        }
    };
    Dialog.prototype.initResize = function (event) {
        if (this.resizable) {
            this.preWidth = null;
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onResize = function (event) {
        if (this.resizing) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var containerWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            var containerHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            var contentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
            var newWidth = containerWidth + deltaX;
            var newHeight = containerHeight + deltaY;
            if (newWidth > this.minWidth) {
                this.containerViewChild.nativeElement.style.width = newWidth + 'px';
            }
            if (newHeight > this.minHeight) {
                this.containerViewChild.nativeElement.style.height = newHeight + 'px';
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.bindGlobalListeners = function () {
        if (this.draggable) {
            this.bindDocumentDragListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.responsive) {
            this.bindDocumentResponsiveListener();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    };
    Dialog.prototype.unbindGlobalListeners = function () {
        this.unbindDocumentDragListener();
    };
    Dialog.prototype.bindDocumentDragListener = function () {
        var _this = this;
        this.documentDragListener = this.renderer.listen('document', 'mousemove', function (event) {
            _this.onDrag(event);
        });
    };
    Dialog.prototype.unbindDocumentDragListener = function () {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    };
    Dialog.prototype.bindDocumentResizeListeners = function () {
        var _this = this;
        this.documentResizeListener = this.renderer.listen('document', 'mousemove', function (event) {
            _this.onResize(event);
        });
        this.documentResizeEndListener = this.renderer.listen('document', 'mouseup', function (event) {
            if (_this.resizing) {
                _this.resizing = false;
            }
        });
    };
    Dialog.prototype.unbindDocumentResizeListeners = function () {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    };
    Dialog.prototype.bindDocumentResponsiveListener = function () {
        var _this = this;
        this.documentResponsiveListener = this.renderer.listen('window', 'resize', function (event) {
            var viewport = _this.domHandler.getViewport();
            var width = _this.domHandler.getOuterWidth(_this.containerViewChild.nativeElement);
            if (viewport.width <= _this.breakpoint) {
                if (!_this.preWidth) {
                    _this.preWidth = width;
                }
                _this.containerViewChild.nativeElement.style.left = '0px';
                _this.containerViewChild.nativeElement.style.width = '100%';
            }
            else {
                _this.containerViewChild.nativeElement.style.width = _this.preWidth + 'px';
                _this.positionOverlay();
            }
        });
    };
    Dialog.prototype.unbindDocumentResponseListener = function () {
        if (this.documentResponsiveListener) {
            this.documentResponsiveListener();
            this.documentResponsiveListener = null;
        }
    };
    Dialog.prototype.bindDocumentEscapeListener = function () {
        var _this = this;
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event.which == 27) {
                if (parseInt(_this.containerViewChild.nativeElement.style.zIndex) == domhandler_1.DomHandler.zindex) {
                    _this.close(event);
                }
            }
        });
    };
    Dialog.prototype.unbindDocumentEscapeListener = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    };
    Dialog.prototype.ngOnDestroy = function () {
        this.disableModality();
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindMaskClickListener();
    };
    return Dialog;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dialog.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "draggable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "resizable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "minWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "minHeight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "positionLeft", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "positionTop", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "contentStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "modal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "closeOnEscape", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "dismissableMask", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "rtl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "responsive", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "appendTo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Dialog.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Dialog.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Dialog.prototype, "showHeader", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Dialog.prototype, "breakpoint", void 0);
__decorate([
    core_1.ContentChild(shared_1.Header),
    __metadata("design:type", Object)
], Dialog.prototype, "headerFacet", void 0);
__decorate([
    core_1.ContentChild(shared_1.Footer),
    __metadata("design:type", Object)
], Dialog.prototype, "footerFacet", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], Dialog.prototype, "containerViewChild", void 0);
__decorate([
    core_1.ViewChild('titlebar'),
    __metadata("design:type", core_1.ElementRef)
], Dialog.prototype, "headerViewChild", void 0);
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", core_1.ElementRef)
], Dialog.prototype, "contentViewChild", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "onShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "onHide", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Dialog.prototype, "visibleChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Dialog.prototype, "visible", null);
Dialog = __decorate([
    core_1.Component({
        selector: 'p-dialog',
        template: "\n        <div #container [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            [style.display]=\"visible ? 'block' : 'none'\" [style.width.px]=\"width\" [style.height.px]=\"height\" (mousedown)=\"moveOnTop()\" [@dialogState]=\"visible ? 'visible' : 'hidden'\">\n            <div #titlebar class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\"\n                (mousedown)=\"initDrag($event)\" (mouseup)=\"endDrag($event)\" *ngIf=\"showHeader\">\n                <span class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <span class=\"ui-dialog-title\" *ngIf=\"headerFacet\">\n                    <ng-content select=\"p-header\"></ng-content>\n                </span>\n                <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"close($event)\" (mousedown)=\"onCloseMouseDown($event)\">\n                    <span class=\"fa fa-fw fa-close\"></span>\n                </a>\n            </div>\n            <div #content class=\"ui-dialog-content ui-widget-content\" [ngStyle]=\"contentStyle\">\n                <ng-content></ng-content>\n            </div>\n            <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n            <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\"\n                (mousedown)=\"initResize($event)\"></div>\n        </div>\n    ",
        animations: [
            animations_1.trigger('dialogState', [
                animations_1.state('hidden', animations_1.style({
                    opacity: 0
                })),
                animations_1.state('visible', animations_1.style({
                    opacity: 1
                })),
                animations_1.transition('visible => hidden', animations_1.animate('400ms ease-in')),
                animations_1.transition('hidden => visible', animations_1.animate('400ms ease-out'))
            ])
        ],
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2])
], Dialog);
exports.Dialog = Dialog;
var DialogModule = (function () {
    function DialogModule() {
    }
    return DialogModule;
}());
DialogModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Dialog, shared_1.SharedModule],
        declarations: [Dialog]
    })
], DialogModule);
exports.DialogModule = DialogModule;
