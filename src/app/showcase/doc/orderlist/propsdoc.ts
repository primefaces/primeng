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
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to reorder.</td>
                    </tr>
                    <tr>
                        <td>selection</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to bind the selections.</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text for the caption</td>
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
                        <td>listStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the list element.</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>When specified displays an input field to filter the items on keyup and decides which fields to search against.</td>
                    </tr>
                    <tr>
                        <td>filterMatchMode</td>
                        <td>string</td>
                        <td>contains</td>
                        <td>Defines how the items are filtered, valid values are "contains" (default) "startsWith", "endsWith", "equals", "notEquals", "in", "lt", "lte", "gt" and "gte".</td>
                    </tr>
                    <tr>
                        <td>filterLocale</td>
                        <td>string</td>
                        <td>undefined</td>
                        <td>Locale to use in filtering. The default locale is the host environment's current locale.</td>
                    </tr>
                    <tr>
                        <td>metaKeySelection</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.</td>
                    </tr>
                    <tr>
                        <td>dragdrop</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to enable dragdrop based reordering.</td>
                    </tr>
                    <tr>
                        <td>filterPlaceHolder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text on filter input.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>trackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.</td>
                    </tr>
                    <tr>
                        <td>controlsPosition</td>
                        <td>string</td>
                        <td>left</td>
                        <td>Defines the location of the buttons with respect to the list, valid values are "left" or "right".</td>
                    </tr>
                    <tr>
                        <td>ariaFilterLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the filter input.</td>
                    </tr>
                    <tr>
                        <td>stripedRows</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to displays rows with alternating colors.</td>
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
