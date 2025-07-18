import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    input,
    Input,
    NgModule,
    numberAttribute,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aria, PrimeTemplate, SelectItem, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Select, SelectChangeEvent } from 'primeng/select';
import { AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon } from 'primeng/icons';
import { InputNumber } from 'primeng/inputnumber';
import { Ripple } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { PaginatorState } from './paginator.interface';
import { PaginatorStyle } from './style/paginatorstyle';

/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
@Component({
    selector: 'p-paginator',
    standalone: true,
    imports: [CommonModule, Select, InputNumber, FormsModule, Ripple, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, SharedModule],
    template: `
        <div [class]="cx('contentStart')" *ngIf="templateLeft" [attr.data-pc-section]="'start'">
            <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
        </div>
        <span [class]="cx('current')" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
        <button *ngIf="showFirstLastIcon" type="button" (click)="changePageToFirst($event)" pRipple [class]="cx('first')" [attr.aria-label]="getAriaLabel('firstPageLabel')">
            <svg data-p-icon="angle-double-left" *ngIf="!firstPageLinkIconTemplate && !_firstPageLinkIconTemplate" [class]="cx('firstIcon')" />
            <span [class]="cx('firstIcon')" *ngIf="firstPageLinkIconTemplate || _firstPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate || _firstPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple [class]="cx('prev')" [attr.aria-label]="getAriaLabel('prevPageLabel')">
            <svg data-p-icon="angle-left" *ngIf="!previousPageLinkIconTemplate && !_previousPageLinkIconTemplate" [class]="cx('prevIcon')" />
            <span [class]="cx('prevIcon')" *ngIf="previousPageLinkIconTemplate || _previousPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate || _previousPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <span [class]="cx('pages')" *ngIf="showPageLinks">
            <button
                type="button"
                *ngFor="let pageLink of pageLinks"
                [class]="cx('page', { pageLink })"
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
            [styleClass]="cx('pcJumpToPageDropdown')"
            (onChange)="onPageDropdownChange($event)"
            [appendTo]="dropdownAppendTo || $appendTo()"
            [scrollHeight]="dropdownScrollHeight"
        >
            <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
            <ng-container *ngIf="jumpToPageItemTemplate">
                <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }"></ng-container>
                </ng-template>
            </ng-container>
            <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate || _dropdownIconTemplate">
                <ng-container *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate"></ng-container>
            </ng-template>
        </p-select>
        <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple [class]="cx('next')" [attr.aria-label]="getAriaLabel('nextPageLabel')">
            <svg data-p-icon="angle-right" *ngIf="!nextPageLinkIconTemplate && !_nextPageLinkIconTemplate" [class]="cx('nextIcon')" />
            <span [class]="cx('nextIcon')" *ngIf="nextPageLinkIconTemplate || _nextPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate || _nextPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple [class]="cx('last')" [attr.aria-label]="getAriaLabel('lastPageLabel')">
            <svg data-p-icon="angle-double-right" *ngIf="!lastPageLinkIconTemplate && !_lastPageLinkIconTemplate" [class]="cx('lastIcon')" />
            <span [class]="cx('lastIcon')" *ngIf="lastPageLinkIconTemplate || _lastPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate || _lastPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <p-inputnumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" [class]="cx('pcJumpToPageInput')" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputnumber>
        <p-select
            [options]="rowsPerPageItems"
            [(ngModel)]="rows"
            *ngIf="rowsPerPageOptions"
            [styleClass]="cx('pcRowPerPageDropdown')"
            [disabled]="empty()"
            (onChange)="onRppChange($event)"
            [appendTo]="dropdownAppendTo || $appendTo()"
            [scrollHeight]="dropdownScrollHeight"
            [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
        >
            <ng-container *ngIf="dropdownItemTemplate">
                <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"></ng-container>
                </ng-template>
            </ng-container>
            <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate || _dropdownIconTemplate">
                <ng-container *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate"></ng-container>
            </ng-template>
        </p-select>
        <div [class]="cx('contentEnd')" *ngIf="templateRight" [attr.data-pc-section]="'end'">
            <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PaginatorStyle],
    host: {
        '[attr.data-pc-name]': "'paginator'",
        '[attr.data-pc-section]': "'root'",
        '[class]': "cn(cx('paginator'), styleClass)"
    }
})
export class Paginator extends BaseComponent implements OnInit, AfterContentInit, OnChanges {
    /**
     * Number of page links to display.
     * @group Props
     */
    @Input({ transform: numberAttribute }) pageLinkSize: number = 5;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
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
     * @deprecated since v20.0.0. Use `appendTo` instead.
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
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>(undefined);
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorState} event - Paginator state.
     * @group Emits
     */
    @Output() onPageChange: EventEmitter<PaginatorState> = new EventEmitter<PaginatorState>();

    /**
     * Template for the dropdown icon.
     * @group Templates
     */
    @ContentChild('dropdownicon', { descendants: false }) dropdownIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Template for the first page link icon.
     * @group Templates
     */
    @ContentChild('firstpagelinkicon', { descendants: false }) firstPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Template for the previous page link icon.
     * @group Templates
     */
    @ContentChild('previouspagelinkicon', { descendants: false }) previousPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Template for the last page link icon.
     * @group Templates
     */
    @ContentChild('lastpagelinkicon', { descendants: false }) lastPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    /**
     * Template for the next page link icon.
     * @group Templates
     */
    @ContentChild('nextpagelinkicon', { descendants: false }) nextPageLinkIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<any>>;

    _dropdownIconTemplate: TemplateRef<any> | undefined;

    _firstPageLinkIconTemplate: TemplateRef<any> | undefined;

    _previousPageLinkIconTemplate: TemplateRef<any> | undefined;

    _lastPageLinkIconTemplate: TemplateRef<any> | undefined;

    _nextPageLinkIconTemplate: TemplateRef<any> | undefined;

    pageLinks: number[] | undefined;

    pageItems: SelectItem[] | undefined;

    rowsPerPageItems: SelectItem[] | undefined;

    paginatorState: any;

    _first: number = 0;

    _page: number = 0;

    _componentStyle = inject(PaginatorStyle);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    @HostBinding('style.display') get display(): string {
        return this.alwaysShow || (this.pageLinks && this.pageLinks.length > 1) ? null : 'none';
    }

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.updatePaginatorState();
    }

    ngAfterContentInit(): void {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'dropdownicon':
                    this._dropdownIconTemplate = item.template;
                    break;

                case 'firstpagelinkicon':
                    this._firstPageLinkIconTemplate = item.template;
                    break;

                case 'previouspagelinkicon':
                    this._previousPageLinkIconTemplate = item.template;
                    break;

                case 'lastpagelinkicon':
                    this._lastPageLinkIconTemplate = item.template;
                    break;

                case 'nextpagelinkicon':
                    this._nextPageLinkIconTemplate = item.template;
                    break;
            }
        });
    }

    getAriaLabel(labelType: keyof Aria): string | undefined {
        return this.config.translation.aria ? this.config.translation.aria[labelType] : undefined;
    }

    getPageAriaLabel(value: number): string | undefined {
        return this.config.translation.aria ? this.config.translation.aria.pageLabel.replace(/{page}/g, `${value}`) : undefined;
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
            let showAllItem: SelectItem | null = null;

            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    showAllItem = { label: opt['showAll'], value: this.totalRecords };
                } else {
                    this.rowsPerPageItems.push({ label: String(this.getLocalization(opt)), value: opt });
                }
            }

            if (showAllItem) {
                this.rowsPerPageItems.push(showAllItem);
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
                pageCount: pc
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

    onPageDropdownChange(event: SelectChangeEvent): void {
        this.changePage(event.value);
    }

    updatePaginatorState(): void {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
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
    imports: [Paginator, SharedModule],
    exports: [Paginator, SharedModule]
})
export class PaginatorModule {}
