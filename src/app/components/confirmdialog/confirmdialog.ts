import {NgModule,Component,ElementRef,OnDestroy,Input,EventEmitter,Renderer2,ContentChild,NgZone,ViewChild,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, TemplateRef, AfterContentInit} from '@angular/core';
import {trigger,style,transition,animate,AnimationEvent, useAnimation, animation} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {Footer,SharedModule, PrimeTemplate} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {Confirmation} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {Subscription} from 'rxjs';

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
                <div class="p-dialog-header">
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
                <div class="p-dialog-footer" *ngIf="!footer">
                    <button type="button" pButton [icon]="option('acceptIcon')" [label]="option('acceptLabel')" (click)="accept()" [ngClass]="'p-confirm-dialog-accept'" [class]="option('acceptButtonStyleClass')" *ngIf="option('acceptVisible')" [attr.aria-label]="acceptAriaLabel"></button>
                    <button type="button" pButton [icon]="option('rejectIcon')" [label]="option('rejectLabel')" (click)="reject()" [ngClass]="'p-confirm-dialog-reject'" [class]="option('rejectButtonStyleClass')" *ngIf="option('rejectVisible')" [attr.aria-label]="rejectAriaLabel"></button>
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
    styleUrls: ['../dialog/dialog.css']
})
export class ConfirmDialog implements AfterContentInit,OnDestroy {

    @Input() header: string;

    @Input() icon: string;

    @Input() message: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() maskStyleClass: string;

    @Input() acceptIcon: string = 'pi pi-check';

    @Input() acceptLabel: string = 'Yes';

    @Input() acceptAriaLabel: string;

    @Input() acceptVisible: boolean = true;

    @Input() rejectIcon: string = 'pi pi-times';

    @Input() rejectLabel: string = 'No';

    @Input() rejectAriaLabel: string;

    @Input() rejectVisible: boolean = true;

    @Input() acceptButtonStyleClass: string;

    @Input() rejectButtonStyleClass: string;

    @Input() closeOnEscape: boolean = true;

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
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
            break;
            case 'topright':
            case 'bottomright':
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

    @ContentChild(Footer) footer;

    @ViewChild('content') contentViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'footerTemplate':
                    this.footerTemplate = item.template;
                break;
            }
        });
    }

    footerTemplate: TemplateRef<any>;

    confirmation: Confirmation;

    _visible: boolean;

    maskVisible: boolean;

    documentEscapeListener: any;

    container: HTMLDivElement;

    wrapper: HTMLElement;

    contentContainer: HTMLDivElement;

    subscription: Subscription;

    preWidth: number;

    _position: string = "center";

    transformOptions: any = "scale(0.7)";

    confirmationOptions: Confirmation;

    constructor(public el: ElementRef, public renderer: Renderer2, private confirmationService: ConfirmationService, public zone: NgZone, private cd: ChangeDetectorRef) {
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
                    blockScroll: (this.confirmation.blockScroll === false || this.confirmation.blockScroll === true) ? this.confirmation.blockScroll : this.blockScroll
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

                const element = this.getElementToFocus();
                if (element) {
                    element.focus();
                }

                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.enableModality();
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
    }

    disableModality() {
        this.maskVisible = false;

        if (this.option('blockScroll')) {
            DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }

        if (this.container) {
            this.cd.detectChanges();
        }
    }

    close(event: Event) {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }

        this.hide();
        event.preventDefault();
    }

    hide() {
        this.visible = false;
        this.confirmation = null;
        this.confirmationOptions = null;
    }

    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    }

    getMaskClass() {
        let maskClass = {'p-dialog-mask p-component-overlay': true, 'p-dialog-mask-scrollblocker': this.blockScroll};
        maskClass[this.getPositionClass().toString()] = true;
        return maskClass;
    }

    getPositionClass() {
        const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        const pos = positions.find(item => item === this.position);

        return pos ? `p-dialog-${pos}` : '';
    }

    bindGlobalListeners() {
        if ((this.closeOnEscape && this.closable) || this.focusTrap && !this.documentEscapeListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                if (event.which == 27 && (this.closeOnEscape && this.closable)) {
                    if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex) && this.visible) {
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

    onOverlayHide() {
        this.disableModality();
        this.unbindGlobalListeners();
        this.container = null;
    }

    ngOnDestroy() {
        this.restoreAppend();
        this.onOverlayHide();
        this.subscription.unsubscribe();
    }

    accept() {
        if (this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }

        this.hide();
    }

    reject() {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }

        this.hide();
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [ConfirmDialog,ButtonModule,SharedModule],
    declarations: [ConfirmDialog]
})
export class ConfirmDialogModule { }
