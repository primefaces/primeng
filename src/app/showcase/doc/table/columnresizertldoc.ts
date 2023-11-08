import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'column-resize-rtl-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>You can use RTL data table with setting the <i>rtl</i> property to <i>true</i>.</p>
        </app-docsectiontext>
        <div class="card" dir="rtl">
            <p-table [value]="products" [rtl]="true" [resizableColumns]="true" styleClass="p-datatable-gridlines" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th pResizableColumn>کد</th>
                        <th pResizableColumn>نام محصول</th>
                        <th pResizableColumn>دسته بندی</th>
                        <th pResizableColumn>تعداد</th>
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
        <app-code [code]="code" selector="table-column-resize-fit-mode-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnResizeRtlDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    products!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<p-table [value]="products" [rtl]="true" [resizableColumns]="true" styleClass="p-datatable-gridlines" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th pResizableColumn>کد</th>
            <th pResizableColumn>نام محصول</th>
            <th pResizableColumn>دسته بندی</th>
            <th pResizableColumn>تعداد</th>
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
        html: `
<div class="card">
    <p-table [value]="products" [rtl]="true" [resizableColumns]="true" styleClass="p-datatable-gridlines" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th pResizableColumn>کد</th>
                <th pResizableColumn>نام محصول</th>
                <th pResizableColumn>دسته بندی</th>
                <th pResizableColumn>تعداد</th>
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
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'column-resize-rtl-demo',
    templateUrl: 'column-resize-rtl-demo.html'
})
export class TableColumnResizeFitModeDemo implements OnInit{
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
