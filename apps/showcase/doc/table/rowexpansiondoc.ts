import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

@Component({
    selector: 'row-expansion-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>
                Row expansion allows displaying detailed content for a particular row. To use this feature, define a <i>dataKey</i>, add a template named <i>expandedrow</i> and use the <i>pRowToggler</i> directive on an element as the target to
                toggle an expansion. This enables providing your custom UI such as buttons, links and so on. Example below uses an anchor with an icon as a toggler. Setting <i>pRowTogglerDisabled</i> as true disables the toggle event for the element.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-toast />
                <p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '60rem' }" [expandedRowKeys]="expandedRows" (onRowExpand)="onRowExpand($event)" (onRowCollapse)="onRowCollapse($event)">
                    <ng-template #caption>
                        <div class="flex flex-wrap justify-end gap-2">
                            <p-button label="Expand All" icon="pi pi-plus" text (onClick)="expandAll()" />
                            <p-button label="Collapse All" icon="pi pi-minus" text (onClick)="collapseAll()" />
                        </div>
                    </ng-template>
                    <ng-template #header>
                        <tr>
                            <th style="width: 5rem"></th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Reviews</th>
                            <th>Status</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product let-expanded="expanded">
                        <tr>
                            <td>
                                <p-button type="button" pRipple [pRowToggler]="product" [text]="true" severity="secondary" [rounded]="true" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" />
                            </td>
                            <td>{{ product.name }}</td>
                            <td>
                                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-lg" />
                            </td>
                            <td>{{ product.price | currency: 'USD' }}</td>
                            <td>{{ product.category }}</td>
                            <td>
                                <p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false" />
                            </td>
                            <td>
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #expandedrow let-product>
                        <tr>
                            <td colspan="7">
                                <div class="p-4">
                                    <h5>Orders for {{ product.name }}</h5>
                                    <p-table [value]="product.orders" dataKey="id">
                                        <ng-template #header>
                                            <tr>
                                                <th pSortableColumn="id">
                                                    <div class="flex items-center gap-2">
                                                        Id
                                                        <p-sortIcon field="price" />
                                                    </div>
                                                </th>
                                                <th pSortableColumn="customer">
                                                    <div class="flex items-center gap-2">
                                                        Customer
                                                        <p-sortIcon field="customer" />
                                                    </div>
                                                </th>
                                                <th pSortableColumn="date">
                                                    <div class="flex items-center gap-2">
                                                        Date
                                                        <p-sortIcon field="date" />
                                                    </div>
                                                </th>
                                                <th pSortableColumn="amount">
                                                    <div class="flex items-center gap-2">
                                                        Amount
                                                        <p-sortIcon field="amount" />
                                                    </div>
                                                </th>
                                                <th pSortableColumn="status">
                                                    <div class="flex items-center gap-2">
                                                        Status
                                                        <p-sortIcon field="status" />
                                                    </div>
                                                </th>
                                                <th style="width: 4rem"></th>
                                            </tr>
                                        </ng-template>
                                        <ng-template #body let-order>
                                            <tr>
                                                <td>{{ order.id }}</td>
                                                <td>{{ order.customer }}</td>
                                                <td>{{ order.date }}</td>
                                                <td>{{ order.amount | currency: 'USD' }}</td>
                                                <td>
                                                    <p-tag [value]="order.status" [severity]="getStatusSeverity(order.status)" />
                                                </td>
                                                <td>
                                                    <p-button type="button" icon="pi pi-search" />
                                                </td>
                                            </tr>
                                        </ng-template>
                                        <ng-template #emptymessage>
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
        </p-deferred-demo>
        <app-code [code]="code" selector="table-row-expansion-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService]
})
export class RowExpansionDoc {
    products!: Product[];

