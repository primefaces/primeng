import { Directive, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class CodeHighlighter {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.el.nativeElement);
        }
    }
}
CodeHighlighter.decorators = [
    { type: Directive, args: [{
                selector: '[pCode]'
            },] }
];
CodeHighlighter.ctorParameters = () => [
    { type: ElementRef }
];
class CodeHighlighterModule {
}
CodeHighlighterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [CodeHighlighter],
                declarations: [CodeHighlighter]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CodeHighlighter, CodeHighlighterModule };
//# sourceMappingURL=primeng-codehighlighter.js.map
