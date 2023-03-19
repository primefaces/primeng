import { Component, Input } from '@angular/core';

@Component({
    selector: 'draggableevents-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>onDragStart</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when drag begins.</td>
                    </tr>
                    <tr>
                        <td>onDrag</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke on dragging.</td>
                    </tr>
                    <tr>
                        <td>onDragEnd</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when drag ends.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class DraggableEventsDoc {
    @Input() id: string;

    @Input() title: string;
}
