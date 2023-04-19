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
                        <td>stars</td>
                        <td>number</td>
                        <td>5</td>
                        <td>Number of stars.</td>
                    </tr>
                    <tr>
                        <td>cancel</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When specified a cancel icon is displayed to allow removing the value.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, changing the value is not possible.</td>
                    </tr>
                    <tr>
                        <td>iconOnClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the on icon.</td>
                    </tr>
                    <tr>
                        <td>iconOffClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the off icon.</td>
                    </tr>
                    <tr>
                        <td>iconCancelClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the cancel icon.</td>
                    </tr>
                    <tr>
                        <td>iconOnStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the on icon.</td>
                    </tr>
                    <tr>
                        <td>iconOffStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the off icon.</td>
                    </tr>
                    <tr>
                        <td>iconCancelStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the cancel icon.</td>
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
