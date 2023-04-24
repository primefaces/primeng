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
                        <td>onBeforeToggle</td>
                        <td>
                            event.originalEvent: browser event<br />
                            event.collapsed: state as a boolean
                        </td>
                        <td>Callback to invoke before content toggle.</td>
                    </tr>
                    <tr>
                        <td>onAfterToggle</td>
                        <td>
                            event.originalEvent: browser event<br />
                            event.collapsed: state as a boolean
                        </td>
                        <td>Callback to invoke after content toggle.</td>
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
