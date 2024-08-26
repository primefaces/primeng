import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Code } from '@domain/code';
import { NodeService } from '@service/nodeservice';

@Component({
    selector: 'size-doc',
    template: ` <section class="py-6">
        <app-docsectiontext>
            <p>In addition to a regular treetable, alternatives with alternative sizes are available. Add <i>p-treetable-sm</i> class to reduce the size of treetable or <i>p-treetable-lg</i> to enlarge it.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-center mb-4">
                <p-selectButton [options]="sizes" [(ngModel)]="selectedSize" [multiple]="false" optionLabel="name" optionValue="class" />
            </div>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treeTable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" [styleClass]="selectedSize">
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
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-size-demo"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeDoc {
    files!: TreeNode[];

    sizes!: any[];

    selectedSize: any = '';

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));

        this.sizes = [
            { name: 'Small', class: 'p-treetable-sm' },
            { name: 'Normal', class: '' },
            { name: 'Large', class: 'p-treetable-lg' }
        ];
    }

    code: Code = {
        basic: `<div class="flex justify-center mb-4">
    <p-selectButton 
        [options]="sizes" 
        [(ngModel)]="selectedSize" 
        [multiple]="false" 
        optionLabel="name" 
        optionValue="class" />
</div>
<p-treeTable 
    [value]="files" 
    [scrollable]="true" 
    [tableStyle]="{'min-width':'50rem'}" 
    [styleClass]="selectedSize">
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
    <div class="flex justify-center mb-4">
        <p-selectButton 
            [options]="sizes" 
            [(ngModel)]="selectedSize" 
            [multiple]="false" 
            optionLabel="name" 
            optionValue="class" />
    </div>
    <p-treeTable 
        [value]="files" 
        [scrollable]="true" 
        [tableStyle]="{'min-width':'50rem'}" 
        [styleClass]="selectedSize">
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

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'tree-table-size-demo',
    templateUrl: './tree-table-size-demo.html',
    standalone: true,
    imports: [TreeTableModule, SelectButtonModule, FormsModule],
    providers: [NodeService]
})
export class TreeTableSizeDemo implements OnInit {
    files!: TreeNode[];

    sizes!: any[];

    selectedSize: any = '';

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.sizes = [
            { name: 'Small', class: 'p-treetable-sm' },
            { name: 'Normal', class: '' },
            { name: 'Large', class: 'p-treetable-lg' }
        ];
    }
}`,

        service: ['NodeService']
    };
}
