import { Component, Input } from '@angular/core';

@Component({
    selector: 'messagesprops-demo',
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
                        <td>value</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of messages to display.</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Defines if message box can be closed by the click icon.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>enableService</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether displaying services messages are enabled.</td>
                    </tr>
                    <tr>
                        <td>escape</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether displaying messages would be escaped or not.</td>
                    </tr>
                    <tr>
                        <td>key</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Id to match the key of the message to enable scoping in service based messaging.</td>
                    </tr>
                    <tr>
                        <td>showTransitionOptions</td>
                        <td>string</td>
                        <td>300ms ease-out</td>
                        <td>Transition options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransitionOptions</td>
                        <td>string</td>
                        <td>200ms cubic-bezier(0.86, 0, 0.07, 1)</td>
                        <td>Transition options of the hide animation.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class MessagesPropsDoc {
    @Input() id: string;

    @Input() title: string;
}
