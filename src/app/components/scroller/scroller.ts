import { NgModule, Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, AfterContentInit, ContentChildren, QueryList, TemplateRef, Output, EventEmitter, SimpleChanges, OnInit, AfterViewChecked, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';

export type ScrollerToType = 'to-start' | 'to-end' | undefined;

export type ScrollerOrientationType = 'vertical' | 'horizontal' | 'both';

export interface ScrollerOptions {
    id?: string | undefined;
    style?: any;
    styleClass?: string | undefined;
    tabindex?: number | undefined;
    items?: any[];
    itemSize?: any;
    scrollHeight?: string | undefined;
    scrollWidth?: string | undefined;
    orientation?: ScrollerOrientationType;
    delay?: number | undefined;
    lazy?: boolean;
    disabled?: boolean;
    loaderDisabled?: boolean;
    columns?: any[] | undefined;
    showSpacer?: boolean;
    showLoader?: boolean;
    numToleratedItems?: any;
    loading?: boolean;
    autoSize?: boolean;
    trackBy?: any;
    onLazyLoad?: Function | undefined;
    onScroll?: Function | undefined;
    onScrollIndexChange?: Function | undefined;
}

@Component({
    selector: 'p-scroller',
    template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div #element [attr.id]="_id" [attr.tabindex]="tabindex" [ngStyle]="_style" [class]="_styleClass"
                [ngClass]="{'p-scroller': true, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal}"
                (scroll)="onContainerScroll($event)">
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: loadedItems, options: getContentOptions()}"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{'p-scroller-loading': d_loading}" [ngStyle]="contentStyle">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, options: getOptions(index)}"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{'p-component-overlay': !loaderTemplate}">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: {options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols })}"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: {options: { styleClass: 'p-scroller-loading-icon' }}"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <i class="p-scroller-loading-icon pi pi-spinner pi-spin"></i>
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: items, options: {rows: _items, columns: loadedColumns}}"></ng-container>
            </ng-container>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./scroller.css'],
    host: {
        'class': 'p-scroller-viewport p-element'
    }
})
export class Scroller implements OnInit, AfterContentInit, AfterViewChecked, OnDestroy {

    @Input() get id() { return this._id; }
    set id(val: string) { this._id = val; }

    @Input() get style() { return this._style; }
    set style(val: any) { this._style = val; }

    @Input() get styleClass() { return this._styleClass; }
    set styleClass(val: string) { this._styleClass = val; }

    @Input() get tabindex() { return this._tabindex; }
    set tabindex(val: number) { this._tabindex = val; }

    @Input() get items() { return this._items; }
    set items(val: any[]) { this._items = val; }

    @Input() get itemSize() { return this._itemSize; }
    set itemSize(val: any) { this._itemSize = val; }

    @Input() get scrollHeight() { return this._scrollHeight; }
    set scrollHeight(val: string) { this._scrollHeight = val; }

    @Input() get scrollWidth() { return this._scrollWidth; }
    set scrollWidth(val: string) { this._scrollWidth = val; }

    @Input() get orientation() { return this._orientation; }
    set orientation(val: string) { this._orientation = val; }

    @Input() get delay() { return this._delay; }
    set delay(val: number) { this._delay = val; }

    @Input() get resizeDelay() { return this._resizeDelay; }
    set resizeDelay(val: number) { this._resizeDelay = val; }

    @Input() get lazy() { return this._lazy; }
    set lazy(val: boolean) { this._lazy = val; }

    @Input() get disabled() { return this._disabled; }
    set disabled(val: boolean) { this._disabled = val; }

    @Input() get loaderDisabled() { return this._loaderDisabled; }
    set loaderDisabled(val: boolean) { this._loaderDisabled = val; }

    @Input() get columns() { return this._columns; }
    set columns(val: any[]) { this._columns = val; }

    @Input() get showSpacer() { return this._showSpacer; }
    set showSpacer(val: boolean) { this._showSpacer = val; }

    @Input() get showLoader() { return this._showLoader; }
    set showLoader(val: boolean) { this._showLoader = val; }

    @Input() get numToleratedItems() { return this._numToleratedItems; }
    set numToleratedItems(val: number) { this._numToleratedItems = val; }

    @Input() get loading() { return this._loading; }
    set loading(val: boolean) { this._loading = val; }

    @Input() get autoSize() { return this._autoSize; }
    set autoSize(val: boolean) { this._autoSize = val; }

    @Input() get trackBy() { return this._trackBy; }
    set trackBy(val: any) { this._trackBy = val; }

    @Input() get options() { return this._options; }
    set options(val: ScrollerOptions) {
        this._options = val;

        if (val && typeof val === 'object') {
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }

    @ViewChild('element') elementViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Output() onScroll: EventEmitter<any> = new EventEmitter();

    @Output() onScrollIndexChange: EventEmitter<any> = new EventEmitter();

    _id: string;

    _style: any;

    _styleClass: string;

    _tabindex: number = 0;

    _items: any[];

    _itemSize: any = 0;

    _scrollHeight: string;

    _scrollWidth: string;

    _orientation: string = 'vertical';

    _delay: number = 0;

    _resizeDelay: number = 10;

    _lazy: boolean = false;

    _disabled: boolean = false;

    _loaderDisabled: boolean = false;

    _columns: any[];

    _showSpacer: boolean = true;

    _showLoader: boolean = false;

    _numToleratedItems: any;

    _loading: boolean;

    _autoSize: boolean = false;

    _trackBy: any;

    _options: ScrollerOptions;

    d_loading: boolean = false;

    d_numToleratedItems: any;

    contentEl: any;

    contentTemplate: TemplateRef<any>;

    itemTemplate: TemplateRef<any>;

    loaderTemplate: TemplateRef<any>;

    loaderIconTemplate: TemplateRef<any>;

    first: any = 0;

    last: any = 0;

    numItemsInViewport: any = 0;

    lastScrollPos: any = 0;

    loaderArr: any[] = [];

    spacerStyle: any = {};

    contentStyle: any = {};

    scrollTimeout: any;

    resizeTimeout: any;

    initialized: boolean = false;

    windowResizeListener: any;

    defaultWidth: number;

    defaultHeight: number;

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
            if (this.both)
                return this._items.slice(this.first.rows, this.last.rows).map(item => this._columns ? item : item.slice(this.first.cols, this.last.cols));
            else if (this.horizontal && this._columns)
                return this._items;
            else
                return this._items.slice(this.first, this.last);
        }

        return [];
    }

    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled ? this.loaderArr : []) : this.loadedItems;
    }

    get loadedColumns() {
        if (this._columns && (this.both || this.horizontal)) {
            return this.d_loading && this._loaderDisabled ?
                (this.both ? this.loaderArr[0] : this.loaderArr) :
                this._columns.slice((this.both ? this.first.cols : this.first), (this.both ? this.last.cols : this.last));
        }

        return this._columns;
    }

    constructor(private cd: ChangeDetectorRef, private zone: NgZone) {
        if (!this._disabled) {
            this.zone.runOutsideAngular(() => {
                this.windowResizeListener = this.onWindowResize.bind(this);

                window.addEventListener('resize', this.windowResizeListener);
                window.addEventListener('orientationchange', this.windowResizeListener);
            });
        }
    }

    ngOnInit() {
        this.setInitialState();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        let isLoadingChanged = false;

        if (simpleChanges.loading) {
            const { previousValue, currentValue } = simpleChanges.loading;

            if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
                this.d_loading = currentValue;
                isLoadingChanged = true;
            }
        }

        if (this.initialized) {
            const isChanged = !isLoadingChanged && (simpleChanges.items || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
            isChanged && this.init();
        }

        if (simpleChanges.orientation) {
            this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        }

        if (simpleChanges.numToleratedItems) {
            const { previousValue, currentValue } = simpleChanges.numToleratedItems;

            if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue;
            }
        }

        if (simpleChanges.options) {
            const { previousValue, currentValue } = simpleChanges.options;

            if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
                this.d_loading = currentValue.loading;
            }

            if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue.numToleratedItems;
            }
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'loader':
                    this.loaderTemplate = item.template;
                    break;

                case 'loadericon':
                    this.loaderIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewInit() {
        this.setContentEl(this.contentEl);
        this.init();

        this.defaultWidth = DomHandler.getWidth(this.elementViewChild.nativeElement);
        this.defaultHeight = DomHandler.getHeight(this.elementViewChild.nativeElement);
        this.initialized = true;
    }

    ngAfterViewChecked() {
        this.calculateAutoSize();
    }

    ngOnDestroy() {
        if (this.windowResizeListener) {
            window.removeEventListener('resize', this.windowResizeListener);
            window.removeEventListener('orientationchange', this.windowResizeListener);
            this.windowResizeListener = null;
        }
    }

    init() {
        if (!this._disabled) {
            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();

            this.cd.detectChanges();
        }
    }

    setContentEl(el?: HTMLElement) {
        this.contentEl = el || this.contentViewChild?.nativeElement || DomHandler.findSingle(this.elementViewChild?.nativeElement, '.p-scroller-content');
    }

    setInitialState() {
        this.first = this.both ? { rows: 0, cols: 0 } : 0;
        this.last = this.both ? { rows: 0, cols: 0 } : 0;
        this.numItemsInViewport = this.both ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.d_loading = this._loading || false;
        this.d_numToleratedItems = this._numToleratedItems;
    }

    getElementRef() {
        return this.elementViewChild;
    }

    scrollTo(options: ScrollToOptions) {
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.elementViewChild?.nativeElement?.scrollTo(options);
    }

    scrollToIndex(index: number, behavior: ScrollBehavior = 'auto') {
        const { numToleratedItems } = this.calculateNumItems();
        const contentPos = this.getContentPosition();
        const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
        const calculateCoord = (_first, _size, _cpos) => (_first * _size) + _cpos;
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });

        if (this.both) {
            const newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
            if (newFirst.rows !== this.first.rows || newFirst.cols !== this.first.cols) {
                scrollTo(calculateCoord(newFirst.cols, this._itemSize[1], contentPos.left), calculateCoord(newFirst.rows, this._itemSize[0], contentPos.top));
            }
        }
        else {
            const newFirst = calculateFirst(index, numToleratedItems);

            if (newFirst !== this.first) {
                this.horizontal ? scrollTo(calculateCoord(newFirst, this._itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, this._itemSize, contentPos.top));
            }
        }
    }

    scrollInView(index: number, to: ScrollerToType, behavior: ScrollBehavior = 'auto') {
        if (to) {
            const { first, viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';

            if (isToStart) {
                if (this.both) {
                    if (viewport.first.rows - first.rows > index[0]) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
                    }
                    else if (viewport.first.cols - first.cols > index[1]) {
                        scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.first - first > index) {
                        const pos = (viewport.first - 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
            else if (isToEnd) {
                if (this.both) {
                    if (viewport.last.rows - first.rows <= index[0] + 1) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
                    }
                    else if (viewport.last.cols - first.cols <= index[1] + 1) {
                        scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.last - first <= index + 1) {
                        const pos = (viewport.first + 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        }
        else {
            this.scrollToIndex(index, behavior);
        }
    }

    getRenderedRange() {
        const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));

        let firstInViewport = this.first;
        let lastInViewport: any = 0;

        if (this.elementViewChild?.nativeElement) {
            const { scrollTop, scrollLeft } = this.elementViewChild.nativeElement;

            if (this.both) {
                firstInViewport = { rows: calculateFirstInViewport(scrollTop, this._itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this._itemSize[1]) };
                lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
            }
            else {
                const scrollPos = this.horizontal ? scrollLeft : scrollTop;
                firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
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
        }
    }

    calculateNumItems() {
        const contentPos = this.getContentPosition();
        const contentWidth = this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0;
        const contentHeight = this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0;
        const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
        const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
        const numItemsInViewport: any = this.both ?
            { rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1]) } :
            calculateNumItemsInViewport((this.horizontal ? contentWidth : contentHeight), this._itemSize);

        const numToleratedItems = this.d_numToleratedItems || (this.both ?
            [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] :
            calculateNumToleratedItems(numItemsInViewport));

        return { numItemsInViewport, numToleratedItems };
    }

    calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
        const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + ((_first < _numT ? 2 : 3) * _numT), _isCols);
        const first = this.first;
        const last = this.both ?
            { rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true) } :
            calculateLast(this.first, numItemsInViewport, numToleratedItems);

        this.last = last;
        this.numItemsInViewport = numItemsInViewport;
        this.d_numToleratedItems = numToleratedItems;

        if (this.showLoader) {
            this.loaderArr = this.both ?
                Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) :
                Array.from({ length: numItemsInViewport });
        }

        if (this._lazy) {
            this.handleEvents('onLazyLoad', { first, last });
        }
    }

    calculateAutoSize() {
        if (this._autoSize && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';

                    const { offsetWidth, offsetHeight } = this.contentEl;

                    (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = (offsetWidth < this.defaultWidth ? offsetWidth : this.defaultWidth) + 'px');
                    (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = (offsetHeight < this.defaultHeight ? offsetHeight : this.defaultHeight) + 'px');
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                }
            });
        }
    }

    getLast(last = 0, isCols = false) {
        return this._items ? Math.min((isCols ? (this._columns || this._items[0]).length : this._items.length), last) : 0;
    }

    getContentPosition() {
        if (this.contentEl) {
            const style = getComputedStyle(this.contentEl);
            const left = parseFloat(style.paddingLeft) + Math.max((parseFloat(style.left) || 0), 0);
            const right = parseFloat(style.paddingRight) + Math.max((parseFloat(style.right) || 0), 0);
            const top = parseFloat(style.paddingTop) + Math.max((parseFloat(style.top) || 0), 0);
            const bottom = parseFloat(style.paddingBottom) + Math.max((parseFloat(style.bottom) || 0), 0);

            return { left, right, top, bottom, x: left + right, y: top + bottom };
        }

        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }

    setSize() {
        if (this.elementViewChild?.nativeElement) {
            const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
            const width = this._scrollWidth || `${(this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth)}px`;
            const height = this._scrollHeight || `${(this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight)}px`;
            const setProp = (_name, _value) => this.elementViewChild.nativeElement.style[_name] = _value;

            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            }
            else {
                setProp('height', height);
            }
        }
    }

    setSpacerSize() {
        if (this._items) {
            const contentPos = this.getContentPosition();
            const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (((_value || []).length * _size) + _cpos) + 'px' } };

            if (this.both) {
                setProp('height', this._items, this._itemSize[0], contentPos.y);
                setProp('width', (this._columns || this._items[1]), this._itemSize[1], contentPos.x);
            }
            else {
                this.horizontal ? setProp('width', (this._columns || this._items), this._itemSize, contentPos.x) : setProp('height', this._items, this._itemSize, contentPos.y);
            }
        }
    }

    setContentPosition(pos) {
        if (this.contentEl) {
            const first = pos ? pos.first : this.first;
            const calculateTranslateVal = (_first, _size) => (_first * _size);
            const setTransform = (_x = 0, _y = 0) => this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } };

            if (this.both) {
                setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
            }
            else {
                const translateVal = calculateTranslateVal(first, this._itemSize);
                this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }

    onScrollPositionChange(event) {
        const target = event.target;
        const contentPos = this.getContentPosition();
        const calculateScrollPos = (_pos, _cpos) => _pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0;
        const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            return (_currentIndex <= _numT ? _numT : (_isScrollDownOrRight ? (_last - _num - _numT) : (_first + _numT - 1)))
        };
        const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            if (_currentIndex <= _numT)
                return 0;
            else
                return Math.max(0, _isScrollDownOrRight ?
                    (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) :
                    (_currentIndex > _triggerIndex ? _first : _currentIndex - (2 * _numT)));
        };
        const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
            let lastValue = _first + _num + (2 * _numT);

            if (_currentIndex >= _numT) {
                lastValue += (_numT + 1);
            }

            return this.getLast(lastValue, _isCols);
        };

        const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
        const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);

        let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
        let newLast = this.last;
        let isRangeChanged = false;
        let newScrollPos = this.lastScrollPos;

        if (this.both) {
            const isScrollDown = this.lastScrollPos.top <= scrollTop;
            const isScrollRight = this.lastScrollPos.left <= scrollLeft;
            const currentIndex = { rows: calculateCurrentIndex(scrollTop, this._itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this._itemSize[1]) };
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

            isRangeChanged = (newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows) || (newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols);
            newScrollPos = { top: scrollTop, left: scrollLeft };
        }
        else {
            const scrollPos = this.horizontal ? scrollLeft : scrollTop;
            const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
            const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
            const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);

            newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
            newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
            isRangeChanged = newFirst !== this.first || newLast !== this.last;
            newScrollPos = scrollPos;
        }

        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        }
    }

    onScrollChange(event) {
        const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);

        if (isRangeChanged) {
            const newState = { first, last };

            this.setContentPosition(newState);

            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;

            this.handleEvents('onScrollIndexChange', newState);

            if (this._lazy) {
                this.handleEvents('onLazyLoad', newState);
            }
        }
    }

    onContainerScroll(event) {
        this.handleEvents('onScroll', { originalEvent: event });

        if (this._delay) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }

            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged: changed } = this.onScrollPositionChange(event);
                if (changed) {
                    this.d_loading = true;

                    this.cd.detectChanges();
                }
            }

            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);

                if (this.d_loading && this.showLoader && (!this._lazy || this._loading === undefined)) {
                    this.d_loading = false;

                    this.cd.detectChanges();
                }
            }, this._delay);
        }
        else {
            this.onScrollChange(event);
        }
    }

    onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            if (this.elementViewChild) {
                const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both ? (isDiffWidth || isDiffHeight) : (this.horizontal ? isDiffWidth : (this.vertical ? isDiffHeight : false));

                reinit && this.zone.run(() => {
                    this.d_numToleratedItems = this._numToleratedItems;
                    this.defaultWidth = width;
                    this.defaultHeight = height;

                    this.init();
                });
            }
        }, this._resizeDelay);
    }

    handleEvents(name, params) {
        return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
    }

    getContentOptions() {
        return {
            contentStyleClass: `p-scroller-content ${this.d_loading ? 'p-scroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index, options?) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize,
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical,
            horizontal: this.horizontal,
            both: this.both
        }
    }

    getOptions(renderedIndex) {
        const count = (this._items || []).length;
        const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;

        return {
            index,
            count,
            first: index === 0,
            last: index === (count - 1),
            even: index % 2 === 0,
            odd: index % 2 !== 0
        }
    }

    getLoaderOptions(index, extOptions) {
        const count = this.loaderArr.length;

        return {
            index,
            count,
            first: index === 0,
            last: index === (count - 1),
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            ...extOptions
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Scroller],
    declarations: [Scroller]
})
export class ScrollerModule { }
