import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'column-resize-expand-mode-doc',
    template: ` <app-docsectiontext>
            <p>Setting <i>columnResizeMode</i> as <i>expand</i> changes the table width as well.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" [resizableColumns]="true" columnResizeMode="expand" styleClass="p-datatable-gridlines" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th pResizableColumn>Code</th>
                            <th pResizableColumn>Name</th>
                            <th pResizableColumn>Category</th>
                            <th pResizableColumn>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product>
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
        <app-code [code]="code" selector="table-column-resize-expand-mode-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnResizeExpandModeDoc {
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
    [value]="products" 
    [resizableColumns]="true" 
    columnResizeMode="expand" 
    styleClass="p-datatable-gridlines" 
    [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th pResizableColumn>Code</th>
                <th pResizableColumn>Name</th>
                <th pResizableColumn>Category</th>
                <th pResizableColumn>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{product.code}}</td>
                <td>{{product.name}}</td>
                <td>{{product.category}}</td>
                <td>{{product.quantity}}</td>
            </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table 
        [value]="products" 
        [resizableColumns]="true" 
        columnResizeMode="expand" 
        styleClass="p-datatable-gridlines" 
        [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="header">
                <tr>
                    <th pResizableColumn>Code</th>
                    <th pResizableColumn>Name</th>
                    <th pResizableColumn>Category</th>
                    <th pResizableColumn>Quantity</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr>
                    <td>{{product.code}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.category}}</td>
                    <td>{{product.quantity}}</td>
                </tr>
            </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'table-column-resize-expand-mode-demo',
    templateUrl: 'table-column-resize-expand-mode-demo.html',
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableColumnResizeExpandModeDemo implements OnInit{
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
