import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section>
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
                        <td>p-treetable</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-caption</td>
                        <td>Caption element.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-summary</td>
                        <td>Section section.</td>
                    </tr>
                    <tr>
                        <td>p-sortable-column</td>
                        <td>Sortable column header.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-scrollable-header</td>
                        <td>Container of header in a scrollable table.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-scrollable-body</td>
                        <td>Container of body in a scrollable table.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-scrollable-footer</td>
                        <td>Container of footer in a scrollable table.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-loading</td>
                        <td>Loader mask.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-loading-content</td>
                        <td>Loader content.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-wrapper</td>
                        <td>Loader content.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-scrollable-wrapper</td>
                        <td>Loader content.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-resizer-helper</td>
                        <td>Vertical resize indicator bar.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-reorder-indicator-top</td>
                        <td>Top indicator of column reordering.</td>
                    </tr>
                    <tr>
                        <td>p-treetable-reorder-indicator-top</td>
                        <td>Bottom indicator of column reordering.</td>
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
