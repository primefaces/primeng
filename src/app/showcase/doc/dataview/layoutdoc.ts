import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-layout-demo',
    template: ` <section>
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
                        <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                            <img class="w-full my-5 md:my-auto md:mr-5 shadow-3 w-9 md:w-11rem" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                            <div class="text-center md:text-left flex-1">
                                <div class="text-2xl font-bold">{{ product.name }}</div>
                                <div class="mb-3">{{ product.description }}</div>
                                <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                                <i class="pi pi-tag vertical-align-middle mr-2"></i><span class="font-semibold vertical-align-middle">{{ product.category }}</span>
                            </div>
                            <div class="flex align-items-center justify-content-between w-full md:w-auto md:align-items-start md:justify-content-start md:flex-column mt-5 ">
                                <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ '$' + product.price }}</span>
                                <p-button icon="pi pi-shopping-cart" class="md:align-self-end mb-2" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></p-button>
                                <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template let-product pTemplate="gridItem">
                    <div class="col-12 md:col-4">
                        <div class="m-2 border-1 surface-border card">
                            <div class="flex align-items-center justify-content-between mb-3">
                                <div>
                                    <i class="pi pi-tag vertical-align-middle mr-2"></i>
                                    <span class="font-semibold vertical-align-middle">{{ product.category }}</span>
                                </div>
                                <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                            </div>
                            <div class="text-center">
                                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                                <div class="text-2xl font-bold">{{ product.name }}</div>
                                <div class="mb-3">{{ product.description }}</div>
                                <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ '$' + product.price }}</span>
                                <p-button icon="pi pi-shopping-cart" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></p-button>
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

    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
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
            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                <img class="w-full my-5 md:my-auto md:mr-5 shadow-3 w-9 md:w-11rem" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                <div class="text-center md:text-left flex-1">
                    <div class="text-2xl font-bold">{{ product.name }}</div>
                    <div class="mb-3">{{ product.description }}</div>
                    <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                    <i class="pi pi-tag vertical-align-middle mr-2"></i><span class="font-semibold vertical-align-middle">{{ product.category }}</span>
                </div>
                <div class="flex align-items-center justify-content-between w-full md:w-auto md:align-items-start md:justify-content-start md:flex-column mt-5 ">
                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ '$' + product.price }}</span>
                    <p-button icon="pi pi-shopping-cart" class="md:align-self-end mb-2" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></p-button>
                    <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template let-product pTemplate="gridItem">
        <div class="col-12 md:col-4">
            <div class="m-2 border-1 surface-border card">
                <div class="flex align-items-center justify-content-between mb-3">
                    <div>
                        <i class="pi pi-tag vertical-align-middle mr-2"></i>
                        <span class="font-semibold vertical-align-middle">{{ product.category }}</span>
                    </div>
                    <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                </div>
                <div class="text-center">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                    <div class="text-2xl font-bold">{{ product.name }}</div>
                    <div class="mb-3">{{ product.description }}</div>
                    <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                </div>
                <div class="flex align-items-center justify-content-between">
                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ '$' + product.price }}</span>
                    <p-button icon="pi pi-shopping-cart" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></p-button>
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
                <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img class="w-full my-5 md:my-auto md:mr-5 shadow-3 w-9 md:w-11rem" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                    <div class="text-center md:text-left flex-1">
                        <div class="text-2xl font-bold">{{ product.name }}</div>
                        <div class="mb-3">{{ product.description }}</div>
                        <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                        <i class="pi pi-tag vertical-align-middle mr-2"></i><span class="font-semibold vertical-align-middle">{{ product.category }}</span>
                    </div>
                    <div class="flex align-items-center justify-content-between w-full md:w-auto md:align-items-start md:justify-content-start md:flex-column mt-5 ">
                        <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ '$' + product.price }}</span>
                        <p-button icon="pi pi-shopping-cart" class="md:align-self-end mb-2" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></p-button>
                        <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template let-product pTemplate="gridItem">
            <div class="col-12 md:col-4">
                <div class="m-2 border-1 surface-border card">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div>
                            <i class="pi pi-tag vertical-align-middle mr-2"></i>
                            <span class="font-semibold vertical-align-middle">{{ product.category }}</span>
                        </div>
                        <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                    </div>
                    <div class="text-center">
                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                        <div class="text-2xl font-bold">{{ product.name }}</div>
                        <div class="mb-3">{{ product.description }}</div>
                        <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ '$' + product.price }}</span>
                        <p-button icon="pi pi-shopping-cart" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></p-button>
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

    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
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
