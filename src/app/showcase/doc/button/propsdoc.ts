import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <h3>Properties of pButton</h3>
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
                        <td>label</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text of the button.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the icon.</td>
                    </tr>
                    <tr>
                        <td>iconPos</td>
                        <td>string</td>
                        <td>left</td>
                        <td>Position of the icon, valid values are "left" and "right".</td>
                    </tr>
                    <tr>
                        <td>loading</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the button is in loading state.</td>
                    </tr>
                    <tr>
                        <td>loadingIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon to display in loading state.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Properties of p-button</h3>
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
                        <td>type</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Type of the button.</td>
                    </tr>
                    <tr>
                        <td>label</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text of the button.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the icon.</td>
                    </tr>
                    <tr>
                        <td>iconPos</td>
                        <td>string</td>
                        <td>left</td>
                        <td>Position of the icon, valid values are "left" and "right".</td>
                    </tr>
                    <tr>
                        <td>badge</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Value of the badge.</td>
                    </tr>
                    <tr>
                        <td>badgeClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the badge.</td>
                    </tr>
                    <tr>
                        <td>loading</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the button is in loading state.</td>
                    </tr>
                    <tr>
                        <td>loadingIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon to display in loading state.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the element.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the element.</td>
                    </tr>
                    <tr>
                        <td>onClick</td>
                        <td>event</td>
                        <td>null</td>
                        <td>Callback to execute when button is clicked.</td>
                    </tr>
                    <tr>
                        <td>onFocus</td>
                        <td>event</td>
                        <td>null</td>
                        <td>Callback to execute when button is focused.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event</td>
                        <td>null</td>
                        <td>Callback to execute when button loses focus.</td>
                    </tr>
                    <tr>
                        <td>ariaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Used to define a string that autocomplete attribute the current element.</td>
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
