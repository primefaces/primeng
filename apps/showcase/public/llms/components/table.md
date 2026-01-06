# Angular Table Component

Table displays data in tabular format.

## Accessibility

Screen Reader Default role of the table is table . Header, body and footer elements use rowgroup , rows use row role, header cells have columnheader and body cells use cell roles. Sortable headers utilizer aria-sort attribute either set to "ascending" or "descending". Table rows and table cells should be specified by users using the aria-posinset , aria-setsize , aria-label , and aria-describedby attributes, as they are determined through templating. Built-in checkbox and radiobutton components for row selection use checkbox and radiobutton . The label to describe them is retrieved from the aria.selectRow and aria.unselectRow properties of the locale API. Similarly header checkbox uses selectAll and unselectAll keys. When a row is selected, aria-selected is set to true on a row. The element to expand or collapse a row is a button with aria-expanded and aria-controls properties. Value to describe the buttons is derived from aria.expandRow and aria.collapseRow properties of the locale API. The filter menu button use aria.showFilterMenu and aria.hideFilterMenu properties as aria-label in addition to the aria-haspopup , aria-expanded and aria-controls to define the relation between the button and the overlay. Popop menu has dialog role with aria-modal as focus is kept within the overlay. The operator dropdown use aria.filterOperator and filter constraints dropdown use aria.filterConstraint properties. Buttons to add rules on the other hand utilize aria.addRule and aria.removeRule properties. The footer buttons similarly use aria.clear and aria.apply properties. filterInputProps of the Column component can be used to define aria labels for the built-in filter components, if a custom component is used with templating you also may define your own aria labels as well. Editable cells use custom templating so you need to manage aria roles and attributes manually if required. The row editor controls are button elements with aria.editRow , aria.cancelEdit and aria.saveEdit used for the aria-label . Paginator is a standalone component used inside the Table, refer to the paginator for more information about the accessibility features. Keyboard Support Any button element inside the Table used for cases like filter, row expansion, edit are tabbable and can be used with space and enter keys. Sortable Headers Keyboard Support Key Function tab Moves through the headers. enter Sorts the column. space Sorts the column. Filter Menu Keyboard Support Key Function tab Moves through the elements inside the popup. escape Hides the popup. enter Opens the popup. Selection Keyboard Support Key Function tab Moves focus to the first selected row, if there is none then first row receives the focus. up arrow Moves focus to the previous row. down arrow Moves focus to the next row. enter Toggles the selected state of the focused row depending on the metaKeySelection setting. space Toggles the selected state of the focused row depending on the metaKeySelection setting. home Moves focus to the first row. end Moves focus to the last row. shift + down arrow Moves focus to the next row and toggles the selection state. shift + up arrow Moves focus to the previous row and toggles the selection state. shift + space Selects the rows between the most recently selected row and the focused row. control + shift + home Selects the focused rows and all the options up to the first one. control + shift + end Selects the focused rows and all the options down to the last one. control + a Selects all rows.

## Basic

DataTable requires a collection to display along with column components for the representation of the data.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
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
```

## celledit-doc

In-cell editing is enabled by adding pEditableColumn directive to an editable cell that has a p-cellEditor helper component to define the input-output templates for the edit and view modes respectively.

```html
<p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th style="width:25%">Code</th>
            <th style="width:25%">Name</th>
            <th style="width:25%">Quantity</th>
            <th style="width:25%">Price</th>
        </tr>
    </ng-template>
    <ng-template #body let-product let-editing="editing">
        <tr>
            <td [pEditableColumn]="product.code" pEditableColumnField="code">
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText type="text" [(ngModel)]="product.code" fluid />
                    </ng-template>
                    <ng-template #output>
                        {{ product.code }}
                    </ng-template>
                </p-cellEditor>
            </td>
            <td [pEditableColumn]="product.name" pEditableColumnField="name">
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText type="text" [(ngModel)]="product.name" required fluid />
                    </ng-template>
                    <ng-template #output>
                        {{ product.name }}
                    </ng-template>
                </p-cellEditor>
            </td>
            <td [pEditableColumn]="product.quantity" pEditableColumnField="quantity">
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText [(ngModel)]="product.quantity" fluid />
                    </ng-template>
                    <ng-template #output>
                        {{ product.quantity }}
                    </ng-template>
                </p-cellEditor>
            </td>
            <td [pEditableColumn]="product.price" pEditableColumnField="price">
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText type="text" [(ngModel)]="product.price" fluid />
                    </ng-template>
                    <ng-template #output>
                        {{ product.price | currency: 'USD' }}
                    </ng-template>
                </p-cellEditor>
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th style="width:25%">Code</th>
                        <th style="width:25%">Name</th>
                        <th style="width:25%">Quantity</th>
                        <th style="width:25%">Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product let-editing="editing">
                    <tr>
                        <td [pEditableColumn]="product.code" pEditableColumnField="code">
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText type="text" [(ngModel)]="product.code" fluid />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.code }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td [pEditableColumn]="product.name" pEditableColumnField="name">
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText type="text" [(ngModel)]="product.name" required fluid />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.name }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td [pEditableColumn]="product.quantity" pEditableColumnField="quantity">
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText [(ngModel)]="product.quantity" fluid />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.quantity }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td [pEditableColumn]="product.price" pEditableColumnField="price">
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText type="text" [(ngModel)]="product.price" fluid />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.price | currency: 'USD' }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, InputTextModule, FormsModule],
    providers: [ProductService]
})
export class TableCelleditDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## checkboxselection-doc

Multiple selection can also be handled using checkboxes by enabling the selectionMode property of column as multiple .

```html
<p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox />
            </th>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>
                <p-tableCheckbox [value]="product" />
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox />
                        </th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="product" />
                        </td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableCheckboxselectionDemo implements OnInit {
    products!: Product[];
    selectedProducts!: Product;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## columngroup-doc

Columns can be grouped using rowspan and colspan properties.

```html
<p-table [value]="sales" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th rowspan="3">Product</th>
            <th colspan="4">Sale Rate</th>
        </tr>
        <tr>
            <th colspan="2">Sales</th>
            <th colspan="2">Profits</th>
        </tr>
        <tr>
            <th>Last Year</th>
            <th>This Year</th>
            <th>Last Year</th>
            <th>This Year</th>
        </tr>
    </ng-template>
    <ng-template #body let-sale>
        <tr>
            <td>{{ sale.product }}</td>
            <td>{{ sale.lastYearSale }}%</td>
            <td>{{ sale.thisYearSale }}%</td>
            <td>{{ sale.lastYearProfit | currency: 'USD' }}</td>
            <td>{{ sale.thisYearProfit | currency: 'USD' }}</td>
        </tr>
    </ng-template>
    <ng-template #footer>
        <tr>
            <td colspan="3" class="text-right font-bold p-3 pb-0">Totals</td>
            <td class="font-bold p-3 pb-0">{{ lastYearTotal | currency: 'USD' }}</td>
            <td class="font-bold p-3 pb-0">{{ thisYearTotal | currency: 'USD' }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="sales" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th rowspan="3">Product</th>
                        <th colspan="4">Sale Rate</th>
                    </tr>
                    <tr>
                        <th colspan="2">Sales</th>
                        <th colspan="2">Profits</th>
                    </tr>
                    <tr>
                        <th>Last Year</th>
                        <th>This Year</th>
                        <th>Last Year</th>
                        <th>This Year</th>
                    </tr>
                </ng-template>
                <ng-template #body let-sale>
                    <tr>
                        <td>{{ sale.product }}</td>
                        <td>{{ sale.lastYearSale }}%</td>
                        <td>{{ sale.thisYearSale }}%</td>
                        <td>{{ sale.lastYearProfit | currency: 'USD' }}</td>
                        <td>{{ sale.thisYearProfit | currency: 'USD' }}</td>
                    </tr>
                </ng-template>
                <ng-template #footer>
                    <tr>
                        <td colspan="3" class="text-right font-bold p-3 pb-0">Totals</td>
                        <td class="font-bold p-3 pb-0">{{ lastYearTotal | currency: 'USD' }}</td>
                        <td class="font-bold p-3 pb-0">{{ thisYearTotal | currency: 'USD' }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule]
})
export class TableColumngroupDemo implements OnInit {
    sales!: any[];
    lastYearTotal!: number;
    thisYearTotal!: number;

