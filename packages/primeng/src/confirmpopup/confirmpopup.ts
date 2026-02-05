import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    inject,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    Renderer2,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addClass, appendChild, findSingle, focus, getOffset, isIOS, isTouchDevice } from '@primeuix/utils';
import { Confirmation, ConfirmationService, OverlayService, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { MotionModule } from 'primeng/motion';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ConfirmPopupContentTemplateContext, ConfirmPopupDefaultFocus, ConfirmPopupHeadlessTemplateContext, ConfirmPopupPassThrough } from 'primeng/types/confirmpopup';
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
    imports: [NgTemplateOutlet, SharedModule, ButtonModule, FocusTrap, Bind, MotionModule],
    providers: [ConfirmPopupStyle, { provide: CONFIRMPOPUP_INSTANCE, useExisting: ConfirmPopup }, { provide: PARENT_INSTANCE, useExisting: ConfirmPopup }],
    hostDirectives: [Bind],
    template: `
        @if (render()) {
            <div
                [pMotion]="computedVisible()"
                [pMotionAppear]="true"
                [pMotionName]="'p-anchored-overlay'"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnAfterLeave)="onAfterLeave()"
                pFocusTrap
                [pBind]="ptm('root')"
                [class]="cn(cx('root'), styleClass())"
                [style]="style()"
                role="alertdialog"
                (click)="onOverlayClick($event)"
            >
                @if (headlessTemplate()) {
                    <ng-container *ngTemplateOutlet="headlessTemplate(); context: { $implicit: confirmation }"></ng-container>
                } @else {
                    <div #content [pBind]="ptm('content')" [class]="cx('content')">
                        @if (contentTemplate()) {
                            <ng-container *ngTemplateOutlet="contentTemplate(); context: { $implicit: confirmation }"></ng-container>
                        } @else {
                            @if (hasIcon) {
                                <i [pBind]="ptm('icon')" [class]="cx('icon')"></i>
                            }
                            <span [pBind]="ptm('message')" [class]="cx('message')">{{ message }}</span>
                        }
                    </div>
                    <div [pBind]="ptm('footer')" [class]="cx('footer')">
                        @if (rejectVisible) {
                            <p-button
                                type="button"
                                [label]="rejectButtonLabel"
                                (onClick)="onReject()"
                                [pt]="ptm('pcRejectButton')"
                                [class]="cx('pcRejectButton')"
                                [styleClass]="rejectButtonStyleClass"
                                [size]="rejectButtonSize"
                                [text]="rejectButtonText"
                                [attr.aria-label]="rejectButtonLabel"
                                [buttonProps]="getRejectButtonProps()"
                                [autofocus]="autoFocusReject"
                                [unstyled]="unstyled()"
                            >
                                <ng-template #icon>
                                    @if (hasRejectIcon) {
                                        <i [class]="rejectIcon"></i>
                                    } @else if (rejectIconTemplate()) {
                                        <ng-container *ngTemplateOutlet="rejectIconTemplate()"></ng-container>
                                    }
                                </ng-template>
                            </p-button>
                        }
                        @if (acceptVisible) {
                            <p-button
                                type="button"
                                [label]="acceptButtonLabel"
                                (onClick)="onAccept()"
                                [pt]="ptm('pcAcceptButton')"
                                [class]="cx('pcAcceptButton')"
                                [styleClass]="acceptButtonStyleClass"
                                [size]="acceptButtonSize"
                                [attr.aria-label]="acceptButtonLabel"
                                [buttonProps]="getAcceptButtonProps()"
                                [autofocus]="autoFocusAccept"
                                [unstyled]="unstyled()"
                            >
                                <ng-template #icon>
                                    @if (hasAcceptIcon) {
                                        <i [class]="acceptIcon"></i>
                                    } @else if (acceptIconTemplate()) {
                                        <ng-container *ngTemplateOutlet="acceptIconTemplate()"></ng-container>
                                    }
                                </ng-template>
                            </p-button>
                        }
                    </div>
                }
            </div>
        }
    `,

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ConfirmPopup extends BaseComponent<ConfirmPopupPassThrough> {
    componentName = 'ConfirmPopup';

    $pcConfirmPopup: ConfirmPopup | undefined = inject(CONFIRMPOPUP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
     * @group Props
     */
    key = input<string>();
    /**
     * Element to receive the focus when the popup gets visible, valid values are "accept", "reject", and "none".
     * @group Props
     */
    defaultFocus = input<ConfirmPopupDefaultFocus>('accept');
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
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
    appendTo = input<AppendTo>('body');

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    container: HTMLElement | null;

    subscription: Subscription;

    confirmation: Nullable<Confirmation>;

    autoFocusAccept: boolean = false;

    autoFocusReject: boolean = false;

    /**
     * Custom content template.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<ConfirmPopupContentTemplateContext>>('content');

    /**
     * Custom accept icon template.
     * @group Templates
     */
    acceptIconTemplate = contentChild<TemplateRef<void>>('accepticon');

    /**
     * Custom reject icon template.
     * @group Templates
     */
    rejectIconTemplate = contentChild<TemplateRef<void>>('rejecticon');

    /**
     * Custom headless template.
     * @group Templates
     */
    headlessTemplate = contentChild<TemplateRef<ConfirmPopupHeadlessTemplateContext>>('headless');

    acceptButtonViewChild = viewChild('acceptButton', { read: ElementRef });

    rejectButtonViewChild = viewChild('rejectButton', { read: ElementRef });

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

            if (this.computedVisible()) {
                requestAnimationFrame(() => {
                    this.alignOverlay();
                });
            }

            if (confirmation.key === this.key()) {
                this.confirmation = confirmation;

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

    option(name: string, k?: string) {
        if (this.confirmation && this.confirmation.hasOwnProperty(name)) {
            return k ? this.confirmation[k] : this.confirmation[name];
        }

        const source: { [key: string]: any } = this;
        if (source.hasOwnProperty(name)) {
            const value = k ? source[k] : source[name];
            return typeof value === 'function' ? value() : value;
        }
        return undefined;
    }

    @HostListener('document:keydown.Escape', ['$event'])
    onEscapeKeydown(event: KeyboardEvent) {
        if (this.confirmation && this.confirmation.closeOnEscape !== false) {
            this.onReject();
        }
    }

    onBeforeEnter(event: MotionEvent) {
        if (this.confirmation) {
            const focusValue = this.confirmation.defaultFocus ?? this.defaultFocus();
            this.autoFocusAccept = focusValue === 'accept';
            this.autoFocusReject = focusValue === 'reject';
        }

        this.container = event.element as HTMLElement;
        this.appendOverlay();
        this.alignOverlay();
        this.alignArrow();
        this.setZIndex();
        this.handleFocus();
        this.bindListeners();
    }

    handleFocus() {
        const focusValue = this.defaultFocus();
        if (focusValue && (this.acceptButtonViewChild() || this.rejectButtonViewChild())) {
            const focusEl = <HTMLButtonElement>(focusValue === 'accept' ? findSingle(this.acceptButtonViewChild()?.nativeElement, '[data-pc-section="root"]') : findSingle(this.rejectButtonViewChild()?.nativeElement, '[data-pc-section="root"]'));
            focusEl.focus();
        }
    }

    onAfterLeave() {
        this.autoFocusAccept = false;
        this.autoFocusReject = false;
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
        if (this.autoZIndex()) {
            ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
        }
    }

    alignArrow() {
        const containerOffset = getOffset(this.container);
        const targetOffset = getOffset(this.confirmation?.target as HTMLElement);
        const containerLeft = containerOffset.left as number;
        const targetLeft = targetOffset.left as number;
        let arrowLeft = 0;

        if (containerOffset && targetOffset && containerLeft < targetLeft) {
            arrowLeft = targetLeft - containerLeft;
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
        focus(this.confirmation?.target as HTMLElement);
    }

    onReject() {
        if (this.confirmation?.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }

        this.hide();
        focus(this.confirmation?.target as HTMLElement);
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

        if (this.autoZIndex()) {
            ZIndexUtils.clear(this.container);
        }

        this.confirmation = null;
        this.render.set(false);
        this.container = null;
    }

    get acceptButtonLabel(): string {
        return this.confirmation?.acceptLabel || this.translate(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.confirmation?.rejectLabel || this.translate(TranslationKeys.REJECT);
    }

    get rejectVisible(): boolean {
        return this.confirmation?.rejectVisible !== false;
    }

    get acceptVisible(): boolean {
        return this.confirmation?.acceptVisible !== false;
    }

    get rejectButtonSize() {
        return this.confirmation?.rejectButtonProps?.size || 'small';
    }

    get rejectButtonText(): boolean {
        return this.confirmation?.rejectButtonProps?.text || false;
    }

    get acceptButtonSize() {
        return this.confirmation?.acceptButtonProps?.size || 'small';
    }

    get rejectButtonStyleClass(): string | undefined {
        return this.confirmation?.rejectButtonStyleClass;
    }

    get acceptButtonStyleClass(): string | undefined {
        return this.confirmation?.acceptButtonStyleClass;
    }

    get hasIcon(): boolean {
        return !!this.confirmation?.icon;
    }

    get hasRejectIcon(): boolean {
        return !!this.confirmation?.rejectIcon;
    }

    get hasAcceptIcon(): boolean {
        return !!this.confirmation?.acceptIcon;
    }

    get rejectIcon(): string | undefined {
        return this.confirmation?.rejectIcon;
    }

    get acceptIcon(): string | undefined {
        return this.confirmation?.acceptIcon;
    }

    get message(): string | undefined {
        return this.confirmation?.message;
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
