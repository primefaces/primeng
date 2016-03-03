import {Directive, ElementRef,HostBinding,HostListener,Input} from 'angular2/core';
import {NgModel} from 'angular2/common';

@Directive({
    selector: '[pInputText]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-hover]': 'hover',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-disabled]': 'isDisabled()',
        '[class.ui-state-error]': 'isInvalid()'
    },
    providers: [NgModel]
})
export class InputText {

    hover: boolean;
    
    focus: boolean;
    
    constructor(private el: ElementRef, private control: NgModel) {}
    
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
    
    isInvalid() {
        return !this.control.valid;
    }
}