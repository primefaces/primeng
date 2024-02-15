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
                        <td>p-radiobutton</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-radiobutton-box</td>
                        <td>Container of icon.</td>
                    </tr>
                    <tr>
                        <td>p-radiobutton-icon</td>
                        <td>Icon element.</td>
                    </tr>
                    <tr>
                        <td>p-checkbox-label</td>
                        <td>Label element.</td>
                    </tr>
                    <tr>
                        <td>p-label-active</td>
                        <td>Label element of a checked state.</td>
                    </tr>
                    <tr>
                        <td>p-label-focus</td>
                        <td>Label element of a focused state.</td>
                    </tr>
                    <tr>
                        <td>p-label-disabled</td>
                        <td>Label element of a disabled state.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
