import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'drag-drop-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Items can be reordered using drag and drop by enabling <i>dragdrop</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-orderList [value]="products" [listStyle]="{ 'max-height': '30rem' }" header="Products" [dragdrop]="true">
                <ng-template let-product pTemplate="item">
                    <div class="flex align-items-center p-2 w-full flex-wrap">
                        <div class="w-full text-center lg:w-auto lg:text-left">
                            <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="mr-3 shadow-3 w-7rem mb-3 lg:w-5rem lg:mb-auto" />
                        </div>
                        <div class="flex-1">
                            <h5 class="mb-2">{{ product.name }}</h5>
                            <i class="pi pi-tag vertical-align-middle mr-2"></i>
                            <span class="vertical-align-middle line-height-1">{{ product.category }}</span>
                        </div>
                        <div class="flex flex-column align-items-end">
                            <h6 class="mb-2">{{ '$ ' + product.price }}</h6>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                        </div>
                    </div>
                </ng-template>
            </p-orderList>
        </div>
        <app-code [code]="code" selector="orderlist-drag-drop-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class DragDropDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

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

    code: Code = {
        basic: `
<p-orderList [value]="products" [listStyle]="{ 'max-height': '30rem' }" header="Products" [dragdrop]="true">
    <ng-template let-product pTemplate="item">
        <div class="flex align-items-center p-2 w-full flex-wrap">
            <div class="w-full text-center lg:w-auto lg:text-left">
                <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="mr-3 shadow-3 w-7rem mb-3 lg:w-5rem lg:mb-auto" />
            </div>
            <div class="flex-1">
                <h5 class="mb-2">{{ product.name }}</h5>
                <i class="pi pi-tag vertical-align-middle mr-2"></i>
                <span class="vertical-align-middle line-height-1">{{ product.category }}</span>
            </div>
            <div class="flex flex-column align-items-end">
                <h6 class="mb-2">{{ '$ ' + product.price }}</h6>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
            </div>
        </div>
    </ng-template>
</p-orderList>`,

        html: `
<div class="card flex justify-content-center">
    <p-orderList [value]="products" [listStyle]="{ 'max-height': '30rem' }" header="Products" [dragdrop]="true">
        <ng-template let-product pTemplate="item">
            <div class="flex align-items-center p-2 w-full flex-wrap">
                <div class="w-full text-center lg:w-auto lg:text-left">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="mr-3 shadow-3 w-7rem mb-3 lg:w-5rem lg:mb-auto" />
                </div>
                <div class="flex-1">
                    <h5 class="mb-2">{{ product.name }}</h5>
                    <i class="pi pi-tag vertical-align-middle mr-2"></i>
                    <span class="vertical-align-middle line-height-1">{{ product.category }}</span>
                </div>
                <div class="flex flex-column align-items-end">
                    <h6 class="mb-2">{{ '$ ' + product.price }}</h6>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </div>
            </div>
        </ng-template>
    </p-orderList>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'orderlist-drag-drop-demo',
    templateUrl: './orderlist-drag-drop-demo.html'
})
export class OrderlistDragDropDemo implements OnInit {
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
