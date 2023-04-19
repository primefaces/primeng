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
                        <td>onShow</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog is shown.</td>
                    </tr>
                    <tr>
                        <td>onHide</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog is hidden.</td>
                    </tr>
                    <tr>
                        <td>visibleChange</td>
                        <td>event: Event object</td>
                        <td>Callback to invoke when dialog visibility is changed.</td>
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
