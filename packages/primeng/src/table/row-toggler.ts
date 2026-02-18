import { booleanAttribute, Directive, HostListener, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Directive({
    selector: '[pRowToggler]',
    standalone: true
})
export class RowToggler extends BaseComponent {
    data = input<any>(undefined, { alias: 'pRowToggler' });

    pRowTogglerDisabled = input(undefined, { transform: booleanAttribute });

    public dataTable = inject<Table>(TABLE_INSTANCE);

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dataTable.toggleRow(this.data(), event);
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.pRowTogglerDisabled() !== true;
    }
}
