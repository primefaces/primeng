System.register(['angular2/core', '../../../components/tabview/tabview', '../../../components/tabview/tabpanel', '../../../components/button/button', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tabview_1, tabpanel_1, button_1, router_1;
    var ButtonDemoComponent;
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
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                        template: "\n        <div class=\"ContentSideSections\">\n            <div class=\"Content100 overHidden TextShadow\">\n                <span class=\"fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock\">Button</span>\n                <span class=\"defaultText dispTable\">Button is an extension to standard input element with icons and theming.</span>\n            </div>\n        </div>\n\n        <div class=\"ContentSideSections Implementation\">\n            <button type=\"text\" pButton (click)=\"count()\" [icon]=\"'fa-check'\">Click</button>\n\n            <br /><br />\n            Number of clicks: {{clicks}}\n        </div>\n\n        <div class=\"ContentSideSections Source\">\n            <p-tabView effect=\"fade\">\n                <p-tabPanel header=\"Documentation\">\n                    <h3>Getting Started</h3>\n                    <p>Button is applied to a button element with pButton directive.</p>\n                    \n<pre>\n&lt;button type=\"button\" pButton&gt;Click&lt;/button/&gt;\n</pre>\n\n                    <h3>Events</h3>\n                    <p>Events are defined using standard notation.</p>\n                    \n<pre>\n&lt;button type=\"button\" pButton (click)=\"onclick()\"&gt;Click&lt;/button/&gt;\n</pre>\n\n<pre>\nexport class Model {\n\n    onclick() {\n\n    }\n\n}\n</pre>\n\n                    <h3>Icons</h3>\n                    <p>Icon on a button is defined with icon attribute and position is customized using iconPos attribute. Default\n                    icon position is left.</p>\n<pre>\n&lt;button type=\"button\" pButton icon=\"fa-check'\" iconPos=\"left\"&gt;Click&lt;/button/&gt;\n</pre>\n\n                    <h3>Attributes</h3>\n                    <div class=\"doc-tablewrapper\">\n                        <table class=\"doc-table\">\n                            <thead>\n                                <tr>\n                                    <th>Name</th>\n                                    <th>Type</th>\n                                    <th>Default</th>\n                                    <th>Description</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td>icon</td>\n                                    <td>string</td>\n                                    <td>null</td>\n                                    <td>Name of the icon.</td>\n                                </tr>\n                                <tr>\n                                    <td>iconPos</td>\n                                    <td>string</td>\n                                    <td>left</td>\n                                    <td>Position of the icon, valid values are \"left\" and \"right\".</td>\n                                </tr>\n                                <tr>\n                                    <td>disabled</td>\n                                    <td>boolean</td>\n                                    <td>false</td>\n                                    <td>When present, it specifies that the element should be disabled.</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <h3>Styling</h3>\n                    <p>Following is the list of structural style classes, for theming classes visit <a href=\"#\" [routerLink]=\"['Theming']\">theming page</a>.</p>\n                    <div class=\"doc-tablewrapper\">\n                        <table class=\"doc-table\">\n                            <thead>\n                                <tr>\n                                    <th>Name</th>\n                                    <th>Element</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td>pui-button</td>\n                                    <td>Button element</td>\n                                </tr>\n                                <tr>\n                                    <td>pui-button-icon</td>\n                                    <td>Icon element</td>\n                                </tr>\n                                <tr>\n                                    <td>pui-button-text</td>\n                                    <td>Label element of the button</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <h3>Dependencies</h3>\n                    <p>jQuery, jQuery UI WidgetFactory API, PrimeUI Button.</p>\n                </p-tabPanel>\n                <p-tabPanel header=\"Source\">\n                <h3>Template</h3>\n<pre>\n&lt;button type=\"text\" pButton (click)=\"count()\" [icon]=\"'fa-check'\"&gt;Click&lt;/button&gt;\n\nNumber of clicks: <span>{</span><span>{</span>clicks<span>}</span><span>}</span>\n</pre>\n\n                <h3>ButtonDemoComponent</h3>\n<pre>\nexport class ButtonDemoComponent {\n\n    clicks: number = 0;\n\n    count() {\n        this.clicks++;\n    }\n}\n</pre>\n                </ p-tabPanel>\n             </p-tabView >\n        </div>\n    ",
                        directives: [button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, router_1.ROUTER_DIRECTIVES]
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