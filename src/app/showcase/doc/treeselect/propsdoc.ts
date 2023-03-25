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
                        <td>An array of treenodes.</td>
                    </tr>
                    <tr>
                        <td>scrollHeight</td>
                        <td>string</td>
                        <td>400px</td>
                        <td>Height of the viewport, a scrollbar is defined if height of list exceeds this value.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label to display when there are no selections.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>string</td>
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
                        <td>selectionMode</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines the selection mode, valid values "single", "multiple", and "checkbox".</td>
                    </tr>
                    <tr>
                        <td>panelClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the overlay panel.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>string</td>
                        <td>body</td>
                        <td>A valid query selector or an HTMLElement to specify where the overlay gets attached. Special keywords are "body" for document body and "self" for the element itself.</td>
                    </tr>
                    <tr>
                        <td>emptyMessage</td>
                        <td>string</td>
                        <td>No results found</td>
                        <td>Text to display when there are no options available. Defaults to value from PrimeNG locale configuration.</td>
                    </tr>
                    <tr>
                        <td>display</td>
                        <td>string</td>
                        <td>comma</td>
                        <td>Defines how the selected items are displayed, valid values are "comma" and "chip".</td>
                    </tr>
                    <tr>
                        <td>propagateSelectionUp</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether checkbox selections propagate to ancestor nodes.</td>
                    </tr>
                    <tr>
                        <td>propagateSelectionDown</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether checkbox selections propagate to descendant nodes.</td>
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
                        <td>filter</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, displays an input field to filter the items.</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>label</td>
                        <td>When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.</td>
                    </tr>
                    <tr>
                        <td>filterMode</td>
                        <td>string</td>
                        <td>lenient</td>
                        <td>Mode for filtering valid values are "lenient" and "strict". Default is lenient.</td>
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
                        <td>resetFilterOnHide</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Clears the filter value when hiding the dropdown.</td>
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
