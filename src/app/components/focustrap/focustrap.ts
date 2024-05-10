import { DomHandler } from 'primeng/dom';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Input, NgModule, inject, booleanAttribute, PLATFORM_ID } from '@angular/core';

/**
 * Focus Trap keeps focus within a certain DOM element while tabbing.
 * @group Components
 */
@Directive({
    selector: '[pFocusTrap]',
    host: {
        class: 'p-element'
    }
})
export class FocusTrap {
    /**
     * When set as true, focus wouldn't be managed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) pFocusTrapDisabled: boolean = false;

    platformId = inject(PLATFORM_ID);

    host: ElementRef = inject(ElementRef);

    document: Document = inject(DOCUMENT);

    firstHiddenFocusableElement!: HTMLElement;

    lastHiddenFocusableElement!: HTMLElement;

    ngOnInit() {
        if (isPlatformBrowser(this.platformId) && !this.pFocusTrapDisabled) {
            this.createHiddenFocusableElements();
        }
    }

    getComputedSelector(selector) {
        return `:not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])${selector ?? ''}`;
    }

    createHiddenFocusableElements() {
        const tabindex = '0';

        const createFocusableElement = (onFocus) => {
            return DomHandler.createElement('span', {
                class: 'p-hidden-accessible p-hidden-focusable',
                tabindex,
                role: 'presentation',
                'aria-hidden': true,
                'data-p-hidden-accessible': true,
                'data-p-hidden-focusable': true,
                onFocus: onFocus?.bind(this)
            });
        };

        this.firstHiddenFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
        this.lastHiddenFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);

        this.firstHiddenFocusableElement.setAttribute('data-pc-section', 'firstfocusableelement');
        this.lastHiddenFocusableElement.setAttribute('data-pc-section', 'lastfocusableelement');

        this.host.nativeElement.prepend(this.firstHiddenFocusableElement);
        this.host.nativeElement.append(this.lastHiddenFocusableElement);
    }

    onFirstHiddenElementFocus(event) {
        const { currentTarget, relatedTarget } = event;
        const focusableElement =
            relatedTarget === this.lastHiddenFocusableElement || !this.host.nativeElement?.contains(relatedTarget) ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, ':not(.p-hidden-focusable)') : this.lastHiddenFocusableElement;

        DomHandler.focus(focusableElement);
    }

    onLastHiddenElementFocus(event) {
        const { currentTarget, relatedTarget } = event;
        const focusableElement =
            relatedTarget === this.firstHiddenFocusableElement || !this.host.nativeElement?.contains(relatedTarget) ? DomHandler.getLastFocusableElement(currentTarget.parentElement, ':not(.p-hidden-focusable)') : this.firstHiddenFocusableElement;

        DomHandler.focus(focusableElement);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [FocusTrap],
    declarations: [FocusTrap]
})
export class FocusTrapModule {}
