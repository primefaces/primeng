import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
    selector: 'dropindicator-doc',
    standalone: true,
    imports: [CommonModule, DragDropModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When a suitable draggable enters a droppable area, the area gets <i>p-draggable-enter</i> class that can be used to style the droppable section.</p>
        </app-docsectiontext>
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
        <app-code [extFiles]="extFiles"></app-code>
    `
})
export class DropIndicatorDoc {
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
