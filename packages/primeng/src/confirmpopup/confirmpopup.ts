import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    inject,
    Input,
    NgModule,
    numberAttribute,
    OnDestroy,
    Renderer2,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { absolutePosition, addClass, findSingle, getOffset, isIOS, isTouchDevice } from '@primeuix/utils';
import { Confirmation, ConfirmationService, OverlayService, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { ConfirmPopupStyle } from './style/confirmpopupstyle';

/**
 * ConfirmPopup displays a confirmation overlay displayed relatively to its target.
 * @group Components
 */
@Component({
    selector: 'p-confirmPopup, p-confirmpopup, p-confirm-popup',
    standalone: true,
    imports: [CommonModule, SharedModule, ButtonModule],
    template: `
        <div
            *ngIf="visible"
            [ngClass]="'p-confirmpopup p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            role="alertdialog"
            (click)="onOverlayClick($event)"
            [@animation]="{
                value: 'open',
                params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions }
            }"
            (@animation.start)="onAnimationStart($event)"
            (@animation.done)="onAnimationEnd($event)"
        >
            <ng-container *ngIf="headlessTemplate; else notHeadless">
                <ng-container *ngTemplateOutlet="headlessTemplate; context: { $implicit: confirmation }"></ng-container>
            </ng-container>
            <ng-template #notHeadless>
                <div #content class="p-confirmpopup-content">
                    <ng-container *ngIf="contentTemplate; else withoutContentTemplate">
                        <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: confirmation }"></ng-container>
                    </ng-container>
                    <ng-template #withoutContentTemplate>
                        <i [ngClass]="'p-confirmpopup-icon'" [class]="confirmation?.icon" *ngIf="confirmation?.icon"></i>
                        <span class="p-confirmpopup-message">{{ confirmation?.message }}</span>
                    </ng-template>
                </div>
                <div class="p-confirmpopup-footer">
                    <p-button
                        type="button"
                        [label]="rejectButtonLabel"
                        (onClick)="onReject()"
                        [ngClass]="'p-confirmpopup-reject-button'"
                        [styleClass]="confirmation?.rejectButtonStyleClass"
                        [size]="confirmation.rejectButtonProps?.size || 'small'"
                        [text]="confirmation.rejectButtonProps?.text || false"
                        *ngIf="confirmation?.rejectVisible !== false"
                        [attr.aria-label]="rejectButtonLabel"
                        [buttonProps]="getRejectButtonProps()"
                    >
                        <i [class]="confirmation?.rejectIcon" *ngIf="confirmation?.rejectIcon; else rejecticon"></i>
                        <ng-template #rejecticon *ngTemplateOutlet="rejectIconTemplate"></ng-template>
                    </p-button>
                    <p-button
                        type="button"
                        [label]="acceptButtonLabel"
                        (onClick)="onAccept()"
                        [ngClass]="'p-confirmpopup-accept-button'"
                        [styleClass]="confirmation?.acceptButtonStyleClass"
                        [size]="confirmation.acceptButtonProps?.size || 'small'"
                        *ngIf="confirmation?.acceptVisible !== false"
                        [attr.aria-label]="acceptButtonLabel"
                        [buttonProps]="getAcceptButtonProps()"
                    >
                        <i [class]="confirmation?.acceptIcon" *ngIf="confirmation?.acceptIcon; else accepticon"></i>
                        <ng-template #accepticon *ngTemplateOutlet="acceptIconTemplate"></ng-template>
                    </p-button>
                </div>
            </ng-template>
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
                'open',
                style({
                    transform: 'translateY(0)',
                    opacity: 1
                })
            ),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ConfirmPopupStyle]
})
export class ConfirmPopup extends BaseComponent implements AfterContentInit, OnDestroy {
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
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
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
    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value: any) {
        this._visible = value;
        this.cd.markForCheck();
    }

    container: Nullable<HTMLDivElement>;

    subscription: Subscription;

    confirmation: Nullable<Confirmation>;

    contentTemplate: Nullable<TemplateRef<any>>;

    acceptIconTemplate: Nullable<TemplateRef<any>>;

    rejectIconTemplate: Nullable<TemplateRef<any>>;

    headlessTemplate: Nullable<TemplateRef<any>>;

    _visible: boolean | undefined;

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

                this.visible = true;
            }
        });
    }

    option(name: string, k?: string) {
        const source: { [key: string]: any } = this || this;
        if (source.hasOwnProperty(name)) {
            if (k) {
                return source[k];
            }
            return source[name];
        }

        return undefined;
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'rejecticon':
                    this.rejectIconTemplate = item.template;
                    break;

                case 'accepticon':
                    this.acceptIconTemplate = item.template;
                    break;

                case 'headless':
                    this.headlessTemplate = item.template;
                    break;
            }
        });
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEscapeKeydown(event: KeyboardEvent) {
        if (this.confirmation && this.confirmation.closeOnEscape) {
            this.onReject();
        }
    }

    onAnimationStart(event: AnimationEvent) {
        if (event.toState === 'open') {
            this.container = event.element;
            this.renderer.appendChild(this.document.body, this.container);
            this.align();
            this.bindListeners();

            const element = this.getElementToFocus();
            if (element) {
                element.focus();
            }
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                break;
        }
    }

    getAcceptButtonProps() {
        return this.option('acceptButtonProps');
    }

    getRejectButtonProps() {
        return this.option('rejectButtonProps');
    }

    getElementToFocus() {
        switch (this.defaultFocus) {
            case 'accept':
                return <any>findSingle(this.container, '.p-confirm-popup-accept');

            case 'reject':
                return <any>findSingle(this.container, '.p-confirm-popup-reject');

            case 'none':
                return null;
        }
    }

    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
        }

        if (!this.confirmation) {
            return;
        }
        absolutePosition(this.container, this.confirmation?.target as any, false);

        const containerOffset = <any>getOffset(this.container);
        const targetOffset = <any>getOffset(this.confirmation?.target as any);
        let arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        (this.container as HTMLDivElement).style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

        if (containerOffset.top < targetOffset.top) {
            addClass(this.container, 'p-confirm-popup-flipped');
        }
    }

    hide() {
        this.visible = false;
    }

    onAccept() {
        if (this.confirmation?.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }

        this.hide();
    }

    onReject() {
        if (this.confirmation?.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }

        this.hide();
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
        if (this.visible && !isTouchDevice()) {
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
                if (this.visible) {
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
        this.container = null;
    }

    restoreAppend() {
        if (this.container) {
            this.renderer.removeChild(this.document.body, this.container);
        }

        this.onContainerDestroy();
    }

    get acceptButtonLabel(): string {
        return this.confirmation?.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.confirmation?.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
    }

    ngOnDestroy() {
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
