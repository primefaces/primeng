System.register(['angular2/core', '../../../components/inputtextarea/inputtextarea', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, inputtextarea_1, tabview_1, tabpanel_1, router_1;
    var InputTextareaDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (inputtextarea_1_1) {
                inputtextarea_1 = inputtextarea_1_1;
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
            InputTextareaDemoComponent = (function () {
                function InputTextareaDemoComponent() {
                }
                InputTextareaDemoComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'showcase/demo/inputtextarea/inputtextareademo.component.html',
                        directives: [inputtextarea_1.InputTextarea, tabpanel_1.TabPanel, tabview_1.TabView, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], InputTextareaDemoComponent);
                return InputTextareaDemoComponent;
            })();
            exports_1("InputTextareaDemoComponent", InputTextareaDemoComponent);
        }
    }
});
//# sourceMappingURL=inputtextareademo.component.js.map