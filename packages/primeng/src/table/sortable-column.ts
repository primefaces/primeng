import { booleanAttribute, Directive, HostListener, inject, Input } from '@angular/core';
import { getAttribute } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pSortableColumn]',
    standalone: true,
    host: {
        '[class]': "cx('sortableColumn')",
        '[tabindex]': 'isEnabled() ? "0" : null',
        role: 'columnheader',
        '[attr.aria-sort]': 'sortOrder'
    },
    providers: [TableStyle]
})
export class SortableColumn extends BaseComponent {
    @Input('pSortableColumn') field: string | undefined;

    @Input({ transform: booleanAttribute }) pSortableColumnDisabled: boolean | undefined;

    role = this.el.nativeElement?.tagName !== 'TH' ? 'columnheader' : null;

    sorted: boolean | undefined;

    sortOrder: string | undefined;

    subscription: Subscription | undefined;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    constructor() {
        super();
        if (this.isEnabled()) {
            this.subscription = this.dataTable.tableService.sortSource$.subscribe((sortMeta) => {
                this.updateSortState();
            });
        }
    }

    onInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        let sorted = false;
        let sortOrder = 0;

        if (this.dataTable.sortMode === 'single') {
            sorted = this.dataTable.isSorted(<string>this.field) as boolean;
            sortOrder = this.dataTable.sortOrder;
        } else if (this.dataTable.sortMode === 'multiple') {
            const sortMeta = this.dataTable.getSortMeta(<string>this.field);
            sorted = !!sortMeta;
            sortOrder = sortMeta ? sortMeta.order : 0;
        }

        this.sorted = sorted;
        this.sortOrder = sorted ? (sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled() && !this.isFilterElement(<HTMLElement>event.target)) {
            this.updateSortState();
            this.dataTable.sort({
                originalEvent: event,
                field: this.field
            });

            DomHandler.clearSelection();
        }
    }

    @HostListener('keydown.space', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    onEnterKey(event: MouseEvent) {
        this.onClick(event);

        event.preventDefault();
    }

    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }

    isFilterElement(element: HTMLElement) {
        return this.isFilterElementIconOrButton(element) || this.isFilterElementIconOrButton(element?.parentElement?.parentElement!);
    }

    private isFilterElementIconOrButton(element: HTMLElement) {
        return getAttribute(element, '[data-pc-name="pccolumnfilterbutton"]') || getAttribute(element, '[data-pc-section="columnfilterbuttonicon"]');
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
