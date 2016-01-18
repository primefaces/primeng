System.register(['angular2/core', '../button.directive'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, button_directive_1;
    var ButtonDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (button_directive_1_1) {
                button_directive_1 = button_directive_1_1;
            }],
        execute: function() {
            ButtonDemoComponent = (function () {
                function ButtonDemoComponent() {
                    this.clicks = 0;
                }
                ButtonDemoComponent.prototype.count = function () {
                    this.clicks++;
                };
                ButtonDemoComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"ContentSideSections\">\n            <div class=\"Content100 overHidden TextShadow\">\n                <span class=\"fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock\">Button</span>\n                <span class=\"defaultText dispTable\">Button is an extension to standard input element with skinning capabilities.</span>\n            </div>\n        </div>\n\n        <div class=\"ContentSideSections Implementation\">\n            <button type=\"text\" pButton (click)=\"count()\" [icon]=\"'fa-check'\">Toggle</button>\n\n            <br /><br />\n            Number of clicks: {{clicks}}\n        </div>\n    ",
                        directives: [button_directive_1.ButtonDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ButtonDemoComponent);
                return ButtonDemoComponent;
            })();
            exports_1("ButtonDemoComponent", ButtonDemoComponent);
        }
    }
});
//# sourceMappingURL=buttondemo.component.js.map