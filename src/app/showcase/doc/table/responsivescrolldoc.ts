import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'responsive-scroll-doc',
    template: ` <app-docsectiontext>
            <p>When there is not enough space for the table to fit all the content efficiently, table displays a horizontal scrollbar. It is suggested to give a min-width to the table to avoid design issues due wrapping of cell contents.</p>
            <p>Following table displays a horizontal scrollbar when viewport is smaller than 50rem.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
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
                            <td>{{ product.price | currency : 'USD' }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                            </td>
                            <td><p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" /></td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-responsive-scroll-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveScrollDoc {
    products!: Product[];

    cols!: Column[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
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
        basic: `<p-table [value]="products" [tableStyle]="{'min-width': '50rem'}">
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
            <td>
                {{product.name}}
            </td>
            <td>
                {{product.price | currency:'USD'}}
            </td>
            <td>
                {{product.category}}
            </td>
            <td>
                {{product.quantity}}
            </td>
            <td>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
            </td>
            <td>
                <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" />
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
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
                <td>
                    {{product.name}}
                </td>
                <td>
                    {{product.price | currency:'USD'}}
                </td>
                <td>
                    {{product.category}}
                </td>
                <td>
                    {{product.quantity}}
                </td>
                <td>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                </td>
                <td>
                    <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" />
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'table-responsive-scroll-demo',
    templateUrl: 'table-responsive-scroll-demo.html',
    standalone: true,
    imports: [TableModule, TagModule, RatingModule, CommonModule],
    providers: [ProductService]
})
export class TableResponsiveScrollDemo implements OnInit{
    products!: Product[];

    cols!: Column[];

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
