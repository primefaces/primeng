import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { Scroller } from 'primeng/scroller';
import { TreeTable } from './treetable';
import { TTBody } from './treetable-body';
import { TTScrollableView } from './treetable-scrollable-view';
import { TTSortableColumn } from './sortable-column';
import { TTSortIcon } from './sort-icon';
import { TTResizableColumn } from './resizable-column';
import { TTReorderableColumn } from './reorderable-column';
import { TTSelectableRow } from './selectable-row';
import { TTSelectableRowDblClick } from './selectable-row-dbl-click';
import { TTContextMenuRow } from './context-menu-row';
import { TTCheckbox } from './treetable-checkbox';
import { TTHeaderCheckbox } from './treetable-header-checkbox';
import { TTEditableColumn } from './editable-column';
import { TreeTableCellEditor } from './cell-editor';
import { TTRow } from './treetable-row';
import { TreeTableToggler } from './treetable-toggler';

@NgModule({
    imports: [
        TreeTable,
        TTBody,
        TTScrollableView,
        TTSortableColumn,
        TTSortIcon,
        TTResizableColumn,
        TTRow,
        TTReorderableColumn,
        TTSelectableRow,
        TTSelectableRowDblClick,
        TTContextMenuRow,
        TTCheckbox,
        TTHeaderCheckbox,
        TTEditableColumn,
        TreeTableCellEditor,
        TreeTableToggler,
        Scroller
    ],
    exports: [
        TreeTable,
        SharedModule,
        TreeTableToggler,
        TTSortableColumn,
        TTSortIcon,
        TTResizableColumn,
        TTRow,
        TTReorderableColumn,
        TTSelectableRow,
        TTSelectableRowDblClick,
        TTContextMenuRow,
        TTCheckbox,
        TTHeaderCheckbox,
        TTEditableColumn,
        TreeTableCellEditor,
        Scroller
    ]
})
export class TreeTableModule {}
