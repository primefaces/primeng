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
                        <td>onNodeExpand</td>
                        <td>
                            event.originalEvent: Browser event<br />
                            node: Expanded node.
                        </td>
                        <td>Callback to invoke when a node is expanded.</td>
                    </tr>
                    <tr>
                        <td>onNodeCollapse</td>
                        <td>
                            event.originalEvent: Browser event<br />
                            node: Collapsed node.
                        </td>
                        <td>Callback to invoke when a node is collapsed.</td>
                    </tr>
                    <tr>
                        <td>onPage</td>
                        <td>
                            event.first: Index of first record in page<br />
                            event.rows: Number of rows on the page
                        </td>
                        <td>Callback to invoke when pagination occurs.</td>
                    </tr>
                    <tr>
                        <td>onSort</td>
                        <td>
                            event.field: Field name of the sorted column<br />
                            event.order: Sort order as 1 or -1<br />
                            event.multisortmeta: Sort metadata in multi sort mode. See multiple sorting section for the structure of this object.
                        </td>
                        <td>Callback to invoke when a column gets sorted.</td>
                    </tr>
                    <tr>
                        <td>onFilter</td>
                        <td>
                            event.filters: Filters object having a field as the property key and an object with value, matchMode as the property value.<br />
                            event.filteredValue: Filtered data after running the filtering.
                        </td>
                        <td>Callback to invoke when data is filtered.</td>
                    </tr>
                    <tr>
                        <td>onLazyLoad</td>
                        <td>
                            event.first = First row offset <br />
                            event.last: Last index of the new data range to be loaded. <br />
                            event.rows = Number of rows per page <br />
                            event.sortField = Field name to sort with <br />
                            event.sortOrder = Sort order as number, 1 for asc and -1 for dec <br />
                            event.multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
                        </td>
                        event.filters: FilterMetadata object having field as key and filter value, filter matchMode as value<br />
                        event.globalFilter: Value of the global filter if available
                        <td>Callback to invoke when paging, sorting or filtering happens in lazy mode.</td>
                    </tr>
                    <tr>
                        <td>onColResize</td>
                        <td>
                            event.element: Resized column header <br />
                            event.delta: Change of width in number of pixels
                        </td>
                        <td>Callback to invoke when a column is resized.</td>
                    </tr>
                    <tr>
                        <td>onColReorder</td>
                        <td>
                            event.dragIndex: Index of the dragged column <br />
                            event.dropIndex: Index of the dropped column <br />
                            event.columns: Columns array after reorder.
                        </td>
                        <td>Callback to invoke when a column is reordered.</td>
                    </tr>
                    <tr>
                        <td>onNodeSelect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.node: Selected node
                        </td>
                        <td>Callback to invoke when a node is selected.</td>
                    </tr>
                    <tr>
                        <td>onNodeUnselect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.data: Unselected node
                        </td>
                        <td>Callback to invoke when a node is unselected.</td>
                    </tr>
                    <tr>
                        <td>onContextMenuSelect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.node: Selected node
                        </td>
                        <td>Callback to invoke when a node is selected with right click.</td>
                    </tr>
                    <tr>
                        <td>onHeaderCheckboxToggle</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.checked: State of the header checkbox
                        </td>
                        <td>Callback to invoke when state of header checkbox changes.</td>
                    </tr>
                    <tr>
                        <td>onEditInit</td>
                        <td>
                            event.column: Column object of the cell<br />
                            event.data: Node data
                        </td>
                        <td>Callback to invoke when a cell switches to edit mode.</td>
                    </tr>
                    <tr>
                        <td>onEditComplete</td>
                        <td>
                            event.column: Column object of the cell<br />
                            event.data: Node data
                        </td>
                        <td>Callback to invoke when cell edit is completed.</td>
                    </tr>
                    <tr>
                        <td>onEditCancel</td>
                        <td>
                            event.column: Column object of the cell<br />
                            event.data: Node data
                        </td>
                        <td>Callback to invoke when cell edit is cancelled with escape key.</td>
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
