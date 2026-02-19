import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { clearSelection } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Checkbox } from 'primeng/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Component({
    selector: 'p-treetable-checkbox, p-tree-table-checkbox',
    standalone: true,
    imports: [NgTemplateOutlet, FormsModule, Checkbox, SharedModule],
    template: `
        <p-checkbox [ngModel]="checked()" [pt]="ptm('pcRowCheckbox')" (onChange)="onClick($event)" [binary]="true" [disabled]="disabled()" [indeterminate]="partialChecked()" [class]="cx('pcNodeCheckbox')" [tabIndex]="-1" [unstyled]="unstyled()">
            @if (tt.checkboxIconTemplate()) {
                <ng-template #icon>
                    <ng-template *ngTemplateOutlet="tt.checkboxIconTemplate(); context: { $implicit: checked(), partialSelected: partialChecked() }"></ng-template>
                </ng-template>
            }
        </p-checkbox>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TreeTableStyle]
})
export class TTCheckbox extends BaseComponent {
    hostName = 'TreeTable';

    disabled = input(undefined, { transform: booleanAttribute });

    rowNode = input<any>(undefined, { alias: 'value' });

    checked = signal<boolean | undefined>(undefined);

    partialChecked = signal<boolean | undefined>(undefined);

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    constructor() {
        super();
        this.tt.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            if (this.tt._selectionKeys) {
                this.checked.set(this.tt.isNodeSelected(this.rowNode()?.node));
                this.partialChecked.set(this.tt.isNodePartialSelected(this.rowNode()?.node));
            } else {
                this.checked.set(this.tt.isSelected(this.rowNode()?.node));
                this.partialChecked.set(this.rowNode()?.node?.partialSelected);
            }
        });
    }

    onInit() {
        if (this.tt._selectionKeys) {
            this.checked.set(this.tt.isNodeSelected(this.rowNode()?.node));
            this.partialChecked.set(this.tt.isNodePartialSelected(this.rowNode()?.node));
        } else {
            this.checked.set(this.tt.isSelected(this.rowNode()?.node));
            this.partialChecked.set(this.rowNode()?.node?.partialSelected);
        }
    }

    onClick(event: Event) {
        if (!this.disabled()) {
            if (this.tt._selectionKeys) {
                const _check = !this.checked();
                this.tt.toggleCheckbox({
                    originalEvent: event,
                    check: _check,
                    rowNode: this.rowNode()
                });
            } else {
                this.tt.toggleNodeWithCheckbox({
                    originalEvent: event,
                    rowNode: this.rowNode()
                });
            }
        }
        clearSelection();
    }
}
