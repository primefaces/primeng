import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Input, NgModule, NgZone, OnDestroy, PLATFORM_ID, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeNGConfig, TooltipOptions } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { Nullable } from 'primeng/ts-helpers';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';

/**
 * Tooltip directive provides advisory information for a component.
 * @group Components
 */
@Directive({
    selector: '[pTooltip]',
    host: {
        class: 'p-element'
    }
})
export class Tooltip implements AfterViewInit, OnDestroy {
    /**
     * Position of the tooltip.
     * @group Props
     */
    @Input() tooltipPosition: 'right' | 'left' | 'top' | 'bottom' | string | undefined;
    /**
     * Event to show the tooltip.
     * @group Props
     */
    @Input() tooltipEvent: 'hover' | 'focus' | string | any = 'hover';
    /**
     *  Target element to attach the overlay, valid values are "body", "target" or a local ng-F variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Type of CSS position.
     * @group Props
     */
    @Input() positionStyle: string | undefined;
    /**
     * Style class of the tooltip.
     * @group Props
     */
    @Input() tooltipStyleClass: string | undefined;
    /**
     * Whether the z-index should be managed automatically to always go on top or have a fixed value.
     * @group Props
     */
    @Input() tooltipZIndex: string | undefined;
    /**
     * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) escape: boolean = true;
    /**
     * Delay to show the tooltip in milliseconds.
     * @group Props
     */
    @Input({ transform: numberAttribute }) showDelay: number | undefined;
    /**
     * Delay to hide the tooltip in milliseconds.
     * @group Props
     */
    @Input({ transform: numberAttribute }) hideDelay: number | undefined;
    /**
     * Time to wait in milliseconds to hide the tooltip even it is active.
     * @group Props
     */
    @Input({ transform: numberAttribute }) life: number | undefined;
    /**
     * Specifies the additional vertical offset of the tooltip from its default position.
     * @group Props
     */
    @Input({ transform: numberAttribute }) positionTop: number | undefined;
    /**
     * Specifies the additional horizontal offset of the tooltip from its default position.
     * @group Props
     */
    @Input({ transform: numberAttribute }) positionLeft: number | undefined;
    /**
     * Whether to hide tooltip when hovering over tooltip content.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoHide: boolean = true;
    /**
     * Automatically adjusts the element position when there is not enough space on the selected position.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fitContent: boolean = true;
    /**
     * Whether to hide tooltip on escape key press.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) hideOnEscape: boolean = true;
    /**
     * Content of the tooltip.
     * @group Props
     */
    @Input('pTooltip') content: string | TemplateRef<HTMLElement> | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     * @group Props
     */
    @Input('tooltipDisabled') get disabled(): boolean {
        return this._disabled as boolean;
    }
    set disabled(val: boolean) {
        this._disabled = val;
        this.deactivate();
    }
    /**
     * Specifies the tooltip configuration options for the component.
     * @group Props
     */
    @Input() tooltipOptions: TooltipOptions | undefined;

    _tooltipOptions = {
        tooltipLabel: null,
        tooltipPosition: 'right',
        tooltipEvent: 'hover',
        appendTo: 'body',
        positionStyle: null,
        tooltipStyleClass: null,
        tooltipZIndex: 'auto',
        escape: true,
        disabled: null,
        showDelay: null,
        hideDelay: null,
        positionTop: null,
        positionLeft: null,
        life: null,
        autoHide: true,
        hideOnEscape: true,
        id: UniqueComponentId() + '_tooltip'
    };

    _disabled: boolean | undefined;

    container: any;

    styleClass: string | undefined;

    tooltipText: any;

    showTimeout: any;

    hideTimeout: any;

    active: boolean | undefined;

    mouseEnterListener: Nullable<Function>;

    mouseLeaveListener: Nullable<Function>;

    containerMouseleaveListener: Nullable<Function>;

    clickListener: Nullable<Function>;

    focusListener: Nullable<Function>;

    blurListener: Nullable<Function>;

    scrollHandler: any;

    resizeListener: any;

