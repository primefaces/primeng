import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'split-button-style-doc',
    standalone: true,
    imports: [AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <p>
                Following is the list of structural style classes, for theming classes visit
                <a href="#" [routerLink]="['/theming']">theming</a> page.
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
                        <td>p-splitbutton</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-splitbutton-menubutton</td>
                        <td>Dropdown button.</td>
                    </tr>
                    <tr>
                        <td>p-menu</td>
                        <td>Overlay menu.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {}
