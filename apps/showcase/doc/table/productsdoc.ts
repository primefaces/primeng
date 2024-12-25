import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

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
    selector: 'products-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>CRUD implementation example with a Dialog.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-toast />
                <p-toolbar styleClass="mb-6">
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
                                <p-inputicon styleClass="pi pi-search" />
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
                                Name
                                <p-sortIcon field="name" />
                            </th>
                            <th>Image</th>
                            <th pSortableColumn="price" style="min-width: 8rem">
                                Price
                                <p-sortIcon field="price" />
                            </th>
                            <th pSortableColumn="category" style="min-width:10rem">
                                Category
                                <p-sortIcon field="category" />
                            </th>
                            <th pSortableColumn="rating" style="min-width: 12rem">
                                Reviews
                                <p-sortIcon field="rating" />
                            </th>
                            <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                                Status
                                <p-sortIcon field="inventoryStatus" />
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
                    <ng-template #summary>
                        <div class="flex items-center justify-between">In total there are {{ products ? products.length : 0 }} products.</div>
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
                                <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" placeholder="Select a Status" fluid />
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

                <p-confirmDialog [style]="{ width: '450px' }" />
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-products-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService, ConfirmationService]
})
export class ProductsDoc {
    code: Code = {
        basic: `<p-toolbar styleClass="mb-6">
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
                <p-inputicon styleClass="pi pi-search" />
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
                Name
                <p-sortIcon field="name" />
            </th>
            <th>Image</th>
            <th pSortableColumn="price" style="min-width: 8rem">
                Price
                <p-sortIcon field="price" />
            </th>
            <th pSortableColumn="category" style="min-width:10rem">
                Category
                <p-sortIcon field="category" />
            </th>
            <th pSortableColumn="rating" style="min-width: 12rem">
                Reviews
                <p-sortIcon field="rating" />
            </th>
            <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                Status
                <p-sortIcon field="inventoryStatus" />
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
    <ng-template #summary>
        <div class="flex items-center justify-between">In total there are {{ products ? products.length : 0 }} products.</div>
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
                <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" placeholder="Select a Status" fluid />
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

<p-confirmDialog [style]="{ width: '450px' }" />`,
        html: `<div class="card">
    <p-toast />
    <p-toolbar styleClass="mb-6">
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
                    <p-inputicon styleClass="pi pi-search" />
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
                    Name
                    <p-sortIcon field="name" />
                </th>
                <th>Image</th>
                <th pSortableColumn="price" style="min-width: 8rem">
                    Price
                    <p-sortIcon field="price" />
                </th>
                <th pSortableColumn="category" style="min-width:10rem">
                    Category
                    <p-sortIcon field="category" />
                </th>
                <th pSortableColumn="rating" style="min-width: 12rem">
                    Reviews
                    <p-sortIcon field="rating" />
                </th>
                <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                    Status
                    <p-sortIcon field="inventoryStatus" />
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
        <ng-template #summary>
            <div class="flex items-center justify-between">In total there are {{ products ? products.length : 0 }} products.</div>
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
                    <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" placeholder="Select a Status" fluid />
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

    <p-confirmDialog [style]="{ width: '450px' }" />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';

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
    selector: 'table-products-demo',
    templateUrl: 'table-products-demo.html',
    standalone: true,
    imports: [TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService, ProductService],
    styles: [
        \`:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }\`
    ]
})
export class TableProductsDemo implements OnInit{
    productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products = data;
            this.cd.markForCheck();
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
                return 'warning';
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
        scss: `
:host ::ng-deep .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;
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

    productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products = data;
            this.cd.markForCheck();
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
                return 'warning';
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
