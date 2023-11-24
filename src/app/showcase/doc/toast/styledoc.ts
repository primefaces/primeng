import { Component} from '@angular/core';

@Component({
    selector: 'style-doc',
    template: `
        <app-docsectiontext>
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
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
                        <td>p-toast</td>
                        <td>Main container element.</td>
                    </tr>
                    <tr>
                        <td>p-toast-message</td>
                        <td>Container of a message item.</td>
                    </tr>
                    <tr>
                        <td>p-toast-icon-close</td>
                        <td>Close icon of a message.</td>
                    </tr>
                    <tr>
                        <td>p-toast-icon</td>
                        <td>Severity icon.</td>
                    </tr>
                    <tr>
                        <td>p-toast-message-content</td>
                        <td>Container of message texts.</td>
                    </tr>
                    <tr>
                        <td>p-toast-summary</td>
                        <td>Summary of the message.</td>
                    </tr>
                    <tr>
                        <td>p-toast-detail</td>
                        <td>Detail of the message.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {
 
}
