import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'filter-sort-edit-doc',
    template: ` <app-docsectiontext>
            <p>Cell Editing with Sorting and Filter</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="code" style="width:25%">Code <p-sortIcon field="code" /></th>
                            <th pSortableColumn="name" style="width:25%">Name <p-sortIcon field="name" /></th>
                            <th pSortableColumn="category" style="width:25%">Quantity <p-sortIcon field="quantity" /></th>
                            <th pSortableColumn="quantity" style="width:25%">Price <p-sortIcon field="price" /></th>
                        </tr>
                        <tr>
                            <th>
                                <p-columnFilter type="text" field="code" [showClearButton]="false" />
                            </th>
                            <th>
                                <p-columnFilter type="text" field="name" [showClearButton]="false" />
                            </th>
                            <th>
                                <p-columnFilter type="text" field="quantity" [showClearButton]="false" />
                            </th>
                            <th>
                                <p-columnFilter type="text" field="price" [showClearButton]="false" />
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product let-editing="editing">
                        <tr>
                            <td [pEditableColumn]="product.code" pEditableColumnField="code">
                                <p-cellEditor>
                                    <ng-template pTemplate="input">
                                        <input pInputText type="text" [(ngModel)]="product.code" />
                                    </ng-template>
                                    <ng-template pTemplate="output">
                                        {{ product.code }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product.name" pEditableColumnField="name">
                                <p-cellEditor>
                                    <ng-template pTemplate="input">
                                        <input pInputText type="text" [(ngModel)]="product.name" required />
                                    </ng-template>
                                    <ng-template pTemplate="output">
                                        {{ product.name }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product.quantity" pEditableColumnField="quantity">
                                <p-cellEditor>
                                    <ng-template pTemplate="input">
                                        <input pInputText [(ngModel)]="product.quantity" />
                                    </ng-template>
                                    <ng-template pTemplate="output">
                                        {{ product.quantity }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product.price" pEditableColumnField="price">
                                <p-cellEditor>
                                    <ng-template pTemplate="input">
                                        <input pInputText type="text" [(ngModel)]="product.price" />
                                    </ng-template>
                                    <ng-template pTemplate="output">
                                        {{ product.price | currency : 'USD' }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-filter-sort-edit-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSortEditDoc {
    products!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-table 
    [value]="products" dataKey="id" 
    [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
            <tr>
                <th style="width:25%">
                    Code
                </th>
                <th style="width:25%">
                    Name
                </th>
                <th style="width:25%">
                    Inventory Status
                </th>
                <th style="width:25%">
                    Price
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-editing="editing">
            <tr>
                <td [pEditableColumn]="product.code" pEditableColumnField="code">
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input 
                                pInputText 
                                type="text" 
                                [(ngModel)]="product.code" />
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{ product.code }}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td [pEditableColumn]="product.name" pEditableColumnField="name">
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input 
                                pInputText 
                                type="text" 
                                [(ngModel)]="product.name" 
                                required />
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{ product.name }}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td [pEditableColumn]="product.inventoryStatus" pEditableColumnField="inventoryStatus">
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input 
                                pInputText 
                                [(ngModel)]="product.inventoryStatus" />
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{ product.inventoryStatus }}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td [pEditableColumn]="product.price" pEditableColumnField="price">
                    <p-cellEditor>
                        <ng-template pTemplate="input">
                            <input 
                                pInputText type="text" 
                                [(ngModel)]="product.price" />
                        </ng-template>
                        <ng-template pTemplate="output">
                            {{ product.price | currency: 'USD' }}
                        </ng-template>
                    </p-cellEditor>
                </td>
            </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table 
        [value]="products" dataKey="id" 
        [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template pTemplate="header">
                <tr>
                    <th style="width:25%">
                        Code
                    </th>
                    <th style="width:25%">
                        Name
                    </th>
                    <th style="width:25%">
                        Inventory Status
                    </th>
                    <th style="width:25%">
                        Price
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product let-editing="editing">
                <tr>
                    <td [pEditableColumn]="product.code" pEditableColumnField="code">
                        <p-cellEditor>
                            <ng-template pTemplate="input">
                                <input 
                                    pInputText 
                                    type="text" 
                                    [(ngModel)]="product.code" />
                            </ng-template>
                            <ng-template pTemplate="output">
                                {{ product.code }}
                            </ng-template>
                        </p-cellEditor>
                    </td>
                    <td [pEditableColumn]="product.name" pEditableColumnField="name">
                        <p-cellEditor>
                            <ng-template pTemplate="input">
                                <input 
                                    pInputText 
                                    type="text" 
                                    [(ngModel)]="product.name" 
                                    required />
                            </ng-template>
                            <ng-template pTemplate="output">
                                {{ product.name }}
                            </ng-template>
                        </p-cellEditor>
                    </td>
                    <td [pEditableColumn]="product.inventoryStatus" pEditableColumnField="inventoryStatus">
                        <p-cellEditor>
                            <ng-template pTemplate="input">
                                <input 
                                    pInputText 
                                    [(ngModel)]="product.inventoryStatus" />
                            </ng-template>
                            <ng-template pTemplate="output">
                                {{ product.inventoryStatus }}
                            </ng-template>
                        </p-cellEditor>
                    </td>
                    <td [pEditableColumn]="product.price" pEditableColumnField="price">
                        <p-cellEditor>
                            <ng-template pTemplate="input">
                                <input 
                                    pInputText type="text" 
                                    [(ngModel)]="product.price" />
                            </ng-template>
                            <ng-template pTemplate="output">
                                {{ product.price | currency: 'USD' }}
                            </ng-template>
                        </p-cellEditor>
                    </td>
                </tr>
            </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'table-filter-sort-edit-demo',
    templateUrl: 'table-filter-sort-edit-demo.html',
    standalone: true,
    imports: [TableModule, InputTextModule, CommonModule],
    providers: [ProductService]
})
export class FilterSortEditDoc implements OnInit {
    products!: Product[];

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
        scss: `
:host ::ng-deep .p-cell-editing {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}`,
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
