import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { NodeService } from '@/service/nodeservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'lazyload-doc',
    standalone: true,
    imports: [CommonModule, TreeTableModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime <i>paging</i>, <i>sorting</i> and <i>filtering</i> occurs. Sample below
                imitates lazy loading data from a remote datasource using an in-memory list and timeouts to mimic network connection.
            </p>
            <p>
                Enabling the <i>lazy</i> property and assigning the logical number of rows to <i>totalRecords</i> by doing a projection query are the key elements of the implementation so that paginator displays the UI assuming there are actually
                records of totalRecords size although in reality they are not present on page, only the records that are displayed on the current page exist.
            </p>
            <p>In addition, only the root elements should be loaded, children can be loaded on demand using <i>onNodeExpand</i> callback.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treetable
                [value]="files"
                [columns]="cols"
                [paginator]="true"
                [rows]="10"
                [lazy]="true"
                (onLazyLoad)="loadNodes($event)"
                [totalRecords]="1000"
                [loading]="loading"
                (onNodeExpand)="onNodeExpand($event)"
                [scrollable]="true"
                [tableStyle]="{ 'min-width': '50rem' }"
            >
                <ng-template #header let-columns>
                    <tr>
                        @for (col of columns; track col) {
                            <th>
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
        </div>
        <app-code></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadDoc implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    totalRecords!: number;

    loading: boolean = false;

    constructor(
        private nodeService: NodeService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.totalRecords = 1000;

        this.loading = true;
    }

    loadNodes(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.files = [];

            for (let i = 0; i < event.rows; i++) {
                let node = {
                    data: {
                        name: 'Item ' + (event.first + i),
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'Type ' + (event.first + i)
                    },
                    leaf: false
                };

                this.files.push(node);
            }
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    onNodeExpand(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {
                        name: node.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                },
                {
                    data: {
                        name: node.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            this.files = [...this.files];
            this.cd.markForCheck();
        }, 250);
    }
}
