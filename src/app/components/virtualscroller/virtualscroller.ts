import {NgModule,Component,ElementRef,AfterContentInit,Input,Output,ViewChild,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef,ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from 'primeng/api';
import {ScrollingModule,CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {BlockableUI} from 'primeng/api';

@Component({
    selector: 'p-virtualScroller',
    template:`
        <div [ngClass]="'ui-virtualscroller ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-virtualscroller-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <div #content class="ui-virtualscroller-content ui-widget-content">
                <div class="ui-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; ">
                            <div [ngStyle]="{'height': itemSize + 'px'}" class="ui-virtualscroller-item">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </div>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </div>
            </div>
            <div class="ui-virtualscroller-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class VirtualScroller implements AfterContentInit,BlockableUI {

    @Input() itemSize: number; 

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() scrollHeight: any;

    @Input() lazy: boolean;

    @Input() cache: boolean = true;

    @Input() rows: number;

    @Input() first: number = 0;

    @Input() minBufferPx: number;

    @Input() maxBufferPx: number;
    
    @Input() trackBy: Function = (index: number, item: any) => item;
                
    @ContentChild(Header) header: Header;

    @ContentChild(Footer) footer: Footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    itemTemplate: TemplateRef<any>;

    loadingItemTemplate: TemplateRef<any>;

    _totalRecords: number = 0;

    _value: any[];

    lazyValue: any[] = [];

    page: number = 0;

    constructor(public el: ElementRef) {}

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }
    set totalRecords(val: number) {
        this._totalRecords = val;
        this.lazyValue = Array.from({length: this._totalRecords});
        this.first = 0;
        this.scrollTo(0);
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }

    @Input() get value(): any[] {
        return this.lazy ? this.lazyValue : this._value;
    }
    set value(val: any[]) {
        if (this.lazy) {
            if (val) {
                let arr = this.cache ? [...this.lazyValue] : Array.from({length: this._totalRecords});
                for (let i = this.first, j = 0; i < (this.first + this.rows); i++, j++) {
                    arr[i] = val[j];
                }
                this.lazyValue = arr;
            }
        }
        else {
            this._value = val;
        }
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
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    onScrollIndexChange(index: number) {
        let p = Math.floor(index / this.rows);
        if (p !== this.page) {
            this.page = p;
            this.first = this.page * this.rows;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows
        };
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    scrollTo(index: number): void {
        this.scrollToIndex(index);
    }

    scrollToIndex(index: number): void {
        if (this.viewport) {
            this.viewport.scrollToIndex(index);
        }
    }
}

@NgModule({
    imports: [CommonModule,ScrollingModule],
    exports: [VirtualScroller,SharedModule,ScrollingModule],
    declarations: [VirtualScroller]
})
export class VirtualScrollerModule { }

