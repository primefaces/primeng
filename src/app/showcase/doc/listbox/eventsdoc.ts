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
                            event.originalEvent: browser event<br />
                            event.value: single value or an array of values that are selected
                        </td>
                        <td>Callback to invoke when value of listbox changes.</td>
                    </tr>
                    <tr>
                        <td>onDblClick</td>
                        <td>
                            event.originalEvent: browser event<br />
                            event.value: single value or an array of values that are selected event.option: option that are clicked
                        </td>
                        <td>Callback to invoke when an item is double clicked.</td>
                    </tr>
                    <tr>
                        <td>onClick</td>
                        <td>
                            event.originalEvent: browser event<br />
                            event.value: single value or an array of values that are selected event.option: option that are clicked
                        </td>
                        <td>Callback to invoke when listbox option clicks.</td>
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
