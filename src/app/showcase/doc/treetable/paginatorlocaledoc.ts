import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'paginator-locale-doc',
    template: `
        <app-docsectiontext>
            <p>Paginator localization information such as page numbers and rows per page options are defined with the <i>paginatorLocale</i> property which defaults to the user locale.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable paginatorLocale="fa-IR" [value]="files" [columns]="cols" [paginator]="true" [rows]="10" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th *ngFor="let col of columns">
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
        <app-code [code]="code" selector="tree-table-paginator-locale-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorLocaleDoc {
    files!: TreeNode[];

    cols!: Column[];

    loadDemoData() {
        this.files = [];
        for (let i = 0; i < 50; i++) {
            let node = {
                data: {
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    code: Code = {
        basic: `<p-treeTable 
    paginatorLocale="fa-IR" 
    [value]="files" 
    [columns]="cols" 
    [paginator]="true" 
    [rows]="10" 
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
                <td *ngFor="let col of columns; let i = index">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <p-treeTable 
        paginatorLocale="fa-IR" 
        [value]="files" 
        [columns]="cols" 
        [paginator]="true" 
        [rows]="10" 
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
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-paginator-locale-demo',
    templateUrl: './tree-table-paginator-locale-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule]
})
export class TreeTablePaginatorLocaleDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    ngOnInit() {
        this.files = [];
        for(let i = 0; i < 50; i++) {
            let node = {
                data:{  
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {  
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}`
    };
}
