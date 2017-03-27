import {NgModule,Directive,ElementRef,HostListener,Input,DoCheck} from '@angular/core';
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
export class InputText implements DoCheck {
    filled: boolean;

    constructor(public el: ElementRef) {}

    ngDoCheck() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
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