    ngOnInit() {
        this.sales = [
            {
                product: 'Bamboo Watch',
                lastYearSale: 51,
                thisYearSale: 40,
                lastYearProfit: 54406,
                thisYearProfit: 43342
            },
            {
                product: 'Black Watch',
                lastYearSale: 83,
                thisYearSale: 9,
                lastYearProfit: 423132,
                thisYearProfit: 312122
            },
            { product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
            {
                product: 'Blue T-Shirt',
                lastYearSale: 49,
                thisYearSale: 22,
                lastYearProfit: 745232,
                thisYearProfit: 65323
            },
            {
                product: 'Brown Purse',
                lastYearSale: 17,
                thisYearSale: 79,
                lastYearProfit: 643242,
                thisYearProfit: 500332
            },
            {
                product: 'Chakra Bracelet',
                lastYearSale: 52,
                thisYearSale: 65,
                lastYearProfit: 421132,
                thisYearProfit: 150005
            },
            {
                product: 'Galaxy Earrings',
                lastYearSale: 82,
                thisYearSale: 12,
                lastYearProfit: 131211,
                thisYearProfit: 100214
            },
            {
                product: 'Game Controller',
                lastYearSale: 44,
                thisYearSale: 45,
                lastYearProfit: 66442,
                thisYearProfit: 53322
            },
            {
                product: 'Gaming Set',
                lastYearSale: 90,
                thisYearSale: 56,
                lastYearProfit: 765442,
                thisYearProfit: 296232
            },
            {
                product: 'Gold Phone Case',
                lastYearSale: 75,
                thisYearSale: 54,
                lastYearProfit: 21212,
                thisYearProfit: 12533
            }
        ];
        this.calculateLastYearTotal();
        this.calculateThisYearTotal();
    }

    calculateThisYearTotal() {
        let total = 0;
        for (let sale of this.sales) {
            total += sale.thisYearProfit;
        }
        
        this.thisYearTotal = total;
    }
}
```
</details>

## columnresizeexpandmode-doc

Setting columnResizeMode as expand changes the table width as well.

```html
<p-table [value]="products" showGridlines [resizableColumns]="true" columnResizeMode="expand" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th pResizableColumn>Code</th>
            <th pResizableColumn>Name</th>
            <th pResizableColumn>Category</th>
            <th pResizableColumn>Quantity</th>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" showGridlines [resizableColumns]="true" columnResizeMode="expand" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th pResizableColumn>Code</th>
                        <th pResizableColumn>Name</th>
                        <th pResizableColumn>Category</th>
                        <th pResizableColumn>Quantity</th>
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableColumnresizeexpandmodeDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## columnresizefitmode-doc

Columns can be resized using drag drop by setting the resizableColumns to true . Fit mode is the default one and the overall table width does not change when a column is resized.

```html
<p-table [value]="products" showGridlines [resizableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th pResizableColumn>Code</th>
            <th pResizableColumn>Name</th>
            <th pResizableColumn>Category</th>
            <th pResizableColumn>Quantity</th>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" showGridlines [resizableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th pResizableColumn>Code</th>
                        <th pResizableColumn>Name</th>
                        <th pResizableColumn>Category</th>
                        <th pResizableColumn>Quantity</th>
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableColumnresizefitmodeDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## columnresizescrollablemode-doc

```html
<p-table [value]="customers" showGridlines [scrollable]="true" scrollHeight="400px" [resizableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th pResizableColumn>Name</th>
            <th pResizableColumn>Country</th>
            <th pResizableColumn>Company</th>
            <th pResizableColumn>Representative</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" showGridlines [scrollable]="true" scrollHeight="400px" [resizableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th pResizableColumn>Name</th>
                        <th pResizableColumn>Country</th>
                        <th pResizableColumn>Company</th>
                        <th pResizableColumn>Representative</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [CustomerService]
})
export class TableColumnresizescrollablemodeDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
        });
    }
}
```
</details>

## columnselection-doc

Row selection with an element inside a column is implemented with templating.

```html
<p-toast />
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th style="width: 5rem"></th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
            <td>
                <p-button icon="pi pi-search" (click)="selectProduct(product)" severity="secondary" rounded />
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '@/service/productservice';
import { MessageService } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-toast />
            <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th style="width: 5rem"></th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <p-button icon="pi pi-search" (click)="selectProduct(product)" severity="secondary" rounded />
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TableModule, ToastModule],
    providers: [ProductService]
})
export class TableColumnselectionDemo implements OnInit {
    products!: Product[];
    selectedProduct!: Product;

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }

    selectProduct(product: Product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    }
}
```
</details>

## columntoggle-doc

This demo uses a multiselect component to implement toggleable columns.

```html
<p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption>
        <p-multiselect display="chip" [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ 'min-width': '200px' }" placeholder="Choose Columns" />
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th>Code</th>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-product let-columns="columns">
        <tr>
            <td>{{ product.code }}</td>
            <td *ngFor="let col of columns">
                {{ product[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

interface Column {
    field: string;
    header: string;
}

@Component({
    template: `
        <div class="card">
            <p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #caption>
                    <p-multiselect display="chip" [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ 'min-width': '200px' }" placeholder="Choose Columns" />
                </ng-template>
                <ng-template #header let-columns>
                    <tr>
                        <th>Code</th>
                        <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-product let-columns="columns">
                    <tr>
                        <td>{{ product.code }}</td>
                        <td *ngFor="let col of columns">
                            {{ product[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [MultiSelectModule, TableModule, FormsModule],
    providers: [ProductService]
})
export class TableColumntoggleDemo implements OnInit {
    products!: Product[];
    cols!: Column[];
    selectedColumns!: Column[];

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
        this.selectedColumns = this.cols;
    }
}
```
</details>

## contextmenu-doc

Table has exclusive integration with contextmenu component. In order to attach a menu to a table, add pContextMenuRow directive to the rows that can be selected with context menu, define a local template variable for the menu and bind it to the contextMenu property of the table. This enables displaying the menu whenever a row is right clicked. Optional pContextMenuRowIndex property is available to access the row index. A separate contextMenuSelection property is used to get a hold of the right clicked row. For dynamic columns, setting pContextMenuRowDisabled property as true disables context menu for that particular row.

```html
<p-contextmenu #cm [model]="items" (onHide)="selectedProduct = null" />
<p-table [value]="products" [(contextMenuSelection)]="selectedProduct" [contextMenu]="cm" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr [pContextMenuRow]="product">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price | currency: 'USD' }}</td>
        </tr>
    </ng-template>
</p-table>
<p-toast />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '@/service/productservice';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-contextmenu #cm [model]="items" (onHide)="selectedProduct = null" />
            <p-table [value]="products" [(contextMenuSelection)]="selectedProduct" [contextMenu]="cm" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr [pContextMenuRow]="product">
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                    </tr>
                </ng-template>
            </p-table>
            <p-toast />
        </div>
    `,
    standalone: true,
    imports: [ContextMenuModule, TableModule, ToastModule],
    providers: [ProductService]
})
export class TableContextmenuDemo implements OnInit {
    products!: Product[];
    selectedProduct!: Product;
    items!: MenuItem[];

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.items = [
            { label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewProduct(this.selectedProduct) },
            { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteProduct(this.selectedProduct) }
        ];
    }

    viewProduct(product: Product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    }

    deleteProduct(product: Product) {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.messageService.add({ severity: 'error', summary: 'Product Deleted', detail: product.name });
        this.selectedProduct = null;
    }
}
```
</details>

## controlledselection-doc

Row selection can be controlled by utilizing rowSelectable and disabled properties.

```html
<p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [rowSelectable]="isRowSelectable" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th style="min-width:200px">Code</th>
            <th style="min-width:200px">Name</th>
            <th style="min-width:200px">Category</th>
            <th style="min-width:200px">Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>
                <p-tableCheckbox [value]="product" [disabled]="isOutOfStock(product)"></p-tableCheckbox>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [rowSelectable]="isRowSelectable" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th style="min-width:200px">Code</th>
                        <th style="min-width:200px">Name</th>
                        <th style="min-width:200px">Category</th>
                        <th style="min-width:200px">Quantity</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="product" [disabled]="isOutOfStock(product)"></p-tableCheckbox>
                        </td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableControlledselectionDemo implements OnInit {
    products!: Product[];
    selectedProducts!: Product;

    constructor(private productService: ProductService) {
        this.isRowSelectable = this.isRowSelectable.bind(this);
    }

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }

    isRowSelectable(event: any) {
        return !this.isOutOfStock(event.data);
    }

    isOutOfStock(data: Product) {
        return data.inventoryStatus === 'OUTOFSTOCK';
    }
}
```
</details>

## Customers

DataTable with selection, pagination, filtering, sorting and templating.

```html
<p-table
    #dt
    [value]="customers"
    [(selection)]="selectedCustomers"
    dataKey="id"
    [rowHover]="true"
    [rows]="10"
    [showCurrentPageReport]="true"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [filterDelay]="0"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
>
    <ng-template #caption>
        <div class="flex justify-between">
            <p-button [outlined]="true" icon="pi pi-filter-slash" label="Clear" (click)="clear(dt)" />
            <p-iconField iconPosition="left">
                <p-inputIcon>
                    <i class="pi pi-search"></i>
                </p-inputIcon>
                <input pInputText type="text" [(ngModel)]="searchValue" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Keyboard Search" />
            </p-iconField>
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox />
            </th>
            <th pSortableColumn="name" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                    <p-columnFilter type="text" field="name" display="menu" class="ml-auto" />
                </div>
            </th>
            <th pSortableColumn="country.name" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Country
                    <p-sortIcon field="country.name" />
                    <p-columnFilter type="text" field="country.name" display="menu" class="ml-auto" />
                </div>
            </th>
            <th pSortableColumn="representative.name" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Agent
                    <p-sortIcon field="representative.name" />
                    <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                        <ng-template #filter let-value let-filter="filterCallback">
                            <p-multiselect [filter]="false" [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" class="w-full">
                                <ng-template let-option #item>
                                    <div class="flex items-center gap-2">
                                        <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" style="width: 32px" />
                                        <span>{{ option.name }}</span>
                                    </div>
                                </ng-template>
                            </p-multiselect>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="date" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Date
                    <p-sortIcon field="date" />
                    <p-columnFilter type="date" field="date" display="menu" class="ml-auto" />
                </div>
            </th>
            <th pSortableColumn="balance" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Balance
                    <p-sortIcon field="balance" />
                    <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" class="ml-auto" />
                </div>
            </th>
            <th pSortableColumn="status" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Status
                    <p-sortIcon field="status" />
                    <p-columnFilter field="status" matchMode="equals" display="menu" class="ml-auto">
                        <ng-template #filter let-value let-filter="filterCallback">
                            <p-select [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                <ng-template let-option #item>
                                    <p-tag [value]="option.label" [severity]="getSeverity(option.label)" />
                                </ng-template>
                            </p-select>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th pSortableColumn="activity" style="min-width: 14rem">
                <div class="flex justify-between items-center gap-2">
                    Activity
                    <p-sortIcon field="activity" />
                    <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                        <ng-template #filter let-filter="filterCallback">
                            <p-slider [(ngModel)]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" class="m-4"></p-slider>
                            <div class="flex items-center justify-between px-2">
                                <span>{{ activityValues[0] }}</span>
                                <span>{{ activityValues[1] }}</span>
                            </div>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="width: 5rem"></th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr class="p-selectable-row">
            <td>
                <p-tableCheckbox [value]="customer" />
            </td>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span class="ml-1 align-middle">{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="ml-1 align-middle">{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                {{ customer.date | date: 'MM/dd/yyyy' }}
            </td>
            <td>
                {{ customer.balance | currency: 'USD' : 'symbol' }}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                <p-progressBar [value]="customer.activity" [showValue]="false" />
            </td>
            <td style="text-align: center">
                <p-button rounded icon="pi pi-cog" />
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td colspan="8">No customers found.</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table
                #dt
                [value]="customers"
                [(selection)]="selectedCustomers"
                dataKey="id"
                [rowHover]="true"
                [rows]="10"
                [showCurrentPageReport]="true"
                [rowsPerPageOptions]="[10, 25, 50]"
                [loading]="loading"
                [paginator]="true"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [filterDelay]="0"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
            >
                <ng-template #caption>
                    <div class="flex justify-between">
                        <p-button [outlined]="true" icon="pi pi-filter-slash" label="Clear" (click)="clear(dt)" />
                        <p-iconField iconPosition="left">
                            <p-inputIcon>
                                <i class="pi pi-search"></i>
                            </p-inputIcon>
                            <input pInputText type="text" [(ngModel)]="searchValue" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Keyboard Search" />
                        </p-iconField>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox />
                        </th>
                        <th pSortableColumn="name" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                                <p-columnFilter type="text" field="name" display="menu" class="ml-auto" />
                            </div>
                        </th>
                        <th pSortableColumn="country.name" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Country
                                <p-sortIcon field="country.name" />
                                <p-columnFilter type="text" field="country.name" display="menu" class="ml-auto" />
                            </div>
                        </th>
                        <th pSortableColumn="representative.name" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Agent
                                <p-sortIcon field="representative.name" />
                                <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-multiselect [filter]="false" [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" class="w-full">
                                            <ng-template let-option #item>
                                                <div class="flex items-center gap-2">
                                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" style="width: 32px" />
                                                    <span>{{ option.name }}</span>
                                                </div>
                                            </ng-template>
                                        </p-multiselect>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="date" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Date
                                <p-sortIcon field="date" />
                                <p-columnFilter type="date" field="date" display="menu" class="ml-auto" />
                            </div>
                        </th>
                        <th pSortableColumn="balance" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Balance
                                <p-sortIcon field="balance" />
                                <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" class="ml-auto" />
                            </div>
                        </th>
                        <th pSortableColumn="status" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Status
                                <p-sortIcon field="status" />
                                <p-columnFilter field="status" matchMode="equals" display="menu" class="ml-auto">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-select [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Any">
                                            <ng-template let-option #item>
                                                <p-tag [value]="option.label" [severity]="getSeverity(option.label)" />
                                            </ng-template>
                                        </p-select>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th pSortableColumn="activity" style="min-width: 14rem">
                            <div class="flex justify-between items-center gap-2">
                                Activity
                                <p-sortIcon field="activity" />
                                <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false" class="ml-auto">
                                    <ng-template #filter let-filter="filterCallback">
                                        <p-slider [(ngModel)]="activityValues" [range]="true" (onSlideEnd)="filter($event.values)" class="m-4"></p-slider>
                                        <div class="flex items-center justify-between px-2">
                                            <span>{{ activityValues[0] }}</span>
                                            <span>{{ activityValues[1] }}</span>
                                        </div>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="width: 5rem"></th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr class="p-selectable-row">
                        <td>
                            <p-tableCheckbox [value]="customer" />
                        </td>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span class="ml-1 align-middle">{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span class="ml-1 align-middle">{{ customer.representative.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.date | date: 'MM/dd/yyyy' }}
                        </td>
                        <td>
                            {{ customer.balance | currency: 'USD' : 'symbol' }}
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                        <td>
                            <p-progressBar [value]="customer.activity" [showValue]="false" />
                        </td>
                        <td style="text-align: center">
                            <p-button rounded icon="pi pi-cog" />
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No customers found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, ProgressBarModule, SliderModule, TableModule, TagModule, InputTextModule, FormsModule],
    providers: [CustomerService]
})
export class TableCustomersDemo implements OnInit {
    customers!: Customer[];
    selectedCustomers!: Customer[];
    representatives!: Representative[];
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    searchValue: string | undefined;

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
            this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
        });
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    clear(dt: Table) {
        this.searchValue = '';
        dt.reset();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
        
            case 'qualified':
                return 'success';
        
            case 'new':
                return 'info';
        
            case 'negotiation':
                return 'warn';
        
            case 'renewal':
                return null;
        }
    }
}
```
</details>

## Dynamic Columns

Columns can be defined dynamically using the *ngFor directive.

```html
<p-table [columns]="cols" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            @for (col of columns; track col) {
                <th>
                    {{ col.header }}
                </th>
            }
        </tr>
    </ng-template>
    <ng-template #body let-rowData let-columns="columns">
        <tr>
            @for (col of columns; track col) {
                <td>
                    {{ rowData[col.field] }}
                </td>
            }
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

interface Column {
    field: string;
    header: string;
}

@Component({
    template: `
        <div class="card">
            <p-table [columns]="cols" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header let-columns>
                    <tr>
                        @for (col of columns; track col) {
                            <th>
                                {{ col.header }}
                            </th>
                        }
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr>
                        @for (col of columns; track col) {
                            <td>
                                {{ rowData[col.field] }}
                            </td>
                        }
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableDynamicDemo implements OnInit {
    products!: Product[];
    cols!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }
}
```
</details>

## expandablerowgroup-doc

When expandableRowGroups is present in subheader based row grouping, groups can be expanded and collapsed. State of the expansions are controlled using the expandedRows and onRowToggle properties.

```html
<p-table [value]="customers" sortField="representative.name" sortMode="single" dataKey="representative.name" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{ 'min-width': '70rem' }">
    <ng-template #header>
        <tr>
            <th style="width:20%">Name</th>
            <th style="width:20%">Country</th>
            <th style="width:20%">Company</th>
            <th style="width:20%">Status</th>
            <th style="width:20%">Date</th>
        </tr>
    </ng-template>
    <ng-template #groupheader let-customer let-rowIndex="rowIndex" let-expanded="expanded">
        <tr>
            <td colspan="5">
                <button type="button" pButton pRipple [pRowToggler]="customer" text rounded plain class="mr-2" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></button>
                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle; display: inline-block" />
                <span class="font-bold ml-2">{{ customer.representative.name }}</span>
            </td>
        </tr>
    </ng-template>
    <ng-template #groupfooter let-customer>
        <tr class="p-rowgroup-footer">
            <td colspan="4" style="text-align: right">Total Customers</td>
            <td>{{ calculateCustomerTotal(customer.representative.name) }}</td>
        </tr>
    </ng-template>
    <ng-template #expandedrow let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                {{ customer.company }}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                {{ customer.date }}
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" sortField="representative.name" sortMode="single" dataKey="representative.name" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{ 'min-width': '70rem' }">
                <ng-template #header>
                    <tr>
                        <th style="width:20%">Name</th>
                        <th style="width:20%">Country</th>
                        <th style="width:20%">Company</th>
                        <th style="width:20%">Status</th>
                        <th style="width:20%">Date</th>
                    </tr>
                </ng-template>
                <ng-template #groupheader let-customer let-rowIndex="rowIndex" let-expanded="expanded">
                    <tr>
                        <td colspan="5">
                            <button type="button" pButton pRipple [pRowToggler]="customer" text rounded plain class="mr-2" [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></button>
                            <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle; display: inline-block" />
                            <span class="font-bold ml-2">{{ customer.representative.name }}</span>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #groupfooter let-customer>
                    <tr class="p-rowgroup-footer">
                        <td colspan="4" style="text-align: right">Total Customers</td>
                        <td>{{ calculateCustomerTotal(customer.representative.name) }}</td>
                    </tr>
                </ng-template>
                <ng-template #expandedrow let-customer>
                    <tr>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span>{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.company }}
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                        <td>
                            {{ customer.date }}
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, TagModule, ButtonModule, RippleModule],
    providers: [CustomerService]
})
export class TableExpandablerowgroupDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;
        
        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }
        
        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
        
            case 'qualified':
                return 'success';
        
            case 'new':
                return 'info';
        
            case 'negotiation':
                return 'warn';
        
            case 'renewal':
                return null;
        }
    }
}
```
</details>

## Export

Table can export its data to CSV format.

```html
<p-table #dt [columns]="cols" [value]="products" [exportHeader]="'customExportHeader'" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption>
        <div class="text-end pb-4">
            <p-button icon="pi pi-external-link" label="Export" (click)="dt.exportCSV()" />
        </div>
    </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowData let-columns="columns">
        <tr>
            <td *ngFor="let col of columns">
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

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
    template: `
        <div class="card">
            <p-table #dt [columns]="cols" [value]="products" [exportHeader]="'customExportHeader'" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #caption>
                    <div class="text-end pb-4">
                        <p-button icon="pi pi-external-link" label="Export" (click)="dt.exportCSV()" />
                    </div>
                </ng-template>
                <ng-template #header let-columns>
                    <tr>
                        <th *ngFor="let col of columns">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr>
                        <td *ngFor="let col of columns">
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TableModule],
    providers: [ProductService]
})
export class TableExportDemo implements OnInit {
    products!: Product[];
    selectedProducts!: Product[];

    constructor(private productService: ProductService) {}

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
}
```
</details>

## Advanced

Filters are displayed in an overlay.

```html
<p-table #dt1 [value]="customers()" dataKey="id" [rows]="10" [rowsPerPageOptions]="[10, 25, 50]" [loading]="loading()" [paginator]="true" [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']" showGridlines>
    <ng-template #caption>
        <div class="flex">
            <p-button label="Clear" [outlined]="true" icon="pi pi-filter-slash" (click)="clear(dt1)" />
            <p-iconfield iconPosition="left" class="ml-auto">
                <p-inputicon>
                    <i class="pi pi-search"></i>
                </p-inputicon>
                <input pInputText type="text" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="min-width:15rem">
                <div class="flex items-center justify-between">
                    Name
                    <p-columnFilter type="text" field="name" display="menu" />
                </div>
            </th>
            <th style="min-width:15rem">
                <div class="flex items-center justify-between">
                    Country
                    <p-columnFilter type="text" field="country.name" display="menu" />
                </div>
            </th>
            <th style="min-width:15rem">
                <div class="flex items-center justify-between">
                    Agent
                    <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                        <ng-template #filter let-value let-filter="filterCallback">
                            <p-multiselect [(ngModel)]="value" [options]="representatives()" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" style="min-width: 14rem" [panelStyle]="{ minWidth: '16rem' }">
                                <ng-template let-option #item>
                                    <div class="flex items-center gap-2">
                                        <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" style="width: 32px" />
                                        <span>{{ option.name }}</span>
                                    </div>
                                </ng-template>
                            </p-multiselect>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex items-center justify-between">
                    Date
                    <p-columnFilter type="date" field="date" display="menu"></p-columnFilter>
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex items-center justify-between">
                    Balance
                    <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" />
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex items-center justify-between">
                    Status
                    <p-columnFilter field="status" matchMode="equals" display="menu">
                        <ng-template #filter let-value let-filter="filterCallback">
                            <p-select [(ngModel)]="value" [options]="statuses()" (onChange)="filter($event.value)" placeholder="Select One" class="w-full">
                                <ng-template let-option #item>
                                    <p-tag [value]="option.value" [severity]="getSeverity(option.value)"></p-tag>
                                </ng-template>
                            </p-select>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="min-width:10rem">
                <div class="flex items-center justify-between">
                    Activity
                    <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                        <ng-template #filter let-value let-filter="filterCallback">
                            <p-slider [(ngModel)]="value" [range]="true" class="m-4" (onSlideEnd)="filter($event.values)" />
                            <div class="flex items-center px-2">
                                <span *ngIf="!value">0</span>
                                <span *ngIf="value">{{ value[0] }} - {{ value[1] }}</span>
                            </div>
                        </ng-template>
                    </p-columnFilter>
                </div>
            </th>
            <th style="width: 3rem">
                <div class="flex items-center justify-between">
                    Verified
                    <p-columnFilter type="boolean" field="verified" display="menu" />
                </div>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" />
                    <span>{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                {{ customer.date | date: 'MM/dd/yyyy' }}
            </td>
            <td>
                {{ customer.balance | currency: 'USD' : 'symbol' }}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                <p-progressbar [value]="customer.activity" [showValue]="false" />
            </td>
            <td class="text-center">
                <i
                    class="pi"
                    [ngClass]="{
                        'text-green-500 pi-check-circle': customer.verified,
                        'text-red-500 pi-times-circle': !customer.verified
                    }"
                ></i>
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td colspan="7">No customers found.</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table #dt1 [value]="customers()" dataKey="id" [rows]="10" [rowsPerPageOptions]="[10, 25, 50]" [loading]="loading()" [paginator]="true" [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']" showGridlines>
                <ng-template #caption>
                    <div class="flex">
                        <p-button label="Clear" [outlined]="true" icon="pi pi-filter-slash" (click)="clear(dt1)" />
                        <p-iconfield iconPosition="left" class="ml-auto">
                            <p-inputicon>
                                <i class="pi pi-search"></i>
                            </p-inputicon>
                            <input pInputText type="text" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                        </p-iconfield>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="min-width:15rem">
                            <div class="flex items-center justify-between">
                                Name
                                <p-columnFilter type="text" field="name" display="menu" />
                            </div>
                        </th>
                        <th style="min-width:15rem">
                            <div class="flex items-center justify-between">
                                Country
                                <p-columnFilter type="text" field="country.name" display="menu" />
                            </div>
                        </th>
                        <th style="min-width:15rem">
                            <div class="flex items-center justify-between">
                                Agent
                                <p-columnFilter field="representative" matchMode="in" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-multiselect [(ngModel)]="value" [options]="representatives()" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" style="min-width: 14rem" [panelStyle]="{ minWidth: '16rem' }">
                                            <ng-template let-option #item>
                                                <div class="flex items-center gap-2">
                                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" style="width: 32px" />
                                                    <span>{{ option.name }}</span>
                                                </div>
                                            </ng-template>
                                        </p-multiselect>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width:10rem">
                            <div class="flex items-center justify-between">
                                Date
                                <p-columnFilter type="date" field="date" display="menu"></p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width:10rem">
                            <div class="flex items-center justify-between">
                                Balance
                                <p-columnFilter type="numeric" field="balance" display="menu" currency="USD" />
                            </div>
                        </th>
                        <th style="min-width:10rem">
                            <div class="flex items-center justify-between">
                                Status
                                <p-columnFilter field="status" matchMode="equals" display="menu">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-select [(ngModel)]="value" [options]="statuses()" (onChange)="filter($event.value)" placeholder="Select One" class="w-full">
                                            <ng-template let-option #item>
                                                <p-tag [value]="option.value" [severity]="getSeverity(option.value)"></p-tag>
                                            </ng-template>
                                        </p-select>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="min-width:10rem">
                            <div class="flex items-center justify-between">
                                Activity
                                <p-columnFilter field="activity" matchMode="between" display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                                    <ng-template #filter let-value let-filter="filterCallback">
                                        <p-slider [(ngModel)]="value" [range]="true" class="m-4" (onSlideEnd)="filter($event.values)" />
                                        <div class="flex items-center px-2">
                                            <span *ngIf="!value">0</span>
                                            <span *ngIf="value">{{ value[0] }} - {{ value[1] }}</span>
                                        </div>
                                    </ng-template>
                                </p-columnFilter>
                            </div>
                        </th>
                        <th style="width: 3rem">
                            <div class="flex items-center justify-between">
                                Verified
                                <p-columnFilter type="boolean" field="verified" display="menu" />
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span>{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" />
                                <span>{{ customer.representative.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.date | date: 'MM/dd/yyyy' }}
                        </td>
                        <td>
                            {{ customer.balance | currency: 'USD' : 'symbol' }}
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                        <td>
                            <p-progressbar [value]="customer.activity" [showValue]="false" />
                        </td>
                        <td class="text-center">
                            <i
                                class="pi"
                                [ngClass]="{
                                    'text-green-500 pi-check-circle': customer.verified,
                                    'text-red-500 pi-times-circle': !customer.verified
                                }"
                            ></i>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="7">No customers found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, ProgressBarModule, SliderModule, TableModule, TagModule, InputTextModule, FormsModule],
    providers: [CustomerService]
})
export class TableFilterAdvancedDemo implements OnInit {
    customerService = inject(CustomerService);
    customers = signal<Customer[]>([]);
    representatives = signal<Representative[]>([]);
    statuses = signal<any[]>([]);
    loading = signal(true);
    searchValue = signal('');
    activityValues = signal<number[]>([0, 100]);

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            customers.forEach((customer: Customer) => (customer.date = new Date(customer.date as string)));
            this.customers.set(customers);
            this.loading.set(false);
        });
        this.representatives.set([
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ]);
        this.statuses.set([
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ]);
    }

    clear(table: Table) {
        table.clear();
        this.searchValue.set('');
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
        
            case 'qualified':
                return 'success';
        
            case 'new':
                return 'info';
        
            case 'negotiation':
                return 'warn';
        
            case 'renewal':
                return null;
        }
    }
}
```
</details>

## filterbasic-doc

Data filtering is enabled by defining the filters property referring to a DataTableFilterMeta instance. Each column to filter also requires filter to be enabled. Built-in filter element is a input field and using filterElement , it is possible to customize the filtering with your own UI. The optional global filtering searches the data against a single value that is bound to the global key of the filters object. The fields to search against is defined with the globalFilterFields .

```html
<p-table
    #dt2
    [value]="customers"
    dataKey="id"
    [rows]="10"
    [rowsPerPageOptions]="[10, 25, 50]"
    [loading]="loading"
    [paginator]="true"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    [tableStyle]="{ 'min-width': '75rem' }"
