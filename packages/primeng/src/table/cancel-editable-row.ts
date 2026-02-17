import { Directive, HostListener, inject } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { EditableRow } from './editable-row';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pCancelEditableRow]',
    standalone: true,
    host: {
        '[class]': "cx('rowEditorCancel')"
    },
    providers: [TableStyle]
})
export class CancelEditableRow extends BaseComponent {
    public dataTable = inject<Table>(TABLE_INSTANCE);

    public editableRow = inject(EditableRow);

    _componentStyle = inject(TableStyle);

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dataTable.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
}
