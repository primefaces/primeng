import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { Nullable } from 'primeng/ts-helpers';
import { ObjectUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-token';
import type { Table } from './table';

@Component({
    selector: '[pTableBody]',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-container *ngIf="!dataTable.expandedRowTemplate && !dataTable._expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dataTable.rowTrackBy">
                <ng-container
                    *ngIf="(dataTable.groupHeaderTemplate || dataTable._groupHeaderTemplate) && !dataTable.virtualScroll && dataTable.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))"
                    role="row"
                >
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.groupHeaderTemplate || dataTable._groupHeaderTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dataTable.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dataTable.loadingBodyTemplate || dataTable._loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dataTable.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dataTable.loadingBodyTemplate || dataTable._loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container
                    *ngIf="(dataTable.groupFooterTemplate || dataTable._groupFooterTemplate) && !dataTable.virtualScroll && dataTable.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))"
                    role="row"
                >
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.groupFooterTemplate || dataTable._groupFooterTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="(dataTable.expandedRowTemplate || dataTable._expandedRowTemplate) && !(frozen && (dataTable.frozenExpandedRowTemplate || dataTable._frozenExpandedRowTemplate))">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dataTable.rowTrackBy">
                <ng-container *ngIf="!(dataTable.groupHeaderTemplate && dataTable._groupHeaderTemplate)">
                    <ng-container
                        *ngTemplateOutlet="
                            template;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                expanded: dataTable.isRowExpanded(rowData),
                                editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="(dataTable.groupHeaderTemplate || dataTable._groupHeaderTemplate) && dataTable.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.groupHeaderTemplate || dataTable._groupHeaderTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                expanded: dataTable.isRowExpanded(rowData),
                                editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dataTable.isRowExpanded(rowData)">
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.expandedRowTemplate || dataTable._expandedRowTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                    <ng-container *ngIf="(dataTable.groupFooterTemplate || dataTable._groupFooterTemplate) && dataTable.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dataTable.groupFooterTemplate || dataTable._groupFooterTemplate;
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns,
                                    expanded: dataTable.isRowExpanded(rowData),
                                    editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen
                                }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="(dataTable.frozenExpandedRowTemplate || dataTable._frozenExpandedRowTemplate) && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dataTable.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="
                        template;
                        context: {
                            $implicit: rowData,
                            rowIndex: getRowIndex(rowIndex),
                            columns: columns,
                            expanded: dataTable.isRowExpanded(rowData),
                            editing: dataTable.editMode === 'row' && dataTable.isRowEditing(rowData),
                            frozen: frozen
                        }
                    "
                ></ng-container>
                <ng-container *ngIf="dataTable.isRowExpanded(rowData)">
                    <ng-container
                        *ngTemplateOutlet="
                            dataTable.frozenExpandedRowTemplate || dataTable._frozenExpandedRowTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                frozen: frozen
                            }
                        "
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dataTable.loading">
            <ng-container *ngTemplateOutlet="dataTable.loadingBodyTemplate || dataTable._loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dataTable.isEmpty() && !dataTable.loading">
            <ng-container *ngTemplateOutlet="dataTable.emptyMessageTemplate || dataTable._emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-p]': 'dataP'
    }
})
export class TableBody extends BaseComponent {
    hostName = 'Table';

    @Input('pTableBody') columns: any[] | undefined;

    @Input('pTableBodyTemplate') template: Nullable<TemplateRef<any>>;

    @Input() get value(): any[] | undefined {
        return this._value;
    }
    set value(val: any[] | undefined) {
        this._value = val;
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }

        if (this.dataTable.scrollable && this.dataTable.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }

    @Input({ transform: booleanAttribute }) frozen: boolean | undefined;

    @Input({ transform: booleanAttribute }) frozenRows: boolean | undefined;

    @Input() scrollerOptions: any;

    subscription: Subscription;

    _value: any[] | undefined;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        this.subscription = this.dataTable.tableService.valueSource$.subscribe(() => {
            if (this.dataTable.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }

    onAfterViewInit() {
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }

        if (this.dataTable.scrollable && this.dataTable.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }

    shouldRenderRowGroupHeader(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy || '');
        let prevRowData = value[i - (this.dataTable?._first || 0) - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dataTable?.groupRowsBy || '');
            return currentRowFieldData !== previousRowFieldData;
        } else {
            return true;
        }
    }

    shouldRenderRowGroupFooter(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy || '');
        let nextRowData = value[i - (this.dataTable?._first || 0) + 1];
        if (nextRowData) {
            let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dataTable?.groupRowsBy || '');
            return currentRowFieldData !== nextRowFieldData;
        } else {
            return true;
        }
    }

    shouldRenderRowspan(value: any, rowData: any, i: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy!);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dataTable?.groupRowsBy || '');
            return currentRowFieldData !== previousRowFieldData;
        } else {
            return true;
        }
    }

    calculateRowGroupSize(value: any, rowData: any, index: number) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dataTable?.groupRowsBy!);
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;

        while (currentRowFieldData === nextRowFieldData) {
            groupRowSpan++;
            let nextRowData = value[++index];
            if (nextRowData) {
                nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dataTable?.groupRowsBy || '');
            } else {
                break;
            }
        }

        return groupRowSpan === 1 ? null : groupRowSpan;
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
        if (this.dataTable.virtualScroll) {
            options = options || this.scrollerOptions;
            return options ? options[option] : null;
        }

        return null;
    }

    getRowIndex(rowIndex: number) {
        const index = this.dataTable.paginator ? <number>this.dataTable.first + rowIndex : rowIndex;
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(index).index : index;
    }

    get dataP() {
        return this.cn({
            hoverable: this.dataTable.rowHover || this.dataTable.selectionMode,
            frozen: this.frozen
        });
    }
}
