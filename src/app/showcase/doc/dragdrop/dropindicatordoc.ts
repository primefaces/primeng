import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { Product } from '../../domain/product';

@Component({
    selector: 'drag-drop-drop-indicator-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When a suitable draggable enters a droppable area, the area gets <i>p-draggable-enter</i> class that can be used to style the droppable section.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3">
            <div class="p-2 border-1 surface-border border-round w-15rem h-10rem">
                <ul class="list-none flex flex-column gap-2 p-0 m-0">
                    <li *ngFor="let product of availableProducts" class="p-2 border-round shadow-1" pDraggable (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
                        {{ product.name }}
                    </li>
                </ul>
            </div>
            <div class="p-2 w-15rem h-10rem drop-column" pDroppable (onDrop)="drop()">
                <p class="text-center surface-border border-bottom-1">Drop Zone</p>
                <ul class="list-none flex flex-column gap-2 p-0 m-0" *ngIf="selectedProducts">
                    <li *ngFor="let product of selectedProducts" class="p-2 border-round shadow-1">
                        {{ product.name }}
                    </li>
                </ul>
            </div>
        </div>
        <app-code [code]="code" selector="drag-drop-drop-indicator-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class DropIndicatorDoc {
    @Input() id: string;

    @Input() title: string;

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
    code: Code = {
        basic: `
<div class="p-2 border-1 surface-border border-round w-15rem h-10rem">
    <ul class="list-none flex flex-column gap-2 p-0 m-0">
        <li *ngFor="let product of availableProducts" class="p-2 border-round shadow-1" pDraggable (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
            {{product.name}}
        </li>
    </ul>
</div>
<div class="p-2 w-15rem h-10rem drop-column" pDroppable (onDrop)="drop()">
    <p class="text-center surface-border border-bottom-1">Drop Zone</p>
    <ul class="list-none flex flex-column gap-2 p-0 m-0" *ngIf="selectedProducts" >
        <li *ngFor="let product of selectedProducts" class="p-2 border-round shadow-1">
            {{product.name}}
        </li>
    </ul>
</div>`,
        html: `
<div class="card flex flex-wrap gap-3">
    <div class="p-2 border-1 surface-border border-round w-15rem h-10rem">
        <ul class="list-none flex flex-column gap-2 p-0 m-0">
            <li *ngFor="let product of availableProducts" class="p-2 border-round shadow-1" pDraggable (onDragStart)="dragStart(product)" (onDragEnd)="dragEnd()">
                {{product.name}}
            </li>
        </ul>
    </div>
    <div class="p-2 w-15rem h-10rem drop-column" pDroppable (onDrop)="drop()">
        <p class="text-center surface-border border-bottom-1">Drop Zone</p>
        <ul class="list-none flex flex-column gap-2 p-0 m-0" *ngIf="selectedProducts" >
            <li *ngFor="let product of selectedProducts" class="p-2 border-round shadow-1">
                {{product.name}}
            </li>
        </ul>
    </div>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'drag-drop-drop-indicator-demo',
    templateUrl: './drag-drop-drop-indicator-demo.html',
    styleUrls: ['./drag-drop-drop-indicator-demo.scss']
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
}`,
        scss: `
:host ::ng-deep {
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
