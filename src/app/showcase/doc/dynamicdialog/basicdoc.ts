import { Component, Input, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'dynamic-dialog-basic-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Dynamic dialogs require an instance of a <i>DialogService</i> that is responsible for displaying a dialog with a component as its content. Calling <i>open</i> method of <i>DialogService</i> will display dynamic dialog. First parameter
                of <i>open</i> method is the type of component to load and the second parameter is the configuration of the Dialog such as <i>header</i>, <i>width</i> and more.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-button (click)="show()" icon="pi pi-info-circle" label="Show"></p-button>
        </div>
        <app-code [code]="code" selector="dynamic-dialog-basic-demo" [extFiles]="extFiles" [routeFiles]="routeFiles"></app-code>
    </section>`,
    providers: [DialogService, MessageService]
})
export class BasicDoc implements OnDestroy {
    @Input() id: string;

    @Input() title: string;

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef | undefined;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Select a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe((product: Product) => {
            if (product) {
                this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
            }
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<p-button (click)="show()" icon="pi pi-info-circle" label="Show"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-button (click)="show()" icon="pi pi-info-circle" label="Show"></p-button>
</div>`,

        typescript: `
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'dynamic-dialog-basic-demo',
    templateUrl: './dynamic-dialog-basic-demo.html',
    providers: [DialogService, MessageService]
})
export class DynamicDialogBasicDemo implements OnDestroy {
    
    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef | undefined;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Select a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.ref.onClose.subscribe((product: Product) => {
            if (product) {
                this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
            }
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: \`maximized: \${value.maximized}\` });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
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

    routeFiles = [
        {
            path: 'src/app/demo/productlistdemo.ts',
            name: 'ProductListDemo',
            content: `import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    template: \` <p-table [value]="products" responsiveLayout="scroll" [paginator]="true" [rows]="5" [responsive]="true">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="name">Name <p-sortIcon field="vin"></p-sortIcon></th>
                <th pSortableColumn="year">Image</th>
                <th pSortableColumn="price">Brand <p-sortIcon field="price"></p-sortIcon></th>
                <th pSortableColumn="inventoryStatus">Status <p-sortIcon field="inventoryStatus"></p-sortIcon></th>
                <th style="width:4em"></th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{ product.name }}</td>
                <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-4rem h-4rem shadow-2" /></td>
                <td>{{ product.price }}</td>
                <td>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </td>
                <td>
                    <button type="button" pButton icon="pi pi-plus" (click)="selectProduct(product)"></button>
                </td>
            </tr>
        </ng-template>
    </p-table>\`
})
export class ProductListDemo implements OnInit {
    products: Product[];

    constructor(private productService: ProductService, public ref: DynamicDialogRef) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products));
    }

    selectProduct(product: Product) {
        this.ref.close(product);
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
}`
        }
    ];
}
