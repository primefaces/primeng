import { animate, animation, AnimationEvent, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, NgModule, OnDestroy, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModeType, OverlayOptions, OverlayService, PrimeNGConfig, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';

export const OVERLAY_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Overlay),
    multi: true
};

const showOverlayContentAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{showTransitionParams}}')]);

const hideOverlayContentAnimation = animation([animate('{{hideTransitionParams}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
    selector: 'p-overlay',
    template: `
        <div
            *ngIf="modalVisible"
            #overlay
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-overlay p-component': true,
                'p-overlay-modal p-component-overlay p-component-overlay-enter': modal,
                'p-overlay-start': modal && overlayResponsiveDirection === 'start',
                'p-overlay-center': modal && overlayResponsiveDirection === 'center',
                'p-overlay-end': modal && overlayResponsiveDirection === 'end'
            }"
        >
            <div
                *ngIf="visible"
                #content
                [ngStyle]="contentStyle"
                [class]="contentStyleClass"
                [ngClass]="'p-overlay-content'"
                (click)="onOverlayContentClick($event)"
                [@overlayContentAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayContentAnimation.start)="onOverlayContentAnimationStart($event)"
                (@overlayContentAnimation.done)="onOverlayContentAnimationDone($event)"
            >
                <ng-content></ng-content>
            </div>
        </div>
    `,
    animations: [trigger('overlayContentAnimation', [transition(':enter', [useAnimation(showOverlayContentAnimation)]), transition(':leave', [useAnimation(hideOverlayContentAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OVERLAY_VALUE_ACCESSOR],
    styleUrls: ['./overlay.css'],
    host: {
        class: 'p-element'
    }
})
export class Overlay implements OnDestroy {
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;

        if (this._visible && !this.modalVisible) {
            this.modalVisible = true;
        }
    }

    @Input() get mode(): OverlayModeType | string {
        return this._mode || this.overlayOptions?.mode;
    }
    set mode(value: string) {
        this._mode = value;
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

    @Input() get contentStyle(): any {
        return this._contentStyle || this.overlayOptions?.contentStyle;
    }
    set contentStyle(value: any) {
        this._contentStyle = value;
    }

    @Input() get contentStyleClass(): string | undefined {
        return this._contentStyleClass || this.overlayOptions?.contentStyleClass;
    }
    set contentStyleClass(value: string) {
        this._contentStyleClass = value;
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

    @Output() visibleChange: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onAnimationStart: EventEmitter<any> = new EventEmitter();

    @Output() onAnimationDone: EventEmitter<any> = new EventEmitter();

    @ViewChild('overlay') overlayViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    _visible: boolean;

    _mode: OverlayModeType | string;

    _style: any;

    _styleClass: string;

    _contentStyle: any;

    _contentStyleClass: string;

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
        return this.mode === 'modal' || (this.overlayResponsiveOptions && this.window.matchMedia(this.overlayResponsiveOptions.media?.replace('@media', '') || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches);
    }

    get overlayMode() {
        return this.mode || (this.modal ? 'modal' : 'overlay');
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

    get overlayEl() {
        return this.overlayViewChild?.nativeElement;
    }

    get contentEl() {
        return this.contentViewChild?.nativeElement;
    }

    get targetEl() {
        return this.el?.nativeElement?.parentElement;
    }

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public renderer: Renderer2, private config: PrimeNGConfig, public overlayService: OverlayService, private cd: ChangeDetectorRef) {
        this.window = this.document.defaultView;
    }

    show(overlay?: HTMLElement, isFocus: boolean = false) {
        this.onVisibleChange(true);
        this.handleEvents('onShow', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });

        isFocus && DomHandler.focus(this.targetEl);
        this.modal && DomHandler.addClass(this.document?.body, 'p-overflow-hidden');
    }

    hide(overlay?: HTMLElement, isFocus: boolean = false) {
        this.onVisibleChange(false);
        this.handleEvents('onHide', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });

        isFocus && DomHandler.focus(this.targetEl);
        this.modal && DomHandler.removeClass(this.document?.body, 'p-overflow-hidden');
    }

    onVisibleChange(visible: boolean) {
        this._visible = visible;
        this.visibleChange.emit(visible);
    }

    alignOverlay() {
        !this.modal && DomHandler.alignOverlay(this.overlayEl, this.targetEl, this.appendTo);
    }

    onOverlayContentClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.targetEl
        });
    }

    onOverlayContentAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.handleEvents('onBeforeShow', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });

                if (this.autoZIndex) {
                    ZIndexUtils.set(this.overlayMode, this.overlayEl, this.baseZIndex + this.config?.zIndex[this.overlayMode]);
                }

                DomHandler.appendOverlay(this.overlayEl, this.appendTo === 'body' ? this.document.body : this.appendTo, this.appendTo);
                this.alignOverlay();
                this.bindListeners();

                break;

            case 'void':
                this.handleEvents('onBeforeHide', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });

                DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
                this.modal && DomHandler.addClass(this.overlayEl, 'p-component-overlay-leave');
                this.unbindListeners();

                break;
        }

        this.handleEvents('onAnimationStart', event);
    }

    onOverlayContentAnimationDone(event: AnimationEvent) {
        const container = this.overlayEl || event.element.parentElement;

        switch (event.toState) {
            case 'visible':
                this.show(container, true);

                break;

            case 'void':
                this.hide(container, true);

                ZIndexUtils.clear(container);
                this.modalVisible = false;
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
                const valid = this.listener ? this.listener(event, { type: 'scroll', mode: this.overlayMode, valid: true }) : true;

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
                const isOutsideClicked = this.targetEl && !(this.targetEl.isSameNode(event.target) || this.targetEl.contains(event.target) || (this.contentEl && this.contentEl.contains(<Node>event.target)));
                const valid = this.listener ? this.listener(event, { type: 'outside', mode: this.overlayMode, valid: event.which !== 3 && isOutsideClicked }) : isOutsideClicked;

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
                const valid = this.listener ? this.listener(event, { type: 'resize', mode: this.overlayMode, valid: !DomHandler.isTouchDevice() }) : !DomHandler.isTouchDevice();

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
        this.hide(this.overlayEl, true);

        if (this.overlayEl) {
            DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
            ZIndexUtils.clear(this.overlayEl);
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
