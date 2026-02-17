import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { TABLE_INSTANCE, TableService } from './table-token';
import type { Table } from './table';

@Component({
    selector: 'p-tableCheckbox',
    standalone: true,
    imports: [CommonModule, CheckboxModule, FormsModule],
    template: `
        <p-checkbox [(ngModel)]="checked" [binary]="true" (onChange)="onClick($event)" [required]="required()" [disabled]="disabled()" [inputId]="inputId()" [name]="name()" [ariaLabel]="ariaLabel" [unstyled]="unstyled()">
            @if (dataTable.checkboxIconTemplate || dataTable._checkboxIconTemplate; as template) {
                <ng-template pTemplate="icon">
                    <ng-template *ngTemplateOutlet="template; context: { $implicit: checked }" />
                </ng-template>
            }
        </p-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCheckbox extends BaseComponent {
    @Input() value: any;

    readonly disabled = input<boolean | undefined, unknown>(undefined, { transform: booleanAttribute });
    readonly required = input<boolean | undefined, unknown>(undefined, { transform: booleanAttribute });
    readonly index = input<number | undefined, unknown>(undefined, { transform: numberAttribute });
    readonly inputId = input<string | undefined>();
    readonly name = input<string | undefined>();

    @Input() ariaLabel: string | undefined;

    checked: boolean | undefined;

    subscription: Subscription;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    constructor() {
        super();
        this.subscription = this.dataTable.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dataTable.isSelected(this.value);
            this.ariaLabel = this.ariaLabel || (this.dataTable.config.translation.aria ? (this.checked ? this.dataTable.config.translation.aria.selectRow : this.dataTable.config.translation.aria.unselectRow) : undefined);
            this.cd.markForCheck();
        });
    }

    onInit() {
        this.checked = this.dataTable.isSelected(this.value);
    }

    onClick({ originalEvent }: CheckboxChangeEvent) {
        if (!this.disabled()) {
            this.dataTable.toggleRowWithCheckbox(
                {
                    originalEvent: originalEvent!,
                    rowIndex: this.index() || 0
                },
                this.value
            );
        }
        DomHandler.clearSelection();
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
