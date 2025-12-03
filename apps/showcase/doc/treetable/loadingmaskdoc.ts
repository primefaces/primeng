import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { finalize, timer } from 'rxjs';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-loading-mask-doc',
    standalone: true,
    imports: [TreeTableModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>The <i>loading</i> property displays a mask layer to indicate busy state. Use the paginator to display the mask.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-treetable [value]="files" [columns]="cols" [paginator]="true" [rows]="5" [scrollable]="true" [loading]="loading()" [tableStyle]="{ 'min-width': '50rem' }" (onPage)="handlePage()">
                    <ng-template #header>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Type</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td>
                                <div class="flex items-center gap-2">
                                    <p-treetable-toggler [rowNode]="rowNode" />
                                    <span>{{ rowData.name }}</span>
                                </div>
                            </td>
                            <td>{{ rowData.size }}</td>
                            <td>{{ rowData.type }}</td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="tree-table-loading-mask-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingMaskDoc {
    files!: TreeNode[];

    cols!: Column[];

    loading = signal(false);

    loadDemoData() {
        this.files = [];

        for (let i = 0; i < 15; i++) {
            let node = {
                data: {
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    handlePage() {
        this.loading.set(true);
        timer(500)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe();
    }

    code: Code = {
        basic: `<p-treetable [value]="files" [columns]="cols" [paginator]="true" [rows]="5" [scrollable]="true" [loading]="loading()" [tableStyle]="{ 'min-width': '50rem' }" (onPage)="handlePage()">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <div class="flex items-center gap-2">
                    <p-treetable-toggler [rowNode]="rowNode" />
                    <span>{{ rowData.name }}</span>
                </div>
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>`,

        html: `<div class="card">
    <p-treetable [value]="files" [columns]="cols" [paginator]="true" [rows]="5" [scrollable]="true" [loading]="loading()" [tableStyle]="{ 'min-width': '50rem' }" (onPage)="handlePage()">
        <ng-template #header>
            <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
            </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData">
            <tr [ttRow]="rowNode">
                <td>
                    <div class="flex items-center gap-2">
                        <p-treetable-toggler [rowNode]="rowNode" />
                        <span>{{ rowData.name }}</span>
                    </div>
                </td>
                <td>{{ rowData.size }}</td>
                <td>{{ rowData.type }}</td>
            </tr>
        </ng-template>
    </p-treetable>
</div>`,
        typescript: `import { Component, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { finalize, timer } from 'rxjs';


interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-loading-mask-demo',
    templateUrl: 'tree-table-loading-mask.html',
    standalone: true,
    imports: [TreeTableModule],
    providers: [ProductService]
})
export class LoadingMaskDemo implements OnInit {
    
    files!: TreeNode[];

    cols!: Column[];

    loading = signal(false);

    ngOnInit() {
        this.files = [];
        
        for(let i = 0; i < 15; i++) {
            let node = {
                data:{
                    name: 'Item ' + i,
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + i
                },
                children: [
                    {
                        data: {
                            name: 'Item ' + i + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'Type ' + i
                        }
                    }
                ]
            };

            this.files.push(node);
        }

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    handlePage() {
        this.loading.set(true);
        timer(500)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe();
    }
}`
    };
}
