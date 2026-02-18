import { Directive, HostListener, inject } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TableStyle } from './style/tablestyle';
import { EditableRow } from './editable-row';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Directive({
    selector: '[pSaveEditableRow]',
    standalone: true,
    providers: [TableStyle],
    host: {
        '[class]': 'cx("pcRowEditorSave")'
    }
})
export class SaveEditableRow extends BaseComponent {
    hostName = 'Table';

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public editableRow = inject(EditableRow);

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.dataTable.saveRowEdit(this.editableRow.data(), this.editableRow.el.nativeElement);
        event.preventDefault();
    }
}
