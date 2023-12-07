import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Custom content at <i>caption</i>, <i>header</i>, <i>body</i> and <i>summary</i> sections are supported via templating.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treeTable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="caption"><div class="text-xl font-bold">File Viewer</div> </ng-template>
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                    <tr [ttRow]="rowNode">
                        <td *ngFor="let col of columns; let i = index; let last = last">
                            <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                            {{ rowData[col.field] }}
                            <ng-container *ngIf="last">
                                <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }"></p-button>
                                <p-button icon="pi pi-pencil" rounded="true" severity="success"></p-button>
                            </ng-container>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="summary">
                    <div style="text-align:left">
                        <p-button icon="pi pi-refresh" label="Reload"></p-button>
                    </div>
                </ng-template>
            </p-treeTable>
        </div>
        <app-code [code]="code" selector="tree-table-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: '', header: '' }
        ];
    }

    code: Code = {
        basic: `<p-treeTable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="caption"><div class="text-xl font-bold">File Viewer</div> </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of columns; let i = index; let last = last">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                    {{ rowData[col.field] }}
                    <ng-container *ngIf="last">
                        <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }"></p-button>
                        <p-button icon="pi pi-pencil" rounded="true" severity="success"></p-button>
                    </ng-container>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="summary">
            <div style="text-align:left">
                <p-button icon="pi pi-refresh" label="Reload"></p-button>
            </div>
        </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <p-treeTable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="caption"><div class="text-xl font-bold">File Viewer</div> </ng-template>
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index; let last = last">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                {{ rowData[col.field] }}
                <ng-container *ngIf="last">
                    <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }"></p-button>
                    <p-button icon="pi pi-pencil" rounded="true" severity="success"></p-button>
                </ng-container>
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="summary">
        <div style="text-align:left">
            <p-button icon="pi pi-refresh" label="Reload"></p-button>
        </div>
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
    selector: 'tree-table-template-demo',
    templateUrl: './tree-table-template-demo.html'
})
export class TreeTableTemplateDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: '', header: '' }
        ];
    }
}`,

        service: ['NodeService'],
    };
}
