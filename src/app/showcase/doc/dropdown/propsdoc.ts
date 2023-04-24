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
                        <td>An array of objects to display as the available options.</td>
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
                        <td>optionGroupLabel</td>
                        <td>string</td>
                        <td>label</td>
                        <td>Name of the label field of an option group.</td>
                    </tr>
                    <tr>
                        <td>optionGroupChildren</td>
                        <td>string</td>
                        <td>items</td>
                        <td>Name of the options field of an option group.</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the input element.</td>
                    </tr>
                    <tr>
                        <td>scrollHeight</td>
                        <td>string</td>
                        <td>200px</td>
                        <td>Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.</td>
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
                        <td>filter</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, displays an input field to filter the items on keyup.</td>
                    </tr>
                    <tr>
                        <td>filterValue</td>
                        <td>string</td>
                        <td>null</td>
                        <td>When specified, filter displays with this value.</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.</td>
                    </tr>
                    <tr>
                        <td>filterMatchMode</td>
                        <td>string</td>
                        <td>contains</td>
                        <td>Defines how the items are filtered, valid values are "contains" (default) "startsWith", "endsWith", "equals", "notEquals", "in", "lt", "lte", "gt" and "gte".</td>
                    </tr>
                    <tr>
                        <td>filterPlaceholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text to show when filter input is empty.</td>
                    </tr>
                    <tr>
                        <td>filterLocale</td>
                        <td>string</td>
                        <td>undefined</td>
                        <td>Locale to use in filtering. The default locale is the host environment's current locale.</td>
                    </tr>
                    <tr>
                        <td>required</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that an input field must be filled out before submitting the form.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component cannot be edited.</td>
                    </tr>
                    <tr>
                        <td>emptyMessage</td>
                        <td>string</td>
                        <td>No records found.</td>
                        <td>Text to display when there is no data. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>emptyFilterMessage</td>
                        <td>string</td>
                        <td>No results found</td>
                        <td>Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
                    </tr>
                    <tr>
                        <td>editable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, custom value instead of predefined options can be entered using the editable input field.</td>
                    </tr>
                    <tr>
                        <td>maxlength</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum number of character allows in the editable input field.</td>
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
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Default text to display when no option is selected.</td>
                    </tr>
                    <tr>
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the accessible input element.</td>
                    </tr>
                    <tr>
                        <td>dataKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>A property to uniquely identify a value in options.</td>
                    </tr>
                    <tr>
                        <td>autofocus</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should automatically get focus on load.</td>
                    </tr>
                    <tr>
                        <td>autofocusFilter</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Applies focus to the filter element when the overlay is shown.</td>
                    </tr>
                    <tr>
                        <td>resetFilterOnHide</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Clears the filter value when hiding the dropdown.</td>
                    </tr>
                    <tr>
                        <td>dropdownIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon class of the dropdown icon.</td>
                    </tr>
                    <tr>
                        <td>autoDisplayFirst</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display the first item as the label if no placeholder is defined and value is null.</td>
                    </tr>
                    <tr>
                        <td>group</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display options as grouped when nested options are provided.</td>
                    </tr>
                    <tr>
                        <td>showClear</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, a clear icon is displayed to clear the value.</td>
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
                        <td>ariaFilterLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the filter input.</td>
                    </tr>
                    <tr>
                        <td>ariaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Used to define a string that autocomplete attribute the current element.</td>
                    </tr>
                    <tr>
                        <td>tooltip</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Advisory information to display in a tooltip on hover.</td>
                    </tr>
                    <tr>
                        <td>tooltipStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the tooltip.</td>
                    </tr>
                    <tr>
                        <td>tooltipPosition</td>
                        <td>string</td>
                        <td>top</td>
                        <td>Position of the tooltip, valid values are right, left, top and bottom.</td>
                    </tr>
                    <tr>
                        <td>tooltipPositionStyle</td>
                        <td>string</td>
                        <td>absolute</td>
                        <td>Type of CSS position.</td>
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
                        <td>overlayOptions</td>
                        <td>OverlayOptions</td>
                        <td>null</td>
                        <td>Whether to use overlay API feature. The properties of <a href="#" [routerLink]="['/overlay']">overlay API</a> can be used like an object in it.</td>
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
