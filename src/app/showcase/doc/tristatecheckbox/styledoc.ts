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
                        <td>p-checkbox</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-tristatechkbox</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-checkbox-box</td>
                        <td>Container of icon.</td>
                    </tr>
                    <tr>
                        <td>p-checkbox-icon</td>
                        <td>Icon element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {
  
}
