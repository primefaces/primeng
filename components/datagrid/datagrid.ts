import {Component,ElementRef,AfterViewInit,OnDestroy,DoCheck,Input,Output,SimpleChange,EventEmitter,ContentChild,IterableDiffers,TemplateRef} from '@angular/core';
import {Header} from '../common';
import {Footer} from '../common';
import {Paginator} from '../paginator/paginator';

@Component({
    selector: 'p-dataGrid',
    template: `
        <div [ngClass]="'ui-datagrid ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-datagrid-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="header"></ng-content>
            </div>
            <div class="ui-datagrid-content ui-widget-content" [ngClass]="'ui-datagrid-col-' + columns">
                <template ngFor [ngForOf]="dataToRender" [ngForTemplate]="itemTemplate"></template>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" 
                (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator"></p-paginator>
            <div class="ui-datagrid-footer ui-widget-header ui-corner-top" *ngIf="footer">
                <ng-content select="footer"></ng-content>
            </div>
        </div>
    `,
    directives: [Paginator]
})
export class DataGrid implements AfterViewInit,DoCheck {

    @Input() value: any[];

    @Input() paginator: boolean;

    @Input() rows: number;
    
    @Input() columns: number = 3;

    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;
    
    @Input() rowsPerPageOptions: number[];

    @Input() lazy: boolean;
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;
        
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    private dataToRender: any[];

    private first: number = 0;
    
    private page: number = 0;

    differ: any;

    constructor(private el: ElementRef, differs: IterableDiffers) {
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
}
