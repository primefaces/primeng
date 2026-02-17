import { booleanAttribute, Directive, HostListener, inject, Input } from '@angular/core';
import { find } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pSelectableRow]',
    standalone: true,
    host: {
        '[class]': "cx('selectableRow')",
        '[tabindex]': 'setRowTabIndex()',
        '[attr.data-p-selectable-row]': 'true'
    },
    providers: [TableStyle]
})
export class SelectableRow extends BaseComponent {
    @Input('pSelectableRow') data: any;

    @Input('pSelectableRowIndex') index: number | undefined;

    @Input({ transform: booleanAttribute }) pSelectableRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        if (this.isEnabled()) {
            this.subscription = this.dataTable.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dataTable.isSelected(this.data);
            });
        }
    }

    setRowTabIndex() {
        if (this.dataTable.selectionMode === 'single' || this.dataTable.selectionMode === 'multiple') {
            return !this.dataTable.selection ? 0 : this.dataTable.anchorRowIndex === this.index ? 0 : -1;
        }
    }

    onInit() {
        if (this.isEnabled()) {
            this.selected = this.dataTable.isSelected(this.data);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.handleRowTouchEnd(event);
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'Space':
                this.onSpaceKey(event);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            default:
                if (event.code === 'KeyA' && (event.metaKey || event.ctrlKey) && this.dataTable.selectionMode === 'multiple') {
                    const data = this.dataTable.dataToRender(this.dataTable.processedData);
                    this.dataTable.selection = [...data];
                    this.dataTable.selectRange(event, data.length - 1, true);

                    event.preventDefault();
                }
                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        const row = <HTMLTableRowElement>event.currentTarget;
        const nextRow = this.findNextSelectableRow(row);

        if (nextRow) {
            nextRow.focus();
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        const row = <HTMLTableRowElement>event.currentTarget;
        const prevRow = this.findPrevSelectableRow(row);

        if (prevRow) {
            prevRow.focus();
        }

        event.preventDefault();
    }

    onEnterKey(event: KeyboardEvent) {
        if (!this.isEnabled()) {
            return;
        }

        this.dataTable.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    }

    onEndKey(event: KeyboardEvent) {
        const lastRow = this.findLastSelectableRow();
        lastRow && this.focusRowChange(this.el.nativeElement, lastRow);

        if (event.ctrlKey && event.shiftKey) {
            const data = this.dataTable.dataToRender(this.dataTable.rows);
            const lastSelectableRowIndex = DomHandler.getAttribute(lastRow, 'index');

            this.dataTable.anchorRowIndex = lastSelectableRowIndex;
            this.dataTable.selection = data.slice(this.index || 0, data.length);
            this.dataTable.selectRange(event, this.index || 0);
        }
        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        const firstRow = this.findFirstSelectableRow();

        firstRow && this.focusRowChange(this.el.nativeElement, firstRow);

        if (event.ctrlKey && event.shiftKey) {
            const data = this.dataTable.dataToRender(this.dataTable.rows);
            const firstSelectableRowIndex = DomHandler.getAttribute(firstRow, 'index');

            this.dataTable.anchorRowIndex = this.dataTable.anchorRowIndex || firstSelectableRowIndex || 0;
            this.dataTable.selection = data.slice(0, (this.index || 0) + 1);
            this.dataTable.selectRange(event, this.index || 0);
        }
        event.preventDefault();
    }

    onSpaceKey(event) {
        const isInput = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement;
        if (isInput) {
            return;
        } else {
            this.onEnterKey(event);

            if (event.shiftKey && this.dataTable.selection !== null) {
                const data = this.dataTable.dataToRender(this.dataTable.rows);
                let index;

                if (ObjectUtils.isNotEmpty(this.dataTable.selection) && this.dataTable.selection.length > 0) {
                    let firstSelectedRowIndex, lastSelectedRowIndex;
                    firstSelectedRowIndex = ObjectUtils.findIndexInList(this.dataTable.selection[0], data);
                    lastSelectedRowIndex = ObjectUtils.findIndexInList(this.dataTable.selection[this.dataTable.selection.length - 1], data);

                    index = (this.index || 0) <= firstSelectedRowIndex ? lastSelectedRowIndex : firstSelectedRowIndex;
                } else {
                    index = ObjectUtils.findIndexInList(this.dataTable.selection, data);
                }

                this.dataTable.anchorRowIndex = index || 0;
                this.dataTable.selection = index !== this.index ? data.slice(Math.min(index || 0, this.index || 0), Math.max(index || 0, this.index || 0) + 1) : [this.data];
                this.dataTable.selectRange(event, this.index || 0);
            }

            event.preventDefault();
        }
    }

    focusRowChange(firstFocusableRow, currentFocusedRow) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.tabIndex = '0';
        DomHandler.focus(currentFocusedRow);
    }

    findLastSelectableRow() {
        const rows = DomHandler.find(this.dataTable.el.nativeElement, '[data-p-selectable-row="true"]');

        return rows ? rows[rows.length - 1] : null;
    }

    findFirstSelectableRow() {
        const firstRow = DomHandler.findSingle(this.dataTable.el.nativeElement, '[data-p-selectable-row="true"]');

        return firstRow;
    }

    findNextSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement | null {
        let nextRow = <HTMLTableRowElement>row.nextElementSibling;

        if (nextRow) {
            if (find(nextRow, '[data-p-selectable-row="true"]')) return nextRow;
            else return this.findNextSelectableRow(nextRow);
        } else {
            return null;
        }
    }

    findPrevSelectableRow(row: HTMLTableRowElement): HTMLTableRowElement | null {
        let prevRow = <HTMLTableRowElement>row.previousElementSibling;
        if (prevRow) {
            if (find(prevRow, '[data-p-selectable-row="true"]')) return prevRow;
            else return this.findPrevSelectableRow(prevRow);
        } else {
            return null;
        }
    }

    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
