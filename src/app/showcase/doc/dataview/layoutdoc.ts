import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-layout-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                DataView supports <i>list</i> and <i>grid</i> display modes defined with the <i>layout</i> property. The helper <i>DataViewLayoutOptions</i> component can be used to switch between the modes however this component is optional and you
                may use your own UI to switch modes as well. As in <i>list</i> layout, the <i>grid</i> layout also requires PrimeFlex Grid classes to define how the grid is displayed per screen sizes.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-dataView #dv [value]="products" [layout]="layout">
                <ng-template pTemplate="header">
                    <div class="flex justify-content-end">
                        <p-dataViewLayoutOptions [layout]="layout"></p-dataViewLayoutOptions>
                    </div>
                </ng-template>
                <ng-template let-product pTemplate="listItem">
                    <div class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                                    <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ product.category }}</span>
                                        </span>
                                        <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                                    <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template let-product pTemplate="gridItem">
                    <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                        <div class="p-4 border-1 surface-border surface-card border-round">
                            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                <span class="flex align-items-center gap-2">
                                    <i class="pi pi-tag"></i>
                                    <span class="font-semibold">{{ product.category }}</span>
                                </span>
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                            </div>
                            <div class="flex flex-column align-items-center gap-3 py-5">
                                <img class="w-9 shadow-2 border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                                <div class="text-2xl font-bold">{{ product.name }}</div>
                                <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                                <button pButton icon="pi pi-shopping-cart" class="p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataView>
        </div>
        <app-code [code]="code" selector="data-view-layout-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class LayoutDoc {
    @Input() id: string;

    @Input() title: string;

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

    code: Code = {
        basic: `
<p-dataView #dv [value]="products" [layout]="layout">
    <ng-template pTemplate="header">
        <div class="flex justify-content-end">
            <p-dataViewLayoutOptions [layout]="layout"></p-dataViewLayoutOptions>
        </div>
    </ng-template>
    <ng-template let-product pTemplate="listItem">
        <div class="col-12">
            <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                        <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                        <div class="flex align-items-center gap-3">
                            <span class="flex align-items-center gap-2">
                                <i class="pi pi-tag"></i>
                                <span class="font-semibold">{{ product.category }}</span>
                            </span>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                        </div>
                    </div>
                    <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                        <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template let-product pTemplate="gridItem">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round">
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="flex align-items-center gap-2">
                        <i class="pi pi-tag"></i>
                        <span class="font-semibold">{{ product.category }}</span>
                    </span>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                </div>
                <div class="flex flex-column align-items-center gap-3 py-5">
                    <img class="w-9 shadow-2 border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                    <div class="text-2xl font-bold">{{ product.name }}</div>
                    <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                </div>
                <div class="flex align-items-center justify-content-between">
                    <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                    <button pButton icon="pi pi-shopping-cart" class="p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataView>`,

        html: `
<div class="card">
    <p-dataView #dv [value]="products" [layout]="layout">
        <ng-template pTemplate="header">
            <div class="flex justify-content-end">
                <p-dataViewLayoutOptions [layout]="layout"></p-dataViewLayoutOptions>
            </div>
        </ng-template>
        <ng-template let-product pTemplate="listItem">
            <div class="col-12">
                <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                    <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                            <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                            <div class="flex align-items-center gap-3">
                                <span class="flex align-items-center gap-2">
                                    <i class="pi pi-tag"></i>
                                    <span class="font-semibold">{{ product.category }}</span>
                                </span>
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                            </div>
                        </div>
                        <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                            <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template let-product pTemplate="gridItem">
            <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div class="p-4 border-1 surface-border surface-card border-round">
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <span class="flex align-items-center gap-2">
                            <i class="pi pi-tag"></i>
                            <span class="font-semibold">{{ product.category }}</span>
                        </span>
                        <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                    </div>
                    <div class="flex flex-column align-items-center gap-3 py-5">
                        <img class="w-9 shadow-2 border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                        <div class="text-2xl font-bold">{{ product.name }}</div>
                        <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                        <button pButton icon="pi pi-shopping-cart" class="p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-dataView>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-layout-demo',
    templateUrl: './data-view-layout-demo.html'
})
export class DataViewLayoutDemo {
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
