import {
    NgModule, Component, ElementRef, Input, Output, SimpleChange, EventEmitter, QueryList,
    ContentChildren, AfterContentInit, TemplateRef, OnDestroy, EmbeddedViewRef, ViewContainerRef, OnChanges, OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from '../dropdown/dropdown';
import {SelectItem} from '../common/selectitem';
import {PrimeTemplate} from "../common/shared";

@Component({
    selector: 'p-paginatorDetail',
    template: ``
})
export class PaginatorDetail implements OnChanges, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() state: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {}

    ngOnChanges() {
        if (!!this.view) {
            this.view.destroy();
        }

        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.state,
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'p-paginator',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-paginator ui-widget ui-widget-header ui-unselectable-text'"
            *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
            <a href="#" class="ui-paginator-first ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToFirst($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
                <span class="fa fa-step-backward"></span>
            </a>
            <a href="#" class="ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToPrev($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
                <span class="fa fa-backward"></span>
            </a>
            <span class="ui-paginator-pages">
                <a href="#" *ngFor="let pageLink of pageLinks" class="ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"
                    (click)="onPageLinkClick($event, pageLink - 1)" [ngClass]="{'ui-state-active': (pageLink-1 == getPage())}">{{pageLink}}</a>
            </span>
            <a href="#" class="ui-paginator-next ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToNext($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
                <span class="fa fa-forward"></span>
            </a>
            <a href="#" class="ui-paginator-last ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToLast($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
                <span class="fa fa-step-forward"></span>
            </a>
            <p-dropdown [options]="rowsPerPageItems" [(ngModel)]="rows" *ngIf="rowsPerPageOptions" 
                (onChange)="onRppChange($event)" [lazy]="false" [autoWidth]="false"></p-dropdown>
            <p-paginatorDetail *ngIf="paginatorDetail" [template]="paginatorDetailTemplate" [state]="state"></p-paginatorDetail>
        </div>
    `
})
export class Paginator implements OnInit, AfterContentInit {

    @Input() pageLinkSize: number = 5;

    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() alwaysShow: boolean = true;

    @Input() paginatorDetail: boolean = false;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    pageLinks: number[];

    _totalRecords: number = 0;

    _first: number = 0;

    _rows: number = 0;
    
    _rowsPerPageOptions: number[];
    
    rowsPerPageItems: SelectItem[];

    paginatorDetailTemplate: TemplateRef<any>;

    state: any;

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val:number) {
        this._totalRecords = val;
        this.updatePageLinks();
    }

    @Input() get first(): number {
        return this._first;
    }

    set first(val:number) {
        this._first = val;
        this.updatePageLinks();
    }

    @Input() get rows(): number {
        return this._rows;
    }

    set rows(val:number) {
        this._rows = val;
        this.updatePageLinks();
    }
    
    @Input() get rowsPerPageOptions(): number[] {
        return this._rowsPerPageOptions;
    }

    set rowsPerPageOptions(val:number[]) {
        this._rowsPerPageOptions = val;
        if(this._rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for(let opt of this._rowsPerPageOptions) {
                this.rowsPerPageItems.push({label: String(opt), value: opt});
            }
        }
    }

    ngOnInit() {
        this.state = {
            page: 0,
            first: this.first,
            rows: this.rows,
            pageCount: this.getPageCount()
        };
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'paginatordetail':
                    this.paginatorDetailTemplate = item.template;
                    break;
            }
        });
    }

    isFirstPage() {
        return this.getPage() === 0;
    }

    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords/this.rows)||1;
    }

    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(),
        visiblePages = Math.min(this.pageLinkSize, numberOfPages);

        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))),
        end = Math.min(numberOfPages - 1, start + visiblePages - 1);

        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);

        return [start, end];
    }

    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(),
        start = boundaries[0],
        end = boundaries[1];

        for(let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    }

    changePage(p :number) {
        var pc = this.getPageCount();

        if(p >= 0 && p < pc) {
            this.first = this.rows * p;
            this.state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();

            this.onPageChange.emit(this.state);
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst(event) {
      if(!this.isFirstPage()){
          this.changePage(0);
      }

      event.preventDefault();
    }

    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }

    changePageToNext(event) {
        this.changePage(this.getPage()  + 1);
        event.preventDefault();
    }

    changePageToLast(event) {
      if(!this.isLastPage()){
          this.changePage(this.getPageCount() - 1);
      }

      event.preventDefault();
    }

    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }

    onRppChange(event) {
        this.changePage(this.getPage());
    }
}

@NgModule({
    imports: [CommonModule,DropdownModule,FormsModule],
    exports: [Paginator,DropdownModule,FormsModule],
    declarations: [Paginator,PaginatorDetail]
})
export class PaginatorModule { }
