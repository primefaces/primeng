import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'carousel-circular-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>autoplayInterval</i> is defined in milliseconds, items are scrolled automatically. In addition, for infinite scrolling <i>circular</i> property needs to be added which is enabled automatically in auto play mode.</p>
        </app-docsectiontext>
        <div class="card">
            <p-carousel [value]="products" [numVisible]="3" [numScroll]="3" [circular]="true" [responsiveOptions]="responsiveOptions" autoplayInterval="3000">
                <ng-template let-product pTemplate="item">
                    <div class="border border-surface rounded-border m-2 p-4">
                        <div class="mb-4">
                            <div class="relative mx-auto">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full rounded-border" />
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                            </div>
                        </div>
                        <div class="mb-4 font-medium">{{ product.name }}</div>
                        <div class="flex justify-between items-center">
                            <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                            <span>
                                <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                                <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                            </span>
                        </div>
                    </div>
                </ng-template>
            </p-carousel>
        </div>
        <app-code [code]="code" selector="carousel-circular-demo" [extFiles]="extFiles"></app-code>
    `
})
export class CircularDoc implements OnInit {
    products: Product[] | undefined;

    responsiveOptions: any[] | undefined;

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
            this.cdr.detectChanges();
        });

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
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
        basic: `<p-carousel 
    [value]="products" 
    [numVisible]="3" 
    [numScroll]="3" 
    [circular]="true" 
    [responsiveOptions]="responsiveOptions" 
    autoplayInterval="3000">
        <ng-template let-product pTemplate="item">
                <div class="border border-surface rounded-border m-2 p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" 
                                [alt]="product.name" 
                                class="w-full rounded-border" />
                            <p-tag 
                                [value]="product.inventoryStatus" 
                                [severity]="getSeverity(product.inventoryStatus)" 
                                class="absolute" 
                                [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                        </div>
                    </div>
                    <div class="mb-4 font-medium">
                        {{ product.name }}
                    </div>
                    <div class="flex justify-between items-center">
                    <div class="mt-0 font-semibold text-xl">
                        {{ '$' + product.price }}
                    </div>
                        <span>
                            <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                            <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                        </span>
                    </div>
                </div>
        </ng-template>
</p-carousel>`,
        html: `<div class="card">
    <p-carousel 
        [value]="products" 
        [numVisible]="3" 
        [numScroll]="3" 
        [circular]="true" 
        [responsiveOptions]="responsiveOptions" 
        autoplayInterval="3000">
        <ng-template let-product pTemplate="item">
                <div class="border border-surface rounded-border m-2 p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" 
                                [alt]="product.name" 
                                class="w-full rounded-border" />
                            <p-tag 
                                [value]="product.inventoryStatus" 
                                [severity]="getSeverity(product.inventoryStatus)" 
                                class="absolute" 
                                [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                        </div>
                    </div>
                    <div class="mb-4 font-medium">
                        {{ product.name }}
                    </div>
                    <div class="flex justify-between items-center">
                    <div class="mt-0 font-semibold text-xl">
                        {{ '$' + product.price }}
                    </div>
                        <span>
                            <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                            <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                        </span>
                    </div>
                </div>
            </ng-template>
    </p-carousel>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'carousel-circular-demo',
    templateUrl: './carousel-circular-demo.html',
    standalone: true,
    imports: [CarouselModule, ButtonModule, TagModule],
    providers: [ProductService]
})
export class CarouselCircularDemo implements OnInit{
    products: Product[] | undefined;

    responsiveOptions: any[] | undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

       this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
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
