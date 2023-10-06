import { Component, Input, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogPosition, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'dynamic-dialog-position-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>position</i> property is used to display a dynamic dialog at all edges and corners of the screen.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-2">
            <div class="flex flex-wrap gap-2">
                <p-button (click)="show('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
                <p-button (click)="show('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
            </div>
            <div class="flex flex-wrap gap-2">
                <p-button (click)="show('top-left')" icon="pi pi-arrow-down-right" label="TopLeft" styleClass="p-button-warning"></p-button>
                <p-button (click)="show('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
                <p-button (click)="show('top-right')" icon="pi pi-arrow-down-left" label="TopRight" styleClass="p-button-warning"></p-button>
            </div>
            <div class="flex flex-wrap gap-2">
                <p-button (click)="show('bottom-left')" icon="pi pi-arrow-up-right" label="BottomLeft" styleClass="p-button-success"></p-button>
                <p-button (click)="show('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
                <p-button (click)="show('bottom-right')" icon="pi pi-arrow-up-left" label="BottomRight" styleClass="p-button-success"></p-button>
            </div>
        </div>
        <app-code [code]="code" selector="dynamic-dialog-position-demo" [extFiles]="extFiles" [routeFiles]="routeFiles"></app-code>
    </section>`,
    providers: [DialogService, MessageService]
})
export class PositionDoc implements OnDestroy {
    @Input() id: string;

    @Input() title: string;

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef;

    show(position: DynamicDialogPosition) {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Select a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            position
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
<div class="flex flex-wrap gap-2">
    <p-button (click)="show('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
    <p-button (click)="show('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
</div>
<div class="flex flex-wrap gap-2">
    <p-button (click)="show('top-left')" icon="pi pi-arrow-down-right" label="TopLeft" styleClass="p-button-warning"></p-button>
    <p-button (click)="show('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
    <p-button (click)="show('top-right')" icon="pi pi-arrow-down-left" label="TopRight" styleClass="p-button-warning"></p-button>
</div>
<div class="flex flex-wrap gap-2">
    <p-button (click)="show('bottom-left')" icon="pi pi-arrow-up-right" label="BottomLeft" styleClass="p-button-success"></p-button>
    <p-button (click)="show('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
    <p-button (click)="show('bottom-right')" icon="pi pi-arrow-up-left" label="BottomRight" styleClass="p-button-success"></p-button>
</div>`,

        html: `
<div class="card flex flex-column align-items-center gap-2">
    <div class="flex flex-wrap gap-2">
        <p-button (click)="show('left')" icon="pi pi-arrow-right" label="Left" styleClass="p-button-help"></p-button>
        <p-button (click)="show('right')" icon="pi pi-arrow-left" label="Right" styleClass="p-button-help"></p-button>
    </div>
    <div class="flex flex-wrap gap-2">
        <p-button (click)="show('top-left')" icon="pi pi-arrow-down-right" label="TopLeft" styleClass="p-button-warning"></p-button>
        <p-button (click)="show('top')" icon="pi pi-arrow-down" label="Top" styleClass="p-button-warning"></p-button>
        <p-button (click)="show('top-right')" icon="pi pi-arrow-down-left" label="TopRight" styleClass="p-button-warning"></p-button>
    </div>
    <div class="flex flex-wrap gap-2">
        <p-button (click)="show('bottom-left')" icon="pi pi-arrow-up-right" label="BottomLeft" styleClass="p-button-success"></p-button>
        <p-button (click)="show('bottom')" icon="pi pi-arrow-up" label="Bottom" styleClass="p-button-success"></p-button>
        <p-button (click)="show('bottom-right')" icon="pi pi-arrow-up-left" label="BottomRight" styleClass="p-button-success"></p-button>
    </div>
</div>`,

        typescript: `
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductListDemo } from './productlistdemo';
@Component({
    selector: 'dynamic-dialog-position-demo',
    templateUrl: './dynamic-dialog-position-demo.html',
    providers: [DialogService, MessageService]
})
export class DynamicDialogPositionDemo implements OnDestroy {
    constructor(public dialogService: DialogService, public messageService: MessageService) {}
    ref: DynamicDialogRef;
    show(position: string) {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Select a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            position
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
