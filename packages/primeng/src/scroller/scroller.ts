import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject, InjectionToken, input, NgModule, output, signal, TemplateRef, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { findSingle, getHeight, getWidth, isTouchDevice, isVisible } from '@primeuix/utils';
import { ScrollerOptions } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Spinner as SpinnerIcon } from '@primeicons/angular/spinner';
import { VoidListener } from 'primeng/ts-helpers';
import {
    ScrollerContentTemplateContext,
    ScrollerItemTemplateContext,
    ScrollerLazyLoadEvent,
    ScrollerLoaderIconTemplateContext,
    ScrollerLoaderTemplateContext,
    ScrollerScrollEvent,
    ScrollerScrollIndexChangeEvent,
    ScrollerToType,
    VirtualScrollerPassThrough
} from 'primeng/types/scroller';
import { ScrollerStyle } from './style/scrollerstyle';
import { CSSProperties } from 'primeng/types/shared';

const SCROLLER_INSTANCE = new InjectionToken<Scroller>('SCROLLER_INSTANCE');

/**
 * Scroller is a performance-approach to handle huge data efficiently.
 * @group Components
 */
@Component({
    selector: 'p-scroller, p-virtualscroller, p-virtual-scroller',
    imports: [NgTemplateOutlet, SpinnerIcon, Bind],
    standalone: true,
    template: `
        @if (!_disabled()) {
            <div #element [attr.id]="_id()" [attr.tabindex]="_tabindex()" [style]="_style()" [class]="cn(cx('root'), _styleClass())" (scroll)="onContainerScroll($event)" [pBind]="ptm('root')">
                @if (contentTemplate()) {
                    <ng-container *ngTemplateOutlet="contentTemplate(); context: getContentTemplateContext()"></ng-container>
                } @else {
                    <div #content [class]="cn(cx('content'), contentStyleClass())" [style]="contentStyle" [pBind]="ptm('content')">
                        @for (item of loadedItems; track _trackBy() ? _trackBy()($index, item) : $index; let index = $index) {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(item, index)"></ng-container>
                        }
                    </div>
                }
                @if (_showSpacer()) {
                    <div [class]="cx('spacer')" [style]="spacerStyle" [pBind]="ptm('spacer')"></div>
                }
                @if (!_loaderDisabled() && _showLoader() && d_loading) {
                    <div [class]="cx('loader')" [pBind]="ptm('loader')">
                        @if (loaderTemplate()) {
                            @for (item of loaderArr; track $index; let index = $index) {
                                <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderTemplateContext(index)"></ng-container>
                            }
                        } @else {
                            @if (loaderIconTemplate()) {
                                <ng-container *ngTemplateOutlet="loaderIconTemplate(); context: loaderIconContext"></ng-container>
                            } @else {
                                <svg data-p-icon="spinner" [class]="cn(cx('loadingIcon'), 'animate-spin')" [pBind]="ptm('loadingIcon')" />
                            }
                        }
                    </div>
                }
            </div>
        } @else {
            <ng-content />
            @if (contentTemplate()) {
                <ng-container *ngTemplateOutlet="contentTemplate(); context: getDisabledContentTemplateContext()"></ng-container>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    providers: [ScrollerStyle, { provide: SCROLLER_INSTANCE, useExisting: Scroller }, { provide: PARENT_INSTANCE, useExisting: Scroller }],
    hostDirectives: [Bind],
    host: {
        '[style.height]': 'hostHeight()'
    }
})
export class Scroller extends BaseComponent<VirtualScrollerPassThrough> {
    componentName = 'VirtualScroller';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcScroller: Scroller | undefined = inject(SCROLLER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    hostName = input('');
    /**
     * Unique identifier of the element.
     * @group Props
     */
    id = input<string | undefined>();
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<any>();
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass = input<string | undefined>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0);
    /**
     * An array of objects to display.
     * @group Props
     */
    items = input<any[] | undefined | null>();
    /**
     * The height/width of item according to orientation.
     * @group Props
     */
    itemSize = input<number | number[]>(0);
    /**
     * Height of the scroll viewport.
     * @group Props
     */
    scrollHeight = input<string | undefined>();
    /**
     * Width of the scroll viewport.
     * @group Props
     */
    scrollWidth = input<string | undefined>();
    /**
     * The orientation of scrollbar.
     * @group Props
     */
    orientation = input<'vertical' | 'horizontal' | 'both'>('vertical');
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @group Props
     */
    step = input(0);
    /**
     * Delay in scroll before new data is loaded.
     * @group Props
     */
    delay = input(0);
    /**
     * Delay after window's resize finishes.
     * @group Props
     */
    resizeDelay = input(10);
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @group Props
     */
    appendOnly = input(false);
    /**
     * Specifies whether the scroller should be displayed inline or not.
     * @group Props
     */
    inline = input(false);
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = input(false);
    /**
     * If disabled, the scroller feature is eliminated and the content is displayed directly.
     * @group Props
     */
    disabled = input(false);
    /**
     * Used to implement a custom loader instead of using the loader feature in the scroller.
     * @group Props
     */
    loaderDisabled = input(false);
    /**
     * Columns to display.
     * @group Props
     */
    columns = input<any[] | undefined | null>();
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the scroller.
     * @group Props
     */
    showSpacer = input(true);
    /**
     * Defines whether to show loader.
     * @group Props
     */
    showLoader = input(false);
    /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     * @group Props
     */
    numToleratedItems = input<any>();
    /**
     * Defines whether the data is loaded.
     * @group Props
     */
    loading = input<boolean | undefined>();
    /**
     * Defines whether to dynamically change the height or width of scrollable container.
     * @group Props
     */
    autoSize = input(false);
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
     * @group Props
     */
    trackBy = input<Function>();
    /**
     * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    options = input<ScrollerOptions | undefined>();

    // Computed: Options merge with individual inputs
    _id = computed(() => this.options()?.id ?? this.id());
    _style = computed(() => this.options()?.style ?? this.style());
    _styleClass = computed(() => this.options()?.styleClass ?? this.styleClass());
    _tabindex = computed(() => this.options()?.tabindex ?? this.tabindex());
    _items = computed(() => this.options()?.items ?? this.items());
    _itemSize = computed(() => this.options()?.itemSize ?? this.itemSize());
    _scrollHeight = computed(() => this.options()?.scrollHeight ?? this.scrollHeight());
    _scrollWidth = computed(() => this.options()?.scrollWidth ?? this.scrollWidth());
    _orientation = computed(() => this.options()?.orientation ?? this.orientation());
    _step = computed(() => this.options()?.step ?? this.step());
    _delay = computed(() => this.options()?.delay ?? this.delay());
    _resizeDelay = computed(() => this.options()?.resizeDelay ?? this.resizeDelay());
    _appendOnly = computed(() => this.options()?.appendOnly ?? this.appendOnly());
    _inline = computed(() => this.options()?.inline ?? this.inline());
    _lazy = computed(() => this.options()?.lazy ?? this.lazy());
    _disabled = computed(() => this.options()?.disabled ?? this.disabled());
    _loaderDisabled = computed(() => this.options()?.loaderDisabled ?? this.loaderDisabled());
    _columns = computed(() => this.options()?.columns ?? this.columns());
    _showSpacer = computed(() => this.options()?.showSpacer ?? this.showSpacer());
    _showLoader = computed(() => this.options()?.showLoader ?? this.showLoader());
    _numToleratedItems = computed(() => this.options()?.numToleratedItems ?? this.numToleratedItems());
    _loading = computed(() => this.options()?.loading ?? this.loading());
    _autoSize = computed(() => this.options()?.autoSize ?? this.autoSize());
    _trackBy = computed(() => this.options()?.trackBy ?? this.trackBy());

    contentStyleClass = computed(() => this.options()?.contentStyleClass);

    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = output<ScrollerLazyLoadEvent>();
    /**
     * Callback to invoke when scroll position changes.
     * @param {ScrollerScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = output<ScrollerScrollEvent>();
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     * @param {ScrollerScrollEvent} event - Custom scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = output<ScrollerScrollIndexChangeEvent>();

    elementViewChild = viewChild<ElementRef>('element');

    contentViewChild = viewChild<ElementRef>('content');

    hostHeight = signal<string | undefined>(undefined);

    /**
     * Content template of the component.
     * @param {ScrollerContentTemplateContext} context - content context.
     * @see {@link ScrollerContentTemplateContext}
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<ScrollerContentTemplateContext>>('content', { descendants: false });

    /**
     * Item template of the component.
     * @param {ScrollerItemTemplateContext} context - item context.
     * @see {@link ScrollerItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<ScrollerItemTemplateContext>>('item', { descendants: false });

    /**
     * Loader template of the component.
     * @param {ScrollerLoaderTemplateContext} context - loader context.
     * @see {@link ScrollerLoaderTemplateContext}
     * @group Templates
     */
    loaderTemplate = contentChild<TemplateRef<ScrollerLoaderTemplateContext>>('loader', { descendants: false });

    /**
     * Loader icon template of the component.
     * @param {ScrollerLoaderIconTemplateContext} context - loader icon context.
     * @see {@link ScrollerLoaderIconTemplateContext}
     * @group Templates
     */
    loaderIconTemplate = contentChild<TemplateRef<ScrollerLoaderIconTemplateContext>>('loadericon', { descendants: false });

    d_loading: boolean = false;

    d_numToleratedItems: any;

    contentEl: any;

    vertical = computed(() => this._orientation() === 'vertical');

    horizontal = computed(() => this._orientation() === 'horizontal');

    both = computed(() => this._orientation() === 'both');

    get loadedItems() {
        const items = this._items();
        if (items && !this.d_loading) {
            if (this.both()) {
                return items.slice(this._appendOnly() ? 0 : this.first.rows, this.last.rows).map((item) => {
                    if (this._columns()) {
                        return item;
                    } else if (Array.isArray(item)) {
                        return item.slice(this._appendOnly() ? 0 : this.first.cols, this.last.cols);
                    } else {
                        return item;
                    }
                });
            } else if (this.horizontal() && this._columns()) return items;
            else return items.slice(this._appendOnly() ? 0 : this.first, this.last);
        }

        return [];
    }

    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled() ? this.loaderArr : []) : this.loadedItems;
    }

    get loadedColumns() {
        const columns = this._columns();
        if (columns && (this.both() || this.horizontal())) {
            return this.d_loading && this._loaderDisabled() ? (this.both() ? this.loaderArr[0] : this.loaderArr) : columns.slice(this.both() ? this.first.cols : this.first, this.both() ? this.last.cols : this.last);
        }

        return columns;
    }

    first: any = 0;

    last: any = 0;

    page: number = 0;

    isRangeChanged: boolean = false;

    numItemsInViewport: any = 0;

    lastScrollPos: any = 0;

    lazyLoadState: any = {};

    loaderArr: any[] = [];

    spacerStyle: CSSProperties;

    contentStyle: CSSProperties;

    scrollTimeout: any;

    resizeTimeout: any;

    initialized: boolean = false;

    windowResizeListener: VoidListener;

    defaultWidth: number | undefined;

    defaultHeight: number | undefined;

    defaultContentWidth: number | undefined;

    defaultContentHeight: number | undefined;

    _componentStyle = inject(ScrollerStyle);

    constructor() {
        super();

        // hostHeight
        effect(() => {
            if (this._scrollHeight() === '100%') {
                this.hostHeight.set('100%');
            }
        });

        // loading sync
        effect(() => {
            const loading = this._loading();
            untracked(() => {
                if (this._lazy() && loading !== undefined && loading !== this.d_loading) {
                    this.d_loading = loading;
                }
            });
        });

        // orientation reset
        effect(() => {
            this._orientation();
            untracked(() => {
                this.lastScrollPos = this.both() ? { top: 0, left: 0 } : 0;
            });
        });

        // numToleratedItems sync
        effect(() => {
            const numT = this._numToleratedItems();
            untracked(() => {
                if (numT !== undefined && numT !== this.d_numToleratedItems) {
                    this.d_numToleratedItems = numT;
                }
            });
        });

        // reinit on size/scroll changes
        effect(() => {
            this._itemSize();
            this._scrollHeight();
            this._scrollWidth();
            untracked(() => {
                if (this.initialized) {
                    this.init();
                    this.calculateAutoSize();
                }
            });
        });

        // items change
        effect(() => {
            this._items();
            untracked(() => {
                if (this.initialized && !this._lazy()) {
                    this.init();
                }
            });
        });

        // contentStyle sync from options
        effect(() => {
            const opts = this.options();
            untracked(() => {
                if (opts?.contentStyle !== undefined) {
                    this.contentStyle = opts.contentStyle;
                }
            });
        });
    }

    onInit() {
        this.setInitialState();
    }

    onAfterViewInit() {
        Promise.resolve().then(() => {
            this.viewInit();
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
        if (!this.initialized) {
            this.viewInit();
        }
    }

    onDestroy() {
        this.unbindResizeListener();

        this.contentEl = null;
        this.initialized = false;
    }

    viewInit() {
        if (isPlatformBrowser(this.platformId) && !this.initialized) {
            if (isVisible(this.elementViewChild()?.nativeElement)) {
                this.setInitialState();
                this.setContentEl(this.contentEl);
                this.init();

                this.defaultWidth = getWidth(this.elementViewChild()?.nativeElement);
                this.defaultHeight = getHeight(this.elementViewChild()?.nativeElement);
                this.defaultContentWidth = getWidth(this.contentEl);
                this.defaultContentHeight = getHeight(this.contentEl);
                this.initialized = true;
            }
        }
    }

    init() {
        if (!this._disabled()) {
            this.bindResizeListener();

            // wait for the next tick
            setTimeout(() => {
                this.setSpacerSize();
                this.setSize();
                this.calculateOptions();
                this.calculateAutoSize();
                this.cd.detectChanges();
            }, 1);
        }
    }

    setContentEl(el?: HTMLElement) {
        this.contentEl = el || this.contentViewChild()?.nativeElement || findSingle(this.elementViewChild()?.nativeElement, '.p-virtualscroller-content');
    }
    setInitialState() {
        this.first = this.both() ? { rows: 0, cols: 0 } : 0;
        this.last = this.both() ? { rows: 0, cols: 0 } : 0;
        this.numItemsInViewport = this.both() ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both() ? { top: 0, left: 0 } : 0;
        if (this.d_loading === undefined || this.d_loading === false) {
            this.d_loading = this._loading() || false;
        }
        this.d_numToleratedItems = this._numToleratedItems();
        this.loaderArr = this.loaderArr.length > 0 ? this.loaderArr : [];
    }

    getElementRef() {
        return this.elementViewChild();
    }

    getPageByFirst(first?: any) {
        return Math.floor(((first ?? this.first) + this.d_numToleratedItems * 4) / (this._step() || 1));
    }

    isPageChanged(first?: any) {
        return this._step() ? this.page !== this.getPageByFirst(first ?? this.first) : true;
    }

    scrollTo(options: ScrollToOptions) {
        this.elementViewChild()?.nativeElement?.scrollTo(options);
    }

    scrollToIndex(index: number | number[], behavior: ScrollBehavior = 'auto') {
        const valid = this.both() ? (index as number[]).every((i) => i > -1) : (index as number) > -1;

        if (valid) {
            const first = this.first;
            const { scrollTop = 0, scrollLeft = 0 } = this.elementViewChild()?.nativeElement;
            const { numToleratedItems } = this.calculateNumItems();
            const contentPos = this.getContentPosition();
            const itemSize = this._itemSize();
            const calculateFirst = (_index = 0, _numT: number) => (_index <= _numT ? 0 : _index);
            const calculateCoord = (_first: number, _size: number, _cpos: number) => _first * _size + _cpos;
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            let newFirst = this.both() ? { rows: 0, cols: 0 } : 0;
            let isRangeChanged = false,
                isScrollChanged = false;

            if (this.both()) {
                newFirst = {
                    rows: calculateFirst(index[0], numToleratedItems[0]),
                    cols: calculateFirst(index[1], numToleratedItems[1])
                };
                scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
                isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
                isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
            } else {
                newFirst = calculateFirst(index as number, numToleratedItems);
                this.horizontal() ? scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), scrollTop) : scrollTo(scrollLeft, calculateCoord(newFirst, itemSize, contentPos.top));
                isScrollChanged = this.lastScrollPos !== (this.horizontal() ? scrollLeft : scrollTop);
                isRangeChanged = newFirst !== first;
            }

            this.isRangeChanged = isRangeChanged;
            isScrollChanged && (this.first = newFirst);
        }
    }

    scrollInView(index: number, to: ScrollerToType, behavior: ScrollBehavior = 'auto') {
        if (to) {
            const { first, viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';

            if (isToStart) {
                if (this.both()) {
                    if (viewport.first.rows - first.rows > (<any>index)[0]) {
                        scrollTo(viewport.first.cols * (<number[]>this._itemSize())[1], (viewport.first.rows - 1) * (<number[]>this._itemSize())[0]);
                    } else if (viewport.first.cols - first.cols > (<any>index)[1]) {
                        scrollTo((viewport.first.cols - 1) * (<number[]>this._itemSize())[1], viewport.first.rows * (<number[]>this._itemSize())[0]);
                    }
                } else {
                    if (viewport.first - first > index) {
                        const pos = (viewport.first - 1) * <number>this._itemSize();
                        this.horizontal() ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            } else if (isToEnd) {
                if (this.both()) {
                    if (viewport.last.rows - first.rows <= (<any>index)[0] + 1) {
                        scrollTo(viewport.first.cols * (<number[]>this._itemSize())[1], (viewport.first.rows + 1) * (<number[]>this._itemSize())[0]);
                    } else if (viewport.last.cols - first.cols <= (<any>index)[1] + 1) {
                        scrollTo((viewport.first.cols + 1) * (<number[]>this._itemSize())[1], viewport.first.rows * (<number[]>this._itemSize())[0]);
                    }
                } else {
                    if (viewport.last - first <= index + 1) {
                        const pos = (viewport.first + 1) * <number>this._itemSize();
                        this.horizontal() ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        } else {
            this.scrollToIndex(index, behavior);
        }
    }

    getRenderedRange() {
        const calculateFirstInViewport = (_pos: number, _size: number) => (_size || _pos ? Math.floor(_pos / (_size || _pos)) : 0);

        let firstInViewport = this.first;
        let lastInViewport: any = 0;
        const el = this.elementViewChild()?.nativeElement;

        if (el) {
            const { scrollTop, scrollLeft } = el;

            if (this.both()) {
                firstInViewport = {
                    rows: calculateFirstInViewport(scrollTop, (<number[]>this._itemSize())[0]),
                    cols: calculateFirstInViewport(scrollLeft, (<number[]>this._itemSize())[1])
                };
                lastInViewport = {
                    rows: firstInViewport.rows + this.numItemsInViewport.rows,
                    cols: firstInViewport.cols + this.numItemsInViewport.cols
                };
            } else {
                const scrollPos = this.horizontal() ? scrollLeft : scrollTop;
                firstInViewport = calculateFirstInViewport(scrollPos, <number>this._itemSize());
                lastInViewport = firstInViewport + this.numItemsInViewport;
            }
        }

        return {
            first: this.first,
            last: this.last,
            viewport: {
                first: firstInViewport,
                last: lastInViewport
            }
        };
    }

    calculateNumItems() {
        const contentPos = this.getContentPosition();
        const el = this.elementViewChild()?.nativeElement;
        const contentWidth = (el ? el.offsetWidth - contentPos.left : 0) || 0;
        const contentHeight = (el ? el.offsetHeight - contentPos.top : 0) || 0;
        const calculateNumItemsInViewport = (_contentSize: number, _itemSize: number) => (_itemSize || _contentSize ? Math.ceil(_contentSize / (_itemSize || _contentSize)) : 0);
        const calculateNumToleratedItems = (_numItems: number) => Math.ceil(_numItems / 2);
        const numItemsInViewport: any = this.both()
            ? {
                  rows: calculateNumItemsInViewport(contentHeight, (<number[]>this._itemSize())[0]),
                  cols: calculateNumItemsInViewport(contentWidth, (<number[]>this._itemSize())[1])
              }
            : calculateNumItemsInViewport(this.horizontal() ? contentWidth : contentHeight, <number>this._itemSize());

        const numToleratedItems = this.d_numToleratedItems || (this.both() ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));

        return { numItemsInViewport, numToleratedItems };
    }

    calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
        const calculateLast = (_first: number, _num: number, _numT: number, _isCols: boolean = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
        const first = this.first;
        const last = this.both()
            ? {
                  rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]),
                  cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
              }
            : calculateLast(this.first, numItemsInViewport, numToleratedItems);

        this.last = last;
        this.numItemsInViewport = numItemsInViewport;
        this.d_numToleratedItems = numToleratedItems;

        if (this._showLoader()) {
            this.loaderArr = this.both() ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
        }

        if (this._lazy()) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step() ? (this.both() ? { rows: 0, cols: first.cols } : 0) : first,
                    last: Math.min(this._step() ? this._step() : this.last, (<any[]>this._items()).length)
                };

                this.handleEvents('onLazyLoad', this.lazyLoadState);
            });
        }
    }

    calculateAutoSize() {
        if (this._autoSize() && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';
                    this.contentEl.style.position = 'relative';
                    (<ElementRef>this.elementViewChild()).nativeElement.style.contain = 'none';

                    const [contentWidth, contentHeight] = [getWidth(this.contentEl), getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && ((<ElementRef>this.elementViewChild()).nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && ((<ElementRef>this.elementViewChild()).nativeElement.style.height = '');

                    const [width, height] = [getWidth((<ElementRef>this.elementViewChild()).nativeElement), getHeight((<ElementRef>this.elementViewChild()).nativeElement)];
                    (this.both() || this.horizontal()) && ((<ElementRef>this.elementViewChild()).nativeElement.style.width = width < <number>this.defaultWidth ? width + 'px' : this._scrollWidth() || this.defaultWidth + 'px');
                    (this.both() || this.vertical()) && ((<ElementRef>this.elementViewChild()).nativeElement.style.height = height < <number>this.defaultHeight ? height + 'px' : this._scrollHeight() || this.defaultHeight + 'px');

                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    (<ElementRef>this.elementViewChild()).nativeElement.style.contain = '';
                }
            });
        }
    }

    getLast(last = 0, isCols = false) {
        const items = this._items();
        const columns = this._columns();
        return items ? Math.min(isCols ? (columns || items[0]).length : items.length, last) : 0;
    }

    getContentPosition() {
        if (this.contentEl) {
            const style = getComputedStyle(this.contentEl);
            const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
            const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
            const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
            const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);

            return { left, right, top, bottom, x: left + right, y: top + bottom };
        }

        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }

    setSize() {
        const nativeElement = this.elementViewChild()?.nativeElement;
        if (nativeElement) {
            const parentElement = nativeElement.parentElement?.parentElement;

            const elementWidth = nativeElement.offsetWidth;
            const parentWidth = parentElement?.offsetWidth || 0;
            const width = this._scrollWidth() || `${elementWidth || parentWidth}px`;

            const elementHeight = nativeElement.offsetHeight;
            const parentHeight = parentElement?.offsetHeight || 0;
            const height = this._scrollHeight() || `${elementHeight || parentHeight}px`;

            const setProp = (_name: string, _value: any) => (nativeElement.style[_name] = _value);

            if (this.both() || this.horizontal()) {
                setProp('height', height);
                setProp('width', width);
            } else {
                setProp('height', height);
            }
        }
    }

    setSpacerSize() {
        const items = this._items();
        if (items) {
            const contentPos = this.getContentPosition();
            const setProp = (_name: string, _value: any, _size: number, _cpos: number = 0) =>
                (this.spacerStyle = {
                    ...this.spacerStyle,
                    ...{ [`${_name}`]: (_value || []).length * _size + _cpos + 'px' }
                });

            if (this.both()) {
                setProp('height', items, (<number[]>this._itemSize())[0], contentPos.y);
                setProp('width', this._columns() || items[1], (<number[]>this._itemSize())[1], contentPos.x);
            } else {
                this.horizontal() ? setProp('width', this._columns() || items, <number>this._itemSize(), contentPos.x) : setProp('height', items, <number>this._itemSize(), contentPos.y);
            }
        }
    }

    setContentPosition(pos: any) {
        if (this.contentEl && !this._appendOnly()) {
            const first = pos ? pos.first : this.first;
            const calculateTranslateVal = (_first: number, _size: number) => _first * _size;
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });

            if (this.both()) {
                setTransform(calculateTranslateVal(first.cols, (<number[]>this._itemSize())[1]), calculateTranslateVal(first.rows, (<number[]>this._itemSize())[0]));
            } else {
                const translateVal = calculateTranslateVal(first, <number>this._itemSize());
                this.horizontal() ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }

    onScrollPositionChange(event: Event) {
        const target = event.target;
        if (!target) {
            throw new Error('Event target is null');
        }
        const contentPos = this.getContentPosition();
        const calculateScrollPos = (_pos: number, _cpos: number) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0);
        const calculateCurrentIndex = (_pos: number, _size: number) => (_size || _pos ? Math.floor(_pos / (_size || _pos)) : 0);
        const calculateTriggerIndex = (_currentIndex: number, _first: number, _last: number, _num: number, _numT: number, _isScrollDownOrRight: any) => {
            return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
        };
        const calculateFirst = (_currentIndex: number, _triggerIndex: number, _first: number, _last: number, _num: number, _numT: number, _isScrollDownOrRight: any) => {
            if (_currentIndex <= _numT) return 0;
            else return Math.max(0, _isScrollDownOrRight ? (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
        };
        const calculateLast = (_currentIndex: number, _first: number, _last: number, _num: number, _numT: number, _isCols = false) => {
            let lastValue = _first + _num + 2 * _numT;

            if (_currentIndex >= _numT) {
                lastValue += _numT + 1;
            }

            return this.getLast(lastValue, _isCols);
        };

        const scrollTop = calculateScrollPos((<HTMLElement>target).scrollTop, contentPos.top);
        const scrollLeft = calculateScrollPos((<HTMLElement>target).scrollLeft, contentPos.left);

        let newFirst = this.both() ? { rows: 0, cols: 0 } : 0;
        let newLast = this.last;
        let isRangeChanged = false;
        let newScrollPos = this.lastScrollPos;

        if (this.both()) {
            const isScrollDown = this.lastScrollPos.top <= scrollTop;
            const isScrollRight = this.lastScrollPos.left <= scrollLeft;

            if (!this._appendOnly() || (this._appendOnly() && (isScrollDown || isScrollRight))) {
                const currentIndex = {
                    rows: calculateCurrentIndex(scrollTop, (<number[]>this._itemSize())[0]),
                    cols: calculateCurrentIndex(scrollLeft, (<number[]>this._itemSize())[1])
                };
                const triggerIndex = {
                    rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };

                newFirst = {
                    rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newLast = {
                    rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                    cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
                };

                isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
                newScrollPos = { top: scrollTop, left: scrollLeft };
            }
        } else {
            const scrollPos = this.horizontal() ? scrollLeft : scrollTop;
            const isScrollDownOrRight = this.lastScrollPos <= scrollPos;

            if (!this._appendOnly() || (this._appendOnly() && isScrollDownOrRight)) {
                const currentIndex = calculateCurrentIndex(scrollPos, <number>this._itemSize());
                const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);

                newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
                isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
                newScrollPos = scrollPos;
            }
        }

        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        };
    }

    onScrollChange(event: Event) {
        const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);

        if (isRangeChanged) {
            const newState = { first, last };

            this.setContentPosition(newState);

            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;

            this.handleEvents('onScrollIndexChange', newState);

            if (this._lazy() && this.isPageChanged(first)) {
                const lazyLoadState = {
                    first: this._step() ? Math.min(this.getPageByFirst(first) * this._step(), (<any[]>this._items()).length - this._step()) : first,
                    last: Math.min(this._step() ? (this.getPageByFirst(first) + 1) * this._step() : last, (<any[]>this._items()).length)
                };
                const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;

                isLazyStateChanged && this.handleEvents('onLazyLoad', lazyLoadState);
                this.lazyLoadState = lazyLoadState;
            }
        }
    }

    onContainerScroll(event: Event) {
        this.handleEvents('onScroll', { originalEvent: event });

        if (this._delay()) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }

            if (!this.d_loading && this._showLoader()) {
                const { isRangeChanged } = this.onScrollPositionChange(event);
                const changed = isRangeChanged || (this._step() ? this.isPageChanged() : false);

                if (changed) {
                    this.d_loading = true;

                    this.cd.detectChanges();
                }
            }

            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);

                if (this.d_loading && this._showLoader() && (!this._lazy() || this._loading() === undefined)) {
                    this.d_loading = false;
                    this.page = this.getPageByFirst();
                }
                this.cd.detectChanges();
            }, this._delay());
        } else {
            !this.d_loading && this.onScrollChange(event);
        }
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.windowResizeListener) {
                const window = this.document.defaultView as Window;
                const event = isTouchDevice() ? 'orientationchange' : 'resize';
                this.windowResizeListener = this.renderer.listen(window, event, this.onWindowResize.bind(this));
            }
        }
    }

    unbindResizeListener() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
    }

    onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            if (isVisible(this.elementViewChild()?.nativeElement)) {
                const [width, height] = [getWidth(this.elementViewChild()?.nativeElement), getHeight(this.elementViewChild()?.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both() ? isDiffWidth || isDiffHeight : this.horizontal() ? isDiffWidth : this.vertical() ? isDiffHeight : false;

                if (reinit) {
                    this.d_numToleratedItems = this._numToleratedItems();
                    this.defaultWidth = width;
                    this.defaultHeight = height;
                    this.defaultContentWidth = getWidth(this.contentEl);
                    this.defaultContentHeight = getHeight(this.contentEl);

                    this.init();
                }
            }
        }, this._resizeDelay());
    }

    handleEvents(name: string, params: any) {
        const opts = this.options();
        return opts && (opts as any)[name] ? (opts as any)[name](params) : this[name].emit(params);
    }

    readonly loaderIconContext = { options: { styleClass: 'p-virtualscroller-loading-icon' } };

    getContentTemplateContext() {
        return {
            $implicit: this.loadedItems,
            options: this.getContentOptions()
        };
    }

    getItemTemplateContext(item: any, index: number) {
        return {
            $implicit: item,
            options: this.getOptions(index)
        };
    }

    getLoaderTemplateContext(index: number) {
        return {
            options: this.getLoaderOptions(index, this.both() && { numCols: this.numItemsInViewport.cols })
        };
    }

    getDisabledContentTemplateContext() {
        return {
            $implicit: this.items(),
            options: { rows: this._items(), columns: this.loadedColumns }
        };
    }

    getContentOptions() {
        return {
            contentStyleClass: `p-virtualscroller-content ${this.d_loading ? 'p-virtualscroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index: number) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index: number, options?: any) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize(),
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical(),
            horizontal: this.horizontal(),
            both: this.both(),
            scrollTo: this.scrollTo.bind(this),
            scrollToIndex: this.scrollToIndex.bind(this),
            orientation: this._orientation(),
            scrollableElement: this.elementViewChild()?.nativeElement
        };
    }

    getOptions(renderedIndex: number) {
        const count = (this._items() || []).length;
        const index = this.both() ? this.first.rows + renderedIndex : this.first + renderedIndex;

        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
        };
    }

    getLoaderOptions(index: number, extOptions: any) {
        const count = this.loaderArr.length;

        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            loading: this.d_loading,
            ...extOptions
        };
    }
}

@NgModule({
    imports: [Scroller],
    exports: [Scroller]
})
export class ScrollerModule {}