    constructor(@Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public zone: NgZone, public config: PrimeNGConfig, private renderer: Renderer2, private viewContainer: ViewContainerRef) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                if (this.getOption('tooltipEvent') === 'hover') {
                    this.mouseEnterListener = this.onMouseEnter.bind(this);
                    this.mouseLeaveListener = this.onMouseLeave.bind(this);
                    this.clickListener = this.onInputClick.bind(this);
                    this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
                    this.el.nativeElement.addEventListener('click', this.clickListener);
                    this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
                } else if (this.getOption('tooltipEvent') === 'focus') {
                    this.focusListener = this.onFocus.bind(this);
                    this.blurListener = this.onBlur.bind(this);

                    let target = this.el.nativeElement.querySelector('.p-component');
                    if (!target) {
                        target = this.el.nativeElement;
                    }

                    target.addEventListener('focus', this.focusListener);
                    target.addEventListener('blur', this.blurListener);
                }
            });
        }
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.tooltipPosition) {
            this.setOption({ tooltipPosition: simpleChange.tooltipPosition.currentValue });
        }

        if (simpleChange.tooltipEvent) {
            this.setOption({ tooltipEvent: simpleChange.tooltipEvent.currentValue });
        }

        if (simpleChange.appendTo) {
            this.setOption({ appendTo: simpleChange.appendTo.currentValue });
        }

        if (simpleChange.positionStyle) {
            this.setOption({ positionStyle: simpleChange.positionStyle.currentValue });
        }

        if (simpleChange.tooltipStyleClass) {
            this.setOption({ tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue });
        }

        if (simpleChange.tooltipZIndex) {
            this.setOption({ tooltipZIndex: simpleChange.tooltipZIndex.currentValue });
        }

        if (simpleChange.escape) {
            this.setOption({ escape: simpleChange.escape.currentValue });
        }

        if (simpleChange.showDelay) {
            this.setOption({ showDelay: simpleChange.showDelay.currentValue });
        }

        if (simpleChange.hideDelay) {
            this.setOption({ hideDelay: simpleChange.hideDelay.currentValue });
        }

        if (simpleChange.life) {
            this.setOption({ life: simpleChange.life.currentValue });
        }

        if (simpleChange.positionTop) {
            this.setOption({ positionTop: simpleChange.positionTop.currentValue });
        }

        if (simpleChange.positionLeft) {
            this.setOption({ positionLeft: simpleChange.positionLeft.currentValue });
        }

        if (simpleChange.disabled) {
            this.setOption({ disabled: simpleChange.disabled.currentValue });
        }

        if (simpleChange.content) {
            this.setOption({ tooltipLabel: simpleChange.content.currentValue });

            if (this.active) {
                if (simpleChange.content.currentValue) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    } else {
                        this.show();
                    }
                } else {
                    this.hide();
                }
            }
        }

        if (simpleChange.autoHide) {
            this.setOption({ autoHide: simpleChange.autoHide.currentValue });
        }

        if (simpleChange.id) {
            this.setOption({ id: simpleChange.id.currentValue });
        }

        if (simpleChange.tooltipOptions) {
            this._tooltipOptions = { ...this._tooltipOptions, ...simpleChange.tooltipOptions.currentValue };
            this.deactivate();

            if (this.active) {
                if (this.getOption('tooltipLabel')) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    } else {
                        this.show();
                    }
                } else {
                    this.hide();
                }
            }
        }
    }

    isAutoHide(): boolean {
        return this.getOption('autoHide');
    }

    onMouseEnter(e: Event) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    }

    onMouseLeave(e: MouseEvent) {
        if (!this.isAutoHide()) {
            const valid = DomHandler.hasClass(e.relatedTarget, 'p-tooltip') || DomHandler.hasClass(e.relatedTarget, 'p-tooltip-text') || DomHandler.hasClass(e.relatedTarget, 'p-tooltip-arrow');
            !valid && this.deactivate();
        } else {
            this.deactivate();
        }
    }

    onFocus(e: Event) {
        this.activate();
    }

    onBlur(e: Event) {
        this.deactivate();
    }

    onInputClick(e: Event) {
        this.deactivate();
    }

    @HostListener('document:keydown.escape', ['$event'])
    onPressEscape() {
        if (this.hideOnEscape) {
            this.deactivate();
        }
    }

    activate() {
        this.active = true;
        this.clearHideTimeout();

        if (this.getOption('showDelay'))
            this.showTimeout = setTimeout(() => {
                this.show();
            }, this.getOption('showDelay'));
        else this.show();

        if (this.getOption('life')) {
            let duration = this.getOption('showDelay') ? this.getOption('life') + this.getOption('showDelay') : this.getOption('life');
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, duration);
        }
    }

    deactivate() {
        this.active = false;
        this.clearShowTimeout();

        if (this.getOption('hideDelay')) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, this.getOption('hideDelay'));
        } else {
            this.hide();
        }
    }

    create() {
        if (this.container) {
            this.clearHideTimeout();
            this.remove();
        }

        this.container = document.createElement('div');
        this.container.setAttribute('id', this.getOption('id'));
        this.container.setAttribute('role', 'tooltip');

        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'p-tooltip-arrow';
        this.container.appendChild(tooltipArrow);

        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'p-tooltip-text';

        this.updateText();

        if (this.getOption('positionStyle')) {
            this.container.style.position = this.getOption('positionStyle');
        }

        this.container.appendChild(this.tooltipText);

        if (this.getOption('appendTo') === 'body') document.body.appendChild(this.container);
        else if (this.getOption('appendTo') === 'target') DomHandler.appendChild(this.container, this.el.nativeElement);
        else DomHandler.appendChild(this.container, this.getOption('appendTo'));

        this.container.style.display = 'inline-block';

        if (this.fitContent) {
            this.container.style.width = 'fit-content';
        }

        if (this.isAutoHide()) {
            this.container.style.pointerEvents = 'none';
        } else {
            this.container.style.pointerEvents = 'unset';
            this.bindContainerMouseleaveListener();
        }
    }

    bindContainerMouseleaveListener() {
        if (!this.containerMouseleaveListener) {
            const targetEl: any = this.container ?? this.container.nativeElement;

            this.containerMouseleaveListener = this.renderer.listen(targetEl, 'mouseleave', (e) => {
                this.deactivate();
            });
        }
    }

    unbindContainerMouseleaveListener() {
        if (this.containerMouseleaveListener) {
            this.bindContainerMouseleaveListener();
            this.containerMouseleaveListener = null;
        }
    }

    show() {
        if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
            return;
        }

        this.create();
        this.align();
        DomHandler.fadeIn(this.container, 250);

        if (this.getOption('tooltipZIndex') === 'auto') ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
        else this.container.style.zIndex = this.getOption('tooltipZIndex');

        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }

    hide() {
        if (this.getOption('tooltipZIndex') === 'auto') {
            ZIndexUtils.clear(this.container);
        }

        this.remove();
    }

    updateText() {
        const content = this.getOption('tooltipLabel');
        if (content instanceof TemplateRef) {
            const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
            embeddedViewRef.detectChanges();
            embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
        } else if (this.getOption('escape')) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(content));
        } else {
            this.tooltipText.innerHTML = content;
        }
    }

    align() {
        let position = this.getOption('tooltipPosition');

        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignRight();

                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;

            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignRight();

                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;

            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();

                    if (this.isOutOfBounds()) {
                        this.alignTop();

                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;

            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();

                    if (this.isOutOfBounds()) {
                        this.alignTop();

                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    }

    getHostOffset() {
        if (this.getOption('appendTo') === 'body' || this.getOption('appendTo') === 'target') {
            let offset = this.el.nativeElement.getBoundingClientRect();
            let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
            let targetTop = offset.top + DomHandler.getWindowScrollTop();

            return { left: targetLeft, top: targetTop };
        } else {
            return { left: 0, top: 0 };
        }
    }

    alignRight() {
        this.preAlign('right');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }

    alignLeft() {
        this.preAlign('left');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left - DomHandler.getOuterWidth(this.container);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }

    alignTop() {
        this.preAlign('top');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top - DomHandler.getOuterHeight(this.container);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }

    alignBottom() {
        this.preAlign('bottom');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }

    setOption(option: any) {
        this._tooltipOptions = { ...this._tooltipOptions, ...option };
    }

    getOption(option: string) {
        return this._tooltipOptions[option as keyof typeof this.tooltipOptions];
    }

    getTarget(el: Element) {
        return DomHandler.hasClass(el, 'p-inputwrapper') ? DomHandler.findSingle(el, 'input') : el;
    }

    preAlign(position: string) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';

        let defaultClassName = 'p-tooltip p-component p-tooltip-' + position;
        this.container.className = this.getOption('tooltipStyleClass') ? defaultClassName + ' ' + this.getOption('tooltipStyleClass') : defaultClassName;
    }

    isOutOfBounds(): boolean {
        let offset = this.container.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = DomHandler.getOuterWidth(this.container);
        let height = DomHandler.getOuterHeight(this.container);
        let viewport = DomHandler.getViewport();

        return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    }

    onWindowResize(e: Event) {
        this.hide();
    }

    bindDocumentResizeListener() {
        this.zone.runOutsideAngular(() => {
            this.resizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.resizeListener);
        });
    }

    unbindDocumentResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (this.container) {
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

    unbindEvents() {
        if (this.getOption('tooltipEvent') === 'hover') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        } else if (this.getOption('tooltipEvent') === 'focus') {
            let target = this.el.nativeElement.querySelector('.p-component');

            if (!target) {
                target = this.el.nativeElement;
            }

            target.removeEventListener('focus', this.focusListener);
            target.removeEventListener('blur', this.blurListener);
        }

        this.unbindDocumentResizeListener();
    }

    remove() {
        if (this.container && this.container.parentElement) {
            if (this.getOption('appendTo') === 'body') document.body.removeChild(this.container);
            else if (this.getOption('appendTo') === 'target') this.el.nativeElement.removeChild(this.container);
            else DomHandler.removeChild(this.container, this.getOption('appendTo'));
        }

        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.unbindContainerMouseleaveListener();
        this.clearTimeouts();
        this.container = null;
        this.scrollHandler = null;
    }

    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }

    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    clearTimeouts() {
        this.clearShowTimeout();
        this.clearHideTimeout();
    }

    ngOnDestroy() {
        this.unbindEvents();

        if (this.container) {
            ZIndexUtils.clear(this.container);
        }

        this.remove();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Tooltip],
    declarations: [Tooltip]
})
export class TooltipModule {}

