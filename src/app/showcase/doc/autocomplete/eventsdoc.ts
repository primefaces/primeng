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
                        <td>completeMethod</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.query: Value to search with
                        </td>
                        <td>Callback to invoke to search for suggestions.</td>
                    </tr>
                    <tr>
                        <td>onFocus</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when autocomplete gets focus.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when autocomplete loses focus.</td>
                    </tr>
                    <tr>
                        <td>onKeyUp</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when a user releases a key.</td>
                    </tr>
                    <tr>
                        <td>onSelect</td>
                        <td>value: Selected value</td>
                        <td>Callback to invoke when a suggestion is selected.</td>
                    </tr>
                    <tr>
                        <td>onUnselect</td>
                        <td>value: Unselected value in multiple mode</td>
                        <td>Callback to invoke when a selected value is removed.</td>
                    </tr>
                    <tr>
                        <td>onDropdownClick</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.query: Current value of the input field
                        </td>
                        <td>Callback to invoke when dropdown button is clicked.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>-</td>
                        <td>Callback to invoke when input field is cleared.</td>
                    </tr>
                    <tr>
                        <td>onShow</td>
                        <td>event: Animation event</td>
                        <td>Callback to invoke when autocomplete overlay gets visible.</td>
                    </tr>
                    <tr>
                        <td>onHide</td>
                        <td>-</td>
                        <td>Callback to invoke when autocomplete overlay gets hidden.</td>
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
