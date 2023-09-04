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
                        <td>p-paginator</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-first</td>
                        <td>First page element.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-prev</td>
                        <td>Previous page element.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-pages</td>
                        <td>Container of page links.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-page</td>
                        <td>A page link.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-next</td>
                        <td>Next page element.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-last</td>
                        <td>Last page element.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-rpp-options</td>
                        <td>Rows per page dropdown.</td>
                    </tr>
                    <tr>
                        <td>p-paginator-page-options</td>
                        <td>Jump to per page dropdown.</td>
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
