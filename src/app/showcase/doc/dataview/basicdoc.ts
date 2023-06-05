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
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                                    <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
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

    getSeverity(product) {
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
<p-dataView #dv [value]="products">
    <ng-template let-product pTemplate="listItem">
        <div class="col-12">
            <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                        <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                        <div class="flex align-items-center gap-3">
                            <span class="flex align-items-center gap-2">
                                <i class="pi pi-tag"></i>
                                <span class="font-semibold">{{ product.category }}</span>
                            </span>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                        </div>
                    </div>
                    <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span class="text-2xl font-semibold">{{'$'+ product.price }}</span>
                        <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                    </div>
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
                <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" />
                    <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div class="text-2xl font-bold text-900">{{ product.name }}</div>
                            <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false"></p-rating>
                            <div class="flex align-items-center gap-3">
                                <span class="flex align-items-center gap-2">
                                    <i class="pi pi-tag"></i>
                                    <span class="font-semibold">{{ product.category }}</span>
                                </span>
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product)"></p-tag>
                            </div>
                        </div>
                        <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span class="text-2xl font-semibold">{{'$'+ product.price }}</span>
                            <button pButton icon="pi pi-shopping-cart" class="md:align-self-end mb-2 p-button-rounded" [disabled]="product.inventoryStatus === 'OUTOFSTOCK'"></button>
                        </div>
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
    templateUrl: './data-view-basic-demo.html'
})
export class DataViewBasicDemo {
    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
    }

    getSeverity (product) {
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
