import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, inject, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { Nullable } from 'primeng/ts-helpers';
import { ObjectUtils } from 'primeng/utils';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Component({
    selector: '[pTableBody]',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        @if (!dataTable.expandedRowTemplate()) {
            @for (rowData of value(); track dataTable.rowTrackBy()($index, rowData); let rowIndex = $index) {
                @if (dataTable.groupHeaderTemplate() && !dataTable.virtualScroll() && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupHeader(value(), rowData, getRowIndex(rowIndex))) {
                    <ng-container role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dataTable.groupHeaderTemplate();
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns(),
                                    editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen()
                                }
                            "
                        ></ng-container>
                    </ng-container>
                }
                @if (dataTable.rowGroupMode() !== 'rowspan') {
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template() : dataTable.loadingBodyTemplate();
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                }
                @if (dataTable.rowGroupMode() === 'rowspan') {
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template() : dataTable.loadingBodyTemplate();
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen(),
                                rowgroup: shouldRenderRowspan(value(), rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value(), rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                }
                @if (dataTable.groupFooterTemplate() && !dataTable.virtualScroll() && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupFooter(value(), rowData, getRowIndex(rowIndex))) {
                    <ng-container role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dataTable.groupFooterTemplate();
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns(),
                                    editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen()
                                }
                            "
                        ></ng-container>
                    </ng-container>
                }
            }
        }
        @if (dataTable.expandedRowTemplate() && !(frozen() && dataTable.frozenExpandedRowTemplate())) {
            @for (rowData of value(); track dataTable.rowTrackBy()($index, rowData); let rowIndex = $index) {
                @if (!dataTable.groupHeaderTemplate()) {
                    <ng-container
                        *ngTemplateOutlet="
                            template();
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                expanded: dataTable.isRowExpanded(rowData),
                                editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                }
                @if (dataTable.groupHeaderTemplate() && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupHeader(value(), rowData, getRowIndex(rowIndex))) {
                    <ng-container role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dataTable.groupHeaderTemplate();
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns(),
                                    expanded: dataTable.isRowExpanded(rowData),
                                    editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen()
                                }
                            "
                        ></ng-container>
                    </ng-container>
                }
                @if (dataTable.isRowExpanded(rowData)) {
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.expandedRowTemplate();
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                    @if (dataTable.groupFooterTemplate() && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupFooter(value(), rowData, getRowIndex(rowIndex))) {
                        <ng-container role="row">
                            <ng-container
                                *ngTemplateOutlet="
                                    dataTable.groupFooterTemplate();
                                    context: {
                                        $implicit: rowData,
                                        rowIndex: getRowIndex(rowIndex),
                                        columns: columns(),
                                        expanded: dataTable.isRowExpanded(rowData),
                                        editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                        frozen: frozen()
                                    }
                                "
                            ></ng-container>
                        </ng-container>
                    }
                }
            }
        }
        @if (dataTable.frozenExpandedRowTemplate() && frozen()) {
            @for (rowData of value(); track dataTable.rowTrackBy()($index, rowData); let rowIndex = $index) {
                <ng-container
                    *ngTemplateOutlet="
                        template();
                        context: {
                            $implicit: rowData,
                            rowIndex: getRowIndex(rowIndex),
                            columns: columns(),
                            expanded: dataTable.isRowExpanded(rowData),
                            editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                            frozen: frozen()
                        }
                    "
                ></ng-container>
                @if (dataTable.isRowExpanded(rowData)) {
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.frozenExpandedRowTemplate();
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                }
            }
        }
        @if (dataTable.loading()) {
            <ng-container *ngTemplateOutlet="dataTable.loadingBodyTemplate(); context: bodyContext()"></ng-container>
        }
        @if (dataTable.isEmpty() && !dataTable.loading()) {
            <ng-container *ngTemplateOutlet="dataTable.emptyMessageTemplate(); context: bodyContext()"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-p]': 'dataP()'
    }
})
export class TableBody extends BaseComponent {
    hostName = 'Table';

    columns = input<any[] | undefined>(undefined, { alias: 'pTableBody' });

    template = input<Nullable<TemplateRef<any>>>(undefined, { alias: 'pTableBodyTemplate' });

    value = input<any[] | undefined>();

    frozen = input(undefined, { transform: booleanAttribute });

    frozenRows = input(undefined, { transform: booleanAttribute });

    scrollerOptions = input<any>();

    public dataTable = inject<Table>(TABLE_INSTANCE);

    bodyContext = computed(() => ({
        $implicit: this.columns(),
        frozen: this.frozen()
    }));

    constructor() {
        super();
        effect(() => {
            const val = this.value();
            if (val !== undefined) {
                if (this.frozenRows()) {
                    this.updateFrozenRowStickyPosition();
                }

                if (this.dataTable.scrollable() && this.dataTable.rowGroupMode() === 'subheader') {
                    this.updateFrozenRowGroupHeaderStickyPosition();
                }
            }
        });
    }

    onAfterViewInit() {
        if (this.frozenRows()) {
            this.updateFrozenRowStickyPosition();
        }

        if (this.dataTable.scrollable() && this.dataTable.rowGroupMode() === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }

    shouldRenderRowGroupHeader(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy() || '');
        let prevRowData = value[i - (this.dataTable?.first() || 0) - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dataTable?.groupRowsBy() || '');
            return currentRowFieldData !== previousRowFieldData;
        } else {
            return true;
        }
    }

    shouldRenderRowGroupFooter(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy() || '');
        let nextRowData = value[i - (this.dataTable?.first() || 0) + 1];
        if (nextRowData) {
            let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dataTable?.groupRowsBy() || '');
            return currentRowFieldData !== nextRowFieldData;
        } else {
            return true;
        }
    }

    shouldRenderRowspan(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy());
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dataTable?.groupRowsBy() || '');
            return currentRowFieldData !== previousRowFieldData;
        } else {
            return true;
        }
    }

    calculateRowGroupSize(value: any, rowData: any, index: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy());
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;

        while (currentRowFieldData === nextRowFieldData) {
            groupRowSpan++;
            let nextRowData = value[++index];
            if (nextRowData) {
                nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dataTable?.groupRowsBy() || '');
            } else {
                break;
            }
        }

        return groupRowSpan === 1 ? null : groupRowSpan;
    }

    updateFrozenRowStickyPosition() {
        this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + 'px';
    }

    updateFrozenRowGroupHeaderStickyPosition() {
        if (this.el.nativeElement.previousElementSibling) {
            let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
            this.dataTable.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
        }
    }

    getScrollerOption(option: any, options?: any) {
        if (this.dataTable.virtualScroll()) {
            options = options || this.scrollerOptions();
            return options ? options[option] : null;
        }

        return null;
    }

    getRowIndex(rowIndex: number) {
        const index = this.dataTable.paginator() ? <number>this.dataTable.first() + rowIndex : rowIndex;
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(index).index : index;
    }

    dataP = computed(() => {
        return this.cn({
            hoverable: this.dataTable.rowHover() || this.dataTable.selectionMode(),
            frozen: this.frozen()
        });
    });
}
