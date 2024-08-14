import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

interface TableRowSelectEvent {
    originalEvent?: Event;
    data?: any;
    type?: string;
    index?: number;
}

@Component({
    selector: 'data-table-doc',
    template: `
        <app-docsectiontext>
            <p>An example that displays a DataTable inside a popup to select an item.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-3">
            <p-toast />
            <p-button (click)="op.toggle($event)" icon="pi pi-search" [label]="selectedProduct ? selectedProduct.name : 'Select a Product'" />
            <div *ngIf="selectedProduct" class="p-5 surface-card shadow-2 border-round">
                <div class="relative">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ selectedProduct.image }}" [alt]="selectedProduct.name" />
                </div>
                <div class="flex align-items-center justify-content-between mt-3 mb-2">
                    <span class="text-900 font-medium text-xl">{{ selectedProduct.name }}</span>
                    <span class="text-900 text-xl ml-3">{{ '$' + selectedProduct.price }}</span>
                </div>
                <span class="text-600">{{ selectedProduct.category }}</span>
            </div>
            <p-popover #op [style]="{ width: '450px' }" [showCloseIcon]="true">
                <ng-template pTemplate="content">
                    <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" (onRowSelect)="onRowSelect($event, op)" [paginator]="true" [rows]="5" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th pSortableColumn="name">Name<p-sortIcon field="name" /></th>
                                <th>Image</th>
                                <th pSortableColumn="price">Price <p-sortIcon field="price" /></th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-rowData let-product>
                            <tr [pSelectableRow]="rowData">
                                <td>{{ product.name }}</td>
                                <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-5rem shadow-2" /></td>
                                <td>{{ product.price }}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </ng-template>
            </p-popover>
        </div>
        <app-code [code]="code" selector="popover-data-table-demo" [extFiles]="extFiles"></app-code>
    `,
    providers: [MessageService]
})
export class DataTableDoc implements OnInit {
    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {}

    products: Product[] | undefined;

    selectedProduct: Product | undefined;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
            this.selectedProduct = products[0];
            this.cdr.markForCheck();
        });
    }

    onRowSelect(event: TableRowSelectEvent, op: Popover) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
        op.hide();
    }

    code: Code = {
        basic: `<p-toast />
<p-button 
    (click)="op.toggle($event)" 
    icon="pi pi-search" 
    [label]="selectedProduct ? selectedProduct.name : 'Select a Product'" />
<div *ngIf="selectedProduct" class="p-5 surface-card shadow-2 border-round">
    <div class="relative">
        <img 
            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ selectedProduct.image }}" 
            [alt]="selectedProduct.name" />
    </div>
    <div class="flex align-items-center justify-content-between mt-3 mb-2">
        <span class="text-900 font-medium text-xl">
            {{ selectedProduct.name }}
        </span>
        <span class="text-900 text-xl ml-3">
            {{ '$' + selectedProduct.price }}
        </span>
    </div>
    <span class="text-600">
        {{ selectedProduct.category }}
    </span>
</div>
<p-popover #op [style]="{ width: '450px' }" [showCloseIcon]="true">
    <ng-template pTemplate="content">
        <p-table 
            [value]="products" 
            selectionMode="single" 
            [(selection)]="selectedProduct" 
            (onRowSelect)="onRowSelect($event, op)" 
            [paginator]="true" 
            [rows]="5" 
            responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="name">
                            Name <p-sortIcon field="name" />
                        </th>
                        <th>Image</th>
                        <th pSortableColumn="price">
                            Price <p-sortIcon field="price" />
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-product>
                    <tr [pSelectableRow]="rowData">
                        <td>
                            {{ product.name }}
                        </td>
                        <td>
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" 
                                [alt]="product.image" 
                                class="w-5rem shadow-2" />
                        </td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
        </p-table>
    </ng-template>
</p-popover>`,

        html: `<div class="card flex flex-column align-items-center gap-3">
<p-toast />
<p-button 
    (click)="op.toggle($event)" 
    icon="pi pi-search" 
    [label]="selectedProduct ? selectedProduct.name : 'Select a Product'" />
<div *ngIf="selectedProduct" class="p-5 surface-card shadow-2 border-round">
    <div class="relative">
        <img 
            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ selectedProduct.image }}" 
            [alt]="selectedProduct.name" />
    </div>
    <div class="flex align-items-center justify-content-between mt-3 mb-2">
        <span class="text-900 font-medium text-xl">
            {{ selectedProduct.name }}
        </span>
        <span class="text-900 text-xl ml-3">
            {{ '$' + selectedProduct.price }}
        </span>
    </div>
    <span class="text-600">
        {{ selectedProduct.category }}
    </span>
</div>
<p-popover #op [style]="{ width: '450px' }" [showCloseIcon]="true">
    <ng-template pTemplate="content">
        <p-table 
            [value]="products" 
            selectionMode="single" 
            [(selection)]="selectedProduct" 
            (onRowSelect)="onRowSelect($event, op)" 
            [paginator]="true" 
            [rows]="5" 
            responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="name">
                            Name <p-sortIcon field="name" />
                        </th>
                        <th>Image</th>
                        <th pSortableColumn="price">
                            Price <p-sortIcon field="price" />
                        </th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-rowData let-product>
                    <tr [pSelectableRow]="rowData">
                        <td>
                            {{ product.name }}
                        </td>
                        <td>
                            <img 
                                src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" 
                                [alt]="product.image" 
                                class="w-5rem shadow-2" />
                        </td>
                        <td>{{ product.price }}</td>
                    </tr>
                </ng-template>
        </p-table>
    </ng-template>
</p-popover>
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface TableRowSelectEvent {
    originalEvent?: Event;
    data?: any;
    type?: string;
    index?: number;
}

@Component({
    selector: 'popover-data-table-demo',
    templateUrl: './popover-data-table-demo.html',
    standalone: true,
    imports: [PopoverModule, ToastModule, TableModule, ButtonModule],
    providers: [MessageService, ProductService]
})
export class PopoverDataTableDemo implements OnInit {

    constructor(private productService: ProductService, private messageService: MessageService, private cdr: ChangeDetectorRef) {}
    
    products: Product[] | undefined;

    selectedProduct: Product | undefined;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
            this.selectedProduct = products[0];
            this.cdr.markForCheck()
        });
    }

    onRowSelect(event: TableRowSelectEvent, op: Popover) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
        op.hide();
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
