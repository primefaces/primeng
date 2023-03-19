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
                        <td>onFocus</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when input receives focus.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when input loses focus.</td>
                    </tr>
                    <tr>
                        <td>onInput</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.value: New value
                        </td>
                        <td>Callback to invoke when the value is entered.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>-</td>
                        <td>Callback to invoke when input field is cleared.</td>
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
