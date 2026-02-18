import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-service';
import type { Table } from './table';

@Directive({
    selector: '[pContextMenuRow]',
    standalone: true,
    host: {
        '[class]': 'cx("contextMenuRowSelected")',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
    },
    providers: [TableStyle]
})
export class ContextMenuRow extends BaseComponent {
    data = input<any>(undefined, { alias: 'pContextMenuRow' });

    index = input<number | undefined>(undefined, { alias: 'pContextMenuRowIndex' });

    pContextMenuRowDisabled = input(undefined, { transform: booleanAttribute });

    selected: boolean | undefined;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        if (this.isEnabled()) {
            this.dataTable.tableService.contextMenuSource$.pipe(takeUntilDestroyed()).subscribe((data) => {
                this.selected = data ? this.dataTable.equals(this.data(), data) : false;
            });
        }
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.handleRowRightClick({
                originalEvent: event,
                rowData: this.data(),
                rowIndex: this.index()
            });

            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pContextMenuRowDisabled() !== true;
    }
}
