import { CommonModule } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Input, NgModule, OnInit, Renderer2 } from '@angular/core';
import { DomHandler } from '@alamote/primeng/dom';
/**
 * Animate manages PrimeFlex CSS classes declaratively to during enter/leave animations on scroll or on page load.
 * @group Components
 */
@Directive({
    selector: '[pAnimate]',
    host: {
        '[class.p-animate]': 'true'
    }
})
export class Animate implements OnInit, AfterViewInit {
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

    observer: IntersectionObserver | undefined;

    timeout: any;

    constructor(private host: ElementRef, public el: ElementRef, public renderer: Renderer2) {}

    ngOnInit() {
        console.log('pAnimate directive is deprecated in 16.7.0 and will be removed in the future. Use pAnimateOnScroll directive instead');
    }

    ngAfterViewInit() {
        this.bindIntersectionObserver();
    }

    bindIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        this.observer = new IntersectionObserver((el) => this.isVisible(el), options);
        this.observer.observe(this.host.nativeElement);
    }

    isVisible(element: IntersectionObserverEntry[]) {
        const [intersectionObserverEntry] = element;
        intersectionObserverEntry.isIntersecting ? this.enter() : this.leave();
    }

    enter() {
        this.host.nativeElement.style.visibility = 'visible';
        DomHandler.addClass(this.host.nativeElement, this.enterClass as string);
    }

    leave() {
        DomHandler.removeClass(this.host.nativeElement, this.enterClass as string);
        if (this.leaveClass) {
            DomHandler.addClass(this.host.nativeElement, this.leaveClass);
        }

        const animationDuration = this.host.nativeElement.style.animationDuration || 500;

        this.timeout = setTimeout(() => {
            this.host.nativeElement.style.visibility = 'hidden';
        }, animationDuration);
    }

    unbindIntersectionObserver() {
        if (this.observer) {
            this.observer.unobserve(this.host.nativeElement);
        }
    }

    ngOnDestroy() {
        this.unbindIntersectionObserver();
        clearTimeout(this.timeout);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Animate],
    declarations: [Animate]
})
export class AnimateModule {}
