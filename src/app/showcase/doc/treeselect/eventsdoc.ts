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
                        <td>onFilter</td>
                        <td>
                            event.filter: Filter value used in filtering.<br />
                            event.filteredValue: Filtered data after running the filtering.
                        </td>
                        <td>Callback to invoke when data is filtered.</td>
                    </tr>
                    <tr>
                        <td>onNodeSelect</td>
                        <td>node: Node instance</td>
                        <td>Callback to invoke when a node is selected.</td>
                    </tr>
                    <tr>
                        <td>onNodeUnselect</td>
                        <td>node: Node instance</td>
                        <td>Callback to invoke when a node is unselected.</td>
                    </tr>
                    <tr>
                        <td>onNodeExpand</td>
                        <td>node: Node instance</td>
                        <td>Callback to invoke when a node is expanded.</td>
                    </tr>
                    <tr>
                        <td>onNodeCollapse</td>
                        <td>node: Node instance</td>
                        <td>Callback to invoke when a node is collapsed.</td>
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
