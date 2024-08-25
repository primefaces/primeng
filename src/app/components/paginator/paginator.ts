import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    numberAttribute,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aria, PrimeTemplate, SelectItem, SharedModule } from 'primeng/api';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { PaginatorState } from './paginator.interface';
import { PaginatorStyle } from './style/paginatorstyle';
import { BaseComponent } from 'primeng/basecomponent';
import { SelectModule } from 'primeng/select';
/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
@Component({
    selector: 'p-paginator',
    template: `
        <div
            [class]="styleClass"
            [ngStyle]="style"
            [ngClass]="'p-paginator p-component'"
            *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1"
            [attr.data-pc-section]="'paginator'"
            [attr.data-pc-section]="'root'"
        >
            <div class="p-paginator-content-start" *ngIf="templateLeft" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button
                *ngIf="showFirstLastIcon"
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToFirst($event)"
                pRipple
                class="p-paginator-first"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('firstPageLabel')"
            >
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-first-icon'" />
                <span class="p-paginator-first-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToPrev($event)"
                pRipple
                class="p-paginator-prev"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('prevPageLabel')"
            >
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-prev-icon'" />
                <span class="p-paginator-prev-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button
                    type="button"
                    *ngFor="let pageLink of pageLinks"
                    class="p-paginator-page"
                    [ngClass]="{ 'p-paginator-page-selected': pageLink - 1 == getPage() }"
                    [attr.aria-label]="getPageAriaLabel(pageLink)"
                    [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                    (click)="onPageLinkClick($event, pageLink - 1)"
                    pRipple
                >
                    {{ getLocalization(pageLink) }}
                </button>
            </span>
            <p-select
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                styleClass="p-paginator-jtp-dropdown"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
                <ng-container *ngIf="jumpToPageItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }">
                        </ng-container>
                    </ng-template>
                </ng-container>
                <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                </ng-template>
            </p-select>
            <button
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToNext($event)"
                pRipple
                class="p-paginator-next"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('nextPageLabel')"
            >
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-next-icon'" />
                <span class="p-paginator-next-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button
                *ngIf="showFirstLastIcon"
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToLast($event)"
                pRipple
                class="p-paginator-last"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('lastPageLabel')"
            >
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-last-icon'" />
                <span class="p-paginator-last-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber
                *ngIf="showJumpToPageInput"
                [ngModel]="currentPage()"
                class="p-paginator-jtp-input"
                [disabled]="empty()"
                (ngModelChange)="changePage($event - 1)"
            ></p-inputNumber>
            <p-select
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-dropdown"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }">
                        </ng-container>
                    </ng-template>
                </ng-container>
                <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                </ng-template>
            </p-select>
            <div class="p-paginator-content-end" *ngIf="templateRight" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PaginatorStyle],
})
export class Paginator extends BaseComponent implements OnInit, AfterContentInit, OnChanges {
    /**
     * Number of page links to display.
     * @group Props
     */
    @Input({ transform: numberAttribute }) pageLinkSize: number = 5;
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
    @Input({ transform: booleanAttribute }) alwaysShow: boolean = true;
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
    @Input({ transform: booleanAttribute }) showCurrentPageReport: boolean | undefined;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showFirstLastIcon: boolean = true;
    /**
     * Number of total records.
     * @group Props
     */
    @Input({ transform: numberAttribute }) totalRecords: number = 0;
    /**
     * Data count to display per page.
     * @group Props
     */
    @Input({ transform: numberAttribute }) rows: number = 0;
    /**
     * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
     * @group Props
     */
    @Input() rowsPerPageOptions: any[] | undefined;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showJumpToPageDropdown: boolean | undefined;
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showJumpToPageInput: boolean | undefined;
    /**
     * Template instance to inject into the jump to page dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    @Input() jumpToPageItemTemplate: TemplateRef<{ $implicit: any }> | undefined;
    /**
     * Whether to show page links.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showPageLinks: boolean = true;
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    @Input() locale: string | undefined;
    /**
     * Template instance to inject into the rows per page dropdown item inside in the paginator.
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

    dropdownIconTemplate: Nullable<TemplateRef<any>>;

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

    _componentStyle = inject(PaginatorStyle);

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.updatePaginatorState();
    }

    getAriaLabel(labelType: keyof Aria): string | undefined {
        return this.config.translation.aria ? this.config.translation.aria[labelType] : undefined;
    }

    getPageAriaLabel(value: number): string | undefined {
        return this.config.translation.aria
            ? this.config.translation.aria.pageLabel.replace(/{page}/g, `${value}`)
            : undefined;
    }

    getLocalization(digit: number): string {
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
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;

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

    ngOnChanges(simpleChange: SimpleChanges): void {
        super.ngOnChanges(simpleChange);

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

        if (simpleChange.pageLinkSize) {
            this.updatePageLinks();
        }
    }

    updateRowsPerPageOptions(): void {
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

    isFirstPage(): boolean {
        return this.getPage() === 0;
    }

    isLastPage(): boolean {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount(): number {
        return Math.ceil(this.totalRecords / this.rows);
    }

    calculatePageLinkBoundaries(): [number, number] {
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

    updatePageLinks(): void {
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

    changePage(p: number): void {
        var pc = this.getPageCount();

        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc,
            };
            this.updatePageLinks();

            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }

    updateFirst(): void {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst(event: Event): void {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }

        event.preventDefault();
    }

    changePageToPrev(event: Event): void {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }

    changePageToNext(event: Event): void {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }

    changePageToLast(event: Event): void {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }

        event.preventDefault();
    }

    onPageLinkClick(event: Event, page: number): void {
        this.changePage(page);
        event.preventDefault();
    }

    onRppChange(event: Event): void {
        this.changePage(this.getPage());
    }

    onPageDropdownChange(event: DropdownChangeEvent): void {
        this.changePage(event.value);
    }

    updatePaginatorState(): void {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords,
        };
    }

    empty(): boolean {
        return this.getPageCount() === 0;
    }

    currentPage(): number {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }

    get currentPageReport(): string {
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
    imports: [
        CommonModule,
        SelectModule,
        InputNumberModule,
        FormsModule,
        SharedModule,
        RippleModule,
        AngleDoubleLeftIcon,
        AngleDoubleRightIcon,
        AngleLeftIcon,
        AngleRightIcon,
    ],
    exports: [Paginator, SelectModule, SharedModule],
    declarations: [Paginator],
})
export class PaginatorModule {}
