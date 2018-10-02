import {NgModule,Directive,ElementRef,HostListener,Input,Output,OnInit,DoCheck,EventEmitter,Optional} from '@angular/core';
import {NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputTextarea]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-filled]': 'filled',
        '[attr.rows]': 'rows',
        '[attr.cols]': 'cols'
    }
})
export class InputTextarea implements OnInit,DoCheck {
    
    @Input() autoResize: boolean;
    
    @Input() rows: number = 2;
    
    @Input() cols: number = 20;
    
    @Output() onResize: EventEmitter<any> = new EventEmitter();
    
    rowsDefault: number;
    
    colsDefault: number;
    
    filled: boolean;

    cachedScrollHeight:number;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel) {}
    
    ngOnInit() {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
        var style = window.getComputedStyle(this.el.nativeElement, null);
        if (style.resize === 'vertical') {
            this.el.nativeElement.style.resize = 'none';
        } 
        else if (style.resize === 'both') {
            this.el.nativeElement.style.resize = 'horizontal';
        }
    }
    
    ngDoCheck() {
        this.updateFilledState();
    }
    
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event'])
    onInput(e) {
        this.updateFilledState();
        if(this.autoResize) {
            this.resize(e);
        }
    }
    
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
                        (this.ngModel && this.ngModel.model);
    }
    
    @HostListener('focus', ['$event'])
    onFocus(e) {
        if(this.autoResize) {
            this.resize(e);
        }
    }
    
    @HostListener('blur', ['$event'])
    onBlur(e) {
        if(this.autoResize) {
            this.resize(e);
        }
    }
    
    resize(event?: Event) {
        var style = window.getComputedStyle(this.el.nativeElement, null);

        if(!this.cachedScrollHeight) {
            this.cachedScrollHeight = this.el.nativeElement.scrollHeight;
            this.el.nativeElement.style.overflow = "hidden";
        }

        if(this.cachedScrollHeight != this.el.nativeElement.scrollHeight) {
            this.el.nativeElement.style.height = ''
            this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';

            if(parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
                this.el.nativeElement.style.overflowY = "scroll";
                this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
            }
            else{
                this.el.nativeElement.style.overflow = "hidden";
            }

            this.cachedScrollHeight = this.el.nativeElement.scrollHeight;
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