>
    <ng-template #caption>
        <div class="flex">
            <p-iconfield iconPosition="left" class="ml-auto">
                <p-inputicon>
                    <i class="pi pi-search"></i>
                </p-inputicon>
                <input pInputText type="text" (input)="dt2.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width:22%">Name</th>
            <th style="width:22%">Country</th>
            <th style="width:22%">Agent</th>
            <th style="width:22%">Status</th>
            <th style="width:12%">Verified</th>
        </tr>
        <tr>
            <th>
                <p-columnFilter type="text" field="name" placeholder="Type to search" ariaLabel="Filter Name" filterOn="input"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="text" field="country.name" placeholder="Enter key to search" ariaLabel="Filter Country"></p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                    <ng-template #filter let-value let-filter="filterCallback">
                        <p-multiselect [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" style="min-width: 14rem" [panelStyle]="{ minWidth: '16rem' }">
                            <ng-template let-option #item>
                                <div class="flex items-center gap-2">
                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" style="width: 32px" />
                                    <span>{{ option.name }}</span>
                                </div>
                            </ng-template>
                        </p-multiselect>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                    <ng-template #filter let-value let-filter="filterCallback">
                        <p-select [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Select One" [showClear]="true" style="min-width: 12rem">
                            <ng-template let-option #item>
                                <p-tag [value]="option.value" [severity]="getSeverity(option.value)" />
                            </ng-template>
                        </p-select>
                    </ng-template>
                </p-columnFilter>
            </th>
            <th>
                <p-columnFilter type="boolean" field="verified"></p-columnFilter>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span>{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                <i
                    class="pi"
                    [ngClass]="{
                        'text-green-500 pi-check-circle': customer.verified,
                        'text-red-500 pi-times-circle': !customer.verified
                    }"
                ></i>
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td colspan="5">No customers found.</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table
                #dt2
                [value]="customers"
                dataKey="id"
                [rows]="10"
                [rowsPerPageOptions]="[10, 25, 50]"
                [loading]="loading"
                [paginator]="true"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                [tableStyle]="{ 'min-width': '75rem' }"
            >
                <ng-template #caption>
                    <div class="flex">
                        <p-iconfield iconPosition="left" class="ml-auto">
                            <p-inputicon>
                                <i class="pi pi-search"></i>
                            </p-inputicon>
                            <input pInputText type="text" (input)="dt2.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />
                        </p-iconfield>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="width:22%">Name</th>
                        <th style="width:22%">Country</th>
                        <th style="width:22%">Agent</th>
                        <th style="width:22%">Status</th>
                        <th style="width:12%">Verified</th>
                    </tr>
                    <tr>
                        <th>
                            <p-columnFilter type="text" field="name" placeholder="Type to search" ariaLabel="Filter Name" filterOn="input"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter type="text" field="country.name" placeholder="Enter key to search" ariaLabel="Filter Country"></p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                                <ng-template #filter let-value let-filter="filterCallback">
                                    <p-multiselect [(ngModel)]="value" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" style="min-width: 14rem" [panelStyle]="{ minWidth: '16rem' }">
                                        <ng-template let-option #item>
                                            <div class="flex items-center gap-2">
                                                <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" style="width: 32px" />
                                                <span>{{ option.name }}</span>
                                            </div>
                                        </ng-template>
                                    </p-multiselect>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter field="status" matchMode="equals" [showMenu]="false">
                                <ng-template #filter let-value let-filter="filterCallback">
                                    <p-select [(ngModel)]="value" [options]="statuses" (onChange)="filter($event.value)" placeholder="Select One" [showClear]="true" style="min-width: 12rem">
                                        <ng-template let-option #item>
                                            <p-tag [value]="option.value" [severity]="getSeverity(option.value)" />
                                        </ng-template>
                                    </p-select>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                        <th>
                            <p-columnFilter type="boolean" field="verified"></p-columnFilter>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span>{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span>{{ customer.representative.name }}</span>
                            </div>
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                        <td>
                            <i
                                class="pi"
                                [ngClass]="{
                                    'text-green-500 pi-check-circle': customer.verified,
                                    'text-red-500 pi-times-circle': !customer.verified
                                }"
                            ></i>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="5">No customers found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, TableModule, TagModule, InputTextModule, FormsModule],
    providers: [CustomerService]
})
export class TableFilterbasicDemo implements OnInit {
    customers!: Customer[];
    representatives!: Representative[];
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
            this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
        });
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    clear(table: Table) {
        table.clear();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
        
            case 'qualified':
                return 'success';
        
            case 'new':
                return 'info';
        
            case 'negotiation':
                return 'warn';
        
            case 'renewal':
                return null;
        }
    }
}
```
</details>

## flexiblescroll-doc

Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data viewport adjusts itself according to the size changes.

```html
<div class="flex justify-center">
    <button type="button" (click)="showDialog()" pButton icon="pi pi-external-link" label="Show"></button>
</div>
<p-dialog header="Header" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{ width: '75vw' }" [contentStyle]="{ height: '300px' }">
    <p-table [value]="customers" [scrollable]="true" scrollHeight="flex" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #header>
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Company</th>
                <th>Representative</th>
            </tr>
        </ng-template>
        <ng-template #body let-customer>
            <tr>
                <td>{{ customer.name }}</td>
                <td>{{ customer.country.name }}</td>
                <td>{{ customer.company }}</td>
                <td>{{ customer.representative.name }}</td>
            </tr>
        </ng-template>
    </p-table>
    <ng-template #footer>
        <p-button label="Ok" icon="pi pi-check" (onClick)="dialogVisible = false" />
    </ng-template>
</p-dialog>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <div class="flex justify-center">
                <button type="button" (click)="showDialog()" pButton icon="pi pi-external-link" label="Show"></button>
            </div>
            <p-dialog header="Header" [resizable]="false" [modal]="true" [maximizable]="true" appendTo="body" [(visible)]="dialogVisible" [style]="{ width: '75vw' }" [contentStyle]="{ height: '300px' }">
                <p-table [value]="customers" [scrollable]="true" scrollHeight="flex" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Representative</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer>
                        <tr>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.country.name }}</td>
                            <td>{{ customer.company }}</td>
                            <td>{{ customer.representative.name }}</td>
                        </tr>
                    </ng-template>
                </p-table>
                <ng-template #footer>
                    <p-button label="Ok" icon="pi pi-check" (onClick)="dialogVisible = false" />
                </ng-template>
            </p-dialog>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DialogModule, TableModule],
    providers: [CustomerService]
})
export class TableFlexiblescrollDemo implements OnInit {
    customers!: Customer[];
    dialogVisible: boolean = false;

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    showDialog() {
        this.dialogVisible = true;
    }
}
```
</details>

## frozencolumns-doc

Certain columns can be frozen by using the pFrozenColumn directive of the table component. In addition, alignFrozen is available to define whether the column should be fixed on the left or right.

```html
<p-togglebutton [(ngModel)]="balanceFrozen" [onIcon]="'pi pi-lock'" offIcon="pi pi-lock-open" [onLabel]="'Balance'" offLabel="Balance" />
<p-table [value]="customers" [scrollable]="true" scrollHeight="400px" class="mt-4">
    <ng-template #header>
        <tr>
            <th style="min-width:200px" pFrozenColumn class="font-bold">Name</th>
            <th style="min-width:100px">Id</th>
            <th style="min-width:200px">Country</th>
            <th style="min-width:200px">Date</th>
            <th style="min-width:200px">Company</th>
            <th style="min-width:200px">Status</th>
            <th style="min-width:200px">Activity</th>
            <th style="min-width:200px">Representative</th>
            <th style="min-width:200px" alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen" [ngClass]="{ 'font-bold': balanceFrozen }">Balance</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td pFrozenColumn class="font-bold">{{ customer.name }}</td>
            <td style="min-width:100px">{{ customer.id }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.date }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.status }}</td>
            <td>{{ customer.activity }}</td>
            <td>{{ customer.representative.name }}</td>
            <td alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen" [ngClass]="{ 'font-bold': balanceFrozen }">
                {{ formatCurrency(customer.balance) }}
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-togglebutton [(ngModel)]="balanceFrozen" [onIcon]="'pi pi-lock'" offIcon="pi pi-lock-open" [onLabel]="'Balance'" offLabel="Balance" />
            <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" class="mt-4">
                <ng-template #header>
                    <tr>
                        <th style="min-width:200px" pFrozenColumn class="font-bold">Name</th>
                        <th style="min-width:100px">Id</th>
                        <th style="min-width:200px">Country</th>
                        <th style="min-width:200px">Date</th>
                        <th style="min-width:200px">Company</th>
                        <th style="min-width:200px">Status</th>
                        <th style="min-width:200px">Activity</th>
                        <th style="min-width:200px">Representative</th>
                        <th style="min-width:200px" alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen" [ngClass]="{ 'font-bold': balanceFrozen }">Balance</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td pFrozenColumn class="font-bold">{{ customer.name }}</td>
                        <td style="min-width:100px">{{ customer.id }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.date }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.status }}</td>
                        <td>{{ customer.activity }}</td>
                        <td>{{ customer.representative.name }}</td>
                        <td alignFrozen="right" pFrozenColumn [frozen]="balanceFrozen" [ngClass]="{ 'font-bold': balanceFrozen }">
                            {{ formatCurrency(customer.balance) }}
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, ToggleButtonModule, FormsModule],
    providers: [CustomerService]
})
export class TableFrozencolumnsDemo implements OnInit {
    balanceFrozen: boolean = false;
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}
```
</details>

## frozenrows-doc

Frozen rows are used to fix certain rows while scrolling, this data is defined with the frozenValue property.

```html
<p-table [value]="unlockedCustomers" [frozenValue]="lockedCustomers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Company</th>
            <th>Representative</th>
            <th style="width:5rem"></th>
        </tr>
    </ng-template>
    <ng-template #frozenbody let-customer let-index="rowIndex">
        <tr class="font-bold">
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
            <td>
                <button pButton pRipple type="button" [icon]="'pi pi-lock-open'" (click)="toggleLock(customer, true, index)" size="small" text></button>
            </td>
        </tr>
    </ng-template>
    <ng-template #body let-customer let-index="rowIndex">
        <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
            <td>
                <button pButton pRipple type="button" [icon]="'pi pi-lock'" [disabled]="lockedCustomers.length >= 2" (click)="toggleLock(customer, false, index)" size="small" text></button>
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="unlockedCustomers" [frozenValue]="lockedCustomers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Company</th>
                        <th>Representative</th>
                        <th style="width:5rem"></th>
                    </tr>
                </ng-template>
                <ng-template #frozenbody let-customer let-index="rowIndex">
                    <tr class="font-bold">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                        <td>
                            <button pButton pRipple type="button" [icon]="'pi pi-lock-open'" (click)="toggleLock(customer, true, index)" size="small" text></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #body let-customer let-index="rowIndex">
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                        <td>
                            <button pButton pRipple type="button" [icon]="'pi pi-lock'" [disabled]="lockedCustomers.length >= 2" (click)="toggleLock(customer, false, index)" size="small" text></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, ButtonModule, RippleModule],
    providers: [CustomerService]
})
export class TableFrozenrowsDemo implements OnInit {
    unlockedCustomers!: Customer[];
    lockedCustomers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.unlockedCustomers = data;
        });
        this.lockedCustomers = [
            {
                id: 5135,
                name: 'Geraldine Bisset',
                country: {
                    name: 'France',
                    code: 'fr'
                },
                company: 'Bisset Group',
                status: 'proposal',
                date: '2019-05-05',
                activity: 0,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                }
            }
        ];
    }

    toggleLock(data: Customer, frozen: boolean, index: number) {
        if (frozen) {
            this.lockedCustomers = this.lockedCustomers.filter((c, i) => i !== index);
            this.unlockedCustomers.push(data);
        } else {
            this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
            this.lockedCustomers.push(data);
        }
        
        this.unlockedCustomers.sort((val1, val2) => {
            return val1.id < val2.id ? -1 : 1;
        });
    }
}
```
</details>

## Grid Lines

Enabling showGridlines displays borders between cells.

```html
<p-table [value]="products" showGridlines [tableStyle]="{ 'min-width': '50rem' }">
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" showGridlines [tableStyle]="{ 'min-width': '50rem' }">
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableGridlinesDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## horizontalscroll-doc

