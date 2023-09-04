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
                        <td>p-picklist</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-picklist-source-controls</td>
                        <td>Container of source list buttons.</td>
                    </tr>
                    <tr>
                        <td>p-picklist-target-controls</td>
                        <td>Container of target list buttons.</td>
                    </tr>
                    <tr>
                        <td>p-picklist-buttons</td>
                        <td>Container of buttons.</td>
                    </tr>
                    <tr>
                        <td>p-picklist-list</td>
                        <td>List element.</td>
                    </tr>
                    <tr>
                        <td>p-picklist-item</td>
                        <td>An item in the list.</td>
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
