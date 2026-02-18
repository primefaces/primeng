import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-service';
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
    data = input<any>(undefined, { alias: 'pSelectableRowDblClick' });

    index = input<number | undefined>(undefined, { alias: 'pSelectableRowIndex' });

    pSelectableRowDisabled = input(undefined, { transform: booleanAttribute });

    selected: boolean | undefined;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        if (this.isEnabled()) {
            this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
                this.selected = this.dataTable.isSelected(this.data());
            });
        }
    }

    onInit() {
        if (this.isEnabled()) {
            this.selected = this.dataTable.isSelected(this.data());
        }
    }

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.handleRowClick({
                originalEvent: event,
                rowData: this.data(),
                rowIndex: this.index()
            });
        }
    }

    isEnabled() {
        return this.pSelectableRowDisabled() !== true;
    }
}
