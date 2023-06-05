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
                        <td>onNodeSelect</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Selected node instance.
                        </td>
                        <td>Callback to invoke when a node is selected.</td>
                    </tr>
                    <tr>
                        <td>onNodeUnselect</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Unselected node instance.
                        </td>
                        <td>Callback to invoke when a node is unselected.</td>
                    </tr>
                    <tr>
                        <td>onNodeExpand</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Expanded node instance.
                        </td>
                        <td>Callback to invoke when a node is expanded.</td>
                    </tr>
                    <tr>
                        <td>onNodeCollapse</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Collapsed node instance.
                        </td>
                        <td>Callback to invoke when a node is collapsed.</td>
                    </tr>
                    <tr>
                        <td>onNodeContextMenuSelect</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.node: Selected node instance.
                        </td>
                        <td>Callback to invoke when a node is selected with right click.</td>
                    </tr>
                    <tr>
                        <td>onNodeDrop</td>
                        <td>
                            event.originalEvent: browser event <br />
                            event.dragNode: Dragged node instance <br />
                            event.dropNode: Dropped node instance. event.index: Index of the dropped node within siblings.
                        </td>
                        <td>Callback to invoke when a node is dropped.</td>
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
                        <td>onLazyLoad</td>
                        <td>
                            event.first: First index of the new data range to be loaded.<br />
                            event.last: Last index of the new data range to be loaded.
                        </td>
                        <td>Callback to invoke in lazy mode to load new data.</td>
                    </tr>
                    <tr>
                        <td>onScroll</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke in virtual scroll mode when scroll position changes.</td>
                    </tr>
                    <tr>
                        <td>onScrollIndexChange</td>
                        <td>
                            event.first: First index of the new data range to be loaded.<br />
                            event.last: Last index of the new data range to be loaded.
                        </td>
                        <td>Callback to invoke in virtual scroll mode when scroll position and item's range in view changes.</td>
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
