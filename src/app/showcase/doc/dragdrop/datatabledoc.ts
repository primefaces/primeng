import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'drag-drop-data-table-demo',
    template: `
        <app-docsectiontext>
            <p>Drag and Drop to Table</p>
        </app-docsectiontext>
        <div class="card grid grid-nogutter">
            <div class="col-12 md:col-6 drag-column">
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
                            <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 drop-column" pDroppable="products" (onDrop)="drop()">
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
        <app-code [code]="code" selector="drag-drop-data-table-demo" [extFiles]="extFiles"></app-code>
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
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    code: Code = {
        basic: `<div class="card grid grid-nogutter">
    <div class="col-12 md:col-6 drag-column">
        <div *ngFor="let product of availableProducts">
            <div class="product-item" pDraggable="products" (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
                <div class="image-container">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}"[alt]="product.name" class="product-image" />
                </div>
                <div class="product-list-detail">
                    <h5 class="mb-2">{{product.name}}</h5>
                    <i class="pi pi-tag product-category-icon"></i>
                    <span class="product-category">{{product.category}}</span>
                    </div>
                    <div class="product-list-action">
                    <h6 class="mb-2">{{product.price}}</h6>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 md:col-6 drop-column" pDroppable="products" (onDrop)="drop()">
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
                    <td>{{product.id}}</td>
                    <td>{{product.category}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>`,
        html: `
<div class="card grid grid-nogutter">
    <div class="col-12 md:col-6 drag-column">
        <div *ngFor="let product of availableProducts">
            <div class="product-item" pDraggable="products" (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
                <div class="image-container">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}"[alt]="product.name" class="product-image" />
                </div>
                <div class="product-list-detail">
                    <h5 class="mb-2">{{product.name}}</h5>
                    <i class="pi pi-tag product-category-icon"></i>
                    <span class="product-category">{{product.category}}</span>
                    </div>
                    <div class="product-list-action">
                    <h6 class="mb-2">{{product.price}}</h6>
                    <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)"></p-tag>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 md:col-6 drop-column" pDroppable="products" (onDrop)="drop()">
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
                    <td>{{product.id}}</td>
                    <td>{{product.category}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';

@Component({
    selector: 'drag-drop-data-table-demo',
    templateUrl: './drag-drop-data-table-demo.html',
    styleUrls: ['./drag-drop-data-table-demo.scss']
})
export class DragDropDataTableDemo implements OnInit {
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
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}`,
        scss: `
:host ::ng-deep {
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
