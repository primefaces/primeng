import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'scroll-horizontal-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>Horizontal scrolling is enabled when the total width of columns exceeds table width.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treeTable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="200px">
                <ng-template pTemplate="colgroup" let-columns>
                    <colgroup>
                        <col *ngFor="let col of columns" style="width:500px" />
                    </colgroup>
                </ng-template>
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
        <app-code [code]="code" selector="tree-table-scroll-horizontal-demo"></app-code>
    </section>`
})
export class ScrollHorizontalDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    files: TreeNode[];

    cols: any[];

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
<p-treeTable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="200px">
    <ng-template pTemplate="colgroup" let-columns>
        <colgroup>
            <col *ngFor="let col of columns" style="width:500px" />
        </colgroup>
    </ng-template>
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
    <p-treeTable [value]="files" [columns]="cols" [scrollable]="true" scrollHeight="200px">
        <ng-template pTemplate="colgroup" let-columns>
            <colgroup>
                <col *ngFor="let col of columns" style="width:500px" />
            </colgroup>
        </ng-template>
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

@Component({
    selector: 'tree-table-scroll-horizontal-demo',
    templateUrl: './tree-table-scroll-horizontal-demo.html'
})
export class TreeTableScrollHorizontalDemo implements OnInit {
    files: TreeNode[];

    cols: any[];

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
