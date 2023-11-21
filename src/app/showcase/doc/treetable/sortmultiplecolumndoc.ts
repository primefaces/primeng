import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'sort-multiple-column-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>Multiple columns can be sorted by defining <i>sortMode</i> as <i>multiple</i>. This mode requires metaKey (e.g. <i>⌘</i>) to be pressed when clicking a header.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treeTable [value]="files" [columns]="cols" sortMode="multiple" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                            {{ col.header }}
                            <p-treeTableSortIcon [field]="col.field"></p-treeTableSortIcon>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                    <tr [ttRow]="rowNode">
                        <td *ngFor="let col of columns; let i = index">
                            <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-treeTable>
        </div>
        <app-code [code]="code" selector="tree-table-sort-multiple-column-demo"></app-code>
    </section>`
})
export class SortMultipleColumnDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

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

    code: Code = {
        basic: `
<p-treeTable [value]="files" [columns]="cols" sortMode="multiple" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                {{ col.header }}
                <p-treeTableSortIcon [field]="col.field"></p-treeTableSortIcon>
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>`,

        html: `
<div class="card">
    <p-treeTable [value]="files" [columns]="cols" sortMode="multiple" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                    {{ col.header }}
                    <p-treeTableSortIcon [field]="col.field"></p-treeTableSortIcon>
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of columns; let i = index">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                    {{ rowData[col.field] }}
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
    selector: 'tree-table-sort-multiple-column-demo',
    templateUrl: './tree-table-sort-multiple-column-demo.html',
})
export class TreeTableSortMultipleColumnDemo implements OnInit {
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
