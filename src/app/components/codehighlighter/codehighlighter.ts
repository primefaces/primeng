import {NgModule,Directive,ElementRef,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

declare var Prism: any;

@Directive({
    selector: '[pCode]'
})
export class CodeHighlighter implements OnInit {
        
    constructor(public el: ElementRef) {}
    
    ngOnInit() {
        Prism.highlightElement(this.el.nativeElement);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [CodeHighlighter],
    declarations: [CodeHighlighter]
})
export class CodeHighlighterModule { }


