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
                        <td>p-card</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-card-header</td>
                        <td>Title element.</td>
                    </tr>
                    <tr>
                        <td>p-card-subheader</td>
                        <td>Subtitle element.</td>
                    </tr>
                    <tr>
                        <td>p-card-content</td>
                        <td>Content of the card.</td>
                    </tr>
                    <tr>
                        <td>p-card-footer</td>
                        <td>Footer of the card.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {
  
}
