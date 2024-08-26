import { Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'data-view-loading-demo',
    template: `
        <app-docsectiontext>
            <p>While data is being loaded. <a routerLink="/skeleton">Skeleton</a> component may be used to indicate the busy state.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataView #dv [value]="products" [layout]="layout">
                <ng-template pTemplate="header">
                    <div class="flex justify-end">
                        <p-dataViewLayoutOptions [layout]="layout" />
                    </div>
                </ng-template>
                <ng-template pTemplate="list" let-products>
                    <div class="grid grid-cols-12 gap-4 grid-nogutter">
                        <div class="col-span-12" *ngFor="let i of counterArray(6); let first = first" class="col-span-12">
                            <div class="flex flex-col xl:flex-row xl:items-start p-6 gap-6" [ngClass]="{ 'border-top-1 surface-border': !first }">
                                <p-skeleton styleClass="w-9/12 sm:w-64 xl:w-40 h-24 block xl:block mx-auto rounded-border" />
                                <div class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                                    <div class="flex flex-col items-center sm:items-start gap-4">
                                        <p-skeleton styleClass="w-32 rounded-border h-8" />
                                        <p-skeleton styleClass="w-24 rounded-border h-4" />
                                        <div class="flex items-center gap-4">
                                            <p-skeleton styleClass="w-24 rounded-border h-4" />
                                            <p-skeleton styleClass="w-12 rounded-border h-4" />
                                        </div>
                                    </div>
                                    <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                                        <p-skeleton styleClass="w-16 rounded-border h-8" />
                                        <p-skeleton shape="circle" styleClass="w-12 h-12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template let-product pTemplate="grid grid-cols-12 gap-4" let-products>
                    <div class="grid grid-cols-12 gap-4 grid-nogutter">
                        <div class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2" *ngFor="let i of counterArray(6)">
                            <div class="p-6 border border-surface bg-surface-0 dark:bg-surface-900 rounded-border">
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                    <p-skeleton styleClass="w-24 rounded-border h-8" />
                                    <p-skeleton styleClass="w-12 rounded-border h-4" />
                                </div>
                                <div class="flex flex-col items-center gap-4 py-8">
                                    <p-skeleton styleClass="w-9/12 rounded-border h-40" />
                                    <p-skeleton styleClass="w-32 rounded-border h-8" />
                                    <p-skeleton styleClass="w-24 rounded-border h-4" />
                                </div>
                                <div class="flex items-center justify-between">
                                    <p-skeleton styleClass="w-16 rounded-border h-8" />
                                    <p-skeleton shape="circle" styleClass="w-12 h-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataView>
        </div>
        <app-code [code]="code" selector="data-view-loading-demo" [extFiles]="extFiles"></app-code>
    `
})
export class LoadingDoc {
    layout: string = 'list';

    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
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

    counterArray(n: number): any[] {
        return Array(n);
    }

