import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Directive, ElementRef, inject, input, NgModule } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';

/**
 * AutoFocus manages focus on focusable element on load.
 * @group Components
 */
@Directive({
    selector: '[pAutoFocus]',
    standalone: true
})
export class AutoFocus extends BaseComponent {
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { alias: 'pAutoFocus', transform: booleanAttribute });

    focused: boolean = false;

    host: ElementRef = inject(ElementRef);

    onAfterContentChecked() {
        // This sets the `attr.autofocus` which is different than the Input `autofocus` attribute.
        if (this.autofocus() === false) {
            this.host.nativeElement.removeAttribute('autofocus');
        } else {
            this.host.nativeElement.setAttribute('autofocus', true);
        }

        if (!this.focused) {
            this.autoFocus();
        }
    }

    onAfterViewChecked() {
        if (!this.focused) {
            this.autoFocus();
        }
    }

    autoFocus() {
        if (isPlatformBrowser(this.platformId) && this.autofocus()) {
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
    exports: [AutoFocus]
})
export class AutoFocusModule {}
