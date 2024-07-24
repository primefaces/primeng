import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Inject,
    Input,
    NgModule,
    NgZone,
    numberAttribute,
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
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { PopoverStyle } from './style/popoverstyle';
import { BaseComponent } from 'primeng/basecomponent';
/**
 * OverlayPanel is a container component positioned as connected to its target.
 * @group Components
 */
@Component({
    selector: 'p-overlayPanel, p-popover',
    template: `
        <div
            *ngIf="render"
            [ngClass]="'p-popover p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onOverlayClick($event)"
            [@animation]="{ value: overlayVisible ? 'open' : 'close', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
            role="dialog"
            [attr.aria-modal]="overlayVisible"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
        >
            <div class="p-popover-content" (click)="onContentClick($event)" (mousedown)="onContentClick($event)">
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
            <!-- <button *ngIf="showCloseIcon" type="button" class="p-popover-close p-link" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel" pRipple>
                <TimesIcon *ngIf="!closeIconTemplate" [styleClass]="'p-popover-close-icon'" />
                <span class="p-popover-close-icon" *ngIf="closeIconTemplate">
                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                </span>
            </button> -->
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
    providers: [PopoverStyle]
})
export class OverlayPanel extends BaseComponent implements AfterContentInit, OnDestroy {
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Enables to hide the overlay when outside is clicked.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dismissable: boolean = true;
    /**
     * When enabled, displays a close icon at top right corner.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showCloseIcon: boolean | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     *  Target element to attach the panel, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any = 'body';
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Aria label of the close icon.
     * @group Props
     */
    @Input() ariaCloseLabel: string | undefined;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
    /**
     * When enabled, first button receives focus on show.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) focusOnShow: boolean = true;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Callback to invoke when an overlay becomes visible.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter();
    /**
     * Callback to invoke when an overlay gets hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    container: Nullable<HTMLDivElement>;

    overlayVisible: boolean = false;

    render: boolean = false;

    isOverlayAnimationInProgress: boolean = false;

    selfClick: boolean = false;

    documentClickListener: VoidListener;

    target: any;

    willHide: Nullable<boolean>;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    documentResizeListener: VoidListener;

    contentTemplate: Nullable<TemplateRef<any>>;

    closeIconTemplate: Nullable<TemplateRef<any>>;

    destroyCallback: Nullable<Function>;

    overlayEventListener: Nullable<(event?: any) => void>;

    overlaySubscription: Subscription | undefined;

    _componentStyle = inject(PopoverStyle);

    constructor(
        @Inject(DOCUMENT) public document: Document,
        @Inject(PLATFORM_ID) public platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        private zone: NgZone,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {
        super();
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
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
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

                this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                    if (!this.container?.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.selfClick) {
                        this.hide();
                    }

                    this.selfClick = false;
                    this.cd.markForCheck();
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

    /**
     * Toggles the visibility of the panel.
     * @param {Event} event - Browser event
     * @param {Target} target - Target element.
     * @group Method
     */
    toggle(event: any, target?: any) {
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
    /**
     * Displays the panel.
     * @param {Event} event - Browser event
     * @param {Target} target - Target element.
     * @group Method
     */
    show(event: any, target?: any) {
        target && event && event.stopPropagation();
        if (this.isOverlayAnimationInProgress) {
            return;
        }

        this.target = target || event.currentTarget || event.target;
        this.overlayVisible = true;
        this.render = true;
        this.cd.markForCheck();
    }

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });

        this.selfClick = true;
    }

    onContentClick(event: MouseEvent) {
        const targetElement = event.target as HTMLElement;
        this.selfClick = event.offsetX < targetElement.clientWidth && event.offsetY < targetElement.clientHeight;
    }

    hasTargetChanged(event: any, target: any) {
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

        DomHandler.absolutePosition(this.container, this.target, false);

        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.target);
        const borderRadius = this.document.defaultView?.getComputedStyle(this.container!).getPropertyValue('border-radius');
        let arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left - parseFloat(borderRadius!) * 2;
        }
        this.container?.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-popover-flipped');

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
    /**
     * Hides the panel.
     * @group Method
     */
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    onCloseClick(event: MouseEvent) {
        this.hide();
        event.preventDefault();
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEscapeKeydown(event: KeyboardEvent) {
        this.hide();
    }

    onWindowResize() {
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
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, SharedModule, TimesIcon],
    exports: [OverlayPanel, SharedModule],
    declarations: [OverlayPanel]
})
export class OverlayPanelModule {}
