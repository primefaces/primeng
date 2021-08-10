(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/menu')) :
    typeof define === 'function' && define.amd ? define('primeng/splitbutton', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/menu'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.splitbutton = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.menu));
}(this, (function (exports, core, common, button, menu) { 'use strict';

    var SplitButton = /** @class */ (function () {
        function SplitButton() {
            this.iconPos = 'left';
            this.onClick = new core.EventEmitter();
            this.onDropdownClick = new core.EventEmitter();
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
        }
        SplitButton.prototype.onDefaultButtonClick = function (event) {
            this.onClick.emit(event);
        };
        SplitButton.prototype.onDropdownButtonClick = function (event) {
            this.onDropdownClick.emit(event);
            this.menu.toggle({ currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null });
        };
        return SplitButton;
    }());
    SplitButton.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-splitButton',
                    template: "\n        <div #container [ngClass]=\"'p-splitbutton p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn class=\"p-splitbutton-defaultbutton\" type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"></button>\n            <button type=\"button\" pButton class=\"p-splitbutton-menubutton\" icon=\"pi pi-chevron-down\" (click)=\"onDropdownButtonClick($event)\" [disabled]=\"disabled\"></button>\n            <p-menu #menu [popup]=\"true\" [model]=\"model\" [style]=\"menuStyle\" [styleClass]=\"menuStyleClass\" [appendTo]=\"appendTo\"\n                    [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-menu>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton{border-bottom-right-radius:0;border-right:0;border-top-right-radius:0;flex:1 1 auto}.p-splitbutton-menubutton{align-items:center;border-bottom-left-radius:0;border-top-left-radius:0;display:flex;justify-content:center}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}"]
                },] }
    ];
    SplitButton.propDecorators = {
        model: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        iconPos: [{ type: core.Input }],
        label: [{ type: core.Input }],
        onClick: [{ type: core.Output }],
        onDropdownClick: [{ type: core.Output }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        menuStyle: [{ type: core.Input }],
        menuStyleClass: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        appendTo: [{ type: core.Input }],
        dir: [{ type: core.Input }],
        showTransitionOptions: [{ type: core.Input }],
        hideTransitionOptions: [{ type: core.Input }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }],
        buttonViewChild: [{ type: core.ViewChild, args: ['defaultbtn',] }],
        menu: [{ type: core.ViewChild, args: ['menu',] }]
    };
    var SplitButtonModule = /** @class */ (function () {
        function SplitButtonModule() {
        }
        return SplitButtonModule;
    }());
    SplitButtonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, button.ButtonModule, menu.MenuModule],
                    exports: [SplitButton, button.ButtonModule],
                    declarations: [SplitButton]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SplitButton = SplitButton;
    exports.SplitButtonModule = SplitButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-splitbutton.umd.js.map
