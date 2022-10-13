import {NgModule,Component,Input,OnDestroy,Renderer2,ElementRef,ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {SharedModule, PrimeNGConfig, OverlayService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {trigger,style,transition,animate, animation, useAnimation} from '@angular/animations';
import {ZIndexUtils} from 'primeng/utils';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 1 }),
    animate('{{showTransitionParams}}')
]);

const hideAnimation = animation([
    animate('{{hideTransitionParams}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
    selector: 'p-overlay',
    template: `
    <div #overlay [ngClass]="panelClass" [class]="panelStyleClass" [ngStyle]="panelStyle" [@overlayAnimation]="{value: 'visible', params: {transform: transformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (click)="onOverlayClick($event)" (click)="onOverlayClick($event)">
        <ng-content></ng-content>
    </div>

    `,
    animations: [
        trigger('overlayAnimation', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./overlay.css'],
    host: {
        'class': 'p-element',
        '[class.p-overlay-panel]': 'true'
    }
})
export class Overlay implements OnDestroy {

    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';
    
    @Input() panelClass: string;
    
    @Input() panelStyleClass: string;

    @Input() overlayAnimation: string;

    @Input() container: ElementRef;

    @Input() autoZIndex: boolean;

    @Input() panelStyle: string;
    
    get overlayDirection(): string {
        return this._overlayDirection;
    }

    @Input() set overlayDirection(value: string) {
        const viewport = DomHandler.getViewport();
        if (value && viewport.width < this.overlayBreakpoints) {
            this._overlayDirection = value;
            switch (value) {
                case 'start':
                    this.transformOptions = "translate3d(0px, -100%, 0px)";
                break;
                case 'end':
                    this.transformOptions = "translate3d(0px, 100%, 0px)";
                break;
                case 'center': 
                    this.transformOptions = "scale(0.8)";
                break;
            }
        } 
        else {
            this.transformOptions = "scaleY(0.8)";
        }
    }

    @Input() set appendTo(val) {
        this._appendTo = val;
    }

    get appendTo(): any {
        return this._appendTo;
    }

    get overlayBreakpoints() {
        return this.config.overlayOptions ? this.config.overlayOptions.breakpoint : null;
    }

    @ViewChild('overlay') overlayViewChild: ElementRef;

    _overlayDirection: string;

    _overlayBreakpoints: number;

    _appendTo: any;

    transformOptions: string = "scaleY(0.8)";

    mask: HTMLDivElement;

    maskClickListener: Function;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, private config: PrimeNGConfig, public overlayService: OverlayService) {}

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    appendOverlay() {
        const viewport = DomHandler.getViewport();
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.overlayViewChild.nativeElement, this.baseZIndex + this.config.zIndex.overlay);
        }
        if (viewport.width < this.overlayBreakpoints) {
            this.appendMask();
            DomHandler.addClass(this.document.body, 'p-overflow-hidden');
            DomHandler.addClass(this.overlayViewChild.nativeElement, 'p-overlay-responsive');
            this.mask.appendChild(this.el.nativeElement);
        }
        else {
            if (this.appendTo) {
                if (this.appendTo === 'body') {
                    this.document.body.appendChild(this.el.nativeElement);
                }
                else {
                    DomHandler.appendChild(this.el.nativeElement, this.appendTo);
                }
            }
        }

        if (!this.overlayViewChild.nativeElement.style.minWidth) {
            this.overlayViewChild.nativeElement.style.minWidth = DomHandler.getWidth(this.container) + 'px';
        }
    }

    alignOverlay() {
        const viewport = DomHandler.getViewport();

        if(this.overlayViewChild) {
            if (viewport.width < this.overlayBreakpoints) {
                switch (this.overlayDirection) {
                    case 'start':
                        DomHandler.addClass(this.el.nativeElement, 'p-overlay-panel-start')
                    break;
                    
                    case 'center':
                        DomHandler.addClass(this.el.nativeElement, 'p-overlay-panel-center')
                    break;
                    
                    case 'end':
                        DomHandler.addClass(this.el.nativeElement, 'p-overlay-panel-end')
                    break;
                }
            }
            else {
                if (this.appendTo) {
                    DomHandler.absolutePosition(this.el.nativeElement.firstChild, this.container);
                }
                else {
                    DomHandler.relativePosition(this.el.nativeElement.firstChild, this.container);
                }
            }
        }
    }

    appendMask() {
        if (!this.mask) {
            this.mask = this.renderer.createElement('div');
            DomHandler.addMultipleClasses(this.mask, 'p-overlay-mask p-component-overlay-enter');
            ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.config.zIndex.modal);
            this.document.body.appendChild(this.mask);
            this.blockScroll();
            this.bindMaskClickListener();
        }
    }

    removeMask() {
        this.unbindMaskClickListener();

        if (this.mask) {
            DomHandler.addClass(this.mask, 'p-component-overlay-leave');
            ZIndexUtils.clear(this.mask);
            this.document.body.removeChild(this.mask);
            this.mask = null;
            this.unblockScroll();
        }
    }

    blockScroll() {
        DomHandler.addClass(this.document.body, 'p-overflow-hidden');
    }

    unblockScroll() {
        DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
    }

    bindMaskClickListener() {
        if (!this.maskClickListener) {
            this.maskClickListener = this.renderer.listen(this.mask, 'click', () => {
                this.removeMask();
            });
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    
    ngOnDestroy() {
        if (this.maskClickListener) {
            this.unbindMaskClickListener();
        }
        
        if (this.overlayViewChild && this.el.nativeElement) {
            ZIndexUtils.clear(this.overlayViewChild.nativeElement);
            this.overlayViewChild = null;
        }

        if(this.mask) {
            this.removeMask();
        }
    }

}

@NgModule({
    imports: [CommonModule,RippleModule, SharedModule],
    exports: [Overlay, SharedModule],
    declarations: [Overlay]
})
export class OverlayModule { }
