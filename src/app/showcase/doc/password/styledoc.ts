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
                        <td>p-password-panel</td>
                        <td>Container of password panel</td>
                    </tr>
                    <tr>
                        <td>p-password-meter</td>
                        <td>Meter element of password strength</td>
                    </tr>
                    <tr>
                        <td>p-password-info</td>
                        <td>Text to display strength</td>
                    </tr>
                </tbody>
            </table>
        </div>
   `
})
export class StyleDoc {

}
