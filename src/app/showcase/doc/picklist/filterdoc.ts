import { ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'filter-doc',
    template: `
        <app-docsectiontext>
            <p>Filter value is checked against the property of an object configured with the <i>filterBy</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-pickList
                [source]="sourceProducts"
                [target]="targetProducts"
                sourceHeader="Available"
                targetHeader="Selected"
                [dragdrop]="true"
                [responsive]="true"
                [sourceStyle]="{ height: '30rem' }"
                [targetStyle]="{ height: '30rem' }"
                filterBy="name"
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
                breakpoint="1400px"
            >
                <ng-template let-product pTemplate="item">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                        <img class="w-4rem shadow-2 flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" alt="{item.name}" />
                        <div class="flex-1 flex flex-column gap-2">
                            <span class="font-bold">{{ product.name }}</span>
                            <div class="flex align-products-center gap-2">
                                <i class="pi pi-tag text-sm"></i>
                                <span>{{ product.category }}</span>
                            </div>
                        </div>
                        <span class="font-bold text-900">{{ '$' + product.price }}</span>
                    </div>
                </ng-template>
            </p-pickList>
        </div>
        <app-code [code]="code" selector="picklist-filter-demo" [extFiles]="extFiles"></app-code>
    `
})
export class FilterDoc {
    sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(private carService: ProductService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
    }

    code: Code = {
        basic: `<p-pickList [source]="sourceProducts" [target]="targetProducts" sourceHeader="Available" targetHeader="Selected" [dragdrop]="true" [responsive]="true" [sourceStyle]="{ height: '30rem' }"
    [targetStyle]="{ height: '30rem' }" filterBy="name" sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" breakpoint="1400px">
    <ng-template let-product pTemplate="item">
        <div class="flex flex-wrap p-2 align-items-center gap-3">
            <img class="w-4rem shadow-2 flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" alt="{item.name}" />
            <div class="flex-1 flex flex-column gap-2">
                <span class="font-bold">{{ product.name }}</span>
                <div class="flex align-products-center gap-2">
                    <i class="pi pi-tag text-sm"></i>
                    <span>{{ product.category }}</span>
                </div>
            </div>
            <span class="font-bold text-900">{{ '$' + product.price }}</span>
        </div>
    </ng-template>
</p-pickList>`,

        html: `
<div class="card">
    <p-pickList [source]="sourceProducts" [target]="targetProducts" sourceHeader="Available" targetHeader="Selected" [dragdrop]="true" [responsive]="true" [sourceStyle]="{ height: '30rem' }"
        [targetStyle]="{ height: '30rem' }" filterBy="name" sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" breakpoint="1400px">
        <ng-template let-product pTemplate="item">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
                <img class="w-4rem shadow-2 flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" alt="{item.name}" />
                <div class="flex-1 flex flex-column gap-2">
                    <span class="font-bold">{{ product.name }}</span>
                    <div class="flex align-products-center gap-2">
                        <i class="pi pi-tag text-sm"></i>
                        <span>{{ product.category }}</span>
                    </div>
                </div>
                <span class="font-bold text-900">{{ '$' + product.price }}</span>
            </div>
        </ng-template>
    </p-pickList>
</div>`,

        typescript: `
import { Component, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'picklist-filter-demo',
    templateUrl: './picklist-filter-demo.html'
})
export class PicklistFilterDemo {
    sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(
      private carService: ProductService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carService.getProductsSmall().then(products => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
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
