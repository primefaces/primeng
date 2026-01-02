import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'selection-checkbox-doc',
    standalone: true,
    imports: [CommonModule, TreeTableModule, DeferredDemo, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Selection of multiple nodes via checkboxes is enabled by configuring <i>selectionMode</i> as <i>checkbox</i>.</p>
            <p>
                In checkbox selection mode, value binding should be a key-value pair where key (or the dataKey) is the node key and value is an object that has <i>checked</i> and <i>partialChecked</i> properties to represent the checked state of a
                node.
            </p>
        </app-docsectiontext>
        <app-code [code]="code2" selector="selection-keys" [hideToggleCode]="true"></app-code>
        <div class="card mt-4">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" selectionMode="checkbox" [(selectionKeys)]="selectionKeys" dataKey="key" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
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
                                            <p-treetable-toggler [rowNode]="rowNode" />
                                            <p-treetable-checkbox [value]="rowNode" />
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
        <app-code selector="tree-table-selection-checkbox-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionCheckboxDoc {
    files!: TreeNode[];

    selectionKeys = {};

    cols!: Column[];

    constructor(
        private nodeService: NodeService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.nodeService.getTreeTableNodes().then((files) => {
            this.files = files;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.selectionKeys = {
            '0': {
                partialChecked: true
            },
            '0-0': {
                partialChecked: false,
                checked: true
            },
            '0-0-0': {
                checked: true
            },
            '0-0-1': {
                checked: true
            },
            '0-0-2': {
                checked: true
            }
        };
    }

    code2 = {
        typescript: `{
    '0': {
        partialChecked: true
    },
    '0-0': {
        partialChecked: false,
        checked: true
    },
    '0-0-0': {
        checked: true
    },
    '0-0-1': {
        checked: true
    },
    '0-0-2': {
        checked: true
    }
}`
    };
}
