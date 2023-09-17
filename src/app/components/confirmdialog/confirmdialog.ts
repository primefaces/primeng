import { AnimationEvent, animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { ConfirmEventType, Confirmation, ConfirmationService, Footer, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { CheckIcon } from 'primeng/icons/check';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}', style({ transform: 'none', opacity: 1 }))]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * ConfirmDialog uses a Dialog UI that is integrated with the Confirmation API.
 * @group Components
 */
@Component({
    selector: 'p-confirmDialog',
    template: `
        <div [class]="maskStyleClass" [ngClass]="getMaskClass()" *ngIf="maskVisible">
            <div
                [ngClass]="{ 'p-dialog p-confirm-dialog p-component': true, 'p-dialog-rtl': rtl }"
                [ngStyle]="style"
                [class]="styleClass"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="alertdialog"
                *ngIf="visible"
                [attr.aria-labelledby]="getAriaLabelledBy()"
                [attr.aria-modal]="true"
            >
                <div class="p-dialog-header" *ngIf="headerTemplate">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
                <div class="p-dialog-header" *ngIf="!headerTemplate">
                    <span class="p-dialog-title" [id]="getAriaLabelledBy()" *ngIf="option('header')">{{ option('header') }}</span>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="closable" type="button" role="button" [attr.aria-label]="closeAriaLabel" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-close p-link': true }" (click)="close($event)" (keydown.enter)="close($event)">
                            <TimesIcon />
                        </button>
                    </div>
                </div>
                <div #content class="p-dialog-content">
                    <i [ngClass]="'p-confirm-dialog-icon'" [class]="option('icon')" *ngIf="option('icon')"></i>
                    <span class="p-confirm-dialog-message" [innerHTML]="option('message')"></span>
                </div>
                <div class="p-dialog-footer" *ngIf="footer || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
                <div class="p-dialog-footer" *ngIf="!footer && !footerTemplate">
                    <button
                        type="button"
                        pRipple
                        pButton
                        [label]="rejectButtonLabel"
                        (click)="reject()"
                        [ngClass]="'p-confirm-dialog-reject'"
                        [class]="option('rejectButtonStyleClass')"
                        *ngIf="option('rejectVisible')"
                        [attr.aria-label]="rejectAriaLabel"
                    >
                        <ng-container *ngIf="!rejectIconTemplate">
                            <i *ngIf="option('rejectIcon')" [class]="option('rejectIcon')"></i>
                            <TimesIcon *ngIf="!option('rejectIcon')" [styleClass]="'p-button-icon-left'" />
                        </ng-container>
                        <span *ngIf="rejectIconTemplate" class="p-button-icon-left">
                            <ng-template *ngTemplateOutlet="rejectIconTemplate"></ng-template>
                        </span>
                    </button>
                    <button
                        type="button"
                        pRipple
                        pButton
                        [label]="acceptButtonLabel"
                        (click)="accept()"
                        [ngClass]="'p-confirm-dialog-accept'"
                        [class]="option('acceptButtonStyleClass')"
                        *ngIf="option('acceptVisible')"
                        [attr.aria-label]="acceptAriaLabel"
                    >
                        <ng-container *ngIf="!acceptIconTemplate">
                            <i *ngIf="option('acceptIcon')" [class]="option('acceptIcon')"></i>
                            <CheckIcon *ngIf="!option('acceptIcon')" [styleClass]="'p-button-icon-left'" />
                        </ng-container>
                        <span *ngIf="acceptIconTemplate" class="p-button-icon-left">
                            <ng-template *ngTemplateOutlet="acceptIconTemplate"></ng-template>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    `,
    animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../dialog/dialog.css'],
    host: {
        class: 'p-element'
    }
})
export class ConfirmDialog implements AfterContentInit, OnInit, OnDestroy {
    /**
     * Title text of the dialog.
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Icon to display next to message.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Message of the confirmation.
     * @group Props
     */
    @Input() message: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() get style(): { [klass: string]: any } | null | undefined {
        return this._style;
    }
    set style(value: { [klass: string]: any } | null | undefined) {
        this._style = value;
        this.cd.markForCheck();
    }
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Specify the CSS class(es) for styling the mask element
     * @group Props
     */
    @Input() maskStyleClass: string | undefined;
    /**
     * Icon of the accept button.
     * @group Props
     */
    @Input() acceptIcon: string | undefined;
    /**
     * Label of the accept button.
     * @group Props
     */
    @Input() acceptLabel: string | undefined;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    @Input() closeAriaLabel: string | undefined;
    /**
     * Defines a string that labels the accept button for accessibility.
     * @group Props
     */
    @Input() acceptAriaLabel: string | undefined;
    /**
     * Visibility of the accept button.
     * @group Props
     */
    @Input() acceptVisible: boolean = true;
    /**
     * Icon of the reject button.
     * @group Props
     */
    @Input() rejectIcon: string | undefined;
    /**
     * Label of the reject button.
     * @group Props
     */
    @Input() rejectLabel: string | undefined;
    /**
     * Defines a string that labels the reject button for accessibility.
     * @group Props
     */
    @Input() rejectAriaLabel: string | undefined;
    /**
     * Visibility of the reject button.
     * @group Props
     */
    @Input() rejectVisible: boolean = true;
    /**
     * Style class of the accept button.
     * @group Props
     */
    @Input() acceptButtonStyleClass: string | undefined;
    /**
     * Style class of the reject button.
     * @group Props
     */
    @Input() rejectButtonStyleClass: string | undefined;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    @Input() closeOnEscape: boolean = true;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    @Input() dismissableMask: boolean | undefined;
    /**
     * Determines whether scrolling behavior should be blocked within the component.
     * @group Props
     */
    @Input() blockScroll: boolean = true;
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    @Input() rtl: boolean = false;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    @Input() closable: boolean = true;
    /**
     *  Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.
     * @group Props
     */
    @Input() key: string | undefined;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input() autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input() baseZIndex: number = 0;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * When enabled, can only focus on elements inside the confirm dialog.
     * @group Props
     */
    @Input() focusTrap: boolean = true;
    /**
     * Element to receive the focus when the dialog gets visible.
     * @group Props
     */
    @Input() defaultFocus: 'accept' | 'reject' | 'close' = 'accept';
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    @Input() breakpoints: any;
    /**
     * Current visible state as a boolean.
     * @group Props
     */
    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value: any) {
        this._visible = value;

        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }

        this.cd.markForCheck();
    }
    /**
     *  Allows getting the position of the component.
     * @group Props
     */
    @Input() get position(): string {
        return this._position;
    }
    set position(value: string) {
        this._position = value;

        switch (value) {
            case 'top-left':
            case 'bottom-left':
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'top-right':
            case 'bottom-right':
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
            default:
                this.transformOptions = 'scale(0.7)';
                break;
        }
    }

    /**
     * Callback to invoke when dialog is hidden.
     * @param {ConfirmEventType} enum - Custom confirm event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<ConfirmEventType> = new EventEmitter<ConfirmEventType>();

    @ContentChild(Footer) footer: Nullable<TemplateRef<any>>;

    @ViewChild('content') contentViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'rejecticon':
                    this.rejectIconTemplate = item.template;
                    break;

                case 'accepticon':
                    this.acceptIconTemplate = item.template;
                    break;
            }
        });
    }

    headerTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    rejectIconTemplate: Nullable<TemplateRef<any>>;

    acceptIconTemplate: Nullable<TemplateRef<any>>;

    confirmation: Nullable<Confirmation>;

    _visible: boolean | undefined;

    _style: { [klass: string]: any } | null | undefined;

    maskVisible: boolean | undefined;

    documentEscapeListener: any;

    container: Nullable<HTMLDivElement>;

    wrapper: Nullable<HTMLElement>;

    contentContainer: Nullable<HTMLDivElement>;

    subscription: Subscription;

    maskClickListener: Function | null | undefined;

    preWidth: number | undefined;

    _position: string = 'center';

    transformOptions: any = 'scale(0.7)';

    styleElement: any;

    id = UniqueComponentId();

    confirmationOptions: Nullable<Confirmation>;

    translationSubscription: Subscription | undefined;

    constructor(public el: ElementRef, public renderer: Renderer2, private confirmationService: ConfirmationService, public zone: NgZone, private cd: ChangeDetectorRef, public config: PrimeNGConfig, @Inject(DOCUMENT) private document: Document) {
        this.subscription = this.confirmationService.requireConfirmation$.subscribe((confirmation) => {
            if (!confirmation) {
                this.hide();
                return;
            }

            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                this.confirmationOptions = {
                    message: this.confirmation.message || this.message,
                    icon: this.confirmation.icon || this.icon,
                    header: this.confirmation.header || this.header,
                    rejectVisible: this.confirmation.rejectVisible == null ? this.rejectVisible : this.confirmation.rejectVisible,
                    acceptVisible: this.confirmation.acceptVisible == null ? this.acceptVisible : this.confirmation.acceptVisible,
                    acceptLabel: this.confirmation.acceptLabel || this.acceptLabel,
                    rejectLabel: this.confirmation.rejectLabel || this.rejectLabel,
                    acceptIcon: this.confirmation.acceptIcon || this.acceptIcon,
                    rejectIcon: this.confirmation.rejectIcon || this.rejectIcon,
                    acceptButtonStyleClass: this.confirmation.acceptButtonStyleClass || this.acceptButtonStyleClass,
                    rejectButtonStyleClass: this.confirmation.rejectButtonStyleClass || this.rejectButtonStyleClass,
                    defaultFocus: this.confirmation.defaultFocus || this.defaultFocus,
                    blockScroll: this.confirmation.blockScroll === false || this.confirmation.blockScroll === true ? this.confirmation.blockScroll : this.blockScroll,
                    closeOnEscape: this.confirmation.closeOnEscape === false || this.confirmation.closeOnEscape === true ? this.confirmation.closeOnEscape : this.closeOnEscape,
                    dismissableMask: this.confirmation.dismissableMask === false || this.confirmation.dismissableMask === true ? this.confirmation.dismissableMask : this.dismissableMask
                };

                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }

                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }

                this.visible = true;
            }
        });
    }

    ngOnInit() {
        if (this.breakpoints) {
            this.createStyle();
        }

        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            if (this.visible) {
                this.cd.markForCheck();
            }
        });
    }

    getAriaLabelledBy() {
        return this.header !== null ? UniqueComponentId() + '_header' : null;
    }

    option(name: string) {
        const source: { [key: string]: any } = this.confirmationOptions || this;
        if (source.hasOwnProperty(name)) {
            return source[name];
        }
        return undefined;
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.contentContainer = DomHandler.findSingle(this.container, '.p-dialog-content');
                this.container?.setAttribute(this.id, '');
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.enableModality();

                const element = this.getElementToFocus();
                if (element) {
                    element.focus();
                }
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.onOverlayHide();
                break;
        }
    }

    getElementToFocus() {
        switch (this.option('defaultFocus')) {
            case 'accept':
                return DomHandler.findSingle(this.container, '.p-confirm-dialog-accept');

            case 'reject':
                return DomHandler.findSingle(this.container, '.p-confirm-dialog-reject');

            case 'close':
                return DomHandler.findSingle(this.container, '.p-dialog-header-close');

            case 'none':
                return null;

            //backward compatibility
            default:
                return DomHandler.findSingle(this.container, '.p-confirm-dialog-accept');
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.document.body.appendChild(this.wrapper as HTMLElement);
            else DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.wrapper && this.appendTo) {
            this.el.nativeElement.appendChild(this.wrapper);
        }
    }

    enableModality() {
        if (this.option('blockScroll')) {
            DomHandler.addClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.option('dismissableMask')) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }
    }

    disableModality() {
        this.maskVisible = false;

        if (this.option('blockScroll')) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.dismissableMask) {
            this.unbindMaskClickListener();
        }

        if (this.container && !(this.cd as ViewRef)['destroyed']) {
            this.cd.detectChanges();
        }
    }

    createStyle() {
        if (!this.styleElement) {
            this.styleElement = this.document.createElement('style');
            this.styleElement.type = 'text/css';
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
        }
    }

    close(event: Event) {
        if (this.confirmation?.rejectEvent) {
            this.confirmation.rejectEvent.emit(ConfirmEventType.CANCEL);
        }

        this.hide(ConfirmEventType.CANCEL);
        event.preventDefault();
    }

    hide(type?: ConfirmEventType) {
        this.onHide.emit(type);
        this.visible = false;
        this.confirmation = null;
        this.confirmationOptions = null;
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            (<HTMLElement>this.wrapper).style.zIndex = String(parseInt((<HTMLDivElement>this.container).style.zIndex, 10) - 1);
        }
    }

    getMaskClass() {
        let maskClass: { [key: string]: boolean } = { 'p-dialog-mask p-component-overlay': true, 'p-dialog-mask-scrollblocker': this.blockScroll };
        maskClass[this.getPositionClass().toString()] = true;
        return maskClass;
    }

    getPositionClass() {
        const positions = ['left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
        const pos = positions.find((item) => item === this.position);

        return pos ? `p-dialog-${pos}` : '';
    }

    bindGlobalListeners() {
        if ((this.option('closeOnEscape') && this.closable) || (this.focusTrap && !this.documentEscapeListener)) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                if (event.which == 27 && this.option('closeOnEscape') && this.closable) {
                    if (parseInt((this.container as HTMLDivElement).style.zIndex) === ZIndexUtils.get(this.container) && this.visible) {
                        this.close(event);
                    }
                }

                if (event.which === 9 && this.focusTrap) {
                    event.preventDefault();

                    let focusableElements = DomHandler.getFocusableElements(this.container as HTMLDivElement);

                    if (focusableElements && focusableElements.length > 0) {
                        if (!focusableElements[0].ownerDocument.activeElement) {
                            focusableElements[0].focus();
                        } else {
                            let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                            if (event.shiftKey) {
                                if (focusedIndex == -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();
                                else focusableElements[focusedIndex - 1].focus();
                            } else {
                                if (focusedIndex == -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();
                                else focusableElements[focusedIndex + 1].focus();
                            }
                        }
                    }
                }
            });
        }
    }

    unbindGlobalListeners() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    onOverlayHide() {
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.disableModality();
        this.unbindGlobalListeners();
        this.container = null;
    }

    destroyStyle() {
        if (this.styleElement) {
            this.document.head.removeChild(this.styleElement);
            this.styleElement = null;
        }
    }

    ngOnDestroy() {
        this.restoreAppend();
        this.onOverlayHide();
        this.subscription.unsubscribe();

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        this.destroyStyle();
    }

    accept() {
        if (this.confirmation && this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }

        this.hide(ConfirmEventType.ACCEPT);
    }

    reject() {
        if (this.confirmation && this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit(ConfirmEventType.REJECT);
        }

        this.hide(ConfirmEventType.REJECT);
    }

    get acceptButtonLabel(): string {
        return this.option('acceptLabel') || this.config.getTranslation(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.option('rejectLabel') || this.config.getTranslation(TranslationKeys.REJECT);
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, RippleModule, TimesIcon, CheckIcon],
    exports: [ConfirmDialog, ButtonModule, SharedModule],
    declarations: [ConfirmDialog]
})
export class ConfirmDialogModule {}
