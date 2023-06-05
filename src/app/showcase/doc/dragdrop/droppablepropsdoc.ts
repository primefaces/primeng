import { Component, Input } from '@angular/core';

@Component({
    selector: 'droppableprops-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>dragEffect</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines the cursor style, valid values are none, copy, move, link, copyMove, copyLink, linkMove and all.</td>
                    </tr>
                    <tr>
                        <td>dragHandle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Selector to define the drag handle, by default anywhere on the target element is a drag handle to start dragging.</td>
                    </tr>
                    <tr>
                        <td>pDraggableDisabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the element is draggable, useful for conditional cases.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class DroppablePropsDoc {
    @Input() id: string;

    @Input() title: string;
}
