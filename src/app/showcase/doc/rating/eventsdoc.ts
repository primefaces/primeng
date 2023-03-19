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
                        <td>onRate</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.value: selected value
                        </td>
                        <td>Callback to invoke on rate change.</td>
                    </tr>
                    <tr>
                        <td>onCancel</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when value is removed.</td>
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
