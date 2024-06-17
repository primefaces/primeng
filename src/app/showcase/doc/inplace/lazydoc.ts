import { Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'lazy-doc',
    template: `
        <app-docsectiontext>
            <p>Using the <i>onActivate</i> event, data can be loaded in a lazy manner before displaying it in a table.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace (onActivate)="loadData()">
                <ng-template pTemplate="display">
                    <span>View Data</span>
                </ng-template>
                <ng-template pTemplate="content">
                    <p-table [value]="products" responsiveLayout="scroll">
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
                </ng-template>
            </p-inplace>
        </div>
        <app-code [code]="code" selector="inplace-lazy-demo"></app-code>
    `
})
export class LazyDoc {
    products: Product[] | undefined;

    constructor(private productService: ProductService) {}

    loadData() {
        this.productService.getProductsSmall().then((products) => (this.products = products));
    }

    code: Code = {
        basic: `<p-inplace (onActivate)="loadData()">
    <ng-template pTemplate="display">
        <span>View Data</span>
    </ng-template>
    <ng-template pTemplate="content">
        <p-table [value]="products" responsiveLayout="scroll">
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
    </ng-template>
</p-inplace>`,
        html: `<div class="card">
    <p-inplace (onActivate)="loadData()">
        <ng-template pTemplate="display">
            <span>View Data</span>
        </ng-template>
        <ng-template pTemplate="content">
            <p-table [value]="products" responsiveLayout="scroll">
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
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'inplace-lazy-demo',
    templateUrl: './inplace-lazy-demo.html',
    standalone: true,
    imports: [InplaceModule, TableModule],
    providers: [ProductService]
})
export class InplaceLazyDemo {
    products: Product[] | undefined;

    constructor(private productService: ProductService) {}

    loadData() {
        this.productService.getProductsSmall().then((products) => (this.products = products));
    }
}`,
        data: `
/* ProductService */        
{
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
