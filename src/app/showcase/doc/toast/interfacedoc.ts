import { Component, Input } from '@angular/core';

@Component({
    selector: 'interface-doc',
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
                        <td>severity</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Severity level of the message, valid values are "success", "info", "warn" and "error".</td>
                    </tr>
                    <tr>
                        <td>summary</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Summary text of the message.</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Detail text of the message.</td>
                    </tr>
                    <tr>
                        <td>id</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Identifier of the message.</td>
                    </tr>
                    <tr>
                        <td>key</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Key of the message in case message is targeted to a specific toast component.</td>
                    </tr>
                    <tr>
                        <td>life</td>
                        <td>number</td>
                        <td>3000</td>
                        <td>Number of time in milliseconds to wait before closing the message.</td>
                    </tr>
                    <tr>
                        <td>sticky</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the message should be automatically closed based on life property or kept visible.</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, displays a close icon to hide a message manually.</td>
                    </tr>
                    <tr>
                        <td>data</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Arbitrary object to associate with the message.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the message.</td>
                    </tr>
                    <tr>
                        <td>contentStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the content.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class InterfaceDoc {
    @Input() id: string;

    @Input() title: string;
}
