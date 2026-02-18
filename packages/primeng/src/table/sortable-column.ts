import { booleanAttribute, computed, Directive, HostListener, inject, input, signal } from '@angular/core';
import { getAttribute } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Directive({
    selector: '[pSortableColumn]',
    standalone: true,
    host: {
        '[class]': "cx('sortableColumn')",
        '[tabindex]': '$tabindex()',
        role: 'columnheader',
        '[attr.aria-sort]': 'ariaSort()'
    },
    providers: [TableStyle]
})
export class SortableColumn extends BaseComponent {
    field = input<string | undefined>(undefined, { alias: 'pSortableColumn' });

    pSortableColumnDisabled = input(undefined, { transform: booleanAttribute });

    role = this.el.nativeElement?.tagName !== 'TH' ? 'columnheader' : null;

    sorted = signal(false);

    sortOrder = signal(0);

    $tabindex = computed(() => (this.isEnabled() ? '0' : null));

    ariaSort = computed(() => {
        const sorted = this.sorted();
        const order = this.sortOrder();
        return sorted ? (order === 1 ? 'ascending' : 'descending') : 'none';
    });

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    constructor() {
        super();
        if (this.isEnabled()) {
            this.dataTable.tableService.sortSource$.pipe(takeUntilDestroyed()).subscribe(() => {
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

        if (this.dataTable.sortMode() === 'single') {
            sorted = this.dataTable.isSorted(<string>this.field()) as boolean;
            sortOrder = this.dataTable.sortOrder;
        } else if (this.dataTable.sortMode() === 'multiple') {
            const sortMeta = this.dataTable.getSortMeta(<string>this.field());
            sorted = !!sortMeta;
            sortOrder = sortMeta ? sortMeta.order : 0;
        }

        this.sorted.set(sorted);
        this.sortOrder.set(sortOrder);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled() && !this.isFilterElement(<HTMLElement>event.target)) {
            this.updateSortState();
            this.dataTable.sort({
                originalEvent: event,
                field: this.field()
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
        return this.pSortableColumnDisabled() !== true;
    }

    isFilterElement(element: HTMLElement) {
        return this.isFilterElementIconOrButton(element) || this.isFilterElementIconOrButton(element?.parentElement?.parentElement!);
    }

    private isFilterElementIconOrButton(element: HTMLElement) {
        return getAttribute(element, '[data-pc-name="pccolumnfilterbutton"]') || getAttribute(element, '[data-pc-section="columnfilterbuttonicon"]');
    }
}
