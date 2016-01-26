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
    var Accordion;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Accordion = (function () {
                function Accordion(el) {
                    this.el = el;
                    this.activeIndex = 0;
                    this.onChange = new core_1.EventEmitter();
                    this.activeIndexChange = new core_1.EventEmitter();
                    this.tabPanels = [];
                    this.initialized = false;
                }
                Accordion.prototype.addTab = function (tab) {
                    this.tabPanels.push(tab);
                };
                Accordion.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puiaccordion({
                        activeIndex: this.activeIndex,
                        multiple: this.multiple,
                        change: function (event, ui) {
                            _this.stopNgOnChangesPropagation = true;
                            _this.activeIndexChange.next(ui.index);
                            _this.onChange.next({ originalEvent: event, ui: ui });
                        }
                    });
                    this.initialized = true;
                };
                Accordion.prototype.ngOnChanges = function (changes) {
                    if (this.stopNgOnChangesPropagation) {
                        this.stopNgOnChangesPropagation = false;
                        return;
                    }
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0]).puiaccordion('option', key, changes[key].currentValue);
                        }
                    }
                };
                Accordion.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0]).puiaccordion('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], Accordion.prototype, "activeIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Accordion.prototype, "multiple", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Accordion.prototype, "onChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Accordion.prototype, "activeIndexChange", void 0);
                Accordion = __decorate([
                    core_1.Component({
                        selector: 'p-accordion',
                        template: "\n        <div>\n            <ng-content></ng-content>\n        </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Accordion);
                return Accordion;
            })();
            exports_1("Accordion", Accordion);
        }
    }
});
//# sourceMappingURL=accordion.js.map