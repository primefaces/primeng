import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
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
    host: {
        class: 'p-ripple p-element'
    }
})
export class Ripple implements AfterViewInit, OnDestroy {
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public el: ElementRef, public zone: NgZone, @Optional() public config: PrimeNGConfig) {}

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

        DomHandler.removeClass(ink, 'p-ink-active');
        if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
            let d = Math.max(DomHandler.getOuterWidth(this.el.nativeElement), DomHandler.getOuterHeight(this.el.nativeElement));
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }

        let offset = DomHandler.getOffset(this.el.nativeElement);
        let x = event.pageX - offset.left + this.document.body.scrollTop - DomHandler.getWidth(ink) / 2;
        let y = event.pageY - offset.top + this.document.body.scrollLeft - DomHandler.getHeight(ink) / 2;

        this.renderer.setStyle(ink, 'top', y + 'px');
        this.renderer.setStyle(ink, 'left', x + 'px');
        DomHandler.addClass(ink, 'p-ink-active');

        this.timeout = setTimeout(() => {
            let ink = this.getInk();
            if (ink) {
                DomHandler.removeClass(ink, 'p-ink-active');
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
            DomHandler.removeClass(ink, 'p-ink-active');
        }
    }

    onAnimationEnd(event: Event) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    }

    create() {
        let ink = this.renderer.createElement('span');
        this.renderer.addClass(ink, 'p-ink');
        this.renderer.appendChild(this.el.nativeElement, ink);

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

            DomHandler.removeElement(ink);
        }
    }

    ngOnDestroy() {
        if (this.config && this.config.ripple) {
            this.remove();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Ripple],
    declarations: [Ripple]
})
export class RippleModule {}
