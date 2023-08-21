import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'column-toggle-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>This demo uses a multiselect component to implement toggleable columns.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="caption">
                    <p-multiSelect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ 'min-width': '200px' }" placeholder="Choose Columns"></p-multiSelect>
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
        <app-code [code]="code" selector="table-column-toggle-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnToggleDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    products!: Product[];

    cols!: Column[];

    _selectedColumns!: Column[];

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

        this._selectedColumns = this.cols;
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter((col) => val.includes(col));
    }

    code: Code = {
        basic: `
<p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="caption">
        <p-multiSelect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header"
            selectedItemsLabel="{0} columns selected" [style]="{'min-width': '200px'}" placeholder="Choose Columns"></p-multiSelect>
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
        html: `
<div class="card">
    <p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="caption">
            <p-multiSelect [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header"
                selectedItemsLabel="{0} columns selected" [style]="{'min-width': '200px'}" placeholder="Choose Columns"></p-multiSelect>
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
        typescript: `
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'table-column-toggle-demo',
    templateUrl: 'table-column-toggle-demo.html'
})
export class TableColumnToggleDemo implements OnInit{
    products!: Product[];

    cols!: Column[];

    _selectedColumns!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this._selectedColumns = this.cols;
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter((col) => val.includes(col));
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
