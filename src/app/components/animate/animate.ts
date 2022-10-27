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

    @Input() enterClass: string;

    @Input() leaveClass: string;

    documentScrollListener: Function | null = null;

    loadListener: Function = () => { };

    entered: boolean;

    observer: IntersectionObserver;

    loaded: boolean;

    constructor(@Inject(DOCUMENT) private document: Document, private host: ElementRef, public el: ElementRef, public renderer: Renderer2) { }

    ngOnInit() {
        if (this.isInViewport()) {
            this.enter();
        }
        this.bindLoadListener();
    }

    constructIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        }

        this.observer = new IntersectionObserver(el => this.isVisible(el), options);
        this.observer.observe(this.host.nativeElement);
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

    isVisible(element) {
        const [intersectionObserverEntry] = element
        this.entered = intersectionObserverEntry.isIntersecting;
    }

    animate() {
        if (this.loaded) {
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
        DomHandler.removeClass(this.host.nativeElement, this.enterClass);
        this.host.nativeElement.style.visibility = 'hidden';
    }

    bindDocumentScrollListener() {
        if (!this.documentScrollListener) {
            this.documentScrollListener = this.renderer.listen(window, 'scroll', () => {
                if (!this.observer) {
                    this.constructIntersectionObserver();
                }
                this.animate();
            })
        }
    }

    unbindDocumentScrollListener() {
        if (this.documentScrollListener) {
            this.documentScrollListener();
            this.documentScrollListener = null;
        }
    }

    bindLoadListener() {
        this.loadListener = this.renderer.listen(window, 'load', () => {
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
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Animate],
    declarations: [Animate]
})
export class AnimateModule { }
