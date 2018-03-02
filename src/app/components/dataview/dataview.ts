import {NgModule,Component,ElementRef,OnInit,AfterContentInit,DoCheck,OnDestroy,Input,Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {SelectButtonModule} from '../selectbutton/selectbutton';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-dataView',
    template: `
        <div [ngClass]="{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-dataview-header ui-widget-header ui-corner-top">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-top" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div class="ui-dataview-content ui-widget-content">
                <div class="ui-g">
                    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)" [ngForTrackBy]="trackBy">
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}"></ng-container>
                    </ng-template>
                    <div *ngIf="isEmpty()" class="ui-widget-content ui-g-12">{{emptyMessage}}</div>
                </div>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div class="ui-dataview-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `
})
export class DataView implements OnInit,AfterContentInit,BlockableUI {

    @Input() layout: string = 'list';

    @Input() paginator: boolean;

    @Input() rows: number;
    
    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;
    
    @Input() rowsPerPageOptions: number[];

    @Input() lazy: boolean;

    @Input() emptyMessage: string = 'No records found';
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() paginatorPosition: string = 'bottom';
    
    @Input() alwaysShowPaginator: boolean = true;
    
    @Input() trackBy: Function = (index: number, item: any) => item;
    
    @Input() paginatorDropdownAppendTo: any;
    
    @Output() onPage: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    _value: any[];
    
    listItemTemplate: TemplateRef<any>;

    gridItemTemplate: TemplateRef<any>;

    itemTemplate: TemplateRef<any>;

    first: number = 0;
    
    page: number = 0;
    
    filteredValue: any[];
    
    constructor(public el: ElementRef) {}
    
    ngOnInit() {
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    }
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'listItem':
                    this.listItemTemplate = item.template;
                break;
                
                case 'gridItem':
                    this.gridItemTemplate = item.template;
                break;
            }
        });

        this.updateItemTemplate();
    }

    updateItemTemplate() {
        switch(this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
            break;
            
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
            break;
        }
    }
    
    @Input() get value(): any[] {
        return this._value;
    }

    set value(val:any[]) {
        this._value = val;
        this.updateTotalRecords();
    }

    changeLayout(layout: string) {
        this.layout = layout;
        this.updateItemTemplate();
    }
        
    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    }

    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }

    isEmpty() {
        let data = this.filteredValue||this.value;
        return data == null || data.length == 0;
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
}

@Component({
    selector: 'p-dataViewLayoutOptions',
    template: `
        <div [ngClass]="'ui-dataview-layout-options ui-selectbutton ui-buttonset'" [ngStyle]="style" [class]="styleClass">
            <a href="#" class="ui-button ui-button-icon-only ui-state-default" (click)="changeLayout($event, 'list')"
                [ngClass]="{'ui-state-active': dv.layout === 'list'}">
                <i class="fa fa-bars ui-button-icon-left"></i>
                <span class="ui-button-text ui-clickable">ui-btn</span>
            </a><a href="#" class="ui-button ui-button-icon-only ui-state-default" (click)="changeLayout($event, 'grid')"
                [ngClass]="{'ui-state-active': dv.layout === 'grid'}">
                <i class="fa fa-th-large ui-button-icon-left"></i>
                <span class="ui-button-text ui-clickable">ui-btn</span>
            </a>
        </div>
    `
})
export class DataViewLayoutOptions  {

    @Input() style: any;

    @Input() styleClass: string;

    constructor(public dv: DataView) {}

    changeLayout(event: Event, layout: string) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    }
}

@NgModule({
    imports: [CommonModule,SharedModule,PaginatorModule,SelectButtonModule],
    exports: [DataView,SharedModule,DataViewLayoutOptions],
    declarations: [DataView,DataViewLayoutOptions]
})
export class DataViewModule { }
