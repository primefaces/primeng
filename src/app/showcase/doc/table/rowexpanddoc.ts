import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-row-expand-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Row expansion allows displaying detailed content for a particular row. To use this feature, add a template named rowexpansion and use the <i>pRowToggler</i> directive whose value is the row data instance on an element of your choice
                whose click event toggles the expansion. This enables providing your custom UI such as buttons, links and so on. Example below uses an anchor with an icon as a toggler. Setting <i>pRowTogglerDisabled</i> as true disables the toggle
                event for the element.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="products" dataKey="name" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 5rem"></th>
                        <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th>Image</th>
                        <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                        <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
                        <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product let-expanded="expanded">
                    <tr>
                        <td>
                            <button type="button" pButton pRipple [pRowToggler]="product" class="p-button-text p-button-rounded p-button-plain" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></button>
                        </td>
                        <td>{{ product.name }}</td>
                        <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-4" /></td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                        <td>{{ product.category }}</td>
                        <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
                        <td>
                            <span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{ product.inventoryStatus }}</span>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="rowexpansion" let-product>
                    <tr>
                        <td colspan="7">
                            <div class="p-3">
                                <p-table [value]="product.orders" dataKey="id">
                                    <ng-template pTemplate="header">
                                        <tr>
                                            <th pSortableColumn="id">Id <p-sortIcon field="price"></p-sortIcon></th>
                                            <th pSortableColumn="customer">Customer <p-sortIcon field="customer"></p-sortIcon></th>
                                            <th pSortableColumn="date">Date <p-sortIcon field="date"></p-sortIcon></th>
                                            <th pSortableColumn="amount">Amount <p-sortIcon field="amount"></p-sortIcon></th>
                                            <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                                            <th style="width: 4rem"></th>
                                        </tr>
                                    </ng-template>
                                    <ng-template pTemplate="body" let-order>
                                        <tr>
                                            <td>{{ order.id }}</td>
                                            <td>{{ order.customer }}</td>
                                            <td>{{ order.id }}</td>
                                            <td>{{ order.amount | currency: 'USD' }}</td>
                                            <td>
                                                <span [class]="'order-badge order-' + order.status.toLowerCase()">{{ order.status }}</span>
                                            </td>
                                            <td><p-button type="button" icon="pi pi-plus"></p-button></td>
                                        </tr>
                                    </ng-template>
                                    <ng-template pTemplate="emptymessage">
                                        <tr>
                                            <td colspan="6">There are no order for this product yet.</td>
                                        </tr>
                                    </ng-template>
                                </p-table>
                            </div>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="table-row-expand-demo" [extFiles]="extFiles"></app-code>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowExpandDemo implements OnInit {
    @Input() id: string;

    @Input() title: string;

    products: Product[];

    constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    code: Code = {
        basic: `
<p-table [value]="products" dataKey="name" [tableStyle]="{'min-width': '60rem'}">
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 5rem"></th>
            <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
            <th>Image</th>
            <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
            <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
            <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
            <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product let-expanded="expanded">
        <tr>
            <td>
                <button type="button" pButton pRipple [pRowToggler]="product" class="p-button-text p-button-rounded p-button-plain" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></button>
            </td>
            <td>{{product.name}}</td>
            <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-4" /></td>
            <td>{{product.price | currency:'USD'}}</td>
            <td>{{product.category}}</td>
            <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
            <td><span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{product.inventoryStatus}}</span></td>
        </tr>
    </ng-template>
    <ng-template pTemplate="rowexpansion" let-product>
        <tr>
            <td colspan="7">
                <div class="p-3">
                    <p-table [value]="product.orders" dataKey="id">
                        <ng-template pTemplate="header">
                            <tr>
                                <th pSortableColumn="id">Id <p-sortIcon field="price"></p-sortIcon></th>
                                <th pSortableColumn="customer">Customer <p-sortIcon field="customer"></p-sortIcon></th>
                                <th pSortableColumn="date">Date <p-sortIcon field="date"></p-sortIcon></th>
                                <th pSortableColumn="amount">Amount <p-sortIcon field="amount"></p-sortIcon></th>
                                <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                                <th style="width: 4rem"></th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-order>
                            <tr>
                                <td>{{order.id}}</td>
                                <td>{{order.customer}}</td>
                                <td>{{order.id}}</td>
                                <td>{{order.amount | currency:'USD'}}</td>
                                <td><span [class]="'order-badge order-' + order.status.toLowerCase()">{{order.status}}</span></td>
                                <td><p-button type="button" icon="pi pi-plus"></p-button></td>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="emptymessage">
                            <tr>
                                <td colspan="6">There are no order for this product yet.</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-table [value]="products" dataKey="name" [tableStyle]="{'min-width': '60rem'}">
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 5rem"></th>
                <th pSortableColumn="name">Name <p-sortIcon field="name"></p-sortIcon></th>
                <th>Image</th>
                <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                <th pSortableColumn="category">Category <p-sortIcon field="category"></p-sortIcon></th>
                <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
                <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product let-expanded="expanded">
            <tr>
                <td>
                    <button type="button" pButton pRipple [pRowToggler]="product" class="p-button-text p-button-rounded p-button-plain" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></button>
                </td>
                <td>{{product.name}}</td>
                <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-4" /></td>
                <td>{{product.price | currency:'USD'}}</td>
                <td>{{product.category}}</td>
                <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
                <td><span [class]="'product-badge status-' + product.inventoryStatus.toLowerCase()">{{product.inventoryStatus}}</span></td>
            </tr>
        </ng-template>
        <ng-template pTemplate="rowexpansion" let-product>
            <tr>
                <td colspan="7">
                    <div class="p-3">
                        <p-table [value]="product.orders" dataKey="id">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th pSortableColumn="id">Id <p-sortIcon field="price"></p-sortIcon></th>
                                    <th pSortableColumn="customer">Customer <p-sortIcon field="customer"></p-sortIcon></th>
                                    <th pSortableColumn="date">Date <p-sortIcon field="date"></p-sortIcon></th>
                                    <th pSortableColumn="amount">Amount <p-sortIcon field="amount"></p-sortIcon></th>
                                    <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                                    <th style="width: 4rem"></th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-order>
                                <tr>
                                    <td>{{order.id}}</td>
                                    <td>{{order.customer}}</td>
                                    <td>{{order.id}}</td>
                                    <td>{{order.amount | currency:'USD'}}</td>
                                    <td><span [class]="'order-badge order-' + order.status.toLowerCase()">{{order.status}}</span></td>
                                    <td><p-button type="button" icon="pi pi-plus"></p-button></td>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="emptymessage">
                                <tr>
                                    <td colspan="6">There are no order for this product yet.</td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-row-expand-demo',
    templateUrl: 'table-row-expand-demo.html',
    styleUrls: ['table-row-expand-demo.scss']
})
export class TableRowExpandDemo implements OnInit{
    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
    }
}`,
        scss: `
.product-badge {
    border-radius: 2px;
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.status-instock {
        background: #C8E6C9;
        color: #256029;
    }
    
    &.status-outofstock {
        background: #FFCDD2;
        color: #C63737;
    }
    
    &.status-lowstock {
        background: #FEEDAF;
        color: #8A5340;
    }
}

.order-badge {
    border-radius: 2px;
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;

    &.order-delivered {
        background: #C8E6C9;
        color: #256029;
    }
    
    &.order-cancelled {
        background: #FFCDD2;
        color: #C63737;
    }
    
    &.order-pending {
        background: #FEEDAF;
        color: #8A5340;
    }
    
    &.order-returned {
        background: #ECCFFF;
        color: #694382;
    }
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
