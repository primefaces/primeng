import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'export-doc',
    template: ` <app-docsectiontext>
            <p>Table can export its data to CSV format.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table #dt [columns]="cols" [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [exportHeader]="'customExportHeader'" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="caption">
                        <div style="text-align: left">
                            <p-button icon="pi pi-external-link" label="Export" (onClick)="dt.exportCSV()" />
                        </div>
                    </ng-template>
                    <ng-template pTemplate="header" let-columns>
                        <tr>
                            <th *ngFor="let col of columns">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-rowData let-columns="columns">
                        <tr [pSelectableRow]="rowData">
                            <td *ngFor="let col of columns">
                                {{ rowData[col.field] }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-export-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDoc {
    products!: Product[];

    selectedProducts!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    cols!: Column[];

    exportColumns!: ExportColumn[];

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    code: Code = {
        basic: `<p-table 
    #dt 
    [columns]="cols" 
    [value]="products" 
    selectionMode="multiple" 
    [(selection)]="selectedProducts" 
    [exportHeader]="'customExportHeader'" 
    [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="caption">
            <div style="text-align: left">
                <p-button 
                    icon="pi pi-external-link" 
                    label="Export" 
                    (onClick)="dt.exportCSV()" />
            </div>
        </ng-template>
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData">
                <td *ngFor="let col of columns">
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table 
        #dt 
        [columns]="cols" 
        [value]="products" 
        selectionMode="multiple" 
        [(selection)]="selectedProducts" 
        [exportHeader]="'customExportHeader'" 
        [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template pTemplate="caption">
                <div style="text-align: left">
                    <p-button 
                        icon="pi pi-external-link" 
                        label="Export" 
                        (onClick)="dt.exportCSV()" />
                </div>
            </ng-template>
            <ng-template pTemplate="header" let-columns>
                <tr>
                    <th *ngFor="let col of columns">
                        {{ col.header }}
                    </th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowData let-columns="columns">
                <tr [pSelectableRow]="rowData">
                    <td *ngFor="let col of columns">
                        {{ rowData[col.field] }}
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
import { ButtonModule } from 'primeng/button';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'table-export-demo',
    templateUrl: 'table-export-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule],
    providers: [ProductService]
})
export class TableExportDemo implements OnInit{
    products!: Product[];

    selectedProducts!: Product[];

    constructor(private productService: ProductService) {}

    cols!: Column[];

    exportColumns!: ExportColumn[];

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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
