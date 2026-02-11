import { booleanAttribute, Directive, ElementRef, HostListener, inject, input, NgModule, OnDestroy, Renderer2 } from '@angular/core';
import { addClass, getTargetElement, hasClass, isElement, removeClass } from '@primeuix/utils';
import { VoidListener } from 'primeng/ts-helpers';

/**
 * StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.
 * @group Components
 */
@Directive({
    selector: '[pStyleClass]',
    standalone: true
})
export class StyleClass implements OnDestroy {
    el = inject(ElementRef);

    renderer = inject(Renderer2);

    /**
     * Selector to define the target element. Available selectors are '@next', '@prev', '@parent' and '@grandparent'.
     * @group Props
     */
    selector = input<string | undefined>(undefined, { alias: 'pStyleClass' });

    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     */
    enterFromClass = input<string>();

    /**
     * Style class to add during enter animation.
     * @group Props
     */
    enterActiveClass = input<string>();

    /**
     * Style class to add when item begins to get displayed.
     * @group Props
     */
    enterToClass = input<string>();

    /**
     * Style class to add when item begins to get hidden.
     * @group Props
     */
    leaveFromClass = input<string>();

    /**
     * Style class to add during leave animation.
     * @group Props
     */
    leaveActiveClass = input<string>();

    /**
     * Style class to add when leave animation is completed.
     * @group Props
     */
    leaveToClass = input<string>();

    /**
     * Whether to trigger leave animation when outside of the element is clicked.
     * @group Props
     */
    hideOnOutsideClick = input(undefined, { transform: booleanAttribute });

    /**
     * Adds or removes a class when no enter-leave animation is required.
     * @group Props
     */
    toggleClass = input<string>();

    /**
     * Whether to trigger leave animation when escape key pressed.
     * @group Props
     */
    hideOnEscape = input(undefined, { transform: booleanAttribute });

    /**
     * Whether to trigger leave animation when the target element resized.
     * @group Props
     */
    hideOnResize = input(undefined, { transform: booleanAttribute });

    /**
     * Target element to listen resize. Valid values are "window", "document" or target element selector.
     * @group Props
     */
    resizeSelector = input<string>();

    eventListener: VoidListener;

    documentClickListener: VoidListener;

    documentKeydownListener: VoidListener;

    windowResizeListener: VoidListener;

    resizeObserver: ResizeObserver | undefined;

    target: HTMLElement | null | undefined;

    enterListener: VoidListener;

    leaveListener: VoidListener;

    animating: boolean | undefined;

    _enterClass: string | undefined;

    _leaveClass: string | undefined;

    _resizeTarget: any;

    @HostListener('click')
    clickListener() {
        this.target ||= getTargetElement(this.selector(), this.el.nativeElement) as HTMLElement;

        if (this.toggleClass()) {
            this.toggle();
        } else {
            if ((this.target as HTMLElement)?.offsetParent === null) this.enter();
            else this.leave();
        }
    }

    toggle() {
        const toggleClass = this.toggleClass()!;
        if (hasClass(this.target!, toggleClass)) removeClass(this.target!, toggleClass);
        else addClass(this.target!, toggleClass);
    }

