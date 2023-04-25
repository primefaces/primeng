import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Any property as style and class are passed to the main container element. Following are the additional properties to configure the component.</p>
        </app-docsectiontext>
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
                        <td>field</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the property to display on a chip.</td>
                    </tr>
                    <tr>
                        <td>max</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum number of entries allowed.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
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
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Advisory information to display on input.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Index of the element in tabbing order.</td>
                    </tr>
                    <tr>
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the focus input to match a label defined for the component.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
                    </tr>
                    <tr>
                        <td>allowDuplicate</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to allow duplicate values or not.</td>
                    </tr>
                    <tr>
                        <td>inputStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the input field.</td>
                    </tr>
                    <tr>
                        <td>inputStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the input field.</td>
                    </tr>
                    <tr>
                        <td>addOnTab</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to add an item on tab key press.</td>
                    </tr>
                    <tr>
                        <td>addOnBlur</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to add an item when the input loses focus.</td>
                    </tr>
                    <tr>
                        <td>separator</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Separator char to add an item when pressed in addition to the enter key.</td>
                    </tr>
                    <tr>
                        <td>showClear</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, a clear icon is displayed to clear the value.</td>
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
