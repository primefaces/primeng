System.register(['angular2/core', '../inputtext.directive'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, inputtext_directive_1;
    var InputTextDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (inputtext_directive_1_1) {
                inputtext_directive_1 = inputtext_directive_1_1;
            }],
        execute: function() {
            InputTextDemoComponent = (function () {
                function InputTextDemoComponent() {
                    this.disabled = false;
                }
                InputTextDemoComponent.prototype.toggleDisabled = function () {
                    this.disabled = !this.disabled;
                };
                InputTextDemoComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"ContentSideSections\">\n            <div class=\"Content100 overHidden TextShadow\">\n                <span class=\"fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock\">Inputtext</span>\n                <span class=\"defaultText dispTable\">InputText is an extension to standard input element with skinning capabilities.</span>\n            </div>\n        </div>\n\n        <div class=\"ContentSideSections Implementation\">\n            <h3 class=\"first\">Basic</h3>\n            <input id=\"in\" type=\"text\" size=\"30\" pInputText [icon]=\"something\" [(ngModel)]=\"text\" [disabled]=\"disabled\"/>\n\n            {{text}}\n\n            <button type=\"text\" (click)=\"toggleDisabled()\">Toggle</button>\n        </div>\n    ",
                        directives: [inputtext_directive_1.InputTextDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], InputTextDemoComponent);
                return InputTextDemoComponent;
            })();
            exports_1("InputTextDemoComponent", InputTextDemoComponent);
        }
    }
});
//# sourceMappingURL=inputtextdemo.component.js.map