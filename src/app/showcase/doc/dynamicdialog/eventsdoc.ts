import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"> </app-docsectiontext>
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
                        <td>onClose</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog is closed.</td>
                    </tr>
                    <tr>
                        <td>onDestroy</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog is destroyed.</td>
                    </tr>
                    <tr>
                        <td>onMaximize</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog maximized or unmaximized.</td>
                    </tr>
                    <tr>
                        <td>onDragStart</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog dragging is started.</td>
                    </tr>
                    <tr>
                        <td>onDragEnd</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog dragging is completed.</td>
                    </tr>
                    <tr>
                        <td>onResizeInit</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog resizing is initiated.</td>
                    </tr>
                    <tr>
                        <td>onResizeEnd</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog resizing is completed.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class EventsDoc {
    @Input() id: string;

    @Input() title: string;
}