Horizontal scrollbar is displayed when table width exceeds the parent width.

```html
<p-table [value]="customers" [scrollable]="true" scrollHeight="400px">
    <ng-template #header>
        <tr>
            <th style="min-width:100px">Id</th>
            <th style="min-width:200px">Name</th>
            <th style="min-width:200px">Country</th>
            <th style="min-width:200px">Date</th>
            <th style="min-width:200px">Balance</th>
            <th style="min-width:200px">Company</th>
            <th style="min-width:200px">Status</th>
            <th style="min-width:200px">Activity</th>
            <th style="min-width:200px">Representative</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.date }}</td>
            <td>{{ formatCurrency(customer.balance) }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.status }}</td>
            <td>{{ customer.activity }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
    <ng-template #footer>
        <tr class="font-bold">
            <td>Id</td>
            <td>Name</td>
            <td>Country</td>
            <td>Date</td>
            <td>Balance</td>
            <td>Company</td>
            <td>Status</td>
            <td>Activity</td>
            <td>Representative</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" [scrollable]="true" scrollHeight="400px">
                <ng-template #header>
                    <tr>
                        <th style="min-width:100px">Id</th>
                        <th style="min-width:200px">Name</th>
                        <th style="min-width:200px">Country</th>
                        <th style="min-width:200px">Date</th>
                        <th style="min-width:200px">Balance</th>
                        <th style="min-width:200px">Company</th>
                        <th style="min-width:200px">Status</th>
                        <th style="min-width:200px">Activity</th>
                        <th style="min-width:200px">Representative</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>{{ customer.id }}</td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.date }}</td>
                        <td>{{ formatCurrency(customer.balance) }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.status }}</td>
                        <td>{{ customer.activity }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
                <ng-template #footer>
                    <tr class="font-bold">
                        <td>Id</td>
                        <td>Name</td>
                        <td>Country</td>
                        <td>Date</td>
                        <td>Balance</td>
                        <td>Company</td>
                        <td>Status</td>
                        <td>Activity</td>
                        <td>Representative</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [CustomerService]
})
export class TableHorizontalscrollDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}
```
</details>

## lazyload-doc

Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking onLazyLoad callback everytime paging , sorting and filtering happens. Sample here loads the data from remote datasource efficiently using lazy loading. Also, the implementation of checkbox selection in lazy tables is left entirely to the user. Since the table component does not know what will happen to the data on the next page or whether there are instant data changes, the selection array can be implemented in several ways. One of them is as in the example below.

```html
<p-table
    [value]="customers"
    [lazy]="true"
    (onLazyLoad)="loadCustomers($event)"
    dataKey="id"
    [tableStyle]="{ 'min-width': '75rem' }"
    [selection]="selectedCustomers"
    (selectionChange)="onSelectionChange($event)"
    [selectAll]="selectAll"
    (selectAllChange)="onSelectAllChange($event)"
    [paginator]="true"
    [rows]="10"
    [totalRecords]="totalRecords"
    [loading]="loading"
    [globalFilterFields]="['name', 'country.name', 'company', 'representative.name']"
>
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem"></th>
            <th pSortableColumn="name">Name <p-sortIcon field="name" /></th>
            <th pSortableColumn="country.name">Country <p-sortIcon field="country.name" /></th>
            <th pSortableColumn="company">Company <p-sortIcon field="company" /></th>
            <th pSortableColumn="representative.name">Representative <p-sortIcon field="representative.name" /></th>
        </tr>
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox />
            </th>
            <th>
                <p-columnFilter type="text" field="name" />
            </th>
            <th>
                <p-columnFilter type="text" field="country.name" />
            </th>
            <th>
                <p-columnFilter type="text" field="company" />
            </th>
            <th>
                <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                    <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                        <p-multiselect [(ngModel)]="value" appendTo="body" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" [maxSelectedLabels]="1" [selectedItemsLabel]="'{0} items'">
                            <ng-template let-option pTemplate="item">
                                <div class="inline-block align-middle">
                                    <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="align-middle" />
                                    <span class="ml-1 mt-1">{{ option.name }}</span>
                                </div>
                            </ng-template>
                        </p-multiselect>
                    </ng-template>
                </p-columnFilter>
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>
                <p-tableCheckbox [value]="customer"></p-tableCheckbox>
            </td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { TableLazyLoadEvent } from 'primeng/api';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table
                [value]="customers"
                [lazy]="true"
                (onLazyLoad)="loadCustomers($event)"
                dataKey="id"
                [tableStyle]="{ 'min-width': '75rem' }"
                [selection]="selectedCustomers"
                (selectionChange)="onSelectionChange($event)"
                [selectAll]="selectAll"
                (selectAllChange)="onSelectAllChange($event)"
                [paginator]="true"
                [rows]="10"
                [totalRecords]="totalRecords"
                [loading]="loading"
                [globalFilterFields]="['name', 'country.name', 'company', 'representative.name']"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem"></th>
                        <th pSortableColumn="name">Name <p-sortIcon field="name" /></th>
                        <th pSortableColumn="country.name">Country <p-sortIcon field="country.name" /></th>
                        <th pSortableColumn="company">Company <p-sortIcon field="company" /></th>
                        <th pSortableColumn="representative.name">Representative <p-sortIcon field="representative.name" /></th>
                    </tr>
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox />
                        </th>
                        <th>
                            <p-columnFilter type="text" field="name" />
                        </th>
                        <th>
                            <p-columnFilter type="text" field="country.name" />
                        </th>
                        <th>
                            <p-columnFilter type="text" field="company" />
                        </th>
                        <th>
                            <p-columnFilter field="representative" matchMode="in" [showMenu]="false">
                                <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                                    <p-multiselect [(ngModel)]="value" appendTo="body" [options]="representatives" placeholder="Any" (onChange)="filter($event.value)" optionLabel="name" [maxSelectedLabels]="1" [selectedItemsLabel]="'{0} items'">
                                        <ng-template let-option pTemplate="item">
                                            <div class="inline-block align-middle">
                                                <img [alt]="option.label" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ option.image }}" width="24" class="align-middle" />
                                                <span class="ml-1 mt-1">{{ option.name }}</span>
                                            </div>
                                        </ng-template>
                                    </p-multiselect>
                                </ng-template>
                            </p-columnFilter>
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="customer"></p-tableCheckbox>
                        </td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [MultiSelectModule, TableModule, FormsModule],
    providers: [CustomerService]
})
export class TableLazyloadDemo implements OnInit {
    customers!: Customer[];
    totalRecords!: number;
    loading: boolean = false;
    representatives!: Representative[];
    selectAll: boolean = false;
    selectedCustomers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.loading = true;
    }

    loadCustomers(event: TableLazyLoadEvent) {
        this.loading = true;
        
        setTimeout(() => {
            this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res) => {
                this.customers = res.customers;
                this.totalRecords = res.totalRecords;
                this.loading = false;
                this.cd.markForCheck();
            });
        }, 1000);
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalRecords;
        this.selectedCustomers = value;
    }

    onSelectAllChange(event: any) {
        const checked = event.checked;
        
        if (checked) {
            this.customerService.getCustomers().then((res) => {
                this.selectedCustomers = res.customers;
                this.selectAll = true;
            });
        } else {
            this.selectedCustomers = [];
            this.selectAll = false;
        }
    }
}
```
</details>

## loadingmask-doc

The loading property displays a mask layer to indicate busy state. Use the paginator to display the mask.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [loading]="true">
    <ng-template #header>
        <tr>
            <th style="width:25%">Code</th>
            <th style="width:25%">Name</th>
            <th style="width:25%">Category</th>
            <th style="width:25%">Quantity</th>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [loading]="true">
                <ng-template #header>
                    <tr>
                        <th style="width:25%">Code</th>
                        <th style="width:25%">Name</th>
                        <th style="width:25%">Category</th>
                        <th style="width:25%">Quantity</th>
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableLoadingmaskDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## loadingskeleton-doc

Skeleton component can be used as a placeholder during the loading process.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
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
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
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
                        <td><p-skeleton /></td>
                        <td><p-skeleton /></td>
                        <td><p-skeleton /></td>
                        <td><p-skeleton /></td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [SkeletonModule, TableModule]
})
export class TableLoadingskeletonDemo implements OnInit {
    products!: Product[];

    ngOnInit() {
        this.products = Array.from({ length: 10 }).map((_, i) => ({ id: i.toString() }));
    }
}
```
</details>

## multiplecolumnssort-doc

Multiple columns can be sorted by defining sortMode as multiple . This mode requires metaKey (e.g. ⌘ ) to be pressed when clicking a header.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }" sortMode="multiple">
    <ng-template #header>
        <tr>
            <th pSortableColumn="code" style="width:20%">
                <div class="flex items-center gap-2">
                    Code
                    <p-sortIcon field="code" />
                </div>
            </th>
            <th pSortableColumn="name" style="width:20%">
                <div class="flex items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                </div>
            </th>
            <th pSortableColumn="category" style="width:20%">
                <div class="flex items-center gap-2">
                    Category
                    <p-sortIcon field="category" />
                </div>
            </th>
            <th pSortableColumn="quantity" style="width:20%">
                <div class="flex items-center gap-2">
                    Quantity
                    <p-sortIcon field="quantity" />
                </div>
            </th>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }" sortMode="multiple">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="code" style="width:20%">
                            <div class="flex items-center gap-2">
                                Code
                                <p-sortIcon field="code" />
                            </div>
                        </th>
                        <th pSortableColumn="name" style="width:20%">
                            <div class="flex items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                            </div>
                        </th>
                        <th pSortableColumn="category" style="width:20%">
                            <div class="flex items-center gap-2">
                                Category
                                <p-sortIcon field="category" />
                            </div>
                        </th>
                        <th pSortableColumn="quantity" style="width:20%">
                            <div class="flex items-center gap-2">
                                Quantity
                                <p-sortIcon field="quantity" />
                            </div>
                        </th>
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableMultiplecolumnssortDemo implements OnInit {
    products: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## multipleselection-doc

More than one row is selectable by setting selectionMode to multiple . By default in multiple selection mode, metaKey press (e.g. ⌘ ) is not necessary to add to existing selections. When the optional metaKeySelection is present, behavior is changed in a way that selecting a new row requires meta key to be present. Note that in touch enabled devices, DataTable always ignores metaKey.

```html
<div class="flex justify-center items-center mb-6 gap-2">
    <p-toggleswitch [(ngModel)]="metaKey" inputId="input-metakey" />
    <label for="input-metakey">MetaKey</label>
</div>
<p-table [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [metaKeySelection]="metaKey" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product let-rowIndex="rowIndex">
        <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <div class="flex justify-center items-center mb-6 gap-2">
                <p-toggleswitch [(ngModel)]="metaKey" inputId="input-metakey" />
                <label for="input-metakey">MetaKey</label>
            </div>
            <p-table [value]="products" selectionMode="multiple" [(selection)]="selectedProducts" [metaKeySelection]="metaKey" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product let-rowIndex="rowIndex">
                    <tr [pSelectableRow]="product" [pSelectableRowIndex]="rowIndex">
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, ToggleSwitchModule, FormsModule],
    providers: [ProductService]
})
export class TableMultipleselectionDemo implements OnInit {
    products!: Product[];
    selectedProducts!: Product;
    metaKey: boolean = true;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## pageonlyselection-doc

```html
<p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [paginator]="true" [rows]="5" [selectionPageOnly]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th style="min-width:200px">Code</th>
            <th style="min-width:200px">Name</th>
            <th style="min-width:200px">Category</th>
            <th style="min-width:200px">Quantity</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>
                <p-tableCheckbox [value]="product"></p-tableCheckbox>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [paginator]="true" [rows]="5" [selectionPageOnly]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th style="min-width:200px">Code</th>
                        <th style="min-width:200px">Name</th>
                        <th style="min-width:200px">Category</th>
                        <th style="min-width:200px">Quantity</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="product"></p-tableCheckbox>
                        </td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TablePageonlyselectionDemo implements OnInit {
    products!: Product[];
    selectedProducts!: Product;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## paginatorbasic-doc

Pagination is enabled by setting paginator property to true and defining a rows property to specify the number of rows per page.

```html
<p-table [value]="customers" [paginator]="true" [rows]="5" [tableStyle]="{ 'min-width': '50rem' }" [rowsPerPageOptions]="[5, 10, 20]">
    <ng-template #header>
        <tr>
            <th style="width:25%">Name</th>
            <th style="width:25%">Country</th>
            <th style="width:25%">Company</th>
            <th style="width:25%">Representative</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" [paginator]="true" [rows]="5" [tableStyle]="{ 'min-width': '50rem' }" [rowsPerPageOptions]="[5, 10, 20]">
                <ng-template #header>
                    <tr>
                        <th style="width:25%">Name</th>
                        <th style="width:25%">Country</th>
                        <th style="width:25%">Company</th>
                        <th style="width:25%">Representative</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [CustomerService]
})
export class TablePaginatorbasicDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
        });
    }
}
```
</details>

## paginatorlocale-doc

paginator localization information such as page numbers and rows per page options are defined with the paginatorLocale property which defaults to the user locale.

```html
<p-table
    [value]="customers"
    [paginator]="true"
    [rows]="5"
    [showCurrentPageReport]="true"
    [tableStyle]="{ 'min-width': '50rem' }"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [rowsPerPageOptions]="[10, 25, 50]"
    paginatorLocale="fa-IR"
