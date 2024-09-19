import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'reorder-doc',
    template: ` <app-docsectiontext>
            <p>Order of the columns and rows can be changed using drag and drop. Column reordering is configured by adding <i>reorderableColumns</i> property.</p>
            <p>
                Similarly, adding <i>reorderableRows</i> property enables draggable rows. For the drag handle a column needs to have <i>rowReorder</i> property and <i>onRowReorder</i> callback is required to control the state of the rows after
                reorder completes.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" [columns]="cols" [reorderableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th style="width:3rem"></th>
                            <th *ngFor="let col of columns" pReorderableColumn>
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowData let-columns="columns" let-index="rowIndex">
                        <tr [pReorderableRow]="index">
                            <td>
                                <span class="pi pi-bars" pReorderableRowHandle></span>
                            </td>
                            <td *ngFor="let col of columns">
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-reorder-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReorderDoc {
    products!: Product[];

    cols!: Column[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }

    code: Code = {
        basic: `<p-table 
    [value]="products" 
    [columns]="cols" 
    [reorderableColumns]="true" 
    [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th style="width:3rem"></th>
                <th *ngFor="let col of columns" pReorderableColumn>
                    {{col.header}}
                </th>
            </tr>
        </ng-template>
        <ng-template 
            pTemplate="body" 
            let-rowData 
            let-columns="columns" 
            let-index="rowIndex">
                <tr [pReorderableRow]="index">
                    <td>
                        <span class="pi pi-bars" pReorderableRowHandle></span>
                    </td>
                    <td *ngFor="let col of columns">
                        {{rowData[col.field]}}
                    </td>
                </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table 
        [value]="products" 
        [columns]="cols" 
        [reorderableColumns]="true" 
        [tableStyle]="{'min-width': '50rem'}">
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th style="width:3rem"></th>
                    <th *ngFor="let col of columns" pReorderableColumn>
                        {{col.header}}
                    </th>
                </tr>
            </ng-template>
            <ng-template 
                pTemplate="body" 
                let-rowData 
                let-columns="columns" 
                let-index="rowIndex">
                    <tr [pReorderableRow]="index">
                        <td>
                            <span class="pi pi-bars" pReorderableRowHandle></span>
                        </td>
                        <td *ngFor="let col of columns">
                            {{rowData[col.field]}}
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

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'table-reorder-demo',
    templateUrl: 'table-reorder-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule],
    providers: [ProductService]
})
export class TableReorderDemo implements OnInit{
    products!: Product[];

    cols!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => (this.products = data));

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
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
