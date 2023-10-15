import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'lazy-load-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded on demand. To implement lazy loading, enable the <i>lazy</i> property and implement <i>onLazyLoad</i> callback to
                return data.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-virtualScroller [value]="virtualProducts" scrollHeight="450px" [itemSize]="100" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
                <ng-template pTemplate="header"> List of Products </ng-template>
                <ng-template let-product pTemplate="item">
                    <div class="flex align-items-center p-3 w-full flex-wrap">
                        <div>
                            <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="mr-3 w-4rem md:w-7rem shadow-2" />
                        </div>
                        <div class="flex-1">
                            <h5 class="mb-2 text-base">{{ product.name }}</h5>
                            <i class="pi pi-tag hidden md:inline vertical-align-middle mr-2"></i>
                            <span class="hidden md:inline-flex vertical-align-middle mr-2">{{ product.category }}</span>
                        </div>
                        <div class="flex flex-column align-items-end">
                            <h6 style="width:25px; height:14px;" class="mb-2">{{ '$' + product.price }}</h6>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                        </div>
                    </div>
                </ng-template>
                <ng-template let-product pTemplate="loadingItem">
                    <div class="flex align-items-center p-3 w-full flex-wrap loading-item">
                        <div class="mr-3" style="width:100px; height:66px;"></div>
                        <div class="flex-1">
                            <h5 class="mb-2 text-base"></h5>
                            <i class="hidden md:inline vertical-align-middle mr-2"></i>
                            <span class="hidden md:inline-flex vertical-align-middle mr-2"></span>
                        </div>
                        <div class="flex flex-column align-items-end">
                            <h6 style="width:25px; height:14px;" class="mb-2"></h6>
                            <span class="block h-2rem" style="width:100px"></span>
                        </div>
                    </div>
                </ng-template>
            </p-virtualScroller>
        </div>
        <app-code [code]="code" selector="virtual-scroller-lazy-load-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class LazyLoadDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    products!: Product[];

    virtualProducts!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.products = Array.from({ length: 10000 }).map(() => this.productService.generatePrduct());
        this.virtualProducts = Array.from({ length: 10000 });
    }

    loadCarsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            let loadedProducts = this.products.slice(event.first, event.first + event.rows);

            Array.prototype.splice.apply(this.virtualProducts, [...[event.first, event.rows], ...loadedProducts]);

            event.forceUpdate();
        }, 1000);
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
<p-virtualScroller [value]="virtualProducts" scrollHeight="450px" [itemSize]="100" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
    <ng-template pTemplate="header"> List of Products </ng-template>
    <ng-template let-product pTemplate="item">
        <div class="flex align-items-center p-3 w-full flex-wrap">
            <div>
                <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="mr-3 w-4rem md:w-7rem shadow-2" />
            </div>
            <div class="flex-1">
                <h5 class="mb-2 text-base">{{ product.name }}</h5>
                <i class="pi pi-tag hidden md:inline vertical-align-middle mr-2"></i>
                <span class="hidden md:inline-flex vertical-align-middle mr-2">{{ product.category }}</span>
            </div>
            <div class="flex flex-column align-items-end">
                <h6 style="width:25px; height:14px;" class="mb-2">{{ '$' + product.price }}</h6>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
            </div>
        </div>
    </ng-template>
    <ng-template let-product pTemplate="loadingItem">
        <div class="flex align-items-center p-3 w-full flex-wrap loading-item">
            <div class="mr-3" style="width:100px; height:66px;"></div>
            <div class="flex-1">
                <h5 class="mb-2 text-base"></h5>
                <i class="hidden md:inline vertical-align-middle mr-2"></i>
                <span class="hidden md:inline-flex vertical-align-middle mr-2"></span>
            </div>
            <div class="flex flex-column align-items-end">
                <h6 style="width:25px; height:14px;" class="mb-2"></h6>
                <span class="block h-2rem" style="width:100px"></span>
            </div>
        </div>
    </ng-template>
</p-virtualScroller>`,

        html: `
<div class="card">
    <p-virtualScroller [value]="virtualProducts" scrollHeight="450px" [itemSize]="100" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
        <ng-template pTemplate="header"> List of Products </ng-template>
        <ng-template let-product pTemplate="item">
            <div class="flex align-items-center p-3 w-full flex-wrap">
                <div>
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="mr-3 w-4rem md:w-7rem shadow-2" />
                </div>
                <div class="flex-1">
                    <h5 class="mb-2 text-base">{{ product.name }}</h5>
                    <i class="pi pi-tag hidden md:inline vertical-align-middle mr-2"></i>
                    <span class="hidden md:inline-flex vertical-align-middle mr-2">{{ product.category }}</span>
                </div>
                <div class="flex flex-column align-items-end">
                    <h6 style="width:25px; height:14px;" class="mb-2">{{ '$' + product.price }}</h6>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </div>
            </div>
        </ng-template>
        <ng-template let-product pTemplate="loadingItem">
            <div class="flex align-items-center p-3 w-full flex-wrap loading-item">
                <div class="mr-3" style="width:100px; height:66px;"></div>
                <div class="flex-1">
                    <h5 class="mb-2 text-base"></h5>
                    <i class="hidden md:inline vertical-align-middle mr-2"></i>
                    <span class="hidden md:inline-flex vertical-align-middle mr-2"></span>
                </div>
                <div class="flex flex-column align-items-end">
                    <h6 style="width:25px; height:14px;" class="mb-2"></h6>
                    <span class="block h-2rem" style="width:100px"></span>
                </div>
            </div>
        </ng-template>
    </p-virtualScroller>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Product } from '../../domain/product';
import { ProductService } from 'src/service/productservice';

@Component({
    selector: 'virtual-scroller-lazy-load-demo',
    templateUrl: './virtual-scroller-lazy-load-demo.html'
})
export class VirtualScrollerLazyLoadDemo implements OnInit {
    products!: Product[];

    virtualProducts!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((products) => {
            this.products = products;
        });
        this.virtualProducts = Array.from({ length: 10000 });
    }

    loadCarsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            let loadedProducts = this.products.slice(event.first, event.first + event.rows);

            Array.prototype.splice.apply(this.virtualProducts, [...[event.first, event.rows], ...loadedProducts]);

            event.forceUpdate();
        }, 1000);
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
