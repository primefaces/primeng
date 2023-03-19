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
                        <td>type</td>
                        <td>string</td>
                        <td>text</td>
                        <td>HTML5 input type</td>
                    </tr>
                    <tr>
                        <td>mask</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Mask pattern.</td>
                    </tr>
                    <tr>
                        <td>slotChar</td>
                        <td>string</td>
                        <td>_</td>
                        <td>Placeholder character in mask, default is underscore.</td>
                    </tr>
                    <tr>
                        <td>autoClear</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Clears the incomplete value on blur.</td>
                    </tr>
                    <tr>
                        <td>keepBuffer</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that whether to clean buffer value from model.</td>
                    </tr>
                    <tr>
                        <td>unmask</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if ngModel sets the raw unmasked value to bound value or the formatted mask value.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the input field.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the input field.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Advisory information to display on input.</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Size of the input field.</td>
                    </tr>
                    <tr>
                        <td>maxlength</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum number of character allows in the input field.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Specifies tab order of the element.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element value cannot be altered.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that an input field is read-only.</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the input field.</td>
                    </tr>
                    <tr>
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the focus input to match a label defined for the component.</td>
                    </tr>
                    <tr>
                        <td>required</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that an input field must be filled out before submitting the form.</td>
                    </tr>
                    <tr>
                        <td>characterPattern</td>
                        <td>string</td>
                        <td>[A-Za-z]</td>
                        <td>Regex pattern for alpha characters</td>
                    </tr>
                    <tr>
                        <td>autoFocus</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, the input gets a focus automatically on load.</td>
                    </tr>
                    <tr>
                        <td>showClear</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, a clear icon is displayed to clear the value.</td>
                    </tr>
                    <tr>
                        <td>autocomplete</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Used to define a string that autocomplete attribute the current element.</td>
                    </tr>
                    <tr>
                        <td>ariaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Used to define a string that labels the input element.</td>
                    </tr>
                    <tr>
                        <td>ariaRequired</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Used to indicate that user input is required on an element before a form can be submitted.</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Title text of the input text.</td>
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
