import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, booleanAttribute, Directive, Input, NgModule, numberAttribute, OnInit } from '@angular/core';
import { addClass, removeClass } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

interface AnimateOnScrollOptions {
    root?: HTMLElement;
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
export class AnimateOnScroll extends BaseComponent implements OnInit, AfterViewInit {
    /**
     * Selector to define the CSS class for enter animation.
     * @group Props
     */
    @Input() enterClass: string | undefined;
    /**
     * Selector to define the CSS class for leave animation.
     * @group Props
     */
    @Input() leaveClass: string | undefined;
    /**
     * Specifies the root option of the IntersectionObserver API.
     * @group Props
     */
    @Input() root: HTMLElement | undefined | null;
    /**
     * Specifies the rootMargin option of the IntersectionObserver API.
     * @group Props
     */
    @Input() rootMargin: string | undefined;
    /**
     * Specifies the threshold option of the IntersectionObserver API
     * @group Props
     */
    @Input({ transform: numberAttribute }) threshold: number | undefined;
    /**
     * Whether the scroll event listener should be removed after initial run.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) once: boolean = true;

    observer: IntersectionObserver | undefined;

    resetObserver: any;

    isObserverActive: boolean = false;

    animationState: any;

    animationEndListener: VoidFunction | undefined;

    ngOnInit() {
        super.ngOnInit();
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', this.enterClass ? '0' : '');
        }
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (isPlatformBrowser(this.platformId)) {
            this.bindIntersectionObserver();
        }
    }

    get options(): AnimateOnScrollOptions {
        return {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold
        };
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
        }, this.options);

        setTimeout(() => this.observer.observe(this.el.nativeElement), 0);

        // Reset

        this.resetObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.boundingClientRect.top > 0 && !entry.isIntersecting) {
                    this.el.nativeElement.style.opacity = this.enterClass ? '0' : '';
                    removeClass(this.el.nativeElement, [this.enterClass, this.leaveClass]);

                    this.resetObserver.unobserve(this.el.nativeElement);
                }

                this.animationState = undefined;
            },
            { ...this.options, threshold: 0 }
        );
    }

    enter() {
        if (this.animationState !== 'enter' && this.enterClass) {
            this.el.nativeElement.style.opacity = '';
            removeClass(this.el.nativeElement, this.leaveClass);
            addClass(this.el.nativeElement, this.enterClass);

            this.once && this.unbindIntersectionObserver();

            this.bindAnimationEvents();
            this.animationState = 'enter';
        }
    }

    leave() {
        if (this.animationState !== 'leave' && this.leaveClass) {
            this.el.nativeElement.style.opacity = this.enterClass ? '0' : '';
            removeClass(this.el.nativeElement, this.enterClass);
            addClass(this.el.nativeElement, this.leaveClass);

            this.bindAnimationEvents();
            this.animationState = 'leave';
        }
    }

    bindAnimationEvents() {
        if (!this.animationEndListener) {
            this.animationEndListener = this.renderer.listen(this.el.nativeElement, 'animationend', () => {
                removeClass(this.el.nativeElement, [this.enterClass, this.leaveClass]);
                !this.once && this.resetObserver.observe(this.el.nativeElement);
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

    ngOnDestroy() {
        this.unbindAnimationEvents();
        this.unbindIntersectionObserver();

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [AnimateOnScroll],
    exports: [AnimateOnScroll]
})
export class AnimateOnScrollModule {}
