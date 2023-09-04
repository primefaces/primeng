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
                        <td>p-fieldset</td>
                        <td>Fieldset element</td>
                    </tr>
                    <tr>
                        <td>p-fieldset-toggleable</td>
                        <td>Toggleable fieldset element</td>
                    </tr>
                    <tr>
                        <td>p-fieldset-legend</td>
                        <td>Legend element.</td>
                    </tr>
                    <tr>
                        <td>p-fieldset-content</td>
                        <td>Content element.</td>
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
