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
                        <td>ariaFilterLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the filter input.</td>
                    </tr>
                    <tr>
                        <td>checkbox</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, allows selecting items with checkboxes.</td>
                    </tr>
                    <tr>
                        <td>dataKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>A property to uniquely identify a value in options.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
                    </tr>
                    <tr>
                        <td>filter</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, displays a filter input at header.</td>
                    </tr>
                    <tr>
                        <td>filterMatchMode</td>
                        <td>string</td>
                        <td>contains</td>
                        <td>Defines how the items are filtered, valid values are "contains" (default) "startsWith", "endsWith", "equals", "notEquals", "in", "lt", "lte", "gt" and "gte".</td>
                    </tr>
                    <tr>
                        <td>filterValue</td>
                        <td>string</td>
                        <td>null</td>
                        <td>When specified, filter displays with this value.</td>
                    </tr>
                    <tr>
                        <td>filterLocale</td>
                        <td>string</td>
                        <td>undefined</td>
                        <td>Locale to use in filtering. The default locale is the host environment's current locale.</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.</td>
                    </tr>
                    <tr>
                        <td>filterPlaceHolder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines placeholder of the filter input.</td>
                    </tr>
                    <tr>
                        <td>emptyFilterMessage</td>
                        <td>string</td>
                        <td>No results found</td>
                        <td>Text to display when filtering does not return any results.</td>
                    </tr>
                    <tr>
                        <td>listStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the list element.</td>
                    </tr>
                    <tr>
                        <td>listStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the list element.</td>
                    </tr>
                    <tr>
                        <td>metaKeySelection</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>
                            Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices,
                            metaKeySelection is turned off automatically.
                        </td>
                    </tr>
                    <tr>
                        <td>multiple</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, allows selecting multiple values.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element value cannot be changed.</td>
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
                        <td>group</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display options as grouped when nested options are provided.</td>
                    </tr>
                    <tr>
                        <td>showToggleAll</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether header checkbox is shown in multiple mode.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the container.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the container.</td>
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
