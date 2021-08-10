import { Directive, ElementRef, Optional, HostListener, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

class InputText {
    constructor(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    onInput(e) {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    }
}
InputText.decorators = [
    { type: Directive, args: [{
                selector: '[pInputText]',
                host: {
                    '[class.p-inputtext]': 'true',
                    '[class.p-component]': 'true',
                    '[class.p-filled]': 'filled'
                }
            },] }
];
InputText.ctorParameters = () => [
    { type: ElementRef },
    { type: NgModel, decorators: [{ type: Optional }] }
];
InputText.propDecorators = {
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }]
};
class InputTextModule {
}
InputTextModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [InputText],
                declarations: [InputText]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { InputText, InputTextModule };
//# sourceMappingURL=primeng-inputtext.js.map
