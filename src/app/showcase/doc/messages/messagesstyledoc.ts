import { Component, Input } from '@angular/core';

@Component({
    selector: 'messagesstyle-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming page</a>.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-messages</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-message</td>
                        <td>Message element.</td>
                    </tr>
                    <tr>
                        <td>p-message-info</td>
                        <td>Message element when displaying info messages.</td>
                    </tr>
                    <tr>
                        <td>p-message-warn</td>
                        <td>Message element when displaying warning messages.</td>
                    </tr>
                    <tr>
                        <td>p-message-error</td>
                        <td>Message element when displaying error messages.</td>
                    </tr>
                    <tr>
                        <td>p-message-success</td>
                        <td>Message element when displaying success messages.</td>
                    </tr>
                    <tr>
                        <td>p-message-close</td>
                        <td>Close button.</td>
                    </tr>
                    <tr>
                        <td>p-message-close-icon</td>
                        <td>Close icon.</td>
                    </tr>
                    <tr>
                        <td>p-message-icon</td>
                        <td>Severity icon.</td>
                    </tr>
                    <tr>
                        <td>p-message-summary</td>
                        <td>Summary of a message.</td>
                    </tr>
                    <tr>
                        <td>p-message-detail</td>
                        <td>Detail of a message.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class MessagesStyleDoc {
    @Input() id: string;

    @Input() title: string;
}
