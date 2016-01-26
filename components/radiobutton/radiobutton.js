/// <reference path="../../typedefinition/primeui.d.ts" />
System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var RadioButton;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RadioButton = (function () {
                function RadioButton() {
                    this.click = new core_1.EventEmitter();
                    this.modelChange = new core_1.EventEmitter();
                }
                RadioButton.prototype.onclick = function (input) {
                    input.checked = true;
                    this.click.next(null);
                    this.modelChange.next(input.value);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RadioButton.prototype, "value", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], RadioButton.prototype, "name", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], RadioButton.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], RadioButton.prototype, "model", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RadioButton.prototype, "click", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], RadioButton.prototype, "modelChange", void 0);
                RadioButton = __decorate([
                    core_1.Component({
                        selector: 'p-radio',
                        template: "\n        <div class=\"pui-radiobutton ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #rb type=\"radio\" name=\"{{name}}\" value=\"{{value}}\" [checked]=\"model == value\"/>\n            </div>\n            <div class=\"pui-radiobutton-box ui-widget pui-radiobutton-relative ui-state-default\" (click)=\"onclick(rb)\"\n                        (mouseover)=\"hover = true\" (mouseout)=\"hover = false\" [ngClass]=\"{'ui-state-hover':hover,'ui-state-active':rb.checked,'ui-state-disabled':disabled}\">\n                <span class=\"pui-radiobutton-icon pui-icon\" [ngClass]=\"{'fa fa-fw fa-circle':rb.checked}\"></span>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], RadioButton);
                return RadioButton;
            })();
            exports_1("RadioButton", RadioButton);
        }
    }
});
//# sourceMappingURL=radiobutton.js.map