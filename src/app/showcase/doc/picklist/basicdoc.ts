import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>PickList is used as a controlled input with <i>source</i> and <i>target</i> properties. Content of a list item needs to be defined with the <i>pTemplate</i> property that receives an object in the list as parameter.</p>
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
                breakpoint="1400px"
            >
                <ng-template let-product pTemplate="item">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                        <img class="w-4rem shadow-2 flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" alt="{item.name}" />
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
            </p-pickList>
        </div>
        <app-code [code]="code" selector="picklist-basic-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(private carService: ProductService) {}

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => (this.sourceProducts = products));
        this.targetProducts = [];
    }

    code: Code = {
        basic: `
<p-pickList [source]="sourceProducts" [target]="targetProducts" sourceHeader="Available" targetHeader="Selected" [dragdrop]="true" [responsive]="true" 
    [sourceStyle]="{ height: '30rem' }" [targetStyle]="{ height: '30rem' }" breakpoint="1400px">
    <ng-template let-product pTemplate="item">
        <div class="flex flex-wrap p-2 align-items-center gap-3">
            <img class="w-4rem shadow-2 flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" alt="{item.name}" />
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
</p-pickList>`,

        html: `
<div class="card">
    <p-pickList [source]="sourceProducts" [target]="targetProducts" sourceHeader="Available" targetHeader="Selected" [dragdrop]="true" [responsive]="true"
        [sourceStyle]="{ height: '30rem' }" [targetStyle]="{ height: '30rem' }" breakpoint="1400px">
        <ng-template let-product pTemplate="item">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
                <img class="w-4rem shadow-2 flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" alt="{item.name}" />
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
    </p-pickList>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'picklist-basic-demo',
    templateUrl: './picklist-basic-demo.html'
})
export class PicklistBasicDemo {
    sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(private carService: ProductService) {}

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => (this.sourceProducts = products));
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
