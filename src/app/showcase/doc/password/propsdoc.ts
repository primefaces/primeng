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
                        <td>promptLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text to prompt password entry. Defaults to PrimeNG <a href="#" [routerLink]="['/i18n']">I18N API</a> configuration.</td>
                    </tr>
                    <tr>
                        <td>mediumRegex</td>
                        <td>string</td>
                        <td>Regex for a medium level password.</td>
                        <td>^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.&#123;6,&#125;).</td>
                    </tr>
                    <tr>
                        <td>strongRegex</td>
                        <td>string</td>
                        <td>Regex for a strong level password.</td>
                        <td>^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.&#123;8,&#125;)</td>
                    </tr>
                    <tr>
                        <td>weakLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text for a weak password. Defaults to PrimeNG <a href="#" [routerLink]="['/i18n']">I18N API</a> configuration.</td>
                    </tr>
                    <tr>
                        <td>mediumLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text for a medium password. Defaults to PrimeNG <a href="#" [routerLink]="['/i18n']">I18N API</a> configuration.</td>
                    </tr>
                    <tr>
                        <td>strongLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text for a strong password. Defaults to PrimeNG <a href="#" [routerLink]="['/i18n']">I18N API</a> configuration.</td>
                    </tr>
                    <tr>
                        <td>feedback</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show the strength indicator or not.</td>
                    </tr>
                    <tr>
                        <td>toggleMask</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to show an icon to display the password as plain text.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Id of the element or "body" for document where the overlay should be appended to.</td>
                    </tr>
                    <tr>
                        <td>inputStyle</td>
                        <td>any</td>
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
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the accessible input element.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the element.</td>
                    </tr>
                    <tr>
                        <td>panelStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the overlay panel element.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the element.</td>
                    </tr>
                    <tr>
                        <td>panelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the overlay panel element.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Advisory information to display on input.</td>
                    </tr>
                    <tr>
                        <td>label</td>
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
                        <td>maxLength</td>
                        <td>number</td>
                        <td>null</td>
                        <td>specifies the maximum number of characters allowed in the input element.</td>
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
