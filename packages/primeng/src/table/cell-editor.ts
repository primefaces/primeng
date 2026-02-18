import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { EditableColumn } from './editable-column';
import { EditableRow } from './editable-row';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Component({
    selector: 'p-cellEditor',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        @if (editing) {
            <ng-container *ngTemplateOutlet="_inputTemplate()"></ng-container>
        }
        @if (!editing) {
            <ng-container *ngTemplateOutlet="_outputTemplate()"></ng-container>
        }
    `,
    encapsulation: ViewEncapsulation.None
})
export class CellEditor extends BaseComponent {
    _inputTemplate = contentChild<TemplateRef<any>>('input');

    _outputTemplate = contentChild<TemplateRef<any>>('output');

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public editableColumn = inject(EditableColumn, { optional: true });

    public editableRow = inject(EditableRow, { optional: true });

    get editing() {
        return !!(
            (this.dataTable.editingCell && this.editableColumn && this.dataTable.editingCell === this.editableColumn.el.nativeElement) ||
            (this.editableRow && this.dataTable.editMode() === 'row' && this.dataTable.isRowEditing(this.editableRow.data()))
        );
    }
}
