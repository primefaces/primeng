import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'productlistdemo-doc',
    template: `<div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>ProductListDemo component used in examples above.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="products" responsiveLayout="scroll" [paginator]="true" [rows]="5" [responsive]="true">
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="name">Name <p-sortIcon field="vin"></p-sortIcon></th>
                        <th pSortableColumn="year">Image</th>
                        <th pSortableColumn="price">Brand <p-sortIcon field="price"></p-sortIcon></th>
                        <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                        <th style="width:4em"></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-4rem h-4rem shadow-2" /></td>
                        <td>{{ product.price }}</td>
                        <td>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                        </td>
                        <td>
                            <button type="button" pButton icon="pi pi-plus" (click)="selectProduct(product)"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" [hideStackBlitz]="true" [hideCodeSandbox]="true" [extFiles]="extFiles"></app-code>
    </div> `,
    providers: [DynamicDialogRef]
})
export class ProductListDemoDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    products: Product[];

    constructor(private productService: ProductService, public ref: DynamicDialogRef) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products));
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    code: Code = {
        basic: `
<p-table [value]="products" responsiveLayout="scroll" [paginator]="true" [rows]="5" [responsive]="true">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="name">Name <p-sortIcon field="vin"></p-sortIcon></th>
            <th pSortableColumn="year">Image</th>
            <th pSortableColumn="price">Brand <p-sortIcon field="price"></p-sortIcon></th>
            <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
            <th style="width:4em"></th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{ product.name }}</td>
            <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-4rem h-4rem shadow-2"/></td>
            <td>{{ product.price }}</td>
            <td>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
            </td>
            <td>
                <button type="button" pButton icon="pi pi-plus" (click)="selectProduct(product)"></button>
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products" responsiveLayout="scroll" [paginator]="true" [rows]="5" [responsive]="true">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="name">Name <p-sortIcon field="vin"></p-sortIcon></th>
                <th pSortableColumn="year">Image</th>
                <th pSortableColumn="price">Brand <p-sortIcon field="price"></p-sortIcon></th>
                <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                <th style="width:4em"></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{ product.name }}</td>
                <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-4rem h-4rem shadow-2"/></td>
                <td>{{ product.price }}</td>
                <td>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </td>
                <td>
                    <button type="button" pButton icon="pi pi-plus" (click)="selectProduct(product)"></button>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
        
@Component({
    selector: 'product-list-demo',
    templateUrl: './productlistdemo.html',
    providers: [DynamicDialogRef]
})
export class ProductListDemo implements OnInit {

    products: Product[];

    constructor(private productService: ProductService, public ref: DynamicDialogRef) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products));
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}`,
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
