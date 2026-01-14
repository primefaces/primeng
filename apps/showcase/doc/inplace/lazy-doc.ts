import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'lazy-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, InplaceModule, TableModule],
    template: `
        <app-docsectiontext>
            <p>Using the <i>onActivate</i> event, data can be loaded in a lazy manner before displaying it in a table.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace (onActivate)="loadData()">
                <ng-template #display>
                    <span>View Data</span>
                </ng-template>
                <ng-template #content>
                    <p-table [value]="products" responsiveLayout="scroll">
                        <ng-template #header>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-product>
                            <tr>
                                <td>{{ product.code }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.category }}</td>
                                <td>{{ product.quantity }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </ng-template>
            </p-inplace>
        </div>
        <app-code></app-code>
    `
})
export class LazyDoc {
    products: Product[] | undefined;

    constructor(private productService: ProductService) {}

    loadData() {
        this.productService.getProductsMini().then((products) => (this.products = products));
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
