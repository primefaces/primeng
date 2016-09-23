import {NgModule,Directive,ElementRef,HostListener,Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputText]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-hover]': 'hover',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-disabled]': 'disabled',
        '[class.ui-state-filled]': 'filled'
    }
})
export class InputText {

    hover: boolean;
    
    focus: boolean;
    
    constructor(protected el: ElementRef) {}
    
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
    
    get disabled(): boolean {
        return this.el.nativeElement.disabled;
    }
    
    get filled(): boolean {
        return this.el.nativeElement.value&&this.el.nativeElement.value.length;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule { }