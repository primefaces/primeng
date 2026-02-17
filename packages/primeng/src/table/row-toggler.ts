import { booleanAttribute, Directive, HostListener, inject, Input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Directive({
    selector: '[pRowToggler]',
    standalone: true
})
export class RowToggler extends BaseComponent {
    @Input('pRowToggler') data: any;

    @Input({ transform: booleanAttribute }) pRowTogglerDisabled: boolean | undefined;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.toggleRow(this.data, event);
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
}
