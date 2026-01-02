import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
    field: string;
    header: string;
}

interface NodeEvent {
    originalEvent: Event;
    node: TreeNode;
}

@Component({
    selector: 'selection-events-doc',
    standalone: true,
    imports: [CommonModule, TreeTableModule, ToastModule, DeferredDemo, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>TreeTable provides <i>onNodeSelect</i> and <i>onNodeUnselect</i> events to listen selection events.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable
                    [value]="files"
                    [columns]="cols"
                    selectionMode="single"
                    [(selection)]="selectedNode"
                    dataKey="name"
                    (onNodeSelect)="nodeSelect($event)"
                    (onNodeUnselect)="nodeUnselect($event)"
                    [scrollable]="true"
                    [tableStyle]="{ 'min-width': '50rem' }"
                >
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
        <app-code selector="tree-table-selection-events-demo"></app-code>
    `,
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionEventsDoc {
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    constructor(
        private nodeService: NodeService,
        private messageService: MessageService
    ) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    nodeSelect(event: NodeEvent) {
        this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    }

    nodeUnselect(event: NodeEvent) {
        this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
    }
}
