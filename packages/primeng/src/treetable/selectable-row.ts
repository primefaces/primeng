import { booleanAttribute, Directive, HostListener, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from 'primeng/basecomponent';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttSelectableRow]',
    standalone: true,
    host: {
        '[class]': 'cx("row")',
        '[attr.aria-selected]': 'selected()'
    },
    providers: [TreeTableStyle]
})
export class TTSelectableRow extends BaseComponent {
    rowNode = input<any>(undefined, { alias: 'ttSelectableRow' });

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

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode()
            });
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;

            default:
                break;
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: Event) {
        if (this.isEnabled()) {
            this.tt.handleRowTouchEnd(event);
        }
    }

    onEnterKey(event) {
        if (this.tt.selectionMode() === 'checkbox') {
            this.tt.toggleNodeWithCheckbox({
                originalEvent: event,
                rowNode: this.rowNode()
            });
        } else {
            this.onClick(event);
        }
        event.preventDefault();
    }

    isEnabled() {
        return this.ttSelectableRowDisabled() !== true;
    }
}
