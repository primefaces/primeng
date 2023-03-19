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
                        <td>onScroll</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when scroll position changes.</td>
                    </tr>
                    <tr>
                        <td>onScrollIndexChange</td>
                        <td>
                            event.first: First index of the new data range to be loaded.<br />
                            event.last: Last index of the new data range to be loaded.
                        </td>
                        <td>Callback to invoke when scroll position and item's range in view changes.</td>
                    </tr>
                    <tr>
                        <td>onLazyLoad</td>
                        <td>
                            event.first: First index of the new data range to be loaded.<br />
                            event.last: Last index of the new data range to be loaded.
                        </td>
                        <td>Callback to invoke in lazy mode to load new data.</td>
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