    expandedRows = {};

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef,
        private messageService: MessageService
    ) {}

    loadDemoData() {
        this.productService.getProductsWithOrdersSmall().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    expandAll() {
        this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'PENDING':
                return 'warn';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    code: Code = {
        basic: `<p-toast />
<p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '60rem' }" [expandedRowKeys]="expandedRows" (onRowExpand)="onRowExpand($event)" (onRowCollapse)="onRowCollapse($event)">
    <ng-template #caption>
        <div class="flex flex-wrap justify-end gap-2">
            <p-button label="Expand All" icon="pi pi-plus" text (onClick)="expandAll()" />
            <p-button label="Collapse All" icon="pi pi-minus" text (onClick)="collapseAll()" />
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width: 5rem"></th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Reviews</th>
            <th>Status</th>
        </tr>
    </ng-template>
    <ng-template #body let-product let-expanded="expanded">
        <tr>
            <td>
                <p-button type="button" pRipple [pRowToggler]="product" [text]="true" severity="secondary"  [rounded]="true" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" />
            </td>
            <td>{{ product.name }}</td>
            <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-lg" /></td>
            <td>{{ product.price | currency : 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false" /></td>
            <td>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
            </td>
        </tr>
    </ng-template>
    <ng-template #expandedrow let-product>
        <tr>
            <td colspan="7">
                <div class="p-4">
                    <h5>Orders for {{ product.name }}</h5>
                    <p-table [value]="product.orders" dataKey="id">
                        <ng-template #header>
                            <tr>
                                <th pSortableColumn="id">
                                    <div class="flex items-center gap-2">
                                        Id
                                        <p-sortIcon field="price" />
                                    </div>
                                </th>
                                <th pSortableColumn="customer">
                                    <div class="flex items-center gap-2">
                                        Customer
                                        <p-sortIcon field="customer" />
                                    </div>
                                </th>
                                <th pSortableColumn="date">
                                    <div class="flex items-center gap-2">
                                        Date
                                        <p-sortIcon field="date" />
                                    </div>
                                </th>
                                <th pSortableColumn="amount">
                                    <div class="flex items-center gap-2">
                                        Amount
                                        <p-sortIcon field="amount" />
                                    </div>
                                </th>
                                <th pSortableColumn="status">
                                    <div class="flex items-center gap-2">
                                        Status
                                        <p-sortIcon field="status" />
                                    </div>
                                </th>
                                <th style="width: 4rem"></th>
                            </tr>
                        </ng-template>
                        <ng-template #body let-order>
                            <tr>
                                <td>{{ order.id }}</td>
                                <td>{{ order.customer }}</td>
                                <td>{{ order.date }}</td>
                                <td>{{ order.amount | currency : 'USD' }}</td>
                                <td>
                                    <p-tag [value]="order.status" [severity]="getStatusSeverity(order.status)" />
                                </td>
                                <td><p-button type="button" icon="pi pi-search" /></td>
                            </tr>
                        </ng-template>
                        <ng-template #emptymessage>
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
        html: `<div class="card">
    <p-toast />
    <p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '60rem' }" [expandedRowKeys]="expandedRows" (onRowExpand)="onRowExpand($event)" (onRowCollapse)="onRowCollapse($event)">
        <ng-template #caption>
            <div class="flex flex-wrap justify-end gap-2">
                <p-button label="Expand All" icon="pi pi-plus" text (onClick)="expandAll()" />
                <p-button label="Collapse All" icon="pi pi-minus" text (onClick)="collapseAll()" />
            </div>
        </ng-template>
        <ng-template #header>
            <tr>
                <th style="width: 5rem"></th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Category</th>
                <th>Reviews</th>
                <th>Status</th>
            </tr>
        </ng-template>
        <ng-template #body let-product let-expanded="expanded">
            <tr>
                <td>
                    <p-button type="button" pRipple [pRowToggler]="product" [text]="true" severity="secondary" [rounded]="true" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" />
                </td>
                <td>{{ product.name }}</td>
                <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-lg" /></td>
                <td>{{ product.price | currency : 'USD' }}</td>
                <td>{{ product.category }}</td>
                <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false" /></td>
                <td>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                </td>
            </tr>
        </ng-template>
        <ng-template #expandedrow let-product>
            <tr>
                <td colspan="7">
                    <div class="p-4">
                        <h5>Orders for {{ product.name }}</h5>
                        <p-table [value]="product.orders" dataKey="id">
                            <ng-template #header>
                                <tr>
                                    <th pSortableColumn="id">
                                        <div class="flex items-center gap-2">
                                            Id
                                            <p-sortIcon field="price" />
                                        </div>
                                    </th>
                                    <th pSortableColumn="customer">
                                        <div class="flex items-center gap-2">
                                            Customer
                                            <p-sortIcon field="customer" />
                                        </div>
                                    </th>
                                    <th pSortableColumn="date">
                                        <div class="flex items-center gap-2">
                                            Date
                                            <p-sortIcon field="date" />
                                        </div>
                                    </th>
                                    <th pSortableColumn="amount">
                                        <div class="flex items-center gap-2">
                                            Amount
                                            <p-sortIcon field="amount" />
                                        </div>
                                    </th>
                                    <th pSortableColumn="status">
                                        <div class="flex items-center gap-2">
                                            Status
                                            <p-sortIcon field="status" />
                                        </div>
                                    </th>
                                    <th style="width: 4rem"></th>
                                </tr>
                            </ng-template>
                            <ng-template #body let-order>
                                <tr>
                                    <td>{{ order.id }}</td>
                                    <td>{{ order.customer }}</td>
                                    <td>{{ order.date }}</td>
                                    <td>{{ order.amount | currency : 'USD' }}</td>
                                    <td>
                                        <p-tag [value]="order.status" [severity]="getStatusSeverity(order.status)" />
                                    </td>
                                    <td><p-button type="button" icon="pi pi-search" /></td>
                                </tr>
                            </ng-template>
                            <ng-template #emptymessage>
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
        typescript: `import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '@/domain/product';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '@/service/productservice';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

@Component({
    selector: 'table-row-expansion-demo',
    templateUrl: 'table-row-expansion-demo.html',
    standalone: true,
    imports: [TableModule, TagModule, ToastModule, RatingModule, ButtonModule, CommonModule],
    providers: [ProductService, MessageService]
})
export class TableRowExpansionDemo implements OnInit{
    products!: Product[];

    expandedRows = {};

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
    }

    expandAll() {
        this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'PENDING':
                return 'warn';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
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
    rating: 5,
    orders: [
        {
            id: '1000-0',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 65,
            quantity: 1,
            customer: 'David James',
            status: 'PENDING'
        },
        ...
    ]
},
...`,
        service: ['ProductService']
    };

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({
            severity: 'success',
            summary: 'Product Collapsed',
            detail: event.data.name,
            life: 3000
        });
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
