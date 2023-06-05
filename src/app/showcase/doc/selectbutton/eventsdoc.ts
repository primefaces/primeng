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
                        <td>Callback to invoke when value changes.</td>
                    </tr>
                    <tr>
                        <td>onOptionClick</td>
                        <td>
                            event.originalEvent: browser event<br />
                            event.option: SelectItem instance of the clicked button<br />
                            event.index: Index of the clicked button
                        </td>
                        <td>Callback to invoke when a button is clicked.</td>
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
