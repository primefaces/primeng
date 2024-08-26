import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'controlled-doc',
    template: ` <app-docsectiontext>
            <p>Expansion state is controlled with <i>expandedKeys</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-button (click)="toggleApplications()" label="Toggle Applications" />
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable
                    [value]="files"
                    [scrollable]="true"
                    [tableStyle]="{ 'min-width': '50rem' }"
                    styleClass="mt-6"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="width:34%;">Name</th>
                            <th style="width:34%;">Size</th>
                            <th style="width:34%;">Type</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td style="width:34%;">
                                <p-treeTableToggler [rowNode]="rowNode" />
                                {{ rowData.name }}
                            </td>
                            <td style="width:34%;">{{ rowData.size }}</td>
                            <td style="width:34%;">{{ rowData.type }}</td>
                        </tr>
                    </ng-template>
                </p-treeTable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-controlled-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlledDoc {
    files!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files.slice(0, 5);
            this.cd.markForCheck();
        });
    }

    toggleApplications() {
        if (this.files && this.files.length > 0) {
            const newFiles = [...this.files];
            newFiles[0] = { ...newFiles[0], expanded: !newFiles[0].expanded };
            this.files = newFiles;
        }
    }

    code: Code = {
        basic: `<p-button (click)="toggleApplications()" label="Toggle Applications" />
<p-treeTable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" styleClass="mt-6">
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
</p-treeTable>`,

        html: `<div class="card">
<p-button (click)="toggleApplications()" label="Toggle Applications" />
<p-treeTable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" styleClass="mt-6">
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
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tree-table-controlled-demo',
    templateUrl: './tree-table-controlled-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule],
    providers: [NodeService]
})
export class TreeTableControlledDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files.slice(0, 5);
            this.cd.markForCheck();
        });
    }

    toggleApplications() {
        if (this.files && this.files.length > 0) {
            const newFiles = [...this.files];
            newFiles[0] = { ...newFiles[0], expanded: !newFiles[0].expanded };
            this.files = newFiles;
        }
    }
}`,

        service: ['NodeService'],
    };
}
