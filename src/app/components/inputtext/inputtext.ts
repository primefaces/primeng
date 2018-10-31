import {NgModule,Directive,ElementRef,HostListener,Input,DoCheck,Optional, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {NgModel} from '@angular/forms';
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
export class InputText implements DoCheck, AfterViewInit {

    filled: boolean;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel, private cd: ChangeDetectorRef) {}
        
    ngDoCheck() {
        this.updateFilledState();
    }
    
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event']) 
    onInput(e) {
        this.updateFilledState();
    }
    
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
                        (this.ngModel && this.ngModel.model);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateFilledState();
            this.cd.markForCheck();
        });
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText]
})
export class InputTextModule { }