import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'table-style-doc',
    template: ` <app-docsectiontext>
            <p>Certain rows or cells can easily be styled based on conditions.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product>
                        <tr [ngClass]="rowClass(product)" [ngStyle]="rowStyle(product)">
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>
                                <p-badge [value]="product.quantity" [severity]="stockSeverity(product)" />
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-style-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleDoc {
    products!: Product[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    code: Code = {
        basic: `<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="header">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr [ngClass]="rowClass(product)" [ngStyle]="rowStyle(product)">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>
                <p-badge [value]="product.quantity" [severity]="stockSeverity(product)" />
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr [ngClass]="rowClass(product)" [ngStyle]="rowStyle(product)">
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>
                    <p-badge [value]="product.quantity" [severity]="stockSeverity(product)" />
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'table-style-demo',
    templateUrl: 'table-style-demo.html',
    standalone: true,
    imports: [TableModule, CommonModule, BadgeModule],
    providers: [ProductService]
})
export class TableStyleDemo implements OnInit{
    products!: Product[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef,
    ) {}

    loadDemoData() {
        this.productService.getProductsSmall().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    rowClass(product: Product) {
        return { '!bg-primary !text-primary-contrast': product.category === 'Fitness' };
    }

    rowStyle(product: Product) {
        if (product.quantity === 0) {
            return { fontWeight: 'bold', fontStyle: 'italic' };
        }
    }

    stockSeverity(product: Product) {
        if (product.quantity === 0) return 'danger';
        else if (product.quantity > 0 && product.quantity < 10) return 'warn';
        else return 'success';
    }

}`,
        service: ['ProductService']
    };

    loadDemoData() {
        this.productService.getProductsSmall().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    rowClass(product: Product) {
        return { '!bg-primary !text-primary-contrast': product.category === 'Fitness' };
    }

    rowStyle(product: Product) {
        if (product.quantity === 0) {
            return { fontWeight: 'bold', fontStyle: 'italic' };
        }
    }

    stockSeverity(product: Product) {
        if (product.quantity === 0) return 'danger';
        else if (product.quantity > 0 && product.quantity < 10) return 'warn';
        else return 'success';
    }

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
