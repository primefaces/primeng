import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SortEvent, TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';
import { TreeTable } from 'primeng/treetable';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'sort-removable-doc',
    template: `
        <app-docsectiontext>
            <p>The removable sort can be implemented using the <i>customSort</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable
                    #tt
                    [value]="files"
                    (sortFunction)="customSort($event)"
                    [customSort]="true"
                    [columns]="cols"
                    selectionMode="single"
                    [metaKeySelection]="metaKeySelection"
                    [(selection)]="selectedNode"
                    dataKey="name"
                    [scrollable]="true"
                    [tableStyle]="{ 'min-width': '50rem' }"
                >
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th *ngFor="let col of columns" [ttSortableColumn]="col.field">
                                {{ col.header }}
                                <p-treeTableSortIcon [field]="col.field" />
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
        <app-code [code]="code" selector="tree-table-sort-removable-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortRemovableDoc {
    @ViewChild('tt') tt: TreeTable;

    metaKeySelection: boolean = true;

    files!: TreeNode[];

    initialValue: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    isSorted: boolean = null;

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files;
            this.initialValue = [...files];
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }
    customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.files = [...this.initialValue];
            this.tt.reset();
        }
    }

    sortTableData(event) {
        event.data.sort((data1, data2) => {
            let value1 = data1.data[event.field];
            let value2 = data2.data[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
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
    selector: 'tree-table-sort-removable-demo',
    templateUrl: './tree-table-sort-removable-demo.html',
    standalone: true,
    imports: [TreeTableModule, InputSwitchModule, FormsModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableSortRemovableDemo implements OnInit {
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
