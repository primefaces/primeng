import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { findSingle, getHeight, getWidth, isTouchDevice, isVisible } from '@primeuix/utils';
import { PrimeTemplate, ScrollerOptions, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { SpinnerIcon } from 'primeng/icons';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ScrollerLazyLoadEvent, ScrollerScrollEvent, ScrollerScrollIndexChangeEvent, ScrollerToType } from './scroller.interface';
import { ScrollerStyle } from './style/scrollerstyle';

/**
 * Scroller is a performance-approach to handle huge data efficiently.
 * @group Components
 */
@Component({
    selector: 'p-scroller, p-virtualscroller, p-virtual-scroller, p-virtualScroller',
    imports: [CommonModule, SpinnerIcon, SharedModule],
    standalone: true,
    template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div #element [attr.id]="_id" [attr.tabindex]="tabindex" [ngStyle]="_style" [class]="cn(cx('root'), styleClass)" (scroll)="onContainerScroll($event)" [attr.data-pc-name]="'scroller'" [attr.data-pc-section]="'root'">
                <ng-container *ngIf="contentTemplate || _contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content [class]="cn(cx('content'), contentStyleClass)" [style]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy">
                            <ng-container *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" [class]="cx('spacer')" [ngStyle]="spacerStyle" [attr.data-pc-section]="'spacer'"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" [class]="cx('loader')" [attr.data-pc-section]="'loader'">
                    <ng-container *ngIf="loaderTemplate || _loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container
                                *ngTemplateOutlet="
                                    loaderTemplate || _loaderTemplate;
                                    context: {
                                        options: getLoaderOptions(index, both && { numCols: numItemsInViewport.cols })
                                    }
                                "
                            ></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate || _loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate || _loaderIconTemplate; context: { options: { styleClass: 'p-virtualscroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <svg data-p-icon="spinner" [class]="cx('loadingIcon')" [spin]="true" [attr.data-pc-section]="'loadingIcon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate || _contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    providers: [ScrollerStyle]
})
export class Scroller extends BaseComponent implements OnInit, AfterContentInit, AfterViewChecked, OnDestroy {
    /**
     * Unique identifier of the element.
     * @group Props
     */
    @Input() get id(): string | undefined {
        return this._id;
    }
    set id(val: string | undefined) {
        this._id = val;
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() get style(): Partial<CSSStyleDeclaration> {
        return this._style;
    }
    set style(val: any) {
        this._style = val;
    }
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() get styleClass(): string | undefined {
        return this._styleClass;
    }
    set styleClass(val: string | undefined) {
        this._styleClass = val;
    }
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() get tabindex() {
        return this._tabindex;
    }
    set tabindex(val: number) {
        this._tabindex = val;
    }
    /**
     * The height/width (or their getter function) of item according to orientation.
     * @group Props
     */
    @Input() get itemSize(): number[] | number | ((item: unknown, mainAxisIndex: number, crossAxisIndex: number) => { mainAxis: number; crossAxis?: number }) {
        return this._itemSize;
    }
    set itemSize(val: number[] | number | ((item: unknown, mainAxisIndex: number, crossAxisIndex: number) => { mainAxis: number; crossAxis?: number })) {
        this._itemSize = val;
    }
    /**
     * An array of objects to display.
     * @group Props
     */
    @Input() get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
    }
    /**
     * Height of the scroll viewport.
     * @group Props
     */
    @Input() get scrollHeight(): string | undefined {
        return this._scrollHeight;
    }
    set scrollHeight(val: string | undefined) {
        this._scrollHeight = val;
    }
    /**
     * Width of the scroll viewport.
     * @group Props
     */
    @Input() get scrollWidth(): string | undefined {
        return this._scrollWidth;
    }
    set scrollWidth(val: string | undefined) {
        this._scrollWidth = val;
    }
    /**
     * The orientation of scrollbar.
     * @group Props
     */
    @Input() get orientation(): 'vertical' | 'horizontal' | 'both' {
        return this._orientation;
    }
    set orientation(val: 'vertical' | 'horizontal' | 'both') {
        this._orientation = val;
    }
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @group Props
     */
    @Input() get step(): number {
        return this._step;
    }
    set step(val: number) {
        this._step = val;
    }
    /**
     * Delay in scroll before new data is loaded.
     * @group Props
     */
    @Input() get delay() {
        return this._delay;
    }
    set delay(val: number) {
        this._delay = val;
    }
    /**
     * Delay after window's resize finishes.
     * @group Props
     */
    @Input() get resizeDelay() {
        return this._resizeDelay;
    }
    set resizeDelay(val: number) {
        this._resizeDelay = val;
    }
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @group Props
     */
    @Input() get appendOnly(): boolean {
        return this._appendOnly;
    }
    set appendOnly(val: boolean) {
        this._appendOnly = val;
    }
    /**
     * Specifies whether the scroller should be displayed inline or not.
     * @group Props
     */
    @Input() get inline() {
        return this._inline;
    }
    set inline(val: boolean) {
        this._inline = val;
    }
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input() get lazy() {
        return this._lazy;
    }
    set lazy(val: boolean) {
        this._lazy = val;
    }
    /**
     * If disabled, the scroller feature is eliminated and the content is displayed directly.
     * @group Props
     */
    @Input() get disabled() {
        return this._disabled;
    }
    set disabled(val: boolean) {
        this._disabled = val;
    }
    /**
     * Used to implement a custom loader instead of using the loader feature in the scroller.
     * @group Props
     */
    @Input() get loaderDisabled() {
        return this._loaderDisabled;
    }
    set loaderDisabled(val: boolean) {
        this._loaderDisabled = val;
    }
    /**
     * Columns to display.
     * @group Props
     */
    @Input() get columns(): any[] | undefined | null {
        return this._columns;
    }
    set columns(val: any[] | undefined | null) {
        this._columns = val;
    }
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the scroller.
     * @group Props
     */
    @Input() get showSpacer() {
        return this._showSpacer;
    }
    set showSpacer(val: boolean) {
        this._showSpacer = val;
    }
    /**
     * Defines whether to show loader.
     * @group Props
     */
    @Input() get showLoader() {
        return this._showLoader;
    }
    set showLoader(val: boolean) {
        this._showLoader = val;
    }
    /**
     * Defines whether the data is loaded.
     * @group Props
     */
    @Input() get loading(): boolean | undefined {
        return this._loading;
    }
    set loading(val: boolean | undefined) {
        this._loading = val;
    }
    /**
     * Defines whether to dynamically change the height or width of scrollable container.
     * @group Props
     */
    @Input() get autoSize(): boolean {
        return this._autoSize;
    }
    set autoSize(val: boolean) {
        this._autoSize = val;
    }
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
     * @group Props
     */
    @Input() get trackBy(): Function {
        return this._trackBy;
    }
    set trackBy(val: Function) {
        this._trackBy = val;
    }
    /**
     * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    @Input() get options(): ScrollerOptions | undefined {
        return this._options;
    }
    set options(val: ScrollerOptions | undefined) {
        this._options = val;

        if (val && typeof val === 'object') {
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
            Object.entries(val).forEach(([k, v]) => this[`${k}`] !== v && (this[`${k}`] = v));
        }
    }
    /**
     * The estimated size of grid items used to calculate initial scroll height and width before actual sizes are measured.
     * This size serves as a placeholder for virtualization, allowing the component to estimate the total scrollable area.
     * Actual sizes are determined via `itemSize`, and the scroll position may be adjusted accordingly.
     * @field main - estimated size of a main axis (horizontal if `orientation` is set to 'horizontal', vertical otherwise)
     * @field cross - estimated size of a cross axis (vertical if `orientation` is set to 'horizontal', horizontal otherwise)
     * @group Props
     */
    @Input() estimatedItemSize: GridItem = defaultEstimatedItemSize;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<ScrollerLazyLoadEvent> = new EventEmitter<ScrollerLazyLoadEvent>();
    /**
     * Callback to invoke when scroll position changes.
     * @param {ScrollerScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    @Output() onScroll: EventEmitter<ScrollerScrollEvent> = new EventEmitter<ScrollerScrollEvent>();
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     * @param {ScrollerScrollEvent} event - Custom scroll index change event.
     * @group Emits
     */
    @Output() onScrollIndexChange: EventEmitter<ScrollerScrollIndexChangeEvent> = new EventEmitter<ScrollerScrollIndexChangeEvent>();

    @ViewChild('element') elementViewChild: Nullable<ElementRef<HTMLDivElement>>;

    @ViewChild('content') contentViewChild: Nullable<ElementRef>;

    @HostBinding('style.height') height: string;

    _id: string | undefined;

    _style: Partial<CSSStyleDeclaration> | null | undefined;

    _styleClass: string | undefined;

    _tabindex: number = 0;

    _items: unknown[][] | unknown[] | null | undefined;

    _itemSize: number[] | number | ((item: unknown, mainAxisIndex: number, crossAxisIndex: number) => { mainAxis: number; crossAxis?: number }) = [];

    _scrollHeight: string | undefined;

    _scrollWidth: string | undefined;

    _orientation: 'vertical' | 'horizontal' | 'both' = 'vertical';

    _step: number = 0;

    _delay: number = 0;

    _resizeDelay: number = 10;

    _appendOnly: boolean = false;

    _inline: boolean = false;

    _lazy: boolean = false;

    _disabled: boolean = false;

    _loaderDisabled: boolean = false;

    _columns: any[] | undefined | null;

    _showSpacer: boolean = true;

    _showLoader: boolean = false;

    _loading: boolean | undefined;

    _autoSize: boolean = false;

    _trackBy: any;

    _options: ScrollerOptions | undefined;

    d_loading: boolean = false;

    contentEl: any;

    private _gridManager: ReturnType<typeof initGridManager> = initGridManager({
        viewportSize: { main: 0, cross: 0 },
        items: [],
        getScrollPos: () => ({ main: 0, cross: 0 }),
        getItemSize: () => ({ main: 0, cross: 0 }),
        scrollTo: () => {},
        setScrollSize: () => {}
    });

    private scrollDebt?: { position: GridItem; index?: GridItem };

    /**
     * Content template of the component.
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: Nullable<TemplateRef<any>>;

    /**
     * Item template of the component.
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: Nullable<TemplateRef<any>>;

    /**
     * Loader template of the component.
     * @group Templates
     */
    @ContentChild('loader', { descendants: false }) loaderTemplate: Nullable<TemplateRef<any>>;

    /**
     * Loader icon template of the component.
     * @group Templates
     */
    @ContentChild('loadericon', { descendants: false }) loaderIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _contentTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    _loaderTemplate: TemplateRef<any> | undefined;

    _loaderIconTemplate: TemplateRef<any> | undefined;

    first: number | { rows: number; cols: number } = 0;

    last: number | { rows: number; cols: number } = 0;

    page: number = 0;

    isRangeChanged: boolean = false;

    lastScrollPos: number | { top: number; left: number } = 0;

    lazyLoadState: any = {};

    loaderArr: any[] = [];

    spacerStyle: { [klass: string]: any } | null | undefined = {};

    contentStyle: { [klass: string]: any } | null | undefined = {};

    scrollTimeout: any;

    resizeTimeout: any;

    initialized: boolean = false;

    windowResizeListener: VoidListener;

    defaultWidth: number | undefined;

    defaultHeight: number | undefined;

    defaultContentWidth: number | undefined;

    defaultContentHeight: number | undefined;

    _contentStyleClass: any;

    get contentStyleClass() {
        return this._contentStyleClass;
    }

    set contentStyleClass(val) {
        this._contentStyleClass = val;
    }

    get vertical() {
        return this._orientation === 'vertical';
    }

    get horizontal() {
        return this._orientation === 'horizontal';
    }

    get both() {
        return this._orientation === 'both';
    }

    get loadedItems() {
        if (this._items && !this.d_loading) {
            if (this.both) return this._items.slice(this._appendOnly ? 0 : this._first.main, this._last.main).map((item: unknown[]) => (this._columns ? item : item.slice(this._appendOnly ? 0 : this._first.cross, this._last.cross)));
            else if (this.horizontal && this._columns) return this._items;
            else return this._items.slice(this._appendOnly ? 0 : this._first.main, this._last.main);
        }

        return [];
    }

    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled ? this.loaderArr : []) : this.loadedItems;
    }

    get loadedColumns() {
        if (this._columns && (this.both || this.horizontal)) {
            return this.d_loading && this._loaderDisabled ? (this.both ? this.loaderArr[0] : this.loaderArr) : this._columns.slice(this._first.main, this._last.main);
        }

        return this._columns;
    }

    private get _first(): GridItem {
        return { main: this.first?.[this.horizontal ? 'cols' : 'rows'] ?? this.first, cross: this.horizontal ? 0 : (this.first?.['cols'] ?? 0) };
    }

    private get _last(): GridItem {
        return { main: this.last?.[this.horizontal ? 'cols' : 'rows'] ?? this.last, cross: this.horizontal ? 0 : (this.last?.['cols'] ?? 0) };
    }

    _componentStyle = inject(ScrollerStyle);

    constructor(private zone: NgZone) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.setInitialState();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        super.ngOnChanges(simpleChanges);
        let isLoadingChanged = false;
        if (this.scrollHeight == '100%') {
            this.height = '100%';
        }
        if (simpleChanges.loading) {
            const { previousValue, currentValue } = simpleChanges.loading;

            if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
                this.d_loading = currentValue;
                isLoadingChanged = true;
            }
        }

        if (simpleChanges.orientation) {
            this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        }

        if (simpleChanges.options) {
            const { previousValue, currentValue } = simpleChanges.options;

            if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
                this.d_loading = currentValue.loading;
                isLoadingChanged = true;
            }
        }

        if (this.initialized) {
            const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);

            if (isChanged) {
                this.init();
                this.calculateAutoSize();
            }
        }
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'item':
                    this._itemTemplate = item.template;
                    break;

                case 'loader':
                    this._loaderTemplate = item.template;
                    break;

                case 'loadericon':
                    this._loaderIconTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        Promise.resolve().then(() => {
            this.viewInit();
        });
    }

    ngAfterViewChecked() {
        if (!this.initialized) {
            this.viewInit();
        }
    }

    ngOnDestroy() {
        this.unbindResizeListener();

        this.contentEl = null;
        this.initialized = false;
        super.ngOnDestroy();
    }

    viewInit() {
        if (isPlatformBrowser(this.platformId) && !this.initialized) {
            if (isVisible(this.elementViewChild?.nativeElement)) {
                this.setInitialState();
                this.setContentEl(this.contentEl);
                this.init();

                this.defaultWidth = getWidth(this.elementViewChild?.nativeElement);
                this.defaultHeight = getHeight(this.elementViewChild?.nativeElement);
                this.defaultContentWidth = getWidth(this.contentEl);
                this.defaultContentHeight = getHeight(this.contentEl);
                this.initialized = true;
            }
        }
    }

    init() {
        if (this._disabled || !this.elementViewChild) return;

        if (this._gridManager.nodes.mainAxis.length) {
            const firstInViewport = this._gridManager.nodesInViewport().first;
            const scrollPos = this.toMainCrossAxises(this.elementViewChild.nativeElement.scrollTop, this.elementViewChild.nativeElement.scrollLeft);
            const getAdjustedScrollPos = (axis: 'main' | 'cross') =>
                scrollPos[axis] + getScrollShift({ scrollPos: scrollPos[axis], prevNodePos: this._gridManager.nodes[axis + 'Axis'][firstInViewport[axis]].pos, currNodePos: firstInViewport[axis] * this.estimatedItemSize[axis] });
            this.scrollTo(this.toTopLeft({ main: getAdjustedScrollPos('main'), cross: getAdjustedScrollPos('cross') }));
        }

        const _itemSize = this._itemSize;
        this._gridManager = initGridManager({
            items: this.items,
            estimatedItemSize: this.estimatedItemSize,
            viewportSize: this.toMainCrossAxises(this.elementViewChild.nativeElement.offsetHeight, this.elementViewChild.nativeElement.offsetWidth),
            getItemSize:
                typeof _itemSize === 'function'
                    ? (...params) => {
                          const { mainAxis: main, crossAxis: cross = 0 } = _itemSize(...params);
                          return { main, cross };
                      }
                    : () => (Array.isArray(_itemSize) ? { main: _itemSize[0], cross: _itemSize[1] } : { main: _itemSize, cross: 0 }),
            getScrollPos: () => this.toMainCrossAxises(this.elementViewChild.nativeElement.scrollTop, this.elementViewChild.nativeElement.scrollLeft),
            scrollTo: (pos) => {
                this.elementViewChild.nativeElement.scrollTo(this.toTopLeft(pos));
                this.cd.detectChanges();
            },
            setScrollSize: (x) => {
                this.setSpacerSize(x);
                this.cd.detectChanges();
            }
        });

        this.setContentPosition({ first: this._gridManager.getRange(this._first, this._last).first });
        this.setSize();
        this.calculateOptions();
        this.setSpacerSize();
        this.bindResizeListener();

        this.cd.detectChanges();
    }

    setContentEl(el?: HTMLElement) {
        this.contentEl = el || this.contentViewChild?.nativeElement || findSingle(this.elementViewChild?.nativeElement, '.p-virtualscroller-content');
    }

    setInitialState() {
        this.first = this.both ? { rows: 0, cols: 0 } : 0;
        this.last = this.both ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.d_loading = this._loading || false;
        this.loaderArr = [];
    }

    getElementRef() {
        return this.elementViewChild;
    }

    getPageByFirst(first?: number) {
        const step = this._step || 1;
        return Math.floor(((first ?? this._first.main) + step) / step);
    }

    isPageChanged(first?: any) {
        return this._step ? this.page !== this.getPageByFirst(first ?? this.first) : true;
    }

    scrollTo(options: ScrollToOptions) {
        // this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this._scrollTo(options);
    }

    scrollToIndex(index: number | number[], behavior: ScrollBehavior = 'auto') {
        const valid = this.both ? (index as number[]).every((i) => i > -1) : (index as number) > -1;

        if (valid) {
            const { scrollTop = 0, scrollLeft = 0 } = this.elementViewChild?.nativeElement;
            const contentPos = this.getContentPosition();
            const scrollTo = (left = 0, top = 0) => this._scrollTo({ left, top, behavior }, { main: index[0] ?? index, cross: index[1] ?? 0 });
            const range = this._gridManager.getRange(this._first, this._last);
            let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
            let isRangeChanged = false,
                isScrollChanged = false;

            if (this.both) {
                newFirst = {
                    rows: range.first.main,
                    cols: range.first.cross
                };
                const { main, cross } = this._gridManager.at(index[0], index[1]);
                scrollTo(cross.pos + contentPos.left, main.pos + contentPos.top);
                isScrollChanged = this.lastScrollPos['top'] !== scrollTop || this.lastScrollPos['left'] !== scrollLeft;
                isRangeChanged = newFirst.rows !== this._first.main || newFirst.cols !== this._first.cross;
            } else {
                newFirst = range.first.main;
                const { main } = this._gridManager.at(index as number);
                this.horizontal ? scrollTo(main.pos + contentPos.left, scrollTop) : scrollTo(scrollLeft, main.pos + contentPos.top);
                isScrollChanged = this.lastScrollPos !== (this.horizontal ? scrollLeft : scrollTop);
                isRangeChanged = newFirst !== this._first.main;
            }

            this.isRangeChanged = isRangeChanged;
            isScrollChanged && (this.first = newFirst);
        }
    }

    scrollInView(index: number, to: ScrollerToType, behavior: ScrollBehavior = 'auto') {
        if (to) {
            const { viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this._scrollTo({ left, top, behavior }, { main: index[0] ?? index, cross: index[1] ?? 0 });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';

            if (isToStart) {
                if (this.both) {
                    if (viewport.first['rows'] - this._first.main > (<any>index)[0]) {
                        const { main, cross } = this._gridManager.at(viewport.first['rows'] - 1, viewport.first['cols']);
                        scrollTo(cross.pos, main.pos);
                    } else if (viewport.first['cols'] - this._first.cross > (<any>index)[1]) {
                        const { main, cross } = this._gridManager.at(viewport.first['rows'], viewport.first['cols'] - 1);
                        scrollTo(cross.pos, main.pos);
                    }
                } else if (typeof viewport.first === 'number' && viewport.first - this._first.main > index) {
                    const { main } = this._gridManager.at(viewport.first - 1);
                    this.horizontal ? scrollTo(main.pos, 0) : scrollTo(0, main.pos);
                }
            } else if (isToEnd) {
                if (this.both) {
                    if (viewport.last['rows'] - this._first.main <= (<any>index)[0] + 1) {
                        const { main, cross } = this._gridManager.at(viewport.first['rows'] + 1, viewport.first['cols']);
                        scrollTo(cross.pos, main.pos);
                    } else if (viewport.last['cols'] - this._first.cross <= (<any>index)[1] + 1) {
                        const { main, cross } = this._gridManager.at(viewport.first['rows'], viewport.first['cols'] + 1);
                        scrollTo(cross.pos, main.pos);
                    }
                } else if (typeof viewport.first === 'number' && typeof viewport.last === 'number' && viewport.last - this._first.main <= index + 1) {
                    const { main } = this._gridManager.at(viewport.first + 1);
                    this.horizontal ? scrollTo(main.pos, 0) : scrollTo(0, main.pos);
                }
            }
        } else {
            this.scrollToIndex(index, behavior);
        }
    }

    getRenderedRange() {
        const { first, last } = this._gridManager.nodesInViewport();
        return {
            first: this.first,
            last: this.last,
            viewport: {
                first: this.both ? { rows: first.main, cols: first.cross } : first.main,
                last: this.both ? { rows: last.main, cols: last.cross } : last.main
            }
        };
    }

    calculateOptions() {
        const range = this._gridManager.getRange(this._first, this._last);
        this.last = this.both
            ? {
                  rows: range.last.main,
                  cols: range.last.cross
              }
            : range.last.main;

        if (this.showLoader) {
            const { first, last } = this._gridManager.nodesInViewport();
            const itemsInViewport = { main: last.main - first.main + 1, cross: last.cross - first.cross + 1 };
            this.loaderArr = this.both ? Array.from({ length: itemsInViewport.main }).map(() => Array.from({ length: itemsInViewport.cross })) : Array.from({ length: itemsInViewport.main });
        }

        if (this._lazy) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step ? (this.both ? { rows: 0, cols: this._first.cross } : 0) : this._first.main,
                    last: Math.min(this._step ? this._step : this._last.main, (<any[]>this.items).length)
                };

                this.handleEvents('onLazyLoad', this.lazyLoadState);
            });
        }
    }

    calculateAutoSize() {
        if (this._autoSize && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';
                    this.contentEl.style.position = 'relative';
                    this.elementViewChild.nativeElement.style.contain = 'none';

                    const [contentWidth, contentHeight] = [getWidth(this.contentEl), getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = '');

                    const [width, height] = [getWidth(this.elementViewChild.nativeElement), getHeight(this.elementViewChild.nativeElement)];
                    (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + 'px' : this._scrollWidth || this.defaultWidth + 'px');
                    (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + 'px' : this._scrollHeight || this.defaultHeight + 'px');

                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    this.elementViewChild.nativeElement.style.contain = '';
                }
            });
        }
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
        if (this.elementViewChild?.nativeElement) {
            const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
            const width = this._scrollWidth || `${this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth}px`;
            const height = this._scrollHeight || `${this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight}px`;
            const setProp = (_name: string, _value: any) => (this.elementViewChild.nativeElement.style[_name] = _value);

            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            } else {
                setProp('height', height);
            }
        }
    }

    setSpacerSize({ main, cross } = this._gridManager.totalSize()) {
        if (this._items) {
            const setProp = (_name, _size) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: _size + 'px' } });

            if (this.both) {
                setProp('height', main);
                setProp('width', cross);
            } else {
                setProp(this.horizontal ? 'width' : 'height', main);
            }
        }
    }

    setContentPosition({ first }: { first: GridItem }) {
        if (this.contentEl && !this._appendOnly) {
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });

            if (this.both) {
                setTransform(this._gridManager.nodes.crossAxis[first.cross].pos, this._gridManager.nodes.mainAxis[first.main].pos);
            } else {
                const pos = this._gridManager.nodes.mainAxis[first.main].pos;
                this.horizontal ? setTransform(pos, 0) : setTransform(0, pos);
            }
        }
    }

    onScrollChange(event: Event) {
        const { first, last, isRangeChanged, isContentPositionShifted } = this._gridManager.getRange(this._first, this._last);
        const target = <HTMLElement>event.target;

        if (isRangeChanged) {
            this.setContentPosition({ first });

            this.first = this.both ? { rows: first.main, cols: first.cross } : first.main;
            this.last = this.both ? { rows: last.main, cols: last.cross } : last.main;
            this.lastScrollPos = this.both ? { top: target.scrollTop, left: target.scrollLeft } : this.horizontal ? target.scrollLeft : target.scrollTop;

            this.handleEvents('onScrollIndexChange', { first: this.first, last: this.last });

            if (this._lazy && this.isPageChanged(this.first)) {
                const lazyLoadState = {
                    first: this._step ? Math.min(this.getPageByFirst(this._first.main) * this._step, (<any[]>this.items).length - this._step) : first.main,
                    last: Math.min(this._step ? (this.getPageByFirst(this._first.main) + 1) * this._step : last.main, (<any[]>this.items).length)
                };
                const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;

                isLazyStateChanged && this.handleEvents('onLazyLoad', lazyLoadState);
                this.lazyLoadState = lazyLoadState;
            }
        } else if (isContentPositionShifted) this.setContentPosition({ first });
    }

    onContainerScroll(event: Event) {
        this.handleEvents('onScroll', { originalEvent: event });

        if (this._delay && this.isPageChanged()) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }

            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged } = this._gridManager.getRange(this._first, this._last);
                const changed = isRangeChanged || (this._step ? this.isPageChanged() : false);

                if (changed) {
                    this.d_loading = true;

                    this.cd.detectChanges();
                }
            }

            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);

                if (this.d_loading && this.showLoader && (!this._lazy || this._loading === undefined)) {
                    this.d_loading = false;
                    this.page = this.getPageByFirst();
                }
                this.cd.detectChanges();
            }, this._delay);
        } else {
            !this.d_loading && this.onScrollChange(event);
        }

        if (!this.scrollDebt || !this.elementViewChild) return;

        const hasScrolledTo = (targetPos: number, scrollPos: number, viewportSize: number, totalSize: number) => targetPos === scrollPos || totalSize <= scrollPos + viewportSize;
        const { offsetHeight, offsetWidth, scrollHeight, scrollWidth, scrollTop, scrollLeft } = this.elementViewChild.nativeElement;
        const viewportSize = this.toMainCrossAxises(offsetHeight, offsetWidth);
        const totalSize = this.toMainCrossAxises(scrollHeight, scrollWidth);
        const scrollPos = this.toMainCrossAxises(scrollTop, scrollLeft);
        if (this.scrollDebt.index) this.scrollDebt.position = { main: this._gridManager.nodes.mainAxis[this.scrollDebt.index.main].pos, cross: this._gridManager.nodes.crossAxis[this.scrollDebt.index.cross].pos };
        const eliminateDebt = this.scrollDebt.index
            ? () => this.scrollToIndex(this.both ? [this.scrollDebt.index.main, this.scrollDebt.index.cross] : this.scrollDebt.index.main, 'smooth')
            : () => this.scrollTo({ ...this.toTopLeft(this.scrollDebt.position), behavior: 'smooth' });

        if (hasScrolledTo(this.scrollDebt.position.main, scrollPos.main, viewportSize.main, totalSize.main) && hasScrolledTo(this.scrollDebt.position.cross, scrollPos.cross, viewportSize.cross, totalSize.cross)) this.scrollDebt = undefined;
        else eliminateDebt();
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.windowResizeListener) {
                this.zone.runOutsideAngular(() => {
                    const window = this.document.defaultView as Window;
                    const event = isTouchDevice() ? 'orientationchange' : 'resize';
                    this.windowResizeListener = this.renderer.listen(window, event, this.onWindowResize.bind(this));
                });
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
            if (isVisible(this.elementViewChild?.nativeElement)) {
                const [width, height] = [getWidth(this.elementViewChild?.nativeElement), getHeight(this.elementViewChild?.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;

                reinit &&
                    this.zone.run(() => {
                        this.defaultWidth = width;
                        this.defaultHeight = height;
                        this.defaultContentWidth = getWidth(this.contentEl);
                        this.defaultContentHeight = getHeight(this.contentEl);

                        this.init();
                    });
            }
        }, this._resizeDelay);
    }

    handleEvents(name: string, params: any) {
        //@ts-ignore
        return this.options && (<any>this.options)[name] ? (<any>this.options)[name](params) : this[name].emit(params);
    }

    getContentOptions() {
        return {
            contentStyleClass: `p-virtualscroller-content ${this.d_loading ? 'p-virtualscroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index: number) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index: number, options?: any) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize,
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical,
            horizontal: this.horizontal,
            both: this.both
        };
    }

    getOptions(renderedIndex: number) {
        const count = (this._items || []).length;
        const index = this._first.main + renderedIndex;

        return {
            index,
            firstCrossAxisIndex: this._first.cross,
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
            ...extOptions
        };
    }

    private toMainCrossAxises(y: number, x: number) {
        return {
            main: this.horizontal ? x : y,
            cross: this.horizontal ? y : x
        };
    }

    private toTopLeft({ main, cross }: GridItem) {
        return { top: this.horizontal ? cross : main, left: this.horizontal ? main : cross };
    }

    private _scrollTo(options: ScrollToOptions, index?: GridItem) {
        if (!this.elementViewChild) return;

        this.elementViewChild.nativeElement.scrollTo(options);

        if (options.behavior === 'smooth')
            this.scrollDebt = {
                index,
                position: index
                    ? {
                          main: this._gridManager.nodes.mainAxis[index.main].pos,
                          cross: this._gridManager.nodes.crossAxis[index.cross].pos
                      }
                    : this.toMainCrossAxises(options.top ?? this.elementViewChild.nativeElement.scrollTop, options.left ?? this.elementViewChild.nativeElement.scrollLeft)
            };
    }
}

type VirtualNode = { size: number; pos: number };
type GridItem = { main: number; cross: number };

export const findIndexByPosition = (pos: number, nodes: VirtualNode[]): number => {
    let left = 0,
        right = nodes.length,
        prevMiddle = 0;
    while (true) {
        const middle = Math.floor((left + right) / 2);
        const currPos = nodes[middle];
        const nextPos = nodes[middle + 1];

        if (currPos === undefined || nextPos === undefined || currPos.pos === pos || (currPos.pos < pos && nextPos.pos > pos) || middle === prevMiddle) return middle;
        if (pos < currPos.pos) right = middle;
        else left = middle;
        prevMiddle = middle;
    }
};

const isGrid = <T>(x: T[] | T[][]): x is T[][] => Array.isArray(x.at(0));

export const defaultEstimatedItemSize = { main: 40, cross: 40 } as const;

export const initGridManager = <T>({
    items,
    getItemSize,
    viewportSize,
    getScrollPos,
    scrollTo,
    setScrollSize,
    estimatedItemSize = defaultEstimatedItemSize
}: {
    items: T[] | T[][];
    getItemSize: (item: T, idxMain: number, idxCross: number) => GridItem;
    viewportSize: GridItem;
    getScrollPos: () => GridItem;
    scrollTo: (pos: GridItem) => void;
    setScrollSize: (size: GridItem) => void;
    estimatedItemSize?: GridItem;
}): {
    nodes: { mainAxis: VirtualNode[]; crossAxis: VirtualNode[] };
    at: (main: number, cross?: number) => { main: VirtualNode; cross: VirtualNode };
    totalSize: () => GridItem;
    getRange: (first: GridItem, last: GridItem) => { first: GridItem; last: GridItem; isRangeChanged: boolean; isContentPositionShifted: boolean };
    nodesInViewport: () => { first: GridItem; last: GridItem };
} => {
    const _items = isGrid(items) ? items : items.map((x) => [x]);
    const nodes = {
        mainAxis: _items.map((_i, idx) => ({ size: estimatedItemSize.main, pos: idx * estimatedItemSize.main })),
        crossAxis: Array.from({ length: _items.reduce((acc, i) => Math.max(acc, i.length), 0) }, (_i, idx) => ({ size: estimatedItemSize.cross, pos: idx * estimatedItemSize.cross }))
    };
    const _calculatedIndexes = {
        mainAxis: nodes.mainAxis.map(() => false),
        crossAxis: nodes.crossAxis.map(() => false)
    };
    const _triggerDistance = { main: viewportSize.main / 2, cross: viewportSize.cross / 2 };

    const _calculateSizesWithinDistance = (distance: GridItem, startIdx: GridItem, direction: 'forward' | 'backward') => {
        const step = direction === 'forward' ? 1 : -1;
        const adjustSize = (node: VirtualNode, newSize: number, calculated: boolean) => (node.size = calculated ? Math.max(node.size, newSize) : newSize);
        const inRange = (idx: number, nodesLength: number) => idx < nodesLength && idx >= 0;
        const passedDistance = { main: 0, cross: 0 };
        const idx = { main: startIdx.main, cross: startIdx.cross };
        const nodesLen = { main: nodes.mainAxis.length, cross: nodes.crossAxis.length };
        let nodesCalculated = false;
        while (passedDistance.main < distance.main && inRange(idx.main, nodesLen.main)) {
            passedDistance.cross = 0;
            idx.cross = startIdx.cross;
            while (passedDistance.cross < distance.cross && inRange(idx.cross, nodesLen.cross)) {
                if (!_calculatedIndexes.mainAxis[idx.main] || !_calculatedIndexes.crossAxis[idx.cross]) {
                    const size = getItemSize(_items.at(idx.main).at(idx.cross), idx.main, idx.cross);
                    adjustSize(nodes.mainAxis[idx.main], size.main, _calculatedIndexes.mainAxis[idx.main]);
                    adjustSize(nodes.crossAxis[idx.cross], size.cross, _calculatedIndexes.crossAxis[idx.cross]);
                    _calculatedIndexes.mainAxis[idx.main] = _calculatedIndexes.crossAxis[idx.cross] = nodesCalculated = true;
                }
                passedDistance.cross += nodes.crossAxis[idx.cross].size;
                idx.cross += step;
            }

            passedDistance.main += nodes.mainAxis[idx.main].size;
            idx.main += step;
        }

        return {
            distanceLeft: { main: Math.max(distance.main - passedDistance.main, 0), cross: Math.max(distance.cross - passedDistance.cross, 0) },
            lastCalculatedIndex: { main: idx.main - step, cross: idx.cross - step },
            nodesCalculated
        };
    };

    const _recalculateNodes = (idx: number, nodes: VirtualNode[]) => {
        const len = nodes.length;
        while (idx < len) {
            const prevNode = nodes[idx - 1] || { size: 0, pos: 0 };
            nodes[idx].pos = prevNode.pos + prevNode.size;
            idx++;
        }
    };

    const _isScrollOverNode = (scrollPos: number, node: VirtualNode) => scrollPos > node.pos && scrollPos < node.pos + node.size;

    const _updateByIndex = (mainIdx: number, crossIdx: number = 0) => {
        const idx = { main: nodes.mainAxis.indexOf(nodes.mainAxis.at(mainIdx)), cross: nodes.crossAxis.indexOf(nodes.crossAxis.at(crossIdx)) };
        const scrollPos = getScrollPos();
        const nodeOverlapDistance = {
            main: _isScrollOverNode(scrollPos.main, nodes.mainAxis[idx.main]) ? scrollPos.main - nodes.mainAxis[idx.main].pos : 0,
            cross: _isScrollOverNode(scrollPos.cross, nodes.crossAxis[idx.cross]) ? scrollPos.cross - nodes.crossAxis[idx.cross].pos : 0
        };
        const getBackwardDistance = (viewportSize: number, forwardDistanceLeft: number) => viewportSize + Math.max(forwardDistanceLeft - viewportSize, 0);
        const { distanceLeft, nodesCalculated: forwardNodesCalculated } = _calculateSizesWithinDistance({ main: viewportSize.main * 2 + nodeOverlapDistance.main, cross: viewportSize.cross * 2 + nodeOverlapDistance.cross }, idx, 'forward');
        const { lastCalculatedIndex, nodesCalculated: backwardNodesCalculated } = _calculateSizesWithinDistance(
            { main: getBackwardDistance(viewportSize.main, distanceLeft.main), cross: getBackwardDistance(viewportSize.cross, distanceLeft.cross) },
            { main: Math.max(0, idx.main - 1), cross: Math.max(0, idx.cross - 1) },
            'backward'
        );
        if (forwardNodesCalculated || backwardNodesCalculated) {
            _recalculateNodes(lastCalculatedIndex.main, nodes.mainAxis);
            _recalculateNodes(lastCalculatedIndex.cross, nodes.crossAxis);
        }
    };

    const totalSize = () => ({
        main: nodes.mainAxis.at(-1).pos + nodes.mainAxis.at(-1).size,
        cross: nodes.crossAxis.at(-1).pos + nodes.crossAxis.at(-1).size
    });

    const _syncScrollOnAction = (action: () => void) => {
        const scrollPos = getScrollPos();
        const initMainNodeIdx = findIndexByPosition(scrollPos.main, nodes.mainAxis);
        const initCrossNodeIdx = findIndexByPosition(scrollPos.cross, nodes.crossAxis);
        const prevNodePos = {
            main: nodes.mainAxis[initMainNodeIdx].pos,
            cross: nodes.crossAxis[initCrossNodeIdx].pos
        };
        const initTotalSize = totalSize();

        action();

        const updatedTotalSize = totalSize();
        const jump = {
            main: getScrollShift({
                scrollPos: scrollPos.main,
                currNodePos: nodes.mainAxis[initMainNodeIdx].pos,
                prevNodePos: prevNodePos.main
            }),
            cross: getScrollShift({
                scrollPos: scrollPos.cross,
                currNodePos: nodes.crossAxis[initCrossNodeIdx].pos,
                prevNodePos: prevNodePos.cross
            })
        };

        if ([updatedTotalSize.main - initTotalSize.main, updatedTotalSize.cross - initTotalSize.cross].some(Boolean)) setScrollSize(updatedTotalSize);
        if (jump.main || jump.cross) scrollTo({ main: scrollPos.main + jump.main, cross: scrollPos.cross + jump.cross });
    };

    const at = (main: number, cross: number = 0) => {
        _syncScrollOnAction(() => _updateByIndex(main, cross));

        return {
            main: nodes.mainAxis.at(main),
            cross: nodes.crossAxis.at(cross)
        };
    };

    const _getNodesInViewport = (scrollPos: number, viewportSize: number, vnodes: VirtualNode[]) => {
        const first = findIndexByPosition(scrollPos, vnodes);
        const last = findIndexByPosition(scrollPos + viewportSize, vnodes);

        return { first, last };
    };

    const nodesInViewport = () => {
        const scrollPos = getScrollPos();
        const main = _getNodesInViewport(scrollPos.main, viewportSize.main, nodes.mainAxis);
        const cross = _getNodesInViewport(scrollPos.cross, viewportSize.cross, nodes.crossAxis);
        return {
            first: { main: main.first, cross: cross.first },
            last: { main: main.last, cross: cross.last }
        };
    };

    const _calculateFirst = (currFirstIdx: number, scrollPos: number, vnodes: VirtualNode[], viewportSize: number, triggerDistance: number) => {
        const currFirstPos = vnodes.at(currFirstIdx).pos;
        const newFirst = findIndexByPosition(Math.max(scrollPos - viewportSize, 0), vnodes);
        const distanceFromCurrent = scrollPos - currFirstPos;

        return distanceFromCurrent < triggerDistance || distanceFromCurrent > viewportSize + triggerDistance ? newFirst : currFirstIdx;
    };

    const _calculateLast = (currLastIdx: number, scrollPos: number, vnodes: VirtualNode[], viewportSize: number, triggerDistance: number) => {
        const lastRenderedNode = vnodes.at(Math.max(currLastIdx - 1, 0));
        const currLastPos = lastRenderedNode.pos + lastRenderedNode.size;
        const newLastIdx = findIndexByPosition(scrollPos + viewportSize * 2 - 1, vnodes) + 1;
        const distanceFromCurrent = currLastPos > scrollPos + viewportSize ? currLastPos - scrollPos + viewportSize : 0;

        return distanceFromCurrent < triggerDistance || distanceFromCurrent > viewportSize + triggerDistance ? newLastIdx : currLastIdx;
    };

    const getRange = (first: GridItem, last: GridItem) => {
        const viewport = nodesInViewport();
        const contentPosition = { main: nodes.mainAxis[first.main].pos, cross: nodes.crossAxis[first.cross].pos };
        if (
            shouldCalculateNodes({
                calculatedIdxs: _calculatedIndexes.mainAxis,
                triggerDistance: _triggerDistance.main,
                viewportSize: viewportSize.main,
                nodes: nodes.mainAxis,
                viewportNodesIdxs: { first: viewport.first.main, last: viewport.last.main },
                renderedNodesIdxs: { first: first.main, last: Math.max(last.main - 1, 0) }
            }) ||
            shouldCalculateNodes({
                calculatedIdxs: _calculatedIndexes.crossAxis,
                triggerDistance: _triggerDistance.cross,
                viewportSize: viewportSize.cross,
                nodes: nodes.crossAxis,
                viewportNodesIdxs: { first: viewport.first.cross, last: viewport.last.cross },
                renderedNodesIdxs: { first: first.cross, last: Math.max(last.cross - 1, 0) }
            })
        )
            _syncScrollOnAction(() => _updateByIndex(viewport.first.main, viewport.first.cross));

        const scrollPos = getScrollPos();
        const newFirst = {
            main: _calculateFirst(first.main, scrollPos.main, nodes.mainAxis, viewportSize.main, _triggerDistance.main),
            cross: _calculateFirst(first.cross, scrollPos.cross, nodes.crossAxis, viewportSize.cross, _triggerDistance.cross)
        };
        const newLast = {
            main: _calculateLast(last.main, scrollPos.main, nodes.mainAxis, viewportSize.main, _triggerDistance.main),
            cross: _calculateLast(last.cross, scrollPos.cross, nodes.crossAxis, viewportSize.cross, _triggerDistance.cross)
        };

        return {
            first: newFirst,
            last: newLast,
            isContentPositionShifted: contentPosition.main !== nodes.mainAxis[first.main].pos || contentPosition.cross !== nodes.crossAxis[first.cross].pos,
            isRangeChanged: newFirst.main !== first.main || newFirst.cross !== first.cross || newLast.main !== last.main || newLast.cross !== last.cross
        };
    };

    if (nodes.crossAxis.length) {
        const scrollPos = getScrollPos();
        _syncScrollOnAction(() => _updateByIndex(findIndexByPosition(scrollPos.main, nodes.mainAxis), findIndexByPosition(scrollPos.cross, nodes.crossAxis)));
    }

    return { nodes, getRange, at, nodesInViewport, totalSize };
};

export const getScrollShift = ({ scrollPos, prevNodePos, currNodePos }: { scrollPos: number; prevNodePos: number; currNodePos: number }): number => currNodePos - scrollPos + (scrollPos - prevNodePos);

export const shouldCalculateNodes = ({
    viewportNodesIdxs,
    calculatedIdxs,
    nodes,
    renderedNodesIdxs,
    viewportSize,
    triggerDistance
}: {
    calculatedIdxs: boolean[];
    nodes: VirtualNode[];
    renderedNodesIdxs: { first: number; last: number };
    viewportNodesIdxs: { first: number; last: number };
    triggerDistance: number;
    viewportSize: number;
}) => {
    const distanceBetween = {
        first: nodes[viewportNodesIdxs.first].pos - nodes[renderedNodesIdxs.first].pos,
        last: nodes[renderedNodesIdxs.last].pos + nodes[renderedNodesIdxs.last].size - (nodes[viewportNodesIdxs.last].pos + nodes[viewportNodesIdxs.last].size)
    };

    if (!calculatedIdxs[viewportNodesIdxs.first] || !calculatedIdxs[viewportNodesIdxs.last]) return true;
    if (distanceBetween.first < triggerDistance) {
        const newFirst = findIndexByPosition(nodes[viewportNodesIdxs.first].pos - viewportSize, nodes);
        return !calculatedIdxs[newFirst];
    }
    if (distanceBetween.last < triggerDistance) {
        const newLast = findIndexByPosition(nodes[viewportNodesIdxs.last].pos + nodes[viewportNodesIdxs.last].size + viewportSize, nodes);
        return !calculatedIdxs[newLast];
    }

    return false;
};

@NgModule({
    imports: [Scroller, SharedModule],
    exports: [Scroller, SharedModule]
})
export class ScrollerModule {}
