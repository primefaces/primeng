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
    var Panel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Panel = (function () {
                function Panel(el) {
                    this.el = el;
                    this.onBeforeCollapse = new core_1.EventEmitter();
                    this.onAfterCollapse = new core_1.EventEmitter();
                    this.onBeforeExpand = new core_1.EventEmitter();
                    this.onAfterExpand = new core_1.EventEmitter();
                    this.onBeforeClose = new core_1.EventEmitter();
                    this.onAfterClose = new core_1.EventEmitter();
                    this.initialized = false;
                }
                Panel.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puipanel({
                        title: this.header,
                        toggleable: this.toggleable,
                        toggleDuration: this.toggleDuration,
                        toggleOrientation: this.toggleOrientation,
                        collapsed: this.collapsed,
                        closable: this.closable,
                        closeDuration: this.closeDuration,
                        beforeCollapse: this.onBeforeCollapse ? function (event) { _this.onBeforeCollapse.next(event); } : null,
                        afterCollapse: this.onAfterCollapse ? function (event) { _this.onAfterCollapse.next(event); } : null,
                        beforeExpand: this.onBeforeExpand ? function (event) { _this.onBeforeExpand.next(event); } : null,
                        afterExpand: this.onAfterExpand ? function (event) { _this.onAfterExpand.next(event); } : null,
                        beforeClose: this.onBeforeClose ? function (event) { _this.onBeforeClose.next(event); } : null,
                        afterClose: this.onAfterClose ? function (event) { _this.onAfterClose.next(event); } : null,
                        enhanced: true
                    });
                    this.initialized = true;
                };
                Panel.prototype.ngOnChanges = function (changes) {
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0]).puipanel('option', key, changes[key].currentValue);
                        }
                    }
                };
                Panel.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0]).puipanel('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Panel.prototype, "toggleable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Panel.prototype, "toggleDuration", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Panel.prototype, "toggleOrientation", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Panel.prototype, "header", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Panel.prototype, "closable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Panel.prototype, "closeDuration", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Panel.prototype, "collapsed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Panel.prototype, "onBeforeCollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Panel.prototype, "onAfterCollapse", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Panel.prototype, "onBeforeExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Panel.prototype, "onAfterExpand", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Panel.prototype, "onBeforeClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Panel.prototype, "onAfterClose", void 0);
                Panel = __decorate([
                    core_1.Component({
                        selector: 'p-panel',
                        template: "\n        <div class=\"pui-panel ui-widget ui-widget-content ui-corner-all\">\n            <div class=\"pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all\">\n                <span class=\"pui-panel-title\">{{header}}</span>\n                <a *ngIf=\"closable\" class=\"pui-panel-titlebar-icon pui-panel-titlebar-closer ui-corner-all ui-state-default\" href=\"#\"><span class=\"pui-icon fa fa-fw fa-close\"></span></a>\n                <a *ngIf=\"toggleable\" class=\"pui-panel-titlebar-icon pui-panel-titlebar-toggler ui-corner-all ui-state-default\" href=\"#\"><span class=\"pui-icon fa fa-fw\"></span></a>\n            </div>\n            <div class=\"pui-panel-content ui-widget-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Panel);
                return Panel;
            })();
            exports_1("Panel", Panel);
        }
    }
});
//# sourceMappingURL=panel.js.map