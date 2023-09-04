import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-3">
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
                        <td>p-toolbar</td>
                        <td>Main container element.</td>
                    </tr>
                    <tr>
                        <td>p-toolbar-group-start</td>
                        <td>Start content container.</td>
                    </tr>
                    <tr>
                        <td>p-toolbar-group-center</td>
                        <td>Center content container.</td>
                    </tr>
                    <tr>
                        <td>p-toolbar-group-end</td>
                        <td>End content container.</td>
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
