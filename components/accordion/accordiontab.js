/// <reference path="../../typedefinition/primeui.d.ts" />
System.register(['angular2/core', './accordion'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, accordion_1;
    var AccordionTab;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (accordion_1_1) {
                accordion_1 = accordion_1_1;
            }],
        execute: function() {
            AccordionTab = (function () {
                function AccordionTab(tabview) {
                    tabview.addTab(this);
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AccordionTab.prototype, "header", void 0);
                AccordionTab = __decorate([
                    core_1.Component({
                        selector: 'p-accordionTab',
                        template: "\n        <h3>{{header}}</h3>\n        <div>\n            <ng-content></ng-content>\n        </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [accordion_1.Accordion])
                ], AccordionTab);
                return AccordionTab;
            })();
            exports_1("AccordionTab", AccordionTab);
        }
    }
});
//# sourceMappingURL=accordiontab.js.map