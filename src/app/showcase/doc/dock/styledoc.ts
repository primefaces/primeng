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
                        <td>p-dock</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-dock-list</td>
                        <td>List of items.</td>
                    </tr>
                    <tr>
                        <td>p-dock-item</td>
                        <td>Each items in list.</td>
                    </tr>
                </tbody>
            </table>
        </div>
   `
})
export class StyleDoc {
 
}
