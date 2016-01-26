System.register(['angular2/core', 'angular2/router', './homepage.component', './theming.component', './demo/inputtext/inputtextdemo.component', './demo/button/buttondemo.component', './demo/spinner/spinnerdemo.component', './demo/panel/paneldemo.component', './demo/fieldset/fieldsetdemo.component', './demo/rating/ratingdemo.component', './demo/password/passworddemo.component', './demo/dialog/dialogdemo.component', './demo/togglebutton/togglebuttondemo.component', './demo/grid/griddemo.component', './demo/tabview/tabviewdemo.component', './demo/radiobutton/radiobuttondemo.component', './demo/accordion/accordiondemo.component', './demo/inputtextarea/inputtextareademo.component', './demo/galleria/galleriademo.component', './demo/checkbox/checkboxdemo.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, homepage_component_1, theming_component_1, inputtextdemo_component_1, buttondemo_component_1, spinnerdemo_component_1, paneldemo_component_1, fieldsetdemo_component_1, ratingdemo_component_1, passworddemo_component_1, dialogdemo_component_1, togglebuttondemo_component_1, griddemo_component_1, tabviewdemo_component_1, radiobuttondemo_component_1, accordiondemo_component_1, inputtextareademo_component_1, galleriademo_component_1, checkboxdemo_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (homepage_component_1_1) {
                homepage_component_1 = homepage_component_1_1;
            },
            function (theming_component_1_1) {
                theming_component_1 = theming_component_1_1;
            },
            function (inputtextdemo_component_1_1) {
                inputtextdemo_component_1 = inputtextdemo_component_1_1;
            },
            function (buttondemo_component_1_1) {
                buttondemo_component_1 = buttondemo_component_1_1;
            },
            function (spinnerdemo_component_1_1) {
                spinnerdemo_component_1 = spinnerdemo_component_1_1;
            },
            function (paneldemo_component_1_1) {
                paneldemo_component_1 = paneldemo_component_1_1;
            },
            function (fieldsetdemo_component_1_1) {
                fieldsetdemo_component_1 = fieldsetdemo_component_1_1;
            },
            function (ratingdemo_component_1_1) {
                ratingdemo_component_1 = ratingdemo_component_1_1;
            },
            function (passworddemo_component_1_1) {
                passworddemo_component_1 = passworddemo_component_1_1;
            },
            function (dialogdemo_component_1_1) {
                dialogdemo_component_1 = dialogdemo_component_1_1;
            },
            function (togglebuttondemo_component_1_1) {
                togglebuttondemo_component_1 = togglebuttondemo_component_1_1;
            },
            function (griddemo_component_1_1) {
                griddemo_component_1 = griddemo_component_1_1;
            },
            function (tabviewdemo_component_1_1) {
                tabviewdemo_component_1 = tabviewdemo_component_1_1;
            },
            function (radiobuttondemo_component_1_1) {
                radiobuttondemo_component_1 = radiobuttondemo_component_1_1;
            },
            function (accordiondemo_component_1_1) {
                accordiondemo_component_1 = accordiondemo_component_1_1;
            },
            function (inputtextareademo_component_1_1) {
                inputtextareademo_component_1 = inputtextareademo_component_1_1;
            },
            function (galleriademo_component_1_1) {
                galleriademo_component_1 = galleriademo_component_1_1;
            },
            function (checkboxdemo_component_1_1) {
                checkboxdemo_component_1 = checkboxdemo_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.themesVisible = false;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'showcase/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'HomePage', component: homepage_component_1.HomePageComponent },
                        { path: '/theming', name: 'Theming', component: theming_component_1.ThemingComponent },
                        { path: '/inputtext', name: 'InputTextDemo', component: inputtextdemo_component_1.InputTextDemoComponent },
                        { path: '/button', name: 'ButtonDemo', component: buttondemo_component_1.ButtonDemoComponent },
                        { path: '/spinner', name: 'SpinnerDemo', component: spinnerdemo_component_1.SpinnerDemoComponent },
                        { path: '/panel', name: 'PanelDemo', component: paneldemo_component_1.PanelDemoComponent },
                        { path: '/fieldset', name: 'FieldsetDemo', component: fieldsetdemo_component_1.FieldsetDemoComponent },
                        { path: '/rating', name: 'RatingDemo', component: ratingdemo_component_1.RatingDemoComponent },
                        { path: '/password', name: 'PasswordDemo', component: passworddemo_component_1.PasswordDemoComponent },
                        { path: '/dialog', name: 'DialogDemo', component: dialogdemo_component_1.DialogDemoComponent },
                        { path: '/togglebutton', name: 'ToggleButtonDemo', component: togglebuttondemo_component_1.ToggleButtonDemoComponent },
                        { path: '/grid', name: 'GridDemo', component: griddemo_component_1.GridDemoComponent },
                        { path: '/tabview', name: 'TabViewDemo', component: tabviewdemo_component_1.TabViewDemoComponent },
                        { path: '/radiobutton', name: 'RadioButtonDemo', component: radiobuttondemo_component_1.RadioButtonDemoComponent },
                        { path: '/accordion', name: 'AccordionDemo', component: accordiondemo_component_1.AccordionDemoComponent },
                        { path: '/inputtextarea', name: 'InputTextareaDemo', component: inputtextareademo_component_1.InputTextareaDemoComponent },
                        { path: '/galleria', name: 'GalleriaDemo', component: galleriademo_component_1.GalleriaDemoComponent },
                        { path: '/checkbox', name: 'CheckboxDemo', component: checkboxdemo_component_1.CheckboxDemoComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map