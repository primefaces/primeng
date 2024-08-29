import { Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'data-view-basic-demo',
    template: `
        <app-docsectiontext>
            <p>DataView requires a value to display along with a <i>list</i> template that receives an object in the collection to return content.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataView #dv [value]="products">
                <ng-template pTemplate="list" let-products>
                    <div class="grid grid-cols-12 gap-4 grid-nogutter">
                        <div class="col-span-12" *ngFor="let item of products; let first = first" class="col-span-12">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{'border-t border-surface-200 dark:border-surface-700': !first}">
                                <div class="md:w-40 relative">
                                    <img class="block xl:block mx-auto rounded-border w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                                    <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" [style.left.px]="4" [style.top.px]="4" />
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                                            <div class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ '$' + item.price }}</span>
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button icon="pi pi-heart" [outlined]="true" />
                                            <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial whitespace-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataView>
        </div>
        <app-code [code]="code" selector="data-view-basic-demo" [extFiles]="extFiles"></app-code>
    `
})
export class BasicDoc {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

    code: Code = {
        basic: `<p-dataView #dv [value]="products">
    <ng-template pTemplate="list" let-products>
        <div class="grid grid-cols-12 gap-4 grid-nogutter">
            <div class="col-span-12" *ngFor="let item of products; let first = first" class="col-span-12">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{'border-t border-surface-200 dark:border-surface-700': !first}">
                    <div class="md:w-40 relative">
                        <img class="block xl:block mx-auto rounded-border w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                        <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" [style.left.px]="4" [style.top.px]="4" />
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                                <div class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ '$' + item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <p-button icon="pi pi-heart" [outlined]="true" />
                                <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial whitespace-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataView>`,

        html: `<div class="card">
    <p-dataView #dv [value]="products">
        <ng-template pTemplate="list" let-products>
            <div class="grid grid-cols-12 gap-4 grid-nogutter">
                <div class="col-span-12" *ngFor="let item of products; let first = first" class="col-span-12">
                    <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{'border-t border-surface-200 dark:border-surface-700': !first}">
                        <div class="md:w-40 relative">
                            <img class="block xl:block mx-auto rounded-border w-full" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + item.image" [alt]="item.name" />
                            <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)" class="absolute" [style.left.px]="4" [style.top.px]="4" />
                        </div>
                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                <div>
                                    <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                    <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                                </div>
                                <div class="bg-surface-100 dark:bg-surface-700 p-1" style="border-radius: 30px">
                                    <div class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{ item.rating }}</span>
                                        <i class="pi pi-star-fill text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col md:items-end gap-8">
                                <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ '$' + item.price }}</span>
                                <div class="flex flex-row-reverse md:flex-row gap-2">
                                    <p-button icon="pi pi-heart" [outlined]="true" />
                                    <p-button icon="pi pi-shopping-cart" class="flex-auto md:flex-initial whitespace-nowrap" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-dataView>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'data-view-basic-demo',
    templateUrl: './data-view-basic-demo.html',
    standalone: true,
    imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
    providers: [ProductService]
})
export class DataViewBasicDemo {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
    }

    getSeverity (product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
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
