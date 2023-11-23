import { Component } from '@angular/core';

@Component({
    selector: 'confirmationapi-doc',
    template: `
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
                        <td>message</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Message of the confirmation.</td>
                    </tr>
                    <tr>
                        <td>key</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Optional key to match the key of the confirm popup, necessary to use when component tree has multiple confirm popups.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon to display next to the message.</td>
                    </tr>
                    <tr>
                        <td>accept</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Callback to execute when action is confirmed.</td>
                    </tr>
                    <tr>
                        <td>reject</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Callback to execute when action is rejected.</td>
                    </tr>
                    <tr>
                        <td>acceptLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the accept button.</td>
                    </tr>
                    <tr>
                        <td>rejectLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the reject button.</td>
                    </tr>
                    <tr>
                        <td>acceptIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the accept button.</td>
                    </tr>
                    <tr>
                        <td>rejectIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the reject button.</td>
                    </tr>
                    <tr>
                        <td>acceptVisible</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Visibility of the accept button.</td>
                    </tr>
                    <tr>
                        <td>rejectVisible</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Visibility of the reject button.</td>
                    </tr>
                    <tr>
                        <td>acceptButtonStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the accept button.</td>
                    </tr>
                    <tr>
                        <td>rejectButtonStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the reject button.</td>
                    </tr>
                    <tr>
                        <td>defaultFocus</td>
                        <td>string</td>
                        <td>accept</td>
                        <td>Element to receive the focus when the popup gets visible, valid values are "accept", "reject", and "none".</td>
                    </tr>
                </tbody>
            </table>
        </div>
   `
})
export class ConfirmationApiDoc {

}
