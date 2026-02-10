import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Directive, effect, input, NgModule } from '@angular/core';
import { createElement, focus, getFirstFocusableElement, getLastFocusableElement } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

/**
 * Focus Trap keeps focus within a certain DOM element while tabbing.
 * @group Components
 */
@Directive({
    selector: '[pFocusTrap]',
    standalone: true
})
export class FocusTrap extends BaseComponent {
    /**
     * When set as true, focus wouldn't be managed.
     * @group Props
     */
    pFocusTrapDisabled = input(false, { transform: booleanAttribute });

    firstHiddenFocusableElement!: HTMLElement;

    lastHiddenFocusableElement!: HTMLElement;

    constructor() {
        super();

        effect(() => {
            const disabled = this.pFocusTrapDisabled();
            if (isPlatformBrowser(this.platformId)) {
                if (disabled) {
                    this.removeHiddenFocusableElements();
                } else if (!this.firstHiddenFocusableElement && !this.lastHiddenFocusableElement) {
                    this.createHiddenFocusableElements();
                }
            }
        });
    }

    onInit() {
        if (isPlatformBrowser(this.platformId) && !this.pFocusTrapDisabled()) {
            !this.firstHiddenFocusableElement && !this.lastHiddenFocusableElement && this.createHiddenFocusableElements();
        }
    }

    removeHiddenFocusableElements() {
        if (this.firstHiddenFocusableElement && this.firstHiddenFocusableElement.parentNode) {
            this.firstHiddenFocusableElement.parentNode.removeChild(this.firstHiddenFocusableElement);
        }

        if (this.lastHiddenFocusableElement && this.lastHiddenFocusableElement.parentNode) {
            this.lastHiddenFocusableElement.parentNode.removeChild(this.lastHiddenFocusableElement);
        }
    }

    getComputedSelector(selector: string | null) {
        return `:not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])${selector ?? ''}`;
    }

    createHiddenFocusableElements() {
        const tabindex = '0';

        const createFocusableElement = (onFocus: (event: FocusEvent) => void) => {
            return createElement('span', {
                class: 'p-hidden-accessible p-hidden-focusable',
                tabindex,
                role: 'presentation',
                'aria-hidden': true,
                'data-p-hidden-accessible': true,
                'data-p-hidden-focusable': true,
                onFocus: onFocus?.bind(this)
            }) as HTMLElement;
        };

        this.firstHiddenFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
        this.lastHiddenFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);

        this.firstHiddenFocusableElement.setAttribute('data-pc-section', 'firstfocusableelement');
        this.lastHiddenFocusableElement.setAttribute('data-pc-section', 'lastfocusableelement');

        this.el.nativeElement.prepend(this.firstHiddenFocusableElement);
        this.el.nativeElement.append(this.lastHiddenFocusableElement);
    }

    onFirstHiddenElementFocus(event: FocusEvent) {
        const { currentTarget, relatedTarget } = event;
        const focusableElement =
            relatedTarget === this.lastHiddenFocusableElement || !this.el.nativeElement?.contains(relatedTarget as Node)
                ? getFirstFocusableElement((currentTarget as HTMLElement).parentElement!, ':not(.p-hidden-focusable)')
                : this.lastHiddenFocusableElement;

        focus(focusableElement as HTMLElement);
    }

    onLastHiddenElementFocus(event: FocusEvent) {
        const { currentTarget, relatedTarget } = event;
        const focusableElement =
            relatedTarget === this.firstHiddenFocusableElement || !this.el.nativeElement?.contains(relatedTarget as Node)
                ? getLastFocusableElement((currentTarget as HTMLElement).parentElement!, ':not(.p-hidden-focusable)')
                : this.firstHiddenFocusableElement;

        focus(focusableElement as HTMLElement);
    }
}

@NgModule({
    imports: [FocusTrap],
    exports: [FocusTrap]
})
export class FocusTrapModule {}
