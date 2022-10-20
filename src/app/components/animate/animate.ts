import { NgModule, Directive, ElementRef, Input, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomHandler } from '../dom/domhandler';

@Directive({
    selector: '[pAnimate]',
    host: {
        '[class.p-animate]': 'true'
    }
})
export class Animate {

    @Input('parent') parentElement: any;

    @Input() enterClass: string;

    @Input() leaveClass: string;

    documentScrollListener: Function | null = null;

    loadListener: Function = () => { };

    entered: boolean;

    observer: IntersectionObserver;

    loaded: boolean;

    scroll: boolean;

    constructor(@Inject(DOCUMENT) private document: Document, private host: ElementRef, public el: ElementRef, public renderer: Renderer2) { }

    ngOnInit() {
        if (this.isImage()) {
            if (this.isInViewport()) {
                this.enter();
            }
            this.bindLoadListener();
        }
    }

    constructIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            treshold: 1.0
        }

        this.observer = new IntersectionObserver((el) => this.isVisible(el), options);
        this.observer.observe(this.host.nativeElement);
    }

    isVisible(element) {
        const [intersectionObserverEntry] = element;
        this.entered = intersectionObserverEntry.isIntersecting;

        if (this.entered || this.isInViewport()) {
            this.blockOverflow();
        }
        if (!this.scroll && !this.isInViewport()) {
            this.unblockOverflow();
        }
    }

    isInViewport() {
        let rect = this.host.nativeElement.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= ((window.innerHeight + rect.height) || this.document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || this.document.documentElement.clientWidth)
        );
    }

    isImage(): boolean {
        return this.el.nativeElement.tagName === 'IMG';
    }

    animate() {
        if (this.loaded) {
            if (this.isInViewport() && !this.entered) {
                this.enter();
            }

            if (this.isInViewport() && this.entered) {
                this.enter();
            }

            if (!this.isInViewport() && !this.entered) {
                this.leave();
            }
        }
    }

    enter() {
        this.host.nativeElement.style.visibility = 'visible';
        DomHandler.addClass(this.host.nativeElement, this.enterClass);
    }

    leave() {
        this.host.nativeElement.style.visibility = 'hidden';
        if (this.leaveClass) {
            DomHandler.addClass(this.host.nativeElement, this.leaveClass);
        }
        DomHandler.removeClass(this.host.nativeElement, this.enterClass);
    }

    blockOverflow() {
        if (this.parentElement.nativeElement) {
            DomHandler.addClass(this.parentElement.nativeElement, 'overflow-x-hidden');
        }
        if (!this.parentElement.nativeElement && this.parentElement) {
            DomHandler.addClass(this.parentElement, 'overflow-x-hidden');
        }
    }

    unblockOverflow() {
        if (this.parentElement.nativeElement) {
            DomHandler.removeClass(this.parentElement.nativeElement, 'overflow-x-hidden');
        }
        if (!this.parentElement.nativeElement && this.parentElement) {
            DomHandler.removeClass(this.parentElement, 'overflow-x-hidden');
        }
    }

    bindDocumentScrollListener() {
        if (!this.documentScrollListener) {
            this.documentScrollListener = this.renderer.listen(window, 'scroll', () => {
                this.scroll = true;
                if (!this.observer) {
                    this.constructIntersectionObserver();
                }
                this.animate();
            })
        }
    }

    unbindDocumentScrollListener() {
        if (this.documentScrollListener) {
            this.scroll = false;
            this.documentScrollListener();
            this.documentScrollListener = null;
        }
    }

    bindLoadListener() {
        this.loadListener = this.renderer.listen(this.el.nativeElement, 'load', () => {
            if (!this.loaded) {
                this.animate();
            }
            if (!this.documentScrollListener) {
                this.bindDocumentScrollListener();
            }
            this.loaded = true;
        });
    }

    unbindLoadListener() {
        if (this.loadListener) {
            this.loadListener();
            this.loadListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentScrollListener();
        this.unbindLoadListener();
        this.unblockOverflow();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Animate],
    declarations: [Animate]
})
export class AnimateModule { }
