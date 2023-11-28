import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-sorting-demo',
    template: `
        <app-docsectiontext>
            <p>Built-in sorting is controlled by bindings <i>sortField</i> and <i>sortField</i> properties from a custom UI.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataView #dv [value]="products" [sortField]="sortField" [sortOrder]="sortOrder">
                <ng-template pTemplate="header">
                    <div class="flex flex-column md:flex-row md:justify-content-between">
                        <p-dropdown [options]="sortOptions" [(ngModel)]="sortKey" placeholder="Sort By Price" (onChange)="onSortChange($event)" styleClass="mb-2 md:mb-0"></p-dropdown>
                    </div>
                </ng-template>
                <ng-template let-products pTemplate="list">
                    <div class="grid grid-nogutter">
                        <div class="col-12" *ngFor="let item of products; let first = first">
                            <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" [ngClass]="{ 'border-top-1 surface-border': !first }">
                                <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                        <div class="text-2xl font-bold text-900">{{ item.name }}</div>
                                        <p-rating [(ngModel)]="item.rating" [readonly]="true" [cancel]="false"></p-rating>
                                        <div class="flex align-items-center gap-3">
                                            <span class="flex align-items-center gap-2">
                                                <i class="pi pi-tag"></i>
                                                <span class="font-semibold">{{ item.category }}</span>
                                            </span>
                                            <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)"></p-tag>
                                        </div>
                                    </div>
                                    <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                        <span class="text-2xl font-semibold">{{ '$' + item.price }}</span>
                                        <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataView>
        </div>
        <app-code [code]="code" selector="data-view-sorting-demo" [extFiles]="extFiles"></app-code>
    `
})
export class SortingDoc {
    sortOptions!: SelectItem[];

    sortOrder!: number;

    sortField!: string;

    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

    code: Code = {
        basic: `
<p-dataView #dv [value]="products" [sortField]="sortField" [sortOrder]="sortOrder">
    <ng-template pTemplate="header">
        <div class="flex flex-column md:flex-row md:justify-content-between">
            <p-dropdown [options]="sortOptions" [(ngModel)]="sortKey" placeholder="Sort By Price" (onChange)="onSortChange($event)" styleClass="mb-2 md:mb-0"></p-dropdown>
        </div>
    </ng-template>
    <ng-template let-products pTemplate="list">
        <div class="grid grid-nogutter">
            <div class="col-12" *ngFor="let item of products; let first = first">
                <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" [ngClass]="{ 'border-top-1 surface-border': !first }">
                    <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                    <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div class="text-2xl font-bold text-900">{{ item.name }}</div>
                            <p-rating [(ngModel)]="item.rating" [readonly]="true" [cancel]="false"></p-rating>
                            <div class="flex align-items-center gap-3">
                                <span class="flex align-items-center gap-2">
                                    <i class="pi pi-tag"></i>
                                    <span class="font-semibold">{{ item.category }}</span>
                                </span>
                                <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)"></p-tag>
                            </div>
                        </div>
                        <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span class="text-2xl font-semibold">{{ '$' + item.price }}</span>
                            <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataView>`,

        html: `
<div class="card">
    <p-dataView #dv [value]="products" [sortField]="sortField" [sortOrder]="sortOrder">
        <ng-template pTemplate="header">
            <div class="flex flex-column md:flex-row md:justify-content-between">
                <p-dropdown [options]="sortOptions" [(ngModel)]="sortKey" placeholder="Sort By Price" (onChange)="onSortChange($event)" styleClass="mb-2 md:mb-0"></p-dropdown>
            </div>
        </ng-template>
        <ng-template let-products pTemplate="list">
            <div class="grid grid-nogutter">
                <div class="col-12" *ngFor="let item of products; let first = first">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" [ngClass]="{ 'border-top-1 surface-border': !first }">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                        <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ item.name }}</div>
                                <p-rating [(ngModel)]="item.rating" [readonly]="true" [cancel]="false"></p-rating>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <i class="pi pi-tag"></i>
                                        <span class="font-semibold">{{ item.category }}</span>
                                    </span>
                                    <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)"></p-tag>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">{{ '$' + item.price }}</span>
                                <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-dataView>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-sorting-demo',
    templateUrl: './data-view-sorting-demo.html'
})
export class DataViewSortingDemo {
    sortOptions!: SelectItem[];

    sortOrder!: number;

    sortField!: string;

    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
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
