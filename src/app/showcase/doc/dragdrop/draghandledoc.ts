import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'drag-drop-drag-handle-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p><i>dragHandle</i> is used to restrict dragging unless mousedown occurs on the specified element. Panel below can only be dragged using its header.</p>
        </app-docsectiontext>
        <div class="card">
            <div pDraggable dragHandle=".p-panel-header" class="w-15rem">
                <p-panel header="Drag Header"> Content </p-panel>
            </div>
        </div>
        <app-code [code]="code" selector="drag-drop-drag-handle-demo" [extFiles]="extFiles"></app-code>
    </section>`
})
export class DragHandleDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div pDraggable dragHandle=".p-panel-header" class="w-15rem">
    <p-panel header="Drag Header">
        Content
    </p-panel>
</div>`,
        html: `
<div class="card">
    <div pDraggable dragHandle=".p-panel-header" class="w-15rem">
        <p-panel header="Drag Header">
            Content
        </p-panel>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'drag-drop-drag-handle-demo',
    templateUrl: './drag-drop-drag-handle-demo.html',
    styleUrls: ['./drag-drop-drag-handle-demo.scss']
})
export class DragDropDragHandleDemo {}`,
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
