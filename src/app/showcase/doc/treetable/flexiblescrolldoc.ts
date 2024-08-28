import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'flexible-scroll-doc',
    template: ` <app-docsectiontext>
            <p>
                Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data
                viewport adjusts itself according to the size changes.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-deferred-demo (load)="loadDemoData()">
                <p-button label="Show" icon="pi pi-external-link" (onClick)="dialogVisible = true" />
                <p-dialog [(visible)]="dialogVisible" header="Flex Scroll" [style]="{ width: '75vw' }" maximizable modal [contentStyle]="{ height: '300px' }">
                    <ng-template pTemplate="content">
                        <p-treeTable [value]="files" [scrollable]="true" scrollHeight="flex" [tableStyle]="{ 'min-width': '50rem' }">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Type</th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                                <tr [ttRow]="rowNode">
                                    <td>
                                        <p-treeTableToggler [rowNode]="rowNode" />
                                        {{ rowData.name }}
                                    </td>
                                    <td>{{ rowData.size }}</td>
                                    <td>{{ rowData.type }}</td>
                                </tr>
                            </ng-template>
                        </p-treeTable>
                    </ng-template>
                    <ng-template pTemplate="footer">
                        <p-button label="Ok" icon="pi pi-check" (onClick)="dialogVisible = false" />
                    </ng-template>
                </p-dialog>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-flexible-scroll-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollFlexibleDoc {
    files!: TreeNode[];

    dialogVisible: boolean = false;

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-button label="Show" icon="pi pi-external-link" (onClick)="dialogVisible = true" />
<p-dialog 
    [(visible)]="dialogVisible" 
    header="Flex Scroll" 
    [style]="{ width: '75vw' }" 
    maximizable 
    modal 
    [contentStyle]="{ height: '300px' }">
        <ng-template pTemplate="content">
            <p-treeTable 
                [value]="files" 
                [scrollable]="true" 
                scrollHeight="flex" 
                [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Type</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td>
                                <p-treeTableToggler [rowNode]="rowNode" />
                                {{ rowData.name }}
                            </td>
                            <td>
                                {{ rowData.size }}
                            </td>
                            <td>
                                {{ rowData.type }}
                            </td>
                        </tr>
                    </ng-template>
            </p-treeTable>
        </ng-template>
        <ng-template pTemplate="footer">
            <p-button label="Ok" icon="pi pi-check" (onClick)="dialogVisible = false" />
        </ng-template>
</p-dialog>`,

        html: `<div class="card">
    <p-button label="Show" icon="pi pi-external-link" (onClick)="dialogVisible = true" />
    <p-dialog 
        [(visible)]="dialogVisible" 
        header="Flex Scroll" 
        [style]="{ width: '75vw' }" 
        maximizable 
        modal 
        [contentStyle]="{ height: '300px' }">
            <ng-template pTemplate="content">
                <p-treeTable 
                    [value]="files" 
                    [scrollable]="true" 
                    scrollHeight="flex" 
                    [tableStyle]="{ 'min-width': '50rem' }">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Type</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                            <tr [ttRow]="rowNode">
                                <td>
                                    <p-treeTableToggler [rowNode]="rowNode" />
                                    {{ rowData.name }}
                                </td>
                                <td>
                                    {{ rowData.size }}
                                </td>
                                <td>
                                    {{ rowData.type }}
                                </td>
                            </tr>
                        </ng-template>
                </p-treeTable>
            </ng-template>
            <ng-template pTemplate="footer">
                <p-button label="Ok" icon="pi pi-check" (onClick)="dialogVisible = false" />
            </ng-template>
    </p-dialog>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'tree-table-flexible-scroll-demo',
    templateUrl: './tree-table-flexible-scroll-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule, DialogModule],
    providers: [NodeService]
})
export class TreeTableFlexibleScrollDemo implements OnInit {
    files!: TreeNode[];

    dialogVisible: boolean = false;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files;
        });
    }
}`,

        service: ['NodeService']
    };
}
