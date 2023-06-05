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
                        <td>suggestions</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of suggestions to display.</td>
                    </tr>
                    <tr>
                        <td>field</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Field of a suggested object to resolve and display.</td>
                    </tr>
                    <tr>
                        <td>scrollHeight</td>
                        <td>string</td>
                        <td>200px</td>
                        <td>Maximum height of the suggestions panel.</td>
                    </tr>
                    <tr>
                        <td>dropdown</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays a button next to the input field when enabled.</td>
                    </tr>
                    <tr>
                        <td>multiple</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Specifies if multiple values can be selected.</td>
                    </tr>
                    <tr>
                        <td>dropdownIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon class of the dropdown icon.</td>
                    </tr>
                    <tr>
                        <td>minLength</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Minimum number of characters to initiate a search.</td>
                    </tr>
                    <tr>
                        <td>delay</td>
                        <td>number</td>
                        <td>300</td>
                        <td>Delay between keystrokes to wait before sending a query.</td>
                    </tr>
                    <tr>
                        <td>completeOnFocus</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to run a query when input receives focus.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>inputStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the input field.</td>
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
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>inputStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the input field.</td>
                    </tr>
                    <tr>
                        <td>panelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the overlay panel element.</td>
                    </tr>
                    <tr>
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the focus input to match a label defined for the component.</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the input element.</td>
                    </tr>
                    <tr>
                        <td>optionGroupLabel</td>
                        <td>string</td>
                        <td>label</td>
                        <td>Name of the label field of an option group.</td>
                    </tr>
                    <tr>
                        <td>group</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display options as grouped when nested options are provided.</td>
                    </tr>
                    <tr>
                        <td>optionGroupChildren</td>
                        <td>string</td>
                        <td>items</td>
                        <td>Name of the options field of an option group.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Hint text for the input field.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the input cannot be typed.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>maxlength</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum number of character allows in the input field.</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Size of the input field.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>any</td>
                        <td>null</td>
                        <td>
                            Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having
                            #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Index of the element in tabbing order.</td>
                    </tr>
                    <tr>
                        <td>dataKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>A property to uniquely identify a value in options.</td>
                    </tr>
                    <tr>
                        <td>autoHighlight</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, highlights the first item in the list by default.</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>string</td>
                        <td>text</td>
                        <td>Type of the input, defaults to "text".</td>
                    </tr>

                    <tr>
                        <td>showEmptyMessage</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to show the empty message or not.</td>
                    </tr>
                    <tr>
                        <td>emptyMessage</td>
                        <td>string</td>
                        <td>No results found</td>
                        <td>Text to display when there is no data. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>immutable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Defines how the suggestions should be manipulated. More information is available at "Change Detection" section above.</td>
                    </tr>
                    <tr>
                        <td>required</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that an input field must be filled out before submitting the form.</td>
                    </tr>
                    <tr>
                        <td>autofocus</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should automatically get focus on load.</td>
                    </tr>
                    <tr>
                        <td>forceSelection</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.</td>
                    </tr>
                    <tr>
                        <td>dropdownMode</td>
                        <td>string</td>
                        <td>blank</td>
                        <td>Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.</td>
                    </tr>
                    <tr>
                        <td>baseZIndex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Base zIndex value to use in layering.</td>
                    </tr>
                    <tr>
                        <td>autoZIndex</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to automatically manage layering.</td>
                    </tr>
                    <tr>
                        <td>showTransitionOptions</td>
                        <td>string</td>
                        <td>.12s cubic-bezier(0, 0, 0.2, 1)</td>
                        <td>Transition options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransitionOptions</td>
                        <td>string</td>
                        <td>.1s linear</td>
                        <td>Transition options of the hide animation.</td>
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
                        <td>dropdownAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the dropdown button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>unique</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Ensures uniqueness of selected items on multiple mode.</td>
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
                        <td>virtualScroll</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the data should be loaded on demand during scroll.</td>
                    </tr>
                    <tr>
                        <td>virtualScrollItemSize</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Height of an item in the list for VirtualScrolling.</td>
                    </tr>
                    <tr>
                        <td>virtualScrollOptions</td>
                        <td>ScrollerOptions</td>
                        <td>null</td>
                        <td>Whether to use the scroller feature. The properties of <a href="#" [routerLink]="['/scroller']">scroller</a> component can be used like an object in it.</td>
                    </tr>
                    <tr>
                        <td>lazy</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if data is loaded and interacted with in lazy manner.</td>
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
