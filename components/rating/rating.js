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
    var Rating;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Rating = (function () {
                function Rating(el) {
                    this.el = el;
                    this.cancel = true;
                    this.valueChange = new core_1.EventEmitter();
                    this.onRate = new core_1.EventEmitter();
                    this.onCancel = new core_1.EventEmitter();
                    this.initialized = false;
                }
                Rating.prototype.ngOnInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puirating({
                        value: this.value,
                        stars: this.stars,
                        cancel: this.cancel,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        rate: function (event, value) {
                            _this.stopNgOnChangesPropagation = true;
                            _this.valueChange.next(value);
                            if (_this.onRate) {
                                _this.onRate.next({ originalEvent: event, value: value });
                            }
                        },
                        oncancel: this.onCancel ? function (event) { _this.onCancel.next(event); } : null
                    });
                    this.initialized = true;
                };
                Rating.prototype.ngOnChanges = function (changes) {
                    if (this.stopNgOnChangesPropagation) {
                        this.stopNgOnChangesPropagation = false;
                        return;
                    }
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0].children[0]).puirating('option', key, changes[key].currentValue);
                        }
                    }
                };
                Rating.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0].children[0]).puirating('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Rating.prototype, "value", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Rating.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Rating.prototype, "readonly", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Rating.prototype, "stars", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Rating.prototype, "cancel", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Rating.prototype, "valueChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Rating.prototype, "onRate", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Rating.prototype, "onCancel", void 0);
                Rating = __decorate([
                    core_1.Component({
                        selector: 'p-rating',
                        template: '<input type="hidden" />'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Rating);
                return Rating;
            })();
            exports_1("Rating", Rating);
        }
    }
});
//# sourceMappingURL=rating.js.map