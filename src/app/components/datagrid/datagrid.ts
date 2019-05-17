import {NgModule,Component,ElementRef,AfterViewInit,AfterContentInit,DoCheck,OnDestroy,Input,Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,QueryList,TemplateRef,IterableDiffers} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header,Footer,PrimeTemplate,SharedModule} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {BlockableUI} from '../common/blockableui';

@Component({
    selector: 'p-dataGrid',
    template: `
        <div [ngClass]="'ui-datagrid ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-datagrid-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-top" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div class="ui-datagrid-content ui-widget-content">
                <div class="ui-g">
                    <ng-template ngFor [ngForOf]="dataToRender" [ngForTemplate]="itemTemplate" [ngForTrackBy]="trackBy"></ng-template>
                    <div *ngIf="isEmpty()" class="ui-widget-content ui-g-12">{{emptyMessage}}</div>
                </div>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div class="ui-datagrid-footer ui-widget-footer ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `
})
export class DataGrid implements AfterViewInit,AfterContentInit,DoCheck,BlockableUI {

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
    
    @Input() immutable: boolean = true;

    @Input() paginatorDropdownAppendTo: any;
    
    @Output() onPage: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    _value: any[];
    
    itemTemplate: TemplateRef<any>;

    dataToRender: any[];

    first: number = 0;
    
    page: number = 0;
    
    differ: any;
    
    constructor(public el: ElementRef, public differs: IterableDiffers) {
		this.differ = differs.find([]).create(null);
	}
    
    ngAfterViewInit() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    }
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
    
    @Input() get value(): any[] {
        return this._value;
    }

    set value(val:any[]) {
        this._value = val;
        
        if(this.immutable) {
            this.handleDataChange();
        }
    }
    
    handleDataChange() {
        if(this.paginator) {
            this.updatePaginator();
        }
        this.updateDataToRender(this.value);
    }
    
    ngDoCheck() {
        if(!this.immutable) {
            let changes = this.differ.diff(this.value);
            if(changes) {
                this.handleDataChange();
            }
        }
    }

    updatePaginator() {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length: 0);
        
        //first
        if(this.totalRecords && this.first >= this.totalRecords) {
            let numberOfPages = Math.ceil(this.totalRecords/this.rows);
            this.first = Math.max((numberOfPages-1) * this.rows, 0);
        }
    }

    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;
        
        if(this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
        
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }

    updateDataToRender(datasource) {
        if(this.paginator && datasource) {
            this.dataToRender = [];
            let startIndex = this.lazy ? 0 : this.first;
            for(let i = startIndex; i < (startIndex+ this.rows); i++) {
                if(i >= datasource.length) {
                    break;
                }

                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    }

    isEmpty() {
        return !this.dataToRender||(this.dataToRender.length == 0);
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

@NgModule({
    imports: [CommonModule,SharedModule,PaginatorModule],
    exports: [DataGrid,SharedModule],
    declarations: [DataGrid]
})
export class DataGridModule { }
