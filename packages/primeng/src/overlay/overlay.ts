import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    InjectionToken,
    input,
    Input,
    NgModule,
    NgZone,
    Output,
    QueryList,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { absolutePosition, addClass, appendChild, focus, getOuterWidth, getTargetElement, isTouchDevice, relativePosition, removeClass } from '@primeuix/utils';
import { OverlayModeType, OverlayOnBeforeHideEvent, OverlayOnBeforeShowEvent, OverlayOnHideEvent, OverlayOnShowEvent, OverlayOptions, OverlayService, PrimeTemplate, ResponsiveOverlayOptions, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { VoidListener } from 'primeng/ts-helpers';
import { ObjectUtils, ZIndexUtils } from 'primeng/utils';
import { OverlayStyle } from './style/overlaystyle';

const OVERLAY_INSTANCE = new InjectionToken<Overlay>('OVERLAY_INSTANCE');

/**
 * This API allows overlay components to be controlled from the PrimeNG. In this way, all overlay components in the application can have the same behavior.
 * @group Components
 */
@Component({
    selector: 'p-overlay',
    standalone: true,
    imports: [CommonModule, SharedModule, Bind],
    hostDirectives: [Bind],
    template: `
        <div *ngIf="modalVisible" #overlay [class]="cn(cx('root'), styleClass)" [pBind]="ptm('root')" (click)="onOverlayClick()">
            @if (visible) {
                <div
                    #content
                    [class]="cn(cx('content'), contentStyleClass)"
                    [pBind]="ptm('content')"
                    (click)="onOverlayContentClick($event)"
                    [animate.enter]="enterAnimation"
                    [animate.leave]="leaveAnimation"
                    (animationstart)="handleAnimationStart($event)"
                    (animationend)="handleAnimationEnd($event)"
                >
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OverlayStyle, { provide: OVERLAY_INSTANCE, useExisting: Overlay }, { provide: PARENT_INSTANCE, useExisting: Overlay }]
})
export class Overlay extends BaseComponent {
    $pcOverlay: Overlay | undefined = inject(OVERLAY_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    @Input() hostName: string = '';
    /**
     * Enter animation class name.
     * @group Props
     */
    @Input() enterAnimation: string = 'p-overlay-enter';
    /**
     * Leave animation class name.
     * @group Props
     */
    @Input() leaveAnimation: string = 'p-overlay-leave';

    /**
     * The visible property is an input that determines the visibility of the component.
     * @defaultValue false
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;

        if (this._visible && !this.modalVisible) {
            this.modalVisible = true;
        }
    }
    /**
     * The mode property is an input that determines the overlay mode type or string.
     * @defaultValue null
     * @group Props
     */
    @Input() get mode(): OverlayModeType | string {
        return this._mode || this.overlayOptions?.mode;
    }
    set mode(value: OverlayModeType | string) {
        this._mode = value;
    }
    /**
     * The style property is an input that determines the style object for the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get style(): { [klass: string]: any } | null | undefined {
        return ObjectUtils.merge(this._style, this.modal ? this.overlayResponsiveOptions?.style : this.overlayOptions?.style);
    }
    set style(value: { [klass: string]: any } | null | undefined) {
        this._style = value;
    }
    /**
     * The styleClass property is an input that determines the CSS class(es) for the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get styleClass(): string {
        return ObjectUtils.merge(this._styleClass, this.modal ? this.overlayResponsiveOptions?.styleClass : this.overlayOptions?.styleClass);
    }
    set styleClass(value: string) {
        this._styleClass = value;
    }
    /**
     * The contentStyle property is an input that determines the style object for the content of the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get contentStyle(): { [klass: string]: any } | null | undefined {
        return ObjectUtils.merge(this._contentStyle, this.modal ? this.overlayResponsiveOptions?.contentStyle : this.overlayOptions?.contentStyle);
    }
    set contentStyle(value: { [klass: string]: any } | null | undefined) {
        this._contentStyle = value;
    }
    /**
     * The contentStyleClass property is an input that determines the CSS class(es) for the content of the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get contentStyleClass(): string {
        return ObjectUtils.merge(this._contentStyleClass, this.modal ? this.overlayResponsiveOptions?.contentStyleClass : this.overlayOptions?.contentStyleClass);
    }
    set contentStyleClass(value: string) {
        this._contentStyleClass = value;
    }
    /**
     * The target property is an input that specifies the target element or selector for the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get target(): string | null | undefined {
        const value = this._target || this.overlayOptions?.target;
        return value === undefined ? '@prev' : value;
    }
    set target(value: string | null | undefined) {
        this._target = value;
    }
    /**
     * The autoZIndex determines whether to automatically manage layering. Its default value is 'false'.
     * @defaultValue false
     * @group Props
     */
    @Input() get autoZIndex(): boolean {
        const value = this._autoZIndex || this.overlayOptions?.autoZIndex;
        return value === undefined ? true : value;
    }
    set autoZIndex(value: boolean) {
        this._autoZIndex = value;
    }
    /**
     * The baseZIndex is base zIndex value to use in layering.
     * @defaultValue null
     * @group Props
     */
    @Input() get baseZIndex(): number {
        const value = this._baseZIndex || this.overlayOptions?.baseZIndex;
        return value === undefined ? 0 : value;
    }
    set baseZIndex(value: number) {
        this._baseZIndex = value;
    }
    /**
     * Transition options of the show or hide animation.
     * @defaultValue .12s cubic-bezier(0, 0, 0.2, 1)
     * @group Props
     */
    @Input() get showTransitionOptions(): string {
        const value = this._showTransitionOptions || this.overlayOptions?.showTransitionOptions;
        return value === undefined ? '.12s cubic-bezier(0, 0, 0.2, 1)' : value;
    }
    set showTransitionOptions(value: string) {
        this._showTransitionOptions = value;
    }
    /**
     * The hideTransitionOptions property is an input that determines the CSS transition options for hiding the component.
     * @defaultValue .1s linear
     * @group Props
     */
    @Input() get hideTransitionOptions(): string {
        const value = this._hideTransitionOptions || this.overlayOptions?.hideTransitionOptions;
        return value === undefined ? '.1s linear' : value;
    }
    set hideTransitionOptions(value: string) {
        this._hideTransitionOptions = value;
    }
    /**
     * The listener property is an input that specifies the listener object for the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get listener(): any {
        return this._listener || this.overlayOptions?.listener;
    }
    set listener(value: any) {
        this._listener = value;
    }
    /**
     * It is the option used to determine in which mode it should appear according to the given media or breakpoint.
     * @defaultValue null
     * @group Props
     */
    @Input() get responsive(): ResponsiveOverlayOptions | undefined {
        return this._responsive || this.overlayOptions?.responsive;
    }
    set responsive(val: ResponsiveOverlayOptions | undefined) {
        this._responsive = val;
    }
    /**
     * The options property is an input that specifies the overlay options for the component.
     * @defaultValue null
     * @group Props
     */
    @Input() get options(): OverlayOptions | undefined {
        return this._options;
    }
    set options(val: OverlayOptions | undefined) {
        this._options = val;
    }
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>(undefined);
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {Boolean} boolean - Value of visibility as boolean.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Callback to invoke before the overlay is shown.
     * @param {OverlayOnBeforeShowEvent} event - Custom overlay before show event.
     * @group Emits
     */
    @Output() onBeforeShow: EventEmitter<OverlayOnBeforeShowEvent> = new EventEmitter<OverlayOnBeforeShowEvent>();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {OverlayOnShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    @Output() onShow: EventEmitter<OverlayOnShowEvent> = new EventEmitter<OverlayOnShowEvent>();
    /**
     * Callback to invoke before the overlay is hidden.
     * @param {OverlayOnBeforeHideEvent} event - Custom overlay before hide event.
     * @group Emits
     */
    @Output() onBeforeHide: EventEmitter<OverlayOnBeforeHideEvent> = new EventEmitter<OverlayOnBeforeHideEvent>();
    /**
     * Callback to invoke when the overlay is hidden
     * @param {OverlayOnHideEvent} event - Custom hide event.
     * @group Emits
     */
    @Output() onHide: EventEmitter<OverlayOnHideEvent> = new EventEmitter<OverlayOnHideEvent>();
    /**
     * Callback to invoke when the animation is started.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    @Output() onAnimationStart: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();
    /**
     * Callback to invoke when the animation is done.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    @Output() onAnimationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    @ViewChild('overlay') overlayViewChild: ElementRef | undefined;

    @ViewChild('content') contentViewChild: ElementRef | undefined;
    /**
     * Content template of the component.
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<any> | undefined;

    hostAttrSelector = input<string>();

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    _contentTemplate: TemplateRef<any> | undefined;

    _visible: boolean = false;

    _mode: OverlayModeType | string;

    _style: { [klass: string]: any } | null | undefined;

    _styleClass: string | undefined;

    _contentStyle: { [klass: string]: any } | null | undefined;

    _contentStyleClass: string | undefined;

    _target: any;

    _autoZIndex: boolean | undefined;

    _baseZIndex: number | undefined;

    _showTransitionOptions: string | undefined;

    _hideTransitionOptions: string | undefined;

    _listener: any;

    _responsive: ResponsiveOverlayOptions | undefined;

    _options: OverlayOptions | undefined;

    modalVisible: boolean = false;

    isOverlayClicked: boolean = false;

    isOverlayContentClicked: boolean = false;

    scrollHandler: any;

    documentClickListener: any;

    documentResizeListener: any;

    _componentStyle = inject(OverlayStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    private documentKeyboardListener: VoidListener;

    private window: Window | null;

    protected transformOptions: any = {
        default: 'scaleY(0.8)',
        center: 'scale(0.7)',
        top: 'translate3d(0px, -100%, 0px)',
        'top-start': 'translate3d(0px, -100%, 0px)',
        'top-end': 'translate3d(0px, -100%, 0px)',
        bottom: 'translate3d(0px, 100%, 0px)',
        'bottom-start': 'translate3d(0px, 100%, 0px)',
        'bottom-end': 'translate3d(0px, 100%, 0px)',
        left: 'translate3d(-100%, 0px, 0px)',
        'left-start': 'translate3d(-100%, 0px, 0px)',
        'left-end': 'translate3d(-100%, 0px, 0px)',
        right: 'translate3d(100%, 0px, 0px)',
        'right-start': 'translate3d(100%, 0px, 0px)',
        'right-end': 'translate3d(100%, 0px, 0px)'
    };

    get modal() {
        if (isPlatformBrowser(this.platformId)) {
            return this.mode === 'modal' || (this.overlayResponsiveOptions && this.document.defaultView?.matchMedia(this.overlayResponsiveOptions.media?.replace('@media', '') || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches);
        }
    }

    get overlayMode() {
        return this.mode || (this.modal ? 'modal' : 'overlay');
    }

    get overlayOptions(): OverlayOptions {
        return { ...this.config?.overlayOptions, ...this.options }; // TODO: Improve performance
    }

    get overlayResponsiveOptions(): ResponsiveOverlayOptions {
        return { ...this.overlayOptions?.responsive, ...this.responsive }; // TODO: Improve performance
    }

    get overlayResponsiveDirection() {
        return this.overlayResponsiveOptions?.direction || 'center';
    }

    get overlayEl() {
        return this.overlayViewChild?.nativeElement;
    }

    get contentEl() {
        return this.contentViewChild?.nativeElement;
    }

    get targetEl() {
        return <any>getTargetElement(this.target, this.el?.nativeElement);
    }

    constructor(
        public overlayService: OverlayService,
        private zone: NgZone
    ) {
        super();
    }

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;
                // TODO: new template types may be added.
                default:
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    show(overlay?: HTMLElement, isFocus: boolean = false) {
        this.onVisibleChange(true);
        this.handleEvents('onShow', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });

        isFocus && focus(this.targetEl);
        this.modal && addClass(this.document?.body, 'p-overflow-hidden');
    }

    hide(overlay?: HTMLElement, isFocus: boolean = false) {
        if (!this.visible) {
            return;
        } else {
            this.onVisibleChange(false);
            this.handleEvents('onHide', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });
            isFocus && focus(this.targetEl as any);
            this.modal && removeClass(this.document?.body, 'p-overflow-hidden');
        }
    }

    onVisibleChange(visible: boolean) {
        this._visible = visible;
        this.visibleChange.emit(visible);
    }

    onOverlayClick() {
        this.isOverlayClicked = true;
    }

    onOverlayContentClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.targetEl
        });

        this.isOverlayContentClicked = true;
    }

    container = signal<any>(undefined);

    handleAnimationStart(event: AnimationEvent) {
        if (this.visible && !this.container()) {
            this.onOverlayEnter(event);
        }
    }

    handleAnimationEnd(event: AnimationEvent) {
        if (!this.visible && this.container()) {
            this.onOverlayLeave(event);
        }
    }

    onOverlayEnter(event: AnimationEvent) {
        this.handleEvents('onBeforeShow', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });
        this.container.set(this.overlayEl || event.target);
        this.show(this.overlayEl, true);
        this.hostAttrSelector() && this.overlayEl && this.overlayEl.setAttribute(this.hostAttrSelector(), '');
        this.appendOverlay();
        this.alignOverlay();
        this.setZIndex();
        this.bindListeners();

        setTimeout(() => {
            this.overlayEl.style.visibility = 'visible';
        }, 1);

        this.handleEvents('onAnimationStart', event);
    }

    setZIndex() {
        if (this.autoZIndex) {
            ZIndexUtils.set(this.overlayMode, this.overlayEl, this.baseZIndex + this.config?.zIndex[this.overlayMode]);
        }
    }

    appendOverlay() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') {
                appendChild(this.document.body, this.overlayEl);
            } else {
                appendChild(this.$appendTo(), this.overlayEl);
            }
        }
    }

    alignOverlay() {
        if (!this.modal) {
            if (this.overlayEl && this.targetEl) {
                this.overlayEl.style.minWidth = getOuterWidth(this.targetEl) + 'px';
                if (this.$appendTo() === 'self') {
                    relativePosition(this.overlayEl, this.targetEl);
                } else {
                    absolutePosition(this.overlayEl, this.targetEl);
                }
            }
        }
    }

    onOverlayLeave(event: AnimationEvent) {
        this.handleEvents('onBeforeHide', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });
        this.hide(this.overlayEl, true);
        this.modalVisible = false;
        this.unbindListeners();
        this.appendOverlay();
        ZIndexUtils.clear(this.overlayEl);
        this.container.set(null);
        this.cd.markForCheck();
        this.handleEvents('onAnimationDone', event);
    }

    handleEvents(name: string, params: any) {
        (this as any)[name].emit(params);
        this.options && (this.options as any)[name] && (this.options as any)[name](params);
        this.config?.overlayOptions && (this.config?.overlayOptions as any)[name] && (this.config?.overlayOptions as any)[name](params);
    }

    bindListeners() {
        this.bindScrollListener();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindDocumentKeyboardListener();
    }

    unbindListeners() {
        this.unbindScrollListener();
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindDocumentKeyboardListener();
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl, (event: any) => {
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
                const isTargetClicked = this.targetEl && ((this.targetEl as any).isSameNode(event.target) || (!this.isOverlayClicked && (this.targetEl as any).contains(event.target)));
                const isOutsideClicked = !isTargetClicked && !this.isOverlayContentClicked;
                const valid = this.listener ? this.listener(event, { type: 'outside', mode: this.overlayMode, valid: event.which !== 3 && isOutsideClicked }) : isOutsideClicked;

                valid && this.hide(event);
                this.isOverlayClicked = this.isOverlayContentClicked = false;
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
            this.documentResizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                const valid = this.listener ? this.listener(event, { type: 'resize', mode: this.overlayMode, valid: !isTouchDevice() }) : !isTouchDevice();

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

    bindDocumentKeyboardListener(): void {
        if (this.documentKeyboardListener) {
            return;
        }

        this.zone.runOutsideAngular(() => {
            this.documentKeyboardListener = this.renderer.listen(this.document.defaultView, 'keydown', (event) => {
                if (this.overlayOptions.hideOnEscape === false || event.code !== 'Escape') {
                    return;
                }

                const valid = this.listener ? this.listener(event, { type: 'keydown', mode: this.overlayMode, valid: !isTouchDevice() }) : !isTouchDevice();

                if (valid) {
                    this.zone.run(() => {
                        this.hide(event, true);
                    });
                }
            });
        });
    }

    unbindDocumentKeyboardListener(): void {
        if (this.documentKeyboardListener) {
            this.documentKeyboardListener();
            this.documentKeyboardListener = null;
        }
    }

    onDestroy() {
        this.hide(this.overlayEl, true);

        if (this.overlayEl && this.$appendTo() !== 'self') {
            this.renderer.appendChild(this.el.nativeElement, this.overlayEl);
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
    imports: [Overlay, SharedModule],
    exports: [Overlay, SharedModule]
})
export class OverlayModule {}
