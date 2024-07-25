import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'carousel-template-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content projection is available using the <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-carousel [value]="products" [numVisible]="3" [numScroll]="1" [responsiveOptions]="responsiveOptions">
                <ng-template pTemplate="header">
                    <p>Header content</p>
                </ng-template>
                <ng-template let-product pTemplate="item">
                    <div class="border-1 surface-border border-round m-2 p-3">
                        <div class="mb-3">
                            <div class="relative mx-auto">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full border-round" />
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                            </div>
                        </div>
                        <div class="mb-3 font-medium">{{ product.name }}</div>
                        <div class="flex justify-content-between align-items-center">
                            <div class="mt-0 font-semibold text-xl">{{ '$' + product.price }}</div>
                            <span>
                                <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                                <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                            </span>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <p>Footer content</p>
                </ng-template>
            </p-carousel>
        </div>
        <app-code [code]="code" selector="carousel-template-demo" [extFiles]="extFiles"></app-code>
    `
})
export class TemplateDoc implements OnInit {
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
    [numScroll]="1" 
    [responsiveOptions]="responsiveOptions">
        <ng-template pTemplate="header">
            <p>Header content</p>
        </ng-template>
        <ng-template let-product pTemplate="item">
            <div class="border-1 surface-border border-round m-2 p-3">
                <div class="mb-3">
                    <div class="relative mx-auto">
                        <img 
                            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" 
                            [alt]="product.name" 
                            class="w-full border-round" />
                        <p-tag 
                            [value]="product.inventoryStatus" 
                            [severity]="getSeverity(product.inventoryStatus)" 
                            class="absolute" 
                            [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                    </div>
                </div>
                <div class="mb-3 font-medium">
                    {{ product.name }}
                </div>
                <div class="flex justify-content-between align-items-center">
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
        <ng-template pTemplate="footer">
            <p>Footer content</p>
        </ng-template>
</p-carousel>`,
        html: `<div class="card">
    <p-carousel 
        [value]="products" 
        [numVisible]="3" 
        [numScroll]="1" 
        [responsiveOptions]="responsiveOptions">
            <ng-template pTemplate="header">
                <p>Header content</p>
            </ng-template>
            <ng-template let-product pTemplate="item">
                <div class="border-1 surface-border border-round m-2 p-3">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" 
                                [alt]="product.name" 
                                class="w-full border-round" />
                            <p-tag 
                                [value]="product.inventoryStatus" 
                                [severity]="getSeverity(product.inventoryStatus)" 
                                class="absolute" 
                                [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                        </div>
                    </div>
                    <div class="mb-3 font-medium">{{ product.name }}</div>
                    <div class="flex justify-content-between align-items-center">
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
            <ng-template pTemplate="footer">
                <p>Footer content</p>
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
    selector: 'carousel-template-demo',
    templateUrl: './carousel-template-demo.html',
    standalone: true,
    imports: [CarouselModule, ButtonModule, TagModule],
    providers: [ProductService]
})
export class CarouselTemplateDemo implements OnInit{
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
