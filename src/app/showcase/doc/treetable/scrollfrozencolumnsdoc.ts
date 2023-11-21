import { Component, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'scroll-frozen-columns-doc',
    template: `
        <app-docsectiontext>
            <p>A column can be fixed during horizontal scrolling by enabling the <i>frozenColumns</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treeTable [value]="files" [columns]="scrollableCols" [frozenColumns]="frozenCols" [scrollable]="true" scrollHeight="250px" frozenWidth="200px" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="colgroup" let-columns>
                    <colgroup>
                        <col *ngFor="let col of columns" style="width:250px" />
                    </colgroup>
                </ng-template>
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData="rowData" let-columns="columns">
                    <tr [ttRow]="rowNode" style="height: 57px">
                        <td *ngFor="let col of columns; let i = index">
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="frozenbody" let-rowNode let-rowData="rowData">
                    <tr [ttRow]="rowNode" style="height: 57px">
                        <td>
                            <p-treeTableToggler [rowNode]="rowNode"></p-treeTableToggler>
                            {{ rowData.name }}
                        </td>
                    </tr>
                </ng-template>
            </p-treeTable>
        </div>
        <app-code [code]="code" selector="tree-table-scroll-frozen-columns-demo"></app-code>
 `
})
export class FrozenColumnsDoc implements OnInit {

    files!: TreeNode[];

    cols!: Column[];

    frozenCols!: Column[];

    scrollableCols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.scrollableCols = [
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.frozenCols = [{ field: 'name', header: 'Name' }];
    }

    code: Code = {
        basic: `
<p-treeTable [value]="files" [columns]="scrollableCols" [frozenColumns]="frozenCols" [scrollable]="true" scrollHeight="250px" frozenWidth="200px" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template pTemplate="colgroup" let-columns>
        <colgroup>
            <col *ngFor="let col of columns" style="width:250px" />
        </colgroup>
    </ng-template>
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" style="height: 57px">
            <td *ngFor="let col of columns; let i = index">
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="frozenbody" let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode" style="height: 57px">
            <td>
                <p-treeTableToggler [rowNode]="rowNode"></p-treeTableToggler>
                {{ rowData.name }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>`,

        html: `
<div class="card">
    <p-treeTable [value]="files" [columns]="scrollableCols" [frozenColumns]="frozenCols" [scrollable]="true" scrollHeight="250px" frozenWidth="200px" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="colgroup" let-columns>
            <colgroup>
                <col *ngFor="let col of columns" style="width:250px" />
            </colgroup>
        </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode" style="height: 57px">
                <td *ngFor="let col of columns; let i = index">
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="frozenbody" let-rowNode let-rowData="rowData">
            <tr [ttRow]="rowNode" style="height: 57px">
                <td>
                    <p-treeTableToggler [rowNode]="rowNode"></p-treeTableToggler>
                    {{ rowData.name }}
                </td>
            </tr>
        </ng-template>
    </p-treeTable>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-scroll-frozen-columns-demo',
    templateUrl: './tree-table-scroll-frozen-columns-demo.html'
})
export class TreeTableScrollFrozenColumnsDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    frozenCols!: Column[];

    scrollableCols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.scrollableCols = [
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.frozenCols = [{ field: 'name', header: 'Name' }];
    }
}`,

        service: ['NodeService']
    };
}
