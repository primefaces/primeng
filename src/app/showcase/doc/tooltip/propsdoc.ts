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
                        <td>pTooltip</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Text of the tooltip.</td>
                    </tr>
                    <tr>
                        <td>tooltipPosition</td>
                        <td>string</td>
                        <td>right</td>
                        <td>Position of the tooltip, valid values are right, left, top and bottom.</td>
                    </tr>
                    <tr>
                        <td>fitContent</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Automatically adjusts the element position when there is not enough space on the selected position.</td>
                    </tr>
                    <tr>
                        <td>tooltipEvent</td>
                        <td>string</td>
                        <td>hover</td>
                        <td>Event to show the tooltip, valid values are hover and focus.</td>
                    </tr>
                    <tr>
                        <td>positionStyle</td>
                        <td>string</td>
                        <td>absolute</td>
                        <td>Type of CSS position.</td>
                    </tr>
                    <tr>
                        <td>tooltipDisabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>string</td>
                        <td>any</td>
                        <td>
                            Target element to attach the overlay, valid values are "body", "target" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element
                            having #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>hideDelay</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Delay to hide the tooltip in milliseconds.</td>
                    </tr>
                    <tr>
                        <td>showDelay</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Delay to show the tooltip in milliseconds.</td>
                    </tr>
                    <tr>
                        <td>life</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Time to wait in milliseconds to hide the tooltip even it is active.</td>
                    </tr>
                    <tr>
                        <td>tooltipStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the tooltip.</td>
                    </tr>
                    <tr>
                        <td>escape</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>By default the tooltip contents are rendered as text. Set to false to support html tags in the content.</td>
                    </tr>
                    <tr>
                        <td>tooltipZIndex</td>
                        <td>string</td>
                        <td>auto</td>
                        <td>Whether the z-index should be managed automatically to always go on top or have a fixed value.</td>
                    </tr>
                    <tr>
                        <td>autoHide</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to hide tooltip when hovering over tooltip content.</td>
                    </tr>
                    <tr>
                        <td>hideOnEscape</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to hide tooltip on escape key press.</td>
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
