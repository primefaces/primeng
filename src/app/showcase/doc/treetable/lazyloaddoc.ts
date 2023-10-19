import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'lazy-load-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime <i>paging</i>, <i>sorting</i> and <i>filtering</i> occurs. Sample below
                imitates lazy loading data from a remote datasource using an in-memory list and timeouts to mimic network connection.
            </p>
            <p>
                Enabling the <i>lazy</i> property and assigning the logical number of rows to <i>totalRecords</i> by doing a projection query are the key elements of the implementation so that paginator displays the UI assuming there are actually
                records of totalRecords size although in reality they are not present on page, only the records that are displayed on the current page exist.
            </p>
            <p>In addition, only the root elements should be loaded, children can be loaded on demand using <i>onNodeExpand</i> callback.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treeTable
                [value]="files"
                [columns]="cols"
                [paginator]="true"
                [rows]="10"
                [lazy]="true"
                (onLazyLoad)="loadNodes($event)"
                [totalRecords]="1000"
                [loading]="loading"
                (onNodeExpand)="onNodeExpand($event)"
                [scrollable]="true"
                [tableStyle]="{ 'min-width': '50rem' }"
            >
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                    <tr>
                        <td *ngFor="let col of columns; let i = index">
                            <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-treeTable>
        </div>
        <app-code [code]="code" selector="tree-table-lazy-load-demo"></app-code>
    </section>`
})
export class LazyLoadDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    files!: TreeNode[];

    cols!: Column[];

    totalRecords!: number;

    loading: boolean = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.totalRecords = 1000;

        this.loading = true;
    }

    loadNodes(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this.files = [];

            for (let i = 0; i < event.rows; i++) {
                let node = {
                    data: {
                        name: 'Item ' + (event.first + i),
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'Type ' + (event.first + i)
                    },
                    leaf: false
                };

                this.files.push(node);
            }
        }, 1000);
    }

    onNodeExpand(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {
                        name: node.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                },
                {
                    data: {
                        name: node.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            this.files = [...this.files];
        }, 250);
    }

    code: Code = {
        basic: `
<p-treeTable [value]="files" [columns]="cols" [paginator]="true" [rows]="10" [lazy]="true" (onLazyLoad)="loadNodes($event)" [totalRecords]="1000" [loading]="loading" (onNodeExpand)="onNodeExpand($event)" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
        <tr>
            <td *ngFor="let col of columns; let i = index">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>`,

        html: `
<div class="card">
    <p-treeTable [value]="files" [columns]="cols" [paginator]="true" [rows]="10" [lazy]="true" (onLazyLoad)="loadNodes($event)" [totalRecords]="1000" [loading]="loading" (onNodeExpand)="onNodeExpand($event)" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr>
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
    selector: 'tree-table-lazy-load-demo',
    templateUrl: './tree-table-lazy-load-demo.html'
})
export class TreeTableLazyLoadDemo implements OnInit{
    files!: TreeNode[];

    cols!: Column[];

    totalRecords!: number;

    loading: boolean = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.totalRecords = 1000;

        this.loading = true;
    }

    loadNodes(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this.files = [];

            for (let i = 0; i < event.rows; i++) {
                let node = {
                    data: {
                        name: 'Item ' + (event.first + i),
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'Type ' + (event.first + i)
                    },
                    leaf: false
                };

                this.files.push(node);
            }
        }, 1000);
    }

    onNodeExpand(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {
                        name: node.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                },
                {
                    data: {
                        name: node.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            this.files = [...this.files];
        }, 250);
    }
}`,

        service: ['NodeService']
    };
}
