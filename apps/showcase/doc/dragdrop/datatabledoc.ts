import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'drag-drop-data-table-demo',
    standalone: false,
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
            <div class="col-span-12 md:col-span-6 drop-column">
                <p-table [value]="selectedProducts" pDroppable="products" (onDrop)="drop()">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-product let-i="rowIndex">
                        <tr
                            pDraggable="products"
                            pDroppable="products"
                            (onDragStart)="dragStart(product)"
                            (onDragEnd)="dragEnd()"
                            (onDrop)="drop(i)"
                            (dragover)="onDragOver($event, i)"
                            [ngClass]="{ 'drop-top': dropState.index === i && dropState.position === 'top', 'drop-bottom': dropState.index === i && dropState.position === 'bottom' }"
                        >
                            <td>{{ product.id }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
        <app-code [code]="code" selector="drag-drop-data-table-demo" [extFiles]="extFiles"></app-code>
    `
})
export class DataTableDoc implements OnInit {
    availableProducts: Product[] | undefined;

    selectedProducts: Product[] | undefined;

    draggedProduct: Product | undefined | null;

    draggedProductIndex: number = -1;

    dropState = {
        index: -1,
        position: null
    };

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.selectedProducts = [];
        this.productService.getProductsSmall().then((products) => (this.availableProducts = products));
    }

    onDragOver(event: DragEvent, index: number) {
        event.preventDefault();
        const rowElement = (event.target as HTMLElement).closest('tr');
        if (rowElement) {
            const rect = rowElement.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            const position = event.clientY < midpoint ? 'top' : 'bottom';
            this.dropState = { index, position };
        }
    }

    dragStart(product: Product) {
        this.draggedProduct = product;
        this.draggedProductIndex = this.selectedProducts?.findIndex((p) => p.id === product.id) ?? -1;
    }

    drop(dropOnRowIndex?: number) {
        if (this.draggedProduct) {
            let newSelectedProducts = this.selectedProducts ? [...this.selectedProducts] : [];
            let finalDropIndex;

            if (dropOnRowIndex !== undefined) {
                finalDropIndex = this.dropState.position === 'top' ? dropOnRowIndex : dropOnRowIndex + 1;
            }

            if (this.draggedProductIndex > -1) {
                // Reordering
                const [draggedItem] = newSelectedProducts.splice(this.draggedProductIndex, 1);
                if (finalDropIndex !== undefined) {
                    newSelectedProducts.splice(finalDropIndex, 0, draggedItem);
                } else {
                    newSelectedProducts.push(draggedItem);
                }
            } else {
                // New item
                if (this.availableProducts) {
                    this.availableProducts = this.availableProducts.filter((p) => p.id !== this.draggedProduct.id);
                }
                if (finalDropIndex !== undefined) {
                    newSelectedProducts.splice(finalDropIndex, 0, this.draggedProduct);
                } else {
                    newSelectedProducts.push(this.draggedProduct);
                }
            }

            this.selectedProducts = newSelectedProducts;
            this.draggedProduct = null;
            this.resetDropState();
        }
    }

    dragEnd() {
        this.draggedProduct = null;
        this.draggedProductIndex = -1;
        this.resetDropState();
    }

    resetDropState() {
        this.dropState = { index: -1, position: null };
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

    code: Code = {
        basic: `<div class="card grid grid-cols-12 gap-4 grid-nogutter">
    <div class="col-span-12 md:col-span-6 drag-column">
        <div *ngFor="let product of availableProducts">
            <div
                class="product-item"
                pDraggable="products"
                (onDragStart)="dragStart(product)"
                (onDragEnd)="dragEnd()">
                    <div class="image-container">
                        <img
                            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}"
                            [alt]="product.name"
                            class="product-image" />
                    </div>
                    <div class="product-list-detail">
                        <h5 class="mb-2">
                            {{product.name}}
                        </h5>
                        <i class="pi pi-tag product-category-icon"></i>
                        <span class="product-category">
                            {{product.category}}
                        </span>
                        </div>
                        <div class="product-list-action">
                        <h6 class="mb-2">
                            {{product.price}}
                        </h6>
                        <p-tag
                            [value]="product.inventoryStatus"
                            [severity]="getSeverity(product.inventoryStatus)" />
                    </div>
            </div>
        </div>
    </div>
    <div class="col-span-12 md:col-span-6 drop-column">
        <p-table [value]="selectedProducts" pDroppable="products" (onDrop)="drop()">
            <ng-template pTemplate="header">
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product let-i="rowIndex">
                <tr
                    pDraggable="products"
                    pDroppable="products"
                    (onDragStart)="dragStart(product)"
                    (onDragEnd)="dragEnd()"
                    (onDrop)="drop(i)"
                    (dragover)="onDragOver($event, i)"
                    [ngClass]="{ 'drop-top': dropState.index === i && dropState.position === 'top', 'drop-bottom': dropState.index === i && dropState.position === 'bottom' }">
                    <td>{{ product.id }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>`,
        html: `<div class="card grid grid-cols-12 gap-4 grid-nogutter">
    <div class="col-span-12 md:col-span-6 drag-column">
        <div *ngFor="let product of availableProducts">
            <div
                class="product-item"
                pDraggable="products"
                (onDragStart)="dragStart(product)"
                (onDragEnd)="dragEnd()">
                    <div class="image-container">
                        <img
                            src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}"
                            [alt]="product.name"
                            class="product-image" />
                    </div>
                    <div class="product-list-detail">
                        <h5 class="mb-2">
                            {{product.name}}
                        </h5>
                        <i class="pi pi-tag product-category-icon"></i>
                        <span class="product-category">
                            {{product.category}}
                        </span>
                        </div>
                        <div class="product-list-action">
                        <h6 class="mb-2">
                            {{product.price}}
                        </h6>
                        <p-tag
                            [value]="product.inventoryStatus"
                            [severity]="getSeverity(product.inventoryStatus)" />
                    </div>
            </div>
        </div>
    </div>
    <div class="col-span-12 md:col-span-6 drop-column">
        <p-table [value]="selectedProducts" pDroppable="products" (onDrop)="drop()">
            <ng-template pTemplate="header">
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product let-i="rowIndex">
                <tr
                    pDraggable="products"
                    pDroppable="products"
                    (onDragStart)="dragStart(product)"
                    (onDragEnd)="dragEnd()"
                    (onDrop)="drop(i)"
                    (dragover)="onDragOver($event, i)"
                    [ngClass]="{ 'drop-top': dropState.index === i && dropState.position === 'top', 'drop-bottom': dropState.index === i && dropState.position === 'bottom' }">
                    <td>{{ product.id }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'drag-drop-data-table-demo',
    templateUrl: './drag-drop-data-table-demo.html',
    styles: [
        \`:host ::ng-deep {
            .drag-column {
                padding-right: .5em;
            }

            .drop-column {
                border: 1px solid transparent;
                transition: border-color .2s;

                &.p-draggable-enter {
                    border-color: var(--primary-color);
                }
            }

            .product-item {
                display: flex;
                align-items: center;
                padding: 1rem;
                width: 100%;
                border-bottom: 1px solid var(--surface-d);

                img {
                    width: 75px;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
                    margin-right: 1rem;
                }

                .product-list-detail {
                    flex: 1 1 0;
                }

                .product-list-action {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }

                .product-category-icon {
                    vertical-align: middle;
                    margin-right: .5rem;
                }

                .product-category {
                    vertical-align: middle;
                    line-height: 1;
                }
            }

            .p-datatable-tbody > tr.drop-top {
                border-top: 2px solid #007bff;
            }

            .p-datatable-tbody > tr.drop-bottom {
                border-bottom: 2px solid #007bff;
            }

            [pDraggable] {
                cursor: move;
            }

            @media screen and (max-width: 576px) {
                .product-item {
                    flex-wrap: wrap;

                    .image-container {
                        width: 100%;
                        text-align: center;
                    }

                    img {
                        margin: 0 0 1rem 0;
                        width: 100px;
                    }
                }
            }
        }\`
    ],
    standalone: true,
    imports: [DragDropModule, TableModule, Tag, CommonModule],
    providers: [ProductService]
})
export class DragDropDataTableDemo implements OnInit {
    availableProducts: Product[] | undefined;

    selectedProducts: Product[] | undefined;

    draggedProduct: Product | undefined | null;

    draggedProductIndex: number = -1;

    dropState = {
        index: -1,
        position: null
    };

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.selectedProducts = [];
        this.productService.getProductsSmall().then((products) => (this.availableProducts = products));
    }

    onDragOver(event: DragEvent, index: number) {
        event.preventDefault();
        const rowElement = (event.target as HTMLElement).closest('tr');
        if (rowElement) {
            const rect = rowElement.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            const position = event.clientY < midpoint ? 'top' : 'bottom';
            this.dropState = { index, position };
        }
    }

    dragStart(product: Product) {
        this.draggedProduct = product;
        this.draggedProductIndex = this.selectedProducts?.findIndex((p) => p.id === product.id) ?? -1;
    }

    drop(dropOnRowIndex?: number) {
        if (this.draggedProduct) {
            let newSelectedProducts = this.selectedProducts ? [...this.selectedProducts] : [];
            let finalDropIndex;

            if (dropOnRowIndex !== undefined) {
                finalDropIndex = this.dropState.position === 'top' ? dropOnRowIndex : dropOnRowIndex + 1;
            }

            if (this.draggedProductIndex > -1) {
                // Reordering
                const [draggedItem] = newSelectedProducts.splice(this.draggedProductIndex, 1);
                if (finalDropIndex !== undefined) {
                    newSelectedProducts.splice(finalDropIndex, 0, draggedItem);
                } else {
                    newSelectedProducts.push(draggedItem);
                }
            } else {
                // New item
                if (this.availableProducts) {
                    this.availableProducts = this.availableProducts.filter((p) => p.id !== this.draggedProduct.id);
                }
                if (finalDropIndex !== undefined) {
                    newSelectedProducts.splice(finalDropIndex, 0, this.draggedProduct);
                } else {
                    newSelectedProducts.push(this.draggedProduct);
                }
            }

            this.selectedProducts = newSelectedProducts;
            this.draggedProduct = null;
            this.resetDropState();
        }
    }

    dragEnd() {
        this.draggedProduct = null;
        this.draggedProductIndex = -1;
        this.resetDropState();
    }

    resetDropState() {
        this.dropState = { index: -1, position: null };
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
}`,
        data: `
...
{
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
},
...`,
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
