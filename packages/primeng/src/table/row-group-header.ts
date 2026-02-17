import { Directive, inject } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pRowGroupHeader]',
    standalone: true,
    host: {
        '[class]': 'cx("rowGroupHeader")',
        '[style]': 'sx("rowGroupHeader")'
    },
    providers: [TableStyle]
})
export class RowGroupHeader extends BaseComponent {
    public dataTable = inject<Table>(TABLE_INSTANCE);

    _componentStyle = inject(TableStyle);

    get getFrozenRowGroupHeaderStickyPosition() {
        return this.dataTable.rowGroupHeaderStyleObject ? this.dataTable.rowGroupHeaderStyleObject.top : '';
    }
}
