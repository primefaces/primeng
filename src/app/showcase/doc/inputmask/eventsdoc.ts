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
                        <td>onFocus</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when input receives focus.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event: Browser event</td>
                        <td>Callback to invoke when input loses focus.</td>
                    </tr>
                    <tr>
                        <td>onComplete</td>
                        <td>-</td>
                        <td>Callback to invoke on when user completes the mask pattern.</td>
                    </tr>
                    <tr>
                        <td>onInput</td>
                        <td>-</td>
                        <td>Callback to invoke on when the input field value is altered.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>-</td>
                        <td>Callback to invoke when inputmask clears the value.</td>
                    </tr>
                    <tr>
                        <td>onKeydown</td>
                        <td>event: KeyboardEvent</td>
                        <td>Callback to invoke on when the input receives a keydown event.</td>
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
