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
                        <td>p-multiselect</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-label-container</td>
                        <td>Container of the label to display selected items.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-label</td>
                        <td>Label to display selected items.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-trigger</td>
                        <td>Dropdown button.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-filter-container</td>
                        <td>Container of filter input.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-panel</td>
                        <td>Overlay panel for items.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-items</td>
                        <td>List container of items.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-item</td>
                        <td>An item in the list.</td>
                    </tr>
                    <tr>
                        <td>p-multiselect-open</td>
                        <td>Container element when overlay is visible.</td>
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
