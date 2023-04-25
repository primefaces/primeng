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
                        <td>header</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Title text of the dialog.</td>
                    </tr>
                    <tr>
                        <td>message</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Message of the confirmation.</td>
                    </tr>
                    <tr>
                        <td>key</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Optional key to match the key of confirm object, necessary to use when component tree has multiple confirm dialogs.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon to display next to message.</td>
                    </tr>
                    <tr>
                        <td>acceptLabel</td>
                        <td>string</td>
                        <td>Yes</td>
                        <td>Label of the accept button.</td>
                    </tr>
                    <tr>
                        <td>acceptAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the accept button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>acceptIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the accept button.</td>
                    </tr>
                    <tr>
                        <td>acceptVisible</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Visibility of the accept button.</td>
                    </tr>
                    <tr>
                        <td>rejectLabel</td>
                        <td>string</td>
                        <td>No</td>
                        <td>Label of the reject button.</td>
                    </tr>
                    <tr>
                        <td>rejectAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the reject button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>rejectIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the reject button.</td>
                    </tr>
                    <tr>
                        <td>rejectVisible</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Visibility of the reject button.</td>
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
                        <td>focusTrap</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, can only focus on elements inside the confirm dialog.</td>
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
                        <td>acceptButtonStyleClass</td>
                        <td>string</td>
                        <td>p-confirmdialog-acceptbutton</td>
                        <td>Style class of the accept button.</td>
                    </tr>
                    <tr>
                        <td>rejectButtonStyleClass</td>
                        <td>string</td>
                        <td>p-confirmdialog-rejectbutton</td>
                        <td>Style class of the reject button.</td>
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
                        <td>breakpoints</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Object literal to define widths per screen size.</td>
                    </tr>
                    <tr>
                        <td>transitionOptions</td>
                        <td>string</td>
                        <td>400ms cubic-bezier(0.25, 0.8, 0.25, 1)</td>
                        <td>Transition options of the animation.</td>
                    </tr>
                    <tr>
                        <td>defaultFocus</td>
                        <td>string</td>
                        <td>accept</td>
                        <td>Element to receive the focus when the dialog gets visible, valid values are "accept", "reject", "close" and "none".</td>
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
