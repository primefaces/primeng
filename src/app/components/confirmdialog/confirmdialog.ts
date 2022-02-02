import {NgModule,Component,ElementRef,OnDestroy,Input,EventEmitter,Renderer2,ContentChild,NgZone,ViewChild,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, TemplateRef, AfterContentInit, Output, OnInit} from '@angular/core';
import {trigger,style,transition,animate,AnimationEvent, useAnimation, animation} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {Footer,SharedModule, PrimeTemplate, PrimeNGConfig, TranslationKeys, ConfirmEventType} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {Confirmation} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {UniqueComponentId, ZIndexUtils} from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);

const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
    selector: 'p-confirmDialog',
    template: `
        <div [class]="maskStyleClass" [ngClass]="getMaskClass()" *ngIf="maskVisible">
            <div [ngClass]="{'p-dialog p-confirm-dialog p-component':true,'p-dialog-rtl':rtl}" [ngStyle]="style" [class]="styleClass" (mousedown)="moveOnTop()"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" *ngIf="visible">
                <div class="p-dialog-header" *ngIf="headerTemplate">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
                <div class="p-dialog-header" *ngIf="!headerTemplate">
                    <span class="p-dialog-title" *ngIf="option('header')">{{option('header')}}</span>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="closable" type="button" [ngClass]="{'p-dialog-header-icon p-dialog-header-close p-link':true}" (click)="close($event)" (keydown.enter)="close($event)">
                            <span class="pi pi-times"></span>
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
                    <button type="button" pRipple pButton [icon]="option('rejectIcon')" [label]="rejectButtonLabel" (click)="reject()" [ngClass]="'p-confirm-dialog-reject'" [class]="option('rejectButtonStyleClass')" *ngIf="option('rejectVisible')" [attr.aria-label]="rejectAriaLabel"></button>
                    <button type="button" pRipple pButton [icon]="option('acceptIcon')" [label]="acceptButtonLabel" (click)="accept()" [ngClass]="'p-confirm-dialog-accept'" [class]="option('acceptButtonStyleClass')" *ngIf="option('acceptVisible')" [attr.aria-label]="acceptAriaLabel"></button>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('animation', [
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
    styleUrls: ['../dialog/dialog.css'],
    host: {
        'class': 'p-element'
    }
})
export class ConfirmDialog implements AfterContentInit,OnInit,OnDestroy {

    @Input() header: string;

    @Input() icon: string;

    @Input() message: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() maskStyleClass: string;

    @Input() acceptIcon: string = 'pi pi-check';

    @Input() acceptLabel: string;

    @Input() acceptAriaLabel: string;

    @Input() acceptVisible: boolean = true;

    @Input() rejectIcon: string = 'pi pi-times';

    @Input() rejectLabel: string;

    @Input() rejectAriaLabel: string;

    @Input() rejectVisible: boolean = true;

    @Input() acceptButtonStyleClass: string;

    @Input() rejectButtonStyleClass: string;

    @Input() closeOnEscape: boolean = true;

    @Input() dismissableMask: boolean;

    @Input() blockScroll: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() appendTo: any;

    @Input() key: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

    @Input() focusTrap: boolean = true;

    @Input() defaultFocus: string = 'accept';

    @Input() breakpoints: any;

    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value:any) {
        this._visible = value;

        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }

        this.cd.markForCheck();
    }

    @Input() get position(): string {
        return this._position;
    };

    set position(value: string) {
        this._position = value;

        switch (value) {
            case 'top-left':
            case 'bottom-left':
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
            break;
            case 'top-right':
            case 'bottom-right':
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
            break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
            break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
            break;
            default:
                this.transformOptions = "scale(0.7)";
            break;
        }
    }

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ContentChild(Footer) footer;

    @ViewChild('content') contentViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;
                case 'footer':
                    this.footerTemplate = item.template;
                break;
            }
        });
    }

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    confirmation: Confirmation;

    _visible: boolean;

    maskVisible: boolean;

    documentEscapeListener: any;

    container: HTMLDivElement;

    wrapper: HTMLElement;

    contentContainer: HTMLDivElement;

    subscription: Subscription;

    maskClickListener: Function;

    preWidth: number;

    _position: string = "center";

    transformOptions: any = "scale(0.7)";

    styleElement: any;

    id = UniqueComponentId();

    confirmationOptions: Confirmation;

    translationSubscription: Subscription;

    constructor(public el: ElementRef, public renderer: Renderer2, private confirmationService: ConfirmationService, public zone: NgZone, private cd: ChangeDetectorRef, public config: PrimeNGConfig) {
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(confirmation => {
            if (!confirmation) {
                this.hide();
                return;
            }

            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                this.confirmationOptions = {
                    message: this.confirmation.message||this.message,
                    icon: this.confirmation.icon||this.icon,
                    header: this.confirmation.header||this.header,
                    rejectVisible: this.confirmation.rejectVisible == null ? this.rejectVisible : this.confirmation.rejectVisible,
                    acceptVisible: this.confirmation.acceptVisible == null ? this.acceptVisible : this.confirmation.acceptVisible,
                    acceptLabel: this.confirmation.acceptLabel||this.acceptLabel,
                    rejectLabel: this.confirmation.rejectLabel||this.rejectLabel,
                    acceptIcon: this.confirmation.acceptIcon || this.acceptIcon,
                    rejectIcon: this.confirmation.rejectIcon || this.rejectIcon,
                    acceptButtonStyleClass: this.confirmation.acceptButtonStyleClass || this.acceptButtonStyleClass,
                    rejectButtonStyleClass: this.confirmation.rejectButtonStyleClass || this.rejectButtonStyleClass,
                    defaultFocus: this.confirmation.defaultFocus || this.defaultFocus,
                    blockScroll: (this.confirmation.blockScroll === false || this.confirmation.blockScroll === true) ? this.confirmation.blockScroll : this.blockScroll,
                    closeOnEscape: (this.confirmation.closeOnEscape === false || this.confirmation.closeOnEscape === true) ? this.confirmation.closeOnEscape : this.closeOnEscape,
                    dismissableMask: (this.confirmation.dismissableMask === false || this.confirmation.dismissableMask === true) ? this.confirmation.dismissableMask : this.dismissableMask
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

    option(name: string) {
        const source = this.confirmationOptions || this;
        if (source.hasOwnProperty(name)) {
            return source[name];
        }
        return undefined;
    }

    onAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.contentContainer = DomHandler.findSingle(this.container, '.p-dialog-content');
                this.container.setAttribute(this.id, '');
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
        switch(event.toState) {
            case 'void':
                this.onOverlayHide();
            break;
        }
    }

    getElementToFocus() {
        switch(this.option('defaultFocus')) {
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
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.wrapper && this.appendTo) {
            this.el.nativeElement.appendChild(this.wrapper);
        }
    }

    enableModality() {
        if (this.option('blockScroll')) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
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
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        if (this.dismissableMask) {
            this.unbindMaskClickListener();
        }

        if (this.container && !this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }

    createStyle() {
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.type = 'text/css';
            document.head.appendChild(this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-dialog[${this.id}] {
                            width: ${this.breakpoints[breakpoint]} !important;
                        }
                    }
                `
            }

            this.styleElement.innerHTML = innerHTML;
        }
    }

    close(event: Event) {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit(ConfirmEventType.CANCEL);
        }

        this.hide(ConfirmEventType.CANCEL);
        event.preventDefault();
    }

    hide(type?) {
        this.onHide.emit(type);
        this.visible = false;
        this.confirmation = null;
        this.confirmationOptions = null;
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        }
    }

    getMaskClass() {
        let maskClass = {'p-dialog-mask p-component-overlay': true, 'p-dialog-mask-scrollblocker': this.blockScroll};
        maskClass[this.getPositionClass().toString()] = true;
        return maskClass;
    }

    getPositionClass() {
        const positions = ['left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
        const pos = positions.find(item => item === this.position);

        return pos ? `p-dialog-${pos}` : '';
    }

    bindGlobalListeners() {
        if ((this.option('closeOnEscape') && this.closable) || this.focusTrap && !this.documentEscapeListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                if (event.which == 27 && (this.option('closeOnEscape') && this.closable)) {
                    if (parseInt(this.container.style.zIndex) === ZIndexUtils.get(this.container) && this.visible) {
                        this.close(event);
                    }
                }

                if (event.which === 9 && this.focusTrap) {
                    event.preventDefault();

                    let focusableElements = DomHandler.getFocusableElements(this.container);

                    if (focusableElements && focusableElements.length > 0) {
                        if (!focusableElements[0].ownerDocument.activeElement) {
                            focusableElements[0].focus();
                        }
                        else {
                            let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

                            if (event.shiftKey) {
                                if (focusedIndex == -1 || focusedIndex === 0)
                                    focusableElements[focusableElements.length - 1].focus();
                                else
                                    focusableElements[focusedIndex - 1].focus();
                            }
                            else {
                                if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                    focusableElements[0].focus();
                                else
                                    focusableElements[focusedIndex + 1].focus();
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
            document.head.removeChild(this.styleElement);
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
    imports: [CommonModule,ButtonModule,RippleModule],
    exports: [ConfirmDialog,ButtonModule,SharedModule],
    declarations: [ConfirmDialog]
})
export class ConfirmDialogModule { }
