import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
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
                        <td>onVisibleChange</td>
                        <td>visible: Whether the actions are visible.</td>
                        <td>Fired when the visibility of element changed.</td>
                    </tr>
                    <tr>
                        <td>onClick</td>
                        <td>event: Browser event.</td>
                        <td>Fired when the button element clicked.</td>
                    </tr>
                    <tr>
                        <td>onShow</td>
                        <td>-</td>
                        <td>Fired when the actions are visible.</td>
                    </tr>
                    <tr>
                        <td>onHide</td>
                        <td>-</td>
                        <td>Fired when the actions are hidden.</td>
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
