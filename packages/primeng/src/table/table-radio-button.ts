import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from 'primeng/basecomponent';
import { DomHandler } from 'primeng/dom';
import { RadioButton, RadioButtonClickEvent, RadioButtonModule } from 'primeng/radiobutton';
import { Nullable } from 'primeng/ts-helpers';
import { Subscription } from 'rxjs';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';
import { booleanAttribute, numberAttribute } from '@angular/core';

@Component({
    selector: 'p-tableRadioButton',
    standalone: true,
    imports: [RadioButtonModule, FormsModule],
    template: `<p-radiobutton #rb [(ngModel)]="checked" [disabled]="disabled()" [inputId]="inputId()" [name]="name()" [ariaLabel]="ariaLabel" [binary]="true" [value]="value" (onClick)="onClick($event)" [unstyled]="unstyled()" /> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableRadioButton extends BaseComponent {
    @Input() value: any;

    readonly disabled = input<boolean | undefined, unknown>(undefined, { transform: booleanAttribute });
    readonly index = input<number | undefined, unknown>(undefined, { transform: numberAttribute });
    readonly inputId = input<string | undefined>();
    readonly name = input<string | undefined>();

    @Input() ariaLabel: string | undefined;

    @ViewChild('rb') inputViewChild: Nullable<RadioButton>;

    checked: boolean | undefined;

    subscription: Subscription;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public cd = inject(ChangeDetectorRef);

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

    onClick(event: RadioButtonClickEvent) {
        if (!this.disabled()) {
            this.dataTable.toggleRowWithRadio(
                {
                    originalEvent: event.originalEvent,
                    rowIndex: this.index()
                },
                this.value
            );

            this.inputViewChild?.inputViewChild().nativeElement?.focus();
        }
        DomHandler.clearSelection();
    }

    onDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
