import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>For custom content support define an <i>option</i> template that gets the item instance as a parameter. In addition <i>header</i> template is provided for further customization.</p>
        </app-docsectiontext>
        <div class="card xl:flex xl:justify-center">
            <p-orderlist [value]="products" dataKey="id" breakpoint="575px" scrollHeight="20rem">
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
        <app-code [code]="code" selector="orderlist-template-demo" [extFiles]="extFiles"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    products!: Product[];
    code: Code = {
        basic: `<p-orderlist
    [value]="products"
    dataKey="id"
    breakpoint="575px"
    scrollHeight="20rem"
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
        dataKey="id"
        breakpoint="575px"
        scrollHeight="20rem"
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
    selector: 'orderlist-template-demo',
    templateUrl: './orderlist-template-demo.html',
    standalone: true,
    imports: [OrderListModule],
    providers: [ProductService]
})
export class OrderlistTemplateDemo implements OnInit {
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
}
