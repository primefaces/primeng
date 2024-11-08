import { Component } from '@angular/core';

@Component({
    selector: 'popover-style-doc',
    template: `
        <app-docsectiontext>
            <p>
                Following is the list of structural style classes, for theming classes visit
                <a [routerLink]="['/theming']">theming</a> page.
            </p>
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
                        <td>p-popover</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-popover-content</td>
                        <td>Content of the panel.</td>
                    </tr>
                    <tr>
                        <td>p-popover-close</td>
                        <td>Close icon.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
