import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'selectionsingle-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeTableModule, ToggleSwitchModule, DeferredDemo, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Single node selection is configured by setting <i>selectionMode</i> as <i>single</i> along with <i>selection</i> properties to manage the selection value binding.</p>
            <p>
                By default, metaKey press (e.g. <i>⌘</i>) is necessary to unselect a node however this can be configured with disabling the <i>metaKeySelection</i> property. In touch enabled devices this option has no effect and behavior is same as
                setting it to false
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex gap-4 items-center justify-center mb-6">
                <p-toggleswitch [(ngModel)]="metaKeySelection" />
                <span>Metakey</span>
            </div>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" selectionMode="single" [metaKeySelection]="metaKeySelection" [(selection)]="selectedNode" dataKey="name" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col) {
                                <th>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                            @for (col of columns; let first = $first; track col) {
                                <td>
                                    @if (first) {
                                        <div class="flex items-center gap-2">
                                            <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                                            <span>{{ rowData[col.field] }}</span>
                                        </div>
                                    } @else {
                                        {{ rowData[col.field] }}
                                    }
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
export class SelectionSingleDoc {
    metaKeySelection: boolean = true;

    files!: TreeNode[];

    selectedNode!: TreeNode;

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
