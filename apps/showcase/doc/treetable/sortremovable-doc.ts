import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SortEvent, TreeNode } from 'primeng/api';
import { TreeTable, TreeTableModule } from 'primeng/treetable';
import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'sort-removable-doc',
    standalone: true,
    imports: [TreeTableModule, DeferredDemo, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The removable sort can be implemented using the <i>customSort</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable
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
                    <ng-template #header let-columns>
                        <tr>
                            @for (col of columns; track col.field) {
                                <th [ttSortableColumn]="col.field">
                                    {{ col.header }}
                                    <p-treetableSortIcon [field]="col.field" />
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                            @for (col of columns; track col.field; let i = $index) {
                                <td>
                                    @if (i === 0) {
                                        <p-treetable-toggler [rowNode]="rowNode" />
                                    }
                                    {{ rowData[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
            <app-code></app-code>
        </app-demo-wrapper>
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
}
