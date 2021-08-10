(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/rating', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.rating = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, core, common, forms) { 'use strict';

    var RATING_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Rating; }),
        multi: true
    };
    var Rating = /** @class */ (function () {
        function Rating(cd) {
            this.cd = cd;
            this.stars = 5;
            this.cancel = true;
            this.iconOnClass = 'pi pi-star';
            this.iconOffClass = 'pi pi-star-o';
            this.iconCancelClass = 'pi pi-ban';
            this.onRate = new core.EventEmitter();
            this.onCancel = new core.EventEmitter();
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
            this.cd.detectChanges();
        };
        Rating.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Rating.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Rating.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        return Rating;
    }());
    Rating.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-rating',
                    template: "\n        <div class=\"p-rating\" [ngClass]=\"{'p-readonly': readonly, 'p-disabled': disabled}\">\n            <span [attr.tabindex]=\"(disabled || readonly) ? null : '0'\" *ngIf=\"cancel\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" class=\"p-rating-icon p-rating-cancel\" [ngClass]=\"iconCancelClass\" [ngStyle]=\"iconCancelStyle\"></span>\n            <span *ngFor=\"let star of starsArray;let i=index\" class=\"p-rating-icon\" [attr.tabindex]=\"(disabled || readonly) ? null : '0'\"  (click)=\"rate($event,i)\" (keydown.enter)=\"rate($event,i)\"\n                [ngClass]=\"(!value || i >= value) ? iconOffClass : iconOnClass\"\n                [ngStyle]=\"(!value || i >= value) ? iconOffStyle : iconOnStyle\"></span>\n        </div>\n    ",
                    providers: [RATING_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}"]
                },] }
    ];
    Rating.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    Rating.propDecorators = {
        disabled: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        stars: [{ type: core.Input }],
        cancel: [{ type: core.Input }],
        iconOnClass: [{ type: core.Input }],
        iconOnStyle: [{ type: core.Input }],
        iconOffClass: [{ type: core.Input }],
        iconOffStyle: [{ type: core.Input }],
        iconCancelClass: [{ type: core.Input }],
        iconCancelStyle: [{ type: core.Input }],
        onRate: [{ type: core.Output }],
        onCancel: [{ type: core.Output }]
    };
    var RatingModule = /** @class */ (function () {
        function RatingModule() {
        }
        return RatingModule;
    }());
    RatingModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Rating],
                    declarations: [Rating]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RATING_VALUE_ACCESSOR = RATING_VALUE_ACCESSOR;
    exports.Rating = Rating;
    exports.RatingModule = RatingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-rating.umd.js.map
