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
    var Galleria;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Galleria = (function () {
                function Galleria(el) {
                    this.el = el;
                    this.showFilmstrip = true;
                    this.autoPlay = true;
                    this.showCaption = true;
                    this.initialized = false;
                }
                Galleria.prototype.ngAfterViewInit = function () {
                    jQuery(this.el.nativeElement.children[0]).puigalleria({
                        panelWidth: this.panelWidth,
                        panelHeight: this.panelHeight,
                        frameWidth: this.frameWidth,
                        activeIndex: this.activeIndex,
                        showFilmstrip: this.showFilmstrip,
                        autoPlay: this.autoPlay,
                        transitionInterval: this.transitionInterval,
                        effect: this.effect,
                        effectSpeed: this.effectDuration,
                        showCaption: this.showCaption,
                        customContent: this.customContent
                    });
                    this.initialized = true;
                };
                Galleria.prototype.ngOnChanges = function (changes) {
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0]).puigalleria('option', key, changes[key].currentValue);
                        }
                    }
                };
                Galleria.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0]).puigalleria('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Galleria.prototype, "panelWidth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Galleria.prototype, "panelHeight", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Galleria.prototype, "frameWidth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Galleria.prototype, "activeIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Galleria.prototype, "showFilmstrip", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Galleria.prototype, "autoPlay", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Galleria.prototype, "transitionInterval", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Galleria.prototype, "effect", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Galleria.prototype, "effectDuration", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Galleria.prototype, "showCaption", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Galleria.prototype, "customContent", void 0);
                Galleria = __decorate([
                    core_1.Component({
                        selector: 'p-galleria',
                        template: "\n        <div>\n            <ng-content></ng-content>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Galleria);
                return Galleria;
            })();
            exports_1("Galleria", Galleria);
        }
    }
});
//# sourceMappingURL=galleria.js.map