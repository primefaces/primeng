import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'selection-checkbox-doc',
    template: `
        <app-docsectiontext>
            <p>Selection of multiple nodes via checkboxes is enabled by configuring <i>selectionMode</i> as <i>checkbox</i>.</p>
            <p>
                In checkbox selection mode, value binding should be a key-value pair where key (or the dataKey) is the node key and value is an object that has <i>checked</i> and <i>partialChecked</i> properties to represent the checked state of a
                node.
            </p>
        </app-docsectiontext>
        <app-code [code]="code2" selector="selection-keys" [hideToggleCode]="true"></app-code>
        <div class="card mt-3">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable [value]="files" [columns]="cols" selectionMode="checkbox" [(selectionKeys)]="selectionKeys" dataKey="key" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
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
                        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                            <td *ngFor="let col of columns; let i = index">
                                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                                <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0" />
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-treeTable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-selection-checkbox-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionCheckboxDoc {
    files!: TreeNode[];

    selectionKeys = {};

    cols!: Column[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.nodeService.getTreeTableNodes().then((files) => {
            this.files = files;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    code: Code = {
        basic: `<p-treeTable [value]="files" [columns]="cols" selectionMode="checkbox" [(selectionKeys)]="selectionKeys" dataKey="key" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
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
        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0"></p-treeTableCheckbox>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <p-treeTable [value]="files" [columns]="cols" selectionMode="checkbox" [(selectionKeys)]="selectionKeys" dataKey="key" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
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
            <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                <td *ngFor="let col of columns; let i = index">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                    <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
</p-treeTable>`,

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
    selector: 'tree-table-selection-checkbox-demo',
    templateUrl: './tree-table-selection-checkbox-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSelectionCheckboxDemo implements OnInit {
    files!: TreeNode[];

    selectionKeys = {};

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getTreeTableNodes().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
}`,

        service: ['NodeService']
    };

    code2: Code = {
        typescript: `{
    '0-0': {
        partialChecked: false,
        checked: true
    }
}`
    };
}
