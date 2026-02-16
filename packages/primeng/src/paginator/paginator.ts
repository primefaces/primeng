import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, InjectionToken, input, model, NgModule, numberAttribute, output, TemplateRef, untracked, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon } from 'primeng/icons';
import { InputNumber } from 'primeng/inputnumber';
import { Ripple } from 'primeng/ripple';
import { Select, SelectChangeEvent } from 'primeng/select';
import type { AppendTo } from 'primeng/types/shared';
import { PaginatorDropdownItemTemplateContext, PaginatorPassThrough, PaginatorState, PaginatorTemplateContext } from 'primeng/types/paginator';
import { PaginatorStyle } from './style/paginatorstyle';

const PAGINATOR_INSTANCE = new InjectionToken<Paginator>('PAGINATOR_INSTANCE');

/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
@Component({
    selector: 'p-paginator',
    standalone: true,
    imports: [NgTemplateOutlet, Select, InputNumber, FormsModule, Ripple, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, Bind],
    template: `
        @if (templateLeft()) {
            <div [pBind]="ptm('contentStart')" [class]="cx('contentStart')">
                <ng-container *ngTemplateOutlet="templateLeft()!; context: { $implicit: paginatorState() }"></ng-container>
            </div>
        }
        @if (showCurrentPageReport()) {
            <span [pBind]="ptm('current')" [class]="cx('current')">{{ currentPageReport }}</span>
        }
        @if (showFirstLastIcon()) {
            <button [pBind]="ptm('first')" type="button" (click)="changePageToFirst($event)" pRipple [class]="cx('first')" [attr.aria-label]="getAriaLabel('firstPageLabel')">
                @if (!firstPageLinkIconTemplate()) {
                    <svg [pBind]="ptm('firstIcon')" data-p-icon="angle-double-left" [class]="cx('firstIcon')" />
                } @else {
                    <span [class]="cx('firstIcon')">
                        <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate()!"></ng-template>
                    </span>
                }
            </button>
        }
        <button [pBind]="ptm('prev')" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple [class]="cx('prev')" [attr.aria-label]="getAriaLabel('prevPageLabel')">
            @if (!previousPageLinkIconTemplate()) {
                <svg [pBind]="ptm('prevIcon')" data-p-icon="angle-left" [class]="cx('prevIcon')" />
            } @else {
                <span [class]="cx('prevIcon')">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate()!"></ng-template>
                </span>
            }
        </button>
        @if (showPageLinks()) {
            <span [pBind]="ptm('pages')" [class]="cx('pages')">
                @for (pageLink of pageLinks(); track pageLink) {
                    <button
                        [pBind]="ptm('page')"
                        type="button"
                        [class]="cx('page', { pageLink })"
                        [attr.aria-label]="getPageAriaLabel(pageLink)"
                        [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                        (click)="onPageLinkClick($event, pageLink - 1)"
                        pRipple
                    >
                        {{ getLocalization(pageLink) }}
                    </button>
                }
            </span>
        }
        @if (showJumpToPageDropdown()) {
            <p-select
                [options]="pageItems()"
                [ngModel]="getPage()"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                [class]="cx('pcJumpToPageDropdown')"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="$appendTo()"
                [scrollHeight]="dropdownScrollHeight()"
                [pt]="ptm('pcJumpToPageDropdown')"
                [unstyled]="unstyled()"
            >
                <ng-template #selectedItem>{{ currentPageReport }}</ng-template>
                @if (jumpToPageItemTemplate()) {
                    <ng-template #item let-item>
                        <ng-container *ngTemplateOutlet="jumpToPageItemTemplate()!; context: { $implicit: item }"></ng-container>
                    </ng-template>
                }
                @if (dropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="dropdownIconTemplate()!"></ng-container>
                    </ng-template>
                }
            </p-select>
        }
        <button [pBind]="ptm('next')" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple [class]="cx('next')" [attr.aria-label]="getAriaLabel('nextPageLabel')">
            @if (!nextPageLinkIconTemplate()) {
                <svg [pBind]="ptm('nextIcon')" data-p-icon="angle-right" [class]="cx('nextIcon')" />
            } @else {
                <span [class]="cx('nextIcon')">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate()!"></ng-template>
                </span>
            }
        </button>
        @if (showFirstLastIcon()) {
            <button [pBind]="ptm('last')" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple [class]="cx('last')" [attr.aria-label]="getAriaLabel('lastPageLabel')">
                @if (!lastPageLinkIconTemplate()) {
                    <svg [pBind]="ptm('lastIcon')" data-p-icon="angle-double-right" [class]="cx('lastIcon')" />
                } @else {
                    <span [class]="cx('lastIcon')">
                        <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate()!"></ng-template>
                    </span>
                }
            </button>
        }
        @if (showJumpToPageInput()) {
            <p-inputnumber [pt]="ptm('pcJumpToPageInput')" [ngModel]="currentPage()" [class]="cx('pcJumpToPageInput')" [disabled]="empty()" (ngModelChange)="changePage($event - 1)" [unstyled]="unstyled()" />
        }
        @if (rowsPerPageOptions()) {
            <p-select
                [options]="rowsPerPageItems()"
                [ngModel]="rows()"
                (ngModelChange)="rows.set($event)"
                [class]="cx('pcRowPerPageDropdown')"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="$appendTo()"
                [scrollHeight]="dropdownScrollHeight()"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
                [pt]="ptm('pcRowPerPageDropdown')"
                [unstyled]="unstyled()"
            >
                @if (dropdownItemTemplate()) {
                    <ng-template #item let-item>
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate()!; context: { $implicit: item }"></ng-container>
                    </ng-template>
                }
                @if (dropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="dropdownIconTemplate()!"></ng-container>
                    </ng-template>
                }
            </p-select>
        }
        @if (templateRight()) {
            <div [pBind]="ptm('contentEnd')" [class]="cx('contentEnd')">
                <ng-container *ngTemplateOutlet="templateRight()!; context: { $implicit: paginatorState() }"></ng-container>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PaginatorStyle, { provide: PAGINATOR_INSTANCE, useExisting: Paginator }, { provide: PARENT_INSTANCE, useExisting: Paginator }],
    host: {
        '[class]': "cx('paginator')",
        '[style.display]': 'hostDisplay()'
    },
    hostDirectives: [Bind]
})
export class Paginator extends BaseComponent<PaginatorPassThrough> {
    componentName = 'Paginator';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPaginator: Paginator | undefined = inject(PAGINATOR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Number of page links to display.
     * @group Props
     */
    pageLinkSize = input(5, { transform: numberAttribute });
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShow = input(true, { transform: booleanAttribute });
    /**
     * Template instance to inject into the left side of the paginator.
     * @param {PaginatorTemplateContext} context - Paginator template context.
     * @see {@link PaginatorTemplateContext}
     * @group Props
     */
    templateLeft = input<TemplateRef<PaginatorTemplateContext>>();
    /**
     * Template instance to inject into the right side of the paginator.
     * @param {PaginatorTemplateContext} context - Paginator template context.
     * @see {@link PaginatorTemplateContext}
     * @group Props
     */
    templateRight = input<TemplateRef<PaginatorTemplateContext>>();
    /**
     * Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    dropdownScrollHeight = input('200px');
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate = input('{currentPage} of {totalPages}');
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport = input(false, { transform: booleanAttribute });
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = input(true, { transform: booleanAttribute });
    /**
     * Number of total records.
     * @group Props
     */
    totalRecords = input(0, { transform: numberAttribute });
    /**
     * Data count to display per page.
     * @group Props
     */
    rows = model(0);
    /**
     * Zero-relative number of the first row to be displayed.
     * @group Props
     */
    first = model(0);
    /**
     * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
     * @group Props
     */
    rowsPerPageOptions = input<any[]>();
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown = input(false, { transform: booleanAttribute });
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    showJumpToPageInput = input(false, { transform: booleanAttribute });
    /**
     * Template instance to inject into the jump to page dropdown item inside in the paginator.
     * @param {PaginatorDropdownItemTemplateContext} context - dropdown item context.
     * @see {@link PaginatorDropdownItemTemplateContext}
     * @group Props
     */
    jumpToPageItemTemplate = input<TemplateRef<PaginatorDropdownItemTemplateContext>>();
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = input(true, { transform: booleanAttribute });
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    locale = input<string>();
    /**
     * Template instance to inject into the rows per page dropdown item inside in the paginator.
     * @param {PaginatorDropdownItemTemplateContext} context - dropdown item context.
     * @see {@link PaginatorDropdownItemTemplateContext}
     * @group Props
     */
    dropdownItemTemplate = input<TemplateRef<PaginatorDropdownItemTemplateContext>>();
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorState} event - Paginator state.
     * @group Emits
     */
    onPageChange = output<PaginatorState>();

    /**
     * Template for the dropdown icon.
     * @group Templates
     */
    dropdownIconTemplate = contentChild<TemplateRef<void>>('dropdownicon', { descendants: false });

    /**
     * Template for the first page link icon.
     * @group Templates
     */
    firstPageLinkIconTemplate = contentChild<TemplateRef<void>>('firstpagelinkicon', { descendants: false });

    /**
     * Template for the previous page link icon.
     * @group Templates
     */
    previousPageLinkIconTemplate = contentChild<TemplateRef<void>>('previouspagelinkicon', { descendants: false });

    /**
     * Template for the last page link icon.
     * @group Templates
     */
    lastPageLinkIconTemplate = contentChild<TemplateRef<void>>('lastpagelinkicon', { descendants: false });

    /**
     * Template for the next page link icon.
     * @group Templates
     */
    nextPageLinkIconTemplate = contentChild<TemplateRef<void>>('nextpagelinkicon', { descendants: false });

    _componentStyle = inject(PaginatorStyle);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    pageLinks = computed(() => {
        const numberOfPages = this.getPageCount();
        const visiblePages = Math.min(this.pageLinkSize(), numberOfPages);
        const page = this.getPage();
        let start = Math.max(0, Math.ceil(page - visiblePages / 2));
        const end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        const delta = this.pageLinkSize() - (end - start + 1);
        start = Math.max(0, start - delta);

        const links: number[] = [];
        for (let i = start; i <= end; i++) {
            links.push(i + 1);
        }
        return links;
    });

    pageItems = computed(() => {
        if (!this.showJumpToPageDropdown()) return [];
        const items: SelectItem[] = [];
        for (let i = 0; i < this.getPageCount(); i++) {
            items.push({ label: String(i + 1), value: i });
        }
        return items;
    });

    rowsPerPageItems = computed(() => {
        const options = this.rowsPerPageOptions();
        if (!options) return [];
        const items: SelectItem[] = [];
        let showAllItem: SelectItem | null = null;
        for (const opt of options) {
            if (typeof opt === 'object' && opt['showAll']) {
                showAllItem = { label: opt['showAll'], value: this.totalRecords() };
            } else {
                items.push({ label: String(this.getLocalization(opt)), value: opt });
            }
        }
        if (showAllItem) items.push(showAllItem);
        return items;
    });

    paginatorState = computed(() => ({
        page: this.getPage(),
        pageCount: this.getPageCount(),
        rows: this.rows(),
        first: this.first(),
        totalRecords: this.totalRecords()
    }));

    hostDisplay = computed(() => (this.alwaysShow() || this.pageLinks().length > 1 ? null : 'none'));

    constructor() {
        super();
        effect(() => {
            const totalRecords = this.totalRecords();
            untracked(() => {
                const page = this.getPage();
                if (page > 0 && totalRecords && this.first() >= totalRecords) {
                    Promise.resolve(null).then(() => this.changePage(page - 1));
                }
            });
        });
    }

    getAriaLabel(labelType: string): string | undefined {
        return this.config.translation.aria ? (this.config.translation.aria as any)[labelType] : undefined;
    }

    getPageAriaLabel(value: number): string | undefined {
        return this.config.translation.aria ? this.config.translation.aria.pageLabel?.replace(/{page}/g, `${value}`) : undefined;
    }

    getLocalization(digit: number): string {
        const numerals = [...new Intl.NumberFormat(this.locale(), { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [i, d]));
        if (digit > 9) {
            const numbers = String(digit).split('');
            return numbers.map((number) => index.get(Number(number))).join('');
        } else {
            return index.get(digit) as string;
        }
    }

    isFirstPage() {
        return this.getPage() === 0;
    }

    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords() / this.rows());
    }

    getPage() {
        return Math.floor(this.first() / this.rows());
    }

    currentPage() {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }

    get currentPageReport() {
        return this.currentPageReportTemplate()
            .replace('{currentPage}', String(this.currentPage()))
            .replace('{totalPages}', String(this.getPageCount()))
            .replace('{first}', String(this.totalRecords() > 0 ? this.first() + 1 : 0))
            .replace('{last}', String(Math.min(this.first() + this.rows(), this.totalRecords())))
            .replace('{rows}', String(this.rows()))
            .replace('{totalRecords}', String(this.totalRecords()));
    }

    changePage(p: number) {
        const pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first.set(this.rows() * p);
            this.onPageChange.emit({
                page: p,
                first: this.first(),
                rows: this.rows(),
                pageCount: pc
            });
        }
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

    onRppChange(_event: Event) {
        this.changePage(this.getPage());
    }

    onPageDropdownChange(event: SelectChangeEvent) {
        this.changePage(event.value);
    }

    empty() {
        return this.getPageCount() === 0;
    }
}

@NgModule({
    imports: [Paginator],
    exports: [Paginator]
})
export class PaginatorModule {}
