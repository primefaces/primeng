import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, linkedSignal, output, viewChild } from '@angular/core';
import { addClass, find, findSingle, focus, getAttribute, removeClass, setAttribute } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { ChevronLeft as ChevronLeftIcon } from '@primeicons/angular/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@primeicons/angular/chevron-right';
import { ChevronUp as ChevronUpIcon } from '@primeicons/angular/chevron-up';
import { Ripple } from 'primeng/ripple';
import { VoidListener } from 'primeng/ts-helpers';
import type { GalleriaPassThrough, GalleriaResponsiveOptions } from 'primeng/types/galleria';
import type { Galleria } from './galleria';
import { GalleriaItemSlot } from './galleria-item-slot';
import { GALLERIA_INSTANCE } from './galleria-token';
import { GalleriaStyle } from './style/galleriastyle';

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

    galleria = inject<Galleria>(GALLERIA_INSTANCE);

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
