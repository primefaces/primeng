import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'multiple-selection-doc',
    template: ` <app-docsectiontext>
            <p>
                More than one row is selectable by setting <i>selectionMode</i> to <i>multiple</i>. By default in multiple selection mode, metaKey press (e.g. <i>⌘</i>) is not necessary to add to existing selections. When the optional
                <i>metaKeySelection</i> is present, behavior is changed in a way that selecting a new row requires meta key to be present. Note that in touch enabled devices, DataTable always ignores metaKey.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <div class="flex justify-content-center align-items-center mb-4 gap-2">
                    <p-inputSwitch [(ngModel)]="metaKey" inputId="input-metakey" />
                    <label for="input-metakey">MetaKey</label>
                </div>
                <p-table [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [metaKeySelection]="metaKey" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
                        <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex">
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-multiple-selection-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleSelectionDoc {
    products!: Product[];

    selectedProducts!: Product;

    metaKey: boolean = true;

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<div class="flex justify-content-center align-items-center mb-4 gap-2">
    <p-inputSwitch [(ngModel)]="metaKey" inputId="input-metakey" />
    <label for="input-metakey">MetaKey</label>
</div>
<p-table 
    [value]="products" 
    selectionMode="multiple" 
    [(selection)]="selectedProducts" 
    [metaKeySelection]="metaKey"
    dataKey="code" 
    [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
            <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex">
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
    <p-table 
        [value]="products" 
        selectionMode="multiple" 
        [(selection)]="selectedProducts" 
        [metaKeySelection]="metaKey" 
        dataKey="code" 
        [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template pTemplate="header">
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product let-rowIndex="rowIndex">
                <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex">
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
    selector: 'table-multiple-selection-demo',
    templateUrl: 'table-multiple-selection-demo.html',
    standalone: true,
    imports: [TableModule, InputSwitchModule, FormsModule, CommonModule],
    providers: [ProductService]
})
export class TableMultipleSelectionDemo implements OnInit{
    products!: Product[];

    selectedProducts!: Product;

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
