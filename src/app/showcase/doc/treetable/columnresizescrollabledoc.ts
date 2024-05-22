import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'resize-scrollable-doc',
    template: `
        <app-docsectiontext>
            <p>To utilize the column resize modes with a <i>scrollable</i> TreeTable, a <i>colgroup</i> template must be defined. The default value of scrollHeight is "flex," it can also be set as a string value.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable [value]="files" [columns]="cols" [resizableColumns]="true" [scrollable]="true" scrollHeight="200px" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="colgroup" let-columns>
                        <colgroup>
                            <col *ngFor="let col of columns" />
                        </colgroup>
                    </ng-template>
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th *ngFor="let col of columns" ttResizableColumn>
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode">
                            <td *ngFor="let col of columns; let i = index">
                                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-treeTable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-resize-scrollable-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizeScrollableDoc {
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

    code: Code = {
        basic: `<p-treeTable 
    [value]="files" 
    [columns]="cols" 
    [resizableColumns]="true" 
    [scrollable]="true" 
    scrollHeight="200px">
        <ng-template pTemplate="colgroup" let-columns>
            <colgroup>
                <col *ngFor="let col of columns">
            </colgroup>
        </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" ttResizableColumn>
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of columns; let i = index">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <p-treeTable 
        [value]="files" 
        [columns]="cols" 
        [resizableColumns]="true" 
        [scrollable]="true" 
        scrollHeight="200px">
            <ng-template pTemplate="colgroup" let-columns>
                <colgroup>
                    <col *ngFor="let col of columns">
                </colgroup>
            </ng-template>
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns" ttResizableColumn>
                        {{ col.header }}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr [ttRow]="rowNode">
                    <td *ngFor="let col of columns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                        {{ rowData[col.field] }}
                    </td>
                </tr>
            </ng-template>
    </p-treeTable>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-resize-scrollable-demo',
    templateUrl: './tree-table-resize-scrollable-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableResizeScrollableDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}`,

        service: ['NodeService']
    };
}
