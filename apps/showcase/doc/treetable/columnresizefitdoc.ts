import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'resize-fit-doc',
    standalone: true,
    imports: [CommonModule, TreeTableModule, DeferredDemo, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Columns can be resized with drag and drop when <i>resizableColumns</i> is enabled. Default resize mode is <i>fit</i> that does not change the overall table width.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" [resizableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }" showGridlines>
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col) {
                                <th ttResizableColumn>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode">
                            @for (col of columns; let first = $first; track col) {
                                <td>
                                    @if (first) {
                                        <div class="flex items-center gap-2">
                                            <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                                            <span>{{ rowData[col.field] }}</span>
                                        </div>
                                    } @else {
                                        {{ rowData[col.field] }}
                                    }
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-resize-fit-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizeFitDoc {
    files!: TreeNode[];

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
        basic: `<p-treetable [value]="files" [columns]="cols" [resizableColumns]="true" [tableStyle]="{'min-width': '50rem'}" showGridlines>
    <ng-template #header let-columns>
        <tr>
            @for (col of columns; track col) {
                <th ttResizableColumn>
                    {{ col.header }}
                </th>
            }
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            @for (col of columns; let first = $first; track col) {
                <td>
                    @if (first) {
                        <div class="flex items-center gap-2">
                            <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                            <span>{{ rowData[col.field] }}</span>
                        </div>
                    } @else {
                        {{ rowData[col.field] }}
                    }
                </td>
            }
        </tr>
    </ng-template>
</p-treetable>`,

        html: `<div class="card">
    <p-treetable [value]="files" [columns]="cols" [resizableColumns]="true" [tableStyle]="{'min-width': '50rem'}" showGridlines>
        <ng-template #header let-columns>
            <tr>
                @for (col of columns; track col) {
                    <th ttResizableColumn>
                        {{ col.header }}
                    </th>
                }
            </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                @for (col of columns; let first = $first; track col) {
                    <td>
                        @if (first) {
                            <div class="flex items-center gap-2">
                                <p-treetable-toggler [rowNode]="rowNode"></p-treetable-toggler>
                                <span>{{ rowData[col.field] }}</span>
                            </div>
                        } @else {
                            {{ rowData[col.field] }}
                        }
                    </td>
                }
            </tr>
        </ng-template>
    </p-treetable>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-resize-fit-demo',
    templateUrl: './tree-table-resize-fit-demo.html',
    standalone: true,
    imports: [TreeTableModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableResizeFitDemo implements OnInit {
    files!: TreeNode[];

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
