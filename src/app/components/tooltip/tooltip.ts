import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, Input, NgZone, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils'
import { PrimeNGConfig } from 'primeng/api';

export interface TooltipOptions {
    tooltipLabel?: string;
    tooltipPosition?: string;
    tooltipEvent?: string;
    appendTo?: any;
    positionStyle?: string;
    tooltipStyleClass?: string;
    tooltipZIndex?: string;
    escape?: boolean;
    disabled?: boolean;
    showDelay?: number;
    hideDelay?: number;
    positionTop?: number;
    positionLeft?: number;
    life?: number;
}

@Directive({
    selector: '[pTooltip]',
    host: {
        'class': 'p-element'
    }
})
export class Tooltip implements AfterViewInit, OnDestroy {

    @Input() tooltipPosition: string;

    @Input() tooltipEvent: string;

    @Input() appendTo: any;

    @Input() positionStyle: string;

    @Input() tooltipStyleClass: string;

    @Input() tooltipZIndex: string;

    @Input() escape: boolean = true;

    @Input() showDelay: number;

    @Input() hideDelay: number;

    @Input() life: number;

    @Input() positionTop: number;

    @Input() positionLeft: number;

    @Input('pTooltip') text: string;

    @Input("tooltipDisabled") get disabled(): boolean {
        return this._disabled;
    }
    set disabled(val:boolean) {
        this._disabled = val;
        this.deactivate();
    }

    @Input() tooltipOptions: TooltipOptions;

    _tooltipOptions: TooltipOptions = {
        tooltipPosition: 'right',
        tooltipEvent: 'hover',
        appendTo: 'body',
        tooltipZIndex: 'auto',
        escape: false,
        positionTop: 0,
        positionLeft: 0
    }

    _disabled: boolean;

    container: any;

    styleClass: string;

    tooltipText: any;

    showTimeout: any;

    hideTimeout: any;

    active: boolean;

    mouseEnterListener: Function;

    mouseLeaveListener: Function;

    clickListener: Function;

    focusListener: Function;

    blurListener: Function;

    scrollHandler: any;

    resizeListener: any;

    constructor(public el: ElementRef, public zone: NgZone, public config: PrimeNGConfig) { }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            if (this.getOption('tooltipEvent') === 'hover') {
                this.mouseEnterListener = this.onMouseEnter.bind(this);
                this.mouseLeaveListener = this.onMouseLeave.bind(this);
                this.clickListener = this.onClick.bind(this);
                this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
                this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
                this.el.nativeElement.addEventListener('click', this.clickListener);
            }
            else if (this.getOption('tooltipEvent') === 'focus') {
                this.focusListener = this.onFocus.bind(this);
                this.blurListener = this.onBlur.bind(this);
                this.el.nativeElement.addEventListener('focus', this.focusListener);
                this.el.nativeElement.addEventListener('blur', this.blurListener);
            }
        });
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.tooltipPosition) {
            this.setOption({tooltipPosition: simpleChange.tooltipPosition.currentValue});
        }

        if (simpleChange.tooltipEvent) {
            this.setOption({tooltipEvent: simpleChange.tooltipEvent.currentValue});
        }

        if (simpleChange.appendTo) {
            this.setOption({appendTo: simpleChange.appendTo.currentValue});
        }

        if (simpleChange.positionStyle) {
            this.setOption({positionStyle: simpleChange.positionStyle.currentValue});
        }

        if (simpleChange.tooltipStyleClass) {
            this.setOption({tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue});
        }

        if (simpleChange.tooltipZIndex) {
            this.setOption({tooltipZIndex: simpleChange.tooltipZIndex.currentValue});
        }

        if (simpleChange.escape) {
            this.setOption({escape: simpleChange.escape.currentValue});
        }

        if (simpleChange.showDelay) {
            this.setOption({showDelay: simpleChange.showDelay.currentValue});
        }

        if (simpleChange.hideDelay) {
            this.setOption({hideDelay: simpleChange.hideDelay.currentValue});
        }

        if (simpleChange.life) {
            this.setOption({life: simpleChange.life.currentValue});
        }

        if (simpleChange.positionTop) {
            this.setOption({positionTop: simpleChange.positionTop.currentValue});
        }

        if (simpleChange.positionLeft) {
            this.setOption({positionLeft: simpleChange.positionLeft.currentValue});
        }

        if (simpleChange.disabled) {
            this.setOption({disabled: simpleChange.disabled.currentValue});
        }

        if (simpleChange.text) {
            this.setOption({tooltipLabel: simpleChange.text.currentValue});

            if (this.active) {
                if (simpleChange.text.currentValue) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }

        if (simpleChange.tooltipOptions) {
            this._tooltipOptions = {...this._tooltipOptions, ...simpleChange.tooltipOptions.currentValue};
            this.deactivate();

            if (this.active) {
                if (this.getOption('tooltipLabel')) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }
    }

    onMouseEnter(e: Event) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    }

    onMouseLeave(e: Event) {
        this.deactivate();
    }

    onFocus(e: Event) {
        this.activate();
    }

    onBlur(e: Event) {
        this.deactivate();
    }

    onClick(e: Event) {
        this.deactivate();
    }

    activate() {
        this.active = true;
        this.clearHideTimeout();

        if (this.getOption('showDelay'))
            this.showTimeout = setTimeout(() => { this.show() }, this.getOption('showDelay'));
        else
            this.show();

        if (this.getOption('life')) {
            let duration = this.getOption('showDelay') ? this.getOption('life') + this.getOption('showDelay') : this.getOption('life');
            this.hideTimeout = setTimeout(() => { this.hide() }, duration);
        }
    }

    deactivate() {
        this.active = false;
        this.clearShowTimeout();

        if (this.getOption('hideDelay')) {
            this.clearHideTimeout();    //life timeout
            this.hideTimeout = setTimeout(() => { this.hide() }, this.getOption('hideDelay'));
        }
        else {
            this.hide();
        }
    }

    create() {
        if (this.container) {
            this.clearHideTimeout();
            this.remove();
        }

        this.container = document.createElement('div');

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

        if (this.getOption('appendTo') === 'body')
            document.body.appendChild(this.container);
        else if (this.getOption('appendTo') === 'target')
            DomHandler.appendChild(this.container, this.el.nativeElement);
        else
            DomHandler.appendChild(this.container, this.getOption('appendTo'));

        this.container.style.display = 'inline-block';
    }

    show() {
        if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
            return;
        }

        this.create();
        this.align();
        DomHandler.fadeIn(this.container, 250);

        if (this.getOption('tooltipZIndex') === 'auto')
            ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
        else
            this.container.style.zIndex = this.getOption('tooltipZIndex');

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
        if (this.getOption('escape')) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this.getOption('tooltipLabel')));
        }
        else {
            this.tooltipText.innerHTML = this.getOption('tooltipLabel');
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
        }
        else {
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

    setOption(option: TooltipOptions) {
        this._tooltipOptions = {...this._tooltipOptions, ...option}
    }

    getOption(option: string) {
        return this._tooltipOptions[option];
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

        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
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
        }
        else if (this.getOption('tooltipEvent') === 'focus') {
            this.el.nativeElement.removeEventListener('focus', this.focusListener);
            this.el.nativeElement.removeEventListener('blur', this.blurListener);
        }

        this.unbindDocumentResizeListener();
    }

    remove() {
        if (this.container && this.container.parentElement) {
            if (this.getOption('appendTo') === 'body')
                document.body.removeChild(this.container);
            else if (this.getOption('appendTo') === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                DomHandler.removeChild(this.container, this.getOption('appendTo'));
        }

        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
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
export class TooltipModule { }
