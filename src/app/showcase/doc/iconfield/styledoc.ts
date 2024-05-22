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
                        <td>p-icon-field</td>
                        <td>Container of element.</td>
                    </tr>
                    <tr>
                        <td>p-icon-field-right</td>
                        <td>Right input icon element.</td>
                    </tr>
                    <tr>
                        <td>p-icon-field-left</td>
                        <td>Left input icon element.</td>
                    </tr>
                    <tr>
                        <td>p-input-icon</td>
                        <td>Container of input icon.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
