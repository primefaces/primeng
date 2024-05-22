import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'single-selection-doc',
    template: ` <app-docsectiontext>
            <p>
                Single row selection is enabled by defining <i>selectionMode</i> as <i>single</i> along with a value binding using <i>selection</i> property. When available, it is suggested to provide a unique identifier of a row with
                <i>dataKey</i> to optimize performance.
            </p>
            <p>
                By default, metaKey press (e.g. <i>⌘</i>) is necessary to unselect a row however this can be configured with disabling the <i>metaKeySelection</i> property. In touch enabled devices this option has no effect and behavior is same as
                setting it to false.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <div class="flex justify-content-center align-items-center mb-4 gap-2">
                    <p-inputSwitch [(ngModel)]="metaKey" inputId="input-metakey" />
                    <label for="input-metakey">MetaKey</label>
                </div>
                <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" [metaKeySelection]="metaKey" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product>
                        <tr [pSelectableRow]="product">
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-single-selection-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSelectionDoc {
    products!: Product[];

    selectedProduct!: Product;

    metaKey: boolean = true;

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="metaKey" inputId="input-metakey" />
    <p-table 
        [value]="products" 
        selectionMode="single" 
        [(selection)]="selectedProduct" 
        [metaKeySelection]="metaKey" dataKey="id" 
        [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template pTemplate="header">
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr [pSelectableRow]="product">
                    <td>{{ product.code }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.quantity }}</td>
                </tr>
            </ng-template>
    </p-table>`,

        html: `<div class="card">
    <div class="flex justify-content-center align-items-center mb-4 gap-2">
        <p-inputSwitch [(ngModel)]="metaKey" inputId="input-metakey" />
        <label for="input-metakey">MetaKey</label>
    </div>
    <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" [metaKeySelection]="metaKey" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr [pSelectableRow]="product">
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'table-single-selection-demo',
    templateUrl: 'table-single-selection-demo.html',
    standalone: true,
    imports: [TableModule, InputSwitchModule, FormsModule, CommonModule],
    providers: [ProductService]
})
export class TableSingleSelectionDemo implements OnInit{
    products!: Product[];

    selectedProduct!: Product;

    metaKey: boolean = true;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
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
