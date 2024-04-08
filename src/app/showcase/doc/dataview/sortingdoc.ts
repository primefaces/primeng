import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'data-view-sorting-demo',
    template: `
        <app-docsectiontext>
            <p>Built-in sorting is controlled by bindings <i>sortField</i> and <i>sortOrder</i> properties from a custom UI.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataView #dv [value]="products" [sortField]="sortField" [sortOrder]="sortOrder">
                <ng-template pTemplate="header">
                    <div class="flex flex-column md:flex-row md:justify-content-between">
                        <p-dropdown [options]="sortOptions" [(ngModel)]="sortKey" placeholder="Sort By Price" (onChange)="onSortChange($event)" styleClass="mb-2 md:mb-0"></p-dropdown>
                    </div>
                </ng-template>
                <ng-template pTemplate="list" let-products>
                    <div class="grid grid-nogutter">
                        <div class="col-12" *ngFor="let item of products; let first = first" class="col-12">
                            <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" [ngClass]="{ 'border-top-1 surface-border': !first }">
                                <div class="md:w-10rem relative">
                                    <img class="block xl:block mx-auto border-round w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                                    <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" [style.left.px]="4" [style.top.px]="4" />
                                </div>
                                <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                    <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                        <div>
                                            <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                                        </div>
                                        <div class="surface-100 p-1" style="border-radius: 30px">
                                            <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-column md:align-items-end gap-5">
                                        <span class="text-xl font-semibold text-900">{{ '$' + item.price }}</span>
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button icon="pi pi-heart" [outlined]="true" />
                                            <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial white-space-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                                        </div>
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
        basic: `<p-dataView #dv [value]="products" [sortField]="sortField" [sortOrder]="sortOrder">
    <ng-template pTemplate="header">
        <div class="flex flex-column md:flex-row md:justify-content-between">
            <p-dropdown [options]="sortOptions" [(ngModel)]="sortKey" placeholder="Sort By Price" (onChange)="onSortChange($event)" styleClass="mb-2 md:mb-0"></p-dropdown>
        </div>
    </ng-template>
        <ng-template pTemplate="list" let-products>
        <div class="grid grid-nogutter">
            <div class="col-12" *ngFor="let item of products; let first = first" class="col-12">
                <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" [ngClass]="{ 'border-top-1 surface-border': !first }">
                    <div class="md:w-10rem relative">
                        <img class="block xl:block mx-auto border-round w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                        <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" [style.left.px]="4" [style.top.px]="4" />
                    </div>
                    <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                        <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                            <div>
                                <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                            </div>
                            <div class="surface-100 p-1" style="border-radius: 30px">
                                <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-column md:align-items-end gap-5">
                            <span class="text-xl font-semibold text-900">{{ '$' + item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <p-button icon="pi pi-heart" [outlined]="true" />
                                <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial white-space-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataView>`,

        html: `<div class="card">
    <p-dataView #dv [value]="products" [sortField]="sortField" [sortOrder]="sortOrder">
        <ng-template pTemplate="header">
            <div class="flex flex-column md:flex-row md:justify-content-between">
                <p-dropdown [options]="sortOptions" [(ngModel)]="sortKey" placeholder="Sort By Price" (onChange)="onSortChange($event)" styleClass="mb-2 md:mb-0"></p-dropdown>
            </div>
        </ng-template>
        <ng-template pTemplate="list" let-products>
            <div class="grid grid-nogutter">
                <div class="col-12" *ngFor="let item of products; let first = first" class="col-12">
                    <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" [ngClass]="{ 'border-top-1 surface-border': !first }">
                        <div class="md:w-10rem relative">
                            <img class="block xl:block mx-auto border-round w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                            <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" [style.left.px]="4" [style.top.px]="4" />
                        </div>
                        <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                            <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                <div>
                                    <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                    <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                                </div>
                                <div class="surface-100 p-1" style="border-radius: 30px">
                                    <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                        <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                        <i class="pi pi-star-fill text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-column md:align-items-end gap-5">
                                <span class="text-xl font-semibold text-900">{{ '$' + item.price }}</span>
                                <div class="flex flex-row-reverse md:flex-row gap-2">
                                    <p-button icon="pi pi-heart" [outlined]="true" />
                                    <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial white-space-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </ng-template>
    </p-dataView>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'data-view-sorting-demo',
    templateUrl: './data-view-sorting-demo.html',
    standalone: true,
    imports: [DataViewModule, ButtonModule, TagModule, CommonModule, DropdownModule],
    providers: [ProductService]
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
