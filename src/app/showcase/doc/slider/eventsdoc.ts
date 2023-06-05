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
                            event.originalEvent: Slide event <br />
                            event.value: New value <br />
                            event.values: Values in range mode <br />
                        </td>
                        <td>Callback to invoke on value change via slide.</td>
                    </tr>
                    <tr>
                        <td>onSlideEnd</td>
                        <td>
                            event.originalEvent: Mouseup event<br />
                            event.value: New value <br />
                            event.values: Values in range mode <br />
                        </td>
                        <td>Callback to invoke when slide stops.</td>
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
