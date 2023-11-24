import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'context-menu-doc',
    template: `
        <app-docsectiontext>
            <p>TreeTable has exclusive integration with ContextMenu using the <i>contextMenu</i> event to open a menu on right click alont with <i>contextMenuSelection</i> properties to control the selection via the menu.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast [style]="{ marginTop: '80px' }"></p-toast>

            <p-treeTable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
                    <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
                        <td *ngFor="let col of columns; let i = index">
                            <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-treeTable>

            <p-contextMenu #cm [model]="items"></p-contextMenu>
        </div>
        <app-code [code]="code" selector="tree-table-context-menu-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ContextMenuDoc implements OnInit {
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    items!: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node: any) {
        this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node: any) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }

    code: Code = {
        basic: `
<p-toast [style]="{ marginTop: '80px' }"></p-toast>

<p-treeTable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
            <td *ngFor="let col of columns; let i = index">
                <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-treeTable>

<p-contextMenu #cm [model]="items"></p-contextMenu>`,

        html: `
<div class="card">
    <p-toast [style]="{ marginTop: '80px' }"></p-toast>

    <p-treeTable [value]="files" [columns]="cols" dataKey="name" [(contextMenuSelection)]="selectedNode" [contextMenu]="cm" [scrollable]="true" [tableStyle]="{'min-width':'50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode" [ttContextMenuRow]="rowNode">
                <td *ngFor="let col of columns; let i = index">
                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"></p-treeTableToggler>
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
    </p-treeTable>

    <p-contextMenu #cm [model]="items"></p-contextMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-context-menu-demo',
    templateUrl: './tree-table-context-menu-demo.html'
    providers: [MessageService]
})
export class TreeTableContextMenuDemo implements OnInit{
    files!: TreeNode[];

    selectedNode!: TreeNode;

    cols!: Column[];

    items!: MenuItem[];

    constructor(private nodeService: NodeService, private messageService: MessageService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node: any) {
        this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node: any) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }
}`,

        service: ['NodeService']
    };
}
