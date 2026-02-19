import { booleanAttribute, Directive, HostListener, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from 'primeng/basecomponent';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttSelectableRowDblClick]',
    standalone: true,
    host: {
        '[class]': 'cx("row")'
    },
    providers: [TreeTableStyle]
})
export class TTSelectableRowDblClick extends BaseComponent {
    rowNode = input<any>(undefined, { alias: 'ttSelectableRowDblClick' });

    ttSelectableRowDisabled = input(undefined, { transform: booleanAttribute });

    selected = signal<boolean | undefined>(undefined);

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    constructor() {
        super();
        this.tt.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.selected.set(this.tt.isSelected(this.rowNode()?.node));
        });
    }

    onInit() {
        if (this.isEnabled()) {
            this.selected.set(this.tt.isSelected(this.rowNode()?.node));
        }
    }

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode()
            });
        }
    }

    isEnabled() {
        return this.ttSelectableRowDisabled() !== true;
    }
}
