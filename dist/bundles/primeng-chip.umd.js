(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/chip', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.chip = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var Chip = /** @class */ (function () {
        function Chip() {
            this.removeIcon = "pi pi-times-circle";
            this.onRemove = new core.EventEmitter();
            this.visible = true;
        }
        Chip.prototype.containerClass = function () {
            return {
                'p-chip p-component': true,
                'p-chip-image': this.image != null
            };
        };
        Chip.prototype.close = function (event) {
            this.visible = false;
            this.onRemove.emit(event);
        };
        return Chip;
    }());
    Chip.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-chip',
                    template: "\n        <div [ngClass]=\"containerClass()\" [class]=\"styleClass\" [ngStyle]=\"style\" *ngIf=\"visible\">\n            <ng-content></ng-content>\n            <img [src]=\"image\" *ngIf=\"image;else iconTemplate\">\n            <ng-template #iconTemplate><span *ngIf=\"icon\" [class]=\"icon\" [ngClass]=\"'p-chip-icon'\"></span></ng-template>\n            <div class=\"p-chip-text\" *ngIf=\"label\">{{label}}</div>\n            <span *ngIf=\"removable\" tabindex=\"0\" [class]=\"removeIcon\" [ngClass]=\"'pi-chip-remove-icon'\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\"></span>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-chip{align-items:center;display:inline-flex}.p-chip-icon.pi,.p-chip-text{line-height:1.5}.pi-chip-remove-icon{cursor:pointer;line-height:1.5}.p-chip img{border-radius:50%}"]
                },] }
    ];
    Chip.propDecorators = {
        label: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        image: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        removable: [{ type: core.Input }],
        removeIcon: [{ type: core.Input }],
        onRemove: [{ type: core.Output }]
    };
    var ChipModule = /** @class */ (function () {
        function ChipModule() {
        }
        return ChipModule;
    }());
    ChipModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [Chip],
                    declarations: [Chip]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Chip = Chip;
    exports.ChipModule = ChipModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-chip.umd.js.map
