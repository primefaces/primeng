/// <reference path="../../typedefinition/primeui.d.ts" />
System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Dialog;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Dialog = (function () {
                function Dialog(el) {
                    this.el = el;
                    this.draggable = true;
                    this.resizable = true;
                    this.closeOnEscape = true;
                    this.closable = true;
                    this.onBeforeShow = new core_1.EventEmitter();
                    this.onAfterShow = new core_1.EventEmitter();
                    this.onBeforeHide = new core_1.EventEmitter();
                    this.onAfterHide = new core_1.EventEmitter();
                    this.onMinimize = new core_1.EventEmitter();
                    this.onMaximize = new core_1.EventEmitter();
                    this.visibleChange = new core_1.EventEmitter();
                    this.initialized = false;
                }
                Dialog.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puidialog({
                        title: this.header,
                        draggable: this.draggable,
                        resizable: this.resizable,
                        minWidth: this.minWidth,
                        minHeight: this.minHeight,
                        width: this.width,
                        height: this.height,
                        visible: this.visible,
                        modal: this.modal,
                        showEffect: this.showEffect,
                        hideEffect: this.hideEffect,
                        effectSpeed: this.effectDuration,
                        closeOnEscape: this.closeOnEscape,
                        rtl: this.rtl,
                        closable: this.closable,
                        minimizable: this.minimizable,
                        maximizable: this.maximizable,
                        responsive: this.responsive,
                        beforeShow: this.onBeforeShow ? function (event) { _this.onBeforeShow.next(event); } : null,
                        afterShow: this.onAfterShow ? function (event) { _this.onAfterShow.next(event); } : null,
                        beforeHide: this.onBeforeHide ? function (event) { _this.onBeforeHide.next(event); } : null,
                        afterHide: this.onAfterHide ? function (event) {
                            _this.stopNgOnChangesPropagation = true;
                            _this.visibleChange.next(false);
                            _this.onAfterHide.next(event);
                        } : null,
                        minimize: this.onMinimize ? function (event) { _this.onMinimize.next(event); } : null,
                        maximize: this.onMaximize ? function (event) { _this.onMaximize.next(event); } : null,
                        enhanced: true
                    });
                    this.initialized = true;
                };
                Dialog.prototype.ngOnChanges = function (changes) {
                    if (this.stopNgOnChangesPropagation) {
                        this.stopNgOnChangesPropagation = false;
                        return;
                    }
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0]).puidialog('option', key, changes[key].currentValue);
                        }
                    }
                };
                Dialog.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0]).puidialog('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Dialog.prototype, "header", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "draggable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "resizable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Dialog.prototype, "minWidth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Dialog.prototype, "minHeight", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Dialog.prototype, "width", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Dialog.prototype, "height", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "visible", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "modal", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Dialog.prototype, "showEffect", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Dialog.prototype, "hideEffect", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Dialog.prototype, "effectDuration", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "closeOnEscape", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "rtl", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "closable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "minimizable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "maximizable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Dialog.prototype, "responsive", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "onBeforeShow", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "onAfterShow", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "onBeforeHide", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "onAfterHide", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "onMinimize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "onMaximize", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Dialog.prototype, "visibleChange", void 0);
                Dialog = __decorate([
                    core_1.Component({
                        selector: 'p-dialog',
                        template: "\n        <div class=\"pui-dialog ui-widget ui-widget-content ui-helper-hidden ui-corner-all pui-shadow\" [ngClass]=\"{'pui-dialog-rtl':rtl}\">\n            <div class=\"pui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\">\n                <span class=\"pui-dialog-title\">{{header}}</span>\n                <a class=\"pui-dialog-titlebar-icon pui-dialog-titlebar-close ui-corner-all\" href=\"#\" role=\"button\" *ngIf=\"closable\">\n                    <span class=\"pui-icon fa fa-fw fa-close\"></span>\n                </a>\n                <a class=\"pui-dialog-titlebar-icon pui-dialog-titlebar-maximize ui-corner-all\" href=\"#\" role=\"button\" *ngIf=\"maximizable\">\n                    <span class=\"pui-icon fa fa-fw fa-sort\"></span>\n                </a>\n                <a class=\"pui-dialog-titlebar-icon pui-dialog-titlebar-minimize ui-corner-all\" href=\"#\" role=\"button\" *ngIf=\"minimizable\">\n                    <span class=\"pui-icon fa fa-fw fa-minus\"></span>\n                </a>\n            </div>\n            <div class=\"pui-dialog-content ui-widget-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Dialog);
                return Dialog;
            })();
            exports_1("Dialog", Dialog);
        }
    }
});
//# sourceMappingURL=dialog.js.map