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
                        <td>p-virtualscroller</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-virtualscroller-header</td>
                        <td>Header section.</td>
                    </tr>
                    <tr>
                        <td>p-virtualscroller-footer</td>
                        <td>Footer section.</td>
                    </tr>
                    <tr>
                        <td>p-virtualscroller-content</td>
                        <td>Content section.</td>
                    </tr>
                    <tr>
                        <td>p-virtualscroller-list</td>
                        <td>List element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {

}
