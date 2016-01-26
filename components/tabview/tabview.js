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
    var TabView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TabView = (function () {
                function TabView(el) {
                    this.el = el;
                    this.activeIndex = 0;
                    this.effectDuration = 'fast';
                    this.onChange = new core_1.EventEmitter();
                    this.onClose = new core_1.EventEmitter();
                    this.activeIndexChange = new core_1.EventEmitter();
                    this.tabPanels = [];
                    this.initialized = false;
                }
                TabView.prototype.addTab = function (tab) {
                    this.tabPanels.push(tab);
                };
                TabView.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puitabview({
                        activeIndex: this.activeIndex,
                        orientation: this.orientation,
                        effect: this.effect ? { name: this.effect, duration: this.effectDuration } : null,
                        change: function (event, ui) {
                            _this.stopNgOnChangesPropagation = true;
                            _this.activeIndexChange.next(ui.index);
                            if (_this.onChange) {
                                _this.onChange.next({ originalEvent: event, index: ui.index });
                            }
                        },
                        close: this.onClose ? function (event, ui) { _this.onClose.next({ originalEvent: event, index: ui.index }); } : null
                    });
                    this.initialized = true;
                };
                TabView.prototype.ngOnChanges = function (changes) {
                    if (this.stopNgOnChangesPropagation) {
                        this.stopNgOnChangesPropagation = false;
                        return;
                    }
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0]).puitabview('option', key, changes[key].currentValue);
                        }
                    }
                };
                TabView.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0]).puitabview('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], TabView.prototype, "activeIndex", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TabView.prototype, "orientation", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TabView.prototype, "effect", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TabView.prototype, "effectDuration", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TabView.prototype, "onChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TabView.prototype, "onClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TabView.prototype, "activeIndexChange", void 0);
                TabView = __decorate([
                    core_1.Component({
                        selector: 'p-tabView',
                        template: "\n        <div>\n            <ul>\n                <li *ngFor=\"#tab of tabPanels\">\n                    <a href=\"#\">{{tab.header}}</a><span *ngIf=\"tab.closable\"class=\"fa fa-close\"></span>\n                </li>\n            </ul>\n            <div>\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], TabView);
                return TabView;
            })();
            exports_1("TabView", TabView);
        }
    }
});
//# sourceMappingURL=tabview.js.map