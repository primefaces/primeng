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
var forms_1 = require("@angular/forms");
exports.RATING_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Rating; }),
    multi: true
};
var Rating = (function () {
    function Rating() {
        this.stars = 5;
        this.cancel = true;
        this.iconOnClass = 'fa-star';
        this.iconOffClass = 'fa-star-o';
        this.iconCancelClass = 'fa-ban';
        this.onRate = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Rating.prototype.ngOnInit = function () {
        this.starsArray = [];
        for (var i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    };
    Rating.prototype.rate = function (event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    };
    Rating.prototype.clear = function (event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    };
    Rating.prototype.writeValue = function (value) {
        this.value = value;
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Rating.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Rating.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    return Rating;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Rating.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Rating.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], Rating.prototype, "stars", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], Rating.prototype, "cancel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Rating.prototype, "iconOnClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Rating.prototype, "iconOnStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Rating.prototype, "iconOffClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Rating.prototype, "iconOffStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Rating.prototype, "iconCancelClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Rating.prototype, "iconCancelStyle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Rating.prototype, "onRate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Rating.prototype, "onCancel", void 0);
Rating = __decorate([
    core_1.Component({
        selector: 'p-rating',
        template: "\n        <div class=\"ui-rating\" [ngClass]=\"{'ui-state-disabled': disabled}\">\n            <a href=\"#\" *ngIf=\"cancel\" (click)=\"clear($event)\">\n                <span class=\"fa\" [ngClass]=\"[iconCancelClass]\" [ngStyle]=\"[iconCancelStyle]\"></span>\n            </a>\n            <a href=\"#\" *ngFor=\"let star of starsArray;let i=index\" (click)=\"rate($event,i)\">\n                <span class=\"fa\" \n                    [ngClass]=\"(!value || i >= value) ? iconOffClass : iconOnClass\"\n                    [ngStyle]=\"(!value || i >= value) ? iconOffStyle : iconOnStyle\"\n                ></span>\n            </a>\n        </div>\n    ",
        providers: [exports.RATING_VALUE_ACCESSOR]
    })
], Rating);
exports.Rating = Rating;
var RatingModule = (function () {
    function RatingModule() {
    }
    return RatingModule;
}());
RatingModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [Rating],
        declarations: [Rating]
    })
], RatingModule);
exports.RatingModule = RatingModule;
//# sourceMappingURL=rating.js.map