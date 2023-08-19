import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'page-only-selection-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext></app-docsectiontext>
        <div class="card">
            <p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [paginator]="true" [rows]="5" [selectionPageOnly]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th style="min-width:200px">Code</th>
                        <th style="min-width:200px">Name</th>
                        <th style="min-width:200px">Category</th>
                        <th style="min-width:200px">Quantity</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="product"></p-tableCheckbox>
                        </td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-page-only-selection-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageOnlySelectionDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    products!: Product[];

    selectedProducts!: Product;

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [paginator]="true" [rows]="5" [selectionPageOnly]="true" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th style="min-width:200px">Code</th>
            <th style="min-width:200px">Name</th>
            <th style="min-width:200px">Category</th>
            <th style="min-width:200px">Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>
                <p-tableCheckbox [value]="product"></p-tableCheckbox>
            </td>
            <td>{{product.code}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category}}</td>
            <td>{{product.quantity}}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [paginator]="true" [rows]="5" [selectionPageOnly]="true" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 4rem">
                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                </th>
                <th style="min-width:200px">Code</th>
                <th style="min-width:200px">Name</th>
                <th style="min-width:200px">Category</th>
                <th style="min-width:200px">Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>
                    <p-tableCheckbox [value]="product"></p-tableCheckbox>
                </td>
                <td>{{product.code}}</td>
                <td>{{product.name}}</td>
                <td>{{product.category}}</td>
                <td>{{product.quantity}}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-page-only-selection-demo',
    templateUrl: 'table-page-only-selection-demo.html'
})
export class TablePageOnlySelectionDemo implements OnInit{
    products!: Product[];

    selectedProducts!: Product;

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
