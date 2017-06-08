import {NgModule,Directive,ElementRef,HostListener,Input,Output,OnInit,DoCheck,EventEmitter} from '@angular/core';
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
    
    @Input() rows: number;
    
    @Input() cols: number;
    
    @Output() onResize: EventEmitter<any> = new EventEmitter();
    
    rowsDefault: number;
    
    colsDefault: number;
    
    filled: boolean;
        
    constructor(public el: ElementRef) {}
    
    ngOnInit() {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
    }
    
    ngDoCheck() {
        this.updateFilledState();
    }
    
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    @HostListener('input', ['$event']) 
    onInput(e) {
        this.updateFilledState();
    }
    
    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
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
    
    @HostListener('keyup', ['$event']) 
    onKeyup(e) {
        if(this.autoResize) {
            this.resize(e);
        }
    }
    
    resize(event?: Event) {
        let linesCount = 0,
        lines = this.el.nativeElement.value.split('\n');

        for(let i = lines.length-1; i >= 0 ; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }

        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
        this.onResize.emit(event||{});
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule { }