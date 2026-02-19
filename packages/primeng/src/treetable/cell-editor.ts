import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TREETABLE_INSTANCE } from './treetable-service';
import { TTEditableColumn } from './editable-column';
import type { TreeTable } from './treetable';

@Component({
    selector: 'p-treetablecelleditor, p-treetable-cell-editor',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        @if (editing) {
            <ng-container *ngTemplateOutlet="inputTemplate()"></ng-container>
        } @else {
            <ng-container *ngTemplateOutlet="outputTemplate()"></ng-container>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [Bind]
})
export class TreeTableCellEditor extends BaseComponent {
    hostName = 'TreeTable';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('cellEditor'));
    }

    inputTemplate = contentChild<TemplateRef<any>>('input');

    outputTemplate = contentChild<TemplateRef<any>>('output');

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    editableColumn = inject(TTEditableColumn);

    get editing() {
        return this.tt.editingCell === this.editableColumn.el.nativeElement;
    }
}
