import {NgModule,Directive,ElementRef,HostBinding,HostListener,Input,DoCheck,Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgModel} from '@angular/forms';

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

    @Input()
    @HostBinding('attr.value')
    value: any;

    filled: boolean;

    constructor(public el: ElementRef, @Optional() private ngModel: NgModel) {}
        
    ngDoCheck() {
        this.updateFilledState();
    }
    
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event']) 
    onInput(e) {
        this.updateFilledState();
    }
    
    updateFilledState() {
        // this.value and this.ngModel.model checks are needed for usage with ChangeDetectionStrategy.OnPush
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length
            || this.value && this.value.length
            || this.ngModel && this.ngModel.model && this.ngModel.model;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule { }