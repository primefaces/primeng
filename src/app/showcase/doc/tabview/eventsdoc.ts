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
                        <td>onChange</td>
                        <td>
                            event.originalEvent: Click event <br />
                            event.index: Index of the selected tab
                        </td>
                        <td>Callback to invoke on tab change.</td>
                    </tr>
                    <tr>
                        <td>onClose</td>
                        <td>
                            event.originalEvent: Click event <br />
                            event.index: Index of the closed tab <br />
                            event.close: Callback to actually close the tab, only available if controlClose is enabled.
                        </td>
                        <td>Callback to invoke on tab close.</td>
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
