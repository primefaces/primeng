import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TABLE_INSTANCE, TableService } from './table-service';
import type { Table } from './table';

@Component({
    selector: 'p-tableHeaderCheckbox',
    standalone: true,
    imports: [NgTemplateOutlet, CheckboxModule, FormsModule],
    template: `
        <p-checkbox [pt]="ptm('pcCheckbox')" [(ngModel)]="checked" (onChange)="onClick($event)" [binary]="true" [disabled]="isDisabled()" [inputId]="inputId()" [name]="name()" [ariaLabel]="resolvedAriaLabel" [unstyled]="unstyled()">
            @if (dataTable.headerCheckboxIconTemplate(); as template) {
                <ng-template #icon>
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

    disabled = input(undefined, { transform: booleanAttribute });

    inputId = input<string>();

    name = input<string>();

    ariaLabel = input<string | undefined>();

    checked: boolean | undefined;

    resolvedAriaLabel: string | undefined;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public tableService = inject(TableService);

    private get aria() {
        return this.dataTable.config.translation.aria;
    }

    constructor() {
        super();
        this.dataTable.tableService.valueSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.checked = this.updateCheckedState();
            this.resolvedAriaLabel = this.ariaLabel() || (this.aria ? (this.checked ? this.aria.selectAll : this.aria.unselectAll) : undefined);
        });

        this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
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

    updateCheckedState() {
        this.cd.markForCheck();

        if (this.dataTable._selectAll !== null) {
            return this.dataTable._selectAll;
        } else {
            const data = this.dataTable.selectionPageOnly() ? this.dataTable.dataToRender(this.dataTable.processedData) : this.dataTable.processedData;
            const val = this.dataTable.frozenValue() ? [...this.dataTable.frozenValue()!, ...data] : data;
            const selectableVal = this.dataTable.rowSelectable() ? val.filter((data: any, index: number) => this.dataTable.rowSelectable()!({ data, index })) : val;

            return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dataTable.selection) && selectableVal.every((v: any) => this.dataTable.selection.some((s: any) => this.dataTable.equals(v, s)));
        }
    }
}
