import {NgModule,Component,OnInit,Input,Output,ChangeDetectorRef,EventEmitter,TemplateRef,OnChanges,SimpleChanges,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {SharedModule} from 'primeng/api';

@Component({
    selector: 'p-paginator',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: {$implicit: paginatorState}"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{currentPageReport}}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage()" (click)="changePageToFirst($event)" pRipple
                    class="p-paginator-first p-paginator-element p-link" [ngClass]="{'p-disabled':isFirstPage()}">
                <span class="p-paginator-icon pi pi-angle-double-left"></span>
            </button>
            <button type="button" [disabled]="isFirstPage()" (click)="changePageToPrev($event)" pRipple
                    class="p-paginator-prev p-paginator-element p-link" [ngClass]="{'p-disabled':isFirstPage()}">
                <span class="p-paginator-icon pi pi-angle-left"></span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{'p-highlight': (pageLink-1 == getPage())}"
                    (click)="onPageLinkClick($event, pageLink - 1)" pRipple>{{pageLink}}</button>
            </span>
            <p-dropdown [options]="pageItems" [ngModel]="getPage()" *ngIf="showJumpToPageDropdown"  styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight">
                <ng-template pTemplate="selectedItem">{{currentPageReport}}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage()" (click)="changePageToNext($event)" pRipple
                    class="p-paginator-next p-paginator-element p-link" [ngClass]="{'p-disabled':isLastPage()}">
                <span class="p-paginator-icon pi pi-angle-right"></span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage()" (click)="changePageToLast($event)" pRipple
                    class="p-paginator-last p-paginator-element p-link" [ngClass]="{'p-disabled':isLastPage()}">
                <span class="p-paginator-icon pi pi-angle-double-right"></span>
            </button>
            <p-dropdown [options]="rowsPerPageItems" [(ngModel)]="rows" *ngIf="rowsPerPageOptions" styleClass="p-paginator-rpp-options"
                (onChange)="onRppChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight">
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: {$implicit: item}">
                        </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: {$implicit: paginatorState}"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./paginator.css']
})
export class Paginator implements OnInit, OnChanges {

    @Input() pageLinkSize: number = 5;

    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() alwaysShow: boolean = true;
    
    @Input() templateLeft: TemplateRef<any>;
    
    @Input() templateRight: TemplateRef<any>;

    @Input() dropdownAppendTo: any;

    @Input() dropdownScrollHeight: string = '200px';

    @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';

    @Input() showCurrentPageReport: boolean;

    @Input() showFirstLastIcon: boolean = true;

    @Input() totalRecords: number = 0;

    @Input() rows: number = 0;
    
    @Input() rowsPerPageOptions: any[];

    @Input() showJumpToPageDropdown: boolean;

    @Input() showPageLinks: boolean = true;

    @Input() dropdownItemTemplate: TemplateRef<any>;

    pageLinks: number[];

    pageItems: SelectItem[];

    rowsPerPageItems: SelectItem[];
    
    paginatorState: any;

    _first: number = 0;

    _page: number = 0;

    constructor(private cd: ChangeDetectorRef) {}
    
    ngOnInit() {
        this.updatePaginatorState();
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }

        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }

        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }

        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
    }

    @Input() get first(): number {
        return this._first;
    }
    set first(val:number) {
        this._first = val;
    }

    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({label: opt['showAll'], value: this.totalRecords});
                }
                else {
                    this.rowsPerPageItems.push({label: String(opt), value: opt});
                }
            }
        }
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

        if (this.showJumpToPageDropdown) {
            this.pageItems = [];
            for (let i = 0; i < this.getPageCount(); i++) {
                this.pageItems.push({label: String(i + 1), value: i});
            }
        }
    }

    changePage(p :number) {
        var pc = this.getPageCount();

        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();

            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }

    updateFirst() {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && (this.first >= this.totalRecords)) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst(event) {
      if (!this.isFirstPage()){
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
      if (!this.isLastPage()){
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

    onPageDropdownChange(event) {
        this.changePage(event.value);
    }
    
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        }
    }

    get currentPageReport() {
        return this.currentPageReportTemplate
                .replace("{currentPage}", String(this.getPage() + 1))
                .replace("{totalPages}", String(this.getPageCount()))
                .replace("{first}", String(this._first + 1))
                .replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords)))
                .replace("{rows}", String(this.rows))
                .replace("{totalRecords}", String(this.totalRecords));
    }
}

@NgModule({
    imports: [CommonModule,DropdownModule,FormsModule,SharedModule,RippleModule],
    exports: [Paginator,DropdownModule,FormsModule,SharedModule],
    declarations: [Paginator]
})
export class PaginatorModule { }
