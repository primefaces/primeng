import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { clearSelection } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Checkbox } from 'primeng/checkbox';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Component({
    selector: 'p-treetableheadercheckbox, p-treetable-header-checkbox',
    standalone: true,
    imports: [NgTemplateOutlet, FormsModule, Checkbox, SharedModule],
    template: `
        <p-checkbox [ngModel]="checked()" [pt]="ptm('pcHeaderCheckbox')" (onChange)="onClick($event)" [binary]="true" [disabled]="!tt.value || tt.value.length === 0" [unstyled]="unstyled()">
            @if (tt.headerCheckboxIconTemplate()) {
                <ng-template #icon>
                    <ng-template *ngTemplateOutlet="tt.headerCheckboxIconTemplate(); context: { $implicit: checked() }"></ng-template>
                </ng-template>
            }
        </p-checkbox>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TTHeaderCheckbox extends BaseComponent {
    checked = signal<boolean | undefined>(undefined);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    constructor() {
        super();
        this.tt.tableService.uiUpdateSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.checked.set(this.updateCheckedState());
        });

        this.tt.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.checked.set(this.updateCheckedState());
        });
    }

    onInit() {
        this.checked.set(this.updateCheckedState());
    }

    onClick(event: Event) {
        if ((this.tt?.value || this.tt?.filteredNodes) && ((this.tt?.value && this.tt.value.length > 0) || (this.tt?.filteredNodes && this.tt.filteredNodes.length > 0))) {
            this.tt?.toggleNodesWithCheckbox(event, !this.checked());
        }

        clearSelection();
    }

    updateCheckedState() {
        let checked!: boolean;
        const data = this.tt.filteredNodes || this.tt.value;

        if (data) {
            if (this.tt._selectionKeys) {
                for (let node of data) {
                    if (this.tt.isNodeSelected(node)) {
                        checked = true;
                    } else {
                        checked = false;
                        break;
                    }
                }
            }
            if (!this.tt._selectionKeys) {
                // legacy selection support, will be removed in v18
                for (let node of data) {
                    if (this.tt.isSelected(node)) {
                        checked = true;
                    } else {
                        checked = false;
                        break;
                    }
                }
            }
        } else {
            checked = false;
        }

        return checked;
    }
}
