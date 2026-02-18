import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { RadioButton, RadioButtonClickEvent, RadioButtonModule } from 'primeng/radiobutton';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Component({
    selector: 'p-table-radio-button, p-tableradiobutton',
    standalone: true,
    imports: [RadioButtonModule, FormsModule],
    template: `<p-radiobutton
        #rb
        [ngModel]="checked()"
        (ngModelChange)="checked.set($event)"
        [disabled]="disabled()"
        [inputId]="inputId()"
        [name]="name()"
        [ariaLabel]="resolvedAriaLabel()"
        [binary]="true"
        [value]="value()"
        (onClick)="onClick($event)"
        [unstyled]="unstyled()"
    /> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableRadioButton extends BaseComponent {
    value = input<any>();

    disabled = input(undefined, { transform: booleanAttribute });

    index = input(undefined, { transform: numberAttribute });

    inputId = input<string>();

    name = input<string>();

    ariaLabel = input<string | undefined>();

    inputViewChild = viewChild<RadioButton>('rb');

    checked = signal(false);

    public dataTable = inject<Table>(TABLE_INSTANCE);

    private get aria() {
        return this.dataTable.config.translation.aria;
    }

    resolvedAriaLabel = computed(() => {
        const checked = this.checked();
        return this.ariaLabel() || (this.aria ? (checked ? this.aria.selectRow : this.aria.unselectRow) : undefined);
    });

    constructor() {
        super();
        this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.checked.set(this.dataTable.isSelected(this.value()));
        });
    }

    onInit() {
        this.checked.set(this.dataTable.isSelected(this.value()));
    }

    onClick(event: RadioButtonClickEvent) {
        if (!this.disabled()) {
            this.dataTable.toggleRowWithRadio(
                {
                    originalEvent: event.originalEvent,
                    rowIndex: this.index()
                },
                this.value()
            );

            this.inputViewChild()?.inputViewChild().nativeElement?.focus();
        }
        DomHandler.clearSelection();
    }
}
