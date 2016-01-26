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
    var Fieldset;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Fieldset = (function () {
                function Fieldset(el) {
                    this.el = el;
                    this.onBeforeToggle = new core_1.EventEmitter();
                    this.onAfterToggle = new core_1.EventEmitter();
                    this.initialized = false;
                }
                Fieldset.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puifieldset({
                        toggleable: this.toggleable,
                        toggleDuration: this.toggleDuration,
                        collapsed: this.collapsed,
                        beforeToggle: this.onBeforeToggle ? function (event, collapsed) {
                            _this.onBeforeToggle.next({ 'originalEvent': event, 'collapsed': collapsed });
                        } : null,
                        afterToggle: this.onAfterToggle ? function (event, collapsed) {
                            _this.onAfterToggle.next({ 'originalEvent': event, 'collapsed': collapsed });
                        } : null,
                        enhanced: true
                    });
                    this.initialized = true;
                };
                Fieldset.prototype.ngOnChanges = function (changes) {
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0]).puifieldset('option', key, changes[key].currentValue);
                        }
                    }
                };
                Fieldset.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0]).puifieldset('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Fieldset.prototype, "legend", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Fieldset.prototype, "toggleable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Fieldset.prototype, "toggleDuration", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Fieldset.prototype, "collapsed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Fieldset.prototype, "onBeforeToggle", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Fieldset.prototype, "onAfterToggle", void 0);
                Fieldset = __decorate([
                    core_1.Component({
                        selector: 'p-fieldset',
                        template: "\n        <fieldset class=\"pui-fieldset ui-widget ui-widget-content ui-corner-all\" [ngClass]=\"{'pui-fieldset-toggleable': toggleable}\">\n            <legend class=\"pui-fieldset-legend ui-corner-all ui-state-default\"><span class=\"pui-fieldset-toggler fa fa-w\" *ngIf=\"toggleable\"></span>{{legend}}</legend>\n            <div class=\"pui-fieldset-content\">\n                <ng-content></ng-content>\n            </div>\n        </fieldset>\n    ",
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Fieldset);
                return Fieldset;
            })();
            exports_1("Fieldset", Fieldset);
        }
    }
});
//# sourceMappingURL=fieldset.js.map