import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'edit-doc',
    template: `
        <app-docsectiontext>
            <p>Incell editing is enabled by defining input elements with <i>treeTableCellEditor</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th *ngFor="let col of columns">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode">
                            <td *ngFor="let col of columns; let i = index" ttEditableColumn [ttEditableColumnDisabled]="i == 0" [ngClass]="{ 'p-toggler-column': i === 0 }">
                                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                                <p-treeTableCellEditor>
                                    <ng-template pTemplate="input">
                                        <input pInputText type="text" [(ngModel)]="rowData[col.field]" />
                                    </ng-template>
                                    <ng-template pTemplate="output">{{ rowData[col.field] }}</ng-template>
                                </p-treeTableCellEditor>
                            </td>
                        </tr>
                    </ng-template>
                </p-treeTable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-edit-demo"></app-code>
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

    code: Code = {
        basic: `<p-treeTable 
    [value]="files" 
    [columns]="cols" 
    [scrollable]="true" 
    [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of columns; let i = index" ttEditableColumn [ttEditableColumnDisabled]="i == 0" [ngClass]="{ 'p-toggler-column': i === 0 }">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                    <p-treeTableCellEditor>
                        <ng-template pTemplate="input">
                            <input pInputText type="text" [(ngModel)]="rowData[col.field]" />
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{ rowData[col.field] }}
                        </ng-template>
                    </p-treeTableCellEditor>
                </td>
            </tr>
        </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <p-treeTable 
        [value]="files" 
        [columns]="cols" 
        [scrollable]="true" 
        [tableStyle]="{'min-width':'50rem'}">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{ col.header }}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                <tr [ttRow]="rowNode">
                    <td *ngFor="let col of columns; let i = index" ttEditableColumn [ttEditableColumnDisabled]="i == 0" [ngClass]="{ 'p-toggler-column': i === 0 }">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                        <p-treeTableCellEditor>
                            <ng-template pTemplate="input">
                                <input pInputText type="text" [(ngModel)]="rowData[col.field]" />
                            </ng-template>
                            <ng-template pTemplate="output">
                                {{ rowData[col.field] }}
                            </ng-template>
                        </p-treeTableCellEditor>
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
    selector: 'tree-table-edit-demo',
    templateUrl: './tree-table-edit-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableEditDemo implements OnInit {
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
