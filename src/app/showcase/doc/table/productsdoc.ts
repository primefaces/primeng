import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'products-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>CRUD implementation example with a Dialog.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast></p-toast>
            <p-toolbar styleClass="mb-4 gap-2">
                <ng-template pTemplate="left">
                    <button pButton pRipple label="New" icon="pi pi-plus" class="p-button-success mr-2" (click)="openNew()"></button>
                    <button pButton pRipple [label]="Delete" icon="pi pi-trash" class="p-button-danger" (click)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length"></button>
                </ng-template>

                <ng-template pTemplate="right">
                    <p-fileUpload mode="basic" accept="image/*" [maxFileSize]="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block"></p-fileUpload>
                    <button pButton pRipple label="Export" icon="pi pi-upload" class="p-button-help"></button>
                </ng-template>
            </p-toolbar>

            <p-table
                #dt
                [value]="products"
                [rows]="10"
                [paginator]="true"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                [tableStyle]="{ 'min-width': '75rem' }"
                [(selection)]="selectedProducts"
                [rowHover]="true"
                dataKey="id"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                [showCurrentPageReport]="true"
            >
                <ng-template pTemplate="caption">
                    <div class="flex align-items-center justify-content-between">
                        <h5 class="m-0">Manage Products</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search..." />
                        </span>
                    </div>
                </ng-template>
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th pSortableColumn="name" style="min-width:15rem">Name <p-sortIcon field="name"></p-sortIcon></th>
                        <th>Image</th>
                        <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                        <th pSortableColumn="category" style="min-width:10rem">Category <p-sortIcon field="category"></p-sortIcon></th>
                        <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
                        <th pSortableColumn="inventoryStatus" style="min-width:10rem">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                        <th></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="product"></p-tableCheckbox>
                        </td>
                        <td>{{ product.name }}</td>
                        <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-4" /></td>
                        <td>{{ product.price | currency : 'USD' }}</td>
                        <td>{{ product.category }}</td>
                        <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
                        <td>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                        </td>
                        <td>
                            <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" (click)="editProduct(product)"></button>
                            <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteProduct(product)"></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="summary">
                    <div class="flex align-items-center justify-content-between">In total there are {{ products ? products.length : 0 }} products.</div>
                </ng-template>
            </p-table>

            <p-dialog [(visible)]="productDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true" styleClass="p-fluid">
                <ng-template pTemplate="content">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-3" *ngIf="product.image" />
                    <div class="field">
                        <label for="name">Name</label>
                        <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus />
                        <small class="p-error" *ngIf="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Description</label>
                        <textarea id="description" pInputTextarea [(ngModel)]="product.description" required rows="3" cols="20"></textarea>
                    </div>

                    <div class="field">
                        <label for="inventoryStatus">Inventory Status</label>
                        <p-dropdown [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses">
                            <ng-template pTemplate="selectedItem">
                                <p-tag [value]="product.inventoryStatus.toUpperCase()" [severity]="getSeverity(product.inventoryStatus.toUpperCase())"></p-tag>
                            </ng-template>
                            <ng-template let-option pTemplate="item">
                                <p-tag [value]="option.label" [severity]="getSeverity(option.label)"></p-tag>
                            </ng-template>
                        </p-dropdown>
                    </div>

                    <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <p-radioButton id="category1" name="category" value="Accessories" [(ngModel)]="product.category"></p-radioButton>
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <p-radioButton id="category2" name="category" value="Clothing" [(ngModel)]="product.category"></p-radioButton>
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <p-radioButton id="category3" name="category" value="Electronics" [(ngModel)]="product.category"></p-radioButton>
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <p-radioButton id="category4" name="category" value="Fitness" [(ngModel)]="product.category"></p-radioButton>
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Price</label>
                            <p-inputNumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US"></p-inputNumber>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <p-inputNumber id="quantity" [(ngModel)]="product.quantity"></p-inputNumber>
                        </div>
                    </div>
                </ng-template>

                <ng-template pTemplate="footer">
                    <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
                    <button pButton pRipple label="Save" icon="pi pi-check" class="p-button-text" (click)="saveProduct()"></button>
                </ng-template>
            </p-dialog>

            <p-confirmDialog [style]="{ width: '450px' }"></p-confirmDialog>
        </div>
        <app-code [code]="code" selector="table-products-demo" [extFiles]="extFiles"></app-code>
    </section>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MessageService, ConfirmationService]
})
export class ProductsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
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
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
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

    code: Code = {
        basic: `
<p-toast></p-toast>
<p-toolbar styleClass="mb-4 gap-2">
    <ng-template pTemplate="left">
        <button pButton pRipple label="New" icon="pi pi-plus" class="p-button-success mr-2" (click)="openNew()"></button>
        <button pButton pRipple [label]="Delete" icon="pi pi-trash" class="p-button-danger" (click)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length"></button>
    </ng-template>

    <ng-template pTemplate="right">
        <p-fileUpload mode="basic" accept="image/*" [maxFileSize]="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block"></p-fileUpload>
        <button pButton pRipple label="Export" icon="pi pi-upload" class="p-button-help"></button>
    </ng-template>
</p-toolbar>

<p-table
    #dt
    [value]="products"
    [rows]="10"
    [paginator]="true"
    [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
    [tableStyle]="{ 'min-width': '75rem' }"
    [(selection)]="selectedProducts"
    [rowHover]="true"
    dataKey="id"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    [showCurrentPageReport]="true"
>
    <ng-template pTemplate="caption">
        <div class="flex align-items-center justify-content-between">
            <h5 class="m-0">Manage Products</h5>
            <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search..." />
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="header">
        <tr>
            <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th pSortableColumn="name" style="min-width:15rem">Name <p-sortIcon field="name"></p-sortIcon></th>
            <th>Image</th>
            <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
            <th pSortableColumn="category" style="min-width:10rem">Category <p-sortIcon field="category"></p-sortIcon></th>
            <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
            <th pSortableColumn="inventoryStatus" style="min-width:10rem">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
            <th></th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>
                <p-tableCheckbox [value]="product"></p-tableCheckbox>
            </td>
            <td>{{ product.name }}</td>
            <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-4" /></td>
            <td>{{ product.price | currency: 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
            <td>
                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
            </td>
            <td>
                <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" (click)="editProduct(product)"></button>
                <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteProduct(product)"></button>
            </td>
        </tr>
    </ng-template>
    <ng-template pTemplate="summary">
        <div class="flex align-items-center justify-content-between">In total there are {{ products ? products.length : 0 }} products.</div>
    </ng-template>
</p-table>`,
        html: `
<div class="card">
    <p-toast></p-toast>
    <p-toolbar styleClass="mb-4 gap-2">
        <ng-template pTemplate="left">
            <button pButton pRipple label="New" icon="pi pi-plus" class="p-button-success mr-2" (click)="openNew()"></button>
            <button pButton pRipple [label]="Delete" icon="pi pi-trash" class="p-button-danger" (click)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length"></button>
        </ng-template>

        <ng-template pTemplate="right">
            <p-fileUpload mode="basic" accept="image/*" [maxFileSize]="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block"></p-fileUpload>
            <button pButton pRipple label="Export" icon="pi pi-upload" class="p-button-help"></button>
        </ng-template>
    </p-toolbar>

    <p-table
        #dt
        [value]="products"
        [rows]="10"
        [paginator]="true"
        [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
        [tableStyle]="{ 'min-width': '75rem' }"
        [(selection)]="selectedProducts"
        [rowHover]="true"
        dataKey="id"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [showCurrentPageReport]="true"
    >
        <ng-template pTemplate="caption">
            <div class="flex align-items-center justify-content-between">
                <h5 class="m-0">Manage Products</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <input pInputText type="text" (input)="dt.filterGlobal($event.target.value, 'contains')" placeholder="Search..." />
                </span>
            </div>
        </ng-template>
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 4rem">
                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                </th>
                <th pSortableColumn="name" style="min-width:15rem">Name <p-sortIcon field="name"></p-sortIcon></th>
                <th>Image</th>
                <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                <th pSortableColumn="category" style="min-width:10rem">Category <p-sortIcon field="category"></p-sortIcon></th>
                <th pSortableColumn="rating">Reviews <p-sortIcon field="rating"></p-sortIcon></th>
                <th pSortableColumn="inventoryStatus" style="min-width:10rem">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                <th></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>
                    <p-tableCheckbox [value]="product"></p-tableCheckbox>
                </td>
                <td>{{ product.name }}</td>
                <td><img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.name" width="50" class="shadow-4" /></td>
                <td>{{ product.price | currency: 'USD' }}</td>
                <td>{{ product.category }}</td>
                <td><p-rating [ngModel]="product.rating" [readonly]="true" [cancel]="false"></p-rating></td>
                <td>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </td>
                <td>
                    <button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" (click)="editProduct(product)"></button>
                    <button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-warning" (click)="deleteProduct(product)"></button>
                </td>
            </tr>
        </ng-template>
        <ng-template pTemplate="summary">
            <div class="flex align-items-center justify-content-between">In total there are {{ products ? products.length : 0 }} products.</div>
        </ng-template>
    </p-table>
</div>
<p-dialog [(visible)]="productDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true" styleClass="p-fluid">
    <ng-template pTemplate="content">
        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-3" *ngIf="product.image" />
        <div class="field">
            <label for="name">Name</label>
            <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus />
            <small class="p-error" *ngIf="submitted && !product.name">Name is required.</small>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <textarea id="description" pInputTextarea [(ngModel)]="product.description" required rows="3" cols="20"></textarea>
        </div>

        <div class="field">
            <label for="inventoryStatus">Inventory Status</label>
            <p-dropdown [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses">
                <ng-template pTemplate="selectedItem">
                    <p-tag [value]="product.inventoryStatus.toUpperCase()" [severity]="getSeverity(product.inventoryStatus.toUpperCase())"></p-tag>
                </ng-template>
                <ng-template let-option pTemplate="item">
                    <p-tag [value]="option.label" [severity]="getSeverity(option.label)"></p-tag>
                </ng-template>
            </p-dropdown>
        </div>

        <div class="field">
            <label class="mb-3">Category</label>
            <div class="formgrid grid">
                <div class="field-radiobutton col-6">
                    <p-radioButton id="category1" name="category" value="Accessories" [(ngModel)]="product.category"></p-radioButton>
                    <label for="category1">Accessories</label>
                </div>
                <div class="field-radiobutton col-6">
                    <p-radioButton id="category2" name="category" value="Clothing" [(ngModel)]="product.category"></p-radioButton>
                    <label for="category2">Clothing</label>
                </div>
                <div class="field-radiobutton col-6">
                    <p-radioButton id="category3" name="category" value="Electronics" [(ngModel)]="product.category"></p-radioButton>
                    <label for="category3">Electronics</label>
                </div>
                <div class="field-radiobutton col-6">
                    <p-radioButton id="category4" name="category" value="Fitness" [(ngModel)]="product.category"></p-radioButton>
                    <label for="category4">Fitness</label>
                </div>
            </div>
        </div>

        <div class="formgrid grid">
            <div class="field col">
                <label for="price">Price</label>
                <p-inputNumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US"></p-inputNumber>
            </div>
            <div class="field col">
                <label for="quantity">Quantity</label>
                <p-inputNumber id="quantity" [(ngModel)]="product.quantity"></p-inputNumber>
            </div>
        </div>
    </ng-template>

    <ng-template pTemplate="footer">
        <button pButton pRipple label="Cancel" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
        <button pButton pRipple label="Save" icon="pi pi-check" class="p-button-text" (click)="saveProduct()"></button>
    </ng-template>
</p-dialog>

<p-confirmDialog [style]="{ width: '450px' }"></p-confirmDialog>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'table-products-demo',
    templateUrl: 'table-products-demo.html',
    styleUrls: ['table-products-demo.scss'],
    providers: [MessageService, ConfirmationService]
})
export class TableProductsDemo implements OnInit{
    productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data));

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
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
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
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
}
