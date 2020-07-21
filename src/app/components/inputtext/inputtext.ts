import {NgModule,Directive,ElementRef,HostListener,DoCheck,Optional} from '@angular/core';
import {NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputText]',
    host: {
        '[class.p-inputtext]': 'true',
        '[class.p-component]': 'true',
        '[class.p-filled]': 'filled'
    }
})
export class InputText implements DoCheck {

    filled: boolean;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel) {}
        
    ngDoCheck() {
        this.updateFilledState();
    }
    
    @HostListener('input', ['$event']) 
    onInput(e) {
        this.updateFilledState();
    }
    
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
                        (this.ngModel && this.ngModel.model);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule { }