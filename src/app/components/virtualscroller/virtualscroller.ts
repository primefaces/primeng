import {NgModule,Component,ElementRef,AfterContentInit,Input,Output,ViewChild,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef,ChangeDetectionStrategy,OnChanges,SimpleChanges, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from 'primeng/api';
import {ScrollingModule,CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {BlockableUI} from 'primeng/api';

@Component({
    selector: 'p-virtualScroller',
    template:`
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content">
                <div class="p-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd;">
                            <div [ngStyle]="{'height': itemSize + 'px'}" class="p-virtualscroller-item">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </div>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </div>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class VirtualScroller implements AfterContentInit,BlockableUI,OnChanges {

    @Input() value: any[];

    @Input() itemSize: number; 

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() scrollHeight: any;

    @Input() lazy: boolean;

    @Input() rows: number;

    @Input() minBufferPx: number;

    @Input() maxBufferPx: number;
  
    @Input() trackBy: Function = (index: number, item: any) => item;
                
    @ContentChild(Header) header: Header;

    @ContentChild(Footer) footer: Footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    itemTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    loadingItemTemplate: TemplateRef<any>;

    _totalRecords: number = 0;

    page: number = 0;

    _first: number = 0;

    loadedPages: number[] = [];

    _cache: boolean;

    constructor(public el: ElementRef) {}

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }
    set totalRecords(val: number) {
        this._totalRecords = val;
        console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
    }

    @Input() get first(): number {
        return this._first;
    }
    set first(val:number) {
        this._first = val;
        console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
    }

    @Input() get cache(): boolean {
        return this._cache;
    }
    set cache(val: boolean) {
        this._cache = val;
        console.log("cache is deprecated as it is always on.");
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'loadingItem':
                    this.loadingItemTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    onScrollIndexChange(index: number) {
        if (this.lazy) {
            let pageRange = this.createPageRange(Math.floor(index / this.rows));
            pageRange.forEach(page => this.loadPage(page));
        }
    }

    createPageRange(page: number) {
        let range: number[] = [];

        if (page !== 0) {
            range.push(page - 1);
        }
        range.push(page);
        if (page !== (Math.ceil(this.value.length / this.rows) - 1)) {
            range.push(page + 1);
        }

        return range;
    }

    loadPage(page: number) {
        if (!this.loadedPages.includes(page)) {
            this.onLazyLoad.emit({first: this.rows * page, rows: this.rows});
            this.loadedPages.push(page);
        }
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    //@deprecated
    scrollTo(index: number, mode?: ScrollBehavior): void {
        this.scrollToIndex(index, mode);
    }

    scrollToIndex(index: number, mode?: ScrollBehavior): void {
        if (this.viewport) {
            this.viewport.scrollToIndex(index, mode);
        }
    }

    clearCache() {
        this.loadedPages = [];
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.value) {
            if (!this.lazy) {
                this.clearCache();
            }
        }
    }
}

@NgModule({
    imports: [CommonModule,ScrollingModule],
    exports: [VirtualScroller,SharedModule,ScrollingModule],
    declarations: [VirtualScroller]
})
export class VirtualScrollerModule { }

