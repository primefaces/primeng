import { booleanAttribute, Directive, HostListener, inject, Input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pSelectableRowDblClick]',
    standalone: true,
    host: {
        '[class]': 'cx("selectableRow")'
    },
    providers: [TableStyle]
})
export class SelectableRowDblClick extends BaseComponent {
    @Input('pSelectableRowDblClick') data: any;

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

    onInit() {
        if (this.isEnabled()) {
            this.selected = this.dataTable.isSelected(this.data);
        }
    }

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
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
