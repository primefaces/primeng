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
                        <td>data</td>
                        <td>any</td>
                        <td>null</td>
                        <td>An object to pass to the component loaded inside the Dialog.</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Header text of the dialog.</td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Footer text of the dialog.</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Width of the dialog.</td>
                    </tr>
                    <tr>
                        <td>height</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Height of the dialog.</td>
                    </tr>
                    <tr>
                        <td>closeOnEscape</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Specifies if pressing escape key should hide the dialog.</td>
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
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>contentStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the content section.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>400ms cubic-bezier(0.25, 0.8, 0.25, 1)</td>
                        <td>Transition options of the animation.</td>
                    </tr>
                    <tr>
                        <td>closable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Adds a close icon to the header to hide the dialog.</td>
                    </tr>
                    <tr>
                        <td>showHeader</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show the header or not.</td>
                    </tr>
                    <tr>
                        <td>maximizable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the dialog can be displayed full screen.</td>
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
                        <td>position</td>
                        <td>string</td>
                        <td>center</td>
                        <td>Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".</td>
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
                        <td>draggable</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Enables dragging to change the position using header.</td>
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
