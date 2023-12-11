import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { InfoDemo } from './infodemo';
@Component({
    template: ` <div class="flex justify-content-end mt-1 mb-3">
            <p-button icon="pi pi-external-link" label="Nested Dialog" [outlined]="true" severity="success" (click)="showInfo()" />
        </div>
        <p-table [value]="products" responsiveLayout="scroll" [rows]="5" [responsive]="true">
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
                        <p-button type="button" [text]="true" [rounded]="true" icon="pi pi-plus" (click)="selectProduct(product)"></p-button>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="footer">
                <p-button type="button" label="Cancel" icon="pi pi-times" (click)="closeDialog({ buttonType: 'Cancel', summary: 'No Product Selected' })" [autofocus]="true"></p-button>
            </ng-template>
        </p-table>`
})
export class ProductListDemo implements OnInit {
    products: Product[];

    ref: DynamicDialogRef | undefined;

    constructor(private productService: ProductService, private dialogService: DialogService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products.slice(0, 5)));
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }
    showInfo() {
        this.ref = this.dialogService.open(InfoDemo, {
            header: 'Information',
            modal: true,
            dismissableMask: true,

            data: {
                totalProducts: this.products ? this.products.length : 0
            }
        });
    }

    closeDialog(e) {
        this.ref.close(e);
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
}
