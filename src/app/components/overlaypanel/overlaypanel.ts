import {NgModule,Component,Input,Output,OnDestroy,EventEmitter,Renderer2,ElementRef,ChangeDetectorRef,NgZone,
        ContentChildren,TemplateRef,AfterContentInit,QueryList,ChangeDetectionStrategy, ViewEncapsulation, ViewRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';
import {SharedModule,PrimeTemplate, PrimeNGConfig, OverlayService} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {ZIndexUtils} from 'primeng/utils';
import { Subscription } from 'rxjs';

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div *ngIf="render" [ngClass]="'p-overlaypanel p-component'" [ngStyle]="style" [class]="styleClass" (click)="onOverlayClick($event)"
            [@animation]="{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div class="p-overlaypanel-content" (click)="onContentClick()" (mousedown)="onContentClick()">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <span class="p-overlaypanel-close-icon pi pi-times"></span>
            </button>
        </div>
    `,
    animations: [
        trigger('animation', [
            state('void', style({
                transform: 'scaleY(0.8)',
                opacity: 0
            })),
            state('close', style({
                opacity: 0
            })),
            state('open', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => close', animate('{{hideTransitionParams}}')),
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./overlaypanel.css'],
    host: {
        'class': 'p-element'
    }
})
export class OverlayPanel implements AfterContentInit, OnDestroy {

    @Input() dismissable: boolean = true;

    @Input() showCloseIcon: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() appendTo: any = 'body';

    @Input() autoZIndex: boolean = true;

    @Input() ariaCloseLabel: string;

    @Input() baseZIndex: number = 0;

    @Input() focusOnShow: boolean = true;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    container: HTMLDivElement;

    overlayVisible: boolean = false;

    render: boolean = false;

    selfClick: boolean = false;

    documentClickListener: any;

    target: any;

    willHide: boolean;

    scrollHandler: any;

    documentResizeListener: any;

    contentTemplate: TemplateRef<any>;

    destroyCallback: Function;

    overlayEventListener;

    overlaySubscription: Subscription;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, private zone: NgZone, public config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }

            this.cd.markForCheck();
        });
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.selfClick) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }

                    this.selfClick = false;
                    this.cd.markForCheck();
                });
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }

    toggle(event, target?) {
        if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
                this.destroyCallback = () => {
                    this.show(null, (target||event.currentTarget||event.target));
                };
            }

            this.hide();
        }
        else {
            this.show(event, target);
        }
    }

    show(event, target?) {
        this.target = target||event.currentTarget||event.target;
        this.overlayVisible = true;
        this.render = true;
        this.cd.markForCheck();
    }

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });

        this.selfClick = true;
    }

    onContentClick() {
        this.selfClick = true;
    }

    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target||event.currentTarget||event.target);
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }

    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.baseZIndex + this.config.zIndex.overlay);
        }

        DomHandler.absolutePosition(this.container, this.target);

        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.target);
        let arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-overlaypanel-flipped');
        }
    }

    onAnimationStart(event: AnimationEvent) {
        if (event.toState === 'open') {
            this.container = event.element;
            this.onShow.emit(null);
            this.appendContainer();
            this.align();
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();

            if (this.focusOnShow) {
                this.focus();
            }

            this.overlayEventListener = (e) => {
                if (this.container && this.container.contains(e.target)) {
                    this.selfClick = true;
                }
            }

            this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                if (this.destroyCallback) {
                    this.destroyCallback();
                    this.destroyCallback = null;
                }

                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
            break;

            case 'close':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(this.container);
                }

                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }

                this.onContainerDestroy();
                this.onHide.emit({});
                this.render = false;
            break;
        }
    }

    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }

    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }

    onWindowResize(event) {
        this.hide();
    }

    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    onContainerDestroy() {
        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }

        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }

    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }

        this.destroyCallback = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }

        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule,RippleModule, SharedModule],
    exports: [OverlayPanel, SharedModule],
    declarations: [OverlayPanel]
})
export class OverlayPanelModule { }
