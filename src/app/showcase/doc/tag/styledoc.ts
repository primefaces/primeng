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
                        <td>p-tag</td>
                        <td>Tag element</td>
                    </tr>
                    <tr>
                        <td>p-tag-rounded</td>
                        <td>Rounded element</td>
                    </tr>
                    <tr>
                        <td>p-tag-icon</td>
                        <td>Icon of the tag</td>
                    </tr>
                    <tr>
                        <td>p-tag-value</td>
                        <td>Value of the tag</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
