import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'presort-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper, CommonModule],
    template: `
        <app-docsectiontext>
            <p>
                Defining a default <i>sortField</i> and <i>sortOrder</i> displays data as sorted initially in single column sorting. In <i>multiple</i> sort mode, <i>multiSortMeta</i> should be used instead by providing an array of
                <i>DataTableSortMeta</i> objects.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <app-demo-wrapper>
                <p-table [value]="products" sortField="price" [sortOrder]="-1" [tableStyle]="{ 'min-width': '60rem' }">
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
                            <th pSortableColumn="price" style="width:20%">
                                <div class="flex items-center gap-2">
                                    Price
                                    <p-sort-icon field="price" />
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
                            <td>{{ product.price | currency: 'USD' }}</td>
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
export class PreSortDoc {
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

    extFiles = [
        {
            path: 'src/domain/product.ts',
            content: `
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}`
        }
    ];
}
