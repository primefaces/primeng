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
    var ToggleButton;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ToggleButton = (function () {
                function ToggleButton(el) {
                    this.el = el;
                    this.onChange = new core_1.EventEmitter();
                    this.checkedChange = new core_1.EventEmitter();
                    this.initialized = false;
                }
                ToggleButton.prototype.ngOnInit = function () {
                    var _this = this;
                    jQuery(this.el.nativeElement.children[0]).puitogglebutton({
                        onLabel: this.onLabel,
                        offLabel: this.offLabel,
                        onIcon: this.onIcon,
                        offIcon: this.offIcon,
                        checked: this.checked,
                        disabled: this.disabled,
                        style: this.style,
                        styleClass: this.styleClass,
                        change: function (event, ui) {
                            _this.stopNgOnChangesPropagation = true;
                            _this.checkedChange.next(ui.checked);
                            if (_this.onChange) {
                                _this.onChange.next({ originalEvent: event, checked: ui.checked });
                            }
                        }
                    });
                    this.initialized = true;
                };
                ToggleButton.prototype.ngOnChanges = function (changes) {
                    if (this.stopNgOnChangesPropagation) {
                        this.stopNgOnChangesPropagation = false;
                        return;
                    }
                    if (this.initialized) {
                        for (var key in changes) {
                            jQuery(this.el.nativeElement.children[0].children[0]).puitogglebutton('option', key, changes[key].currentValue);
                        }
                    }
                };
                ToggleButton.prototype.ngOnDestroy = function () {
                    jQuery(this.el.nativeElement.children[0].children[0]).puitogglebutton('destroy');
                    this.initialized = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ToggleButton.prototype, "onLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ToggleButton.prototype, "offLabel", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ToggleButton.prototype, "onIcon", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ToggleButton.prototype, "offIcon", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ToggleButton.prototype, "checked", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], ToggleButton.prototype, "disabled", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ToggleButton.prototype, "style", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ToggleButton.prototype, "styleClass", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ToggleButton.prototype, "onChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ToggleButton.prototype, "checkedChange", void 0);
                ToggleButton = __decorate([
                    core_1.Component({
                        selector: 'p-toggleButton',
                        template: '<input type="checkbox" />'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ToggleButton);
                return ToggleButton;
            })();
            exports_1("ToggleButton", ToggleButton);
        }
    }
});
//# sourceMappingURL=togglebutton.js.map