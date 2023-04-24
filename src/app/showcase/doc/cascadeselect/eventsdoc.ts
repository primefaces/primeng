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
                        <td>onChange</td>
                        <td>
                            event.originalEvent: Original event <br />
                            event.value: Selected option value
                        </td>
                        <td>Callback to invoke on value change.</td>
                    </tr>
                    <tr>
                        <td>onGroupChange</td>
                        <td>
                            event.originalEvent: Original event <br />
                            event.value: Selected option group
                        </td>
                        <td>Callback to invoke when a group changes.</td>
                    </tr>
                    <tr>
                        <td>onBeforeShow</td>
                        <td>-</td>
                        <td>Callback to invoke before the overlay is shown.</td>
                    </tr>
                    <tr>
                        <td>onBeforeHide</td>
                        <td>-</td>
                        <td>Callback to invoke before the overlay is hidden.</td>
                    </tr>
                    <tr>
                        <td>onShow</td>
                        <td>-</td>
                        <td>Callback to invoke when the overlay is shown.</td>
                    </tr>
                    <tr>
                        <td>onHide</td>
                        <td>-</td>
                        <td>Callback to invoke when the overlay is hidden.</td>
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
