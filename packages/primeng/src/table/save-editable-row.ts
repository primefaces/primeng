import { Directive, HostListener, inject } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { EditableRow } from './editable-row';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pSaveEditableRow]',
    standalone: true,
    host: {
        class: 'p-datatable-row-editor-save'
    }
})
export class SaveEditableRow extends BaseComponent {
    public dataTable = inject<Table>(TABLE_INSTANCE);

    public editableRow = inject(EditableRow);

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dataTable.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
}
