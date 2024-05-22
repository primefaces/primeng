import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'selection-single-doc',
    template: `
        <app-docsectiontext>
            <p>Single node selection is configured by setting <i>selectionMode</i> as <i>single</i> along with <i>selection</i> properties to manage the selection value binding.</p>
            <p>
                By default, metaKey press (e.g. <i>⌘</i>) is necessary to unselect a node however this can be configured with disabling the <i>metaKeySelection</i> property. In touch enabled devices this option has no effect and behavior is same as
                setting it to false
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex gap-3 align-items-center justify-content-center mb-4">
                <p-inputSwitch [(ngModel)]="metaKeySelection" />
                <span>Metakey</span>
            </div>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable [value]="files" [columns]="cols" selectionMode="single" [metaKeySelection]="metaKeySelection" [(selection)]="selectedNode" dataKey="name" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
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
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-treeTable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-selection-single-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionSingleDoc {
    metaKeySelection: boolean = true;

    files!: TreeNode[];

    selectedNode!: TreeNode;

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
    selectionMode="single" 
    [(selection)]="selectedNode" 
    dataKey="name" 
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
            <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                <td *ngFor="let col of columns; let i = index">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
</p-treeTable>`,

        html: `<div class="card">
    <div class="flex gap-3 align-items-center justify-content-center mb-4">
        <p-inputSwitch [(ngModel)]="metaKeySelection" />
        <span>Metakey</span>
    </div>
    <p-treeTable 
        [value]="files" 
        [columns]="cols" 
        selectionMode="single" 
        [(selection)]="selectedNode" 
        dataKey="name" 
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
                <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-selection-single-demo',
    templateUrl: './tree-table-selection-single-demo.html',
    standalone: true,
    imports: [TreeTableModule, InputSwitchModule, FormsModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSelectionSingleDemo implements OnInit {
    metaKeySelection: boolean = true;

    files!: TreeNode[];

    selectedNode!: TreeNode;

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