>
    <ng-template pTemplate="header">
        <tr>
            <th style="width:25%">Name</th>
            <th style="width:25%">Country</th>
            <th style="width:25%">Company</th>
            <th style="width:25%">Representative</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-customer>
        <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
    <ng-template pTemplate="paginatorleft">
        <p-button type="button" icon="pi pi-plus" text></p-button>
    </ng-template>
    <ng-template pTemplate="paginatorright">
        <p-button type="button" icon="pi pi-cloud" text></p-button>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table
                [value]="customers"
                [paginator]="true"
                [rows]="5"
                [showCurrentPageReport]="true"
                [tableStyle]="{ 'min-width': '50rem' }"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [rowsPerPageOptions]="[10, 25, 50]"
                paginatorLocale="fa-IR"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width:25%">Name</th>
                        <th style="width:25%">Country</th>
                        <th style="width:25%">Company</th>
                        <th style="width:25%">Representative</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-customer>
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="paginatorleft">
                    <p-button type="button" icon="pi pi-plus" text></p-button>
                </ng-template>
                <ng-template pTemplate="paginatorright">
                    <p-button type="button" icon="pi pi-cloud" text></p-button>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TableModule],
    providers: [CustomerService]
})
export class TablePaginatorlocaleDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
        });
    }
}
```
</details>

## paginatorprogrammatic-doc

Paginator can also be controlled via model using a binding to the first property where changes trigger a pagination.

```html
<div class="mb-4 flex gap-1">
    <p-button type="button" icon="pi pi-chevron-left" (click)="prev()" [disabled]="isFirstPage()" text />
    <p-button type="button" icon="pi pi-refresh" (click)="reset()" text />
    <p-button type="button" icon="pi pi-chevron-right" (click)="next()" [disabled]="isLastPage()" text />
</div>
<p-table
    [value]="customers"
    [paginator]="true"
    [rows]="rows"
    [showCurrentPageReport]="true"
    [first]="first"
    [tableStyle]="{ 'min-width': '50rem' }"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    (onPage)="pageChange($event)"
    [rowsPerPageOptions]="[10, 25, 50]"
>
    <ng-template #header>
        <tr>
            <th style="width:25%">Name</th>
            <th style="width:25%">Country</th>
            <th style="width:25%">Company</th>
            <th style="width:25%">Representative</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <div class="mb-4 flex gap-1">
                <p-button type="button" icon="pi pi-chevron-left" (click)="prev()" [disabled]="isFirstPage()" text />
                <p-button type="button" icon="pi pi-refresh" (click)="reset()" text />
                <p-button type="button" icon="pi pi-chevron-right" (click)="next()" [disabled]="isLastPage()" text />
            </div>
            <p-table
                [value]="customers"
                [paginator]="true"
                [rows]="rows"
                [showCurrentPageReport]="true"
                [first]="first"
                [tableStyle]="{ 'min-width': '50rem' }"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                (onPage)="pageChange($event)"
                [rowsPerPageOptions]="[10, 25, 50]"
            >
                <ng-template #header>
                    <tr>
                        <th style="width:25%">Name</th>
                        <th style="width:25%">Country</th>
                        <th style="width:25%">Company</th>
                        <th style="width:25%">Representative</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, TableModule],
    providers: [CustomerService]
})
export class TablePaginatorprogrammaticDemo implements OnInit {
    customers!: Customer[];
    first: number = 0;
    rows: number = 10;

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
        });
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        return this.customers ? this.first + this.rows >= this.customers.length : true;
    }

    isFirstPage(): boolean {
        return this.customers ? this.first === 0 : true;
    }
}
```
</details>

## presort-doc

Defining a default sortField and sortOrder displays data as sorted initially in single column sorting. In multiple sort mode, multiSortMeta should be used instead by providing an array of DataTableSortMeta objects.

```html
<p-table [value]="products" sortField="price" [sortOrder]="-1" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template #header>
        <tr>
            <th pSortableColumn="code" style="width:20%">
                <div class="flex items-center gap-2">
                    Code
                    <p-sortIcon field="code" />
                </div>
            </th>
            <th pSortableColumn="name" style="width:20%">
                <div class="flex items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                </div>
            </th>
            <th pSortableColumn="price" style="width:20%">
                <div class="flex items-center gap-2">
                    Price
                    <p-sortIcon field="price" />
                </div>
            </th>
            <th pSortableColumn="category" style="width:20%">
                <div class="flex items-center gap-2">
                    Category
                    <p-sortIcon field="category" />
                </div>
            </th>
            <th pSortableColumn="quantity" style="width:20%">
                <div class="flex items-center gap-2">
                    Quantity
                    <p-sortIcon field="quantity" />
                </div>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price | currency: 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" sortField="price" [sortOrder]="-1" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="code" style="width:20%">
                            <div class="flex items-center gap-2">
                                Code
                                <p-sortIcon field="code" />
                            </div>
                        </th>
                        <th pSortableColumn="name" style="width:20%">
                            <div class="flex items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                            </div>
                        </th>
                        <th pSortableColumn="price" style="width:20%">
                            <div class="flex items-center gap-2">
                                Price
                                <p-sortIcon field="price" />
                            </div>
                        </th>
                        <th pSortableColumn="category" style="width:20%">
                            <div class="flex items-center gap-2">
                                Category
                                <p-sortIcon field="category" />
                            </div>
                        </th>
                        <th pSortableColumn="quantity" style="width:20%">
                            <div class="flex items-center gap-2">
                                Quantity
                                <p-sortIcon field="quantity" />
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TablePresortDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## Products

CRUD implementation example with a Dialog.

