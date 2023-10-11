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
                        <td>p-dataview</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-dataview-list</td>
                        <td>Container element in list layout.</td>
                    </tr>
                    <tr>
                        <td>p-dataview-grid</td>
                        <td>Container element in grid layout.</td>
                    </tr>
                    <tr>
                        <td>p-dataview-header</td>
                        <td>Header section.</td>
                    </tr>
                    <tr>
                        <td>p-dataview-footer</td>
                        <td>Footer section.</td>
                    </tr>
                    <tr>
                        <td>p-dataview-content</td>
                        <td>Container of items.</td>
                    </tr>
                    <tr>
                        <td>p-dataview-emptymessage</td>
                        <td>Empty message element.</td>
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
