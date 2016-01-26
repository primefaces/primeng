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
    var Password;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Password = (function () {
                function Password(el) {
                    this.el = el;
                    this.initialized = false;
                }
                Password.prototype.ngOnInit = function () {
                    jQuery(this.el.nativeElement).puipassword({
                        promptLabel: this.promptLabel,
                        weakLabel: this.weakLabel,
                        goodLabel: this.goodLabel,
                        strongLabel: this.strongLabel,
                        inline: this.inline
                    });
                    this.initialized = true;
                };
                Password.prototype.ngOnChanges = function (changes) {
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement).puipassword('option', key, changes[key].currentValue);
                        }
                    }
                };
                Password.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement).puipassword('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Password.prototype, "promptLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Password.prototype, "weakLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Password.prototype, "goodLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Password.prototype, "strongLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Password.prototype, "inline", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Password.prototype, "disabled", void 0);
                Password = __decorate([
                    core_1.Directive({
                        selector: '[pPassword]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Password);
                return Password;
            })();
            exports_1("Password", Password);
        }
    }
});
//# sourceMappingURL=password.js.map