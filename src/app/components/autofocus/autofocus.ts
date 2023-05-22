import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';

@Directive({
    selector: '[pAutoFocus]',
    host: {
        class: 'p-element'
    }
})
export class AutoFocus {
    constructor(private host: ElementRef) {}
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input() autofocus: boolean | undefined;

    focused: boolean = false;

    ngAfterContentChecked() {
        if (!this.focused) {
            if (this.autofocus) {
                const focusableElements = DomHandler.getFocusableElements(this.host.nativeElement);

                if (focusableElements.length === 0) {
                    this.host.nativeElement.focus();
                }
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }

                this.focused = true;
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AutoFocus],
    declarations: [AutoFocus]
})
export class AutoFocusModule {}
