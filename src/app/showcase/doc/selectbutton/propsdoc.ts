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
                        <td>options</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of selectitems to display as the available options.</td>
                    </tr>
                    <tr>
                        <td>optionLabel</td>
                        <td>string</td>
                        <td>label</td>
                        <td>Name of the label field of an option.</td>
                    </tr>
                    <tr>
                        <td>optionValue</td>
                        <td>string</td>
                        <td>value</td>
                        <td>Name of the value field of an option.</td>
                    </tr>
                    <tr>
                        <td>optionDisabled</td>
                        <td>string</td>
                        <td>disabled</td>
                        <td>Name of the disabled field of an option.</td>
                    </tr>
                    <tr>
                        <td>multiple</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, allows selecting multiple values.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Index of the element in tabbing order.</td>
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
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
                    </tr>
                    <tr>
                        <td>dataKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>A property to uniquely identify a value in options.</td>
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
