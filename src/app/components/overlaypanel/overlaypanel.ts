import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div
            *ngIf="render"
            [ngClass]="'p-overlaypanel p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onOverlayClick($event)"
            [@animation]="{ value: overlayVisible ? 'open' : 'close', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
        >
            <div class="p-overlaypanel-content" (click)="onContentClick()" (mousedown)="onContentClick()">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <button *ngIf="showCloseIcon" type="button" class="p-overlaypanel-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <TimesIcon *ngIf="!closeIconTemplate" [styleClass]="'p-overlaypanel-close-icon'" />
                <span class="p-overlaypanel-close-icon" *ngIf="closeIconTemplate">
                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                </span>
            </button>
        </div>
    `,
    animations: [
        trigger('animation', [
            state(
                'void',
                style({
                    transform: 'scaleY(0.8)',
                    opacity: 0
                })
            ),
            state(
                'close',
                style({
                    opacity: 0
                })
            ),
            state(
                'open',
                style({
                    transform: 'translateY(0)',
                    opacity: 1
                })
            ),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => close', animate('{{hideTransitionParams}}'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./overlaypanel.css'],
    host: {
        class: 'p-element'
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

    isOverlayAnimationInProgress: boolean = false;

    selfClick: boolean = false;

    documentClickListener: () => void | null;

    target: any;

    willHide: boolean;

    scrollHandler: ConnectedOverlayScrollHandler | null;

    documentResizeListener: () => void | null;

    contentTemplate: TemplateRef<any>;

    closeIconTemplate: TemplateRef<any>;

    destroyCallback: Function;

    overlayEventListener: (event?) => void | null;

    overlaySubscription: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        private zone: NgZone,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }

            this.cd.markForCheck();
        });
    }

    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener && this.dismissable) {
                this.zone.runOutsideAngular(() => {
                    let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                    const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

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
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }

    toggle(event, target?) {
        if (this.isOverlayAnimationInProgress) {
            return;
        }

        if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
                this.destroyCallback = () => {
                    this.show(null, target || event.currentTarget || event.target);
                };
            }

            this.hide();
        } else {
            this.show(event, target);
        }
    }

    show(event, target?) {
        target && event && event.stopPropagation();
        if (this.isOverlayAnimationInProgress) {
            return;
        }

        this.target = target || event.currentTarget || event.target;
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
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.container);
            else DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }
    }

    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.baseZIndex + this.config.zIndex.overlay);
        }

        DomHandler.absolutePosition(this.container, this.target);

        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.target);
        const borderRadius = this.document.defaultView.getComputedStyle(this.container).getPropertyValue('border-radius');
        let arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left - parseFloat(borderRadius) * 2;
        }
        this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-overlaypanel-flipped');

            if (this.showCloseIcon) {
                this.renderer.setStyle(this.container, 'margin-top', '-30px');
            }
        }
    }

    onAnimationStart(event: AnimationEvent) {
        if (event.toState === 'open') {
            this.container = event.element;
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
            };

            this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
            this.onShow.emit(null);
        }

        this.isOverlayAnimationInProgress = true;
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

        this.isOverlayAnimationInProgress = false;
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
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }

    bindDocumentResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                const window = this.document.defaultView as Window;
                this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
            }
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        }
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
    imports: [CommonModule, RippleModule, SharedModule, TimesIcon],
    exports: [OverlayPanel, SharedModule],
    declarations: [OverlayPanel]
})
export class OverlayPanelModule {}
