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
                        <td>value</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Value of the component.</td>
                    </tr>
                    <tr>
                        <td>format</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to format the value.</td>
                    </tr>
                    <tr>
                        <td>showButtons</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays spinner buttons.</td>
                    </tr>
                    <tr>
                        <td>buttonLayout</td>
                        <td>string</td>
                        <td>stacked</td>
                        <td>Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical".</td>
                    </tr>
                    <tr>
                        <td>incrementButtonClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the increment button.</td>
                    </tr>
                    <tr>
                        <td>decrementButtonClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the decrement button.</td>
                    </tr>
                    <tr>
                        <td>incrementButtonIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the increment button.</td>
                    </tr>
                    <tr>
                        <td>decrementButtonIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the decrement button.</td>
                    </tr>
                    <tr>
                        <td>locale</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Locale to be used in formatting.</td>
                    </tr>
                    <tr>
                        <td>localeMatcher</td>
                        <td>string</td>
                        <td>best fit</td>
                        <td>
                            The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation">Locale Negotiation</a> for details.
                        </td>
                    </tr>
                    <tr>
                        <td>mode</td>
                        <td>string</td>
                        <td>decimal</td>
                        <td>Defines the behavior of the component, valid values are "decimal" and "currency".</td>
                    </tr>
                    <tr>
                        <td>prefix</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text to display before the value.</td>
                    </tr>
                    <tr>
                        <td>suffix</td>
                        <td>string</td>
                        <td>decimal</td>
                        <td>Text to display after the value.</td>
                    </tr>
                    <tr>
                        <td>currency</td>
                        <td>string</td>
                        <td>null</td>
                        <td>
                            The currency to use in currency formatting. Possible values are the <a href="https://www.currency-iso.org/en/home/tables/table-a1.html">ISO 4217 currency codes</a>, such as "USD" for the US dollar, "EUR" for the euro, or
                            "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.
                        </td>
                    </tr>
                    <tr>
                        <td>currencyDisplay</td>
                        <td>string</td>
                        <td>symbol</td>
                        <td>
                            How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar";
                            the default is "symbol".
                        </td>
                    </tr>
                    <tr>
                        <td>useGrouping</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.</td>
                    </tr>
                    <tr>
                        <td>minFractionDigits</td>
                        <td>number</td>
                        <td>null</td>
                        <td>
                            The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by
                            the <a href="https://www.currency-iso.org/en/home/tables/table-a1.html">ISO 4217 currency code list</a> (2 if the list doesn't provide that information).
                        </td>
                    </tr>
                    <tr>
                        <td>maxFractionDigits</td>
                        <td>number</td>
                        <td>null</td>
                        <td>
                            The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of
                            minimumFractionDigits and the number of minor unit digits provided by the <a href="https://www.currency-iso.org/en/home/tables/table-a1.html">ISO 4217 currency code list</a> (2 if the list doesn't provide that
                            information).
                        </td>
                    </tr>
                    <tr>
                        <td>min</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Mininum boundary value.</td>
                    </tr>
                    <tr>
                        <td>max</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum boundary value.</td>
                    </tr>
                    <tr>
                        <td>step</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Step factor to increment/decrement the value.</td>
                    </tr>
                    <tr>
                        <td>allowEmpty</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Determines whether the input field is empty.</td>
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
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the focus input to match a label defined for the component.</td>
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
                        <td>When present, it specifies that the element should be disabled.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that an input field is read-only.</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Title text of the input text.</td>
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
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the input field.</td>
                    </tr>
                    <tr>
                        <td>autocomplete</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Used to define a string that autocomplete attribute the current element.</td>
                    </tr>
                    <tr>
                        <td>showClear</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, a clear icon is displayed to clear the value.</td>
                    </tr>
                    <tr>
                        <td>updateOn</td>
                        <td>string</td>
                        <td>change</td>
                        <td>Used to define when the model value updates. Possible values are 'change' and 'blur'.</td>
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
