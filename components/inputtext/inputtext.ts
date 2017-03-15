import {NgModule,Directive,ElementRef,HostListener,Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputText]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-filled]': 'filled'
    }
})
export class InputText {

    constructor(public el: ElementRef) {}
        
    get filled(): boolean {
        return this.el.nativeElement.value&&this.el.nativeElement.value.length;
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e) {        
        //To trigger change detection to manage ui-state-filled for material labels
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule { }