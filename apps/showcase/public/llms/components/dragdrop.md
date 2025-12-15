# Angular Drag and Drop Component

pDraggable and pDroppable directives apply drag-drop behaviors to any element.

## Basic

pDraggable and pDroppable are attached to a target element to add drag-drop behavior. The value of a Directive attribute is required and it defines the scope to match draggables with droppables. Droppable scope can also be an array to accept multiple droppables.

```html
<div class="p-2 border border-surface rounded-border w-60">
    <ul class="list-none flex flex-col gap-2 p-0 m-0">
        <li
            *ngFor="let product of availableProducts"
            class="p-2 rounded-border shadow-sm"
            pDraggable
            (onDragStart)="dragStart(product)"
            (onDragEnd)="dragEnd()">
                {{product.name}}
        </li>
    </ul>
</div>
<div class="p-2 border border-surface rounded-border w-60" pDroppable (onDrop)="drop()">
    <p class="text-center border-surface border-b">
        Drop Zone
    </p>
    <ul class="list-none flex flex-col gap-2 p-0 m-0" *ngIf="selectedProducts" >
        <li *ngFor="let product of selectedProducts" class="p-2 rounded-border shadow-sm">
            {{product.name}}
        </li>
    </ul>
</div>
```

## DataTable

Drag and Drop to Table

```html
<div class="card grid grid-cols-12 gap-4 grid-nogutter">
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
    <div class="col-span-12 md:col-span-6 drop-column" pDroppable="products" (onDrop)="drop()">
    <p-table [value]="selectedProducts">
        <ng-template pTemplate="header">
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Category
                </th>
                <th>
                    Name
                </th>
                <th>
                    Price
                </th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>
                    {{product.id}}
                </td>
                <td>
                    {{product.category}}
                </td>
                <td>
                    {{product.name}}
                </td>
                <td>
                    {{product.price}}
                </td>
            </tr>
            </ng-template>
        </p-table>
    </div>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
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
    <p-panel header="Drag Header">
        Content
    </p-panel>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'drag-drop-drag-handle-demo',
    templateUrl: './drag-drop-drag-handle-demo.html',
    styles: [
        \`:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }\`
    ],
    standalone: true,
    imports: [DragDropModule, PanelModule]
})
export class DragDropDragHandleDemo {}
```
</details>

## Drop Indicator

When a suitable draggable enters a droppable area, the area gets p-draggable-enter class that can be used to style the droppable section.

```html
<div class="p-2 border border-surface rounded-border w-60 h-40">
    <ul class="list-none flex flex-col gap-2 p-0 m-0">
        <li
            *ngFor="let product of availableProducts"
            class="p-2 rounded-border shadow-sm"
            pDraggable
            (onDragStart)="dragStart(product)"
            (onDragEnd)="dragEnd()">
                {{product.name}}
        </li>
    </ul>
</div>
<div class="p-2 w-60 h-40 drop-column" pDroppable (onDrop)="drop()">
    <p class="text-center border-surface border-b">Drop Zone</p>
    <ul class="list-none flex flex-col gap-2 p-0 m-0" *ngIf="selectedProducts" >
        <li *ngFor="let product of selectedProducts" class="p-2 rounded-border shadow-sm">
            {{product.name}}
        </li>
    </ul>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';

@Component({
    selector: 'drag-drop-drop-indicator-demo',
    templateUrl: './drag-drop-drop-indicator-demo.html',
    styles: [
        \`:host ::ng-deep {
            .drop-column {
                border: 1px solid transparent;
                transition: border-color .2s;

                &.p-draggable-enter {
                    border-color: var(--primary-color);
                }
            }

            [pDraggable] {
                cursor: move;
            }
        }\`
    ],
    standalone: true,
    imports: [DragDropModule, CommonModule],
    providers: [ProductService]
})
export class DragDropDropIndicatorDemo implements OnInit {
    availableProducts: Product[] | undefined;

    selectedProducts: Product[] | undefined;

    draggedProduct: Product | undefined | null;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.selectedProducts = [];
        this.availableProducts = [
            {id:'1', name: 'Black Watch'},
            {id:'2', name: 'Bamboo Watch'}
        ]
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

