import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'size-doc',
    template: ` <app-docsectiontext>
            <p>In addition to a regular table, alternatives with alternative sizes are available.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <div class="flex justify-center mb-4">
                    <p-selectbutton [options]="sizes" [(ngModel)]="selectedSize" [multiple]="false" optionLabel="name" optionValue="value" />
                </div>
                <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [size]="selectedSize">
                    <ng-template #header>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-size-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeDoc {
    products!: Product[];

    sizes!: any[];

    selectedSize: any = undefined;

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.sizes = [
            { name: 'Small', value: 'small' },
            { name: 'Normal', value: undefined },
            { name: 'Large', value: 'large' }
        ];
    }

    code: Code = {
        basic: `<div class="flex justify-center mb-4">
    <p-selectbutton
        [options]="sizes"
        [(ngModel)]="selectedSize"
        [multiple]="false"
        optionLabel="name"
        optionValue="class" />
</div>
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [styleClass]="selectedSize.class">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <div class="flex justify-center mb-4">
        <p-selectbutton
            [options]="sizes"
            [(ngModel)]="selectedSize"
            [multiple]="false"
            optionLabel="name"
            optionValue="class" />
    </div>
    <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [styleClass]="selectedSize.class">
        <ng-template #header>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template #body let-product>
            <tr>
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'table-size-demo',
    templateUrl: 'table-size-demo.html',
    standalone: true,
    imports: [TableModule, SelectButton, CommonModule],
    providers: [ProductService]
})
export class TableSizeDemo {
    products!: Product[];

    sizes!: any[];

    selectedSize: any = '';

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.sizes = [
            { name: 'Small', class: 'p-datatable-sm' },
            { name: 'Normal', class: '' },
            { name: 'Large',  class: 'p-datatable-lg' }
        ];
    }
}`,
        data: `{
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
