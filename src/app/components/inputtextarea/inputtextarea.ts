import {NgModule,Directive,ElementRef,HostListener,Input,Output,DoCheck,EventEmitter,Optional, AfterViewInit, AfterContentInit, OnInit, OnDestroy, AfterViewChecked} from '@angular/core';
import {NgModel, NgControl} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { Subscription } from 'rxjs';

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
export class InputTextarea implements OnInit, AfterViewInit, OnDestroy  {
    
    @Input() autoResize: boolean;
    
    @Output() onResize: EventEmitter<any> = new EventEmitter();
        
    filled: boolean;

    cachedScrollHeight:number;

    ngModelSubscription: Subscription;

    ngControlSubscription: Subscription;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel, @Optional() public control : NgControl) {}
        
    ngOnInit() {
        if (this.ngModel) {
            this.ngModelSubscription = this.ngModel.valueChanges.subscribe(() =>{
                this.updateState();
            })
        }

        if (this.control) {
            this.ngControlSubscription = this.control.valueChanges.subscribe(() => {
                this.updateState();
            });
        }
    }

    ngAfterViewInit() {
        if (this.autoResize)
            this.resize();
    }

    @HostListener('input', ['$event'])
    onInput(e) {
        this.updateState();
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

    updateState() {
        this.updateFilledState();
            
        if (this.autoResize) {
            this.resize();
        }
    }

    ngOnDestroy() {
        if (this.ngModelSubscription) {
            this.ngModelSubscription.unsubscribe();
        }

        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule { }
