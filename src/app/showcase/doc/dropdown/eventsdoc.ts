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
                        <td>event: Click event</td>
                        <td>Callback to invoke when component is clicked.</td>
                    </tr>
                    <tr>
                        <td>onChange</td>
                        <td>
                            event.originalEvent: Browser event<br />
                            event.value: Selected option value
                        </td>
                        <td>Callback to invoke when value of dropdown changes.</td>
                    </tr>
                    <tr>
                        <td>onFilter</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.filter: Filter value used in filtering.
                        </td>
                        <td>Callback to invoke when data is filtered.</td>
                    </tr>
                    <tr>
                        <td>onFocus</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when dropdown gets focus.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when dropdown loses focus.</td>
                    </tr>
                    <tr>
                        <td>onShow</td>
                        <td>event: Animation event</td>
                        <td>Callback to invoke when dropdown overlay gets visible.</td>
                    </tr>
                    <tr>
                        <td>onHide</td>
                        <td>event: Animation event</td>
                        <td>Callback to invoke when dropdown overlay gets hidden.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>event: Animation event</td>
                        <td>Callback to invoke when dropdown clears the value.</td>
                    </tr>
                    <tr>
                        <td>onLazyLoad</td>
                        <td>
                            event.first: First index of the new data range to be loaded.<br />
                            event.last: Last index of the new data range to be loaded.
                        </td>
                        <td>Callback to invoke in lazy mode to load new data.</td>
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
