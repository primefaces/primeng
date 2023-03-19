import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                DataView requires a <i>value</i> to display along with an <i>pTemplate</i> that receives an object in the collection to return content. The root element should have the PrimeFlex Grid classes e.g. col-12 to define how items are
                displayed.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-dataView #dv [value]="products">
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
            </p-dataView>
        </div>
        <app-code [code]="code" selector="data-view-basic-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
    }

    code: Code = {
        basic: `
<p-dataView #dv [value]="products">
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
</p-dataView>`,

        html: `
<div class="card">
    <p-dataView #dv [value]="products">
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
    </p-dataView>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-basic-demo',
    templateUrl: './data-view-basic-demo.html',
    styleUrls: ['./data-view-basic-demo.scss']
})
export class DataViewBasicDemo {
    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
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
