import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
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
                        <td>p-breadcrumb</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-menuitem</td>
                        <td>Menuitem element.</td>
                    </tr>
                    <tr>
                        <td>p-menuitem-text</td>
                        <td>Label of a menuitem.</td>
                    </tr>
                    <tr>
                        <td>p-breadcrumb-chevron</td>
                        <td>Chevron element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
