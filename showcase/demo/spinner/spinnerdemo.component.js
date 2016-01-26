System.register(['angular2/core', '../../../components/spinner/spinner', '../../../components/button/button', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, spinner_1, button_1, tabview_1, tabpanel_1, router_1;
    var SpinnerDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (spinner_1_1) {
                spinner_1 = spinner_1_1;
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
            SpinnerDemoComponent = (function () {
                function SpinnerDemoComponent() {
                    this.val4 = 100;
                }
                SpinnerDemoComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'showcase/demo/spinner/spinnerdemo.component.html',
                        directives: [spinner_1.Spinner, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SpinnerDemoComponent);
                return SpinnerDemoComponent;
            })();
            exports_1("SpinnerDemoComponent", SpinnerDemoComponent);
        }
    }
});
//# sourceMappingURL=spinnerdemo.component.js.map