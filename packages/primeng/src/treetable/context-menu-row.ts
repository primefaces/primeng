import { booleanAttribute, Directive, HostListener, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from 'primeng/basecomponent';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttContextMenuRow]',
    standalone: true,
    host: {
        '[class]': 'cx("contextMenuRow")',
        '[tabindex]': 'hostTabindex'
    },
    providers: [TreeTableStyle]
})
export class TTContextMenuRow extends BaseComponent {
    rowNode = input<any>(undefined, { alias: 'ttContextMenuRow' });

    ttContextMenuRowDisabled = input(undefined, { transform: booleanAttribute });

    selected = signal<boolean | undefined>(undefined);

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    constructor() {
        super();
        this.tt.tableService.contextMenuSource$.pipe(takeUntilDestroyed()).subscribe((node) => {
            this.selected.set(node ? this.tt.equals(this.rowNode()?.node, node) : false);
        });
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowRightClick({
                originalEvent: event,
                rowNode: this.rowNode()
            });

            this.el.nativeElement.focus();

            event.preventDefault();
        }
    }

    get hostTabindex() {
        return this.isEnabled() ? 0 : undefined;
    }

    isEnabled() {
        return this.ttContextMenuRowDisabled() !== true;
    }
}