    code: Code = {
        basic: `<p-dataView #dv [value]="products" [layout]="layout">
    <ng-template pTemplate="header">
        <div class="flex justify-end">
            <p-dataViewLayoutOptions [layout]="layout" />
        </div>
    </ng-template>
    <ng-template pTemplate="list" let-products>
        <div class="grid grid-cols-12 gap-4 grid-nogutter">
            <div class="col-span-12" *ngFor="let i of counterArray(6); let first = first" class="col-span-12">
                <div class="flex flex-col xl:flex-row xl:items-start p-6 gap-6" [ngClass]="{ 'border-top-1 surface-border': !first }">
                    <p-skeleton styleClass="w-9/12 sm:w-64 xl:w-40 h-24 block xl:block mx-auto rounded-border" />
                    <div class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div class="flex flex-col items-center sm:items-start gap-4">
                            <p-skeleton styleClass="w-32 rounded-border h-8" />
                            <p-skeleton styleClass="w-24 rounded-border h-4" />
                            <div class="flex items-center gap-4">
                                <p-skeleton styleClass="w-24 rounded-border h-4" />
                                <p-skeleton styleClass="w-12 rounded-border h-4" />
                            </div>
                        </div>
                        <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <p-skeleton styleClass="w-16 rounded-border h-8" />
                            <p-skeleton shape="circle" styleClass="w-12 h-12" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template let-product pTemplate="grid grid-cols-12 gap-4" let-products>
        <div class="grid grid-cols-12 gap-4 grid-nogutter">
            <div class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2" *ngFor="let i of counterArray(6)">
                <div class="p-6 border border-surface bg-surface-0 dark:bg-surface-900 rounded-border">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <p-skeleton styleClass="w-24 rounded-border h-8" />
                        <p-skeleton styleClass="w-12 rounded-border h-4" />
                    </div>
                    <div class="flex flex-col items-center gap-4 py-8">
                        <p-skeleton styleClass="w-9/12 rounded-border h-40" />
                        <p-skeleton styleClass="w-32 rounded-border h-8" />
                        <p-skeleton styleClass="w-24 rounded-border h-4" />
                    </div>
                    <div class="flex items-center justify-between">
                        <p-skeleton styleClass="w-16 rounded-border h-8" />
                        <p-skeleton shape="circle" styleClass="w-12 h-12" />
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataView>`,

        html: `<div class="card">
    <p-dataView #dv [value]="products" [layout]="layout">
        <ng-template pTemplate="header">
            <div class="flex justify-end">
                <p-dataViewLayoutOptions [layout]="layout" />
            </div>
        </ng-template>
        <ng-template pTemplate="list" let-products>
            <div class="grid grid-cols-12 gap-4 grid-nogutter">
                <div class="col-span-12" *ngFor="let i of counterArray(6); let first = first" class="col-span-12">
                    <div class="flex flex-col xl:flex-row xl:items-start p-6 gap-6" [ngClass]="{ 'border-top-1 surface-border': !first }">
                        <p-skeleton styleClass="w-9/12 sm:w-64 xl:w-40 h-24 block xl:block mx-auto rounded-border" />
                        <div class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                            <div class="flex flex-col items-center sm:items-start gap-4">
                                <p-skeleton styleClass="w-32 rounded-border h-8" />
                                <p-skeleton styleClass="w-24 rounded-border h-4" />
                                <div class="flex items-center gap-4">
                                    <p-skeleton styleClass="w-24 rounded-border h-4" />
                                    <p-skeleton styleClass="w-12 rounded-border h-4" />
                                </div>
                            </div>
                            <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                                <p-skeleton styleClass="w-16 rounded-border h-8" />
                                <p-skeleton shape="circle" styleClass="w-12 h-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template let-product pTemplate="grid grid-cols-12 gap-4" let-products>
            <div class="grid grid-cols-12 gap-4 grid-nogutter">
                <div class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2" *ngFor="let i of counterArray(6)">
                    <div class="p-6 border border-surface bg-surface-0 dark:bg-surface-900 rounded-border">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <p-skeleton styleClass="w-24 rounded-border h-8" />
                            <p-skeleton styleClass="w-12 rounded-border h-4" />
                        </div>
                        <div class="flex flex-col items-center gap-4 py-8">
                            <p-skeleton styleClass="w-9/12 rounded-border h-40" />
                            <p-skeleton styleClass="w-32 rounded-border h-8" />
                            <p-skeleton styleClass="w-24 rounded-border h-4" />
                        </div>
                        <div class="flex items-center justify-between">
                            <p-skeleton styleClass="w-16 rounded-border h-8" />
                            <p-skeleton shape="circle" styleClass="w-12 h-12" />
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-dataView>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'data-view-loading-demo',
    templateUrl: './data-view-loading-demo.html',
    standalone: true,
    imports: [DataViewModule, CommonModule, SkeletonModule,],
    providers: [ProductService]
})
export class DataViewLoadingDemo {
    layout: string = 'list';

    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
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

    counterArray(n: number): any[] {
        return Array(n);
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
