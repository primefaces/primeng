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
    var Checkbox;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Checkbox = (function () {
                function Checkbox() {
                    this.onChange = new core_1.EventEmitter();
                    this.modelChange = new core_1.EventEmitter();
                }
                Checkbox.prototype.onClick = function (input) {
                    input.checked = !input.checked;
                    this.onChange.next(input.checked);
                    if (input.checked)
                        this.addValue(input.value);
                    else
                        this.removeValue(input.value);
                    this.modelChange.next(this.model);
                };
                Checkbox.prototype.isChecked = function (value) {
                    return this.findValueIndex(value) !== -1;
                };
                Checkbox.prototype.removeValue = function (value) {
                    var index = this.findValueIndex(value);
                    if (index >= 0) {
                        this.model.splice(index, 1);
                    }
                };
                Checkbox.prototype.addValue = function (value) {
                    this.model.push(value);
                };
                Checkbox.prototype.findValueIndex = function (value) {
                    var index = -1;
                    if (this.model) {
                        for (var i = 0; i < this.model.length; i++) {
                            if (this.model[i] == value) {
                                index = i;
                                break;
                            }
                        }
                    }
                    return index;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Checkbox.prototype, "value", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Checkbox.prototype, "name", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], Checkbox.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Checkbox.prototype, "model", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Checkbox.prototype, "onChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Checkbox.prototype, "modelChange", void 0);
                Checkbox = __decorate([
                    core_1.Component({
                        selector: 'p-checkbox',
                        template: "\n        <div class=\"pui-chkbox ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" name=\"{{name}}\" value=\"{{value}}\" [checked]=\"isChecked(cb.value)\"/>\n            </div>\n            <div class=\"pui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick(cb)\"\n                        (mouseover)=\"hover = true\" (mouseout)=\"hover = false\" [ngClass]=\"{'ui-state-hover':hover,'ui-state-active':cb.checked,'ui-state-disabled':disabled}\">\n                <span class=\"pui-chkbox-icon pui-c\" [ngClass]=\"{'fa fa-fw fa-check':cb.checked}\"></span>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Checkbox);
                return Checkbox;
            })();
            exports_1("Checkbox", Checkbox);
        }
    }
});
//# sourceMappingURL=checkbox.js.map