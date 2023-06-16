import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, NgModule, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { VoidListener } from 'primeng/ts-helpers';
/**
 * StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.
 * @group Components
 */
@Directive({
    selector: '[pStyleClass]',
    host: {
        class: 'p-element'
    }
})
export class StyleClass implements OnDestroy {
    constructor(public el: ElementRef, public renderer: Renderer2, private zone: NgZone) {}
    /**
     * Selector to define the target element. Available selectors are '@next', '@prev', '@parent' and '@grandparent'.
     * @group Props
     */
    @Input('pStyleClass') selector: string | undefined;
    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     */
    @Input() enterClass: string | undefined;
    /**
     * Style class to add during enter animation.
     * @group Props
     */
    @Input() enterActiveClass: string | undefined;
    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     */
    @Input() enterToClass: string | undefined;
    /**
     * Style class to add when item begins to get hidden.
     * @group Props
     */
    @Input() leaveClass: string | undefined;
    /**
     * Style class to add during leave animation.
     * @group Props
     */
    @Input() leaveActiveClass: string | undefined;
    /**
     * Style class to add when leave animation is completed.
     * @group Props
     */
    @Input() leaveToClass: string | undefined;
    /**
     * Whether to trigger leave animation when outside of the element is clicked.
     * @group Props
     */
    @Input() hideOnOutsideClick: boolean | undefined;
    /**
     * Adds or removes a class when no enter-leave animation is required.
     * @group Props
     */
    @Input() toggleClass: string | undefined;
    /**
     * Whether to trigger leave animation when escape key pressed.
     * @group Props
     */
    @Input() hideOnEscape: boolean | undefined;

    eventListener: VoidListener;

    documentClickListener: VoidListener;

    documentKeydownListener: VoidListener;

    target: HTMLElement | null | undefined;

    enterListener: VoidListener;

    leaveListener: VoidListener;

    animating: boolean | undefined;

    @HostListener('click', ['$event'])
    clickListener() {
        this.target = this.resolveTarget();

        if (this.toggleClass) {
            this.toggle();
        } else {
            if ((this.target as HTMLElement).offsetParent === null) this.enter();
            else this.leave();
        }
    }

    toggle() {
        if (DomHandler.hasClass(this.target, this.toggleClass as string)) DomHandler.removeClass(this.target, this.toggleClass as string);
        else DomHandler.addClass(this.target, this.toggleClass as string);
    }

    enter() {
        if (this.enterActiveClass) {
            if (!this.animating) {
                this.animating = true;

                if (this.enterActiveClass === 'slidedown') {
                    (this.target as HTMLElement).style.height = '0px';
                    DomHandler.removeClass(this.target, 'hidden');
                    (this.target as HTMLElement).style.maxHeight = (this.target as HTMLElement).scrollHeight + 'px';
                    DomHandler.addClass(this.target, 'hidden');
                    (this.target as HTMLElement).style.height = '';
                }

                DomHandler.addClass(this.target, this.enterActiveClass);
                if (this.enterClass) {
                    DomHandler.removeClass(this.target, this.enterClass);
                }

                this.enterListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.enterActiveClass as string);
                    if (this.enterToClass) {
                        DomHandler.addClass(this.target, this.enterToClass);
                    }
                    this.enterListener && this.enterListener();

                    if (this.enterActiveClass === 'slidedown') {
                        (this.target as HTMLElement).style.maxHeight = '';
                    }
                    this.animating = false;
                });
            }
        } else {
            if (this.enterClass) {
                DomHandler.removeClass(this.target, this.enterClass);
            }

            if (this.enterToClass) {
                DomHandler.addClass(this.target, this.enterToClass);
            }
        }

        if (this.hideOnOutsideClick) {
            this.bindDocumentClickListener();
        }

        if (this.hideOnEscape) {
            this.bindDocumentKeydownListener();
        }
    }

    leave() {
        if (this.leaveActiveClass) {
            if (!this.animating) {
                this.animating = true;
                DomHandler.addClass(this.target, this.leaveActiveClass);
                if (this.leaveClass) {
                    DomHandler.removeClass(this.target, this.leaveClass);
                }

                this.leaveListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.leaveActiveClass as string);
                    if (this.leaveToClass) {
                        DomHandler.addClass(this.target, this.leaveToClass);
                    }
                    this.leaveListener && this.leaveListener();
                    this.animating = false;
                });
            }
        } else {
            if (this.leaveClass) {
                DomHandler.removeClass(this.target, this.leaveClass);
            }

            if (this.leaveToClass) {
                DomHandler.addClass(this.target, this.leaveToClass);
            }
        }

        if (this.hideOnOutsideClick) {
            this.unbindDocumentClickListener();
        }

        if (this.hideOnEscape) {
            this.unbindDocumentKeydownListener();
        }
    }

    resolveTarget() {
        if (this.target) {
            return this.target;
        }

        switch (this.selector) {
            case '@next':
                return this.el.nativeElement.nextElementSibling;

            case '@prev':
                return this.el.nativeElement.previousElementSibling;

            case '@parent':
                return this.el.nativeElement.parentElement;

            case '@grandparent':
                return this.el.nativeElement.parentElement.parentElement;

            default:
                return document.querySelector(this.selector as string);
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'click', (event) => {
                if (!this.isVisible() || getComputedStyle(this.target as HTMLElement).getPropertyValue('position') === 'static') this.unbindDocumentClickListener();
                else if (this.isOutsideClick(event)) this.leave();
            });
        }
    }

    bindDocumentKeydownListener() {
        if (!this.documentKeydownListener) {
            this.zone.runOutsideAngular(() => {
                this.documentKeydownListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'keydown', (event) => {
                    const { key, keyCode, which, type } = event;
                    if (!this.isVisible() || getComputedStyle(this.target as HTMLElement).getPropertyValue('position') === 'static') this.unbindDocumentKeydownListener();
                    if (this.isVisible() && key === 'Escape' && keyCode === 27 && which === 27) this.leave();
                });
            });
        }
    }

    isVisible() {
        return (this.target as HTMLElement).offsetParent !== null;
    }

    isOutsideClick(event: MouseEvent) {
        return !this.el.nativeElement.isSameNode(event.target) && !this.el.nativeElement.contains(event.target) && !(this.target as HTMLElement).contains(<HTMLElement>event.target);
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    unbindDocumentKeydownListener() {
        if (this.documentKeydownListener) {
            this.documentKeydownListener();
            this.documentKeydownListener = null;
        }
    }

    ngOnDestroy() {
        this.target = null;
        if (this.eventListener) {
            this.eventListener();
        }
        this.unbindDocumentClickListener();
        this.unbindDocumentKeydownListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [StyleClass],
    declarations: [StyleClass]
})
export class StyleClassModule {}
