import {Directive,ElementRef,HostListener,Input} from '@angular/core';

@Directive({
    selector: '[pInputText]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-hover]': 'hover',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-disabled]': 'isDisabled()'
    }
})
export class InputText {

    hover: boolean;
    
    focus: boolean;
    
    constructor(private el: ElementRef) {}
    
    @HostListener('mouseover', ['$event']) 
    onMouseover(e) {
        this.hover = true;
    }
    
    @HostListener('mouseout', ['$event']) 
    onMouseout(e) {
        this.hover = false;
    }
    
    @HostListener('focus', ['$event']) 
    onFocus(e) {
        this.focus = true;
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e) {
        this.focus = false;
    }
    
    isDisabled() {
        return this.el.nativeElement.disabled;
    }
}