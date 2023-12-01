import { Component } from '@angular/core';

@Component({
    selector: 'messagestyle-demo',
    template: `
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
                        <td>p-inline-message</td>
                        <td>Message element.</td>
                    </tr>
                    <tr>
                        <td>p-inline-message-info</td>
                        <td>Message element when displaying info messages.</td>
                    </tr>
                    <tr>
                        <td>p-inline-message-warn</td>
                        <td>Message element when displaying warning messages.</td>
                    </tr>
                    <tr>
                        <td>p-inline-message-error</td>
                        <td>Message element when displaying error messages.</td>
                    </tr>
                    <tr>
                        <td>p-inline-message-success</td>
                        <td>Message element when displaying success messages.</td>
                    </tr>
                    <tr>
                        <td>p-inline-message-icon</td>
                        <td>Severity icon.</td>
                    </tr>
                    <tr>
                        <td>p-inline-message-text</td>
                        <td>Text of a message.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class MessageStyleDoc {}
