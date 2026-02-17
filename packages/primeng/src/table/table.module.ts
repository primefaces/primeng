import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ScrollerModule } from 'primeng/scroller';
import { CancelEditableRow } from './cancel-editable-row';
import { CellEditor } from './cell-editor';
import { ColumnFilter, ColumnFilterFormElement } from './column-filter';
import { ContextMenuRow } from './context-menu-row';
import { EditableColumn } from './editable-column';
import { EditableRow } from './editable-row';
import { FrozenColumn } from './frozen-column';
import { InitEditableRow } from './init-editable-row';
import { ReorderableColumn } from './reorderable-column';
import { ReorderableRow } from './reorderable-row';
import { ReorderableRowHandle } from './reorderable-row-handle';
import { ResizableColumn } from './resizable-column';
import { RowGroupHeader } from './row-group-header';
import { RowToggler } from './row-toggler';
import { SaveEditableRow } from './save-editable-row';
import { SelectableRow } from './selectable-row';
import { SelectableRowDblClick } from './selectable-row-dbl-click';
import { SortIcon } from './sort-icon';
import { SortableColumn } from './sortable-column';
import { Table } from './table';
import { TableBody } from './table-body';
import { TableCheckbox } from './table-checkbox';
import { TableHeaderCheckbox } from './table-header-checkbox';
import { TableRadioButton } from './table-radio-button';

@NgModule({
    imports: [
        Table,
        TableBody,
        SortableColumn,
        FrozenColumn,
        RowGroupHeader,
        SelectableRow,
        RowToggler,
        ContextMenuRow,
        ResizableColumn,
        ReorderableColumn,
        EditableColumn,
        CellEditor,
        SortIcon,
        TableRadioButton,
        TableCheckbox,
        TableHeaderCheckbox,
        ReorderableRowHandle,
        ReorderableRow,
        SelectableRowDblClick,
        EditableRow,
        InitEditableRow,
        SaveEditableRow,
        CancelEditableRow,
        ColumnFilter,
        ColumnFilterFormElement
    ],
    exports: [
        Table,
        SharedModule,
        SortableColumn,
        FrozenColumn,
        RowGroupHeader,
        SelectableRow,
        RowToggler,
        ContextMenuRow,
        ResizableColumn,
        ReorderableColumn,
        EditableColumn,
        CellEditor,
        SortIcon,
        TableRadioButton,
        TableCheckbox,
        TableHeaderCheckbox,
        ReorderableRowHandle,
        ReorderableRow,
        SelectableRowDblClick,
        EditableRow,
        InitEditableRow,
        SaveEditableRow,
        CancelEditableRow,
        ColumnFilter,
        ColumnFilterFormElement,
        ScrollerModule
    ],
    providers: []
})
export class TableModule {}
