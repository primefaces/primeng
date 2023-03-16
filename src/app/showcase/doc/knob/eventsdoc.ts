import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <div>
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
                        <td>value: New value</td>
                        <td>Callback to invoke when the value changes.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class EventsDoc {
    @Input() id: string;

    @Input() title: string;
}