    enter() {
        const enterActiveClass = this.enterActiveClass();
        const enterFromClass = this.enterFromClass();
        const enterToClass = this.enterToClass();

        if (enterActiveClass) {
            if (!this.animating) {
                this.animating = true;

                if (enterActiveClass.includes('slidedown')) {
                    (this.target as HTMLElement).style.height = '0px';
                    removeClass(this.target!, enterFromClass || 'hidden');
                    (this.target as HTMLElement).style.maxHeight = (this.target as HTMLElement).scrollHeight + 'px';
                    addClass(this.target!, enterFromClass || 'hidden');
                    (this.target as HTMLElement).style.height = '';
                }

                addClass(this.target!, enterActiveClass);
                if (enterFromClass) {
                    removeClass(this.target!, enterFromClass);
                }

                this.enterListener = this.renderer.listen(this.target!, 'animationend', () => {
                    removeClass(this.target!, enterActiveClass);
                    if (enterToClass) {
                        addClass(this.target!, enterToClass);
                    }
                    this.enterListener && this.enterListener();

                    if (enterActiveClass.includes('slidedown')) {
                        (this.target as HTMLElement).style.maxHeight = '';
                    }
                    this.animating = false;
                });
            }
        } else {
            if (enterFromClass) {
                removeClass(this.target!, enterFromClass);
            }

            if (enterToClass) {
                addClass(this.target!, enterToClass);
            }
        }

        if (this.hideOnOutsideClick()) {
            this.bindDocumentClickListener();
        }

        if (this.hideOnEscape()) {
            this.bindDocumentKeydownListener();
        }

        if (this.hideOnResize()) {
            this.bindResizeListener();
        }
    }

    leave() {
        const leaveActiveClass = this.leaveActiveClass();
        const leaveFromClass = this.leaveFromClass();
        const leaveToClass = this.leaveToClass();

        if (leaveActiveClass) {
            if (!this.animating) {
                this.animating = true;
                addClass(this.target!, leaveActiveClass);
                if (leaveFromClass) {
                    removeClass(this.target!, leaveFromClass);
                }

                this.leaveListener = this.renderer.listen(this.target!, 'animationend', () => {
                    removeClass(this.target!, leaveActiveClass);
                    if (leaveToClass) {
                        addClass(this.target!, leaveToClass);
                    }
                    this.leaveListener && this.leaveListener();
                    this.animating = false;
                });
            }
        } else {
            if (leaveFromClass) {
                removeClass(this.target!, leaveFromClass);
            }

            if (leaveToClass) {
                addClass(this.target!, leaveToClass);
            }
        }

        if (this.hideOnOutsideClick()) {
            this.unbindDocumentClickListener();
        }

        if (this.hideOnEscape()) {
            this.unbindDocumentKeydownListener();
        }

        if (this.hideOnResize()) {
            this.unbindResizeListener();
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
            this.documentKeydownListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'keydown', (event) => {
                const { key, keyCode, which } = event;
                if (!this.isVisible() || getComputedStyle(this.target as HTMLElement).getPropertyValue('position') === 'static') this.unbindDocumentKeydownListener();
                if (this.isVisible() && key === 'Escape' && keyCode === 27 && which === 27) this.leave();
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

    bindResizeListener() {
        this._resizeTarget = getTargetElement(this.resizeSelector());
        if (isElement(this._resizeTarget)) {
            this.bindElementResizeListener();
        } else {
            this.bindWindowResizeListener();
        }
    }

    unbindResizeListener() {
        this.unbindWindowResizeListener();
        this.unbindElementResizeListener();
    }

    bindWindowResizeListener() {
        if (!this.windowResizeListener) {
            this.windowResizeListener = this.renderer.listen(window, 'resize', () => {
                if (!this.isVisible()) {
                    this.unbindWindowResizeListener();
                } else {
                    this.leave();
                }
            });
        }
    }

    unbindWindowResizeListener() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
    }

    bindElementResizeListener() {
        if (!this.resizeObserver && this._resizeTarget) {
            let isFirstResize = true;
            this.resizeObserver = new ResizeObserver(() => {
                if (isFirstResize) {
                    isFirstResize = false;
                    return;
                }

                if (this.isVisible()) {
                    this.leave();
                }
            });
            this.resizeObserver.observe(this._resizeTarget);
        }
    }

    unbindElementResizeListener() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = undefined;
        }
    }

    ngOnDestroy() {
        this.target = null;
        this._resizeTarget = null;

        if (this.eventListener) {
            this.eventListener();
        }
        this.unbindDocumentClickListener();
        this.unbindDocumentKeydownListener();
        this.unbindResizeListener();
    }
}

@NgModule({
    imports: [StyleClass],
    exports: [StyleClass]
})
export class StyleClassModule {}
