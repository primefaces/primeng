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
                        <td>source</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects for the source list.</td>
                    </tr>
                    <tr>
                        <td>target</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects for the target list.</td>
                    </tr>
                    <tr>
                        <td>sourceHeader</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text for the source list caption</td>
                    </tr>
                    <tr>
                        <td>targetHeader</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text for the target list caption</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).</td>
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
                        <td>trackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.</td>
                    </tr>
                    <tr>
                        <td>sourceTrackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.</td>
                    </tr>
                    <tr>
                        <td>targetTrackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.</td>
                    </tr>
                    <tr>
                        <td>showSourceFilter</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show filter input for source list when filterBy is enabled.</td>
                    </tr>
                    <tr>
                        <td>showTargetFilter</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show filter input for target list when filterBy is enabled.</td>
                    </tr>
                    <tr>
                        <td>dragdrop</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to enable dragdrop based reordering.</td>
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
                        <td>sourceStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the source list element.</td>
                    </tr>
                    <tr>
                        <td>targetStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the target list element.</td>
                    </tr>
                    <tr>
                        <td>responsive</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled orderlist adjusts its controls based on screen size.</td>
                    </tr>
                    <tr>
                        <td>showSourceControls</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show buttons of source list.</td>
                    </tr>
                    <tr>
                        <td>showTargetControls</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show buttons of target list.</td>
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
                        <td>sourceFilterPlaceholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text on source filter input.</td>
                    </tr>
                    <tr>
                        <td>targetFilterPlaceholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text on target filter input.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>keepSelection</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Keeps selection on the transfer list.</td>
                    </tr>
                    <tr>
                        <td>ariaSourceFilterLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the filter input of source list.</td>
                    </tr>
                    <tr>
                        <td>ariaTargetFilterLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the filter input of target list.</td>
                    </tr>
                    <tr>
                        <td>rightButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to right button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>leftButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to left button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>allRightButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to all right button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>allLeftButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to all left button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>upButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to up button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>downButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to down button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>topButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to top button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>bottomButtonAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the move to bottom button for accessibility.</td>
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
