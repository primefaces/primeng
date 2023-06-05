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
                        <td>onClick</td>
                        <td>
                            event.originalEvent: Click event<br />
                            event.value: Value of the radio button
                        </td>
                        <td>Callback to invoke on radio button click.</td>
                    </tr>
                    <tr>
                        <td>onFocus</td>
                        <td>event: Focus event</td>
                        <td>Callback to invoke when the radio button receives focus.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event: Blur event</td>
                        <td>Callback to invoke when the radio button loses focus.</td>
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
