import {NgModule ,Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, OnDestroy, Input, EventEmitter, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Confirmation, ConfirmationService, PrimeNGConfig, TranslationKeys} from 'primeng/api';
import {Subscription} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';

@Component({
    selector: 'p-confirmPopup',
    template: `
        <div *ngIf="visible" [ngClass]="'p-confirm-popup p-component'" [ngStyle]="style" [class]="styleClass"
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
    styleUrls: ['./confirmpopup.css']
})
export class ConfirmPopup implements OnDestroy {

    @Input() key: string;

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

    constructor(public el: ElementRef, private confirmationService: ConfirmationService, public renderer: Renderer2, private cd: ChangeDetectorRef, public config: PrimeNGConfig) {
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
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
            break;
        }
    }

    align() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }

        DomHandler.absolutePosition(this.container, this.confirmation.target);
        if (DomHandler.getOffset(this.container).top < DomHandler.getOffset(this.confirmation.target).top) {
            DomHandler.addClass(this.container, 'p-confirm-popup-flipped');
        }

        if (Math.floor(DomHandler.getOffset(this.container).left) < Math.floor(DomHandler.getOffset(this.confirmation.target).left) &&
            DomHandler.getOffset(this.container).left > 0) {
            DomHandler.addClass(this.container, 'p-confirm-popup-shifted');
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
        this.confirmation = null;
        this.container = null;
    }

    get acceptButtonLabel(): string {
        return this.confirmation.acceptLabel || this.config.getTranslation(TranslationKeys.ACCEPT);
    }

    get rejectButtonLabel(): string {
        return this.confirmation.rejectLabel || this.config.getTranslation(TranslationKeys.REJECT);
    }

    ngOnDestroy() {
        this.onContainerDestroy();

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
