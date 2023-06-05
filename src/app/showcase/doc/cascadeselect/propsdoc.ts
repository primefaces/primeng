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
                        <td>null</td>
                        <td>Property name or getter function to use as the label of an option.</td>
                    </tr>
                    <tr>
                        <td>optionValue</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Property name or getter function to use as the value of an option, defaults to the option itself when not defined.</td>
                    </tr>
                    <tr>
                        <td>optionGroupLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Property name or getter function to use as the label of an option group.</td>
                    </tr>
                    <tr>
                        <td>optionGroupChildren</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Property name or getter function to retrieve the items of a group.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Default text to display when no option is selected.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>dataKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>A property to uniquely identify an option.</td>
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
                        <td>Identifier of the underlying input element.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Id of the element or "body" for document where the overlay should be appended to.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>panelStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the overlay panel.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>panelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the overlay panel.</td>
                    </tr>
                    <tr>
                        <td>inputLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the input for accessibility.</td>
                    </tr>
                    <tr>
                        <td>ariaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the input for accessibility.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Specifies one or more IDs in the DOM that labels the input field.</td>
                    </tr>
                    <tr>
                        <td>showClear</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, a clear icon is displayed to clear the value.</td>
                    </tr>
                    <tr>
                        <td>overlayOptions</td>
                        <td>OverlayOptions</td>
                        <td>null</td>
                        <td>Whether to use overlay API feature. The properties of <a href="#" [routerLink]="['/overlay']">overlay API</a> can be used like an object in it.</td>
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
