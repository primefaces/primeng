import {NgModule,Directive,ElementRef,HostListener,Input,Output,DoCheck,EventEmitter,Optional} from '@angular/core';
import {NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputTextarea]',
    host: {
        '[class.p-inputtextarea]': 'true',
        '[class.p-inputtext]': 'true',
        '[class.p-component]': 'true',
        '[class.p-filled]': 'filled',
        '[class.p-inputtextarea-resizable]': 'autoResize'
    }
})
export class InputTextarea implements DoCheck {
    
    @Input() autoResize: boolean;
    
    @Output() onResize: EventEmitter<any> = new EventEmitter();
        
    filled: boolean;

    cachedScrollHeight:number;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel) {}
        
    ngDoCheck() {
        this.updateFilledState();
        
        if (this.autoResize) {
            this.resize();
        }
    }
    
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event'])
    onInput(e) {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize(e);
        }
    }
    
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
    
    @HostListener('focus', ['$event'])
    onFocus(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    
    @HostListener('blur', ['$event'])
    onBlur(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    
    resize(event?: Event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';

        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }

        this.onResize.emit(event||{});
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule { }
