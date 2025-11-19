import { CommonModule, DOCUMENT } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    effect,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    inject,
    InjectionToken,
    input,
    Input,
    NgModule,
    numberAttribute,
    QueryList,
    Renderer2,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { absolutePosition, addClass, appendChild, findSingle, focus, getOffset, isIOS, isTouchDevice } from '@primeuix/utils';
import { Confirmation, ConfirmationService, OverlayService, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { MotionModule } from 'primeng/motion';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ConfirmPopupPassThrough } from 'primeng/types/confirmpopup';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { ConfirmPopupStyle } from './style/confirmpopupstyle';

const CONFIRMPOPUP_INSTANCE = new InjectionToken<ConfirmPopup>('CONFIRMPOPUP_INSTANCE');

/**
 * ConfirmPopup displays a confirmation overlay displayed relatively to its target.
 * @group Components
 */
@Component({
    selector: 'p-confirmpopup',
    standalone: true,
    imports: [CommonModule, SharedModule, ButtonModule, FocusTrap, Bind, MotionModule],
    providers: [ConfirmPopupStyle, { provide: CONFIRMPOPUP_INSTANCE, useExisting: ConfirmPopup }, { provide: PARENT_INSTANCE, useExisting: ConfirmPopup }],
    hostDirectives: [Bind],
    template: `
        @if (render()) {
            <div
                [pMotion]="computedVisible()"
                [pMotionAppear]="true"
                [pMotionName]="'p-confirm-popup'"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onAnimationStart($event)"
                (pMotionOnAfterLeave)="onAnimationEnd()"
                pFocusTrap
                [pBind]="ptm('root')"
                [class]="cn(cx('root'), styleClass)"
                [ngStyle]="style"
                role="alertdialog"
                (click)="onOverlayClick($event)"
            >
                <ng-container *ngIf="headlessTemplate || _headlessTemplate; else notHeadless">
                    <ng-container *ngTemplateOutlet="headlessTemplate || _headlessTemplate; context: { $implicit: confirmation }"></ng-container>
                </ng-container>
                <ng-template #notHeadless>
                    <div #content [pBind]="ptm('content')" [class]="cx('content')">
                        <ng-container *ngIf="contentTemplate || _contentTemplate; else withoutContentTemplate">
                            <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: confirmation }"></ng-container>
                        </ng-container>
                        <ng-template #withoutContentTemplate>
                            <i [pBind]="ptm('icon')" [class]="cx('icon')" *ngIf="confirmation?.icon"></i>
                            <span [pBind]="ptm('message')" [class]="cx('message')">{{ confirmation?.message }}</span>
                        </ng-template>
                    </div>
                    <div [pBind]="ptm('footer')" [class]="cx('footer')">
                        <p-button
                            type="button"
                            [label]="rejectButtonLabel"
                            (onClick)="onReject()"
                            [pt]="ptm('pcRejectButton')"
                            [class]="cx('pcRejectButton')"
                            [styleClass]="confirmation?.rejectButtonStyleClass"
                            [size]="confirmation?.rejectButtonProps?.size || 'small'"
                            [text]="confirmation?.rejectButtonProps?.text || false"
                            *ngIf="confirmation?.rejectVisible !== false"
                            [attr.aria-label]="rejectButtonLabel"
                            [buttonProps]="getRejectButtonProps()"
                            [autofocus]="autoFocusReject"
                            [unstyled]="unstyled()"
                        >
                            <ng-template #icon>
                                <i [class]="confirmation?.rejectIcon" *ngIf="confirmation?.rejectIcon; else rejecticon"></i>
                                <ng-template #rejecticon *ngTemplateOutlet="rejectIconTemplate || _rejectIconTemplate"></ng-template>
                            </ng-template>
                        </p-button>
                        <p-button
                            type="button"
                            [label]="acceptButtonLabel"
                            (onClick)="onAccept()"
                            [pt]="ptm('pcAcceptButton')"
                            [class]="cx('pcAcceptButton')"
                            [styleClass]="confirmation?.acceptButtonStyleClass"
                            [size]="confirmation?.acceptButtonProps?.size || 'small'"
                            *ngIf="confirmation?.acceptVisible !== false"
                            [attr.aria-label]="acceptButtonLabel"
                            [buttonProps]="getAcceptButtonProps()"
                            [autofocus]="autoFocusAccept"
                            [unstyled]="unstyled()"
                        >
                            <ng-template #icon>
                                <i [class]="confirmation?.acceptIcon" *ngIf="confirmation?.acceptIcon; else accepticontemplate"></i>
                                <ng-template #accepticontemplate *ngTemplateOutlet="acceptIconTemplate || _acceptIconTemplate"></ng-template>
                            </ng-template>
                        </p-button>
                    </div>
                </ng-template>
            </div>
        }
    `,

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ConfirmPopup extends BaseComponent<ConfirmPopupPassThrough> {
    $pcConfirmPopup: ConfirmPopup | undefined = inject(CONFIRMPOPUP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
     * @group Props
     */
    @Input() key: string | undefined;
    /**
     * Element to receive the focus when the popup gets visible, valid values are "accept", "reject", and "none".
     * @group Props
     */
    @Input() defaultFocus: string = 'accept';
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
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
     * Defines if the component is visible.
     * @group Props
     */
    visible = input<boolean>();

    private _visible = signal<boolean>(false);

    computedVisible = computed(() => this.visible() ?? this._visible());

    render = signal<boolean>(false);

    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'body'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>('body');

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    container: HTMLElement | null;

    subscription: Subscription;

    confirmation: Nullable<Confirmation>;

    autoFocusAccept: boolean = false;

    autoFocusReject: boolean = false;

    @ContentChild('content', { descendants: false }) contentTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('accepticon', { descendants: false }) acceptIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('rejecticon', { descendants: false }) rejectIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('headless', { descendants: false }) headlessTemplate: Nullable<TemplateRef<any>>;

    acceptButtonViewChild = viewChild('acceptButton', { read: ElementRef });

    rejectButtonViewChild = viewChild('rejectButton', { read: ElementRef });

    _contentTemplate: TemplateRef<any> | undefined;

    _acceptIconTemplate: TemplateRef<any> | undefined;

    _rejectIconTemplate: TemplateRef<any> | undefined;

    _headlessTemplate: TemplateRef<any> | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    private window: Window;

    _componentStyle = inject(ConfirmPopupStyle);

    constructor(
        public el: ElementRef,
        private confirmationService: ConfirmationService,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public overlayService: OverlayService,
        @Inject(DOCUMENT) public document: Document
    ) {
        super();
        this.window = this.document.defaultView as Window;
        this.subscription = this.confirmationService.requireConfirmation$.subscribe((confirmation) => {
            if (!confirmation) {
                this.hide();
                return;
            }

            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                const keys = Object.keys(confirmation);

                keys.forEach((key) => {
                    this[key] = confirmation[key];
                });

                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }

                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }

                this._visible.set(true);
            }
        });

        effect(() => {
            if (this.computedVisible()) {
                untracked(() => {
                    if (!this.render()) {
                        this.render.set(true);
                    }
                });
            }
        });
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'rejecticon':
                    this._rejectIconTemplate = item.template;
                    break;

                case 'accepticon':
                    this._acceptIconTemplate = item.template;
                    break;

                case 'headless':
                    this._headlessTemplate = item.template;
                    break;
            }
        });
    }

    option(name: string, k?: string) {
        const source: { [key: string]: any } = this;
        if (source.hasOwnProperty(name)) {
            if (k) {
                return source[k];
            }
            return source[name];
        }

        return undefined;
    }

    @HostListener('document:keydown.Escape', ['$event'])
    onEscapeKeydown(event: KeyboardEvent) {
        if (this.confirmation && this.confirmation.closeOnEscape !== false) {
            this.onReject();
        }
    }

    onAnimationStart(el: HTMLElement) {
        this.container = el;
        this.appendOverlay();
        this.alignOverlay();
        this.alignArrow();
        this.setZIndex();
        this.handleFocus();
        this.bindListeners();
    }

    handleFocus() {
        if (this.defaultFocus && (this.acceptButtonViewChild() || this.rejectButtonViewChild())) {
            const focusEl = <HTMLButtonElement>(
                (this.defaultFocus === 'accept' ? findSingle(this.acceptButtonViewChild()?.nativeElement, '[data-pc-section="root"]') : findSingle(this.rejectButtonViewChild()?.nativeElement, '[data-pc-section="root"]'))
            );
            focusEl.focus();
        }
    }

    onAnimationEnd() {
        this.restoreAppend();
        this.onContainerDestroy();
    }

    getAcceptButtonProps() {
        return this.option('acceptButtonProps');
    }

    getRejectButtonProps() {
        return this.option('rejectButtonProps');
    }

    alignOverlay() {
        if (!this.confirmation || !this.confirmation.target) {
            return;
        }

        absolutePosition(this.container!, this.confirmation?.target as HTMLElement, false);
    }

    setZIndex() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
        }
    }

    alignArrow() {
        const containerOffset = <any>getOffset(this.container);
        const targetOffset = <any>getOffset(this.confirmation?.target as any);
        let arrowLeft = 0;

        if (containerOffset && targetOffset && containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        if (this.container) {
            (this.container as HTMLDivElement).style.setProperty('--p-confirmpopup-arrow-left', `${arrowLeft}px`);
        }

        if (containerOffset && targetOffset && containerOffset.top < targetOffset.top) {
            (this.container as HTMLElement).setAttribute('data-p-confirmpopup-flipped', 'true');
            !this.$unstyled() && addClass(this.container as HTMLDivElement, 'p-confirm-popup-flipped');
        }
    }

    appendOverlay() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') {
                appendChild(this.document.body, this.container!);
            } else {
                appendChild(this.$appendTo(), this.container!);
            }
        }
    }

    restoreAppend() {
        if (this.container && this.$appendTo() !== 'self') {
            appendChild(this.el.nativeElement, this.container);
        }

        this.onContainerDestroy();
    }

    hide() {
        this._visible.set(false);
    }

    onAccept() {
        if (this.confirmation?.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }

        this.hide();
        focus(this.confirmation?.target as any);
    }

    onReject() {
        if (this.confirmation?.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }

        this.hide();
        focus(this.confirmation?.target as any);
    }

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    bindListeners(): void {
        /*
         * Called inside `setTimeout` to avoid listening to the click event that appears when `confirm` is first called(bubbling).
         * Need wait when bubbling event up and hang the handler on the next tick.
         * This is the case when eventTarget and confirmation.target do not match when the `confirm` method is called.
         */
        setTimeout(() => {
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
            this.bindScrollListener();
        });
    }

    unbindListeners() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            let documentEvent = isIOS() ? 'touchstart' : 'click';
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

            this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                if (this.confirmation && this.confirmation.dismissableMask !== false) {
                    let targetElement = <HTMLElement>this.confirmation.target;
                    if (this.container !== event.target && !this.container?.contains(event.target) && targetElement !== event.target && !targetElement.contains(event.target)) {
                        this.hide();
                    }
                }
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    onWindowResize() {
        if (this.computedVisible() && !isTouchDevice()) {
            this.hide();
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.confirmation?.target, () => {
                if (this.computedVisible()) {
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

    unsubscribeConfirmationSubscriptions() {
        if (this.confirmation) {
            if (this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.unsubscribe();
            }

            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.unsubscribe();
            }
        }
    }

    onContainerDestroy() {
        this.unbindListeners();
        this.unsubscribeConfirmationSubscriptions();

        if (this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.confirmation = null;
        this.render.set(false);
        this.container = null;
    }

    get acceptButtonLabel(): string {
        return this.confirmation?.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.confirmation?.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
    }

    onDestroy() {
        this.restoreAppend();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [ConfirmPopup, SharedModule],
    exports: [ConfirmPopup, SharedModule]
})
export class ConfirmPopupModule {}
