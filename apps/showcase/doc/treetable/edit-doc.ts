import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeComponent } from '@/components/doc/app.code.component';
import { AppDocSectionTextComponent } from '@/components/doc/app.docsectiontext.component';
import { DeferredDemo } from '@/components/demo/deferreddemo';
import { NodeService } from '@/service/nodeservice';
import { TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'edit-doc',
    standalone: true,
    imports: [NgClass, FormsModule, TreeTableModule, InputTextModule, AppCodeComponent, AppDocSectionTextComponent, DeferredDemo],
    template: `
        <app-docsectiontext>
            <p>Incell editing is enabled by defining input elements with <i>treeTableCellEditor</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col.field) {
                                <th>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode">
                            @for (col of columns; track col.field; let i = $index) {
                                <td ttEditableColumn [ttEditableColumnDisabled]="i == 0" [ngClass]="{ 'p-toggler-column': i === 0 }">
                                    @if (i === 0) {
                                        <p-treetable-toggler [rowNode]="rowNode" />
                                    }
                                    <p-treetable-cell-editor>
                                        <ng-template #input>
                                            <input pInputText type="text" [(ngModel)]="rowData[col.field]" />
                                        </ng-template>
                                        <ng-template #output>{{ rowData[col.field] }}</ng-template>
                                    </p-treetable-cell-editor>
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDoc {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}
