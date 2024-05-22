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
                        <td>p-tabview</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-tabview-nav</td>
                        <td>Container of headers.</td>
                    </tr>
                    <tr>
                        <td>p-tabview-selected</td>
                        <td>Selected tab header.</td>
                    </tr>
                    <tr>
                        <td>p-tabview-panels</td>
                        <td>Container panels.</td>
                    </tr>
                    <tr>
                        <td>p-tabview-panel</td>
                        <td>Content of a tab.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
