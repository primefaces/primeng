import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'singlecolumnsort-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>
                A column can be made sortable by adding the <i>pSortableColumn</i> directive whose value is the field to sort against and a sort indicator via <i>p-sort-icon</i> component. For dynamic columns, setting
                <i>pSortableColumnDisabled</i> property as true disables sorting for that particular column.
            </p>
            <p>
                Default sorting is executed on a single column, in order to enable multiple field sorting, set <i>sortMode</i>
                property to "multiple" and use metakey when clicking on another column.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <app-demo-wrapper>
                <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
                    <ng-template #header>
                        <tr>
                            <th pSortableColumn="code" style="width:20%">
                                <div class="flex items-center gap-2">
                                    Code
                                    <p-sort-icon field="code" />
                                </div>
                            </th>
                            <th pSortableColumn="name" style="width:20%">
                                <div class="flex items-center gap-2">
                                    Name
                                    <p-sort-icon field="name" />
                                </div>
                            </th>
                            <th pSortableColumn="category" style="width:20%">
                                <div class="flex items-center gap-2">
                                    Category
                                    <p-sort-icon field="category" />
                                </div>
                            </th>
                            <th pSortableColumn="quantity" style="width:20%">
                                <div class="flex items-center gap-2">
                                    Quantity
                                    <p-sort-icon field="quantity" />
                                </div>
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
                <app-code [extFiles]="['Product']"></app-code>
            </app-demo-wrapper>
        </p-deferred-demo>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleColumnSortDoc {
    products!: Product[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }
}
