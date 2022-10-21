import { NgModule, Component, Input, OnDestroy, Renderer2, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Inject, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { SharedModule, PrimeNGConfig, OverlayService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { ZIndexUtils } from 'primeng/utils';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{showTransitionParams}}')]);

const hideAnimation = animation([animate('{{hideTransitionParams}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
    selector: 'p-overlay',
    template: `
        <div class="p-overlay" #overlay (click)="onOverlayClick($event)">
            <div #mask [ngClass]="{ 'p-mask p-overlay-mask p-component-overlay-enter': responsive }">
                <div
                    #content
                    [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions } }"
                    (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                    (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                >
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [useAnimation(showAnimation)]), transition(':leave', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./overlay.css'],
    host: {
        class: 'p-element'
    }
})
export class Overlay implements OnDestroy {
    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Input() container: ElementRef;

    @Input() autoZIndex: boolean;

    @Output() onAnimationStart: EventEmitter<any> = new EventEmitter();

    @Output() onAnimationEnd: EventEmitter<any> = new EventEmitter();

    @Output() onOverlayHide: EventEmitter<any> = new EventEmitter();

    @ViewChild('overlay') overlayViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    @ViewChild('mask') maskViewChild: ElementRef;

    @Input() set overlayDirection(value: string) {
        if (value && this.viewport.width < this.overlayBreakpoints) {
            this._overlayDirection = value;

            switch (value) {
                case 'start':
                    this.transformOptions = 'translate3d(0px, -100%, 0px)';
                    break;
                case 'end':
                    this.transformOptions = 'translate3d(0px, 100%, 0px)';
                    break;
                case 'center':
                    this.transformOptions = 'scale(0.8)';
                    break;
            }
        } else {
            this.transformOptions = 'scaleY(0.8)';
        }
    }

    get overlayDirection(): string {
        return this._overlayDirection;
    }

    @Input() set appendTo(val) {
        this._appendTo = val;
    }

    get appendTo(): any {
        return this._appendTo;
    }

    @Input() set visible(value: boolean) {
        this._visible = value;
    }

    get visible(): boolean {
        return this._visible;
    }

    get overlayBreakpoints(): any {
        return this.config.overlayOptions ? this.config.overlayOptions.breakpoint : null;
    }

    get viewport(): any {
        this._viewport = DomHandler.getViewport();
        return this._viewport;
    }

    _visible: boolean;

    _overlayDirection: string;

    _viewport: any;

    _overlayBreakpoints: number;

    _appendTo: any;

    transformOptions: string = 'scaleY(0.8)';

    documentResizeListener: any;

    responsive: boolean;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, private config: PrimeNGConfig, public overlayService: OverlayService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.bindDocumentResizeListener();
    }

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    onOverlayAnimationStart(event) {
        this.onAnimationStart.emit(event);
    }

    onOverlayAnimationEnd(event) {
        if (event.toState === 'void') {
            this.destroyOverlay();
        }
        this.onAnimationEnd.emit(event);
    }

    appendOverlay() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.el.nativeElement, this.baseZIndex + this.config.zIndex.modal);
        }
        if (this.viewport.width < this.overlayBreakpoints) {
            this.responsive = true;
            DomHandler.addClass(this.document.body, 'p-overflow-hidden');
            DomHandler.addClass(this.overlayViewChild.nativeElement, 'p-overlay-responsive');
            DomHandler.addClass(this.contentViewChild.nativeElement.firstChild, 'p-overlay-panel-static');
        } else {
            this.responsive = false;
            if (this.appendTo) {
                if (this.appendTo === 'body') {
                    this.document.body.appendChild(this.overlayViewChild.nativeElement);
                } else {
                    DomHandler.appendChild(this.overlayViewChild.nativeElement, this.appendTo);
                }
            }
        }
        if (!this.contentViewChild.nativeElement.style.minWidth) {
            this.contentViewChild.nativeElement.style.minWidth = DomHandler.getWidth(this.container) + 'px';
        }
    }

    alignOverlay() {
        if (this.overlayViewChild) {
            if (this.viewport.width < this.overlayBreakpoints) {
                switch (this.overlayDirection) {
                    case 'start':
                        DomHandler.addClass(this.maskViewChild.nativeElement, 'p-overlay-panel-start');
                        break;

                    case 'center':
                        DomHandler.addClass(this.maskViewChild.nativeElement, 'p-overlay-panel-center');
                        break;

                    case 'end':
                        DomHandler.addClass(this.maskViewChild.nativeElement, 'p-overlay-panel-end');
                        break;
                }
            } else {
                if (this.appendTo) {
                    DomHandler.absolutePosition(this.overlayViewChild.nativeElement, this.container);
                } else {
                    DomHandler.relativePosition(this.overlayViewChild.nativeElement, this.container);
                }
            }
        }
    }

    blockScroll() {
        DomHandler.addClass(this.document.body, 'p-overflow-hidden');
    }

    unblockScroll() {
        DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        if (this.visible) {
            this.visible = false;
            this.onOverlayHide.emit({ visible: this.visible });
            this.cd.markForCheck();
        }
    }

    destroyOverlay() {
        this.unblockScroll();
        this.unbindDocumentResizeListener();

        if (this.overlayViewChild && this.overlayViewChild.nativeElement) {
            ZIndexUtils.clear(this.el.nativeElement);
            this.overlayViewChild = null;
        }

        this.onOverlayHide.emit({ visible: this.visible });
    }

    ngOnDestroy() {
        this.destroyOverlay();
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, SharedModule],
    exports: [Overlay, SharedModule],
    declarations: [Overlay]
})
export class OverlayModule {}
