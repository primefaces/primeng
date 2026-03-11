import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'reorder-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>
                Order of the columns and rows can be changed using drag and drop. Column reordering is configured by adding
                <i>reorderableColumns</i> property.
            </p>
            <p>
                Similarly, adding <i>reorderableRows</i> property enables draggable rows. For the drag handle a column needs to have <i>rowReorder</i> property and <i>onRowReorder</i> callback is required to control the state of the rows after
                reorder completes.
            </p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-table [value]="products" [columns]="cols" [reorderableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            <th style="width:3rem"></th>
                            @for (col of columns; track col) {
                                <th pReorderableColumn>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowData let-columns="columns" let-index="rowIndex">
                        <tr [pReorderableRow]="index">
                            <td>
                                <span class="pi pi-bars" pReorderableRowHandle></span>
                            </td>
                            @for (col of columns; track col) {
                                <td>
                                    {{ rowData[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-table>
            </p-deferred-demo>
            <app-code [extFiles]="['Product']"></app-code>
        </app-demo-wrapper>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReorderDoc {
    products!: Product[];

    cols!: Column[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }
}
