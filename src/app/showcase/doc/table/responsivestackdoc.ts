import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'responsive-stack-doc',
    template: ` <app-docsectiontext>
            <p>
                In stack layout, columns are displayed as stacked after a certain breakpoint. Default is '960px' as max-width. This feature is enabled by setting <i>responsiveLayout</i> to <i>stack</i> and adding an element with
                <i>p-column-title</i> style class to the body cells.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" responsiveLayout="stack" [breakpoint]="'960px'" [tableStyle]="{ 'min-width': '50rem' }">
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
                            <td><span class="p-column-title">Name</span>{{ product.name }}</td>
                            <td><span class="p-column-title">Price</span>{{ product.price | currency : 'USD' }}</td>
                            <td><span class="p-column-title">Category</span>{{ product.category }}</td>
                            <td><span class="p-column-title">Quantity</span>{{ product.quantity }}</td>
                            <td><p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" /></td>
                            <td><span class="p-column-title">Reviews</span><p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" /></td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-responsive-stack-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveStackDoc {
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
        basic: `<p-table 
    [value]="products" 
    responsiveLayout="stack" 
    [breakpoint]="'960px'" 
    [tableStyle]="{'min-width': '50rem'}">
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
                <td>
                    <span class="p-column-title">Name</span>{{product.name}}
                </td>
                <td>
                    <span class="p-column-title">Price</span>{{product.price | currency:'USD'}}
                </td>
                <td>
                    <span class="p-column-title">Category</span>{{product.category}}
                </td>
                <td>
                    <span class="p-column-title">Quantity</span>{{product.quantity}}
                </td>
                <td>
                    <p-tag 
                        [value]="product.inventoryStatus" 
                        [severity]="getSeverity(product.inventoryStatus)" />
                </td>
                <td>
                    <span class="p-column-title">Reviews</span>
                    <p-rating 
                        [(ngModel)]="product.rating" 
                        [readonly]="true" 
                        [cancel]="false" />
                </td>
            </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="products" responsiveLayout="stack" [breakpoint]="'960px'" [tableStyle]="{'min-width': '50rem'}">
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
                <td>
                    <span class="p-column-title">Name</span>{{product.name}}
                </td>
                <td>
                    <span class="p-column-title">Price</span>{{product.price | currency:'USD'}}
                </td>
                <td>
                    <span class="p-column-title">Category</span>{{product.category}}
                </td>
                <td>
                    <span class="p-column-title">Quantity</span>{{product.quantity}}
                </td>
                <td>
                    <p-tag 
                        [value]="product.inventoryStatus" 
                        [severity]="getSeverity(product.inventoryStatus)" />
                </td>
                <td>
                    <span class="p-column-title">Reviews</span>
                    <p-rating 
                        [(ngModel)]="product.rating" 
                        [readonly]="true" 
                        [cancel]="false" />
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
    selector: 'table-responsive-stack-demo',
    templateUrl: 'table-responsive-stack-demo.html',
    standalone: true,
    imports: [TableModule, TagModule, RatingModule, CommonModule],
    providers: [ProductService]
})
export class TableResponsiveStackDemo implements OnInit{
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
