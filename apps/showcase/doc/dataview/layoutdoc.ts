import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'data-view-layout-demo',
    template: `
        <app-docsectiontext>
            <p>DataView supports <i>list</i> and <i>grid</i> display modes defined with the <i>layout</i> property. The <i>grid</i> mode is not built-in for flexibility purposes and requires a library with CSS grid features like Tailwind.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataview #dv [value]="products()" [layout]="layout">
                <ng-template #header>
                    <div class="flex justify-end">
                        <p-selectbutton [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                            <ng-template #item let-item>
                                <i class="pi " [ngClass]="{ 'pi-bars': item === 'list', 'pi-table': item === 'grid' }"></i>
                            </ng-template>
                        </p-selectbutton>
                    </div>
                </ng-template>
                <ng-template #list let-items>
                    <div *ngFor="let item of items; let first = first">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }">
                            <div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                                <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" styleClass="dark:!bg-surface-900" [style.left.px]="4" [style.top.px]="4" />
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                    </div>
                                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <span class="text-xl font-semibold">{{ item.price | currency: 'USD' }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <button pButton icon="pi pi-heart" [outlined]="true"></button>
                                        <button pButton icon="pi pi-shopping-cart" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #grid let-items>
                    <div class="grid grid-cols-12 gap-4">
                        <div *ngFor="let product of items" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                            <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                <div class="bg-surface-50 flex justify-center rounded p-4">
                                    <div class="relative mx-auto">
                                        <img class="rounded w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" style="max-width: 300px" />
                                        <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)" class="absolute" styleClass="dark:!bg-surface-900" [style.left.px]="4" [style.top.px]="4" />
                                    </div>
                                </div>
                                <div class="pt-6">
                                    <div class="flex flex-row justify-between products-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ product.category }}</span>
                                            <div class="text-lg font-medium mt-1">{{ product.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 p-1" style="border-radius: 30px; height:100%">
                                            <div class="bg-surface-0 flex products-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                <span class="text-surface-900 font-medium text-sm">{{ product.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-6 mt-6">
                                        <span class="text-2xl font-semibold">{{ product.price | currency: 'USD' }}</span>
                                        <div class="flex gap-2">
                                            <button pButton icon="pi pi-shopping-cart" label="Buy Now" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto whitespace-nowrap"></button>
                                            <button pButton icon="pi pi-heart" outlined></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataview>
        </div>
        <app-code [code]="code" selector="data-view-layout-demo" [extFiles]="extFiles"></app-code>
    `
})
export class LayoutDoc {
    layout: 'grid' | 'list' = 'grid';

    products = signal<any>([]);

    options = ['list', 'grid'];

