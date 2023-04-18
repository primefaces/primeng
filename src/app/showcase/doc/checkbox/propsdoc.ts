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
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the checkbox group.</td>
                    </tr>
                    <tr>
                        <td>value</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Value of the checkbox.</td>
                    </tr>
                    <tr>
                        <td>label</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the checkbox.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
                    </tr>
                    <tr>
                        <td>binary</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Allows to select a boolean value instead of multiple values.</td>
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
                        <td>ariaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Used to define a string that labels the input element.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
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
                        <td>labelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the label.</td>
                    </tr>
                    <tr>
                        <td>checkboxIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon class of the checkbox icon.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component cannot be edited.</td>
                    </tr>
                    <tr>
                        <td>required</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that checkbox must be checked before submitting the form.</td>
                    </tr>
                    <tr>
                        <td>trueValue</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Value in checked state.</td>
                    </tr>
                    <tr>
                        <td>falseValue</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Value in unchecked state.</td>
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
