System.register(['angular2/core', '../../../components/accordion/accordion', '../../../components/accordion/accordiontab', '../../../components/button/button', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, accordion_1, accordiontab_1, button_1, tabview_1, tabpanel_1, router_1;
    var AccordionDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (accordion_1_1) {
                accordion_1 = accordion_1_1;
            },
            function (accordiontab_1_1) {
                accordiontab_1 = accordiontab_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (tabview_1_1) {
                tabview_1 = tabview_1_1;
            },
            function (tabpanel_1_1) {
                tabpanel_1 = tabpanel_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AccordionDemoComponent = (function () {
                function AccordionDemoComponent() {
                    this.activeTabIndex = 1;
                }
                AccordionDemoComponent.prototype.changeTab = function () {
                    var index = this.activeTabIndex;
                    index++;
                    if (index > 2) {
                        index = 0;
                    }
                    this.activeTabIndex = index;
                };
                AccordionDemoComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'showcase/demo/accordion/accordiondemo.component.html',
                        directives: [accordion_1.Accordion, accordiontab_1.AccordionTab, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccordionDemoComponent);
                return AccordionDemoComponent;
            })();
            exports_1("AccordionDemoComponent", AccordionDemoComponent);
        }
    }
});
//# sourceMappingURL=accordiondemo.component.js.map