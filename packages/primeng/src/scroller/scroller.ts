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
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{
                    'p-virtualscroller': true,
                    'p-virtualscroller-inline': inline,
                    'p-virtualscroller-both p-both-scroll': both,
                    'p-virtualscroller-horizontal p-horizontal-scroll': horizontal
                }"
                (scroll)="onContainerScroll($event)"
                [attr.data-pc-name]="'scroller'"
                [attr.data-pc-section]="'root'"
            >
                <ng-container *ngIf="contentTemplate || _contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-virtualscroller-content" [ngClass]="{ 'p-virtualscroller-loading ': d_loading }" [ngStyle]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy">
                            <ng-container *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-virtualscroller-spacer" [ngStyle]="spacerStyle" [attr.data-pc-section]="'spacer'"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-virtualscroller-loader" [ngClass]="{ 'p-virtualscroller-loader-mask': !loaderTemplate }" [attr.data-pc-section]="'loader'">
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
                            <SpinnerIcon [styleClass]="'p-virtualscroller-loading-icon pi-spin'" [attr.data-pc-section]="'loadingIcon'" />
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
        this._getItemSize = typeof val === 'function' ? val : () => (Array.isArray(val) ? { mainAxis: val[0] ?? this.defaultHeight, crossAxis: val[1] } : { mainAxis: val });
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
            //@ts-ignore
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }
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

    @ViewChild('element') elementViewChild: Nullable<ElementRef>;

    @ViewChild('content') contentViewChild: Nullable<ElementRef>;

    _id: string | undefined;

    _style: Partial<CSSStyleDeclaration> | null | undefined;

    _styleClass: string | undefined;

    _tabindex: number = 0;

    _items: unknown[][] | unknown[] | null | undefined;

    _itemSize: number[] | number | ((item: unknown, mainAxisIndex: number, crossAxisIndex: number) => { mainAxis: number; crossAxis?: number }) = [];

    _poss: ReturnType<typeof initGridPositions> = initGridPositions({
        viewportSize: { main: 0, cross: 0 },
        items: [],
        scrollPos: { main: 0, cross: 0 },
        getItemSize: () => ({ main: 0, cross: 0 })
    });

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

    _getItemSize: (item: unknown, mainAxisIndex: number, crossAxisIndex: number) => { mainAxis: number; crossAxis?: number } | undefined;

    d_loading: boolean = false;

    contentEl: any;
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

    get vertical() {
        return this._orientation === 'vertical';
    }

    get horizontal() {
        return this._orientation === 'horizontal';
    }

    get both() {
        return this._orientation === 'both';
    }

    get _first(): GridItem {
        return { main: this.first?.[this.horizontal ? 'cols' : 'rows'] ?? this.first, cross: this.horizontal ? 0 : (this.first?.['cols'] ?? 0) };
    }

    get _last(): GridItem {
        return { main: this.last?.[this.horizontal ? 'cols' : 'rows'] ?? this.last, cross: this.horizontal ? 0 : (this.last?.['cols'] ?? 0) };
    }

    get loadedItems() {
        if (this._items && !this.d_loading) {
            if (this.isBoth(this._items)) return this._items.slice(this._appendOnly ? 0 : this._first.main, this._last.main).map((item) => (this._columns ? item : item.slice(this._appendOnly ? 0 : this._first.cross, this._last.cross)));
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

    private toMainCrossAxises(y: number, x: number) {
        return {
            main: this.horizontal ? x : y,
            cross: this.horizontal ? 0 : x
        };
    }
    private toTopLeft({ main, cross }: GridItem) {
        return { top: this.horizontal ? 0 : main, left: this.horizontal ? main : cross };
    }

    init() {
        if (!this._disabled) {
            const elViewChild = this.elementViewChild.nativeElement as HTMLElement;
            const horizontalOrientation = this.orientation === 'horizontal';
            if (this._poss.positions.mainAxis.length) {
                const firstInViewport = this._poss.numsInViewport().first;
                const scrollPos = this.toMainCrossAxises(elViewChild.scrollTop, elViewChild.scrollLeft);
                const targetScrollPos = this.toTopLeft({
                    main: scrollPos.main + getShiftWrapper({ scrollPos: scrollPos.main, prevItemPos: this._poss.positions.mainAxis[firstInViewport.main].pos, prevItemIdx: firstInViewport.main }),
                    cross: scrollPos.cross + getShiftWrapper({ scrollPos: scrollPos.cross, prevItemPos: this._poss.positions.crossAxis[firstInViewport.cross].pos, prevItemIdx: firstInViewport.cross })
                });
                this.scrollTo(targetScrollPos);
            }
            this._poss = initGridPositions({
                items: this.items,
                viewportSize: this.toMainCrossAxises(elViewChild.offsetHeight, elViewChild.offsetWidth),
                getItemSize: (item, mainIdx, crossIdx) => {
                    const res = this._getItemSize(item, mainIdx, crossIdx);
                    return { main: res.mainAxis, cross: res.crossAxis || 0 };
                },
                scrollPos: {
                    get main() {
                        return horizontalOrientation ? elViewChild.scrollLeft : elViewChild.scrollTop;
                    },
                    get cross() {
                        return elViewChild.scrollLeft;
                    }
                },
                scrollTo: (pos) => {
                    elViewChild.scrollTo(this.toTopLeft(pos));
                },
                setSpacerSize: (x) => {
                    this.setSpacerSize(x);
                },
                onChange: ({ jump, scrollSizeDiff }) => {
                    const scrollPos = this.toMainCrossAxises(elViewChild.scrollTop, elViewChild.scrollLeft);

                    if (scrollSizeDiff.main || scrollSizeDiff.cross) {
                        this.setSpacerSize();
                        this.cd.detectChanges();
                    }
                    if (jump.main || jump.cross) {
                        this.scrollTo(this.toTopLeft({ main: scrollPos.main + jump.main, cross: scrollPos.cross + jump.cross }));
                        this.cd.detectChanges();
                    }
                }
            });
            this.setContentPosition({ first: this._poss.getRange(this._first).first });

            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();
            this.bindResizeListener();

            this.cd.detectChanges();
        }
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
        this.spacerStyle = {};
        this.contentStyle = {};
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
        this.elementViewChild?.nativeElement?.scrollTo(options);
    }

    scrollToIndex(index: number | number[], behavior: ScrollBehavior = 'auto') {
        const valid = this.both ? (index as number[]).every((i) => i > -1) : (index as number) > -1;

        if (valid) {
            const first = this._first;
            const { scrollTop = 0, scrollLeft = 0 } = this.elementViewChild?.nativeElement;
            const contentPos = this.getContentPosition();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
            let isRangeChanged = false,
                isScrollChanged = false;

            if (this.both && typeof this.lastScrollPos === 'object') {
                const range = this._poss.getRange(this._first);
                newFirst = {
                    rows: range.first.main,
                    cols: range.first.cross
                };
                const pos = this._poss.at(index[0], index[1]);
                scrollTo(pos.cross.pos + contentPos.left, pos.main.pos + contentPos.top);
                isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
                isRangeChanged = newFirst.rows !== first.main || newFirst.cols !== first.cross;
            } else {
                newFirst = this._poss.getRange(this._first).first.main;
                const pos = this._poss.at(index as number).main;
                this.horizontal ? scrollTo(pos.pos + contentPos.left, scrollTop) : scrollTo(scrollLeft, pos.pos + contentPos.top);
                isScrollChanged = this.lastScrollPos !== (this.horizontal ? scrollLeft : scrollTop);
                isRangeChanged = newFirst !== first.main;
            }

            this.isRangeChanged = isRangeChanged;
            isScrollChanged && (this.first = newFirst);
        }
    }

    scrollInView(index: number, to: ScrollerToType, behavior: ScrollBehavior = 'auto') {
        if (to) {
            const { viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';

            if (isToStart) {
                if (this.both && typeof viewport.first === 'object') {
                    if (viewport.first.rows - this._first.main > (<any>index)[0]) {
                        const { main, cross } = this._poss.at(viewport.first.rows - 1, viewport.first.cols);
                        scrollTo(cross.pos, main.pos);
                    } else if (viewport.first.cols - this._first.cross > (<any>index)[1]) {
                        const { main, cross } = this._poss.at(viewport.first.rows, viewport.first.cols - 1);
                        scrollTo(cross.pos, main.pos);
                    }
                } else if (typeof viewport.first === 'number') {
                    if (viewport.first - this._first.main > index) {
                        const pos = this._poss.at(viewport.first - 1);
                        this.horizontal ? scrollTo(pos.main.pos, 0) : scrollTo(0, pos.main.pos);
                    }
                }
            } else if (isToEnd) {
                if (this.both && typeof viewport.first === 'object') {
                    if (viewport.last.rows - this._first.main <= (<any>index)[0] + 1) {
                        const { main, cross } = this._poss.at(viewport.first.rows + 1, viewport.first.cols);
                        scrollTo(cross.pos, main.pos);
                    } else if (viewport.last.cols - this._first.cross <= (<any>index)[1] + 1) {
                        const { main, cross } = this._poss.at(viewport.first.rows, viewport.first.cols + 1);
                        scrollTo(cross.pos, main.pos);
                    }
                } else if (typeof viewport.first === 'number') {
                    if (viewport.last - this._first.main <= index + 1) {
                        const pos = this._poss.at(viewport.first + 1).main.pos;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        } else {
            this.scrollToIndex(index, behavior);
        }
    }

    getRenderedRange() {
        let firstInViewport = this.first;
        let lastInViewport: any = 0;

        if (this.elementViewChild?.nativeElement) {
            if (this.both) {
                const firstLast = this._poss.numsInViewport();
                firstInViewport = { rows: firstLast.first.main, cols: firstLast.first.cross };
                lastInViewport = { rows: firstLast.last.main, cols: firstLast.last.cross };
            } else {
                const viewport = this._poss.numsInViewport();
                firstInViewport = viewport.first.main;
                lastInViewport = viewport.last.main;
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

    calculateOptions() {
        const range = this._poss.getRange(this._first);
        const first = this._first;
        const last = this.both
            ? {
                  rows: range.last.main,
                  cols: range.last.cross
              }
            : range.last.main;

        this.last = last;

        if (this.showLoader) {
            const numItemsInViewport = {
                main: range.last.main - range.first.main,
                cross: range.last.cross - range.first.cross
            };
            this.loaderArr = this.both ? Array.from({ length: numItemsInViewport.main }).map(() => Array.from({ length: numItemsInViewport.cross })) : Array.from({ length: numItemsInViewport.main });
        }

        if (this._lazy) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step ? (this.both ? { rows: 0, cols: first.cross } : 0) : first.main,
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
                    (<ElementRef>this.elementViewChild).nativeElement.style.contain = 'none';

                    const [contentWidth, contentHeight] = [getWidth(this.contentEl), getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && ((<ElementRef>this.elementViewChild).nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && ((<ElementRef>this.elementViewChild).nativeElement.style.height = '');

                    const [width, height] = [getWidth((<ElementRef>this.elementViewChild).nativeElement), getHeight((<ElementRef>this.elementViewChild).nativeElement)];
                    (this.both || this.horizontal) && ((<ElementRef>this.elementViewChild).nativeElement.style.width = width < <number>this.defaultWidth ? width + 'px' : this._scrollWidth || this.defaultWidth + 'px');
                    (this.both || this.vertical) && ((<ElementRef>this.elementViewChild).nativeElement.style.height = height < <number>this.defaultHeight ? height + 'px' : this._scrollHeight || this.defaultHeight + 'px');

                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    (<ElementRef>this.elementViewChild).nativeElement.style.contain = '';
                }
            });
        }
    }

    getLast(last = 0, isCols = false) {
        const gridItems = this.isBoth(this._items) ? this._items[0] || [] : this._items;
        return this._items ? Math.min(isCols ? (this._columns || gridItems).length : this._items.length, last) : 0;
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
            const setProp = (_name: string, _value: any) => ((<ElementRef>this.elementViewChild).nativeElement.style[_name] = _value);

            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            } else {
                setProp('height', height);
            }
        }
    }

    setSpacerSize({ main, cross } = this._poss.totalSize()) {
        if (this._items) {
            const setProp = (_name, _size) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: _size + 'px' } });

            if (this.isBoth(this._items)) {
                setProp('height', main);
                setProp('width', cross);
            } else {
                setProp(this.horizontal ? 'width' : 'height', main);
            }
        }
    }

    setContentPosition(pos: { first: GridItem }) {
        if (this.contentEl && !this._appendOnly) {
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });

            if (this.both) {
                setTransform(this._poss.positions.crossAxis[pos.first.cross].pos, this._poss.positions.mainAxis[pos.first.main].pos);
            } else {
                const translateVal = this._poss.positions.mainAxis.at(pos.first.main).pos;
                this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }

    onScrollChange(event: Event) {
        const { first, last, isRangeChanged } = this._poss.getRange(this._first);
        last.main++;
        last.cross++;
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
        }
    }

    onContainerScroll(event: Event) {
        this.handleEvents('onScroll', { originalEvent: event });

        if (this._delay && this.isPageChanged()) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }

            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged } = this._poss.getRange(this._first);
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

    private isBoth(items: typeof this.items): items is unknown[][] {
        return this.both && items.length && Array.isArray(items[0]);
    }
}