    constructor(private productService: ProductService) {}
    code: Code = {
        basic: `<p-dataview #dv [value]="products()" [layout]="layout">
    <ng-template #header>
        <div class="flex justify-end">
            <p-selectbutton [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                <ng-template #item let-item>
                    <i class="pi " [ngClass]="{ 'pi-bars': item === 'list', 'pi-table': item === 'grid' }"></i>
                </ng-template>
            </p-selectbutton>
        </div>
    </ng-template>
    <ng-template #list let-items>
        <div *ngFor="let item of items; let first = first">
            <div
                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }"
            >
                <div class="md:w-40 relative">
                    <img
                        class="block xl:block mx-auto rounded w-full"
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
                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                        </div>
                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                            <div
                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                            >
                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                <i class="pi pi-star-fill text-yellow-500"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                        <span class="text-xl font-semibold">{{ item.price | currency: 'USD' }}</span>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                            <button pButton icon="pi pi-heart" [outlined]="true"></button>
                            <button
                                pButton
                                icon="pi pi-shopping-cart"
                                label="Buy Now"
                                [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                                class="flex-auto md:flex-initial whitespace-nowrap"
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template #grid let-items>
        <div class="grid grid-cols-12 gap-4">
            <div *ngFor="let product of items" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                <div
                    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
                >
                    <div class="bg-surface-50 flex justify-center rounded p-4">
                        <div class="relative mx-auto">
                            <img
                                class="rounded w-full"
                                [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image"
                                [alt]="product.name"
                                style="max-width: 300px"
                            />
                            <p-tag
                                [value]="product.inventoryStatus"
                                [severity]="getSeverity(product)"
                                class="absolute"
                                styleClass="dark:!bg-surface-900"
                                [style.left.px]="4"
                                [style.top.px]="4"
                            />
                        </div>
                    </div>
                    <div class="pt-6">
                        <div class="flex flex-row justify-between products-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                    product.category
                                }}</span>
                                <div class="text-lg font-medium mt-1">{{ product.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px; height:100%">
                                <div
                                    class="bg-surface-0 flex products-center gap-2 justify-center py-1 px-2"
                                    style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                                >
                                    <span class="text-surface-900 font-medium text-sm">{{ product.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-6 mt-6">
                            <span class="text-2xl font-semibold">{{ product.price | currency: 'USD' }}</span>
                            <div class="flex gap-2">
                                <button
                                    pButton
                                    icon="pi pi-shopping-cart"
                                    label="Buy Now"
                                    [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"
                                    class="flex-auto whitespace-nowrap"
                                ></button>
                                <button pButton icon="pi pi-heart" outlined></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataview>`,

        html: `<div class="card">
    <p-dataview #dv [value]="products()" [layout]="layout">
        <ng-template #header>
            <div class="flex justify-end">
                <p-selectbutton [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                    <ng-template #item let-item>
                        <i class="pi " [ngClass]="{ 'pi-bars': item === 'list', 'pi-table': item === 'grid' }"></i>
                    </ng-template>
                </p-selectbutton>
            </div>
        </ng-template>
        <ng-template #list let-items>
            <div *ngFor="let item of items; let first = first">
                <div
                    class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                    [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }"
                >
                    <div class="md:w-40 relative">
                        <img
                            class="block xl:block mx-auto rounded w-full"
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
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                <div
                                    class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                    style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                                >
                                    <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">{{ item.price | currency: 'USD' }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <button pButton icon="pi pi-heart" [outlined]="true"></button>
                                <button
                                    pButton
                                    icon="pi pi-shopping-cart"
                                    label="Buy Now"
                                    [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                                    class="flex-auto md:flex-initial whitespace-nowrap"
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template #grid let-items>
            <div class="grid grid-cols-12 gap-4">
                <div *ngFor="let product of items" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                    <div
                        class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
                    >
                        <div class="bg-surface-50 flex justify-center rounded p-4">
                            <div class="relative mx-auto">
                                <img
                                    class="rounded w-full"
                                    [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image"
                                    [alt]="product.name"
                                    style="max-width: 300px"
                                />
                                <p-tag
                                    [value]="product.inventoryStatus"
                                    [severity]="getSeverity(product)"
                                    class="absolute"
                                    styleClass="dark:!bg-surface-900"
                                    [style.left.px]="4"
                                    [style.top.px]="4"
                                />
                            </div>
                        </div>
                        <div class="pt-6">
                            <div class="flex flex-row justify-between products-start gap-2">
                                <div>
                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                        product.category
                                    }}</span>
                                    <div class="text-lg font-medium mt-1">{{ product.name }}</div>
                                </div>
                                <div class="bg-surface-100 p-1" style="border-radius: 30px; height:100%">
                                    <div
                                        class="bg-surface-0 flex products-center gap-2 justify-center py-1 px-2"
                                        style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                                    >
                                        <span class="text-surface-900 font-medium text-sm">{{ product.rating }}</span>
                                        <i class="pi pi-star-fill text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-6 mt-6">
                                <span class="text-2xl font-semibold">{{ product.price | currency: 'USD' }}</span>
                                <div class="flex gap-2">
                                    <button
                                        pButton
                                        icon="pi pi-shopping-cart"
                                        label="Buy Now"
                                        [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"
                                        class="flex-auto whitespace-nowrap"
                                    ></button>
                                    <button pButton icon="pi pi-heart" outlined></button>
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
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
    selector: 'data-view-layout-demo',
    templateUrl: './data-view-layout-demo.html',
    standalone: true,
    imports: [
      DataView,
      Tag,
      Rating,
      ButtonModule,
      CommonModule,
      SelectButton,
      FormsModule
    ],
    providers: [ProductService],
})
export class DataViewLayoutDemo {
    layout: string = 'grid';

    products = signal<any>([]);

    options = ['list', 'grid'];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products.set([...data.slice(0,12)]);
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
            this.products.set([...data.slice(0, 12)]);
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
