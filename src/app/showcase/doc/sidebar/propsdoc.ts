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
                        <td>visible</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Specifies the visibility of the dialog.</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>string</td>
                        <td>left</td>
                        <td>Specifies the position of the sidebar, valid values are "left", "right", "bottom" and "top".</td>
                    </tr>
                    <tr>
                        <td>fullScreen</td>
                        <td>boolean</td>
                        <td>false</td>
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
                        <td>blockScroll</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to block scrolling of the document when sidebar is active.</td>
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
                        <td>modal</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether an overlay mask is displayed behind the sidebar.</td>
                    </tr>
                    <tr>
                        <td>dismissible</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to dismiss sidebar on click of the mask.</td>
                    </tr>
                    <tr>
                        <td>showCloseIcon</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display the close icon.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>150ms cubic-bezier(0, 0, 0.2, 1)</td>
                        <td>Transition options of the animation.</td>
                    </tr>
                    <tr>
                        <td>ariaCloseLabel</td>
                        <td>string</td>
                        <td>close</td>
                        <td>Aria label of the close icon.</td>
                    </tr>
                    <tr>
                        <td>closeOnEscape</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Specifies if pressing escape key should hide the sidebar.</td>
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
