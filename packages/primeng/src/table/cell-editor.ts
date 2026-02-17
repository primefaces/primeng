import { CommonModule } from '@angular/common';
import { Component, ContentChild, ContentChildren, inject, Optional, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Nullable } from 'primeng/ts-helpers';
import { EditableColumn } from './editable-column';
import { EditableRow } from './editable-row';
import { TABLE_INSTANCE } from './table-token';
import type { Table } from './table';

@Component({
    selector: 'p-cellEditor',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate || _inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate || _outputTemplate"></ng-container>
        </ng-container>
    `,
    encapsulation: ViewEncapsulation.None
})
export class CellEditor extends BaseComponent {
    @ContentChildren(PrimeTemplate) _templates: Nullable<QueryList<PrimeTemplate>>;

    @ContentChild('input') _inputTemplate: TemplateRef<any>;

    @ContentChild('output') _outputTemplate: TemplateRef<any>;

    inputTemplate: Nullable<TemplateRef<any>>;

    outputTemplate: Nullable<TemplateRef<any>>;

    public dataTable = inject<Table>(TABLE_INSTANCE);

    public editableColumn = inject(EditableColumn, { optional: true });

    public editableRow = inject(EditableRow, { optional: true });

    onAfterContentInit() {
        (this._templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;

                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }

    get editing(): boolean {
        return !!(
            (this.dataTable.editingCell && this.editableColumn && this.dataTable.editingCell === this.editableColumn.el.nativeElement) ||
            (this.editableRow && this.dataTable.editMode === 'row' && this.dataTable.isRowEditing(this.editableRow.data))
        );
    }
}
