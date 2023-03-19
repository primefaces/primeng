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
                        <td>onRowSelect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.data: Selected row data or an array if a range is selected with shift key <br />
                            event.type: Type of selection, valid values are "row", "radiobutton" and "checkbox"<br />
                            event.index: Index of the row
                        </td>
                        <td>Callback to invoke when a row is selected.</td>
                    </tr>
                    <tr>
                        <td>onRowUnselect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.data: Unselected data <br />
                            event.type: Type of unselection, valid values are "row" and "checkbox"<br />
                            event.index: Index of the row
                        </td>
                        <td>Callback to invoke when a row is unselected.</td>
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
                            event.last: Last index of the new data range to be loaded <br />
                            event.rows = Number of rows per page <br />
                            event.sortField = Field name to sort with <br />
                            event.sortOrder = Sort order as number, 1 for asc and -1 for dec <br />
                            event.multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.<br />
                            event.filters: FilterMetadata object having field as key and filter value, filter matchMode as value<br />
                            event.globalFilter: Value of the global filter if available
                        </td>
                        <td>Callback to invoke when paging, sorting or filtering happens in lazy mode.</td>
                    </tr>
                    <tr>
                        <td>onRowExpand</td>
                        <td>
                            event.originalEvent: Browser event<br />
                            data: Row data to expand.
                        </td>
                        <td>Callback to invoke when a row is expanded.</td>
                    </tr>
                    <tr>
                        <td>onRowCollapse</td>
                        <td>
                            event.originalEvent: Browser event<br />
                            data: Row data to collapse.
                        </td>
                        <td>Callback to invoke when a row is collapsed.</td>
                    </tr>
                    <tr>
                        <td>onContextMenuSelect</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.data: Selected data
                        </td>
                        <td>Callback to invoke when a row is selected with right click.</td>
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
                            event.columns: Columns array after reorder
                        </td>
                        <td>Callback to invoke when a column is reordered.</td>
                    </tr>
                    <tr>
                        <td>onRowReorder</td>
                        <td>
                            event.dragIndex: Index of the dragged row<br />
                            event.dropIndex: Index of the drop location
                        </td>
                        <td>Callback to invoke when a row is reordered.</td>
                    </tr>
                    <tr>
                        <td>onEditInit</td>
                        <td>
                            event.field: Column object of the cell<br />
                            event.data: Row data
                        </td>
                        <td>Callback to invoke when a cell switches to edit mode.</td>
                    </tr>
                    <tr>
                        <td>onEditComplete</td>
                        <td>
                            event.field: Column object of the cell<br />
                            event.data: Row data <br />
                            event.originalEvent: Browser event
                        </td>
                        <td>Callback to invoke when cell edit is completed.</td>
                    </tr>
                    <tr>
                        <td>onEditCancel</td>
                        <td>
                            event.field: Column object of the cell<br />
                            event.data: Row data <br />
                            event.originalEvent: Browser event
                        </td>
                        <td>Callback to invoke when cell edit is cancelled with escape key.</td>
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
                        <td>onStateSave</td>
                        <td>state: Table state</td>
                        <td>Callback to invoke table state is saved.</td>
                    </tr>
                    <tr>
                        <td>onStateRestore</td>
                        <td>state: Table state</td>
                        <td>Callback to invoke table state is restored.</td>
                    </tr>
                    <tr>
                        <td>selectAllChange</td>
                        <td>
                            event.originalEvent: Browser event <br />
                            event.checked: State of the header checkbox
                        </td>
                        <td>Callback to invoke when all data is selected. The selectAll property is required for this callback.</td>
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
