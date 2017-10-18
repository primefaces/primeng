"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var button_1 = require("../button/button");
var InplaceDisplay = (function () {
    function InplaceDisplay() {
    }
    return InplaceDisplay;
}());
InplaceDisplay = __decorate([
    core_1.Component({
        selector: 'p-inplaceDisplay',
        template: '<ng-content></ng-content>'
    })
], InplaceDisplay);
exports.InplaceDisplay = InplaceDisplay;
var InplaceContent = (function () {
    function InplaceContent() {
    }
    return InplaceContent;
}());
InplaceContent = __decorate([
    core_1.Component({
        selector: 'p-inplaceContent',
        template: '<ng-content></ng-content>'
    })
], InplaceContent);
exports.InplaceContent = InplaceContent;
var Inplace = (function () {
    function Inplace() {
        this.onActivate = new core_1.EventEmitter();
        this.onDeactivate = new core_1.EventEmitter();
    }
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    return Inplace;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Inplace.prototype, "active", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Inplace.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Inplace.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Inplace.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Inplace.prototype, "styleClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Inplace.prototype, "onActivate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Inplace.prototype, "onDeactivate", void 0);
Inplace = __decorate([
    core_1.Component({
        selector: 'p-inplace',
        template: "\n        <div [ngClass]=\"'ui-inplace ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\"\n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" icon=\"fa-close\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    "
    })
], Inplace);
exports.Inplace = Inplace;
var InplaceModule = (function () {
    function InplaceModule() {
    }
    return InplaceModule;
}());
InplaceModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, button_1.ButtonModule],
        exports: [Inplace, InplaceDisplay, InplaceContent, button_1.ButtonModule],
        declarations: [Inplace, InplaceDisplay, InplaceContent]
    })
], InplaceModule);
exports.InplaceModule = InplaceModule;
//# sourceMappingURL=inplace.js.map