import { NgModule, Directive, AfterViewInit, ElementRef, NgZone, OnDestroy, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeNGConfig } from 'primeng/api';

@Directive({
    selector: '[pRipple]',
    host: {
        '[class.p-ripple]': 'true'
    }
})
export class Ripple implements AfterViewInit, OnDestroy {

    constructor(public el: ElementRef, public zone: NgZone, @Optional() public config: PrimeNGConfig) { }

    animationListener: any;

    mouseDownListener: any;

    ngAfterViewInit() {
        if (this.config && this.config.ripple) {
            this.zone.runOutsideAngular(() => {
                this.create();
    
                this.mouseDownListener = this.onMouseDown.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
            });
        }
    }

    onMouseDown(event: MouseEvent) {
        let ink = this.getInk();
        if (!ink || getComputedStyle(ink, null).display === 'none') {
            return;
        }
    
        DomHandler.removeClass(ink, 'p-ink-active');
        if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
            let d = Math.max(DomHandler.getOuterWidth(this.el.nativeElement), DomHandler.getOuterHeight(this.el.nativeElement));
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }
    
        let offset = DomHandler.getOffset(this.el.nativeElement);
        let x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
        let y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
    
        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        DomHandler.addClass(ink, 'p-ink-active');
    }
    
    getInk() {
        for (let i = 0; i < this.el.nativeElement.children.length; i++) {
            if (this.el.nativeElement.children[i].className.indexOf('p-ink') !== -1) {
                return this.el.nativeElement.children[i];
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

    onAnimationEnd(event) {
        DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    }

    create() {
        let ink = document.createElement('span');
        ink.className = 'p-ink';
        this.el.nativeElement.appendChild(ink);
    
        this.animationListener = this.onAnimationEnd.bind(this);
        ink.addEventListener('animationend', this.animationListener);
    }

    remove() {
        let ink = this.getInk();
        if (ink) {
            this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
            ink.removeEventListener('animationend', this.animationListener);
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
export class RippleModule { }
