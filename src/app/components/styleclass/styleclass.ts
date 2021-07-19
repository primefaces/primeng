import { CommonModule} from '@angular/common';
import { NgModule, Directive, ElementRef, Input, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
import { DomHandler } from 'primeng/dom';

@Directive({
    selector: '[pStyleClass]'
})
export class StyleClass implements AfterViewInit, OnDestroy {

    constructor(public el: ElementRef, public renderer: Renderer2) {}

    @Input('pStyleClass') selector: string;

    @Input() enterClass: string;

    @Input() enterActiveClass: string;

    @Input() enterToClass: string;

    @Input() leaveClass: string;

    @Input() leaveActiveClass: string;

    @Input() leaveToClass: string;

    @Input() hideOnOutsideClick: boolean;

    @Input() toggleClass: string;

    eventListener: Function;

    documentListener: Function;

    target: HTMLElement;

    enterListener: Function;

    leaveListener: Function;

    animating: boolean;

    ngAfterViewInit() {
        this.eventListener = this.renderer.listen(this.el.nativeElement, 'click', () => {
            this.target = this.resolveTarget();

            if (this.toggleClass) {
                if (DomHandler.hasClass(this.target, this.toggleClass))
                    DomHandler.removeClass(this.target, this.toggleClass);
                else
                    DomHandler.addClass(this.target, this.toggleClass);
            }
            else {
                if (this.target.offsetParent === null)
                    this.enter();
                else
                    this.leave();
            }
        });
    }

    enter() {
        if (this.enterActiveClass) {
            if (!this.animating) {
                this.animating = true;

                if (this.enterActiveClass === 'slidedown') {
                    this.target.style.height = '0px';
                    DomHandler.removeClass(this.target, 'hidden');
                    this.target.style.maxHeight = this.target.scrollHeight + 'px';
                    DomHandler.addClass(this.target, 'hidden');
                    this.target.style.height = '';
                }

                DomHandler.addClass(this.target, this.enterActiveClass);
                if (this.enterClass) {
                    DomHandler.removeClass(this.target, this.enterClass);
                }

                this.enterListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.enterActiveClass);
                    if (this.enterToClass) {
                        DomHandler.addClass(this.target, this.enterToClass);
                    }
                    this.enterListener();

                    if (this.enterActiveClass === 'slidedown') {
                        this.target.style.maxHeight = '';
                    }
                    this.animating = false;
                });
            }
        }
        else {
            if (this.enterClass) {
                DomHandler.removeClass(this.target, this.enterClass);
            }

            if (this.enterToClass) {
                DomHandler.addClass(this.target, this.enterToClass);
            }
        }

        if (this.hideOnOutsideClick) {
            this.bindDocumentListener();
        }
    }

    leave() {
        if (this.leaveActiveClass) {
            if (!this.animating) {
                this.animating = true;
                DomHandler.addClass(this.target, this.leaveActiveClass);
                if (this.leaveClass) {
                    DomHandler.removeClass(this.target, this.leaveClass);
                }

                this.leaveListener = this.renderer.listen(this.target, 'animationend', () => {
                    DomHandler.removeClass(this.target, this.leaveActiveClass);
                    if (this.leaveToClass) {
                        DomHandler.addClass(this.target, this.leaveToClass);
                    }
                    this.leaveListener();
                    this.animating = false;
                });
            }
        }
        else {
            if (this.leaveClass) {
                DomHandler.removeClass(this.target, this.leaveClass);
            }

            if (this.leaveToClass) {
                DomHandler.addClass(this.target, this.leaveToClass);
            }
        }
    }

    resolveTarget() {
        if (this.target) {
            return this.target;
        }

        switch (this.selector) {
            case '@next':
                return this.el.nativeElement.nextElementSibling;

            case '@prev':
                return this.el.nativeElement.previousElementSibling;

            case '@parent':
                return this.el.nativeElement.parentElement;

            case '@grandparent':
                return this.el.nativeElement.parentElement.parentElement;

            default:
                return document.querySelector(this.selector);
        }
    }

    bindDocumentListener() {
        if (!this.documentListener) {
            this.documentListener = this.renderer.listen(this.el.nativeElement.ownerDocument, 'click', event => {
                if (getComputedStyle(this.target).getPropertyValue('position') === 'static') {
                    this.unbindDocumentListener();
                }
                else  if (!this.el.nativeElement.isSameNode(event.target) && !this.el.nativeElement.contains(event.target) && !this.target.contains(event.target)) {
                    this.leave();
                    this.unbindDocumentListener();
                }
            });
        }
    }

    unbindDocumentListener() {
        if (this.documentListener) {
            this.documentListener();
            this.documentListener = null;
        }
    }

    ngOnDestroy() {
        this.target = null;
        if (this.eventListener) {
            this.eventListener();
        }
        this.unbindDocumentListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [StyleClass],
    declarations: [StyleClass]
})
export class StyleClassModule { }
