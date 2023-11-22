import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'basic-doc',
    template: ` 
        <app-docsectiontext>
            <p>OrderList is used as a controlled input with <i>value</i> properties. Content of a list item needs to be defined with the <i>pTemplate</i> property that receives an object in the list as parameter.</p>
        </app-docsectiontext>
        <div class="card xl:flex xl:justify-content-center">
            <p-orderList [value]="products" [listStyle]="{ height: '25rem' }" header="Products">
                <ng-template let-product pTemplate="item">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-4rem shadow-2 flex-shrink-0 border-round" />
                        <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ product.name }}</span>
                            <div class="flex align-items-center gap-2">
                                <i class="pi pi-tag text-sm"></i>
                                <span>{{ product.category }}</span>
                            </div>
                        </div>
                        <span class="font-bold text-900">{{ '$' + product.price }}</span>
                    </div>
                </ng-template>
            </p-orderList>
        </div>
        <app-code [code]="code" selector="orderlist-basic-demo" [extFiles]="extFiles"></app-code>
    `
})
export class BasicDoc implements OnInit {

    products!: Product[];

    constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((cars) => {
            this.products = cars;
            this.cdr.detectChanges();
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    code: Code = {
        basic: `
<p-orderList [value]="products" [listStyle]="{ height: '25rem' }" header="Products">
    <ng-template let-product pTemplate="item">
        <div class="flex flex-wrap p-2 align-items-center gap-3">
            <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-4rem shadow-2 flex-shrink-0 border-round" />
            <div class="flex-1 flex flex-column gap-2">
                <span class="font-bold">{{ product.name }}</span>
                <div class="flex align-items-center gap-2">
                    <i class="pi pi-tag text-sm"></i>
                    <span>{{ product.category }}</span>
                </div>
            </div>
            <span class="font-bold text-900">{{ '$' + product.price }}</span>
        </div>
    </ng-template>
</p-orderList>`,

        html: `
<div class="card xl:flex xl:justify-content-center">
    <p-orderList [value]="products" [listStyle]="{ height: '25rem' }" header="Products">
        <ng-template let-product pTemplate="item">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
                <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-4rem shadow-2 flex-shrink-0 border-round" />
                <div class="flex-1 flex flex-column gap-2">
                    <span class="font-bold">{{ product.name }}</span>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-tag text-sm"></i>
                        <span>{{ product.category }}</span>
                    </div>
                </div>
                <span class="font-bold text-900">{{ '$' + product.price }}</span>
            </div>
        </ng-template>
    </p-orderList>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'orderlist-basic-demo',
    templateUrl: './orderlist-basic-demo.html'
})
export class OrderlistBasicDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((cars) => (this.products = cars));
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
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
