import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"> </app-docsectiontext>
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
                        <td>header</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Title text of the dialog.</td>
                    </tr>
                    <tr>
                        <td>draggable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Enables dragging to change the position using header.</td>
                    </tr>
                    <tr>
                        <td>keepInViewport</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Keeps dialog in the viewport.</td>
                    </tr>
                    <tr>
                        <td>resizable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Enables resizing of the content.</td>
                    </tr>
                    <tr>
                        <td>contentStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Style of the content section.</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Specifies the visibility of the dialog.</td>
                    </tr>
                    <tr>
                        <td>modal</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if background should be blocked when dialog is displayed.</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>string</td>
                        <td>center</td>
                        <td>Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".</td>
                    </tr>
                    <tr>
                        <td>blockScroll</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether background scroll should be blocked when dialog is visible.</td>
                    </tr>
                    <tr>
                        <td>closeOnEscape</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Specifies if pressing escape key should hide the dialog.</td>
                    </tr>
                    <tr>
                        <td>dismissableMask</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Specifies if clicking the modal background should hide the dialog.</td>
                    </tr>
                    <tr>
                        <td>rtl</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled dialog is displayed in RTL direction.</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Adds a close icon to the header to hide the dialog.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>any</td>
                        <td>null</td>
                        <td>
                            Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having
                            #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
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
                        <td>maskStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the mask.</td>
                    </tr>
                    <tr>
                        <td>contentStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the content.</td>
                    </tr>
                    <tr>
                        <td>contentStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the content.</td>
                    </tr>
                    <tr>
                        <td>showHeader</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show the header or not.</td>
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
                        <td>minX</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Minimum value for the left coordinate of dialog in dragging.</td>
                    </tr>
                    <tr>
                        <td>minY</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Minimum value for the top coordinate of dialog in dragging.</td>
                    </tr>
                    <tr>
                        <td>focusOnShow</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, first button receives focus on show.</td>
                    </tr>
                    <tr>
                        <td>focusTrap</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, can only focus on elements inside the dialog.</td>
                    </tr>
                    <tr>
                        <td>maximizable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the dialog can be displayed full screen.</td>
                    </tr>
                    <tr>
                        <td>breakpoints</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Object literal to define widths per screen size.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>150ms cubic-bezier(0, 0, 0.2, 1)</td>
                        <td>Transition options of the animation.</td>
                    </tr>
                    <tr>
                        <td>closeIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the close icon.</td>
                    </tr>
                    <tr>
                        <td>closeAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the close button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>closeTabindex</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Index of the close button in tabbing order.</td>
                    </tr>
                    <tr>
                        <td>minimizeIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the minimize icon.</td>
                    </tr>
                    <tr>
                        <td>maximizeIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the maximize icon.</td>
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
