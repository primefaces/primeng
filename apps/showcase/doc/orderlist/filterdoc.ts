import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'filter-doc',
    template: `
        <app-docsectiontext>
            <p>Filter value is checked against the property of an object configured with the <i>filterBy</i> property</p>
        </app-docsectiontext>
        <div class="card xl:flex xl:justify-center">
            <p-orderlist [value]="products" [listStyle]="{ 'max-height': '30rem' }" filterBy="name" filterPlaceholder="Filter by name">
                <ng-template let-option let-selected="selected" pTemplate="option">
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}" [alt]="option.name" />
                        <div class="flex-1 flex flex-col">
                            <span class="font-medium text-sm">{{ option.name }}</span>
                            <span
                                [ngClass]="{
                                    'text-sm': true,
                                    'text-surface-500': !selected,
                                    'dark:text-surface-400': !selected,
                                    'text-inherit': selected
                                }"
                                >{{ option.category }}</span
                            >
                        </div>
                        <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
                    </div>
                </ng-template>
            </p-orderlist>
        </div>
        <app-code [code]="code" selector="orderlist-filter-demo" [extFiles]="extFiles"></app-code>
    `
})
export class FilterDoc implements OnInit {
    products!: Product[];

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

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
        basic: `<p-orderlist
    [value]="products"
    [listStyle]="{ 'max-height': '30rem' }"
    filterBy="name"
    filterPlaceholder="Filter by name"
>
    <ng-template let-option let-selected="selected" pTemplate="option">
        <div class="flex flex-wrap p-1 items-center gap-4 w-full">
            <img
                class="w-12 shrink-0 rounded"
                src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}"
                [alt]="option.name"
            />
            <div class="flex-1 flex flex-col">
                <span class="font-medium text-sm">{{ option.name }}</span>
                <span
                    [ngClass]="{
                        'text-sm': true,
                        'text-surface-500': !selected,
                        'dark:text-surface-400': !selected,
                        'text-inherit': selected,
                    }"
                    >{{ option.category }}</span
                >
            </div>
            <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
        </div>
    </ng-template>
</p-orderlist>`,

        html: `<div class="card xl:flex xl:justify-center">
    <p-orderlist
        [value]="products"
        [listStyle]="{ 'max-height': '30rem' }"
        filterBy="name"
        filterPlaceholder="Filter by name"
    >
        <ng-template let-option let-selected="selected" pTemplate="option">
            <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                <img
                    class="w-12 shrink-0 rounded"
                    src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}"
                    [alt]="option.name"
                />
                <div class="flex-1 flex flex-col">
                    <span class="font-medium text-sm">{{ option.name }}</span>
                    <span
                        [ngClass]="{
                            'text-sm': true,
                            'text-surface-500': !selected,
                            'dark:text-surface-400': !selected,
                            'text-inherit': selected,
                        }"
                        >{{ option.category }}</span
                    >
                </div>
                <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
            </div>
        </ng-template>
    </p-orderlist>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { OrderListModule } from 'primeng/orderlist';

@Component({
    selector: 'orderlist-filter-demo',
    templateUrl: './orderlist-filter-demo.html',
    standalone: true,
    imports: [OrderListModule],
    providers: [ProductService]
})
export class OrderlistFilterDemo implements OnInit {
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
