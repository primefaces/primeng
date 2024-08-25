import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'gridlines-doc',
    template: ` <section class="py-4">
        <app-docsectiontext>
            <p>Adding <i>p-treetable-gridlines</i> class displays grid lines.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" showGridlines>
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Type</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td>
                                <p-treeTableToggler [rowNode]="rowNode" />
                                {{ rowData.name }}
                            </td>
                            <td>{{ rowData.size }}</td>
                            <td>{{ rowData.type }}</td>
                        </tr>
                    </ng-template>
                </p-treeTable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-gridlines-demo"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridlinesDoc {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
    }

    code: Code = {
        basic: `<p-treeTable 
    [value]="files" 
    [scrollable]="true" 
    [tableStyle]="{'min-width':'50rem'}" 
    styleClass="p-treetable-gridlines">
        <ng-template pTemplate="header">
            <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
            <tr [ttRow]="rowNode">
                <td>
                    <p-treeTableToggler [rowNode]="rowNode" />
                    {{ rowData.name }}
                </td>
                <td>{{ rowData.size }}</td>
                <td>{{ rowData.type }}</td>
            </tr>
        </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <p-treeTable 
        [value]="files" 
        [scrollable]="true" 
        [tableStyle]="{'min-width':'50rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                <tr [ttRow]="rowNode">
                    <td>
                        <p-treeTableToggler [rowNode]="rowNode" />
                        {{ rowData.name }}
                    </td>
                    <td>{{ rowData.size }}</td>
                    <td>{{ rowData.type }}</td>
                </tr>
            </ng-template>
    </p-treeTable>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'tree-table-gridlines-demo',
    templateUrl: './tree-table-gridlines-demo.html',
    standalone: true,
    imports: [TreeTableModule],
    providers: [NodeService]
})
export class TreeTableGridlinesDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
    }
}`,

        service: ['NodeService'],
    };
}
