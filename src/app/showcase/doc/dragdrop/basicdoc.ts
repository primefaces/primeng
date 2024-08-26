import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { Product } from '@domain/product';

@Component({
    selector: 'drag-drop-basic-demo',
    template: `
        <app-docsectiontext>
            <p>
                <i>pDraggable</i> and <i>pDroppable</i> are attached to a target element to add drag-drop behavior. The value of a Directive attribute is required and it defines the scope to match draggables with droppables. Droppable scope can also
                be an array to accept multiple droppables.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4">
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
        </div>
        <app-code [code]="code" selector="drag-drop-basic-demo" [extFiles]="extFiles"></app-code>
    `
})
export class BasicDoc implements OnInit {
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
        basic: `<div class="p-2 border border-surface rounded-border w-60">
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
</div>`,
        html: `<div class="card flex flex-wrap gap-4">
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
        <p class="text-center border-surface border-b">Drop Zone</p>
        <ul class="list-none flex flex-col gap-2 p-0 m-0" *ngIf="selectedProducts" >
            <li *ngFor="let product of selectedProducts" class="p-2 rounded-border shadow-sm">
                {{product.name}}
            </li>
        </ul>
    </div>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@domain/product';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
        
@Component({
    selector: 'drag-drop-basic-demo',
    templateUrl: './drag-drop-basic-demo.html',
    styles: [
        \`:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }\`
    ],
    standalone: true,
    imports: [DragDropModule, CommonModule]
})
export class DragDropBasicDemo implements OnInit {
    availableProducts: Product[] | undefined;

    selectedProducts: Product[] | undefined;

    draggedProduct: Product | undefined | null;

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
