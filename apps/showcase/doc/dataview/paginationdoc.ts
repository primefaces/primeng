import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'data-view-pagination-demo',
    template: `
        <app-docsectiontext>
            <p>Pagination is enabled with the <i>paginator</i> and <i>rows</i> properties. Refer to the <a routerLink="/paginator">Paginator</a> for more information about customizing the paginator.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataview #dv [value]="products()" [rows]="5" [paginator]="true">
                <ng-template #list let-items>
                    <div class="grid grid-cols-12 gap-4 grid-nogutter">
                        <div class="col-span-12" *ngFor="let item of items; let first = first" class="col-span-12">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }">
                                <div class="md:w-40 relative">
                                    <img class="block xl:block mx-auto rounded-border w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                                    <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" styleClass="dark:!bg-surface-900" [style.left.px]="4" [style.top.px]="4" />
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                                            <div
                                                class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                                                style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                                            >
                                                <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ '$' + item.price }}</span>
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button icon="pi pi-heart" [outlined]="true" />
                                            <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial whitespace-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataview>
        </div>
        <app-code [code]="code" selector="data-view-pagination-demo" [extFiles]="extFiles"></app-code>
    `
})
export class PaginationDoc {
    products = signal<any>([]);

    constructor(private productService: ProductService) {}
    code: Code = {
        basic: `<p-dataview [value]="products()" [rows]="5" [paginator]="true">
    <ng-template #list let-items>
        <div class="grid grid-cols-12 gap-4 grid-nogutter">
            <div class="col-span-12" *ngFor="let item of items; let first = first" class="col-span-12">
                <div
                    class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                    [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }"
                >
                    <div class="md:w-40 relative">
                        <img
                            class="block xl:block mx-auto rounded-border w-full"
                            [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image"
                            [alt]="item.name"
                        />
                        <p-tag
                            [value]="item.inventoryStatus"
                            [severity]="getSeverity(item)"
                            class="absolute"
                            styleClass="dark:!bg-surface-900"
                            [style.left.px]="4"
                            [style.top.px]="4"
                        />
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                                <div
                                    class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                                    style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                                >
                                    <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{
                                        item.rating
                                    }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{
                                '$' + item.price
                            }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <p-button icon="pi pi-heart" [outlined]="true" />
                                <p-button
                                    icon="pi pi-shopping-cart"
                                    class="flex-auto md:flex-initial whitespace-nowrap"
                                    label="Buy Now"
                                    [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataview>`,

        html: `<div class="card">
    <p-dataview #dv [value]="products()" [rows]="5" [paginator]="true">
        <ng-template pTemplate="list" let-items>
            <div class="grid grid-cols-12 gap-4 grid-nogutter">
                <div class="col-span-12" *ngFor="let item of items; let first = first" class="col-span-12">
                    <div
                        class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                        [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }"
                    >
                        <div class="md:w-40 relative">
                            <img
                                class="block xl:block mx-auto rounded-border w-full"
                                [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image"
                                [alt]="item.name"
                            />
                            <p-tag
                                [value]="item.inventoryStatus"
                                [severity]="getSeverity(item)"
                                class="absolute"
                                styleClass="dark:!bg-surface-900"
                                [style.left.px]="4"
                                [style.top.px]="4"
                            />
                        </div>
                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                <div>
                                    <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                    <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                                </div>
                                <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                                    <div
                                        class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                                        style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                                    >
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{
                                            item.rating
                                        }}</span>
                                        <i class="pi pi-star-fill text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col md:items-end gap-8">
                                <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{
                                    '$' + item.price
                                }}</span>
                                <div class="flex flex-row-reverse md:flex-row gap-2">
                                    <p-button icon="pi pi-heart" [outlined]="true" />
                                    <p-button
                                        icon="pi pi-shopping-cart"
                                        class="flex-auto md:flex-initial whitespace-nowrap"
                                        label="Buy Now"
                                        [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-dataview>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
    selector: 'data-view-pagination-demo',
    templateUrl: './data-view-pagination-demo.html',
    standalone: true,
    imports: [DataView, ButtonModule, Tag, CommonModule],
    providers: [ProductService]
})
export class DataViewPaginationDemo {
    products = signal<any>([]);

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products.set(data);
        });
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

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

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products.set(data);
        });
    }

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
