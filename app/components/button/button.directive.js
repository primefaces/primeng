/// <reference path="../../../typedefinition/primeui.d.ts" />
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
    var ButtonDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ButtonDirective = (function () {
                function ButtonDirective(el) {
                    this.el = el;
                }
                Object.defineProperty(ButtonDirective.prototype, "isDisabled", {
                    get: function () { return this.el.nativeElement.disabled; },
                    enumerable: true,
                    configurable: true
                });
                ButtonDirective.prototype.ngOnInit = function () {
                    jQuery(this.el.nativeElement).puibutton({
                        icon: this.icon,
                        iconPos: this.iconPos
                    });
                };
                ButtonDirective.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement).puibutton('destroy');
                };
                __decorate([
                    core_1.HostBinding('class.ui-state-disabled'), 
                    __metadata('design:type', Object)
                ], ButtonDirective.prototype, "isDisabled", null);
                __decorate([
                    core_1.Input('icon'), 
                    __metadata('design:type', Object)
                ], ButtonDirective.prototype, "icon", void 0);
                __decorate([
                    core_1.Input('iconPos'), 
                    __metadata('design:type', Object)
                ], ButtonDirective.prototype, "iconPos", void 0);
                ButtonDirective = __decorate([
                    core_1.Directive({
                        selector: '[pButton]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ButtonDirective);
                return ButtonDirective;
            })();
            exports_1("ButtonDirective", ButtonDirective);
        }
    }
});
//# sourceMappingURL=button.directive.js.map