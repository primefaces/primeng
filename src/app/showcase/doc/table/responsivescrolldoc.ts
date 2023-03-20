import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'responsive-scroll-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3">
            <p>When there is not enough space for the table to fit all the content efficiently, table displays a horizontal scrollbar. It is suggested to give a min-width to the table to avoid design issues due wrapping of cell contents.</p>
            <p>Following table displays a horizontal scrollbar when viewport is smaller than 50rem.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header" let-columns>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Reviews</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product let-columns="columns">
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <span [class]="'product-badge status-' + (product.inventoryStatus ? product.inventoryStatus.toLowerCase() : '')">{{ product.inventoryStatus }}</span>
                        </td>
                        <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-responsive-scroll-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveScrollDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    products: Product[];

    cols: any[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'inventoryStatus', header: 'Status' },
            { field: 'rating', header: 'Rating' }
        ];
    }

    code: Code = {
        basic: `
<p-table [value]="products" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th>Name </th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Reviews</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product let-columns="columns">
        <tr>
            <td>{{product.name}}</td>
            <td>{{product.price | currency:'USD'}}</td>
            <td>{{product.category}}</td>
            <td>{{product.quantity}}</td>
            <td><span [class]="'product-badge status-' + (product.inventoryStatus ? product.inventoryStatus.toLowerCase() : '')">{{product.inventoryStatus}}</span></td>
            <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th>Name </th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Reviews</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-columns="columns">
            <tr>
                <td>{{product.name}}</td>
                <td>{{product.price | currency:'USD'}}</td>
                <td>{{product.category}}</td>
                <td>{{product.quantity}}</td>
                <td><span [class]="'product-badge status-' + (product.inventoryStatus ? product.inventoryStatus.toLowerCase() : '')">{{product.inventoryStatus}}</span></td>
                <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-responsive-scroll-demo',
    templateUrl: 'table-responsive-scroll-demo.html',
    styleUrls: ['table-responsive-scroll-demo.scss']
})
export class TableResponsiveScrollDemo implements OnInit{
    products: Product[];

    cols: any[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'inventoryStatus', header: 'Status' },
            { field: 'rating', header: 'Rating' }
        ];
    }
}`,
        scss: `
.product-badge {
    border-radius: 2px;
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.status-instock {
        background: #C8E6C9;
        color: #256029;
    }
    
    &.status-outofstock {
        background: #FFCDD2;
        color: #C63737;
    }
    
    &.status-lowstock {
        background: #FEEDAF;
        color: #8A5340;
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
