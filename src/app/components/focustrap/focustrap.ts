import { DomHandler } from 'primeng/dom';

import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';

@Directive({
    selector: '[pFocusTrap]',
    host: {
        class: 'p-element'
    }
})
export class FocusTrap {
    @Input() pFocusTrapDisabled: boolean;

    constructor(public el: ElementRef) {}

    @HostListener('keydown.tab', ['$event'])
    @HostListener('keydown.shift.tab', ['$event'])
    onkeydown(e) {
        if (this.pFocusTrapDisabled !== true) {
            e.preventDefault();
            const focusableElement = DomHandler.getNextFocusableElement(this.el.nativeElement, e.shiftKey);

            if (focusableElement) {
                focusableElement.focus();
                focusableElement.select?.();
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [FocusTrap],
    declarations: [FocusTrap]
})
export class FocusTrapModule {}
