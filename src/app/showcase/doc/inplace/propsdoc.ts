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
                        <td>active</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the content is displayed or not.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays a button to switch back to display mode.</td>
                    </tr>
                    <tr>
                        <td>preventClick</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, instead of click events, the component can be controlled full programmatic with activate() and deactivate() functions.</td>
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
                        <td>closeIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the close icon.</td>
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
