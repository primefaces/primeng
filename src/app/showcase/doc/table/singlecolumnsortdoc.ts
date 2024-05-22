import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'single-column-sort-doc',
    template: ` <app-docsectiontext>
            <p>
                A column can be made sortable by adding the <i>pSortableColumn</i> directive whose value is the field to sort against and a sort indicator via <i>p-sortIcon</i> component. For dynamic columns, setting
                <i>pSortableColumnDisabled</i> property as true disables sorting for that particular column.
            </p>
            <p>Default sorting is executed on a single column, in order to enable multiple field sorting, set <i>sortMode</i> property to "multiple" and use metakey when clicking on another column.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="code" style="width:20%">Code <p-sortIcon field="code" /></th>
                            <th pSortableColumn="name" style="width:20%">Name <p-sortIcon field="name" /></th>
                            <th pSortableColumn="category" style="width:20%">Category <p-sortIcon field="category" /></th>
                            <th pSortableColumn="quantity" style="width:20%">Quantity <p-sortIcon field="quantity" /></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product>
                        <tr>
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-single-column-sort-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleColumnSortDoc {
    products!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-table [value]="products" [tableStyle]="{'min-width': '60rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="code" style="width:20%">
                Code <p-sortIcon field="code" />
            </th>
            <th pSortableColumn="name" style="width:20%">
                Name <p-sortIcon field="name" />
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
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="products" [tableStyle]="{'min-width': '60rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="code" style="width:20%">
                    Code <p-sortIcon field="code" />
                </th>
                <th pSortableColumn="name" style="width:20%">
                    Name <p-sortIcon field="name" />
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
    selector: 'table-single-column-sort-demo',
    templateUrl: 'table-single-column-sort-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule],
    providers: [ProductService]
})
export class TableSingleColumnSortDemo implements OnInit {
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
