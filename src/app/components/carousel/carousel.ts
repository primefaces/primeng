import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    NgZone,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { ChevronUpIcon } from 'primeng/icons/chevronup';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId } from 'primeng/utils';
import { CarouselPageEvent, CarouselResponsiveOptions } from './carousel.interface';
import { PrimeNGConfig } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
/**
 * Carousel is a content slider featuring various customization options.
 * @group Components
 */
@Component({
    selector: 'p-carousel',
    template: `
        <div [attr.id]="id" [ngClass]="{ 'p-carousel p-component': true, 'p-carousel-vertical': isVertical(), 'p-carousel-horizontal': !isVertical() }" [ngStyle]="style" [class]="styleClass" role="region">
            <div class="p-carousel-header" *ngIf="headerFacet || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div [class]="contentClass" [ngClass]="'p-carousel-content'">
                <div class="p-carousel-container" [attr.aria-live]="allowAutoplay ? 'polite' : 'off'">
                    <button
                        type="button"
                        *ngIf="showNavigators"
                        [ngClass]="{ 'p-carousel-prev p-link': true, 'p-disabled': isBackwardNavDisabled() }"
                        [disabled]="isBackwardNavDisabled()"
                        [attr.aria-label]="ariaPrevButtonLabel()"
                        (click)="navBackward($event)"
                        pRipple
                    >
                        <ng-container *ngIf="!previousIconTemplate">
                            <ChevronLeftIcon *ngIf="!isVertical()" [styleClass]="'carousel-prev-icon'" />
                            <ChevronUpIcon *ngIf="isVertical()" [styleClass]="'carousel-prev-icon'" />
                        </ng-container>
                        <span *ngIf="previousIconTemplate" class="p-carousel-prev-icon">
                            <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                        </span>
                    </button>
                    <div class="p-carousel-items-content" [ngStyle]="{ height: isVertical() ? verticalViewPortHeight : 'auto' }" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
                        <div #itemsContainer class="p-carousel-items-container" (transitionend)="onTransitionEnd()">
                            <div
                                *ngFor="let item of clonedItemsForStarting; let index = index"
                                [ngClass]="{
                                    'p-carousel-item p-carousel-item-cloned': true,
                                    'p-carousel-item-active': totalShiftedItems * -1 === value.length,
                                    'p-carousel-item-start': 0 === index,
                                    'p-carousel-item-end': clonedItemsForStarting.length - 1 === index
                                }"
                                [attr.aria-hidden]="!(totalShiftedItems * -1 === value.length)"
                                [attr.aria-label]="ariaSlideNumber(index)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                            <div
                                *ngFor="let item of value; let index = index"
                                [ngClass]="{ 'p-carousel-item': true, 'p-carousel-item-active': firstIndex() <= index && lastIndex() >= index, 'p-carousel-item-start': firstIndex() === index, 'p-carousel-item-end': lastIndex() === index }"
                                [attr.aria-hidden]="!(totalShiftedItems * -1 === value.length)"
                                [attr.aria-label]="ariaSlideNumber(index)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                            <div
                                *ngFor="let item of clonedItemsForFinishing; let index = index"
                                [ngClass]="{
                                    'p-carousel-item p-carousel-item-cloned': true,
                                    'p-carousel-item-active': totalShiftedItems * -1 === numVisible,
                                    'p-carousel-item-start': 0 === index,
                                    'p-carousel-item-end': clonedItemsForFinishing.length - 1 === index
                                }"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        *ngIf="showNavigators"
                        [ngClass]="{ 'p-carousel-next p-link': true, 'p-disabled': isForwardNavDisabled() }"
                        [disabled]="isForwardNavDisabled()"
                        (click)="navForward($event)"
                        pRipple
                        [attr.aria-label]="ariaNextButtonLabel()"
                    >
                        <ng-container *ngIf="!nextIconTemplate">
                            <ChevronRightIcon *ngIf="!isVertical()" [styleClass]="'carousel-prev-icon'" />
                            <ChevronDownIcon *ngIf="isVertical()" [styleClass]="'carousel-prev-icon'" />
                        </ng-container>
                        <span *ngIf="nextIconTemplate" class="p-carousel-prev-icon">
                            <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                        </span>
                    </button>
                </div>
                <ul #indicatorContent [ngClass]="'p-carousel-indicators p-reset'" [class]="indicatorsContentClass" [ngStyle]="indicatorsContentStyle" *ngIf="showIndicators" (keydown)="onIndicatorKeydown($event)">
                    <li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{ 'p-carousel-indicator': true, 'p-highlight': _page === i }" [attr.data-pc-section]="'indicator'">
                        <button
                            type="button"
                            [ngClass]="'p-link'"
                            (click)="onDotClick($event, i)"
                            [class]="indicatorStyleClass"
                            [ngStyle]="indicatorStyle"
                            [attr.aria-label]="ariaPageLabel(i + 1)"
                            [attr.aria-current]="_page === i ? 'page' : undefined"
                            [tabindex]="_page === i ? 0 : -1"
                        ></button>
                    </li>
                </ul>
            </div>
            <div class="p-carousel-footer" *ngIf="footerFacet || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./carousel.css'],
    host: {
        class: 'p-element'
    }
})
export class Carousel implements AfterContentInit {
    /**
     * Index of the first item.
     * @defaultValue 0
     * @group Props
     */
    @Input() get page(): number {
        return this._page;
    }
    set page(val: number) {
        if (this.isCreated && val !== this._page) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }

            if (val > this._page && val <= this.totalDots() - 1) {
                this.step(-1, val);
            } else if (val < this._page) {
                this.step(1, val);
            }
        }

        this._page = val;
    }
    /**
     * Number of items per page.
     * @defaultValue 1
     * @group Props
     */
    @Input() get numVisible(): number {
        return this._numVisible;
    }
    set numVisible(val: number) {
        this._numVisible = val;
    }
    /**
     * Number of items to scroll.
     * @defaultValue 1
     * @group Props
     */
    @Input() get numScroll(): number {
        return this._numVisible;
    }
    set numScroll(val: number) {
        this._numScroll = val;
    }
    /**
     * An array of options for responsive design.
     * @see {CarouselResponsiveOptions}
     * @group Props
     */
    @Input() responsiveOptions: CarouselResponsiveOptions[] | undefined;
    /**
     * Specifies the layout of the component.
     * @group Props
     */
    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
    /**
     * Height of the viewport in vertical layout.
     * @group Props
     */
    @Input() verticalViewPortHeight: string = '300px';
    /**
     * Style class of main content.
     * @group Props
     */
    @Input() contentClass: string = '';
    /**
     * Style class of the indicator items.
     * @group Props
     */
    @Input() indicatorsContentClass: string = '';
    /**
     * Inline style of the indicator items.
     * @group Props
     */
    @Input() indicatorsContentStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the indicators.
     * @group Props
     */
    @Input() indicatorStyleClass: string = '';
    /**
     * Style of the indicators.
     * @group Props
     */
    @Input() indicatorStyle: { [klass: string]: any } | null | undefined;
    /**
     * An array of objects to display.
     * @defaultValue null
     * @group Props
     */
    @Input() get value(): any[] {
        return this._value as any[];
    }
    set value(val) {
        this._value = val;
    }
    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) circular: boolean = false;
    /**
     * Whether to display indicator container.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showIndicators: boolean = true;
    /**
     * Whether to display navigation buttons in container.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showNavigators: boolean = true;
    /**
     * Time in milliseconds to scroll items automatically.
     * @group Props
     */
    @Input({ transform: numberAttribute }) autoplayInterval: number = 0;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the viewport container.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Callback to invoke after scroll.
     * @param {CarouselPageEvent} event - Custom page event.
     * @group Emits
     */
    @Output() onPage: EventEmitter<CarouselPageEvent> = new EventEmitter<CarouselPageEvent>();

    @ViewChild('itemsContainer') itemsContainer: ElementRef | undefined;

    @ViewChild('indicatorContent') indicatorContent: ElementRef | undefined;

    @ContentChild(Header) headerFacet: QueryList<Header> | undefined;

    @ContentChild(Footer) footerFacet: QueryList<Footer> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _numVisible: number = 1;

    _numScroll: number = 1;

    _oldNumScroll: number = 0;

    prevState: any = {
        numScroll: 0,
        numVisible: 0,
        value: []
    };

    defaultNumScroll: number = 1;

    defaultNumVisible: number = 1;

    _page: number = 0;

    _value: any[] | null | undefined;

    carouselStyle: any;

    id: string | undefined;

    totalShiftedItems;

    isRemainingItemsAdded: boolean = false;

    animationTimeout: any;

    translateTimeout: any;

    remainingItems: number = 0;

    _items: any[] | undefined;

    startPos: any;

    documentResizeListener: any;

    clonedItemsForStarting: any[] | undefined;

    clonedItemsForFinishing: any[] | undefined;

    allowAutoplay: boolean | undefined;

    interval: any;

    isCreated: boolean | undefined;

    swipeThreshold: number = 20;

    itemTemplate: TemplateRef<any> | undefined;

    headerTemplate: TemplateRef<any> | undefined;

    footerTemplate: TemplateRef<any> | undefined;

    previousIconTemplate: TemplateRef<any> | undefined;

    nextIconTemplate: TemplateRef<any> | undefined;

    window: Window;

    constructor(public el: ElementRef, public zone: NgZone, public cd: ChangeDetectorRef, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private config: PrimeNGConfig) {
        this.totalShiftedItems = this.page * this.numScroll * -1;
        this.window = this.document.defaultView as Window;
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (isPlatformBrowser(this.platformId)) {
            if (simpleChange.value) {
                if (this.circular && this._value) {
                    this.setCloneItems();
                }
            }

            if (this.isCreated) {
                if (simpleChange.numVisible) {
                    if (this.responsiveOptions) {
                        this.defaultNumVisible = this.numVisible;
                    }

                    if (this.isCircular()) {
                        this.setCloneItems();
                    }

                    this.createStyle();
                    this.calculatePosition();
                }

                if (simpleChange.numScroll) {
                    if (this.responsiveOptions) {
                        this.defaultNumScroll = this.numScroll;
                    }
                }
            }
        }
        this.cd.markForCheck();
    }

    ngAfterContentInit() {
        this.id = UniqueComponentId();
        if (isPlatformBrowser(this.platformId)) {
            this.allowAutoplay = !!this.autoplayInterval;

            if (this.circular) {
                this.setCloneItems();
            }

            if (this.responsiveOptions) {
                this.defaultNumScroll = this._numScroll;
                this.defaultNumVisible = this._numVisible;
            }

            this.createStyle();
            this.calculatePosition();

            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
        }

        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;

                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
        this.cd.detectChanges();
    }

    ngAfterContentChecked() {
        if (isPlatformBrowser(this.platformId)) {
            const isCircular = this.isCircular();
            let totalShiftedItems = this.totalShiftedItems;

            if (this.value && this.itemsContainer && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
                if (this.autoplayInterval) {
                    this.stopAutoplay(false);
                }

                this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;

                let page = this._page;
                if (this.totalDots() !== 0 && page >= this.totalDots()) {
                    page = this.totalDots() - 1;
                    this._page = page;
                    this.onPage.emit({
                        page: this.page
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

                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }

                this._oldNumScroll = this._numScroll;
                this.prevState.numScroll = this._numScroll;
                this.prevState.numVisible = this._numVisible;
                this.prevState.value = [...(this._value as any[])];

                if (this.totalDots() > 0 && this.itemsContainer.nativeElement) {
                    this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
                }

                this.isCreated = true;

                if (this.autoplayInterval && this.isAutoplay()) {
                    this.startAutoplay();
                }
            }

            if (isCircular) {
                if (this.page === 0) {
                    totalShiftedItems = -1 * this._numVisible;
                } else if (totalShiftedItems === 0) {
                    totalShiftedItems = -1 * this.value.length;
                    if (this.remainingItems > 0) {
                        this.isRemainingItemsAdded = true;
                    }
                }

                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
            }
        }
    }

    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = this.renderer.createElement('style');
            this.carouselStyle.type = 'text/css';
            this.renderer.appendChild(this.document.head, this.carouselStyle);
        }

        let innerHTML = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${100 / this.numVisible}%
			}
        `;

        if (this.responsiveOptions) {
            this.responsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;

                if (value1 == null && value2 != null) result = -1;
                else if (value1 != null && value2 == null) result = 1;
                else if (value1 == null && value2 == null) result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });
                else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                return -1 * result;
            });

            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];

                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }

        this.carouselStyle.innerHTML = innerHTML;
    }

    calculatePosition() {
        if (this.responsiveOptions) {
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };

            if (typeof window !== 'undefined') {
                let windowWidth = window.innerWidth;
                for (let i = 0; i < this.responsiveOptions.length; i++) {
                    let res = this.responsiveOptions[i];

                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
            }

            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);

                let totalShiftedItems = matchedResponsiveData.numScroll * this.page * -1;

                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }

                this.totalShiftedItems = totalShiftedItems;
                this._numScroll = matchedResponsiveData.numScroll;

                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }

            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }

            this.cd.markForCheck();
        }
    }

    setCloneItems() {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
            this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
        }
    }

    firstIndex() {
        return this.isCircular() ? -1 * (this.totalShiftedItems + this.numVisible) : this.totalShiftedItems * -1;
    }

    lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
    }

    totalDots() {
        return this.value?.length ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }

    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    }

    isVertical() {
        return this.orientation === 'vertical';
    }

    isCircular() {
        return this.circular && this.value && this.value.length >= this.numVisible;
    }

    isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
    }

    isForwardNavDisabled() {
        return this.isEmpty() || (this._page >= this.totalDots() - 1 && !this.isCircular());
    }

    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    }

    isEmpty() {
        return !this.value || this.value.length === 0;
    }

    navForward(e: MouseEvent | TouchEvent, index?: number) {
        if (this.isCircular() || this._page < this.totalDots() - 1) {
            this.step(-1, index);
        }

        if (this.autoplayInterval) {
            this.stopAutoplay();
        }

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    navBackward(e: MouseEvent | TouchEvent, index?: number) {
        if (this.isCircular() || this._page !== 0) {
            this.step(1, index);
        }

        if (this.autoplayInterval) {
            this.stopAutoplay();
        }

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    onDotClick(e: MouseEvent, index: number) {
        let page = this._page;

        if (this.autoplayInterval) {
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
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
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
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]r')];
        const activeIndex = this.findFocusedIndicatorIndex();

        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }

    onTabKey() {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
        const highlightedIndex = indicators.findIndex((ind) => DomHandler.getAttribute(ind, 'data-p-highlight') === true);

        const activeIndicator = DomHandler.findSingle(this.indicatorContent.nativeElement, '[data-pc-section="indicator"] > button[tabindex="0"]');
        const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);

        indicators[activeIndex].children[0].tabIndex = '-1';
        indicators[highlightedIndex].children[0].tabIndex = '0';
    }

    findFocusedIndicatorIndex() {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
        const activeIndicator = DomHandler.findSingle(this.indicatorContent.nativeElement, '[data-pc-section="indicator"] > button[tabindex="0"]');

        return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
    }

    changedFocusedIndicator(prevInd, nextInd) {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];

        indicators[prevInd].children[0].tabIndex = '-1';
        indicators[nextInd].children[0].tabIndex = '0';
        indicators[nextInd].children[0].focus();
    }

    step(dir: number, page?: number) {
        let totalShiftedItems = this.totalShiftedItems;
        const isCircular = this.isCircular();

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

        if (isCircular && this.page === this.totalDots() - 1 && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        } else if (isCircular && this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = this.totalDots() - 1;
        } else if (page === this.totalDots() - 1 && this.remainingItems > 0) {
            totalShiftedItems += this.remainingItems * -1 - this._numScroll * dir;
            this.isRemainingItemsAdded = true;
        }

        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }

        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
        this.cd.markForCheck();
    }

    startAutoplay() {
        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this.page === this.totalDots() - 1) {
                    this.step(-1, 0);
                } else {
                    this.step(-1, this.page + 1);
                }
            }
        }, this.autoplayInterval);
        this.allowAutoplay = true;
        this.cd.markForCheck();
    }

    stopAutoplay(changeAllow: boolean = true) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
            if (changeAllow) {
                this.allowAutoplay = false;
            }
        }
        this.cd.markForCheck();
    }

    isPlaying(): boolean {
        return !!this.interval;
    }

    onTransitionEnd() {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';

            if ((this.page === 0 || this.page === this.totalDots() - 1) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
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
        let touchobj = e.changedTouches[0];

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
        return this.config.translation.aria ? this.config.translation.aria.prevPageLabel : undefined;
    }

    ariaSlideLabel() {
        return this.config.translation.aria ? this.config.translation.aria.slide : undefined;
    }

    ariaNextButtonLabel() {
        return this.config.translation.aria ? this.config.translation.aria.nextPageLabel : undefined;
    }

    ariaSlideNumber(value) {
        return this.config.translation.aria ? this.config.translation.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
    }

    ariaPageLabel(value) {
        return this.config.translation.aria ? this.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }

    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
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

    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RippleModule, ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon],
    exports: [CommonModule, Carousel, SharedModule],
    declarations: [Carousel]
})
export class CarouselModule {}
