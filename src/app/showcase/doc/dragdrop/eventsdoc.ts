import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
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
                        <td>onDragEnter</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when a draggable enters drop area.</td>
                    </tr>
                    <tr>
                        <td>onDrop</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when a draggable is dropped onto drop area.</td>
                    </tr>
                    <tr>
                        <td>onDragLeave</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when a draggable leave drop area.</td>
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
