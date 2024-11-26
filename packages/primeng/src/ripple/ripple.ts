import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, effect, inject, NgModule, NgZone, OnDestroy } from '@angular/core';
import { addClass, getHeight, getOffset, getOuterHeight, getOuterWidth, getWidth, removeClass, remove as utils_remove } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { VoidListener } from 'primeng/ts-helpers';
import { RippleStyle } from './style/ripplestyle';

/**
 * Ripple directive adds ripple effect to the host element.
 * @group Components
 */
@Directive({
    selector: '[pRipple]',
    host: {
        class: 'p-ripple'
    },
    standalone: true,
    providers: [RippleStyle]
})
export class Ripple extends BaseComponent implements AfterViewInit, OnDestroy {
    zone: NgZone = inject(NgZone);

    _componentStyle = inject(RippleStyle);

    animationListener: VoidListener;

    mouseDownListener: VoidListener;

    timeout: any;

    constructor() {
        super();
        effect(() => {
            if (isPlatformBrowser(this.platformId) && this.config.ripple()) {
                if (this.config.ripple()) {
                    this.zone.runOutsideAngular(() => {
                        this.create();
                        this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
                    });
                }
            }
        });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    onMouseDown(event: MouseEvent) {
        let ink = this.getInk();
        if (!ink || this.document.defaultView?.getComputedStyle(ink, null).display === 'none') {
            return;
        }

        removeClass(ink, 'p-ink-active');
        if (!getHeight(ink) && !getWidth(ink)) {
            let d = Math.max(getOuterWidth(this.el.nativeElement), getOuterHeight(this.el.nativeElement));
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }

        let offset = <any>getOffset(this.el.nativeElement);
        let x = event.pageX - offset.left + this.document.body.scrollTop - getWidth(ink) / 2;
        let y = event.pageY - offset.top + this.document.body.scrollLeft - getHeight(ink) / 2;

        this.renderer.setStyle(ink, 'top', y + 'px');
        this.renderer.setStyle(ink, 'left', x + 'px');
        addClass(ink, 'p-ink-active');

        this.timeout = setTimeout(() => {
            let ink = this.getInk();
            if (ink) {
                removeClass(ink, 'p-ink-active');
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
            removeClass(ink, 'p-ink-active');
        }
    }

    onAnimationEnd(event: Event) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        removeClass(event.currentTarget as any, 'p-ink-active');
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

            utils_remove(ink);
        }
    }

    ngOnDestroy() {
        if (this.config && this.config.ripple()) {
            this.remove();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Ripple],
    exports: [Ripple]
})
export class RippleModule {}
