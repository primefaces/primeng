import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, NgModule, ViewChild } from '@angular/core';

@Component({
    selector: 'app-code',
    template: `
        <pre [ngClass]="'language-' + lang" [style]="style" [class]="styleClass"><code #code><ng-content></ng-content>
</code></pre>
    `
})
export class AppCodeComponent implements AfterViewInit {
    @Input() lang = 'markup';

    @Input() style: any;

    @Input() styleClass: string;

    @ViewChild('code') codeViewChild: ElementRef;

    constructor(public el: ElementRef) {}

    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.codeViewChild.nativeElement);
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AppCodeComponent],
    declarations: [AppCodeComponent]
})
export class AppCodeModule {}
