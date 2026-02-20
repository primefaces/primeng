import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject, input, NgModule, numberAttribute, output, signal, TemplateRef, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { addClass, find, findSingle, getAttribute, removeClass, setAttribute, uuid } from '@primeuix/utils';
import { Footer, Header, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'primeng/icons';
import type { CSSProperties } from 'primeng/types/shared';
import type { CarouselItemTemplateContext, CarouselOrientation, CarouselPageEvent, CarouselResponsiveOptions } from 'primeng/types/carousel';
import { CarouselStyle } from './style/carouselstyle';

/**
 * Carousel is a content slider featuring various customization options.
 * @group Components
 */
@Component({
    selector: 'p-carousel',
    standalone: true,
    imports: [NgTemplateOutlet, ChevronRightIcon, ButtonModule, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, SharedModule, BindModule],
    template: `
        @if (hasHeader()) {
            <div [class]="cx('header')" [pBind]="ptm('header')">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
            </div>
        }
        <div [class]="cn(cx('contentContainer'), contentClass())" [pBind]="ptm('contentContainer')">
            <div [class]="cx('content')" [attr.aria-live]="ariaLive()" [pBind]="ptm('content')">
                @if (showNavigators()) {
                    <p-button
                        [class]="cx('pcPrevButton')"
                        [attr.aria-label]="ariaPrevButtonLabel()"
                        (click)="navBackward($event)"
                        [text]="true"
                        [buttonProps]="prevButtonProps()"
                        [pt]="ptm('pcPrevButton')"
                        [unstyled]="unstyled()"
                        attr.data-pc-group-section="navigator"
                    >
                        <ng-template #icon>
                            @if (showDefaultPrevIcon()) {
                                @if (!isVertical()) {
                                    <svg data-p-icon="chevron-left" />
                                }
                                @if (isVertical()) {
                                    <svg data-p-icon="chevron-up" />
                                }
                            }
                            @if (showPrevIconTemplate()) {
                                <ng-template *ngTemplateOutlet="previousIconTemplate()"></ng-template>
                            }
                        </ng-template>
                    </p-button>
                }
                <div [class]="cx('viewport')" [style]="viewportStyle()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" [pBind]="ptm('viewport')">
                    <div #itemsContainer [class]="cx('itemList')" (transitionend)="onTransitionEnd()" [pBind]="ptm('itemList')">
                        @for (item of clonedItemsForStarting(); track item; let i = $index) {
                            <div
                                [class]="cx('itemClone', { index: i })"
                                [attr.aria-hidden]="isCloneStartAriaHidden()"
                                [attr.aria-label]="ariaSlideNumber(i)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                                [attr.data-p-carousel-item-active]="isCloneStartActive()"
                                [attr.data-p-carousel-item-start]="i === 0"
                                [attr.data-p-carousel-item-end]="isCloneStartEnd(i)"
                                [pBind]="ptm('itemClone')"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                            </div>
                        }
                        @for (item of value(); track item; let i = $index) {
                            <div
                                [class]="cx('item', { index: i })"
                                role="group"
                                [attr.aria-hidden]="isItemAriaHidden(i)"
                                [attr.aria-label]="ariaSlideNumber(i)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                                [attr.data-p-carousel-item-active]="isItemActive(i)"
                                [attr.data-p-carousel-item-start]="isItemStart(i)"
                                [attr.data-p-carousel-item-end]="isItemEnd(i)"
                                [pBind]="getItemPTOptions('item', i)"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                            </div>
                        }
                        @for (item of clonedItemsForFinishing(); track item) {
                            <div [class]="cx('itemClone', { index: 0 })" [attr.data-p-carousel-item-active]="false" [attr.data-p-carousel-item-start]="false" [attr.data-p-carousel-item-end]="false" [pBind]="ptm('itemClone')">
                                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: item }"></ng-container>
                            </div>
                        }
                    </div>
                </div>
                @if (showNavigators()) {
                    <p-button
                        type="button"
                        [class]="cx('pcNextButton')"
                        (click)="navForward($event)"
                        [attr.aria-label]="ariaNextButtonLabel()"
                        [buttonProps]="nextButtonProps()"
                        [text]="true"
                        [pt]="ptm('pcNextButton')"
                        [unstyled]="unstyled()"
                        attr.data-pc-group-section="navigator"
                    >
                        <ng-template #icon>
                            @if (showDefaultNextIcon()) {
                                @if (!isVertical()) {
                                    <svg data-p-icon="chevron-right" />
                                }
                                @if (isVertical()) {
                                    <svg data-p-icon="chevron-down" />
                                }
                            }
                            @if (showNextIconTemplate()) {
                                <ng-template *ngTemplateOutlet="nextIconTemplate()"></ng-template>
                            }
                        </ng-template>
                    </p-button>
                }
            </div>
            @if (showIndicators()) {
                <ul #indicatorContent [class]="cx('indicatorList')" [style]="indicatorsContentStyle()" (keydown)="onIndicatorKeydown($event)" [pBind]="ptm('indicatorList')">
                    @for (dot of totalDotsArray(); track dot) {
                        <li [class]="cx('indicator', { index: dot })" [attr.data-p-active]="isIndicatorActive(dot)" [pBind]="getIndicatorPTOptions('indicator', dot)">
                            <button
                                type="button"
                                [class]="cx('indicatorButton')"
                                (click)="onDotClick($event, dot)"
                                [style]="indicatorStyle()"
                                [attr.aria-label]="ariaPageLabel(dot + 1)"
                                [attr.aria-current]="getIndicatorAriaCurrent(dot)"
                                [tabindex]="getIndicatorTabindex(dot)"
                                [pBind]="getIndicatorPTOptions('indicatorButton', dot)"
                            ></button>
                        </li>
                    }
                </ul>
            }
        </div>
        @if (hasFooter()) {
            <div [class]="cx('footer')" [pBind]="ptm('footer')">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CarouselStyle, { provide: PARENT_INSTANCE, useExisting: Carousel }],
    hostDirectives: [Bind],
    host: {
        '[attr.id]': 'id',
        '[attr.role]': "'region'",
        '[class]': "cx('root')"
    }
})
export class Carousel extends BaseComponent {
    componentName = 'Carousel';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    /**
     * Index of the first item.
     * @defaultValue 0
     * @group Props
     */
    page = input(0, { transform: numberAttribute });

    /**
     * Number of items per page.
     * @defaultValue 1
     * @group Props
     */
    numVisible = input(1, { transform: numberAttribute });

    /**
     * Number of items to scroll.
     * @defaultValue 1
     * @group Props
     */
    numScroll = input(1, { transform: numberAttribute });

    /**
     * An array of options for responsive design.
     * @see {CarouselResponsiveOptions}
     * @group Props
     */
    responsiveOptions = input<CarouselResponsiveOptions[]>();

    /**
     * Specifies the layout of the component.
     * @group Props
     */
    orientation = input<CarouselOrientation>('horizontal');

    /**
     * Height of the viewport in vertical layout.
     * @group Props
     */
    verticalViewPortHeight = input('300px');

    /**
     * Style class of main content.
     * @group Props
     */
    contentClass = input('');

    /**
     * Style class of the indicator items.
     * @group Props
     */
    indicatorsContentClass = input('');

    /**
     * Inline style of the indicator items.
     * @group Props
     */
    indicatorsContentStyle = input<CSSProperties>();

    /**
     * Style class of the indicators.
     * @group Props
     */
    indicatorStyleClass = input('');

    /**
     * Style of the indicators.
     * @group Props
     */
    indicatorStyle = input<CSSProperties>();

    /**
     * An array of objects to display.
     * @defaultValue null
     * @group Props
     */
    value = input<any[]>();

    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    circular = input(false, { transform: booleanAttribute });

    /**
     * Whether to display indicator container.
     * @group Props
     */
    showIndicators = input(true, { transform: booleanAttribute });

    /**
     * Whether to display navigation buttons in container.
     * @group Props
     */
    showNavigators = input(true, { transform: booleanAttribute });

    /**
     * Time in milliseconds to scroll items automatically.
     * @group Props
     */
    autoplayInterval = input(0, { transform: numberAttribute });

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    prevButtonProps = input<ButtonProps>({
        severity: 'secondary',
        text: true,
        rounded: true
    });

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    nextButtonProps = input<ButtonProps>({
        severity: 'secondary',
        text: true,
        rounded: true
    });

    /**
     * Callback to invoke after scroll.
     * @param {CarouselPageEvent} event - Custom page event.
     * @group Emits
     */
    onPage = output<CarouselPageEvent>();

    itemsContainer = viewChild<ElementRef>('itemsContainer');

    indicatorContent = viewChild<ElementRef>('indicatorContent');

    headerFacet = contentChild(Header);

    footerFacet = contentChild(Footer);

    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<CarouselItemTemplateContext>>('item', { descendants: false });

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
     * Custom previous icon template.
     * @group Templates
     */
    previousIconTemplate = contentChild<TemplateRef<void>>('previousicon', { descendants: false });

    /**
     * Custom next icon template.
     * @group Templates
     */
    nextIconTemplate = contentChild<TemplateRef<void>>('nexticon', { descendants: false });

    _componentStyle = inject(CarouselStyle);

    _numVisible = 1;

    _numScroll = 1;

    _oldNumScroll = 0;

    prevState = {
        numScroll: 0,
        numVisible: 0,
        value: [] as unknown[]
    };

    defaultNumScroll = 1;

    defaultNumVisible = 1;

    _page = signal(0);

    carouselStyle: HTMLStyleElement | null = null;

    id: string | undefined;

    totalShiftedItems = signal(0);

    isRemainingItemsAdded = false;

    animationTimeout: ReturnType<typeof setTimeout> | undefined;

    translateTimeout: ReturnType<typeof setTimeout> | undefined;

    remainingItems = 0;

    startPos: { x: number; y: number } | null = null;

    documentResizeListener: VoidFunction | null = null;

    clonedItemsForStarting = signal<unknown[]>([]);

    clonedItemsForFinishing = signal<unknown[]>([]);

    allowAutoplay = signal(false);

    interval: ReturnType<typeof setInterval> | undefined;

    isCreated = false;

    swipeThreshold = 20;

    window: Window;

    viewportStyle = computed(() => {
        return { height: this.isVertical() ? this.verticalViewPortHeight() : 'auto' };
    });

    constructor() {
        super();
        this.window = this.document.defaultView as Window;
        this.totalShiftedItems.set(this.page() * this.numScroll() * -1);

        // Effect for page changes
        effect(() => {
            const pageVal = this.page();
            untracked(() => {
                if (this.isCreated && pageVal !== this._page()) {
                    if (this.autoplayInterval()) {
                        this.stopAutoplay();
                    }

                    if (pageVal > this._page() && pageVal <= this.totalDots() - 1) {
                        this.step(-1, pageVal);
                    } else if (pageVal < this._page()) {
                        this.step(1, pageVal);
                    }
                }
                this._page.set(pageVal);
            });
        });

        // Effect for value changes
        effect(() => {
            const val = this.value();
            if (isPlatformBrowser(this.platformId)) {
                if (this.circular() && val) {
                    this.setCloneItems();
                }
            }
        });

        // Effect for numVisible/numScroll changes
        effect(() => {
            const numVisibleVal = this.numVisible();
            const numScrollVal = this.numScroll();
            const responsiveOpts = this.responsiveOptions();

            untracked(() => {
                if (this.isCreated) {
                    if (responsiveOpts) {
                        this.defaultNumVisible = numVisibleVal;
                        this.defaultNumScroll = numScrollVal;
                    }

                    if (this.isCircular()) {
                        this.setCloneItems();
                    }

                    this.createStyle();
                    this.calculatePosition();
                }

                this._numVisible = numVisibleVal;
                this._numScroll = numScrollVal;
            });
        });
    }

    onAfterContentInit() {
        this.id = uuid('pn_id_');
        if (isPlatformBrowser(this.platformId)) {
            this.allowAutoplay.set(!!this.autoplayInterval());

            if (this.circular()) {
                this.setCloneItems();
            }

            if (this.responsiveOptions()) {
                this.defaultNumScroll = this._numScroll;
                this.defaultNumVisible = this._numVisible;
            }

            this.createStyle();
            this.calculatePosition();

            if (this.responsiveOptions()) {
                this.bindDocumentListeners();
            }
        }
    }

    onAfterContentChecked() {
        if (isPlatformBrowser(this.platformId)) {
            const isCircular = this.isCircular();
            let totalShiftedItems = this.totalShiftedItems();
            const val = this.value();

            if (val && this.itemsContainer() && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== val.length)) {
                if (this.autoplayInterval()) {
                    this.stopAutoplay(false);
                }

                this.remainingItems = (val.length - this._numVisible) % this._numScroll;

                let page = this._page();
                if (this.totalDots() !== 0 && page >= this.totalDots()) {
                    page = this.totalDots() - 1;
                    this._page.set(page);
                    this.onPage.emit({
                        page: this._page()
                    });
                }

                totalShiftedItems = page * this._numScroll * -1;
                if (isCircular) {
                    totalShiftedItems -= this._numVisible;
                }

                if (page === this.totalDots() - 1 && this.remainingItems > 0) {
                    totalShiftedItems += -1 * this.remainingItems + this._numScroll;
                    this.isRemainingItemsAdded = true;
                } else {
                    this.isRemainingItemsAdded = false;
                }

                if (totalShiftedItems !== this.totalShiftedItems()) {
                    this.totalShiftedItems.set(totalShiftedItems);
                }

                this._oldNumScroll = this._numScroll;
                this.prevState.numScroll = this._numScroll;
                this.prevState.numVisible = this._numVisible;
                this.prevState.value = [...val];

                const itemsContainerEl = this.itemsContainer();
                if (this.totalDots() > 0 && itemsContainerEl?.nativeElement) {
                    itemsContainerEl.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
                }

                this.isCreated = true;

                if (this.autoplayInterval() && this.isAutoplay()) {
                    this.startAutoplay();
                }
            }

            if (isCircular && val) {
                if (this._page() === 0) {
                    totalShiftedItems = -1 * this._numVisible;
                } else if (totalShiftedItems === 0) {
                    totalShiftedItems = -1 * val.length;
                    if (this.remainingItems > 0) {
                        this.isRemainingItemsAdded = true;
                    }
                }

                if (totalShiftedItems !== this.totalShiftedItems()) {
                    this.totalShiftedItems.set(totalShiftedItems);
                }
            }
        }
    }

    createStyle() {
        if (!this.carouselStyle) {
            const styleEl = this.renderer.createElement('style') as HTMLStyleElement;
            setAttribute(styleEl, 'nonce', this.config?.csp()?.nonce);
            this.renderer.appendChild(this.document.head, styleEl);
            this.carouselStyle = styleEl;
        }

        let innerHTML = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${100 / this._numVisible}%
			}
        `;

        const responsiveOpts = this.responsiveOptions();
        if (responsiveOpts && !this.$unstyled()) {
            responsiveOpts.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result: number | null = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return -1 * result;
            });

            for (let i = 0; i < responsiveOpts.length; i++) {
                let res = responsiveOpts[i];

                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }

        this.carouselStyle!.innerHTML = innerHTML;
    }

    calculatePosition() {
        const responsiveOpts = this.responsiveOptions();
        if (responsiveOpts) {
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };

            if (typeof window !== 'undefined') {
                let windowWidth = window.innerWidth;
                for (let i = 0; i < responsiveOpts.length; i++) {
                    let res = responsiveOpts[i];

                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
            }

            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page();
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);

                let totalShiftedItems = matchedResponsiveData.numScroll * this._page() * -1;

                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }

                this.totalShiftedItems.set(totalShiftedItems);
                this._numScroll = matchedResponsiveData.numScroll;

                this._page.set(page);
                this.onPage.emit({
                    page: this._page()
                });
            }

            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }
        }
    }

    setCloneItems() {
        const val = this.value();
        if (this.isCircular() && val) {
            this.clonedItemsForStarting.set([...val.slice(-1 * this._numVisible)]);
            this.clonedItemsForFinishing.set([...val.slice(0, this._numVisible)]);
        } else {
            this.clonedItemsForStarting.set([]);
            this.clonedItemsForFinishing.set([]);
        }
    }

    firstIndex() {
        return this.isCircular() ? -1 * (this.totalShiftedItems() + this._numVisible) : this.totalShiftedItems() * -1;
    }

    lastIndex() {
        return this.firstIndex() + this._numVisible - 1;
    }

    totalDots() {
        const val = this.value();
        return val?.length ? Math.ceil((val.length - this._numVisible) / this._numScroll) + 1 : 0;
    }

    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array.from({ length: totalDots }, (_, i) => i);
    }

    isVertical() {
        return this.orientation() === 'vertical';
    }

    isCircular() {
        const val = this.value();
        return this.circular() && val && val.length >= this._numVisible;
    }

    isAutoplay() {
        return this.autoplayInterval() && this.allowAutoplay();
    }

    isForwardNavDisabled() {
        return this.isEmpty() || (this._page() >= this.totalDots() - 1 && !this.isCircular());
    }

    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page() <= 0 && !this.isCircular());
    }

    isEmpty() {
        const val = this.value();
        return !val || val.length === 0;
    }

    // Template helper methods
    hasHeader() {
        return !!(this.headerFacet() || this.headerTemplate());
    }

    hasFooter() {
        return !!(this.footerFacet() || this.footerTemplate());
    }

    ariaLive() {
        return this.allowAutoplay() ? 'polite' : 'off';
    }

    showDefaultPrevIcon() {
        return !this.previousIconTemplate() && !this.prevButtonProps()?.icon;
    }

    showPrevIconTemplate() {
        return this.previousIconTemplate() && !this.prevButtonProps()?.icon;
    }

    showDefaultNextIcon() {
        return !this.nextIconTemplate() && !this.nextButtonProps()?.icon;
    }

    showNextIconTemplate() {
        return this.nextIconTemplate() && !this.nextButtonProps()?.icon;
    }

    // Clone items (starting) helpers
    isCloneStartAriaHidden() {
        return !(this.totalShiftedItems() * -1 === this.value()?.length);
    }

    isCloneStartActive() {
        return this.totalShiftedItems() * -1 === (this.value()?.length ?? 0) + this.numVisible();
    }

    isCloneStartEnd(index: number) {
        const cloned = this.clonedItemsForStarting();
        return cloned.length > 0 && cloned.length - 1 === index;
    }

    // Main items helpers
    isItemActive(index: number) {
        return this.firstIndex() <= index && this.lastIndex() >= index;
    }

    isItemAriaHidden(index: number) {
        return !this.isItemActive(index);
    }

    isItemStart(index: number) {
        return this.firstIndex() === index;
    }

    isItemEnd(index: number) {
        return this.lastIndex() === index;
    }

    // Indicator helpers
    isIndicatorActive(index: number) {
        return this._page() === index;
    }

    getIndicatorAriaCurrent(index: number) {
        return this._page() === index ? 'page' : undefined;
    }

    getIndicatorTabindex(index: number) {
        return this._page() === index ? 0 : -1;
    }

    navForward(e: MouseEvent | TouchEvent, index?: number) {
        if (this.isCircular() || this._page() < this.totalDots() - 1) {
            this.step(-1, index);
        }

        if (this.autoplayInterval()) {
            this.stopAutoplay();
        }

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e: MouseEvent | TouchEvent, index?: number) {
        if (this.isCircular() || this._page() !== 0) {
            this.step(1, index);
        }

        if (this.autoplayInterval()) {
            this.stopAutoplay();
        }

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    onDotClick(e: MouseEvent, index: number) {
        let page = this._page();

        if (this.autoplayInterval()) {
            this.stopAutoplay();
        }

        if (index > page) {
            this.navForward(e, index);
        } else if (index < page) {
            this.navBackward(e, index);
        }
    }

    onIndicatorKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowRight':
                this.onRightKey();
                break;

            case 'ArrowLeft':
                this.onLeftKey();
                break;
        }
    }

    onRightKey() {
        const indicators = [...find(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"]')];
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
        const indicators = [...find(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"]')];
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }

    onTabKey() {
        const indicators = [...find(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"]')] as HTMLElement[];
        const highlightedIndex = indicators.findIndex((ind) => getAttribute(ind, 'data-p-highlight') === true);

        const activeIndicator = findSingle(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"] > button[tabindex="0"]') as HTMLElement | null;
        const activeIndex = indicators.findIndex((ind) => ind === activeIndicator?.parentElement);

        if (activeIndex >= 0 && highlightedIndex >= 0) {
            (indicators[activeIndex].children[0] as HTMLElement).tabIndex = -1;
            (indicators[highlightedIndex].children[0] as HTMLElement).tabIndex = 0;
        }
    }

    findFocusedIndicatorIndex() {
        const indicators = [...find(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"]')];
        const activeIndicator = findSingle(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"] > button[tabindex="0"]');

        return indicators.findIndex((ind) => ind === activeIndicator?.parentElement);
    }

    changedFocusedIndicator(prevInd: number, nextInd: number) {
        const indicators = [...find(this.indicatorContent()?.nativeElement, '[data-pc-section="indicator"]')] as HTMLElement[];

        if (indicators[prevInd] && indicators[nextInd]) {
            (indicators[prevInd].children[0] as HTMLElement).tabIndex = -1;
            (indicators[nextInd].children[0] as HTMLElement).tabIndex = 0;
            (indicators[nextInd].children[0] as HTMLElement).focus();
        }
    }

    step(dir: number, page?: number) {
        let totalShiftedItems = this.totalShiftedItems();
        const isCircular = this.isCircular();
        const val = this.value();

        if (page != null) {
            totalShiftedItems = this._numScroll * page * -1;

            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }

            this.isRemainingItemsAdded = false;
        } else {
            totalShiftedItems += this._numScroll * dir;
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - this._numScroll * dir;
                this.isRemainingItemsAdded = false;
            }

            let originalShiftedItems = isCircular ? totalShiftedItems + this._numVisible : totalShiftedItems;
            page = Math.abs(Math.floor(originalShiftedItems / this._numScroll));
        }

        if (isCircular && this._page() === this.totalDots() - 1 && dir === -1 && val) {
            totalShiftedItems = -1 * (val.length + this._numVisible);
            page = 0;
        } else if (isCircular && this._page() === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = this.totalDots() - 1;
        } else if (page === this.totalDots() - 1 && this.remainingItems > 0) {
            totalShiftedItems += this.remainingItems * -1 - this._numScroll * dir;
            this.isRemainingItemsAdded = true;
        }

        const itemsContainerEl = this.itemsContainer();
        if (itemsContainerEl) {
            !this.$unstyled() && removeClass(itemsContainerEl.nativeElement, 'p-items-hidden');
            itemsContainerEl.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            itemsContainerEl.nativeElement.style.transition = 'transform 500ms ease 0s';
        }

        this.totalShiftedItems.set(totalShiftedItems);
        this._page.set(page);
        this.onPage.emit({
            page: this._page()
        });
    }

    startAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this._page() === this.totalDots() - 1) {
                    this.step(-1, 0);
                } else {
                    this.step(-1, this._page() + 1);
                }
            }
        }, this.autoplayInterval());
        this.allowAutoplay.set(true);
    }

    stopAutoplay(changeAllow: boolean = true) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
            if (changeAllow) {
                this.allowAutoplay.set(false);
            }
        }
    }

    isPlaying(): boolean {
        return !!this.interval;
    }

    onTransitionEnd() {
        const itemsContainerEl = this.itemsContainer();
        if (itemsContainerEl) {
            !this.$unstyled() && addClass(itemsContainerEl.nativeElement, 'p-items-hidden');
            itemsContainerEl.nativeElement.style.transition = '';

            if ((this._page() === 0 || this._page() === this.totalDots() - 1) && this.isCircular()) {
                itemsContainerEl.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems() * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems() * (100 / this._numVisible)}%, 0, 0)`;
            }
        }
    }

    onTouchStart(e: TouchEvent) {
        let touchobj = e.changedTouches[0];

        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }

    onTouchMove(e: TouchEvent | MouseEvent) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }

    onTouchEnd(e: TouchEvent) {
        if (!this.startPos) return;

        const touchobj = e.changedTouches[0];

        if (this.isVertical()) {
            this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
        } else {
            this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
        }
    }

    changePageOnTouch(e: TouchEvent | MouseEvent, diff: number) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            } else {
                this.navBackward(e);
            }
        }
    }

    ariaPrevButtonLabel() {
        return this.config.translation.aria ? this.config.translation.aria?.prevPageLabel : undefined;
    }

    ariaSlideLabel() {
        return this.config.translation.aria ? this.config.translation.aria?.slide : undefined;
    }

    ariaNextButtonLabel() {
        return this.config.translation.aria ? this.config.translation.aria?.nextPageLabel : undefined;
    }

    ariaSlideNumber(value: number) {
        return this.config.translation.aria ? this.config.translation.aria?.slideNumber?.replace(/{slideNumber}/g, String(value)) : undefined;
    }

    ariaPageLabel(value: number) {
        return this.config.translation.aria ? this.config.translation.aria?.pageLabel?.replace(/{page}/g, String(value)) : undefined;
    }

    getIndicatorPTOptions(key: string, index: number) {
        return this.ptm(key, {
            context: {
                highlighted: index === this._page()
            }
        });
    }

    getItemPTOptions(key: string, index: number) {
        return this.ptm(key, {
            context: {
                index,
                active: this.firstIndex() <= index && this.lastIndex() >= index,
                start: this.firstIndex() === index,
                end: this.lastIndex() === index
            }
        });
    }

    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                this.documentResizeListener = this.renderer.listen(this.window, 'resize', () => {
                    this.calculatePosition();
                });
            }
        }
    }

    unbindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.documentResizeListener) {
                this.documentResizeListener();
                this.documentResizeListener = null;
            }
        }
    }

    onDestroy() {
        this.unbindDocumentListeners();
        this.stopAutoplay();

        if (this.carouselStyle) {
            this.carouselStyle.remove();
            this.carouselStyle = null;
        }
    }
}

@NgModule({
    imports: [Carousel, SharedModule],
    exports: [Carousel, SharedModule]
})
export class CarouselModule {}
