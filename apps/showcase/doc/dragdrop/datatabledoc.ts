import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'drag-drop-data-table-demo',
    standalone: true,
    imports: [CommonModule, DragDropModule, TableModule, TagModule, AppCode, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>Drag and Drop to Table</p>
        </app-docsectiontext>
        <div class="card grid grid-cols-12 gap-4 grid-nogutter">
            <div class="col-span-12 md:col-span-6 drag-column">
                <div *ngFor="let product of availableProducts">
                    <div class="product-item" pDraggable="products" (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
                        <div class="image-container">
                            <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="product-image" />
                        </div>
                        <div class="product-list-detail">
                            <h5 class="mb-2">{{ product.name }}</h5>
                            <i class="pi pi-tag product-category-icon"></i>
                            <span class="product-category">{{ product.category }}</span>
                        </div>
                        <div class="product-list-action">
                            <h6 class="mb-2">{{ product.price }}</h6>
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 drop-column" pDroppable="products" (onDrop)="drop()">
                <p-table [value]="selectedProducts">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product>
                        <tr>
                            <td>{{ product.id }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
        <app-code selector="drag-drop-data-table-demo" [extFiles]="extFiles"></app-code>
    `
})
export class DataTableDoc implements OnInit {
    availableProducts: Product[] | undefined;

    selectedProducts: Product[] | undefined;

    draggedProduct: Product | undefined | null;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.selectedProducts = [];
        this.productService.getProductsSmall().then((products) => (this.availableProducts = products));
    }

    dragStart(product: Product) {
        this.draggedProduct = product;
    }

    drop() {
        if (this.draggedProduct) {
            let draggedProductIndex = this.findIndex(this.draggedProduct);
            this.selectedProducts = [...(this.selectedProducts as Product[]), this.draggedProduct];
            this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
            this.draggedProduct = null;
        }
    }

    dragEnd() {
        this.draggedProduct = null;
    }

    findIndex(product: Product) {
        let index = -1;
        for (let i = 0; i < (this.availableProducts as Product[]).length; i++) {
            if (product.id === (this.availableProducts as Product[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
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
