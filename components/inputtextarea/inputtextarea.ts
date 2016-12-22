import {NgModule,Directive,ElementRef,HostListener,Input,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pInputTextarea]',
    host: {
        '[class.ui-inputtext]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-hover]': 'hover',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-disabled]': 'disabled',
        '[class.ui-state-filled]': 'filled',
        '[attr.rows]': 'rows',
        '[attr.cols]': 'cols',
        '[attr.placeholder]': 'placeholder'
    }
})
export class InputTextarea implements OnInit {
    
    @Input() autoResize: boolean;
    
    @Input() rows: number;
    
    @Input() cols: number;

    @Input() placeholder: string;

    hover: boolean;
    
    focus: boolean;
    
    rowsDefault: number;
    
    colsDefault: number;
        
    constructor(public el: ElementRef) {}
    
    ngOnInit() {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
    }
    
    @HostListener('mouseover', ['$event']) 
    onMouseover(e) {
        this.hover = true;
    }
    
    @HostListener('mouseout', ['$event']) 
    onMouseout(e) {
        this.hover = false;
    }
    
    @HostListener('focus', ['$event']) 
    onFocus(e) {
        this.focus = true;
        
        if(this.autoResize) {
            this.resize();
        }
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e) {
        this.focus = false;
        
        if(this.autoResize) {
            this.resize();
        }
    }
    
    @HostListener('keyup', ['$event']) 
    onKeyup(e) {
        if(this.autoResize) {
            this.resize();
        }
    }
    
    resize () {
        let linesCount = 0,
        lines = this.el.nativeElement.value.split('\n');

        for(let i = lines.length-1; i >= 0 ; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }

        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
    }
    
    get disabled(): boolean {
        return this.el.nativeElement.disabled;
    }
    
    get filled(): boolean {
        return this.el.nativeElement.value != '';
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputTextarea],
    declarations: [InputTextarea]
})
export class InputTextareaModule { }
