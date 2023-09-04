import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'single-column-sort-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Multiple columns can be sorted by defining <i>sortMode</i> as <i>multiple</i>. This mode requires metaKey (e.g. <i>⌘</i>) to be pressed when clicking a header.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }" sortMode="multiple">
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="code" style="width:20%">Code <p-sortIcon field="code"></p-sortIcon></th>
                        <th pSortableColumn="name" style="width:20%">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="category" style="width:20%">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th pSortableColumn="quantity" style="width:20%">Quantity <p-sortIcon field="quantity"></p-sortIcon></th>
                        <th pSortableColumn="price" style="width:20%">Price <p-sortIcon field="price"></p-sortIcon></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.price | currency : 'USD' }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-single-column-sort-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleColumnSortDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    products: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<p-table [value]="products1" [tableStyle]="{'min-width': '60rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="code" style="width:20%">Code <p-sortIcon field="code"></p-sortIcon></th>
            <th pSortableColumn="name" style="width:20%">Name <p-sortIcon field="name"></p-sortIcon></th>
            <th pSortableColumn="category" style="width:20%">Category <p-sortIcon field="category"></p-sortIcon></th>
            <th pSortableColumn="quantity" style="width:20%">Quantity <p-sortIcon field="quantity"></p-sortIcon></th>
            <th pSortableColumn="price" style="width:20%">Price <p-sortIcon field="price"></p-sortIcon></th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{product.code}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category}}</td>
            <td>{{product.quantity}}</td>
            <td>{{product.price | currency: 'USD'}}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products1" [tableStyle]="{'min-width': '60rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="code" style="width:20%">Code <p-sortIcon field="code"></p-sortIcon></th>
                <th pSortableColumn="name" style="width:20%">Name <p-sortIcon field="name"></p-sortIcon></th>
                <th pSortableColumn="category" style="width:20%">Category <p-sortIcon field="category"></p-sortIcon></th>
                <th pSortableColumn="quantity" style="width:20%">Quantity <p-sortIcon field="quantity"></p-sortIcon></th>
                <th pSortableColumn="price" style="width:20%">Price <p-sortIcon field="price"></p-sortIcon></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{product.code}}</td>
                <td>{{product.name}}</td>
                <td>{{product.category}}</td>
                <td>{{product.quantity}}</td>
                <td>{{product.price | currency: 'USD'}}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-single-column-sort-demo',
    templateUrl: 'table-single-column-sort-demo.html'
})
export class TableSingleColumnSortDemo implements OnInit {
    products: Product[];

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
