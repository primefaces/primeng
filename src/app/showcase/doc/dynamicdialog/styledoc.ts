import { Component } from '@angular/core';

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
                        <td>p-dialog</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-dynamicdialog</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-dialog-titlebar</td>
                        <td>Container of header.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-title</td>
                        <td>Header element.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-titlebar-icon</td>
                        <td>Icon container inside header.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-titlebar-close</td>
                        <td>Close icon element.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-content</td>
                        <td>Content element.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-footer</td>
                        <td>Footer element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
