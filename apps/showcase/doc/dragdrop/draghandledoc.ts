import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'drag-drop-drag-handle-demo',
    standalone: true,
    imports: [DragDropModule, PanelModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p><i>dragHandle</i> is used to restrict dragging unless mousedown occurs on the specified element. Panel below can only be dragged using its header.</p>
        </app-docsectiontext>
        <div class="card">
            <div pDraggable dragHandle=".p-panel-header" class="w-60">
                <p-panel header="Drag Header"> Content </p-panel>
            </div>
        </div>
        <app-code selector="drag-drop-drag-handle-demo" [extFiles]="extFiles"></app-code>
    `
})
export class DragHandleDoc {
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
