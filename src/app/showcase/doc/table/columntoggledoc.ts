import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'column-toggle-doc',
    template: ` <app-docsectiontext>
            <p>This demo uses a multiselect component to implement toggleable columns.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="caption">
                        <p-multiSelect display="chip" [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ 'min-width': '200px' }" placeholder="Choose Columns" />
                    </ng-template>
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th>Code</th>
                            <th *ngFor="let col of columns">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product let-columns="columns">
                        <tr>
                            <td>{{ product.code }}</td>
                            <td *ngFor="let col of columns">
                                {{ product[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-column-toggle-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnToggleDoc {
    products!: Product[];

    cols!: Column[];

    selectedColumns!: Column[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this.selectedColumns = this.cols;
    }

    code: Code = {
        basic: `<p-table 
    [columns]="selectedColumns" 
    [value]="products" 
    [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="caption">
            <p-multiSelect 
                display="chip" 
                [options]="cols" 
                [(ngModel)]="selectedColumns" 
                optionLabel="header"
                selectedItemsLabel="{0} columns selected" 
                [style]="{'min-width': '200px'}" 
                placeholder="Choose Columns" />
        </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th>Code</th>
                <th *ngFor="let col of columns">
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-columns="columns">
            <tr>
                <td>{{product.code}}</td>
                <td *ngFor="let col of columns">
                    {{product[col.field]}}
                </td>
            </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table 
        [columns]="selectedColumns" 
        [value]="products" 
        [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="caption">
                <p-multiSelect 
                    display="chip" 
                    [options]="cols" 
                    [(ngModel)]="selectedColumns" 
                    optionLabel="header"
                    selectedItemsLabel="{0} columns selected" 
                    [style]="{'min-width': '200px'}" 
                    placeholder="Choose Columns" />
            </ng-template>
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th>Code</th>
                    <th *ngFor="let col of columns">
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product let-columns="columns">
                <tr>
                    <td>{{product.code}}</td>
                    <td *ngFor="let col of columns">
                        {{product[col.field]}}
                    </td>
                </tr>
            </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'table-column-toggle-demo',
    templateUrl: 'table-column-toggle-demo.html',
    standalone: true,
    imports: [TableModule, MultiSelectModule, CommonModule],
    providers: [ProductService]
})
export class TableColumnToggleDemo implements OnInit{
    products!: Product[];

    cols!: Column[];

    selectedColumns!: Column[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this.selectedColumns = this.cols;
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
