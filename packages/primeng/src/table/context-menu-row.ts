import { booleanAttribute, Directive, HostListener, inject, Input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Subscription } from 'rxjs';
import { TableStyle } from './style/tablestyle';
import { TABLE_INSTANCE, TableService } from './table-token';
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
    @Input('pContextMenuRow') data: any;

    @Input('pContextMenuRowIndex') index: number | undefined;

    @Input({ transform: booleanAttribute }) pContextMenuRowDisabled: boolean | undefined;

    selected: boolean | undefined;

    subscription: Subscription | undefined;

    _componentStyle = inject(TableStyle);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        if (this.isEnabled()) {
            this.subscription = this.dataTable.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = data ? this.dataTable.equals(this.data, data) : false;
            });
        }
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });

            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pContextMenuRowDisabled !== true;
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
