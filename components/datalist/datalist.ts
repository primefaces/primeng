import {NgModule,Component,ElementRef,AfterViewInit,AfterContentInit,OnDestroy,DoCheck,Input,Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,IterableDiffers,TemplateRef,QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Header,Footer,PrimeTemplate} from '../common/shared';
import {PaginatorModule} from '../paginator/paginator';
import {BlockableUI} from '../common/api';

@Component({
    selector: 'p-dataList',
    template: `
        <div [ngClass]="'ui-datalist ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-datalist-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" 
            (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator  && paginatorPosition!='bottom' || paginatorPosition =='both'"></p-paginator>
            <div class="ui-datalist-content ui-widget-content">
                <ul class="ui-datalist-data">
                    <li *ngFor="let item of dataToRender;let i = index">
                        <template [pTemplateWrapper]="itemTemplate" [item]="item" [index]="i"></template>
                    </li>
                </ul>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" 
            (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator  && paginatorPosition!='top' || paginatorPosition =='both'"></p-paginator>
            <div class="ui-datalist-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `
})
export class DataList implements AfterViewInit,AfterContentInit,DoCheck,BlockableUI {

    @Input() value: any[];

    @Input() paginator: boolean;

    @Input() rows: number;
    
    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;
    
    @Input() rowsPerPageOptions: number[];

    @Input() lazy: boolean;
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() paginatorPosition: string = 'bottom';
        
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;

    public dataToRender: any[];

    public first: number = 0;
    
    public page: number = 0;

    differ: any;

    constructor(public el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
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

    ngAfterViewInit() {
        if(this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.value);

        if(changes) {
            if(this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
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
    exports: [DataList,SharedModule],
    declarations: [DataList]
})
export class DataListModule { }
