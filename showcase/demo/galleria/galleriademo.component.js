System.register(['angular2/core', '../../../components/galleria/galleria', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, galleria_1, tabview_1, tabpanel_1, router_1;
    var GalleriaDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (galleria_1_1) {
                galleria_1 = galleria_1_1;
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
            GalleriaDemoComponent = (function () {
                function GalleriaDemoComponent() {
                    this.images = ['galleria1.jpg', 'galleria2.jpg', 'galleria3.jpg', 'galleria4.jpg', 'galleria5.jpg', 'galleria6.jpg', 'galleria7.jpg', 'galleria8.jpg',
                        'galleria9.jpg', 'galleria10.jpg', 'galleria11.jpg', 'galleria12.jpg'];
                }
                GalleriaDemoComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'showcase/demo/galleria/galleriademo.component.html',
                        directives: [galleria_1.Galleria, tabview_1.TabView, tabpanel_1.TabPanel, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], GalleriaDemoComponent);
                return GalleriaDemoComponent;
            })();
            exports_1("GalleriaDemoComponent", GalleriaDemoComponent);
        }
    }
});
//# sourceMappingURL=galleriademo.component.js.map