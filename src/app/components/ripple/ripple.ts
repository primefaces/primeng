import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, NgModule, NgZone, OnDestroy, Optional, PLATFORM_ID, Renderer2 } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { VoidListener } from 'primeng/ts-helpers';
/**
 * Ripple directive adds ripple effect to the host element.
 * @group Components
 */
@Directive({
    selector: '[pRipple]',
    standalone: true,
    host: {
        class: 'p-ripple p-element'
    }
})
export class Ripple implements AfterViewInit, OnDestroy {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        public el: ElementRef,
        public zone: NgZone,
        @Optional() public config: PrimeNGConfig,
        private domHandler: DomHandler
    ) {}

    animationListener: VoidListener;

    mouseDownListener: VoidListener;

    timeout: any;

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.config && this.config.ripple) {
                this.zone.runOutsideAngular(() => {
                    this.create();
                    this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
                });
            }
        }
    }

    onMouseDown(event: MouseEvent) {
        let ink = this.getInk();
        if (!ink || this.document.defaultView?.getComputedStyle(ink, null).display === 'none') {
            return;
        }

        this.domHandler.removeClass(ink, 'p-ink-active');
        if (!this.domHandler.getHeight(ink) && !this.domHandler.getWidth(ink)) {
            let d = Math.max(this.domHandler.getOuterWidth(this.el.nativeElement), this.domHandler.getOuterHeight(this.el.nativeElement));
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }

        let offset = this.domHandler.getOffset(this.el.nativeElement);
        let x = this.domHandler.getPageX(event) - offset.left + this.document.body.scrollTop - this.domHandler.getWidth(ink) / 2;
        let y = event.pageY - offset.top + this.domHandler.getScrollLeft(this.document.body) - this.domHandler.getHeight(ink) / 2;

        this.renderer.setStyle(ink, 'top', y + 'px');
        this.renderer.setStyle(ink, 'inset-inline-start', x + 'px');
        this.domHandler.addClass(ink, 'p-ink-active');

        this.timeout = setTimeout(() => {
            let ink = this.getInk();
            if (ink) {
                this.domHandler.removeClass(ink, 'p-ink-active');
            }
        }, 401);
    }

    getInk() {
        const children = this.el.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            if (typeof children[i].className === 'string' && children[i].className.indexOf('p-ink') !== -1) {
                return children[i];
            }
        }
        return null;
    }

    resetInk() {
        let ink = this.getInk();
        if (ink) {
            this.domHandler.removeClass(ink, 'p-ink-active');
        }
    }

    onAnimationEnd(event: Event) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.domHandler.removeClass(event.currentTarget, 'p-ink-active');
    }

    create() {
        let ink = this.renderer.createElement('span');
        this.renderer.addClass(ink, 'p-ink');
        this.renderer.appendChild(this.el.nativeElement, ink);
        this.renderer.setAttribute(ink, 'aria-hidden', 'true');
        this.renderer.setAttribute(ink, 'role', 'presentation');

        if (!this.animationListener) {
            this.animationListener = this.renderer.listen(ink, 'animationend', this.onAnimationEnd.bind(this));
        }
    }

    remove() {
        let ink = this.getInk();
        if (ink) {
            this.mouseDownListener && this.mouseDownListener();
            this.animationListener && this.animationListener();
            this.mouseDownListener = null;
            this.animationListener = null;

            this.domHandler.removeElement(ink);
        }
    }

    ngOnDestroy() {
        if (this.config && this.config.ripple) {
            this.remove();
        }
    }
}

@NgModule({
    imports: [Ripple],
    exports: [Ripple]
})
export class RippleModule {}
