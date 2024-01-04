import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'striped-doc',
    template: ` <app-docsectiontext>
            <p>Adding <i>p-datatable-striped</i> class displays striped rows.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" styleClass="p-datatable-striped" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
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
        <app-code [code]="code" selector="table-striped-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripedDoc {
    products!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-table [value]="products" styleClass="p-datatable-striped" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{product.code}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category}}</td>
            <td>{{product.quantity}}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products" styleClass="p-datatable-striped" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{product.code}}</td>
                <td>{{product.name}}</td>
                <td>{{product.category}}</td>
                <td>{{product.quantity}}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-striped-demo',
    templateUrl: 'table-striped-demo.html'
})
export class TableStripedDemo {
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