type ItemPos = { size: number; pos: number };
type GridItem = { main: number; cross: number };
type GridPos = {
    mainAxis: ItemPos[];
    crossAxis: ItemPos[];
};

export const binarySearchFirst = (pos: number, positions: ItemPos[]): number => {
    let left = 0,
        right = positions.length,
        prevMiddle = 0;
    while (true) {
        const middle = Math.floor((left + right) / 2);
        const currPos = positions[middle];
        const nextPos = positions[middle + 1];

        if (currPos === undefined || nextPos === undefined || currPos.pos === pos || (currPos.pos < pos && nextPos.pos > pos) || middle === prevMiddle) return middle;
        if (pos < currPos.pos) right = middle;
        else left = middle;
        prevMiddle = middle;
    }
};

const isGrid = <T>(x: T[] | T[][]): x is T[][] => Array.isArray(x.at(0));

export const initGridPositions = <T>({
    items: propItems,
    getItemSize,
    viewportSize,
    scrollPos,
    scrollTo = () => {},
    setSpacerSize = () => {},
    onChange = () => {}
}: {
    items: T[] | T[][];
    getItemSize: (item: T, idxMain: number, idxCross: number) => GridItem;
    viewportSize: GridItem;
    scrollPos: GridItem;
    scrollTo?: (pos: GridItem) => void;
    setSpacerSize?: (size: GridItem) => void;
    onChange?: (changes: { jump: GridItem; scrollSizeDiff: GridItem }) => void;
}): {
    positions: GridPos;
    updateByIndex: (main: number, cross?: number) => void;
    at: (main: number, cross?: number) => { main: ItemPos; cross: ItemPos };
    updateByScrollPos: (scrollMain: number, scrollCross?: number) => void;
    totalSize: () => { main: number; cross: number };
    getRange: (first: GridItem) => { first: GridItem; last: GridItem; isRangeChanged: boolean };
    numsInViewport: () => {
        first: GridItem;
        last: GridItem;
    };
} => {
    const _items = isGrid(propItems) ? propItems : propItems.map((x) => [x]);

    const _defaultSize = { mainAxis: 40, crossAxis: 40 };
    const positions = {
        mainAxis: _items.map((_i, idx) => ({ size: _defaultSize.mainAxis, pos: idx * _defaultSize.mainAxis })),
        crossAxis: Array.from({ length: Math.max(..._items.map((i) => i.length)) }, (_i, idx) => ({ size: _defaultSize.crossAxis, pos: idx * _defaultSize.crossAxis }))
    };
    const _calculatedIndexes = {
        mainAxis: positions.mainAxis.map(() => false),
        crossAxis: positions.crossAxis.map(() => false)
    };

    const _calculateSizesWithinDistance = (distance: GridItem, startIdx: GridItem, direction: 'forward' | 'backward') => {
        const step = direction === 'forward' ? 1 : -1;
        const adjustSize = (item: ItemPos, newSize: number, calculated: boolean) => (item.size = calculated ? Math.max(item.size, newSize) : newSize);
        const inRange = (idx: number, positionsLength: number) => idx < positionsLength && idx >= 0;
        const passedDistance = { main: 0, cross: 0 };
        const idx = { main: startIdx.main, cross: startIdx.cross };
        while (passedDistance.main < distance.main && inRange(idx.main, positions.mainAxis.length)) {
            passedDistance.cross = 0;
            idx.cross = startIdx.cross;
            while (passedDistance.cross < distance.cross && inRange(idx.cross, positions.crossAxis.length)) {
                const size = getItemSize(_items.at(idx.main).at(idx.cross), idx.main, idx.cross);
                adjustSize(positions.mainAxis[idx.main], size.main, _calculatedIndexes.mainAxis[idx.main]);
                adjustSize(positions.crossAxis[idx.cross], size.cross, _calculatedIndexes.crossAxis[idx.cross]);
                _calculatedIndexes.mainAxis[idx.main] = _calculatedIndexes.crossAxis[idx.cross] = true;
                passedDistance.cross += positions.crossAxis[idx.cross].size;
                idx.cross += step;
            }

            passedDistance.main += positions.mainAxis[idx.main].size;
            idx.main += step;
        }

        return {
            distanceLeft: { main: Math.max(distance.main - passedDistance.main, 0), cross: Math.max(distance.cross - passedDistance.cross, 0) },
            lastCalculatedIndex: { main: idx.main - step, cross: idx.cross - step }
        };
    };

    const _updatePositions = (idx: number, positions: ItemPos[]) => {
        while (idx < positions.length) {
            const prevItem = positions[idx - 1] || { size: 0, pos: 0 };
            positions[idx].pos = prevItem.pos + prevItem.size;
            idx++;
        }
    };

    const updateByIndex = (mainIdx: number, crossIdx: number = 0) => {
        const idx = { main: positions.mainAxis.indexOf(positions.mainAxis.at(mainIdx)), cross: positions.crossAxis.indexOf(positions.crossAxis.at(crossIdx)) };
        const getBackwardDistance = (viewportSize: number, forwardDistanceLeft: number) => viewportSize + Math.max(forwardDistanceLeft - viewportSize, 0);
        const { distanceLeft } = _calculateSizesWithinDistance({ main: viewportSize.main * 2, cross: viewportSize.cross * 2 }, idx, 'forward');
        const { lastCalculatedIndex } = _calculateSizesWithinDistance(
            { main: getBackwardDistance(viewportSize.main, distanceLeft.main), cross: getBackwardDistance(viewportSize.cross, distanceLeft.cross) },
            { main: Math.max(0, idx.main - 1), cross: Math.max(0, idx.cross - 1) },
            'backward'
        );
        _updatePositions(lastCalculatedIndex.main, positions.mainAxis);
        _updatePositions(lastCalculatedIndex.cross, positions.crossAxis);
    };

    const totalSize = () => ({
        main: positions.mainAxis.at(-1).pos + positions.mainAxis.at(-1).size,
        cross: positions.crossAxis.at(-1).pos + positions.crossAxis.at(-1).size
    });

    const _updateByIndexWithEvents = (index: GridItem, emit: boolean = true) => {
        const initMainItemIdx = binarySearchFirst(scrollPos.main, positions.mainAxis);
        const initCrossItemIdx = binarySearchFirst(scrollPos.cross, positions.crossAxis);
        const prevItemPos = {
            main: positions.mainAxis[initMainItemIdx].pos,
            cross: positions.crossAxis[initCrossItemIdx].pos
        };
        const initTotalSize = totalSize();

        updateByIndex(index.main, index.cross);
        const updatedTotalSize = totalSize();
        const changes = {
            jump: {
                main: getShift({
                    scrollPos: scrollPos.main,
                    currItemPos: positions.mainAxis[initMainItemIdx].pos,
                    prevItemPos: prevItemPos.main
                }),
                cross: getShift({
                    scrollPos: scrollPos.cross,
                    currItemPos: positions.crossAxis[initCrossItemIdx].pos,
                    prevItemPos: prevItemPos.cross
                })
            },
            scrollSizeDiff: { main: updatedTotalSize.main - initTotalSize.main, cross: updatedTotalSize.cross - initTotalSize.cross }
        };
        if (emit && Object.values(changes).some((x) => x.main || x.cross)) onChange(changes);
        return changes;
    };

    const updateByScrollPos = (scrollMain: number, scrollCross: number) => {
        _updateByIndexWithEvents({ main: binarySearchFirst(scrollMain, positions.mainAxis), cross: binarySearchFirst(scrollCross, positions.crossAxis) });
    };

    const at = (main: number, cross: number = 0) => {
        _updateByIndexWithEvents({ main, cross });

        return {
            main: positions.mainAxis.at(main),
            cross: positions.crossAxis.at(cross)
        };
    };

    const _getNumsInViewport = (scrollPos: number, viewportSize: number, itemPositions: ItemPos[]) => {
        const first = binarySearchFirst(scrollPos, itemPositions);
        const last = binarySearchFirst(scrollPos + viewportSize, itemPositions);
        const num = last - first + 1;

        return { first, last, num, tolerated: Math.ceil(num / 2) };
    };

    const numsInViewport = () => {
        const main = _getNumsInViewport(scrollPos.main, viewportSize.main, positions.mainAxis);
        const cross = _getNumsInViewport(scrollPos.cross, viewportSize.cross, positions.crossAxis);
        return {
            first: { main: main.first, cross: cross.first },
            last: { main: main.last, cross: cross.last }
        };
    };

    const _calculateFirst = (currFirstIdx: number, scrollPos: number, itemPositions: ItemPos[], viewportSize: number) => {
        const currFirstPos = itemPositions[currFirstIdx].pos;
        let newFirst = binarySearchFirst(Math.max(scrollPos - viewportSize, 0), itemPositions);
        const thresholdDistance = scrollPos - currFirstPos;
        const triggerDistance = viewportSize / 2;

        return thresholdDistance < triggerDistance || thresholdDistance > viewportSize + triggerDistance ? newFirst : currFirstIdx;
    };

    const _calculateLast = (firstIdx: number, totalScrollSize: number, viewportSize: number, itemPositions: ItemPos[]) => {
        const firstPos = itemPositions.at(firstIdx).pos - itemPositions.at(firstIdx).size;
        let newLast = binarySearchFirst(Math.min(firstPos + viewportSize * 3, totalScrollSize), itemPositions);

        return newLast;
    };

    const _shouldRecalculate = (calculatedIdxs: boolean[], firstRendered: { pos: number; idx: number }, firstInViewport: { pos: number; idx: number }, triggerDistance: number) => {
        const thresholdDistance = firstInViewport.pos - firstRendered.pos;
        return !calculatedIdxs[firstInViewport.idx] || thresholdDistance < triggerDistance || thresholdDistance > triggerDistance * 3;
    };

    const getRange = (first: GridItem) => {
        const viewport = numsInViewport();
        if (
            _shouldRecalculate(_calculatedIndexes.mainAxis, { pos: positions.mainAxis[first.main].pos, idx: first.main }, { pos: positions.mainAxis[viewport.first.main].pos, idx: viewport.first.main }, viewportSize.main / 2) ||
            _shouldRecalculate(_calculatedIndexes.crossAxis, { pos: positions.crossAxis[first.cross].pos, idx: first.cross }, { pos: positions.crossAxis[viewport.first.cross].pos, idx: viewport.first.cross }, viewportSize.cross / 2)
        )
            _updateByIndexWithEvents({ main: viewport.first.main, cross: viewport.first.cross });

        const totalScrollSize = totalSize();
        const newFirst = {
            main: _calculateFirst(first.main, scrollPos.main, positions.mainAxis, viewportSize.main),
            cross: _calculateFirst(first.cross, scrollPos.cross, positions.crossAxis, viewportSize.cross)
        };
        const newLast = {
            main: _calculateLast(newFirst.main, totalScrollSize.main, viewportSize.main, positions.mainAxis),
            cross: _calculateLast(newFirst.cross, totalScrollSize.cross, viewportSize.cross, positions.crossAxis)
        };

        return {
            first: newFirst,
            last: newLast,
            isRangeChanged: newFirst.main !== first.main || newFirst.cross !== first.cross
        };
    };

    if (positions.crossAxis.length) {
        const changes = _updateByIndexWithEvents({ main: binarySearchFirst(scrollPos.main, positions.mainAxis), cross: binarySearchFirst(scrollPos.cross, positions.crossAxis) }, false);
        const scrollMain = scrollPos.main;
        const scrollCross = scrollPos.cross;

        if (changes.scrollSizeDiff.main || changes.scrollSizeDiff.cross) {
            setSpacerSize(totalSize());
        }
        if (changes.jump.main || changes.jump.cross) {
            scrollTo({ main: scrollMain + changes.jump.main, cross: scrollCross + changes.jump.cross });
        }
    }

    return { positions, getRange, updateByIndex, at, updateByScrollPos, numsInViewport, totalSize };
};

export const getShift = ({ scrollPos, prevItemPos, currItemPos }: { scrollPos: number; prevItemPos: number; currItemPos: number }): number => {
    return currItemPos - scrollPos + (scrollPos - prevItemPos);
};

const getShiftWrapper = ({ scrollPos, prevItemPos, prevItemIdx }: { scrollPos: number; prevItemPos: number; prevItemIdx: number }): number => getShift({ scrollPos, prevItemPos, currItemPos: 40 * prevItemIdx });

@NgModule({
    imports: [Scroller, SharedModule],
    exports: [Scroller, SharedModule]
})
export class ScrollerModule {}
