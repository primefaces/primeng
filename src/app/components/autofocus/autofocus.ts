import { NgModule, Directive, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[pAutoFocus]',
    host: {
        'class': 'p-element'
    }
})

export class AutoFocus {
    constructor (private host: ElementRef) {}

    @Input('pAutoFocus') autofocus: boolean;
    
    ngAfterViewInit () {

        if(this.autofocus) {
            this.host.nativeElement.focus();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AutoFocus],
    declarations: [AutoFocus]
})
export class AutoFocusModule { }
