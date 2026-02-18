import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, numberAttribute, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterMetadata } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Nullable } from 'primeng/ts-helpers';
import { ColumnFilterPassThrough } from 'primeng/types/table';
import { TableStyle } from './style/tablestyle';
import { ColumnFilter } from './column-filter';
import { TABLE_INSTANCE } from './table-service';
import type { Table } from './table';

@Component({
    selector: 'p-columnFilterFormElement',
    standalone: true,
    imports: [NgTemplateOutlet, FormsModule, InputTextModule, InputNumberModule, CheckboxModule, DatePickerModule, BindModule],
    template: `
        @if (filterTemplate()) {
            <ng-container *ngTemplateOutlet="filterTemplate(); context: filterTemplateContext()" />
        } @else {
            @switch (type()) {
                @case ('text') {
                    <input
                        type="text"
                        [ariaLabel]="ariaLabel()"
                        pInputText
                        [pt]="ptm('pcFilterInputText')"
                        [value]="filterConstraint()?.value"
                        (input)="onModelChange($event.target.value)"
                        (keydown.enter)="onTextInputEnterKeyDown($event)"
                        [attr.placeholder]="placeholder()"
                        [unstyled]="unstyled()"
                    />
                }
                @case ('numeric') {
                    <p-inputNumber
                        [ngModel]="filterConstraint()?.value"
                        (ngModelChange)="onModelChange($event)"
                        (onKeyDown)="onNumericInputKeyDown($event)"
                        [showButtons]="showButtons()"
                        [minFractionDigits]="minFractionDigits()"
                        [maxFractionDigits]="maxFractionDigits()"
                        [ariaLabel]="ariaLabel()"
                        [prefix]="prefix()"
                        [suffix]="suffix()"
                        [placeholder]="placeholder()"
                        [mode]="currency() ? 'currency' : 'decimal'"
                        [locale]="locale()"
                        [localeMatcher]="localeMatcher()"
                        [currency]="currency()"
                        [currencyDisplay]="currencyDisplay()"
                        [useGrouping]="useGrouping()"
                        [pt]="ptm('pcFilterInputNumber')"
                        [unstyled]="unstyled()"
                    />
                }
                @case ('boolean') {
                    <p-checkbox [pt]="ptm('pcFilterCheckbox')" [indeterminate]="filterConstraint()?.value === null" [binary]="true" [ngModel]="filterConstraint()?.value" (ngModelChange)="onModelChange($event)" [unstyled]="unstyled()" />
                }
                @case ('date') {
                    <p-datepicker [pt]="ptm('pcFilterDatePicker')" [ariaLabel]="ariaLabel()" [placeholder]="placeholder()" [ngModel]="filterConstraint()?.value" (ngModelChange)="onModelChange($event)" appendTo="body" [unstyled]="unstyled()" />
                }
            }
        }
    `,
    providers: [TableStyle],
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [Bind]
})
export class ColumnFilterFormElement extends BaseComponent<ColumnFilterPassThrough> {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(TableStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('columnFilterFormElement'));
    }

    field = input<string>();

    type = input<string>();

    filterConstraint = input<FilterMetadata>();

    filterTemplate = input<Nullable<TemplateRef<any>>>();

    placeholder = input<string>();

    minFractionDigits = input(undefined, { transform: (v: unknown) => numberAttribute(v, undefined) });

    maxFractionDigits = input(undefined, { transform: (v: unknown) => numberAttribute(v, undefined) });

    prefix = input<string>();

    suffix = input<string>();

    locale = input<string>();

    localeMatcher = input<string>();

    currency = input<string>();

    currencyDisplay = input<string>();

    useGrouping = input(true, { transform: booleanAttribute });

    ariaLabel = input<string>();

    filterOn = input<string>();

    showButtons = computed(() => this.colFilter.showButtons());

    private onFilterCallback = ((value: any) => {
        const constraint = this.filterConstraint();
        if (constraint) {
            (<any>constraint).value = value;
        }
        this.dataTable._filter();
    }).bind(this);

    filterTemplateContext = computed(() => ({
        $implicit: this.filterConstraint()?.value,
        filterCallback: this.onFilterCallback,
        type: this.type(),
        field: this.field(),
        filterConstraint: this.filterConstraint(),
        placeholder: this.placeholder(),
        minFractionDigits: this.minFractionDigits(),
        maxFractionDigits: this.maxFractionDigits(),
        prefix: this.prefix(),
        suffix: this.suffix(),
        locale: this.locale(),
        localeMatcher: this.localeMatcher(),
        currency: this.currency(),
        currencyDisplay: this.currencyDisplay(),
        useGrouping: this.useGrouping(),
        showButtons: this.showButtons()
    }));

    public dataTable = inject<Table>(TABLE_INSTANCE);

    private colFilter = inject(ColumnFilter);

    onModelChange(value: any) {
        const constraint = this.filterConstraint();
        if (constraint) {
            (<any>constraint).value = value;
        }

        if (this.type() === 'date' || this.type() === 'boolean' || ((this.type() === 'text' || this.type() === 'numeric') && this.filterOn() === 'input') || !value) {
            this.dataTable._filter();
        }
    }

    onTextInputEnterKeyDown(event: KeyboardEvent) {
        this.dataTable._filter();
        event.preventDefault();
    }

    onNumericInputKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.dataTable._filter();
            event.preventDefault();
        }
    }
}
