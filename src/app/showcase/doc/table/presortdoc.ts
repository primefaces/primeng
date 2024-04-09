import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'presort-doc',
    template: ` <app-docsectiontext>
            <p>
                Defining a default <i>sortField</i> and <i>sortOrder</i> displays data as sorted initially in single column sorting. In <i>multiple</i> sort mode, <i>multiSortMeta</i> should be used instead by providing an array of
                <i>DataTableSortMeta</i> objects.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" sortField="price" [sortOrder]="-1"  [tableStyle]="{ 'min-width': '60rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="code" style="width:20%">Code <p-sortIcon field="code" /></th>
                            <th pSortableColumn="name" style="width:20%">Name <p-sortIcon field="name" /></th>
                            <th pSortableColumn="price" style="width:20%">Price <p-sortIcon field="price" /></th>
                            <th pSortableColumn="category" style="width:20%">Category <p-sortIcon field="category" /></th>
                            <th pSortableColumn="quantity" style="width:20%">Quantity <p-sortIcon field="quantity" /></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product>
                        <tr>
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price | currency : 'USD' }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-presort-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreSortDoc {
    products!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-table [value]="products" sortField="price" [sortOrder]="-1" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="code" style="width:20%">
                Code <p-sortIcon field="code" />
            </th>
            <th pSortableColumn="name" style="width:20%">
                Name <p-sortIcon field="name" />
            </th>
            <th pSortableColumn="price" style="width:20%">
                Price <p-sortIcon field="price" />
            </th>
            <th pSortableColumn="category" style="width:20%">
                Category <p-sortIcon field="category" />
            </th>
            <th pSortableColumn="quantity" style="width:20%">
                Quantity <p-sortIcon field="quantity" />
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price | currency : 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="products" sortField="price" [sortOrder]="-1" [tableStyle]="{ 'min-width': '60rem' }">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="code" style="width:20%">
                    Code <p-sortIcon field="code" />
                </th>
                <th pSortableColumn="name" style="width:20%">
                    Name <p-sortIcon field="name" />
                </th>
                <th pSortableColumn="price" style="width:20%">
                    Price <p-sortIcon field="price" />
                </th>
                <th pSortableColumn="category" style="width:20%">
                    Category <p-sortIcon field="category" />
                </th>
                <th pSortableColumn="quantity" style="width:20%">
                    Quantity <p-sortIcon field="quantity" />
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price | currency : 'USD' }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'table-presort-demo',
    templateUrl: 'table-presort-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule],
    providers: [ProductService]
})
export class TablePreSortDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}`,
        data: `{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
...`,
        service: ['ProductService']
    };

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
