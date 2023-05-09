import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"> </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>header</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatorLeft</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatorRight</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>gridItem</td>
                        <td>
                            $implicit: Data of the grid <br />
                            index: Index of the grid
                        </td>
                    </tr>
                    <tr>
                        <td>listItemTemplate</td>
                        <td>
                            $implicit: Data of the row <br />
                            index: Index of the row
                        </td>
                    </tr>
                    <tr>
                        <td>empty</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>listicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>gridicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>loadingicon</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class TemplatesDoc {
    @Input() id: string;

    @Input() title: string;
}
