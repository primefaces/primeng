import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'multiple-selection-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>
                In multiple mode, selection binding should be an array. For touch enabled devices, selection is managed by tapping and for other devices metakey or <i>shiftkey</i> are required. Setting <i>metaKeySelection</i> property as false
                enables multiple selection without meta key.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center align-items-center gap-2 mb-3">
                <p-inputSwitch inputId="metakey" [(ngModel)]="metaKeySelection" label="MetaKey"></p-inputSwitch>
                <span>MetaKey</span>
            </div>
            <p-table [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [metaKeySelection]="metaKeySelection" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="caption"> Multiple Selection with MetaKey </ng-template>
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
        <app-code [code]="code" selector="table-multiple-selection-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleSelectionDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    products!: Product[];

    selectedProducts!: Product;

    metaKeySelection: boolean = true;

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<div class="flex justify-content-center align-items-center gap-2 mb-3">
    <p-inputSwitch inputId="metakey" [(ngModel)]="metaKeySelection" label="MetaKey"></p-inputSwitch>
    <span>MetaKey</span>
</div>
<p-table [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [metaKeySelection]="metaKeySelection" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="caption"> Multiple Selection with MetaKey </ng-template>
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
        html: `
<div class="card">
    <div class="flex justify-content-center align-items-center gap-2 mb-3">
        <p-inputSwitch inputId="metakey" [(ngModel)]="metaKeySelection" label="MetaKey"></p-inputSwitch>
        <span>MetaKey</span>
    </div>
    <p-table [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [metaKeySelection]="metaKeySelection" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="caption"> Multiple Selection with MetaKey </ng-template>
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
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-multiple-selection-demo',
    templateUrl: 'table-multiple-selection-demo.html'
})
export class TableMultipleSelectionDemo implements OnInit{
    products!: Product[];

    selectedProducts!: Product;

    metaKeySelection: boolean = true;

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
