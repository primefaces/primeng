import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from 'primeng/basecomponent';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DomHandler } from 'primeng/dom';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TABLE_INSTANCE, TableService } from './table-service';
import type { Table } from './table';

@Component({
    selector: 'p-table-checkbox, p-tablecheckbox',
    standalone: true,
    imports: [NgTemplateOutlet, CheckboxModule, FormsModule],
    template: `
        <p-checkbox
            [ngModel]="checked()"
            (ngModelChange)="checked.set($event)"
            [binary]="true"
            (onChange)="onClick($event)"
            [required]="required()"
            [disabled]="disabled()"
            [inputId]="inputId()"
            [name]="name()"
            [ariaLabel]="resolvedAriaLabel()"
            [unstyled]="unstyled()"
        >
            @if (dataTable.checkboxIconTemplate(); as template) {
                <ng-template #icon>
                    <ng-template *ngTemplateOutlet="template; context: { $implicit: checked() }" />
                </ng-template>
            }
        </p-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCheckbox extends BaseComponent {
    value = input<any>();

    disabled = input(undefined, { transform: booleanAttribute });

    required = input(undefined, { transform: booleanAttribute });

    index = input(undefined, { transform: numberAttribute });

    inputId = input<string>();

    name = input<string>();

    ariaLabel = input<string | undefined>();

    checked = signal(false);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    private get aria() {
        return this.dataTable.config.translation.aria;
    }

    resolvedAriaLabel = computed(() => {
        const checked = this.checked();
        return this.ariaLabel() || (this.aria ? (checked ? this.aria.selectRow : this.aria.unselectRow) : undefined);
    });

    public tableService = inject(TableService);

    constructor() {
        super();
        this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.checked.set(this.dataTable.isSelected(this.value()));
        });
    }

    onInit() {
        this.checked.set(this.dataTable.isSelected(this.value()));
    }

    onClick({ originalEvent }: CheckboxChangeEvent) {
        if (!this.disabled()) {
            this.dataTable.toggleRowWithCheckbox(
                {
                    originalEvent: originalEvent!,
                    rowIndex: this.index() || 0
                },
                this.value()
            );
        }
        DomHandler.clearSelection();
    }
}
