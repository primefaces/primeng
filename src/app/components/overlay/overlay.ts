import { animate, animation, AnimationEvent, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, NgModule, OnDestroy, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOptions, OverlayService, PrimeNGConfig, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';

export const OVERLAY_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Overlay),
    multi: true
};

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{showTransitionParams}}')]);

const hideAnimation = animation([animate('{{hideTransitionParams}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
    selector: 'p-overlay',
    template: `
        <ng-container *ngIf="modal; else overlayTemplate">
            <div
                *ngIf="modalVisible"
                #modal
                [ngClass]="{
                    'p-overlay-modal p-component-overlay p-component-overlay-enter': true,
                    'p-overlay-start': overlayResponsiveDirection === 'start',
                    'p-overlay-center': overlayResponsiveDirection === 'center',
                    'p-overlay-end': overlayResponsiveDirection === 'end'
                }"
            >
                <ng-container *ngTemplateOutlet="overlayTemplate"></ng-container>
            </div>
        </ng-container>
        <ng-template #overlayTemplate>
            <div
                *ngIf="visible"
                #overlay
                [ngStyle]="style"
                [ngClass]="'p-overlay p-component'"
                [class]="styleClass"
                (click)="onOverlayClick($event)"
                [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
            >
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [useAnimation(showAnimation)]), transition(':leave', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OVERLAY_VALUE_ACCESSOR],
    styleUrls: ['./overlay.css'],
    host: {
        class: 'p-element'
    }
})
export class Overlay implements OnDestroy {
    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value: any) {
        this._visible = value;

        if (this._visible && !this.modalVisible) {
            this.modalVisible = true;
        }
    }

    @Input() get style(): any {
        return this._style || (this.modal ? this.overlayResponsiveOptions?.style : this.overlayOptions?.style);
    }
    set style(value: any) {
        this._style = value;
    }

    @Input() get styleClass(): string | undefined {
        return this._styleClass || (this.modal ? this.overlayResponsiveOptions?.styleClass : this.overlayOptions?.styleClass);
    }
    set styleClass(value: string) {
        this._styleClass = value;
    }

    @Input() get appendTo(): any {
        return this._appendTo || this.overlayOptions?.appendTo;
    }
    set appendTo(value: any) {
        this._appendTo = value;
    }

    @Input() get autoZIndex(): boolean | undefined {
        const value = this._autoZIndex || this.overlayOptions?.autoZIndex;
        return value === undefined ? true : value;
    }
    set autoZIndex(value: boolean) {
        this._autoZIndex = value;
    }

    @Input() get baseZIndex(): number | undefined {
        const value = this._baseZIndex || this.overlayOptions?.baseZIndex;
        return value === undefined ? 0 : value;
    }
    set baseZIndex(value: number) {
        this._baseZIndex = value;
    }

    @Input() get showTransitionOptions(): string {
        const value = this._showTransitionOptions || this.overlayOptions?.showTransitionOptions;
        return value === undefined ? '.12s cubic-bezier(0, 0, 0.2, 1)' : value;
    }
    set showTransitionOptions(value: string) {
        this._showTransitionOptions = value;
    }

    @Input() get hideTransitionOptions(): string {
        const value = this._hideTransitionOptions || this.overlayOptions?.hideTransitionOptions;
        return value === undefined ? '.1s linear' : value;
    }
    set hideTransitionOptions(value: string) {
        this._hideTransitionOptions = value;
    }

    @Input() get listener(): any {
        return this._listener || this.overlayOptions?.listener;
    }
    set listener(value: any) {
        this._listener = value;
    }

    @Input() get options(): OverlayOptions | undefined {
        return this._options;
    }
    set options(val: OverlayOptions) {
        this._options = val;
    }

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onAnimationStart: EventEmitter<any> = new EventEmitter();

    @Output() onAnimationDone: EventEmitter<any> = new EventEmitter();

    @ViewChild('modal') modalViewChild: ElementRef;

    @ViewChild('overlay') overlayViewChild: ElementRef;

    _visible: boolean;

    _style: any;

    _styleClass: string;

    _appendTo: 'body' | HTMLElement | undefined;

    _autoZIndex: boolean;

    _baseZIndex: number;

    _showTransitionOptions: string;

    _hideTransitionOptions: string;

    _listener: any;

    _options: OverlayOptions | undefined;

    modalVisible: boolean;

    scrollHandler: any;

    documentClickListener: any;

    documentResizeListener: any;

    private window: Window;

    protected transformOptions: any = {
        default: 'scaleY(0.8)',
        start: 'translate3d(0px, -100%, 0px)',
        center: 'scale(0.7)',
        end: 'translate3d(0px, 100%, 0px)'
    };

    get modal() {
        return this.overlayResponsiveOptions && this.window.matchMedia(this.overlayResponsiveOptions.media?.replace('@media', '') || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches;
    }

    get mode() {
        return this.modal ? 'modal' : 'overlay';
    }

    get overlayOptions() {
        return { ...this.config?.overlayOptions, ...this.options }; // TODO: Improve performance
    }

    get overlayResponsiveOptions() {
        return { ...this.config?.overlayOptions?.responsive, ...this.options?.responsive }; // TODO: Improve performance
    }

    get overlayResponsiveDirection() {
        return this.overlayResponsiveOptions?.direction;
    }

    get modalEl() {
        return this.modalViewChild?.nativeElement;
    }

    get overlayEl() {
        return this.overlayViewChild?.nativeElement;
    }

    get containerEl() {
        return this.modal ? this.modalEl : this.overlayEl;
    }

    get targetEl() {
        return this.el?.nativeElement?.parentElement;
    }

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, private config: PrimeNGConfig, public overlayService: OverlayService, private cd: ChangeDetectorRef) {
        this.window = this.document.defaultView;
    }

    show(container?: HTMLElement, isFocus: boolean = false) {
        this.visible = true;
        this.handleEvents('onShow', { container: container || this.containerEl, target: this.targetEl, mode: this.mode });

        isFocus && DomHandler.focus(this.targetEl);
        this.modal && DomHandler.addClass(this.document?.body, 'p-overflow-hidden');
    }

    hide(container?: HTMLElement, isFocus: boolean = false) {
        this.visible = false;
        this.handleEvents('onHide', { container: container || this.containerEl, target: this.targetEl, mode: this.mode });

        isFocus && DomHandler.focus(this.targetEl);
        this.modal && DomHandler.removeClass(this.document?.body, 'p-overflow-hidden');
    }

    alignOverlay() {
        DomHandler.alignOverlay(this.overlayEl, this.targetEl, this.appendTo);
    }

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.targetEl
        });
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.autoZIndex) {
                    ZIndexUtils.set('overlay', this.containerEl, this.baseZIndex + this.config?.zIndex[this.mode]);
                }

                DomHandler.appendOverlay(this.containerEl, this.appendTo === 'body' ? this.document.body : this.appendTo, this.appendTo);
                this.alignOverlay();
                this.bindListeners();

                break;

            case 'void':
                DomHandler.appendOverlay(this.containerEl, this.targetEl, this.appendTo);
                this.modal && DomHandler.addClass(this.containerEl, 'p-component-overlay-leave');
                this.unbindListeners();

                break;
        }

        this.handleEvents('onAnimationStart', event);
    }

    onOverlayAnimationDone(event: AnimationEvent) {
        const container = this.containerEl || (this.modal ? event.element.parentElement : event.element);

        switch (event.toState) {
            case 'visible':
                this.show(container, true);

                break;

            case 'void':
                ZIndexUtils.clear(container);
                this.modalVisible = false;

                this.hide(container, true);
                break;
        }

        this.handleEvents('onAnimationDone', event);
    }

    handleEvents(name: string, params: any) {
        this[name].emit(params);
        this.options && this.options[name] && this.options[name](params);
        this.config?.overlayOptions && this.config?.overlayOptions[name] && this.config?.overlayOptions[name](params);
    }

    bindListeners() {
        this.bindScrollListener();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
    }

    unbindListeners() {
        this.unbindScrollListener();
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl, (event) => {
                const valid = this.listener ? this.listener(event, { type: 'scroll', valid: true }) : true;

                valid && this.hide(event, true);
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                const isOutsideClicked = this.targetEl && !(this.targetEl.isSameNode(event.target) || this.targetEl.contains(event.target) || (this.overlayEl && this.overlayEl.contains(<Node>event.target)));
                const valid = this.listener ? this.listener(event, { type: 'outside', valid: event.which !== 3 && isOutsideClicked }) : isOutsideClicked;

                valid && this.hide(event);
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen('window', 'resize', (event) => {
                const valid = this.listener ? this.listener(event, { type: 'resize', valid: !DomHandler.isTouchDevice() }) : !DomHandler.isTouchDevice();

                valid && this.hide(event, true);
            });
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    ngOnDestroy() {
        this.hide(this.containerEl, true);

        if (this.containerEl) {
            DomHandler.appendOverlay(this.containerEl, this.targetEl, this.appendTo);
            ZIndexUtils.clear(this.containerEl);
        }

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        this.unbindListeners();
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Overlay, SharedModule],
    declarations: [Overlay]
})
export class OverlayModule {}
