import { Component, Input, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'selection-events-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>TreeTable provides <i>onNodeSelect</i> and <i>onNodeUnselect</i> events to listen selection events.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast></p-toast>
            <p-treeTable
                [value]="files"
                [columns]="cols"
                selectionMode="single"
                [(selection)]="selectedNode"
                dataKey="name"
                (onNodeSelect)="nodeSelect($event)"
                (onNodeUnselect)="nodeUnselect($event)"
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
                    <tr [ttRow]="rowNode" [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                        <td *ngFor="let col of columns; let i = index">
                            <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-treeTable>
        </div>
        <app-code [code]="code" selector="tree-table-selection-events-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class SelectionEventsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    files: TreeNode[];

    selectedNode: TreeNode;

    cols: any[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    nodeSelect(event) {
        this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    }

    nodeUnselect(event) {
        this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
    }

    code: Code = {
        basic: `
<p-treeTable [value]="files" [columns]="cols" selectionMode="single" [(selection)]="selectedNode" dataKey="name" (onNodeSelect)="nodeSelect($event)" (onNodeUnselect)="nodeUnselect($event)" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttRow]="rowNode" [ttSelectableRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>`,

        html: `
<div class="card">
    <p-toast></p-toast>
    <p-treeTable [value]="files" [columns]="cols" selectionMode="single" [(selection)]="selectedNode" dataKey="name" (onNodeSelect)="nodeSelect($event)" (onNodeUnselect)="nodeUnselect($event)" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode" [ttRow]="rowNode" [ttSelectableRow]="rowNode">
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
import { MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    selector: 'tree-table-selection-events-demo',
    templateUrl: './tree-table-selection-events-demo.html',
    providers: [MessageService]
})
export class TreeTableSelectionEventsDemo implements OnInit {
    files: TreeNode[];

    selectedNode: TreeNode;

    cols: any[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    nodeSelect(event) {
        this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    }

    nodeUnselect(event) {
        this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.name });
    }
}`,

        service: ['NodeService']
    };
}
