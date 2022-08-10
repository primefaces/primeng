import {NgModule, Directive, ElementRef, Input, AfterContentInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';

@Directive({
    selector: '[pAutoFocus]',
    host: {
        'class': 'p-element'
    }
})

export class AutoFocus implements AfterContentInit {

    constructor (private host: ElementRef) {}

    @Input('pAutoFocus') autofocus: boolean;
    
    ngAfterContentInit () {
        
        if(this.isInputElement(this.host)) {
            if(this.autofocus) {
                this.host.nativeElement.focus();
            } 
        }
        else {
            let inputEl = DomHandler.findSingle(this.host.nativeElement, 'input');
            DomHandler.addClass(this.host.nativeElement, 'p-inputwrapper-focus');
            inputEl.focus();
        }

    }

    isInputElement(el) {
        return el.nativeElement.nodeName.toLowerCase() === 'input';
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [AutoFocus],
    declarations: [AutoFocus]
})
export class AutoFocusModule { }
