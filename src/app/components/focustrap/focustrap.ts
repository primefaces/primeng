import {NgModule,Directive,ElementRef,HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';

@Directive({
    selector: '[pFocusTrap]',
})
export class FocusTrap {

    constructor(public el: ElementRef) {}

    @HostListener('keydown', ['$event']) 
    onkeydown(e) {
        if(e.which === 9) {
            e.preventDefault();
            
            let focusableElements = DomHandler.getFocusableElements(this.el.nativeElement);

            if (focusableElements && focusableElements.length > 0) {
                if (!document.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    let focusedIndex = focusableElements.indexOf(document.activeElement);

                    if (e.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                            focusableElements[0].focus();
                        else
                            focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [FocusTrap],
    declarations: [FocusTrap]
})
export class FocusTrapModule { }