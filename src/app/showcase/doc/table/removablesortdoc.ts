import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
    selector: 'removable-sort-doc',
    template: ` <app-docsectiontext>
            <p>The removable sort can be implemented using the <i>customSort</i> property.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table #dt [value]="products" (sortFunction)="customSort($event)" [customSort]="true">
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="code">Code <p-sortIcon field="code" /></th>
                            <th pSortableColumn="name">Name <p-sortIcon field="name" /></th>
                            <th pSortableColumn="category">Category <p-sortIcon field="category" /></th>
                            <th pSortableColumn="quantity">Quantity <p-sortIcon field="quantity" /></th>
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
        <app-code [code]="code" selector="table-removable-sort-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemovableSortDoc {
    @ViewChild('dt') dt: Table;

    products: Product[];

    initialValue: Product[];

    isSorted: boolean = null;

    constructor(private productService: ProductService) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.initialValue = [...data];
        });
    }

    customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.products = [...this.initialValue];
            this.dt.reset();
        }
    }

    sortTableData(event) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }

    code: Code = {
        basic: `<p-table #dt [value]="products" (sortFunction)="customSort($event)" [customSort]="true">
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="code">
                Code <p-sortIcon field="code" />
            </th>
            <th pSortableColumn="name">
                Name <p-sortIcon field="name" />
            </th>
            <th pSortableColumn="category">
                Category <p-sortIcon field="category" />
            </th>
            <th pSortableColumn="quantity">
                Quantity <p-sortIcon field="quantity" />
            </th>
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
</p-table>`,

        html: `<div class="card">
    <p-table #dt [value]="products" (sortFunction)="customSort($event)" [customSort]="true">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="code">
                    Code <p-sortIcon field="code" />
                </th>
                <th pSortableColumn="name">
                    Name <p-sortIcon field="name" />
                </th>
                <th pSortableColumn="category">
                    Category <p-sortIcon field="category" />
                </th>
                <th pSortableColumn="quantity">
                    Quantity <p-sortIcon field="quantity" />
                </th>
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
</div>`,
        typescript: `import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';

@Component({
    selector: 'table-removable-sort-demo',
    templateUrl: 'table-removable-sort-demo.html',
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})

export class TableRemovableSortDemo implements OnInit {
    @ViewChild('dt') dt: Table;

    products: Product[];

    initialValue: Product[];

    isSorted: boolean = null;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.initialValue = [...data];
        });
    }

    customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.products = [...this.initialValue];
            this.dt.reset();
        }
    }

    sortTableData(event) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
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
