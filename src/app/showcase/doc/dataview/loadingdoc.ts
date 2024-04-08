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
                    <div class="flex justify-content-end">
                        <p-dataViewLayoutOptions [layout]="layout"></p-dataViewLayoutOptions>
                    </div>
                </ng-template>
                <ng-template pTemplate="list" let-products>
                    <div class="grid grid-nogutter">
                        <div class="col-12" *ngFor="let i of counterArray(6); let first = first" class="col-12">
                            <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" [ngClass]="{ 'border-top-1 surface-border': !first }">
                                <p-skeleton styleClass="w-9 sm:w-16rem xl:w-10rem h-6rem block xl:block mx-auto border-round" />
                                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                        <p-skeleton styleClass="w-8rem border-round h-2rem" />
                                        <p-skeleton styleClass="w-6rem border-round h-1rem" />
                                        <div class="flex align-items-center gap-3">
                                            <p-skeleton styleClass="w-6rem border-round h-1rem" />
                                            <p-skeleton styleClass="w-3rem border-round h-1rem" />
                                        </div>
                                    </div>
                                    <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                        <p-skeleton styleClass="w-4rem border-round h-2rem" />
                                        <p-skeleton shape="circle" styleClass="w-3rem h-3rem" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template let-product pTemplate="grid" let-products>
                    <div class="grid grid-nogutter">
                        <div class="col-12 sm:col-6 md:col-4 xl:col-6 p-2" *ngFor="let i of counterArray(6)">
                            <div class="p-4 border-1 surface-border surface-card border-round">
                                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                    <p-skeleton styleClass="w-6rem border-round h-2rem" />
                                    <p-skeleton styleClass="w-3rem border-round h-1rem" />
                                </div>
                                <div class="flex flex-column align-items-center gap-3 py-5">
                                    <p-skeleton styleClass="w-9 border-round h-10rem" />
                                    <p-skeleton styleClass="w-8rem border-round h-2rem" />
                                    <p-skeleton styleClass="w-6rem border-round h-1rem" />
                                </div>
                                <div class="flex align-items-center justify-content-between">
                                    <p-skeleton styleClass="w-4rem border-round h-2rem" />
                                    <p-skeleton shape="circle" styleClass="w-3rem h-3rem" />
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
        <div class="flex justify-content-end">
            <p-dataViewLayoutOptions [layout]="layout"></p-dataViewLayoutOptions>
        </div>
    </ng-template>
    <ng-template pTemplate="list" let-products>
        <div class="grid grid-nogutter">
            <div class="col-12" *ngFor="let i of counterArray(6); let first = first" class="col-12">
                <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" [ngClass]="{ 'border-top-1 surface-border': !first }">
                    <p-skeleton styleClass="w-9 sm:w-16rem xl:w-10rem h-6rem block xl:block mx-auto border-round" />
                    <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                            <p-skeleton styleClass="w-8rem border-round h-2rem" />
                            <p-skeleton styleClass="w-6rem border-round h-1rem" />
                            <div class="flex align-items-center gap-3">
                                <p-skeleton styleClass="w-6rem border-round h-1rem" />
                                <p-skeleton styleClass="w-3rem border-round h-1rem" />
                            </div>
                        </div>
                        <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <p-skeleton styleClass="w-4rem border-round h-2rem" />
                            <p-skeleton shape="circle" styleClass="w-3rem h-3rem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template let-product pTemplate="grid" let-products>
        <div class="grid grid-nogutter">
            <div class="col-12 sm:col-6 md:col-4 xl:col-6 p-2" *ngFor="let i of counterArray(6)">
                <div class="p-4 border-1 surface-border surface-card border-round">
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <p-skeleton styleClass="w-6rem border-round h-2rem" />
                        <p-skeleton styleClass="w-3rem border-round h-1rem" />
                    </div>
                    <div class="flex flex-column align-items-center gap-3 py-5">
                        <p-skeleton styleClass="w-9 border-round h-10rem" />
                        <p-skeleton styleClass="w-8rem border-round h-2rem" />
                        <p-skeleton styleClass="w-6rem border-round h-1rem" />
                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <p-skeleton styleClass="w-4rem border-round h-2rem" />
                        <p-skeleton shape="circle" styleClass="w-3rem h-3rem" />
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataView>`,

        html: `<div class="card">
    <p-dataView #dv [value]="products" [layout]="layout">
        <ng-template pTemplate="header">
            <div class="flex justify-content-end">
                <p-dataViewLayoutOptions [layout]="layout"></p-dataViewLayoutOptions>
            </div>
        </ng-template>
        <ng-template pTemplate="list" let-products>
            <div class="grid grid-nogutter">
                <div class="col-12" *ngFor="let i of counterArray(6); let first = first" class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" [ngClass]="{ 'border-top-1 surface-border': !first }">
                        <p-skeleton styleClass="w-9 sm:w-16rem xl:w-10rem h-6rem block xl:block mx-auto border-round" />
                        <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <p-skeleton styleClass="w-8rem border-round h-2rem" />
                                <p-skeleton styleClass="w-6rem border-round h-1rem" />
                                <div class="flex align-items-center gap-3">
                                    <p-skeleton styleClass="w-6rem border-round h-1rem" />
                                    <p-skeleton styleClass="w-3rem border-round h-1rem" />
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <p-skeleton styleClass="w-4rem border-round h-2rem" />
                                <p-skeleton shape="circle" styleClass="w-3rem h-3rem" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template let-product pTemplate="grid" let-products>
            <div class="grid grid-nogutter">
                <div class="col-12 sm:col-6 md:col-4 xl:col-6 p-2" *ngFor="let i of counterArray(6)">
                    <div class="p-4 border-1 surface-border surface-card border-round">
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <p-skeleton styleClass="w-6rem border-round h-2rem" />
                            <p-skeleton styleClass="w-3rem border-round h-1rem" />
                        </div>
                        <div class="flex flex-column align-items-center gap-3 py-5">
                            <p-skeleton styleClass="w-9 border-round h-10rem" />
                            <p-skeleton styleClass="w-8rem border-round h-2rem" />
                            <p-skeleton styleClass="w-6rem border-round h-1rem" />
                        </div>
                        <div class="flex align-items-center justify-content-between">
                            <p-skeleton styleClass="w-4rem border-round h-2rem" />
                            <p-skeleton shape="circle" styleClass="w-3rem h-3rem" />
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
