import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'carousel-vertical-demo',
    template: `
        <app-docsectiontext>
            <p>To create a vertical Carousel, <i>orientation</i> needs to be set to <i>vertical</i> along with a <i>verticalViewPortHeight</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-carousel [value]="products" [numVisible]="1" [numScroll]="1" orientation="vertical" verticalViewPortHeight="360px">
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
        <app-code [code]="code" selector="carousel-vertical-demo" [extFiles]="extFiles"></app-code>
    `
})
export class VerticalDoc implements OnInit {
    products: Product[] | undefined;

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
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
        basic: `<p-carousel 
    [value]="products" 
    [numVisible]="1" 
    [numScroll]="1" 
    orientation="vertical" 
    verticalViewPortHeight="360px">
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
        html: `<div class="card flex justify-center">
    <p-carousel 
        [value]="products" 
        [numVisible]="1" 
        [numScroll]="1" 
        orientation="vertical" 
        verticalViewPortHeight="360px">
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
                    <div class="mb-4 font-medium">{{ product.name }}</div>
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
    selector: 'carousel-vertical-demo',
    templateUrl: './carousel-vertical-demo.html',
    standalone: true,
    imports: [CarouselModule, ButtonModule, TagModule],
    providers: [ProductService]
})
export class CarouselVerticalDemo implements OnInit {
    products: Product[] | undefined;

    responsiveOptions: any[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
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
        scss: `
:host ::ng-deep {
    .product-item {
        .product-item-content {
            border: 1px solid var(--surface-d);
            border-radius: 3px;
            margin: .3rem;
            text-align: center;
            padding: 2rem 0;
        }
    
        .product-image {
            width: 50%;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
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
