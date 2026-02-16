import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    HostListener,
    inject,
    InjectionToken,
    input,
    linkedSignal,
    model,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { addClass, find, findSingle, focus, getAttribute, removeClass, setAttribute, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { blockBodyScroll, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, TimesIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { VoidListener } from 'primeng/ts-helpers';
import type { CSSProperties } from 'primeng/types/shared';
import type { GalleriaCaptionTemplateContext, GalleriaIndicatorTemplateContext, GalleriaItemTemplateContext, GalleriaPassThrough, GalleriaPosition, GalleriaResponsiveOptions, GalleriaThumbnailTemplateContext } from 'primeng/types/galleria';
import { ZIndexUtils } from 'primeng/utils';
import { GalleriaStyle } from './style/galleriastyle';

const GALLERIA_INSTANCE = new InjectionToken<Galleria>('GALLERIA_INSTANCE');

@Component({
    selector: 'div[pGalleriaItemSlot]',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        @if (shouldRender()) {
            <ng-container [ngTemplateOutlet]="contentTemplate()" [ngTemplateOutletContext]="context()"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaItemSlot extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    index = input<number>();

    item = input<any>();

    type = input<string>();

    galleria = inject(Galleria);

    $pcGalleria: Galleria | undefined = inject(GALLERIA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    contentTemplate = computed(() => {
        const type = this.type();
        switch (type) {
            case 'item':
                return this.galleria.itemTemplate();
            case 'caption':
                return this.galleria.captionTemplate();
            case 'thumbnail':
                return this.galleria.thumbnailTemplate();
            case 'indicator':
                return this.galleria.indicatorTemplate();
            case 'footer':
                return this.galleria.footerTemplate();
            case 'header':
                return this.galleria.headerTemplate();
            default:
                return this.galleria.itemTemplate();
        }
    });

    context = computed(() => {
        const type = this.type();
        if (type === 'indicator') {
            return { $implicit: this.index() };
        }
        return { $implicit: this.item() };
    });

    shouldRender() {
        return !!this.contentTemplate();
    }
}

@Component({
    selector: 'div[pGalleriaItem]',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule, ChevronLeftIcon, ChevronRightIcon, GalleriaItemSlot],
    template: `
        <div [pBind]="ptm('items')" [class]="cx('items')">
            @if (showItemNavigators()) {
                <button type="button" role="navigation" [pBind]="ptm('prevButton')" [class]="cx('prevButton')" (click)="navBackward($event)" (focus)="onButtonFocus('left')" (blur)="onButtonBlur('left')" data-pc-group-section="itemnavigator">
                    @if (!galleria.itemPreviousIconTemplate()) {
                        <svg data-p-icon="chevron-left" [pBind]="ptm('prevIcon')" [class]="cx('prevIcon')" />
                    }
                    <ng-template [ngTemplateOutlet]="galleria.itemPreviousIconTemplate()"></ng-template>
                </button>
            }
            <div
                pGalleriaItemSlot
                [pBind]="ptm('item')"
                [unstyled]="unstyled()"
                [class]="cx('item')"
                [item]="activeItem()"
                [id]="id() + '_item_' + _activeIndex()"
                role="group"
                [attr.aria-label]="ariaSlideNumber(_activeIndex() + 1)"
                [attr.aria-roledescription]="ariaSlideLabel()"
            ></div>
            @if (showItemNavigators()) {
                <button type="button" [pBind]="ptm('nextButton')" [class]="cx('nextButton')" (click)="navForward($event)" role="navigation" (focus)="onButtonFocus('right')" (blur)="onButtonBlur('right')" data-pc-group-section="itemnavigator">
                    @if (!galleria.itemNextIconTemplate()) {
                        <svg data-p-icon="chevron-right" [pBind]="ptm('nextIcon')" [class]="cx('nextIcon')" />
                    }
                    <ng-template [ngTemplateOutlet]="galleria.itemNextIconTemplate()"></ng-template>
                </button>
            }
            @if (galleria.captionTemplate()) {
                <div pGalleriaItemSlot [pBind]="ptm('caption')" [unstyled]="unstyled()" [class]="cx('caption')" type="caption" [item]="activeItem()"></div>
            }
        </div>
        @if (showIndicators()) {
            <ul [pBind]="ptm('indicatorList')" [class]="cx('indicatorList')">
                @for (item of value(); track item) {
                    <li
                        [pBind]="getIndicatorPTOptions($index)"
                        tabindex="0"
                        (click)="onIndicatorClick($index)"
                        (mouseenter)="onIndicatorMouseEnter($index)"
                        (keydown)="onIndicatorKeyDown($event, $index)"
                        [class]="cx('indicator', { index: $index })"
                        [attr.aria-label]="ariaPageLabel($index + 1)"
                        [attr.aria-selected]="_activeIndex() === $index"
                        [attr.aria-controls]="id() + '_item_' + $index"
                        [pBind]="ptm('indicator', getIndicatorPTOptions($index))"
                        [attr.data-p-active]="isIndicatorItemActive($index)"
                    >
                        @if (!galleria.indicatorTemplate()) {
                            <button type="button" tabIndex="-1" [pBind]="ptm('indicatorButton', getIndicatorPTOptions($index))" [class]="cx('indicatorButton')"></button>
                        } @else {
                            <div pGalleriaItemSlot type="indicator" [index]="$index" [pBind]="ptm('item')" [unstyled]="unstyled()"></div>
                        }
                    </li>
                }
            </ul>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GalleriaStyle],
    hostDirectives: [Bind]
})
export class GalleriaItem extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    galleria = inject(Galleria);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('itemsContainer'));
    }

    id = input<string>();

    circular = input(false, { transform: booleanAttribute });

    value = input<any[]>();

    showItemNavigators = input(false, { transform: booleanAttribute });

    showIndicators = input(true, { transform: booleanAttribute });

    slideShowActive = input(true, { transform: booleanAttribute });

    changeItemOnIndicatorHover = input(true, { transform: booleanAttribute });

    autoPlay = input(false, { transform: booleanAttribute });

    startSlideShow = output<void>();

    stopSlideShow = output<void>();

    onActiveIndexChange = output<number>();

    _componentStyle = inject(GalleriaStyle);

    _activeIndex = linkedSignal(() => this.activeIndexInput());

    activeItem = computed(() => {
        const val = this.value();
        return val && val[this._activeIndex()];
    });

    leftButtonFocused = false;

    rightButtonFocused = false;

    private get aria() {
        return this.galleria.config.translation.aria;
    }

    constructor() {
        super();

        // Handle autoPlay changes
        effect(() => {
            const auto = this.autoPlay();
            if (auto) {
                this.startSlideShow.emit();
            }
        });
    }

    activeIndexInput = input<number>(0, { alias: 'activeIndex' });

    getIndicatorPTOptions(index: number) {
        return this.ptm('indicator', {
            context: {
                highlighted: this._activeIndex() === index
            }
        });
    }

    next() {
        const val = this.value();
        const currentIndex = this._activeIndex();
        let nextItemIndex = currentIndex + 1;
        let activeIndex = this.circular() && val!.length - 1 === currentIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    prev() {
        const val = this.value();
        const currentIndex = this._activeIndex();
        let prevItemIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        let activeIndex = this.circular() && currentIndex === 0 ? val!.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    onButtonFocus(pos: 'left' | 'right') {
        if (pos === 'left') {
            this.leftButtonFocused = true;
        } else this.rightButtonFocused = true;
    }

    onButtonBlur(pos: 'left' | 'right') {
        if (pos === 'left') {
            this.leftButtonFocused = false;
        } else this.rightButtonFocused = false;
    }

    stopTheSlideShow() {
        if (this.slideShowActive()) {
            this.stopSlideShow.emit();
        }
    }

    navForward(e: MouseEvent) {
        this.stopTheSlideShow();
        this.next();

        if (e && e.cancelable) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    navBackward(e: MouseEvent) {
        this.stopTheSlideShow();
        this.prev();

        if (e && e.cancelable) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onIndicatorClick(index: number) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }

    onIndicatorMouseEnter(index: number) {
        if (this.changeItemOnIndicatorHover()) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }

    onIndicatorKeyDown(event: KeyboardEvent, index: number) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
                event.preventDefault();
                break;

            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                break;

            default:
                break;
        }
    }

    isNavForwardDisabled() {
        const val = this.value();
        return !this.circular() && this._activeIndex() === val!.length - 1;
    }

    isNavBackwardDisabled() {
        return !this.circular() && this._activeIndex() === 0;
    }

    isIndicatorItemActive(index: number) {
        return this._activeIndex() === index;
    }

    ariaSlideLabel() {
        return this.aria?.slide;
    }

    ariaSlideNumber(value: any) {
        return this.aria?.slideNumber?.replace(/{slideNumber}/g, value);
    }

    ariaPageLabel(value: any) {
        return this.aria?.pageLabel?.replace(/{page}/g, value);
    }
}

@Component({
    selector: 'div[pGalleriaThumbnails]',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule, Ripple, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, GalleriaItemSlot],
    template: `
        <div [pBind]="ptm('thumbnailContent')" [class]="cx('thumbnailContent')">
            @if (showThumbnailNavigators()) {
                <button type="button" [pBind]="ptm('thumbnailPrevButton')" [class]="cx('thumbnailPrevButton')" (click)="navBackward($event)" pRipple [attr.aria-label]="ariaPrevButtonLabel()" data-pc-group-section="thumbnailnavigator">
                    @if (!galleria.previousThumbnailIconTemplate()) {
                        @if (!isVertical()) {
                            <svg data-p-icon="chevron-left" [pBind]="ptm('thumbnailPrevIcon')" [class]="cx('thumbnailPrevIcon')" />
                        } @else {
                            <svg data-p-icon="chevron-up" [pBind]="ptm('thumbnailPrevIcon')" [class]="cx('thumbnailPrevIcon')" />
                        }
                    }
                    <ng-template [ngTemplateOutlet]="galleria.previousThumbnailIconTemplate()"></ng-template>
                </button>
            }
            <div [pBind]="ptm('thumbnailsViewport')" [class]="cx('thumbnailsViewport')" [style.height]="viewportHeight()">
                <div #itemsContainer [pBind]="ptm('thumbnailItems')" [class]="cx('thumbnailItems')" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                    @for (item of value(); track item) {
                        <div
                            [pBind]="ptm('thumbnailItem')"
                            [class]="cx('thumbnailItem', { index: $index, activeIndex: _activeIndex() })"
                            [attr.aria-selected]="isActiveItem($index)"
                            [attr.aria-controls]="getAriaControls($index)"
                            (keydown)="onThumbnailKeydown($event, $index)"
                            [attr.data-p-active]="isActiveItem($index)"
                        >
                            <div
                                [pBind]="ptm('thumbnail')"
                                [class]="cx('thumbnail')"
                                [attr.tabindex]="getItemTabIndex($index)"
                                [attr.aria-current]="getAriaCurrent($index)"
                                [attr.aria-label]="ariaPageLabel($index + 1)"
                                (click)="onItemClick($index)"
                                (touchend)="onItemClick($index)"
                                (keydown.enter)="onItemClick($index)"
                            >
                                <div pGalleriaItemSlot type="thumbnail" [pBind]="ptm('thumbnailItem')" [item]="item" [unstyled]="unstyled()"></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            @if (showThumbnailNavigators()) {
                <button type="button" [pBind]="ptm('thumbnailNextButton')" [class]="cx('thumbnailNextButton')" (click)="navForward($event)" pRipple [attr.aria-label]="ariaNextButtonLabel()" data-pc-group-section="thumbnailnavigator">
                    @if (!galleria.nextThumbnailIconTemplate()) {
                        @if (!isVertical()) {
                            <svg data-p-icon="chevron-right" [pBind]="ptm('thumbnailNextIcon')" [class]="cx('thumbnailNextIcon')" />
                        } @else {
                            <svg data-p-icon="chevron-down" [pBind]="ptm('thumbnailNextIcon')" [class]="cx('thumbnailNextIcon')" />
                        }
                    }
                    <ng-template [ngTemplateOutlet]="galleria.nextThumbnailIconTemplate()"></ng-template>
                </button>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GalleriaStyle],
    host: {
        '[class]': 'cx("thumbnails")'
    },
    hostDirectives: [Bind]
})
export class GalleriaThumbnails extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    galleria = inject(Galleria);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('thumbnails'));
    }

    containerId = input<string>();

    value = input<any[]>();

    isVertical = input(false, { transform: booleanAttribute });

    slideShowActive = input(false, { transform: booleanAttribute });

    circular = input(false, { transform: booleanAttribute });

    responsiveOptions = input<GalleriaResponsiveOptions[]>();

    contentHeight = input('300px');

    showThumbnailNavigators = input(true, { transform: booleanAttribute });

    numVisibleInput = input<number>(0, { alias: 'numVisible' });

    activeIndexInput = input<number>(0, { alias: 'activeIndex' });

    onActiveIndexChange = output<number>();

    stopSlideShow = output<void>();

    itemsContainer = viewChild<ElementRef>('itemsContainer');

    index: number | undefined;

    startPos: { x: number; y: number } | null = null;

    thumbnailsStyle: HTMLStyleElement | null = null;

    sortedResponsiveOptions: GalleriaResponsiveOptions[] | null = null;

    totalShiftedItems: number = 0;

    page: number = 0;

    documentResizeListener: VoidListener;

    _numVisible = linkedSignal(() => this.numVisibleInput());

    _oldNumVisible = 0;

    d_numVisible = linkedSignal<number, number>({
        source: () => this.numVisibleInput(),
        computation: (source, previous) => {
            if (previous) {
                this._oldNumVisible = previous.value;
            }
            return source;
        }
    });

    _oldactiveIndex = 0;

    _activeIndex = linkedSignal<number, number>({
        source: () => this.activeIndexInput(),
        computation: (source, previous) => {
            if (previous) {
                this._oldactiveIndex = previous.value;
            }
            return source;
        }
    });

    _componentStyle = inject(GalleriaStyle);

    viewportHeight = computed(() => (this.isVertical() ? this.contentHeight() : ''));

    private get aria() {
        return this.galleria.config.translation.aria;
    }

    isActiveItem(index: number) {
        return this._activeIndex() === index;
    }

    getItemTabIndex(index: number) {
        return this.isActiveItem(index) ? 0 : -1;
    }

    getAriaCurrent(index: number) {
        return this.isActiveItem(index) ? 'page' : undefined;
    }

    getAriaControls(index: number) {
        return this.containerId() + '_item_' + index;
    }

    onInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.createStyle();

            if (this.responsiveOptions()) {
                this.bindDocumentListeners();
            }
        }
    }

    onAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;
        const d_numVisible = this.d_numVisible();
        const activeIndex = this._activeIndex();
        const itemsContainer = this.itemsContainer();
        const val = this.value();

        if ((this._oldNumVisible !== d_numVisible || this._oldactiveIndex !== activeIndex) && itemsContainer) {
            if (activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            } else if (val!.length - d_numVisible + this.getMedianItemIndex() < activeIndex) {
                totalShiftedItems = d_numVisible - val!.length;
            } else if (val!.length - d_numVisible < activeIndex && d_numVisible % 2 === 0) {
                totalShiftedItems = activeIndex * -1 + this.getMedianItemIndex() + 1;
            } else {
                totalShiftedItems = activeIndex * -1 + this.getMedianItemIndex();
            }

            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }

            if (itemsContainer && itemsContainer.nativeElement) {
                itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / d_numVisible)}%, 0, 0)`;
            }

            if (this._oldactiveIndex !== activeIndex) {
                this.document.body.setAttribute('data-p-items-hidden', 'false');
                !this.$unstyled() && removeClass(itemsContainer.nativeElement, 'p-items-hidden');
                itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }

            this._oldactiveIndex = activeIndex;
            this._oldNumVisible = d_numVisible;
        }
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.calculatePosition();
        }
    }

    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = this.document.createElement('style');
            setAttribute(this.thumbnailsStyle, 'nonce', this.galleria.config?.csp()?.nonce);
            this.document.body.appendChild(this.thumbnailsStyle);
        }

        const d_numVisible = this.d_numVisible();
        let innerHTML = `
            #${this.containerId()} .p-galleria-thumbnail-item {
                flex: 1 0 ${100 / d_numVisible}%
            }
        `;

        const responsiveOptions = this.responsiveOptions();
        if (responsiveOptions && !this.$unstyled()) {
            this.sortedResponsiveOptions = [...responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result: number;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return -1 * result;
            });

            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];

                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId()} .p-galleria-thumbnail-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }

        this.thumbnailsStyle.innerHTML = innerHTML;
        setAttribute(this.thumbnailsStyle, 'nonce', this.galleria.config?.csp()?.nonce);
    }

    calculatePosition() {
        if (isPlatformBrowser(this.platformId)) {
            const itemsContainer = this.itemsContainer();
            if (itemsContainer && this.sortedResponsiveOptions) {
                let windowWidth = window.innerWidth;
                let matchedResponsiveData = {
                    numVisible: this._numVisible()
                };

                for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                    let res = this.sortedResponsiveOptions[i];

                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }

                if (this.d_numVisible() !== matchedResponsiveData.numVisible) {
                    this.d_numVisible.set(matchedResponsiveData.numVisible);
                }
            }
        }
    }

    getTabIndex(index: number) {
        return this.isItemActive(index) ? 0 : null;
    }

    navForward(e: TouchEvent | MouseEvent) {
        this.stopTheSlideShow();

        const activeIndex = this._activeIndex();
        const val = this.value();
        let nextItemIndex = activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular())) {
            this.step(-1);
        }

        let newActiveIndex = this.circular() && val!.length - 1 === activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(newActiveIndex);

        if (e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e: TouchEvent | MouseEvent) {
        this.stopTheSlideShow();

        const activeIndex = this._activeIndex();
        const val = this.value();
        let prevItemIndex = activeIndex !== 0 ? activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if (this.d_numVisible() - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular())) {
            this.step(1);
        }

        let newActiveIndex = this.circular() && activeIndex === 0 ? val!.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(newActiveIndex);

        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onItemClick(index: number) {
        this.stopTheSlideShow();

        const activeIndex = this._activeIndex();
        let selectedItemIndex = index;
        if (selectedItemIndex !== activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
            if (selectedItemIndex < activeIndex) {
                dir = this.d_numVisible() - diff - 1 - this.getMedianItemIndex();
                if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
                    this.step(dir);
                }
            } else {
                dir = this.getMedianItemIndex() - diff;
                if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
                    this.step(dir);
                }
            }

            this._activeIndex.set(selectedItemIndex);
            this.onActiveIndexChange.emit(selectedItemIndex);
        }
    }

    onThumbnailKeydown(event: KeyboardEvent, index: number) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.onItemClick(index);
            event.preventDefault();
        }

        switch (event.code) {
            case 'ArrowRight':
                this.onRightKey();
                break;

            case 'ArrowLeft':
                this.onLeftKey();
                break;

            case 'Home':
                this.onHomeKey();
                event.preventDefault();
                break;

            case 'End':
                this.onEndKey();
                event.preventDefault();
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                break;

            case 'Tab':
                this.onTabKey();
                break;

            default:
                break;
        }
    }

    onRightKey() {
        const itemsContainer = this.itemsContainer();
        const indicators = find(itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
    }

    onLeftKey() {
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
    }

    onHomeKey() {
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, 0);
    }

    onEndKey() {
        const itemsContainer = this.itemsContainer();
        const indicators = find(itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }

    onTabKey() {
        const itemsContainer = this.itemsContainer();
        const indicators = <any>[...find(itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const highlightedIndex = indicators.findIndex((ind: any) => getAttribute(ind, 'data-p-active') === true);

        const activeIndicator = <any>findSingle(itemsContainer?.nativeElement, '[tabindex="0"]');

        const activeIndex = indicators.findIndex((ind: any) => ind === activeIndicator?.parentElement);

        indicators[activeIndex].children[0].tabIndex = '-1';
        indicators[highlightedIndex].children[0].tabIndex = '0';
    }

    findFocusedIndicatorIndex() {
        const itemsContainer = this.itemsContainer();
        const indicators = [...find(itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const activeIndicator = findSingle(itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');

        return indicators.findIndex((ind) => ind === activeIndicator?.parentElement);
    }

    changedFocusedIndicator(prevInd: number, nextInd: number) {
        const itemsContainer = this.itemsContainer();
        const indicators = <any>find(itemsContainer?.nativeElement, '[data-pc-section="thumbnailitem"]');

        indicators[prevInd].children[0].tabIndex = '-1';
        indicators[nextInd].children[0].tabIndex = '0';
        indicators[nextInd].children[0].focus();
    }

    step(dir: number) {
        const d_numVisible = this.d_numVisible();
        const val = this.value();
        const activeIndex = this._activeIndex();
        let totalShiftedItems = this.totalShiftedItems + dir;

        if (dir < 0 && -1 * totalShiftedItems + d_numVisible > val!.length - 1) {
            totalShiftedItems = d_numVisible - val!.length;
        } else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
        }

        if (this.circular()) {
            if (dir < 0 && val!.length - 1 === activeIndex) {
                totalShiftedItems = 0;
            } else if (dir > 0 && activeIndex === 0) {
                totalShiftedItems = d_numVisible - val!.length;
            }
        }

        const itemsContainer = this.itemsContainer();
        if (itemsContainer) {
            this.document.body.setAttribute('data-p-items-hidden', 'false');
            !this.$unstyled() && removeClass(itemsContainer.nativeElement, 'p-items-hidden');
            itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / d_numVisible)}%, 0, 0)`;
            itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }

        this.totalShiftedItems = totalShiftedItems;
    }

    stopTheSlideShow() {
        if (this.slideShowActive()) {
            this.stopSlideShow.emit();
        }
    }

    changePageOnTouch(e: TouchEvent, diff: number) {
        if (diff < 0) {
            // left
            this.navForward(e);
        } else {
            // right
            this.navBackward(e);
        }
    }

    getTotalPageNumber() {
        const val = this.value();
        const d_numVisible = this.d_numVisible();
        return val!.length > d_numVisible ? val!.length - d_numVisible + 1 : 0;
    }

    getMedianItemIndex() {
        const d_numVisible = this.d_numVisible();
        let index = Math.floor(d_numVisible / 2);

        return d_numVisible % 2 ? index : index - 1;
    }

    onTransitionEnd() {
        const itemsContainer = this.itemsContainer();
        if (itemsContainer && itemsContainer.nativeElement) {
            this.document.body.setAttribute('data-p-items-hidden', 'true');
            !this.$unstyled() && addClass(itemsContainer.nativeElement, 'p-items-hidden');
            itemsContainer.nativeElement.style.transition = '';
        }
    }

    onTouchEnd(e: TouchEvent) {
        let touchobj = e.changedTouches[0];

        if (this.isVertical()) {
            this.changePageOnTouch(e, touchobj.pageY - (<{ x: number; y: number }>this.startPos).y);
        } else {
            this.changePageOnTouch(e, touchobj.pageX - (<{ x: number; y: number }>this.startPos).x);
        }
    }

    onTouchMove(e: TouchEvent) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onTouchStart(e: TouchEvent) {
        let touchobj = e.changedTouches[0];

        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }

    isNavBackwardDisabled() {
        const val = this.value();
        const d_numVisible = this.d_numVisible();
        return (!this.circular() && this._activeIndex() === 0) || val!.length <= d_numVisible;
    }

    isNavForwardDisabled() {
        const val = this.value();
        const d_numVisible = this.d_numVisible();
        return (!this.circular() && this._activeIndex() === val!.length - 1) || val!.length <= d_numVisible;
    }

    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }

    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible() - 1;
    }

    isItemActive(index: number) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }

    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            const window = this.document.defaultView || 'window';
            this.documentResizeListener = this.renderer.listen(window, 'resize', () => {
                this.calculatePosition();
            });
        }
    }

    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    onDestroy() {
        if (this.responsiveOptions()) {
            this.unbindDocumentListeners();
        }

        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode?.removeChild(this.thumbnailsStyle);
        }
    }

    ariaPrevButtonLabel() {
        return this.aria?.prevPageLabel;
    }

    ariaNextButtonLabel() {
        return this.aria?.nextPageLabel;
    }

    ariaPageLabel(value: any) {
        return this.aria?.pageLabel?.replace(/{page}/g, value);
    }
}