```html
<p-toast />
<p-toolbar class="mb-6">
    <ng-template #start>
        <p-button label="New" icon="pi pi-plus" class="mr-2" (onClick)="openNew()" />
        <p-button severity="danger" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length" />
    </ng-template>
    <ng-template #end>
        <p-fileUpload mode="basic" accept="image/*" [maxFileSize]="1000000" label="Import" chooseLabel="Import" auto customUpload class="mr-2 inline-block" [chooseButtonProps]="{ severity: 'secondary' }" />
        <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV($event)" />
    </ng-template>
</p-toolbar>
<p-table
    #dt
    [value]="products"
    [rows]="10"
    [columns]="cols"
    [paginator]="true"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    [tableStyle]="{ 'min-width': '75rem' }"
    [(selection)]="selectedProducts"
    [rowHover]="true"
    dataKey="id"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [showCurrentPageReport]="true"
>
    <ng-template #caption>
        <div class="flex items-center justify-between">
            <h5 class="m-0">Manage Products</h5>
            <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search..." />
            </p-iconfield>
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width: 3rem">
                <p-tableHeaderCheckbox />
            </th>
            <th style="min-width: 16rem">Code</th>
            <th pSortableColumn="name" style="min-width:16rem">
                <div class="flex items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                </div>
            </th>
            <th>Image</th>
            <th pSortableColumn="price" style="min-width: 8rem">
                <div class="flex items-center gap-2">
                    Price
                    <p-sortIcon field="price" />
                </div>
            </th>
            <th pSortableColumn="category" style="min-width:10rem">
                <div class="flex items-center gap-2">
                    Category
                    <p-sortIcon field="category" />
                </div>
            </th>
            <th pSortableColumn="rating" style="min-width: 12rem">
                <div class="flex items-center gap-2">
                    Reviews
                    <p-sortIcon field="rating" />
                </div>
            </th>
            <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                <div class="flex items-center gap-2">
                    Status
                    <p-sortIcon field="inventoryStatus" />
                </div>
            </th>
            <th style="min-width: 12rem"></th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td style="width: 3rem">
                <p-tableCheckbox [value]="product" />
            </td>
            <td style="min-width: 12rem">{{ product.code }}</td>
            <td style="min-width: 16rem">{{ product.name }}</td>
            <td>
                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" style="width: 64px" class="rounded" />
            </td>
            <td>{{ product.price | currency: 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td>
                <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" />
            </td>
            <td>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
            </td>
            <td>
                <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editProduct(product)" />
                <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteProduct(product)" />
            </td>
        </tr>
    </ng-template>
</p-table>
<p-dialog [(visible)]="productDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true">
    <ng-template #content>
        <div class="flex flex-col gap-6">
            <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-4" *ngIf="product.image" />
            <div>
                <label for="name" class="block font-bold mb-3">Name</label>
                <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus fluid />
                <small class="text-red-500" *ngIf="submitted && !product.name">Name is required.</small>
            </div>
            <div>
                <label for="description" class="block font-bold mb-3">Description</label>
                <textarea id="description" pTextarea [(ngModel)]="product.description" required rows="3" cols="20" fluid></textarea>
            </div>
            <div>
                <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" optionValue="label" placeholder="Select a Status" fluid />
            </div>
            <div>
                <span class="block font-bold mb-4">Category</span>
                <div class="grid grid-cols-12 gap-4">
                    <div class="flex items-center gap-2 col-span-6">
                        <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="product.category" />
                        <label for="category1">Accessories</label>
                    </div>
                    <div class="flex items-center gap-2 col-span-6">
                        <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="product.category" />
                        <label for="category2">Clothing</label>
                    </div>
                    <div class="flex items-center gap-2 col-span-6">
                        <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="product.category" />
                        <label for="category3">Electronics</label>
                    </div>
                    <div class="flex items-center gap-2 col-span-6">
                        <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="product.category" />
                        <label for="category4">Fitness</label>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-6">
                    <label for="price" class="block font-bold mb-3">Price</label>
                    <p-inputnumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                </div>
                <div class="col-span-6">
                    <label for="quantity" class="block font-bold mb-3">Quantity</label>
                    <p-inputnumber id="quantity" [(ngModel)]="product.quantity" fluid />
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template #footer>
        <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
        <p-button label="Save" icon="pi pi-check" (click)="saveProduct()" />
    </ng-template>
</p-dialog>
<p-confirmdialog [style]="{ width: '450px' }" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Dialog, DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '@/service/productservice';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Product } from '@/domain/product';

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
    template: `
        <div class="card">
            <p-toast />
            <p-toolbar class="mb-6">
                <ng-template #start>
                    <p-button label="New" icon="pi pi-plus" class="mr-2" (onClick)="openNew()" />
                    <p-button severity="danger" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length" />
                </ng-template>
                <ng-template #end>
                    <p-fileUpload mode="basic" accept="image/*" [maxFileSize]="1000000" label="Import" chooseLabel="Import" auto customUpload class="mr-2 inline-block" [chooseButtonProps]="{ severity: 'secondary' }" />
                    <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV($event)" />
                </ng-template>
            </p-toolbar>
            <p-table
                #dt
                [value]="products"
                [rows]="10"
                [columns]="cols"
                [paginator]="true"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                [tableStyle]="{ 'min-width': '75rem' }"
                [(selection)]="selectedProducts"
                [rowHover]="true"
                dataKey="id"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [showCurrentPageReport]="true"
            >
                <ng-template #caption>
                    <div class="flex items-center justify-between">
                        <h5 class="m-0">Manage Products</h5>
                        <p-iconfield>
                            <p-inputicon class="pi pi-search" />
                            <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search..." />
                        </p-iconfield>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="width: 3rem">
                            <p-tableHeaderCheckbox />
                        </th>
                        <th style="min-width: 16rem">Code</th>
                        <th pSortableColumn="name" style="min-width:16rem">
                            <div class="flex items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                            </div>
                        </th>
                        <th>Image</th>
                        <th pSortableColumn="price" style="min-width: 8rem">
                            <div class="flex items-center gap-2">
                                Price
                                <p-sortIcon field="price" />
                            </div>
                        </th>
                        <th pSortableColumn="category" style="min-width:10rem">
                            <div class="flex items-center gap-2">
                                Category
                                <p-sortIcon field="category" />
                            </div>
                        </th>
                        <th pSortableColumn="rating" style="min-width: 12rem">
                            <div class="flex items-center gap-2">
                                Reviews
                                <p-sortIcon field="rating" />
                            </div>
                        </th>
                        <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                            <div class="flex items-center gap-2">
                                Status
                                <p-sortIcon field="inventoryStatus" />
                            </div>
                        </th>
                        <th style="min-width: 12rem"></th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td style="width: 3rem">
                            <p-tableCheckbox [value]="product" />
                        </td>
                        <td style="min-width: 12rem">{{ product.code }}</td>
                        <td style="min-width: 16rem">{{ product.name }}</td>
                        <td>
                            <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" style="width: 64px" class="rounded" />
                        </td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                        <td>{{ product.category }}</td>
                        <td>
                            <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" />
                        </td>
                        <td>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                        </td>
                        <td>
                            <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editProduct(product)" />
                            <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteProduct(product)" />
                        </td>
                    </tr>
                </ng-template>
            </p-table>
            <p-dialog [(visible)]="productDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true">
                <ng-template #content>
                    <div class="flex flex-col gap-6">
                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-4" *ngIf="product.image" />
                        <div>
                            <label for="name" class="block font-bold mb-3">Name</label>
                            <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus fluid />
                            <small class="text-red-500" *ngIf="submitted && !product.name">Name is required.</small>
                        </div>
                        <div>
                            <label for="description" class="block font-bold mb-3">Description</label>
                            <textarea id="description" pTextarea [(ngModel)]="product.description" required rows="3" cols="20" fluid></textarea>
                        </div>
                        <div>
                            <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                            <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" optionValue="label" placeholder="Select a Status" fluid />
                        </div>
                        <div>
                            <span class="block font-bold mb-4">Category</span>
                            <div class="grid grid-cols-12 gap-4">
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="product.category" />
                                    <label for="category1">Accessories</label>
                                </div>
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="product.category" />
                                    <label for="category2">Clothing</label>
                                </div>
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="product.category" />
                                    <label for="category3">Electronics</label>
                                </div>
                                <div class="flex items-center gap-2 col-span-6">
                                    <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="product.category" />
                                    <label for="category4">Fitness</label>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-6">
                                <label for="price" class="block font-bold mb-3">Price</label>
                                <p-inputnumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                            </div>
                            <div class="col-span-6">
                                <label for="quantity" class="block font-bold mb-3">Quantity</label>
                                <p-inputnumber id="quantity" [(ngModel)]="product.quantity" fluid />
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #footer>
                    <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
                    <p-button label="Save" icon="pi pi-check" (click)="saveProduct()" />
                </ng-template>
            </p-dialog>
            <p-confirmdialog [style]="{ width: '450px' }" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, ConfirmDialogModule, DialogModule, SelectModule, FileUploadModule, IconFieldModule, InputIconModule, InputNumberModule, RadioButtonModule, RatingModule, TableModule, TagModule, ToastModule, ToolbarModule, InputTextModule, FormsModule],
    providers: [ProductService]
})
export class TableProductsDemo implements OnInit {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
    productDialog: boolean = false;
    products!: Product[];
    product!: Product;
    selectedProducts!: Product[] | null;
    submitted: boolean = false;
    statuses!: any[];
    cols!: Column[];
    exportColumns!: ExportColumn[];

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products = data;
        });
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
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

    saveProduct() {
        this.submitted = true;
        
        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }
        
            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }
}
```
</details>

## radiobuttonselection-doc

Single selection can also be handled using radio buttons.

```html
<p-table [value]="products" [(selection)]="selectedProduct" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th style="width: 4rem"></th>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>
                <p-tableRadioButton [value]="product" />
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [(selection)]="selectedProduct" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th style="width: 4rem"></th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>
                            <p-tableRadioButton [value]="product" />
                        </td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableRadiobuttonselectionDemo implements OnInit {
    products!: Product[];
    selectedProduct!: Product;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## removablesort-doc

The removable sort can be implemented using the customSort property.

```html
<p-table #dt [value]="products" (sortFunction)="customSort($event)" [customSort]="true">
    <ng-template #header>
        <tr>
            <th pSortableColumn="code">
                <div class="flex items-center gap-2">
                    Code
                    <p-sortIcon field="code" />
                </div>
            </th>
            <th pSortableColumn="name">
                <div class="flex items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                </div>
            </th>
            <th pSortableColumn="category">
                <div class="flex items-center gap-2">
                    Category
                    <p-sortIcon field="category" />
                </div>
            </th>
            <th pSortableColumn="quantity">
                <div class="flex items-center gap-2">
                    Quantity
                    <p-sortIcon field="quantity" />
                </div>
            </th>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { SortEvent } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table #dt [value]="products" (sortFunction)="customSort($event)" [customSort]="true">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="code">
                            <div class="flex items-center gap-2">
                                Code
                                <p-sortIcon field="code" />
                            </div>
                        </th>
                        <th pSortableColumn="name">
                            <div class="flex items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                            </div>
                        </th>
                        <th pSortableColumn="category">
                            <div class="flex items-center gap-2">
                                Category
                                <p-sortIcon field="category" />
                            </div>
                        </th>
                        <th pSortableColumn="quantity">
                            <div class="flex items-center gap-2">
                                Quantity
                                <p-sortIcon field="quantity" />
                            </div>
                        </th>
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableRemovablesortDemo implements OnInit {
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
}
```
</details>

## Reorder

Order of the columns and rows can be changed using drag and drop. Column reordering is configured by adding reorderableColumns property. Similarly, adding reorderableRows property enables draggable rows. For the drag handle a column needs to have rowReorder property and onRowReorder callback is required to control the state of the rows after reorder completes.

```html
<p-table [value]="products" [columns]="cols" [reorderableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header let-columns>
        <tr>
            <th style="width:3rem"></th>
            <th *ngFor="let col of columns" pReorderableColumn>
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowData let-columns="columns" let-index="rowIndex">
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

interface Column {
    field: string;
    header: string;
}

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [columns]="cols" [reorderableColumns]="true" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header let-columns>
                    <tr>
                        <th style="width:3rem"></th>
                        <th *ngFor="let col of columns" pReorderableColumn>
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns" let-index="rowIndex">
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
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableReorderDemo implements OnInit {
    products!: Product[];
    cols!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }
}
```
</details>

## rowedit-doc

Row editing toggles the visibility of all the editors in the row at once and provides additional options to save and cancel editing. Row editing functionality is enabled by setting the editMode to "row" on table, defining a dataKey to uniquely identify a row, adding pEditableRow directive to the editable rows and defining the UI Controls with pInitEditableRow , pSaveEditableRow and pCancelEditableRow directives respectively. Save and Cancel functionality implementation is left to the page author to provide more control over the editing business logic. Example below utilizes a simple implementation where a row is cloned when editing is initialized and is saved or restored depending on the result of the editing. An implicit variable called "editing" is passed to the body template so you may come up with your own UI controls that implement editing based on your own requirements such as adding validations and styling. Note that pSaveEditableRow only switches the row to back view mode when there are no validation errors. Moreover, you may use setting pEditableRowDisabled property as true to disable editing for that particular row and in case you need to display rows in edit mode by default, use the editingRowKeys property which is a map whose key is the dataKey of the record where the value is any arbitrary number greater than zero.

```html
<p-toast />
<p-table [value]="products" dataKey="id" editMode="row" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th style="width:22%">Code</th>
            <th style="width:22%">Name</th>
            <th style="width:22%">Inventory Status</th>
            <th style="width:22%">Price</th>
            <th style="width:12%"></th>
        </tr>
    </ng-template>
    <ng-template #body let-product let-editing="editing" let-ri="rowIndex">
        <tr [pEditableRow]="product">
            <td>
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText type="text" [(ngModel)]="product.code" />
                    </ng-template>
                    <ng-template #output>
                        {{ product.code }}
                    </ng-template>
                </p-cellEditor>
            </td>
            <td>
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText type="text" [(ngModel)]="product.name" required />
                    </ng-template>
                    <ng-template #output>
                        {{ product.name }}
                    </ng-template>
                </p-cellEditor>
            </td>
            <td>
                <p-cellEditor>
                    <ng-template #input>
                        <p-select [options]="statuses" appendTo="body" [(ngModel)]="product.inventoryStatus" [style]="{ width: '100%' }" />
                    </ng-template>
                    <ng-template #output>
                        <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                    </ng-template>
                </p-cellEditor>
            </td>
            <td>
                <p-cellEditor>
                    <ng-template #input>
                        <input pInputText type="text" [(ngModel)]="product.price" />
                    </ng-template>
                    <ng-template #output>
                        {{ product.price | currency: 'USD' }}
                    </ng-template>
                </p-cellEditor>
            </td>
            <td>
                <div class="flex items-center justify-center gap-2">
                    <button *ngIf="!editing" pButton pRipple type="button" pInitEditableRow icon="pi pi-pencil" (click)="onRowEditInit(product)" text rounded severity="secondary"></button>
                    <button *ngIf="editing" pButton pRipple type="button" pSaveEditableRow icon="pi pi-check" (click)="onRowEditSave(product)" text rounded severity="secondary"></button>
                    <button *ngIf="editing" pButton pRipple type="button" pCancelEditableRow icon="pi pi-times" (click)="onRowEditCancel(product, ri)" text rounded severity="secondary"></button>
                </div>
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ProductService } from '@/service/productservice';
import { SelectItem, MessageService } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-toast />
            <p-table [value]="products" dataKey="id" editMode="row" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th style="width:22%">Code</th>
                        <th style="width:22%">Name</th>
                        <th style="width:22%">Inventory Status</th>
                        <th style="width:22%">Price</th>
                        <th style="width:12%"></th>
                    </tr>
                </ng-template>
                <ng-template #body let-product let-editing="editing" let-ri="rowIndex">
                    <tr [pEditableRow]="product">
                        <td>
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText type="text" [(ngModel)]="product.code" />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.code }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td>
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText type="text" [(ngModel)]="product.name" required />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.name }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td>
                            <p-cellEditor>
                                <ng-template #input>
                                    <p-select [options]="statuses" appendTo="body" [(ngModel)]="product.inventoryStatus" [style]="{ width: '100%' }" />
                                </ng-template>
                                <ng-template #output>
                                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td>
                            <p-cellEditor>
                                <ng-template #input>
                                    <input pInputText type="text" [(ngModel)]="product.price" />
                                </ng-template>
                                <ng-template #output>
                                    {{ product.price | currency: 'USD' }}
                                </ng-template>
                            </p-cellEditor>
                        </td>
                        <td>
                            <div class="flex items-center justify-center gap-2">
                                <button *ngIf="!editing" pButton pRipple type="button" pInitEditableRow icon="pi pi-pencil" (click)="onRowEditInit(product)" text rounded severity="secondary"></button>
                                <button *ngIf="editing" pButton pRipple type="button" pSaveEditableRow icon="pi pi-check" (click)="onRowEditSave(product)" text rounded severity="secondary"></button>
                                <button *ngIf="editing" pButton pRipple type="button" pCancelEditableRow icon="pi pi-times" (click)="onRowEditCancel(product, ri)" text rounded severity="secondary"></button>
                            </div>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [SelectModule, TableModule, TagModule, ToastModule, ButtonModule, InputTextModule, RippleModule, FormsModule],
    providers: [ProductService]
})
export class TableRoweditDemo implements OnInit {
    products!: Product[];
    statuses!: SelectItem[];

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.statuses = [
            { label: 'In Stock', value: 'INSTOCK' },
            { label: 'Low Stock', value: 'LOWSTOCK' },
            { label: 'Out of Stock', value: 'OUTOFSTOCK' }
        ];
    }

    onRowEditInit(product: Product) {
        this.clonedProducts[product.id as string] = { ...product };
    }

    onRowEditSave(product: Product) {
        if (product.price > 0) {
            delete this.clonedProducts[product.id as string];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        }
    }

    onRowEditCancel(product: Product, index: number) {
        this.products[index] = this.clonedProducts[product.id as string];
        delete this.clonedProducts[product.id as string];
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
}
```
</details>

## rowexpansion-doc

Row expansion allows displaying detailed content for a particular row. To use this feature, define a dataKey , add a template named expandedrow and use the pRowToggler directive on an element as the target to toggle an expansion. This enables providing your custom UI such as buttons, links and so on. Example below uses an anchor with an icon as a toggler. Setting pRowTogglerDisabled as true disables the toggle event for the element.

```html
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
                <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" />
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ProductService } from '@/service/productservice';
import { MessageService } from 'primeng/api';
import { Product } from '@/domain/product';
import { Customer } from '@/domain/customer';

@Component({
    template: `
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
                            <p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" />
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
    `,
    standalone: true,
    imports: [ButtonModule, RatingModule, TableModule, TagModule, ToastModule, RippleModule, FormsModule],
    providers: [ProductService]
})
export class TableRowexpansionDemo implements OnInit {
    products!: Product[];
    expandedRows: any = {};

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then((data) => {
            this.products = data;
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

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({
            severity: 'success',
            summary: 'Product Collapsed',
            detail: event.data.name,
            life: 3000
        });
    }
}
```
</details>

## rowspangrouping-doc

When rowGroupMode is configured to be rowspan , the grouping column spans multiple rows.

```html
<p-table [value]="customers" rowGroupMode="rowspan" groupRowsBy="representative.name" sortField="representative.name" sortMode="single" [tableStyle]="{ 'min-width': '75rem' }">
    <ng-template #header>
        <tr>
            <th style="width:3rem">#</th>
            <th>Representative</th>
            <th>Name</th>
            <th>Country</th>
            <th>Company</th>
            <th>Status</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer let-rowIndex="rowIndex" let-rowgroup="rowgroup" let-rowspan="rowspan">
        <tr>
            <td>{{ rowIndex }}</td>
            <td *ngIf="rowgroup" [attr.rowspan]="rowspan">
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" />
                    <span>{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                {{ customer.company }}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" rowGroupMode="rowspan" groupRowsBy="representative.name" sortField="representative.name" sortMode="single" [tableStyle]="{ 'min-width': '75rem' }">
                <ng-template #header>
                    <tr>
                        <th style="width:3rem">#</th>
                        <th>Representative</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Company</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer let-rowIndex="rowIndex" let-rowgroup="rowgroup" let-rowspan="rowspan">
                    <tr>
                        <td>{{ rowIndex }}</td>
                        <td *ngIf="rowgroup" [attr.rowspan]="rowspan">
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" />
                                <span>{{ customer.representative.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span>{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.company }}
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, TagModule],
    providers: [CustomerService]
})
export class TableRowspangroupingDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;
        
        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }
        
        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
        
            case 'qualified':
                return 'success';
        
            case 'new':
                return 'info';
        
            case 'negotiation':
                return 'warn';
        
            case 'renewal':
                return null;
        }
    }
}
```
</details>

## selectionevents-doc

Table provides onRowSelect and onRowUnselect events to listen selection events.

```html
<p-toast />
<p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" dataKey="code" (onRowSelect)="onRowSelect($event)" (onRowUnselect)="onRowUnselect($event)" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr [pSelectableRow]="product">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '@/service/productservice';
import { MessageService } from 'primeng/api';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-toast />
            <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" dataKey="code" (onRowSelect)="onRowSelect($event)" (onRowUnselect)="onRowUnselect($event)" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr [pSelectableRow]="product">
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, ToastModule],
    providers: [ProductService]
})
export class TableSelectioneventsDemo implements OnInit {
    products!: Product[];
    selectedProduct!: Product;

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }

    onRowSelect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
    }

    onRowUnselect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
    }
}
```
</details>

## singlecolumnsort-doc

A column can be made sortable by adding the pSortableColumn directive whose value is the field to sort against and a sort indicator via p-sortIcon component. For dynamic columns, setting pSortableColumnDisabled property as true disables sorting for that particular column. Default sorting is executed on a single column, in order to enable multiple field sorting, set sortMode property to "multiple" and use metakey when clicking on another column.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template #header>
        <tr>
            <th pSortableColumn="code" style="width:20%">
                <div class="flex items-center gap-2">
                    Code
                    <p-sortIcon field="code" />
                </div>
            </th>
            <th pSortableColumn="name" style="width:20%">
                <div class="flex items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                </div>
            </th>
            <th pSortableColumn="category" style="width:20%">
                <div class="flex items-center gap-2">
                    Category
                    <p-sortIcon field="category" />
                </div>
            </th>
            <th pSortableColumn="quantity" style="width:20%">
                <div class="flex items-center gap-2">
                    Quantity
                    <p-sortIcon field="quantity" />
                </div>
            </th>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="code" style="width:20%">
                            <div class="flex items-center gap-2">
                                Code
                                <p-sortIcon field="code" />
                            </div>
                        </th>
                        <th pSortableColumn="name" style="width:20%">
                            <div class="flex items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                            </div>
                        </th>
                        <th pSortableColumn="category" style="width:20%">
                            <div class="flex items-center gap-2">
                                Category
                                <p-sortIcon field="category" />
                            </div>
                        </th>
                        <th pSortableColumn="quantity" style="width:20%">
                            <div class="flex items-center gap-2">
                                Quantity
                                <p-sortIcon field="quantity" />
                            </div>
                        </th>
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableSinglecolumnsortDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## singleselection-doc

Single row selection is enabled by defining selectionMode as single along with a value binding using selection property. When available, it is suggested to provide a unique identifier of a row with dataKey to optimize performance. By default, metaKey press (e.g. ⌘ ) is necessary to unselect a row however this can be configured with disabling the metaKeySelection property. In touch enabled devices this option has no effect and behavior is same as setting it to false.

```html
<div class="flex justify-center items-center mb-6 gap-2">
    <p-toggleswitch [(ngModel)]="metaKey" inputId="input-metakey" />
    <label for="input-metakey">MetaKey</label>
</div>
<p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" [metaKeySelection]="metaKey" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr [pSelectableRow]="product">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <div class="flex justify-center items-center mb-6 gap-2">
                <p-toggleswitch [(ngModel)]="metaKey" inputId="input-metakey" />
                <label for="input-metakey">MetaKey</label>
            </div>
            <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" [metaKeySelection]="metaKey" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr [pSelectableRow]="product">
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, ToggleSwitchModule, FormsModule],
    providers: [ProductService]
})
export class TableSingleselectionDemo implements OnInit {
    products!: Product[];
    selectedProduct!: Product;
    metaKey: boolean = true;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## Size

In addition to a regular table, alternatives with alternative sizes are available.

```html
<div class="flex justify-center mb-4">
    <p-selectbutton [options]="sizes" [(ngModel)]="selectedSize" [multiple]="false" optionLabel="name" optionValue="value" />
</div>
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [size]="selectedSize">
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <div class="flex justify-center mb-4">
                <p-selectbutton [options]="sizes" [(ngModel)]="selectedSize" [multiple]="false" optionLabel="name" optionValue="value" />
            </div>
            <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [size]="selectedSize">
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
        </div>
    `,
    standalone: true,
    imports: [SelectButtonModule, TableModule, FormsModule],
    providers: [ProductService]
})
export class TableSizeDemo implements OnInit {
    products!: Product[];
    sizes!: any[];
    selectedSize: any = undefined;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.sizes = [
            { name: 'Small', value: 'small' },
            { name: 'Normal', value: undefined },
            { name: 'Large', value: 'large' }
        ];
    }
}
```
</details>

## Stateful

Stateful table allows keeping the state such as page, sort and filtering either at local storage or session storage so that when the page is visited again, table would render the data using the last settings. Change the state of the table e.g paginate, navigate away and then return to this table again to test this feature, the setting is set as session with the stateStorage property so that Table retains the state until the browser is closed. Other alternative is local referring to localStorage for an extended lifetime.

```html
<p-table
    #dt1
    [value]="customers"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    selectionMode="single"
    [(selection)]="selectedCustomers"
    dataKey="id"
    [tableStyle]="{ 'min-width': '50rem' }"
    [rows]="5"
    [paginator]="true"
    stateStorage="session"
    stateKey="statedemo-session"
>
    <ng-template #caption>
        <p-iconfield iconPosition="left">
            <p-inputicon>
                <i class="pi pi-search"></i>
            </p-inputicon>
            <input pInputText type="text" [value]="dt1.filters['global']?.value" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Global Search" />
        </p-iconfield>
    </ng-template>
    <ng-template #header>
        <tr>
            <th pSortableColumn="name" style="width:25%">
                <div class="flex items-center gap-2">
                    Name
                    <p-sortIcon field="name" />
                </div>
            </th>
            <th pSortableColumn="country.name" style="width:25%">
                <div class="flex items-center gap-2">
                    Country
                    <p-sortIcon field="country.name" />
                </div>
            </th>
            <th pSortableColumn="representative.name" style="width:25%">
                <div class="flex items-center gap-2">
                    Representative
                    <p-sortIcon field="representative.name" />
                </div>
            </th>
            <th pSortableColumn="status" style="width:25%">
                <div class="flex items-center gap-2">
                    Status
                    <p-sortIcon field="status" />
                </div>
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr [pSelectableRow]="customer">
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span class="ml-1 align-middle">{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="ml-1 align-middle">{{ customer.representative.name }}</span>
                </div>
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
        </tr>
    </ng-template>
    <ng-template #body let-customer>
        <tr [pSelectableRow]="customer">
            <td>
                {{ customer.name }}
            </td>
            <td>
                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                <span class="ml-1 align-middle">{{ customer.country.name }}</span>
            </td>
            <td>
                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                <span class="ml-1 align-middle">{{ customer.representative.name }}</span>
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
        </tr>
    </ng-template>
    <ng-template #emptymessage>
        <tr>
            <td colspan="4">No customers found.</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table
                #dt1
                [value]="customers"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                selectionMode="single"
                [(selection)]="selectedCustomers"
                dataKey="id"
                [tableStyle]="{ 'min-width': '50rem' }"
                [rows]="5"
                [paginator]="true"
                stateStorage="session"
                stateKey="statedemo-session"
            >
                <ng-template #caption>
                    <p-iconfield iconPosition="left">
                        <p-inputicon>
                            <i class="pi pi-search"></i>
                        </p-inputicon>
                        <input pInputText type="text" [value]="dt1.filters['global']?.value" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Global Search" />
                    </p-iconfield>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="name" style="width:25%">
                            <div class="flex items-center gap-2">
                                Name
                                <p-sortIcon field="name" />
                            </div>
                        </th>
                        <th pSortableColumn="country.name" style="width:25%">
                            <div class="flex items-center gap-2">
                                Country
                                <p-sortIcon field="country.name" />
                            </div>
                        </th>
                        <th pSortableColumn="representative.name" style="width:25%">
                            <div class="flex items-center gap-2">
                                Representative
                                <p-sortIcon field="representative.name" />
                            </div>
                        </th>
                        <th pSortableColumn="status" style="width:25%">
                            <div class="flex items-center gap-2">
                                Status
                                <p-sortIcon field="status" />
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr [pSelectableRow]="customer">
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span class="ml-1 align-middle">{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span class="ml-1 align-middle">{{ customer.representative.name }}</span>
                            </div>
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                    </tr>
                </ng-template>
                <ng-template #body let-customer>
                    <tr [pSelectableRow]="customer">
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                            <span class="ml-1 align-middle">{{ customer.country.name }}</span>
                        </td>
                        <td>
                            <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                            <span class="ml-1 align-middle">{{ customer.representative.name }}</span>
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="4">No customers found.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [IconFieldModule, InputIconModule, TableModule, TagModule, InputTextModule],
    providers: [CustomerService]
})
export class TableStatefulDemo implements OnInit {
    customers!: Customer[];
    selectedCustomers!: Customer;

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersSmall().then((data) => {
            this.customers = data;
        });
    }
}
```
</details>

## Striped Rows

Alternating rows are displayed when stripedRows property is present.

```html
<p-table [value]="products" stripedRows [tableStyle]="{ 'min-width': '50rem' }">
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" stripedRows [tableStyle]="{ 'min-width': '50rem' }">
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
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [ProductService]
})
export class TableStripedDemo implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
    }
}
```
</details>

## style-doc

Certain rows or cells can easily be styled based on conditions.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
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

}
```
</details>

## styling-doc

```html
<div class="doc-tablewrapper">
    <table class="doc-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Element</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>p-datatable</td>
                <td>Container element.</td>
            </tr>
            <tr>
                <td>p-datatable-header</td>
                <td>Header section.</td>
            </tr>
            <tr>
                <td>p-datatable-footer</td>
                <td>Footer section.</td>
            </tr>
            <tr>
                <td>p-sortable-column</td>
                <td>Sortable column header.</td>
            </tr>
            <tr>
                <td>p-editable-column</td>
                <td>Editable column cell.</td>
            </tr>
            <tr>
                <td>p-datatable-thead</td>
                <td>Thead element of header columns.</td>
            </tr>
            <tr>
                <td>p-datatable-tbody</td>
                <td>Tbody element of body rows.</td>
            </tr>
            <tr>
                <td>p-datatable-tfoot</td>
                <td>Tfoot element of footer columns.</td>
            </tr>
            <tr>
                <td>p-datatable-scrollable</td>
                <td>Container element when scrolling is enabled.</td>
            </tr>
            <tr>
                <td>p-datatable-resizable</td>
                <td>Container element when column resizing is enabled.</td>
            </tr>
            <tr>
                <td>p-datatable-resizable-fit</td>
                <td>Container element when column resizing is enabled and set to fit mode.</td>
            </tr>
            <tr>
                <td>p-column-resizer-helper</td>
                <td>Vertical resizer indicator bar.</td>
            </tr>
            <tr>
                <td>p-datatable-reorderablerow-handle</td>
                <td>Handle element of a reorderable row.</td>
            </tr>
            <tr>
                <td>p-datatable-reorder-indicator-up</td>
                <td>Up indicator to display during column reordering.</td>
            </tr>
            <tr>
                <td>p-datatable-reorder-indicator-up</td>
                <td>Down indicator to display during column reordering.</td>
            </tr>
            <tr>
                <td>p-datatable-loading-overlay</td>
                <td>Overlay to display when table is loading.</td>
            </tr>
            <tr>
                <td>p-datatable-loading-icon</td>
                <td>Icon to display when table is loading.</td>
            </tr>
        </tbody>
    </table>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-datatable</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-header</td>
                        <td>Header section.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-footer</td>
                        <td>Footer section.</td>
                    </tr>
                    <tr>
                        <td>p-sortable-column</td>
                        <td>Sortable column header.</td>
                    </tr>
                    <tr>
                        <td>p-editable-column</td>
                        <td>Editable column cell.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-thead</td>
                        <td>Thead element of header columns.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-tbody</td>
                        <td>Tbody element of body rows.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-tfoot</td>
                        <td>Tfoot element of footer columns.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-scrollable</td>
                        <td>Container element when scrolling is enabled.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-resizable</td>
                        <td>Container element when column resizing is enabled.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-resizable-fit</td>
                        <td>Container element when column resizing is enabled and set to fit mode.</td>
                    </tr>
                    <tr>
                        <td>p-column-resizer-helper</td>
                        <td>Vertical resizer indicator bar.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-reorderablerow-handle</td>
                        <td>Handle element of a reorderable row.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-reorder-indicator-up</td>
                        <td>Up indicator to display during column reordering.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-reorder-indicator-up</td>
                        <td>Down indicator to display during column reordering.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-loading-overlay</td>
                        <td>Overlay to display when table is loading.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-loading-icon</td>
                        <td>Icon to display when table is loading.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    standalone: true,
    imports: []
})
export class TableStylingDemo {}
```
</details>

## subheadergrouping-doc

Rows are grouped with the groupRowsBy property. When rowGroupMode is set as subheader , a header and footer can be displayed for each group. The content of a group header is provided with groupheader and footer with groupfooter templates.

```html
<p-table [value]="customers" sortField="representative.name" sortMode="single" [scrollable]="true" scrollHeight="400px" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Company</th>
            <th>Status</th>
            <th>Date</th>
        </tr>
    </ng-template>
    <ng-template #groupheader let-customer>
        <tr pRowGroupHeader>
            <td colspan="5">
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="font-bold">{{ customer.representative.name }}</span>
                </div>
            </td>
        </tr>
    </ng-template>
    <ng-template #groupfooter let-customer>
        <tr>
            <td colspan="5">
                <div class="text-right font-bold pe-12">Total Customers: {{ calculateCustomerTotal(customer.representative.name) }}</div>
            </td>
        </tr>
    </ng-template>
    <ng-template #body let-customer let-rowIndex="rowIndex">
        <tr>
            <td>
                {{ customer.name }}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                {{ customer.company }}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                {{ customer.date }}
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" sortField="representative.name" sortMode="single" [scrollable]="true" scrollHeight="400px" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </ng-template>
                <ng-template #groupheader let-customer>
                    <tr pRowGroupHeader>
                        <td colspan="5">
                            <div class="flex items-center gap-2">
                                <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                <span class="font-bold">{{ customer.representative.name }}</span>
                            </div>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #groupfooter let-customer>
                    <tr>
                        <td colspan="5">
                            <div class="text-right font-bold pe-12">Total Customers: {{ calculateCustomerTotal(customer.representative.name) }}</div>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #body let-customer let-rowIndex="rowIndex">
                    <tr>
                        <td>
                            {{ customer.name }}
                        </td>
                        <td>
                            <div class="flex items-center gap-2">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                <span>{{ customer.country.name }}</span>
                            </div>
                        </td>
                        <td>
                            {{ customer.company }}
                        </td>
                        <td>
                            <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                        </td>
                        <td>
                            {{ customer.date }}
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule, TagModule],
    providers: [CustomerService]
})
export class TableSubheadergroupingDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;
        
        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }
        
        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
        
            case 'qualified':
                return 'success';
        
            case 'new':
                return 'info';
        
            case 'negotiation':
                return 'warn';
        
            case 'renewal':
                return null;
        }
    }
}
```
</details>

## Template

Custom content at header , body and footer sections are supported via templating.

```html
<p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template #caption>
        <div class="flex items-center justify-between">
            <span class="text-xl font-bold">Products</span>
            <p-button icon="pi pi-refresh" rounded raised />
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Reviews</th>
            <th>Status</th>
        </tr>
    </ng-template>
    <ng-template #body let-product>
        <tr>
            <td>{{ product.name }}</td>
            <td>
                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" class="w-24 rounded" />
            </td>
            <td>{{ product.price | currency: 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td><p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" /></td>
            <td>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
            </td>
        </tr>
    </ng-template>
    <ng-template #footer>
        <tr>
            <td colspan="6">In total there are {{ products ? products.length : 0 }} products.</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

interface Column {
    field: string;
    header: string;
}

@Component({
    template: `
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
                <ng-template #caption>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold">Products</span>
                        <p-button icon="pi pi-refresh" rounded raised />
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Reviews</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.name }}</td>
                        <td>
                            <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" class="w-24 rounded" />
                        </td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                        <td>{{ product.category }}</td>
                        <td><p-rating [(ngModel)]="product.rating" [readonly]="true" [cancel]="false" /></td>
                        <td>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                        </td>
                    </tr>
                </ng-template>
                <ng-template #footer>
                    <tr>
                        <td colspan="6">In total there are {{ products ? products.length : 0 }} products.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, RatingModule, TableModule, TagModule, FormsModule],
    providers: [ProductService]
})
export class TableTemplateDemo implements OnInit {
    products!: Product[];
    cols!: Column[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
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
}
```
</details>

## verticalscroll-doc

```html
<p-table [value]="customers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Company</th>
            <th>Representative</th>
        </tr>
    </ng-template>
    <ng-template #body let-customer let-index="index">
        <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.representative.name }}</td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerService } from '@/service/customerservice';
import { Customer, Representative, Country } from '@/domain/customer';

@Component({
    template: `
        <div class="card">
            <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template #header>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Company</th>
                        <th>Representative</th>
                    </tr>
                </ng-template>
                <ng-template #body let-customer let-index="index">
                    <tr>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.country.name }}</td>
                        <td>{{ customer.company }}</td>
                        <td>{{ customer.representative.name }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [CustomerService]
})
export class TableVerticalscrollDemo implements OnInit {
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }
}
```
</details>

## virtualscroll-doc

Virtual Scrolling is an efficient way to render large amount data. Usage is similar to regular scrolling with the addition of virtualScrollerOptions property to define a fixed itemSize . Internally, VirtualScroller component is utilized so refer to the API of VirtualScroller for more information about the available options. In this example, 10000 preloaded records are rendered by the Table.

```html
<p-table [columns]="cols" [value]="cars" [scrollable]="true" scrollHeight="400px" [virtualScroll]="true" [virtualScrollItemSize]="46">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" style="width: 20%;">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowData let-rowIndex="rowIndex" let-columns="columns">
        <tr style="height:46px">
            <td *ngFor="let col of columns">
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CarService } from '@/service/carservice';
import { Car } from '@/domain/car';

