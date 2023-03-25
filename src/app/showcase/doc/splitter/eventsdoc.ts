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
                        <td>onResizeStart</td>
                        <td>
                            event.originalEvent: Original event <br />
                            event.sizes: Sizes of the panels as an array
                        </td>
                        <td>Callback to invoke when resize starts.</td>
                    </tr>
                    <tr>
                        <td>onResizeEnd</td>
                        <td>
                            event.originalEvent: Original event <br />
                            event.sizes: Sizes of the panels as an array
                        </td>
                        <td>Callback to invoke when resize ends.</td>
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
