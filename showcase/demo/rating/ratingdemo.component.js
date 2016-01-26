System.register(['angular2/core', '../../../components/rating/rating', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, rating_1, tabview_1, tabpanel_1, router_1;
    var RatingDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rating_1_1) {
                rating_1 = rating_1_1;
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
            RatingDemoComponent = (function () {
                function RatingDemoComponent() {
                    this.val2 = 5;
                    this.val4 = 5;
                }
                RatingDemoComponent.prototype.handleRate = function (event) {
                    this.msg = "You have rated " + event.value;
                };
                RatingDemoComponent.prototype.handleCancel = function (event) {
                    this.msg = "Rating Cancelled";
                };
                RatingDemoComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'showcase/demo/rating/ratingdemo.component.html',
                        directives: [rating_1.Rating, tabview_1.TabView, tabpanel_1.TabPanel, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RatingDemoComponent);
                return RatingDemoComponent;
            })();
            exports_1("RatingDemoComponent", RatingDemoComponent);
        }
    }
});
//# sourceMappingURL=ratingdemo.component.js.map