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
                        <td>onMoveToTarget</td>
                        <td>event.items: Moved items array</td>
                        <td>Callback to invoke when items are moved from source to target.</td>
                    </tr>
                    <tr>
                        <td>onMoveToSource</td>
                        <td>event.items: Moved items array</td>
                        <td>Callback to invoke when items are moved from target to source.</td>
                    </tr>
                    <tr>
                        <td>onMoveAllToTarget</td>
                        <td>event.items: Moved items array</td>
                        <td>Callback to invoke when all items are moved from source to target.</td>
                    </tr>
                    <tr>
                        <td>onMoveAllToSource</td>
                        <td>event.items: Moved items array</td>
                        <td>Callback to invoke when all items are moved from target to source.</td>
                    </tr>
                    <tr>
                        <td>onSourceReorder</td>
                        <td>event.items: Moved items array</td>
                        <td>Callback to invoke when items are reordered within source list.</td>
                    </tr>
                    <tr>
                        <td>onTargetReorder</td>
                        <td>event.items: Moved items array</td>
                        <td>Callback to invoke when items are reordered within target list.</td>
                    </tr>
                    <tr>
                        <td>onSourceSelect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            items: Selected items array
                        </td>
                        <td>Callback to invoke when items are selected within source list.</td>
                    </tr>
                    <tr>
                        <td>onTargetSelect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            items: Selected items array
                        </td>
                        <td>Callback to invoke when items are selected within target list.</td>
                    </tr>
                    <tr>
                        <td>onSourceFilter</td>
                        <td>
                            event.query: Filter value <br />
                            items: Filtered items
                        </td>
                        <td>Callback to invoke when the source list is filtered</td>
                    </tr>
                    <tr>
                        <td>onTargetFilter</td>
                        <td>
                            event.query: Filter value <br />
                            items: Filtered items
                        </td>
                        <td>Callback to invoke when the target list is filtered</td>
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
