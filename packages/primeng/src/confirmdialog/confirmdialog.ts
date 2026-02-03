import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    EventEmitter,
    inject,
    InjectionToken,
    input,
    model,
    NgModule,
    NgZone,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { findSingle, setAttribute, uuid } from '@primeuix/utils';
import { Confirmation, ConfirmationService, ConfirmEventType, Footer, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Nullable } from 'primeng/ts-helpers';
import { ConfirmDialogHeadlessTemplateContext, ConfirmDialogMessageTemplateContext, ConfirmDialogPassThrough } from 'primeng/types/confirmdialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogStyle } from './style/confirmdialogstyle';

const CONFIRMDIALOG_INSTANCE = new InjectionToken<ConfirmDialog>('CONFIRMDIALOG_INSTANCE');

/**
 * ConfirmDialog uses a Dialog UI that is integrated with the Confirmation API.
 * @group Components
 */
@Component({
    selector: 'p-confirmDialog, p-confirmdialog, p-confirm-dialog',
    standalone: true,
    imports: [NgTemplateOutlet, NgClass, Button, Dialog, SharedModule, Bind],
    template: `
        <p-dialog
            [pt]="pt"
            #dialog
            [visible]="visible()"
            (visibleChange)="onVisibleChange($event)"
            role="alertdialog"
            [closable]="option('closable')"
            [styleClass]="cn(cx('root'), styleClass())"
            [modal]="option('modal')"
            [header]="option('header')"
            [closeOnEscape]="option('closeOnEscape')"
            [blockScroll]="option('blockScroll')"
            [appendTo]="$appendTo()"
            [position]="position()"
            [style]="style()"
            [dismissableMask]="dismissableMask()"
            [draggable]="draggable()"
            [baseZIndex]="baseZIndex()"
            [autoZIndex]="autoZIndex()"
            [maskStyleClass]="cn(cx('mask'), maskStyleClass())"
            [unstyled]="unstyled()"
            (onHide)="onDialogHide()"
        >
            @if (headlessTemplate()) {
                <ng-template #headless>
                    <ng-container
                        *ngTemplateOutlet="
                            headlessTemplate();
                            context: {
                                $implicit: confirmation,
                                onAccept: onAccept.bind(this),
                                onReject: onReject.bind(this)
                            }
                        "
                    ></ng-container>
                </ng-template>
            } @else {
                @if (headerTemplate()) {
                    <ng-template #header>
                        <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                    </ng-template>
                }

                <ng-template #content>
                    @if (iconTemplate()) {
                        <ng-container *ngTemplateOutlet="iconTemplate()"></ng-container>
                    } @else if (!iconTemplate() && !messageTemplate()) {
                        @if (option('icon')) {
                            <i [ngClass]="cx('icon')" [class]="option('icon')" [pBind]="ptm('icon')"></i>
                        }
                    }
                    @if (messageTemplate()) {
                        <ng-container *ngTemplateOutlet="messageTemplate(); context: { $implicit: confirmation }"></ng-container>
                    } @else {
                        <span [class]="cx('message')" [pBind]="ptm('message')" [innerHTML]="option('message')"> </span>
                    }
                </ng-template>
            }
            <ng-template #footer>
                @if (footerTemplate()) {
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                }
                @if (!footerTemplate()) {
                    @if (option('rejectVisible')) {
                        <p-button
                            [pt]="ptm('pcRejectButton')"
                            [label]="rejectButtonLabel"
                            (onClick)="onReject()"
                            [styleClass]="getButtonStyleClass('pcRejectButton', 'rejectButtonStyleClass')"
                            [ariaLabel]="option('rejectButtonProps', 'ariaLabel')"
                            [buttonProps]="getRejectButtonProps()"
                            [unstyled]="unstyled()"
                        >
                            <ng-template #icon>
                                @if (rejectIcon() && !rejectIconTemplate()) {
                                    @if (option('rejectIcon')) {
                                        <i [class]="option('rejectIcon')" [pBind]="ptm('pcRejectButton')['icon']"></i>
                                    }
                                }
                                @if (rejectIconTemplate()) {
                                    <ng-container *ngTemplateOutlet="rejectIconTemplate()"></ng-container>
                                }
                            </ng-template>
                        </p-button>
                    }
                    @if (option('acceptVisible')) {
                        <p-button
                            [pt]="ptm('pcAcceptButton')"
                            [label]="acceptButtonLabel"
                            (onClick)="onAccept()"
                            [styleClass]="getButtonStyleClass('pcAcceptButton', 'acceptButtonStyleClass')"
                            [ariaLabel]="option('acceptButtonProps', 'ariaLabel')"
                            [buttonProps]="getAcceptButtonProps()"
                            [unstyled]="unstyled()"
                        >
                            <ng-template #icon>
                                @if (acceptIcon() && !acceptIconTemplate()) {
                                    @if (option('acceptIcon')) {
                                        <i [class]="option('acceptIcon')" [pBind]="ptm('pcAcceptButton')['icon']"></i>
                                    }
                                }
                                @if (acceptIconTemplate()) {
                                    <ng-container *ngTemplateOutlet="acceptIconTemplate()"></ng-container>
                                }
                            </ng-template>
                        </p-button>
                    }
                }
            </ng-template>
        </p-dialog>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ConfirmDialogStyle, { provide: CONFIRMDIALOG_INSTANCE, useExisting: ConfirmDialog }, { provide: PARENT_INSTANCE, useExisting: ConfirmDialog }],
    hostDirectives: [Bind]
})
export class ConfirmDialog extends BaseComponent<ConfirmDialogPassThrough> {
    componentName = 'ConfirmDialog';

    $pcConfirmDialog: ConfirmDialog | undefined = inject(CONFIRMDIALOG_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Title text of the dialog.
     * @group Props
     */
    header = input<string>();
    /**
     * Icon to display next to message.
     * @group Props
     */
    icon = input<string>();
    /**
     * Message of the confirmation.
     * @group Props
     */
    message = input<string>();
    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Specify the CSS class(es) for styling the mask element
     * @group Props
     */
    maskStyleClass = input<string>();
    /**
     * Icon of the accept button.
     * @group Props
     */
    acceptIcon = input<string>();
    /**
     * Label of the accept button.
     * @group Props
     */
    acceptLabel = input<string>();
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    closeAriaLabel = input<string>();
    /**
     * Defines a string that labels the accept button for accessibility.
     * @group Props
     */
    acceptAriaLabel = input<string>();
    /**
     * Visibility of the accept button.
     * @group Props
     */
    acceptVisible = input(true, { transform: booleanAttribute });
    /**
     * Icon of the reject button.
     * @group Props
     */
    rejectIcon = input<string>();
    /**
     * Label of the reject button.
     * @group Props
     */
    rejectLabel = input<string>();
    /**
     * Defines a string that labels the reject button for accessibility.
     * @group Props
     */
    rejectAriaLabel = input<string>();
    /**
     * Visibility of the reject button.
     * @group Props
     */
    rejectVisible = input(true, { transform: booleanAttribute });
    /**
     * Style class of the accept button.
     * @group Props
     */
    acceptButtonStyleClass = input<string>();
    /**
     * Style class of the reject button.
     * @group Props
     */
    rejectButtonStyleClass = input<string>();
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    closeOnEscape = input(true, { transform: booleanAttribute });
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    dismissableMask = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Determines whether scrolling behavior should be blocked within the component.
     * @group Props
     */
    blockScroll = input(true, { transform: booleanAttribute });
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    rtl = input(false, { transform: booleanAttribute });
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    closable = input(true, { transform: booleanAttribute });
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'body'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>('body');
    /**
     * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
     * @group Props
     */
    key = input<string>();
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
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = input<string>('150ms cubic-bezier(0, 0, 0.2, 1)');
    /**
     * When enabled, can only focus on elements inside the confirm dialog.
     * @group Props
     */
    focusTrap = input(true, { transform: booleanAttribute });
    /**
     * Element to receive the focus when the dialog gets visible.
     * @group Props
     */
    defaultFocus = input<'accept' | 'reject' | 'close' | 'none'>('accept');
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    breakpoints = input<any>();
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    modal = input(true, { transform: booleanAttribute });
    /**
     * Current visible state as a boolean.
     * @group Props
     */
    visible = model<boolean>(false);
    /**
     *  Allows getting the position of the component.
     * @group Props
     */
    position = input<'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'>('center');
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    draggable = input(true, { transform: booleanAttribute });
    /**
     * Callback to invoke when dialog is hidden.
     * @param {ConfirmEventType} enum - Custom confirm event.
     * @group Emits
     */
    onHide = output<ConfirmEventType | undefined>();

    footer = contentChild(Footer);

    _componentStyle = inject(ConfirmDialogStyle);

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header');

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer');

    /**
     * Custom reject icon template.
     * @group Templates
     */
    rejectIconTemplate = contentChild<TemplateRef<void>>('rejecticon');

    /**
     * Custom accept icon template.
     * @group Templates
     */
    acceptIconTemplate = contentChild<TemplateRef<void>>('accepticon');

    /**
     * Custom message template.
     * @group Templates
     */
    messageTemplate = contentChild<TemplateRef<ConfirmDialogMessageTemplateContext>>('message');

    /**
     * Custom icon template.
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<void>>('icon');

    /**
     * Custom headless template.
     * @group Templates
     */
    headlessTemplate = contentChild<TemplateRef<ConfirmDialogHeadlessTemplateContext>>('headless');

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    confirmation: Nullable<Confirmation>;

    maskVisible = signal(false);

    dialog: Nullable<Dialog>;

    wrapper: Nullable<HTMLElement>;

    contentContainer: Nullable<HTMLDivElement>;

    subscription: Subscription;

    preWidth: number | undefined;

    styleElement: any;

    id = uuid('pn_id_');

    ariaLabelledBy: string | null = this.getAriaLabelledBy();

    translationSubscription: Subscription | undefined;

    constructor(
        private confirmationService: ConfirmationService,
        public zone: NgZone
    ) {
        super();

        effect(() => {
            if (this.visible() && !this.maskVisible()) {
                this.maskVisible.set(true);
            }
        });

        this.subscription = this.confirmationService.requireConfirmation$.subscribe((confirmation) => {
            if (!confirmation) {
                this.hide();
                return;
            }
            if (confirmation.key === this.key()) {
                this.confirmation = confirmation;

                this.visible.set(true);

                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }

                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }
            }
        });
    }

    onInit() {
        if (this.breakpoints()) {
            this.createStyle();
        }
    }

    getAriaLabelledBy() {
        return this.option('header') ? uuid('pn_id_') + '_header' : null;
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

    getButtonStyleClass(cx: string, opt: string): string {
        const cxClass = this.cx(cx);
        const optionClass = this.option(opt);

        return [cxClass, optionClass].filter(Boolean).join(' ');
    }

    getElementToFocus() {
        if (!this.dialog?.el?.nativeElement) return;

        switch (this.option('defaultFocus')) {
            case 'accept':
                return findSingle(this.dialog.el.nativeElement, '.p-confirm-dialog-accept');

            case 'reject':
                return findSingle(this.dialog.el.nativeElement, '.p-confirm-dialog-reject');

            case 'close':
                return findSingle(this.dialog.el.nativeElement, '.p-dialog-header-close');

            case 'none':
                return null;

            //backward compatibility
            default:
                return findSingle(this.dialog.el.nativeElement, '.p-confirm-dialog-accept');
        }
    }

    createStyle() {
        if (!this.styleElement) {
            this.styleElement = this.document.createElement('style');
            this.styleElement.type = 'text/css';
            setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
            this.document.head.appendChild(this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-dialog[${this.id}] {
                            width: ${this.breakpoints[breakpoint]} !important;
                        }
                    }
                `;
            }

            this.styleElement.innerHTML = innerHTML;
            setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
        }
    }

    close() {
        if (this.confirmation?.rejectEvent) {
            this.confirmation.rejectEvent.emit(ConfirmEventType.CANCEL);
        }

        this.hide(ConfirmEventType.CANCEL);
    }

    hide(type?: ConfirmEventType) {
        this.onHide.emit(type);
        this.visible.set(false);
        // Unsubscribe from confirmation events when the dialogue is closed, because events are created when the dialogue is opened.
        this.unsubscribeConfirmationEvents();
    }

    onDialogHide() {
        this.confirmation = null;
    }

    destroyStyle() {
        if (this.styleElement) {
            this.document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }

    onDestroy() {
        this.subscription.unsubscribe();
        // Unsubscribe from confirmation events if the dialogue is opened and this component is somehow destroyed.
        this.unsubscribeConfirmationEvents();

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        this.destroyStyle();
    }

    onVisibleChange(value: boolean) {
        if (!value) {
            this.close();
        } else {
            this.visible.set(value);
        }
    }

    onAccept() {
        if (this.confirmation && this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        this.hide(ConfirmEventType.ACCEPT);
    }

    onReject() {
        if (this.confirmation && this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit(ConfirmEventType.REJECT);
        }

        this.hide(ConfirmEventType.REJECT);
    }

    unsubscribeConfirmationEvents() {
        if (this.confirmation) {
            this.confirmation.acceptEvent?.unsubscribe();
            this.confirmation.rejectEvent?.unsubscribe();
        }
    }

    get acceptButtonLabel(): string {
        return this.option('acceptLabel') || this.getAcceptButtonProps()?.label || this.config.getTranslation(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.option('rejectLabel') || this.getRejectButtonProps()?.label || this.config.getTranslation(TranslationKeys.REJECT);
    }

    getAcceptButtonProps() {
        return this.option('acceptButtonProps');
    }

    getRejectButtonProps() {
        return this.option('rejectButtonProps');
    }
}

@NgModule({
    imports: [ConfirmDialog, SharedModule],
    exports: [ConfirmDialog, SharedModule]
})
export class ConfirmDialogModule {}
