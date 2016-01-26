System.register(['angular2/core', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tabview_1, tabpanel_1;
    var GridDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tabview_1_1) {
                tabview_1 = tabview_1_1;
            },
            function (tabpanel_1_1) {
                tabpanel_1 = tabpanel_1_1;
            }],
        execute: function() {
            GridDemoComponent = (function () {
                function GridDemoComponent() {
                }
                GridDemoComponent = __decorate([
                    core_1.Component({
                        styles: ["\n        .pui-grid {\n            margin-bottom: 10px;\n        }\n\n        .pui-grid .pui-grid-row div {\n            background-color: #cccccc;\n            text-align: center;\n            border: 1px solid #dddddd;\n            padding: 10px 0px;\n        }\n    "],
                        templateUrl: 'showcase/demo/grid/griddemo.component.html',
                        directives: [tabview_1.TabView, tabpanel_1.TabPanel]
                    }), 
                    __metadata('design:paramtypes', [])
                ], GridDemoComponent);
                return GridDemoComponent;
            })();
            exports_1("GridDemoComponent", GridDemoComponent);
        }
    }
});
//# sourceMappingURL=griddemo.component.js.map