import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, computed, Directive, input, NgModule, numberAttribute } from '@angular/core';
import { addClass, removeClass } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

interface AnimateOnScrollOptions {
    root?: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
}

/**
 * AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.
 * @group Components
 */
@Directive({
    selector: '[pAnimateOnScroll]',
    standalone: true,
    host: {
        '[class.p-animateonscroll]': 'true'
    }
})
export class AnimateOnScroll extends BaseComponent {
    /**
     * Selector to define the CSS class for enter animation.
     * @group Props
     */
    enterClass = input<string>();

    /**
     * Selector to define the CSS class for leave animation.
     * @group Props
     */
    leaveClass = input<string>();

    /**
     * Specifies the root option of the IntersectionObserver API.
     * @group Props
     */
    root = input<HTMLElement | null>();

    /**
     * Specifies the rootMargin option of the IntersectionObserver API.
     * @group Props
     */
    rootMargin = input<string>();

    /**
     * Specifies the threshold option of the IntersectionObserver API
     * @group Props
     */
    threshold = input(0.5, { transform: numberAttribute });

    /**
     * Whether the scroll event listener should be removed after initial run.
     * @group Props
     */
    once = input(false, { transform: booleanAttribute });

    observer: IntersectionObserver | undefined;

    resetObserver: IntersectionObserver | undefined;

    isObserverActive: boolean = false;

    animationState: 'enter' | 'leave' | undefined;

    animationEndListener: VoidFunction | null | undefined;

    options = computed<AnimateOnScrollOptions>(() => ({
        root: this.root(),
        rootMargin: this.rootMargin(),
        threshold: this.threshold() || 0.5
    }));

    onInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', this.enterClass() ? '0' : '');
        }
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.bindIntersectionObserver();
        }
    }

    bindIntersectionObserver() {
        this.observer = new IntersectionObserver(([entry]) => {
            if (this.isObserverActive) {
                if (entry.boundingClientRect.top > 0) {
                    entry.isIntersecting ? this.enter() : this.leave();
                }
            } else if (entry.isIntersecting) {
                this.enter();
            }

            this.isObserverActive = true;
        }, this.options());

        setTimeout(() => this.observer?.observe(this.el.nativeElement), 0);

        // Reset

        this.resetObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                    this.el.nativeElement.style.opacity = this.enterClass() ? '0' : '';
                    removeClass(this.el.nativeElement, [this.enterClass(), this.leaveClass()]);

                    this.resetObserver?.unobserve(this.el.nativeElement);
                }

                this.animationState = undefined;
            },
            { ...this.options(), threshold: 0 }
        );
    }

    enter() {
        const enterClass = this.enterClass();
        if (this.animationState !== 'enter' && enterClass) {
            this.el.nativeElement.style.opacity = '';
            removeClass(this.el.nativeElement, this.leaveClass());
            addClass(this.el.nativeElement, enterClass);

            this.once() && this.unbindIntersectionObserver();

            this.bindAnimationEvents();
            this.animationState = 'enter';
        }
    }

    leave() {
        const leaveClass = this.leaveClass();
        if (this.animationState !== 'leave' && leaveClass) {
            this.el.nativeElement.style.opacity = this.enterClass() ? '0' : '';
            removeClass(this.el.nativeElement, this.enterClass());
            addClass(this.el.nativeElement, leaveClass);

            this.bindAnimationEvents();
            this.animationState = 'leave';
        }
    }

    bindAnimationEvents() {
        if (!this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.el.nativeElement, 'animationend', () => {
                removeClass(this.el.nativeElement, [this.enterClass(), this.leaveClass()]);
                !this.once() && this.resetObserver?.observe(this.el.nativeElement);
                this.unbindAnimationEvents();
            });
        }
    }

    unbindAnimationEvents() {
        if (this.animationEndListener) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    unbindIntersectionObserver() {
        this.observer?.unobserve(this.el.nativeElement);
        this.resetObserver?.unobserve(this.el.nativeElement);
        this.isObserverActive = false;
    }

    onDestroy() {
        this.unbindAnimationEvents();
        this.unbindIntersectionObserver();
    }
}

@NgModule({
    imports: [AnimateOnScroll],
    exports: [AnimateOnScroll]
})
export class AnimateOnScrollModule {}