@Component({
    selector: 'div[pGalleriaContent]',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule, TimesIcon, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails],
    template: `
        @if (hasValue()) {
            @if (galleria.fullScreen()) {
                <button type="button" [pBind]="getPTOptions('closeButton')" [class]="cx('closeButton')" (click)="maskHide.emit(true)" [attr.aria-label]="closeAriaLabel()">
                    @if (!galleria.closeIconTemplate()) {
                        <svg data-p-icon="times" [pBind]="getPTOptions('closeIcon')" [class]="cx('closeIcon')" />
                    }
                    <ng-template [ngTemplateOutlet]="galleria.closeIconTemplate()"></ng-template>
                </button>
            }
            @if (shouldRenderHeader()) {
                <div pGalleriaItemSlot [unstyled]="unstyled()" type="header" [pBind]="getPTOptions('header')" [class]="cx('header')"></div>
            }
            <div [pBind]="getPTOptions('content')" [class]="cx('content')" [attr.aria-live]="contentAriaLive()">
                <div
                    pGalleriaItem
                    [id]="id()"
                    [value]="value()"
                    [activeIndex]="_activeIndex()"
                    [circular]="galleria.circular()"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators()"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover()"
                    [showItemNavigators]="galleria.showItemNavigators()"
                    [autoPlay]="galleria.autoPlay()"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                    [class]="cx('itemsContainer')"
                ></div>

                @if (galleria.showThumbnails()) {
                    <div
                        pGalleriaThumbnails
                        [containerId]="id()"
                        [value]="value()"
                        (onActiveIndexChange)="onActiveIndexChange($event)"
                        [activeIndex]="_activeIndex()"
                        [numVisible]="numVisible()"
                        [responsiveOptions]="galleria.responsiveOptions()"
                        [circular]="galleria.circular()"
                        [isVertical]="isVertical()"
                        [contentHeight]="galleria.verticalThumbnailViewPortHeight()"
                        [showThumbnailNavigators]="galleria.showThumbnailNavigators()"
                        [slideShowActive]="slideShowActive"
                        (stopSlideShow)="stopSlideShow()"
                        [pt]="pt()"
                        [unstyled]="unstyled()"
                    ></div>
                }
            </div>
            @if (shouldRenderFooter()) {
                <div pGalleriaItemSlot [pBind]="getPTOptions('footer')" [class]="cx('footer')" type="footer" [unstyled]="unstyled()"></div>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GalleriaStyle],
    host: {
        '[attr.id]': 'id()',
        '[attr.role]': '"region"',
        '[style]': 'hostStyle()',
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class GalleriaContent extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    galleria = inject(Galleria);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.getPTOptions('root'));
    }

    value = input<any[]>([]);

    numVisible = input<number>();

    fullScreen = model(false);

    activeIndexInput = input<number>(0, { alias: 'activeIndex' });

    maskHide = output<boolean>();

    activeItemChange = output<number>();

    closeButton = viewChild<ElementRef>('closeButton');

    _componentStyle = inject(GalleriaStyle);

    $pcGalleria: Galleria | undefined = inject(GALLERIA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    private _generatedId = uuid('pn_id_');

    id = computed(() => this.galleria.id() || this._generatedId);

    _activeIndex = linkedSignal(() => this.activeIndexInput());

    slideShowActive = true;

    interval: any;

    hostStyle = computed(() => (!this.galleria.fullScreen() ? this.galleria.containerStyle() : {}));

    contentAriaLive = computed(() => (this.galleria.autoPlay() ? 'polite' : 'off'));

    isVertical = computed(() => this.galleria.thumbnailsPosition() === 'left' || this.galleria.thumbnailsPosition() === 'right');

    hasValue = computed(() => {
        const val = this.value();
        return val && val.length > 0;
    });

    // For custom fullscreen
    @HostListener('document:fullscreenchange')
    handleFullscreenChange() {
        if (document?.fullscreenElement === this.el.nativeElement?.children[0]) {
            this.fullScreen.set(true);
        } else {
            this.fullScreen.set(false);
        }
    }

    shouldRenderHeader() {
        return !!this.galleria.headerTemplate();
    }

    shouldRenderFooter() {
        return !!this.galleria.footerTemplate();
    }

    startSlideShow() {
        if (isPlatformBrowser(this.galleria.platformId)) {
            this.interval = setInterval(() => {
                let activeIndex = this.galleria.circular() && this.value()!.length - 1 === this._activeIndex() ? 0 : this._activeIndex() + 1;
                this.onActiveIndexChange(activeIndex);
                this._activeIndex.set(activeIndex);
            }, this.galleria.transitionInterval());

            this.slideShowActive = true;
        }
    }

    stopSlideShow() {
        if (this.galleria.autoPlay() && !this.galleria.shouldStopAutoplayByClick()) {
            return;
        }

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.slideShowActive = false;
    }

    getPositionClass(preClassName: string, position: string) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find((item) => item === position);

        return pos ? `${preClassName}-${pos}` : '';
    }

    onActiveIndexChange(index: number) {
        if (this._activeIndex() !== index) {
            this._activeIndex.set(index);
            this.activeItemChange.emit(this._activeIndex());
        }
    }

    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    getPTOptions(key: string) {
        return this.ptm(key, {
            context: {
                pt: this.pt(),
                unstyled: this.unstyled()
            }
        });
    }
}

/**
 * Galleria is an advanced content gallery component.
 * @group Components
 */
@Component({
    selector: 'p-galleria',
    standalone: true,
    imports: [GalleriaContent, BindModule, MotionModule, FocusTrap],
    template: `
        @if (fullScreen()) {
            <div #container>
                @if (renderMask()) {
                    <div
                        [pBind]="ptm('mask')"
                        [pMotion]="maskVisible"
                        [pMotionAppear]="true"
                        [pMotionEnterActiveClass]="maskEnterActiveClass()"
                        [pMotionLeaveActiveClass]="maskLeaveActiveClass()"
                        [pMotionOptions]="computedMaskMotionOptions()"
                        (pMotionOnAfterLeave)="onMaskAfterLeave()"
                        [class]="cn(cx('mask'), maskClass())"
                        [attr.role]="maskRole()"
                        [attr.aria-modal]="maskAriaModal()"
                        (click)="onMaskHide($event)"
                    >
                        @if (renderContent()) {
                            <div
                                pGalleriaContent
                                [pMotion]="visible()"
                                [pMotionAppear]="true"
                                [pMotionName]="'p-galleria'"
                                [pMotionOptions]="computedMotionOptions()"
                                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                                (pMotionOnBeforeLeave)="onBeforeLeave()"
                                (pMotionOnAfterLeave)="onAfterLeave()"
                                [value]="value()"
                                [activeIndex]="_activeIndex()"
                                [numVisible]="d_numVisible()"
                                (maskHide)="onMaskHide()"
                                (activeItemChange)="onActiveItemChange($event)"
                                [style]="containerStyle()"
                                [fullScreen]="fullScreen()"
                                [pt]="pt()"
                                pFocusTrap
                                [pFocusTrapDisabled]="!fullScreen()"
                                [unstyled]="unstyled()"
                            ></div>
                        }
                    </div>
                }
            </div>
        } @else {
            <div pGalleriaContent [pt]="pt()" [unstyled]="unstyled()" [value]="value()" [activeIndex]="_activeIndex()" [numVisible]="d_numVisible()" (activeItemChange)="onActiveItemChange($event)"></div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [GalleriaStyle, { provide: GALLERIA_INSTANCE, useExisting: Galleria }, { provide: PARENT_INSTANCE, useExisting: Galleria }],
    hostDirectives: [Bind]
})
export class Galleria extends BaseComponent<GalleriaPassThrough> {
    componentName = 'Galleria';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcGalleria: Galleria | undefined = inject(GALLERIA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Index of the first item.
     * @group Props
     */
    activeIndex = input(0, { transform: numberAttribute });

    /**
     * Whether to display the component on fullscreen.
     * @group Props
     */
    fullScreen = input(false, { transform: booleanAttribute });

    /**
     * Unique identifier of the element.
     * @group Props
     */
    id = input<string>();

    /**
     * An array of objects to display.
     * @group Props
     */
    value = input<any[]>();

    /**
     * Number of items per page.
     * @group Props
     */
    numVisible = input(3, { transform: numberAttribute });

    /**
     * An array of options for responsive design.
     * @see {GalleriaResponsiveOptions}
     * @group Props
     */
    responsiveOptions = input<GalleriaResponsiveOptions[]>();

    /**
     * Whether to display navigation buttons in item section.
     * @group Props
     */
    showItemNavigators = input(false, { transform: booleanAttribute });

    /**
     * Whether to display navigation buttons in thumbnail container.
     * @group Props
     */
    showThumbnailNavigators = input(true, { transform: booleanAttribute });

    /**
     * Whether to display navigation buttons on item hover.
     * @group Props
     */
    showItemNavigatorsOnHover = input(false, { transform: booleanAttribute });

    /**
     * When enabled, item is changed on indicator hover.
     * @group Props
     */
    changeItemOnIndicatorHover = input(false, { transform: booleanAttribute });

    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    circular = input(false, { transform: booleanAttribute });

    /**
     * Items are displayed with a slideshow in autoPlay mode.
     * @group Props
     */
    autoPlay = input(false, { transform: booleanAttribute });

    /**
     * When enabled, autorun should stop by click.
     * @group Props
     */
    shouldStopAutoplayByClick = input(true, { transform: booleanAttribute });

    /**
     * Time in milliseconds to scroll items.
     * @group Props
     */
    transitionInterval = input(4000, { transform: numberAttribute });

    /**
     * Whether to display thumbnail container.
     * @group Props
     */
    showThumbnails = input(true, { transform: booleanAttribute });

    /**
     * Position of thumbnails.
     * @group Props
     */
    thumbnailsPosition = input<GalleriaPosition>('bottom');

    /**
     * Height of the viewport in vertical thumbnail.
     * @group Props
     */
    verticalThumbnailViewPortHeight = input('300px');

    /**
     * Whether to display indicator container.
     * @group Props
     */
    showIndicators = input(false, { transform: booleanAttribute });

    /**
     * When enabled, indicator container is displayed on item container.
     * @group Props
     */
    showIndicatorsOnItem = input(false, { transform: booleanAttribute });

    /**
     * Position of indicators.
     * @group Props
     */
    indicatorsPosition = input<GalleriaPosition>('bottom');

    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });

    /**
     * Style class of the mask on fullscreen mode.
     * @group Props
     */
    maskClass = input<string>();

    /**
     * Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.
     * @group Props
     */
    containerClass = input<string>();

    /**
     * Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.
     * @group Props
     */
    containerStyle = input<CSSProperties>();

    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions>();

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    /**
     * The mask motion options.
     * @group Props
     */
    maskMotionOptions = input<MotionOptions>();

    computedMaskMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('maskMotion'),
            ...this.maskMotionOptions()
        };
    });

    maskEnterActiveClass = computed(() => (this.fullScreen() ? 'p-overlay-mask-enter-active' : ''));

    maskLeaveActiveClass = computed(() => (this.fullScreen() ? 'p-overlay-mask-leave-active' : ''));

    maskRole = computed(() => (this.fullScreen() ? 'dialog' : 'region'));

    maskAriaModal = computed(() => (this.fullScreen() ? 'true' : undefined));

    /**
     * Specifies the visibility of the mask on fullscreen mode.
     * @group Props
     */
    visible = model(false);

    renderMask = signal<boolean>(false);
    renderContent = signal<boolean>(false);

    /**
     * Callback to invoke on active index change.
     * @param {number} number - Active index.
     * @group Emits
     */
    activeIndexChange = output<number>();

    container = viewChild<ElementRef>('container');

    _activeIndex = linkedSignal(() => this.activeIndex());

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });

    /**
     * Custom indicator template.
     * @group Templates
     */
    indicatorTemplate = contentChild<TemplateRef<GalleriaIndicatorTemplateContext>>('indicator', { descendants: false });

    /**
     * Custom caption template.
     * @group Templates
     */
    captionTemplate = contentChild<TemplateRef<GalleriaCaptionTemplateContext>>('caption', { descendants: false });

    /**
     * Custom close icon template.
     * @group Templates
     */
    closeIconTemplate = contentChild<TemplateRef<void>>('closeicon', { descendants: false });

    /**
     * Custom previous thumbnail icon template.
     * @group Templates
     */
    previousThumbnailIconTemplate = contentChild<TemplateRef<void>>('previousthumbnailicon', { descendants: false });

    /**
     * Custom next thumbnail icon template.
     * @group Templates
     */
    nextThumbnailIconTemplate = contentChild<TemplateRef<void>>('nextthumbnailicon', { descendants: false });

    /**
     * Custom item previous icon template.
     * @group Templates
     */
    itemPreviousIconTemplate = contentChild<TemplateRef<void>>('itempreviousicon', { descendants: false });

    /**
     * Custom item next icon template.
     * @group Templates
     */
    itemNextIconTemplate = contentChild<TemplateRef<void>>('itemnexticon', { descendants: false });

    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<GalleriaItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom thumbnail template.
     * @group Templates
     */
    thumbnailTemplate = contentChild<TemplateRef<GalleriaThumbnailTemplateContext>>('thumbnail', { descendants: false });

    maskVisible = false;

    numVisibleLimit = signal(0);

    d_numVisible = computed(() => this.numVisibleLimit() || this.numVisible());

    _componentStyle = inject(GalleriaStyle);

    mask: HTMLElement | undefined;

    element = inject(ElementRef);

    constructor() {
        super();

        // Effect for visible changes
        effect(() => {
            const isVisible = this.visible();
            if (isVisible && !this.maskVisible) {
                this.maskVisible = true;
                this.renderMask.set(true);
                this.renderContent.set(true);
            } else if (!isVisible && this.maskVisible) {
                this.maskVisible = false;
            }
        });

        // Effect for value changes
        effect(() => {
            const val = this.value();
            if (val && val.length < this.numVisible()) {
                this.numVisibleLimit.set(val.length);
            } else {
                this.numVisibleLimit.set(0);
            }
        });
    }

    onMaskHide(event?: MouseEvent) {
        if (!event || event.target === event.currentTarget) {
            this.visible.set(false);
        }
    }

    onActiveItemChange(index: number) {
        if (this._activeIndex() !== index) {
            this._activeIndex.set(index);
            this.activeIndexChange.emit(index);
        }
    }

    onBeforeEnter(event: MotionEvent) {
        this.mask = <HTMLElement>event.element?.parentElement;
        this.enableModality();
        setTimeout(() => {
            const focusTarget = findSingle(this.container()?.nativeElement, '[data-pc-section="closebutton"]');
            if (focusTarget) focus(focusTarget as HTMLElement);
        }, 25);
    }

    onBeforeLeave() {
        if (this.mask) {
            this.maskVisible = false;
        }
    }

    onAfterLeave() {
        this.disableModality();
        this.renderContent.set(false);
    }

    onMaskAfterLeave() {
        if (!this.renderContent()) {
            this.renderMask.set(false);
        }
    }

    enableModality() {
        //@ts-ignore
        blockBodyScroll();
        if (this.mask) {
            ZIndexUtils.set('modal', this.mask, this.baseZIndex() || this.config.zIndex.modal);
        }
    }

    disableModality() {
        //@ts-ignore
        unblockBodyScroll();
        if (this.mask) {
            ZIndexUtils.clear(this.mask);
        }
    }

    onDestroy() {
        if (this.fullScreen()) {
            removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.mask) {
            this.disableModality();
        }
    }
}

@NgModule({
    imports: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
    exports: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule]
})
export class GalleriaModule {}
