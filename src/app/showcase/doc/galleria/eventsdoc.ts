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
                        <td>activeIndexChange</td>
                        <td>index: Index of the activated item</td>
                        <td>This event is triggerred when active element is changed.</td>
                    </tr>
                    <tr>
                        <td>visibleChange</td>
                        <td>boolean</td>
                        <td>This event is triggerred if visibility changed in fullscreen mode.</td>
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
