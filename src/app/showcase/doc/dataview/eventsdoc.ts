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
                        <td>onLazyLoad</td>
                        <td>
                            event.first = First row offset <br />
                            event.rows = Number of rows per page <br />
                        </td>
                        <td>Callback to invoke when paging, sorting or filtering happens in lazy mode.</td>
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
                            event.sortField: Name of the sort field.<br />
                            event.sortOrder: Order of the sort.
                        </td>
                        <td>Callback to invoke when sorting occurs.</td>
                    </tr>
                    <tr>
                        <td>onChangeLayout</td>
                        <td>event.layout: New layout</td>
                        <td>Callback to invoke when changing layout.</td>
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
