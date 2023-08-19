import { NgModule, Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, TemplateRef, OnChanges, SimpleChanges, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeTemplate, SelectItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { PaginatorState } from './paginator.interface';
import { Nullable } from 'primeng/ts-helpers';
import { DropdownChangeEvent } from 'primeng/dropdown';
/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
@Component({
    selector: 'p-paginator',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)" pRipple class="p-paginator-first p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple class="p-paginator-prev p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }" (click)="onPageLinkClick($event, pageLink - 1)" pRipple>
                    {{ getLocalization(pageLink) }}
                </button>
            </span>
            <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple class="p-paginator-next p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple class="p-paginator-last p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./paginator.css'],
    host: {
        class: 'p-element'
    }
})
export class Paginator implements OnInit, AfterContentInit, OnChanges {
    /**
     * Number of page links to display.
     * @group Props
     */
    @Input() pageLinkSize: number = 5;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    @Input() alwaysShow: boolean = true;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() dropdownAppendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Template instance to inject into the left side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    @Input() templateLeft: TemplateRef<PaginatorState> | undefined;
    /**
     * Template instance to inject into the right side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    @Input() templateRight: TemplateRef<PaginatorState> | undefined;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() dropdownScrollHeight: string = '200px';
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';
    /**
     * Whether to display current page report.
     * @group Props
     */
    @Input() showCurrentPageReport: boolean | undefined;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    @Input() showFirstLastIcon: boolean = true;
    /**
     * Number of total records.
     * @group Props
     */
    @Input() totalRecords: number = 0;
    /**
     * Data count to display per page.
     * @group Props
     */
    @Input() rows: number = 0;
    /**
     * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
     * @group Props
     */
    @Input() rowsPerPageOptions: any[] | undefined;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    @Input() showJumpToPageDropdown: boolean | undefined;
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    @Input() showJumpToPageInput: boolean | undefined;
    /**
     * Whether to show page links.
     * @group Props
     */
    @Input() showPageLinks: boolean = true;
    /**
     * Template instance to inject into the dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    @Input() dropdownItemTemplate: TemplateRef<{ $implicit: any }> | undefined;
    /**
     * Zero-relative number of the first row to be displayed.
     * @group Props
     */
    @Input() get first(): number {
        return this._first;
    }
    set first(val: number) {
        this._first = val;
    }
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorState} event - Paginator state.
     * @group Emits
     */
    @Output() onPageChange: EventEmitter<PaginatorState> = new EventEmitter<PaginatorState>();

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<any>>;

    @Input() locale: string;
    
    firstPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    previousPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    lastPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    nextPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    pageLinks: number[] | undefined;

    pageItems: SelectItem[] | undefined;

    rowsPerPageItems: SelectItem[] | undefined;

    paginatorState: any;

    _first: number = 0;

    _page: number = 0;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.updatePaginatorState();
    }

    getLocalization(digit: number) {
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [i, d]));
        if (digit > 9) {
            const numbers = String(digit).split('');
            return numbers.map((number) => index.get(Number(number))).join('');
        } else {
            return index.get(digit);
        }
    }

    ngAfterContentInit(): void {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'firstpagelinkicon':
                    this.firstPageLinkIconTemplate = item.template;
                    break;

                case 'previouspagelinkicon':
                    this.previousPageLinkIconTemplate = item.template;
                    break;

                case 'lastpagelinkicon':
                    this.lastPageLinkIconTemplate = item.template;
                    break;

                case 'nextpagelinkicon':
                    this.nextPageLinkIconTemplate = item.template;
                    break;
            }
        });
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

    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                } else {
                    this.rowsPerPageItems.push({ label: String(this.getLocalization(opt)), value: opt });
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
        return Math.ceil(this.totalRecords / this.rows);
    }

    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(),
            visiblePages = Math.min(this.pageLinkSize, numberOfPages);

        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2)),
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

        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }

        if (this.showJumpToPageDropdown) {
            this.pageItems = [];
            for (let i = 0; i < this.getPageCount(); i++) {
                this.pageItems.push({ label: String(i + 1), value: i });
            }
        }
    }

    changePage(p: number) {
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
        if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst(event: Event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }

        event.preventDefault();
    }

    changePageToPrev(event: Event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }

    changePageToNext(event: Event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }

    changePageToLast(event: Event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }

        event.preventDefault();
    }

    onPageLinkClick(event: Event, page: number) {
        this.changePage(page);
        event.preventDefault();
    }

    onRppChange(event: Event) {
        this.changePage(this.getPage());
    }

    onPageDropdownChange(event: DropdownChangeEvent) {
        this.changePage(event.value);
    }

    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }

    empty() {
        return this.getPageCount() === 0;
    }

    currentPage() {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }

    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace('{currentPage}', String(this.currentPage()))
            .replace('{totalPages}', String(this.getPageCount()))
            .replace('{first}', String(this.totalRecords > 0 ? this._first + 1 : 0))
            .replace('{last}', String(Math.min(this._first + this.rows, this.totalRecords)))
            .replace('{rows}', String(this.rows))
            .replace('{totalRecords}', String(this.totalRecords));
    }
}

@NgModule({
    imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
    exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule],
    declarations: [Paginator]
})
export class PaginatorModule {}