interface Column {
    field: string;
    header: string;
}

@Component({
    template: `
        <div class="card">
            <p-table [columns]="cols" [value]="cars" [scrollable]="true" scrollHeight="400px" [virtualScroll]="true" [virtualScrollItemSize]="46">
                <ng-template #header let-columns>
                    <tr>
                        <th *ngFor="let col of columns" style="width: 20%;">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-rowIndex="rowIndex" let-columns="columns">
                    <tr style="height:46px">
                        <td *ngFor="let col of columns">
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [TableModule],
    providers: [CarService]
})
export class TableVirtualscrollDemo implements OnInit {
    cars!: Car[];
    virtualCars!: Car[];
    cols!: Column[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
        this.virtualCars = Array.from({ length: 10000 });
    }
}
```
</details>

## virtualscrolllazy-doc

VirtualScroller is a performance-approach to handle huge data efficiently. Setting virtualScroll property as true and providing a virtualScrollItemSize in pixels would be enough to enable this functionality. It is also suggested to use the same virtualScrollItemSize value on the tr element inside the body template.

```html
<p-table [columns]="cols" [value]="virtualCars" [scrollable]="true" scrollHeight="400px" [rows]="100" [virtualScroll]="true" [virtualScrollItemSize]="46" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns" style="width: 20%;">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowData let-columns="columns">
        <tr style="height:46px">
            <td *ngFor="let col of columns">
                {{ rowData[col.field] }}
            </td>
        </tr>
    </ng-template>
    <ng-template #loadingbody let-columns="columns">
        <tr style="height:46px">
            <td *ngFor="let col of columns; let even = even">
                <p-skeleton [ngStyle]="{ width: even ? (col.field === 'year' ? '30%' : '40%') : '60%' }" />
            </td>
        </tr>
    </ng-template>
</p-table>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CarService } from '@/service/carservice';
import { TableLazyLoadEvent } from 'primeng/api';
import { Car } from '@/domain/car';

interface Column {
    field: string;
    header: string;
}

@Component({
    template: `
        <div class="card">
            <p-table [columns]="cols" [value]="virtualCars" [scrollable]="true" scrollHeight="400px" [rows]="100" [virtualScroll]="true" [virtualScrollItemSize]="46" [lazy]="true" (onLazyLoad)="loadCarsLazy($event)">
                <ng-template #header let-columns>
                    <tr>
                        <th *ngFor="let col of columns" style="width: 20%;">
                            {{ col.header }}
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr style="height:46px">
                        <td *ngFor="let col of columns">
                            {{ rowData[col.field] }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody let-columns="columns">
                    <tr style="height:46px">
                        <td *ngFor="let col of columns; let even = even">
                            <p-skeleton [ngStyle]="{ width: even ? (col.field === 'year' ? '30%' : '40%') : '60%' }" />
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    standalone: true,
    imports: [SkeletonModule, TableModule],
    providers: [CarService]
})
export class TableVirtualscrolllazyDemo implements OnInit {
    cars!: Car[];
    virtualCars!: Car[];
    cols!: Column[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.cars = Array.from({ length: 10000 }).map((_, i) => this.carService.generateCar(i + 1));
        this.virtualCars = Array.from({ length: 10000 });
    }

    loadCarsLazy(event: TableLazyLoadEvent) {
        //simulate remote connection with a timeout
        setTimeout(
            () => {
                //load data of required page
                let loadedCars = this.cars.slice(event.first, event.first + event.rows);
        
                //populate page of virtual cars
                Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);
        
                //trigger change detection
                event.forceUpdate();
            },
            Math.random() * 1000 + 250
        );
    }
}
```
</details>

## Table

Table displays data in tabular format.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TablePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| frozenColumns | any[] | - | An array of objects to represent dynamic columns that are frozen. |
| frozenValue | any[] | - | An array of objects to display as frozen. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| tableStyle | { [klass: string]: any } | - | Inline style of the table. |
| tableStyleClass | string | - | Style class of the table. |
| paginator | boolean | false | When specified as true, enables the pagination. |
| pageLinks | number | 5 | Number of page links to display in paginator. |
| rowsPerPageOptions | any[] | - | Array of integer/object values to display inside rows per page dropdown of paginator |
| alwaysShowPaginator | boolean | true | Whether to show it even there is only one page. |
| paginatorPosition | "top" \| "bottom" \| "both" | bottom | Position of the paginator, options are "top", "bottom" or "both". |
| paginatorStyleClass | string | - | Custom style class for paginator |
| paginatorDropdownAppendTo | any | - | Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| paginatorDropdownScrollHeight | string | 200px | Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| currentPageReportTemplate | string | {currentPage} of {totalPages} | Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords} |
| showCurrentPageReport | boolean | false | Whether to display current page report. |
| showJumpToPageDropdown | boolean | false | Whether to display a dropdown to navigate to any page. |
| showJumpToPageInput | boolean | false | Whether to display a input to navigate to any page. |
| showFirstLastIcon | boolean | true | When enabled, icons are displayed on paginator to go first and last page. |
| showPageLinks | boolean | true | Whether to show page links. |
| defaultSortOrder | number | 1 | Sort order to use when an unsorted column gets sorted by user interaction. |
| sortMode | "multiple" \| "single" | single | Defines whether sorting works on single column or on multiple columns. |
| resetPageOnSort | boolean | true | When true, resets paginator to first page after sorting. Available only when sortMode is set to single. |
| selectionMode | "multiple" \| "single" | - | Specifies the selection mode, valid values are "single" and "multiple". |
| selectionPageOnly | boolean | false | When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page. |
| contextMenuSelection | any | - | Selected row with a context menu. |
| contextMenuSelectionMode | string | separate | Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property. |
| dataKey | string | - | A property to uniquely identify a record in data. |
| metaKeySelection | boolean | false | Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically. |
| rowSelectable | (row: { data: any; index: number }) => boolean | - | Defines if the row is selectable. |
| rowTrackBy | Function | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| lazyLoadOnInit | boolean | true | Whether to call lazy loading on initialization. |
| compareSelectionBy | "equals" \| "deepEquals" | deepEquals | Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields. |
| csvSeparator | string | , | Character to use as the csv separator. |
| exportFilename | string | download | Name of the exported file. |
| filters | { [s: string]: FilterMetadata \| FilterMetadata[] } | {} | An array of FilterMetadata objects to provide external filters. |
| globalFilterFields | string[] | - | An array of fields as string to use in global filtering. |
| filterDelay | number | 300 | Delay in milliseconds before filtering the data. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| expandedRowKeys | { [s: string]: boolean } | {} | Map instance to keep the expanded rows where key of the map is the data key of the row. |
| editingRowKeys | { [s: string]: boolean } | {} | Map instance to keep the rows being edited where key of the map is the data key of the row. |
| rowExpandMode | "multiple" \| "single" | multiple | Whether multiple rows can be expanded at any time. Valid values are "multiple" and "single". |
| scrollable | boolean | false | Enables scrollable tables. |
| rowGroupMode | "subheader" \| "rowspan" | - | Type of the row grouping, valid values are "subheader" and "rowspan". |
| scrollHeight | string | - | Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of a row to use in calculations of virtual scrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| virtualScrollDelay | number | 250 | Threshold in milliseconds to delay lazy loading during scrolling. |
| frozenWidth | string | - | Width of the frozen columns container. |
| contextMenu | any | - | Local ng-template varilable of a ContextMenu. |
| resizableColumns | boolean | false | When enabled, columns can be resized using drag and drop. |
| columnResizeMode | string | fit | Defines whether the overall table width should change on column resize, valid values are "fit" and "expand". |
| reorderableColumns | boolean | false | When enabled, columns can be reordered using drag and drop. |
| loading | boolean | false | Displays a loader to indicate data load is in progress. |
| loadingIcon | string | - | The icon to show while indicating data load is in progress. |
| showLoader | boolean | true | Whether to show the loading mask when loading property is true. |
| rowHover | boolean | false | Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work. |
| customSort | boolean | false | Whether to use the default sorting or a custom one using sortFunction. |
| showInitialSortBadge | boolean | true | Whether to use the initial sort badge or not. |
| exportFunction | Function | - | Export function. |
| exportHeader | string | - | Custom export header of the column to be exported as CSV. |
| stateKey | string | - | Unique identifier of a stateful table to use in state storage. |
| stateStorage | "session" \| "local" | session | Defines where a stateful table keeps its state, valid values are "session" for sessionStorage and "local" for localStorage. |
| editMode | "row" \| "cell" | cell | Defines the editing mode, valid values are "cell" and "row". |
| groupRowsBy | any | - | Field name to use in row grouping. |
| size | "small" \| "large" | - | Defines the size of the table. |
| showGridlines | boolean | false | Whether to show grid lines between cells. |
| stripedRows | boolean | false | Whether to display rows with alternating colors. |
| groupRowsByOrder | number | 1 | Order to sort when default row grouping is enabled. |
| responsiveLayout | string | scroll | Defines the responsive mode, valid options are "stack" and "scroll". **(Deprecated)** |
| breakpoint | string | 960px | The breakpoint to define the maximum width boundary when using stack responsive layout. |
| paginatorLocale | string | - | Locale to be used in paginator formatting. |
| value | RowData[] | - | An array of objects to display. |
| columns | any[] | - | An array of objects to represent dynamic columns. |
| first | number | - | Index of the first row to be displayed. |
| rows | number | - | Number of rows to display per page. |
| totalRecords | number | 0 | Number of total records, defaults to length of value when not defined. |
| sortField | string | - | Name of the field to sort data by default. |
| sortOrder | number | - | Order to sort when default sorting is enabled. |
| multiSortMeta | SortMeta[] | - | An array of SortMeta objects to sort the data by default in multiple sort mode. |
| selection | any | - | Selected row in single mode or an array of values in multiple mode. |
| selectAll | boolean | - | Whether all data is selected. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| contextMenuSelectionChange | value: any | Callback to invoke on context menu selection change. |
| selectAllChange | event: TableSelectAllChangeEvent | Emits when the all of the items selected or unselected. |
| selectionChange | value: any | Callback to invoke on selection changed. |
| onRowSelect | event: TableRowSelectEvent<RowData | Callback to invoke when a row is selected. |
| onRowUnselect | event: TableRowUnSelectEvent<RowData | Callback to invoke when a row is unselected. |
| onPage | event: TablePageEvent | Callback to invoke when pagination occurs. |
| onSort | value: any | Callback to invoke when a column gets sorted. |
| onFilter | event: TableFilterEvent | Callback to invoke when data is filtered. |
| onLazyLoad | event: TableLazyLoadEvent | Callback to invoke when paging, sorting or filtering happens in lazy mode. |
| onRowExpand | event: TableRowExpandEvent<RowData | Callback to invoke when a row is expanded. |
| onRowCollapse | event: TableRowCollapseEvent | Callback to invoke when a row is collapsed. |
| onContextMenuSelect | event: TableContextMenuSelectEvent<RowData | Callback to invoke when a row is selected with right click. |
| onColResize | event: TableColResizeEvent | Callback to invoke when a column is resized. |
| onColReorder | event: TableColumnReorderEvent | Callback to invoke when a column is reordered. |
| onRowReorder | event: TableRowReorderEvent | Callback to invoke when a row is reordered. |
| onEditInit | event: TableEditInitEvent | Callback to invoke when a cell switches to edit mode. |
| onEditComplete | event: TableEditCompleteEvent | Callback to invoke when cell edit is completed. |
| onEditCancel | event: TableEditCancelEvent | Callback to invoke when cell edit is cancelled with escape key. |
| onHeaderCheckboxToggle | event: TableHeaderCheckboxToggleEvent | Callback to invoke when state of header checkbox changes. |
| sortFunction | value: any | A function to implement custom sorting, refer to sorting section for details. |
| firstChange | value: number | Callback to invoke on pagination. |
| rowsChange | value: number | Callback to invoke on rows change. |
| onStateSave | value: TableState | Callback to invoke table state is saved. |
| onStateRestore | value: TableState | Callback to invoke table state is restored. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| exportCSV | options: ExportCSVOptions | void | Data export method. |
| resetScrollTop |  | void | Resets scroll to top. |
| scrollToVirtualIndex | index: number | void | Scrolls to given index when using virtual scroll. |
| scrollTo | options: any | void | Scrolls to given index. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| filter | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter container element. |
| pcColumnFilterButton | ButtonPassThrough | Used to pass attributes to the column filter button component. |
| filterOverlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter overlay element. |
| filterConstraintList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the filter constraint list element. |
| filterConstraint | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the filter constraint element. |
| filterConstraintSeparator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the filter constraint separator element. |
| emtpyFilterLabel | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty filter label element. |
| filterOperator | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter operator element. |
| pcFilterOperatorDropdown | SelectPassThrough | Used to pass attributes to the filter operator dropdown component. |
| filterRuleList | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter rule list element. |
| filterRule | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter rule element. |
| pcFilterConstraintDropdown | SelectPassThrough | Used to pass attributes to the filter constraint dropdown component. |
| pcFilterRemoveRuleButton | ButtonPassThrough | Used to pass attributes to the filter remove rule button component. |
| pcAddRuleButtonLabel | ButtonPassThrough | Used to pass attributes to the add rule button label. |
| filterButtonBar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter button bar element. |
| pcFilterClearButton | ButtonPassThrough | Used to pass attributes to the filter clear button component. |
| pcFilterApplyButton | ButtonPassThrough | Used to pass attributes to the filter apply button component. |
| pcFilterInputText | InputTextPassThrough | Used to pass attributes to the filter input text component. |
| pcFilterInputNumber | InputNumberPassThrough | Used to pass attributes to the filter input number component. |
| pcFilterCheckbox | CheckboxPassThrough | Used to pass attributes to the filter checkbox component. |
| pcFilterDatePicker | DatePickerPassThrough | Used to pass attributes to the filter datepicker component. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-datatable | Class name of the root element |
| p-datatable-mask | Class name of the mask element |
| p-datatable-loading-icon | Class name of the loading icon element |
| p-datatable-header | Class name of the header element |
| p-datatable-paginator-[position] | Class name of the paginator element |
| p-datatable-table-container | Class name of the table container element |
| p-datatable-table | Class name of the table element |
| p-datatable-thead | Class name of the thead element |
| p-datatable-column-resizer | Class name of the column resizer element |
| p-datatable-column-header-content | Class name of the column header content element |
| p-datatable-column-title | Class name of the column title element |
| p-datatable-sort-icon | Class name of the sort icon element |
| p-datatable-sort-badge | Class name of the sort badge element |
| p-datatable-filter | Class name of the filter element |
| p-datatable-filter-element-container | Class name of the filter element container element |
| p-datatable-column-filter-button | Class name of the column filter button element |
| p-datatable-column-filter-clear-button | Class name of the column filter clear button element |
| p-datatable-filter-overlay | Class name of the filter overlay element |
| p-datatable-filter-constraint-list | Class name of the filter constraint list element |
| p-datatable-filter-constraint | Class name of the filter constraint element |
| p-datatable-filter-constraint-separator | Class name of the filter constraint separator element |
| p-datatable-filter-operator | Class name of the filter operator element |
| p-datatable-filter-operator-dropdown | Class name of the filter operator dropdown element |
| p-datatable-filter-rule-list | Class name of the filter rule list element |
| p-datatable-filter-rule | Class name of the filter rule element |
| p-datatable-filter-constraint-dropdown | Class name of the filter constraint dropdown element |
| p-datatable-filter-remove-rule-button | Class name of the filter remove rule button element |
| p-datatable-filter-add-rule-button | Class name of the filter add rule button element |
| p-datatable-filter-buttonbar | Class name of the filter buttonbar element |
| p-datatable-filter-clear-button | Class name of the filter clear button element |
| p-datatable-filter-apply-button | Class name of the filter apply button element |
| p-datatable-tbody | Class name of the tbody element |
| p-datatable-row-group-header | Class name of the row group header element |
| p-datatable-row-toggle-button | Class name of the row toggle button element |
| p-datatable-row-toggle-icon | Class name of the row toggle icon element |
| p-datatable-row-expansion | Class name of the row expansion element |
| p-datatable-row-group-footer | Class name of the row group footer element |
| p-datatable-empty-message | Class name of the empty message element |
| p-datatable-reorderable-row-handle | Class name of the reorderable row handle element |
| p-datatable-row-editor-init | Class name of the row editor init element |
| p-datatable-row-editor-save | Class name of the row editor save element |
| p-datatable-row-editor-cancel | Class name of the row editor cancel element |
| p-datatable-tfoot | Class name of the tfoot element |
| p-datatable-virtualscroller-spacer | Class name of the virtual scroller spacer element |
| p-datatable-footer | Class name of the footer element |
| p-datatable-column-resize-indicator | Class name of the column resize indicator element |
| p-datatable-row-reorder-indicator-up | Class name of the row reorder indicator up element |
| p-datatable-row-reorder-indicator-down | Class name of the row reorder indicator down element |
| p-datatable-sortable-column | Class name of the sortable column element |
| p-sortable-column-icon | Class name of the sortable column icon element |
| p-sortable-column-badge | Class name of the sortable column badge element |
| p-datatable-selectable-row | Class name of the selectable row element |
| p-datatable-resizable-column | Class name of the resizable column element |
| p-datatable-row-editor-cancel | Class name of the row editor cancel element |
| p-datatable-frozen-column | Class name of the frozen column element |
| p-datatable-contextmenu-row-selected | Class name of the contextmenu row selected element |

