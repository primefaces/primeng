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
                        <td>onPageChange</td>
                        <td>
                            event.first: Index of first record <br />
                            event.rows: Number of rows to display in new page <br />
                            event.page: Index of the new page <br />
                            event.pageCount: Total number of pages <br />
                        </td>
                        <td>Callback to invoke when page changes, the event object contains information about the new state.</td>
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
