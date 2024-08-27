import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Input, NgModule, PLATFORM_ID, booleanAttribute, inject } from '@angular/core';
import { DomHandler } from 'primeng/dom';
/**
 * AutoFocus manages focus on focusable element on load.
 * @group Components
 */
@Directive({
    selector: '[pAutoFocus]',
    standalone: true,
})
export class AutoFocus {
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean = false;

    focused: boolean = false;

    platformId = inject(PLATFORM_ID);

    document: Document = inject(DOCUMENT);

    host: ElementRef = inject(ElementRef);

    ngAfterContentChecked() {
        // This sets the `attr.autofocus` which is different than the Input `autofocus` attribute.
        if (this.autofocus === false) {
            this.host.nativeElement.removeAttribute('autofocus');
        } else {
            this.host.nativeElement.setAttribute('autofocus', true);
        }

        if (!this.focused) {
            this.autoFocus();
        }
    }

    ngAfterViewChecked() {
        if (!this.focused) {
            this.autoFocus();
        }
    }

    autoFocus() {
        if (isPlatformBrowser(this.platformId) && this.autofocus) {
            setTimeout(() => {
                const focusableElements = DomHandler.getFocusableElements(this.host?.nativeElement);

                if (focusableElements.length === 0) {
                    this.host.nativeElement.focus();
                }
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }

                this.focused = true;
            });
        }
    }
}

@NgModule({
    imports: [AutoFocus],
    exports: [AutoFocus],
})
export class AutoFocusModule {}
