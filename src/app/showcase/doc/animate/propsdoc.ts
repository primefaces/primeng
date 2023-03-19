import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>enterClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Selector to define the CSS class for enter animation.</td>
                    </tr>
                    <tr>
                        <td>leaveClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Selector to define the CSS class for leave animation.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
