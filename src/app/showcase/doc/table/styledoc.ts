import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'style-doc',
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
                        <tr [ngClass]="{ 'row-accessories': product.category === 'Accessories' }">
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>
                                <div [ngClass]="{ outofstock: product.quantity === 0, lowstock: product.quantity > 0 && product.quantity < 10, instock: product.quantity > 10 }">
                                    {{ product.quantity }}
                                </div>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-style-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .outofstock {
                font-weight: 700;
                color: #ff5252;
                text-decoration: line-through;
            }

            .lowstock {
                font-weight: 700;
                color: #ffa726;
            }

            .instock {
                font-weight: 700;
                color: #66bb6a;
            }

            :host ::ng-deep .row-accessories {
                background-color: rgba(0, 0, 0, 0.15) !important;
            }
        `
    ]
})
export class StyleDoc {
    products!: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `<p-table [value]="products" [tableStyle]="{'min-width': '50rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr [ngClass]="{'row-accessories': product.category === 'Accessories'}">
            <td>{{product.code}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category}}</td>
            <td>
                <div [ngClass]="{'outofstock': product.quantity === 0, 'lowstock': (product.quantity > 0 && product.quantity < 10),'instock': product.quantity > 10}">
                    {{product.quantity}}
                </div>
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products" [tableStyle]="{'min-width': '50rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr [ngClass]="{'row-accessories': product.category === 'Accessories'}">
                <td>{{product.code}}</td>
                <td>{{product.name}}</td>
                <td>{{product.category}}</td>
                <td>
                    <div [ngClass]="{'outofstock': product.quantity === 0, 'lowstock': (product.quantity > 0 && product.quantity < 10),'instock': product.quantity > 10}">
                        {{product.quantity}}
                    </div>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'table-style-demo',
    templateUrl: 'table-style-demo.html',
    styleUrls: ['table-style-demo.scss']
})
export class TableStyleDemo implements OnInit{
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}`,
        scss: `
.outofstock {
    font-weight: 700;
    color: #ff5252;
    text-decoration: line-through;
}

.lowstock {
    font-weight: 700;
    color: #ffa726;
}

.instock {
    font-weight: 700;
    color: #66bb6a;
}

:host ::ng-deep .row-accessories {
    background-color: rgba(0, 0, 0, 0.15) !important;
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
