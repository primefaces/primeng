import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'selection-checkbox-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>Selection of multiple nodes via checkboxes is enabled by configuring <i>selectionMode</i> as <i>checkbox</i>.</p>
            <p>In checkbox selection mode, value binding should be a key-value pair where key is the node key and value is an object that has checked and partialChecked properties to represent the checked state of a node.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treeTable [value]="files" [columns]="cols" selectionMode="checkbox" [(selection)]="selectedNodes" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="caption">
                    <div class="flex">
                        <p-treeTableHeaderCheckbox></p-treeTableHeaderCheckbox>
                        <span class="ml-2">Toggle All</span>
                    </div>
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
                            <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0"></p-treeTableCheckbox>
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-treeTable>
        </div>
        <app-code [code]="code" selector="tree-table-selection-checkbox-demo"></app-code>
    </section>`
})
export class SelectionCheckboxDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    files: TreeNode[];

    selectedNodes: TreeNode[];

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
<p-treeTable [value]="files" [columns]="cols" selectionMode="checkbox" [(selection)]="selectedNodes" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template pTemplate="caption">
        <div class="flex">
            <p-treeTableHeaderCheckbox></p-treeTableHeaderCheckbox>
            <span class="ml-2">Toggle All</span>
        </div>
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
                <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0"></p-treeTableCheckbox>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>`,

        html: `
<div class="card">
    <p-treeTable [value]="files" [columns]="cols" selectionMode="checkbox" [(selection)]="selectedNodes" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="caption">
            <div class="flex">
                <p-treeTableHeaderCheckbox></p-treeTableHeaderCheckbox>
                <span class="ml-2">Toggle All</span>
            </div>
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
                    <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0"></p-treeTableCheckbox>
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
    selector: 'tree-table-selection-checkbox-demo',
    templateUrl: './tree-table-selection-checkbox-demo.html'
})
export class TreeTableSelectionCheckboxDemo implements OnInit {
    files: TreeNode[];

    selectedNodes: TreeNode[];

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
