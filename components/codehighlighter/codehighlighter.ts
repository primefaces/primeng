import {Directive, ElementRef, OnInit} from '@angular/core';

declare var Prism: any;

@Directive({
    selector: '[pCode]'
})
export class CodeHighlighter implements OnInit {
        
    constructor(private el: ElementRef) {}
    
    ngOnInit() {
        Prism.highlightElement(this.el.nativeElement);
    }
}



