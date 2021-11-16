import {NgModule ,Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, OnDestroy, Input, EventEmitter, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Confirmation, ConfirmationService, OverlayService, PrimeNGConfig, TranslationKeys} from 'primeng/api';
import {Subscription} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {ZIndexUtils} from 'primeng/utils';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';

@Component({
    selector: 'p-confirmPopup',
    template: `
        <div *ngIf="visible" [ngClass]="'p-confirm-popup p-component'" [ngStyle]="style" [class]="styleClass" (click)="onOverlayClick($event)"
            [@animation]="{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
            (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)">
            <div #content class="p-confirm-popup-content">
                <i [ngClass]="'p-confirm-popup-icon'" [class]="confirmation.icon" *ngIf="confirmation.icon"></i>
                <span class="p-confirm-popup-message">{{confirmation.message}}</span>
            </div>
            <div class="p-confirm-popup-footer">
                <button type="button" pButton [icon]="confirmation.rejectIcon" [label]="rejectButtonLabel" (click)="reject()" [ngClass]="'p-confirm-popup-reject p-button-sm'"
                    [class]="confirmation.rejectButtonStyleClass || 'p-button-text'" *ngIf="confirmation.rejectVisible !== false" [attr.aria-label]="rejectButtonLabel"></button>
                <button type="button" pButton [icon]="confirmation.acceptIcon" [label]="acceptButtonLabel" (click)="accept()" [ngClass]="'p-confirm-popup-accept p-button-sm'"
                    [class]="confirmation.acceptButtonStyleClass" *ngIf="confirmation.acceptVisible !== false" [attr.aria-label]="acceptButtonLabel"></button>
            </div>
        </div>
    `,
    animations: [
        trigger('animation', [
            state('void', style({
                transform: 'scaleY(0.8)',
                opacity: 0
            })),
            state('open', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}')),
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./confirmpopup.css'],
    host: {
        'class': 'p-element'
    }
})
export class ConfirmPopup implements OnDestroy {

    @Input() key: string;

    @Input() defaultFocus: string = "accept";

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() style: any;

    @Input() styleClass: string;

    container: HTMLDivElement;

    subscription: Subscription;

    confirmation: Confirmation;

    _visible: boolean;

    documentClickListener: any;

    documentResizeListener: any;

    scrollHandler: any;

    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value:any) {
        this._visible = value;
        this.cd.markForCheck();
    }

    constructor(public el: ElementRef, private confirmationService: ConfirmationService, public renderer: Renderer2, private cd: ChangeDetectorRef, public config: PrimeNGConfig, public overlayService: OverlayService) {
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(confirmation => {
            if (!confirmation) {
                this.hide();
                return;
            }

            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
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

    onAnimationStart(event: AnimationEvent) {
        if (event.toState === 'open') {
            this.container = event.element;
            document.body.appendChild(this.container);
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

    getElementToFocus() {
        switch(this.defaultFocus) {
            case 'accept':
                return DomHandler.findSingle(this.container, '.p-confirm-popup-accept');

            case 'reject':
                return DomHandler.findSingle(this.container, '.p-confirm-popup-reject');

            case 'none':
                return null;
        }
    }

    align() {
        if (this.autoZIndex) {
            ZIndexUtils.set('overlay', this.container, this.config.zIndex.overlay);
        }

        DomHandler.absolutePosition(this.container, this.confirmation.target);

        const containerOffset = DomHandler.getOffset(this.container);
        const targetOffset = DomHandler.getOffset(this.confirmation.target);
        let arrowLeft = 0;

        if (containerOffset.left < targetOffset.left) {
            arrowLeft = targetOffset.left - containerOffset.left;
        }
        this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`);

        if (containerOffset.top < targetOffset.top) {
            DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
        }
    }

    hide() {
        this.visible = false;
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

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    bindListeners() {
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }

    unbindListeners() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : document;

            this.documentClickListener = this.renderer.listen(documentTarget, documentEvent, (event) => {
                let targetElement = <HTMLElement> this.confirmation.target;
                if (this.container !== event.target && !this.container.contains(event.target) &&
                    targetElement !== event.target && !targetElement.contains(event.target)) {
                    this.hide();
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
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.confirmation.target, () => {
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
            document.body.removeChild(this.container);
        }

        this.onContainerDestroy();
    }

    get acceptButtonLabel(): string {
        return this.confirmation.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.confirmation.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
    }

    ngOnDestroy() {
        this.restoreAppend();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule],
    exports: [ConfirmPopup],
    declarations: [ConfirmPopup]
})
export class ConfirmPopupModule { }
