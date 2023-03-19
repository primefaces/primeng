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
                        <td>onReorder</td>
                        <td>event: browser event</td>
                        <td>Callback to invoke when list is reordered.</td>
                    </tr>
                    <tr>
                        <td>onSelectionChange</td>
                        <td>
                            originalEvent: browser event<br />
                            value: Current selection
                        </td>
                        <td>Callback to invoke when selection changes.</td>
                    </tr>
                    <tr>
                        <td>onFilterEvent</td>
                        <td>
                            originalEvent: browser event<br />
                            value: Current filter values
                        </td>
                        <td>Callback to invoke when filtering occurs.</td>
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
