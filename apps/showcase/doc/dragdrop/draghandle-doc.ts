import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'drag-handle-doc',
    standalone: true,
    imports: [DragDropModule, PanelModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p><i>dragHandle</i> is used to restrict dragging unless mousedown occurs on the specified element. Panel below can only be dragged using its header.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div pDraggable dragHandle=".p-panel-header" class="w-60">
                <p-panel header="Drag Header"> Content </p-panel>
            </div>
            <app-code [extFiles]="['Product']"></app-code>
        </app-demo-wrapper>
    `
})
export class DragHandleDoc {}
