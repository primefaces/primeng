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
                            event.originalEvent: Browser click event event.option: selected option <br />
                            event.selected: selected value <br />
                        </td>
                        <td>Callback to invoke when component is clicked.</td>
                    </tr>
                    <tr>
                        <td>onChange</td>
                        <td>
                            event.originalEvent: browser event<br />
                            event.value: Current selected values<br />
                            event.itemValue: Toggled item value
                        </td>
                        <td>Callback to invoke when value changes.</td>
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
                        <td>event.originalEvent: browser event</td>
                        <td>Callback to invoke when multiselect receives focus.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event.originalEvent: browser event</td>
                        <td>Callback to invoke when multiselect loses focus.</td>
                    </tr>
                    <tr>
                        <td>onPanelShow</td>
                        <td>-</td>
                        <td>Callback to invoke when overlay panel becomes visible.</td>
                    </tr>
                    <tr>
                        <td>onPanelHide</td>
                        <td>-</td>
                        <td>Callback to invoke when overlay panel becomes hidden.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>-</td>
                        <td>Callback to invoke when input field is cleared.</td>
                    </tr>
                    <tr>
                        <td>onLazyLoad</td>
                        <td>
                            event.first: First index of the new data range to be loaded.<br />
                            event.last: Last index of the new data range to be loaded.
                        </td>
                        <td>Callback to invoke in lazy mode to load new data.</td>
                    </tr>
                    <tr>
                        <td>onRemove</td>
                        <td>event: MultiselectOnRemoveEvent</td>
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
