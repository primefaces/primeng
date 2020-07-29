import {Component} from '@angular/core';
import {DynamicDialogRef} from '../../../components/dynamicdialog/dynamicdialog-ref';
import {DynamicDialogConfig} from '../../../components/dynamicdialog/dynamicdialog-config';
import {ProductService} from '../../service/productservice';
import {Product} from '../../domain/product';

@Component({
    template: `
        <p-table [value]="products" [paginator]="true" [rows]="5" [responsive]="true">
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
                    <td>{{product.name}}</td>
                    <td><img src="assets/showcase/images/demo/product/{{product.image}}" [alt]="product.image" class="product-image" /></td>
                    <td>{{product.price}}</td>
                    <td><span [class]="'product-badge status-'+product.inventoryStatus.toLowerCase()">{{product.inventoryStatus}}</span></td>
                    <td>
                        <button type="button" pButton icon="pi pi-search" (click)="selectProduct(product)"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `,
    styles: [`
        .product-image {
            width: 50px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
        }
    `]
})
export class ProductListDemo {

    products: Product[];
            
    constructor(private productService: ProductService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(products => this.products = products);
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }
}