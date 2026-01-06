# Angular Drag and Drop Component

pDraggable and pDroppable directives apply drag-drop behaviors to any element.

## Basic

pDraggable and pDroppable are attached to a target element to add drag-drop behavior. The value of a Directive attribute is required and it defines the scope to match draggables with droppables. Droppable scope can also be an array to accept multiple droppables.

```html
<div class="p-2 border border-surface rounded-border w-60">
    <ul class="list-none flex flex-col gap-2 p-0 m-0">
        <li *ngFor="let product of availableProducts" class="p-2 rounded-border shadow-sm" pDraggable (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
            {{ product.name }}
        </li>
    </ul>
</div>
<div class="p-2 border border-surface rounded-border w-60" pDroppable (onDrop)="drop()">
    <p class="text-center border-surface border-b">Drop Zone</p>
    <ul class="list-none flex flex-col gap-2 p-0 m-0" *ngIf="selectedProducts">
        <li *ngFor="let product of selectedProducts" class="p-2 rounded-border shadow-sm">
            {{ product.name }}
        </li>
    </ul>
</div>
```

## DataTable

Drag and Drop to Table

```html
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
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
    `,
    standalone: true,
    imports: [TableModule, TagModule],
    providers: [ProductService]
})
export class DragdropDatatableDemo implements OnInit {
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
}
```
</details>

## Drag Handle

dragHandle is used to restrict dragging unless mousedown occurs on the specified element. Panel below can only be dragged using its header.

```html
<div pDraggable dragHandle=".p-panel-header" class="w-60">
    <p-panel header="Drag Header"> Content </p-panel>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card">
            <div pDraggable dragHandle=".p-panel-header" class="w-60">
                <p-panel header="Drag Header"> Content </p-panel>
            </div>
        </div>
    `,
    standalone: true,
    imports: [PanelModule]
})
export class DragdropDraghandleDemo {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}
```
</details>

## Drop Indicator

When a suitable draggable enters a droppable area, the area gets p-draggable-enter class that can be used to style the droppable section.

```html
<div class="p-2 border border-surface rounded-border w-60 h-40">
    <ul class="list-none flex flex-col gap-2 p-0 m-0">
        <li *ngFor="let product of availableProducts" class="p-2 rounded-border shadow-sm" pDraggable (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
            {{ product.name }}
        </li>
    </ul>
</div>
<div class="p-2 w-60 h-40 drop-column" pDroppable (onDrop)="drop()">
    <p class="text-center border-surface border-b">Drop Zone</p>
    <ul class="list-none flex flex-col gap-2 p-0 m-0" *ngIf="selectedProducts">
        <li *ngFor="let product of selectedProducts" class="p-2 rounded-border shadow-sm">
            {{ product.name }}
        </li>
    </ul>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';

@Component({
    template: `
        <div class="card flex flex-wrap gap-4">
            <div class="p-2 border border-surface rounded-border w-60 h-40">
                <ul class="list-none flex flex-col gap-2 p-0 m-0">
                    <li *ngFor="let product of availableProducts" class="p-2 rounded-border shadow-sm" pDraggable (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
                        {{ product.name }}
                    </li>
                </ul>
            </div>
            <div class="p-2 w-60 h-40 drop-column" pDroppable (onDrop)="drop()">
                <p class="text-center border-surface border-b">Drop Zone</p>
                <ul class="list-none flex flex-col gap-2 p-0 m-0" *ngIf="selectedProducts">
                    <li *ngFor="let product of selectedProducts" class="p-2 rounded-border shadow-sm">
                        {{ product.name }}
                    </li>
                </ul>
            </div>
        </div>
    `,
    standalone: true,
    imports: []
})
export class DragdropDropindicatorDemo implements OnInit {
    availableProducts: Product[] | undefined;
    selectedProducts: Product[] | undefined;
    draggedProduct: Product | undefined | null;

    ngOnInit() {
        this.selectedProducts = [];
        this.availableProducts = [
            { id: '1', name: 'Black Watch' },
            { id: '2', name: 'Bamboo Watch' }
        ];
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
}
```
</details>

