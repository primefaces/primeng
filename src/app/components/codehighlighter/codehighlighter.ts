import { NgModule, Directive, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[pCode]'
})
export class CodeHighlighter implements AfterViewInit {

    constructor(public el: ElementRef) { }

    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.el.nativeElement);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [CodeHighlighter],
    declarations: [CodeHighlighter]
})
export class CodeHighlighterModule { }


