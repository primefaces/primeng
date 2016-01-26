System.register(['angular2/core', '../../../components/inputtext/inputtext', '../../../components/button/button', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, inputtext_1, button_1, tabview_1, tabpanel_1, router_1;
    var InputTextDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (inputtext_1_1) {
                inputtext_1 = inputtext_1_1;
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
            InputTextDemoComponent = (function () {
                function InputTextDemoComponent() {
                    this.disabled = true;
                }
                InputTextDemoComponent.prototype.toggleDisabled = function () {
                    this.disabled = !this.disabled;
                };
                InputTextDemoComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div class=\"ContentSideSections\">\n            <div class=\"Content100 overHidden TextShadow\">\n                <span class=\"fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock\">Inputtext</span>\n                <span class=\"defaultText dispTable\">InputText is an extension to standard input element with theming.</span>\n            </div>\n        </div>\n\n        <div class=\"ContentSideSections Implementation\">\n            <h3 class=\"first\">Basic</h3>\n            <input id=\"in\" type=\"text\" size=\"30\" pInputText [(ngModel)]=\"text\" /> &nbsp; {{text}}\n\n            <h3>Disabled</h3>\n            <input id=\"in\" type=\"text\" size=\"30\" pInputText [disabled]=\"disabled\" />\n\n            <button type=\"text\" (click)=\"toggleDisabled()\" pButton>Toggle</button>\n        </div>\n\n        <div class=\"ContentSideSections Source\">\n            <p-tabView effect=\"fade\">\n                <p-tabPanel header=\"Documentation\">\n                    <h3>Getting Started</h3>\n                    <p>InputText is applied to an input field with pInputText directive.</p>\n                    \n<pre>\n&lt;input type=\"text\" pInputText /&gt;\n</pre>\n\n                    <h3>Model Binding</h3>\n                    <p>A model can be bound using ngModel regularly.</p>\n<pre>\n&lt;input type=\"text\" pInputText [(ngModel)]=\"property\"/&gt;\n</pre>\n\n                    <h3>Attributes</h3>\n                    <div class=\"doc-tablewrapper\">\n                        <table class=\"doc-table\">\n                            <thead>\n                                <tr>\n                                    <th>Name</th>\n                                    <th>Type</th>\n                                    <th>Default</th>\n                                    <th>Description</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td>disabled</td>\n                                    <td>boolean</td>\n                                    <td>false</td>\n                                    <td>When present, it specifies that the element should be disabled.</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <h3>Styling</h3>\n                    <p>Following is the list of structural style classes, for theming classes visit <a href=\"#\" [routerLink]=\"['Theming']\">theming page</a>.</p>\n                    <div class=\"doc-tablewrapper\">\n                        <table class=\"doc-table\">\n                            <thead>\n                                <tr>\n                                    <th>Name</th>\n                                    <th>Element</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td>pui-inputtext</td>\n                                    <td>Input element</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <h3>Dependencies</h3>\n                    <p>jQuery, jQuery UI WidgetFactory API, PrimeUI InputText.</p>\n                </p-tabPanel>\n                <p-tabPanel header=\"Source\">\n<h3>Template</h3>\n<pre>\n&lt;h3 class=\"first\"&gt;Basic&lt;/h3&gt;\n&lt;input id=\"in\" type=\"text\" size=\"30\" pInputText [(ngModel)]=\"text\" /&gt; &amp;nbsp; <span>{</span><span>{</span>text<span>}</span><span>}</span>\n\n&lt;h3&gt;Disabled&lt;/h3&gt;\n&lt;input id=\"in\" type=\"text\" size=\"30\" pInputText [disabled]=\"disabled\" /&gt;\n\n&lt;button type=\"text\" (click)=\"toggleDisabled()\" pButton&gt;Toggle&lt;/button&gt;\n</pre>\n\n<h3>InputTextDemoComponent</h3>\n<pre>\nexport class InputTextDemoComponent {\n\n    text: string;\n\n    disabled: boolean = true;\n\n    toggleDisabled() {\n        this.disabled = !this.disabled;\n    }\n}\n</pre>\n                </p-tabPanel>\n            </p-tabView>\n        </div>\n    ",
                        directives: [inputtext_1.InputText, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, router_1.ROUTER_DIRECTIVES]
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