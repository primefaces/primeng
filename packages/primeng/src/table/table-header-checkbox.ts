import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { TABLE_INSTANCE, TableService } from './table-token';
import type { Table } from './table';

@Component({
    selector: 'p-tableHeaderCheckbox',
    standalone: true,
    imports: [CommonModule, CheckboxModule, FormsModule],
    template: `
        <p-checkbox [pt]="ptm('pcCheckbox')" [(ngModel)]="checked" (onChange)="onClick($event)" [binary]="true" [disabled]="isDisabled()" [inputId]="inputId()" [name]="name()" [ariaLabel]="ariaLabel" [unstyled]="unstyled()">
            @if (dataTable.headerCheckboxIconTemplate || dataTable._headerCheckboxIconTemplate; as template) {
                <ng-template pTemplate="icon">
                    <ng-template *ngTemplateOutlet="template; context: { $implicit: checked }" />
                </ng-template>
            }
        </p-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [Bind]
})
export class TableHeaderCheckbox extends BaseComponent {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('headerCheckbox'));
    }

    readonly disabled = input<boolean | undefined, unknown>(undefined, { transform: booleanAttribute });
    readonly inputId = input<string | undefined>();
    readonly name = input<string | undefined>();

    @Input() ariaLabel: string | undefined;

    checked: boolean | undefined;

    selectionChangeSubscription: Subscription;

    valueChangeSubscription: Subscription;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        this.valueChangeSubscription = this.dataTable.tableService.valueSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
            this.ariaLabel = this.ariaLabel || (this.dataTable.config.translation.aria ? (this.checked ? this.dataTable.config.translation.aria.selectAll : this.dataTable.config.translation.aria.unselectAll) : undefined);
        });

        this.selectionChangeSubscription = this.dataTable.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }

    onInit() {
        this.checked = this.updateCheckedState();
    }

    onClick(event: CheckboxChangeEvent) {
        if (!this.disabled()) {
            if (this.dataTable.value && this.dataTable.value.length > 0) {
                this.dataTable.toggleRowsWithCheckbox(event, this.checked || false);
            }
        }

        DomHandler.clearSelection();
    }

    isDisabled() {
        return this.disabled() || !this.dataTable.value || !this.dataTable.value.length;
    }

    onDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }

        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }

    updateCheckedState() {
        this.cd.markForCheck();

        if (this.dataTable._selectAll !== null) {
            return this.dataTable._selectAll;
        } else {
            const data = this.dataTable.selectionPageOnly ? this.dataTable.dataToRender(this.dataTable.processedData) : this.dataTable.processedData;
            const val = this.dataTable.frozenValue ? [...this.dataTable.frozenValue, ...data] : data;
            const selectableVal = this.dataTable.rowSelectable ? val.filter((data: any, index: number) => this.dataTable.rowSelectable({ data, index })) : val;

            return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dataTable.selection) && selectableVal.every((v: any) => this.dataTable.selection.some((s: any) => this.dataTable.equals(v, s)));
        }
    }
}
