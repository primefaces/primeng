import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
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
                        <td>item</td>
                        <td>
                            $implicit: Data of the option <br />
                            index: Index of the option <br />
                            count: Count of the options <br />
                            first: First row offset <br />
                            last: Last row offset
                        </td>
                    </tr>
                    <tr>
                        <td>loadingItem</td>
                        <td>
                            $implicit: Data of the option <br />
                            index: Index of the option <br />
                            count: Count of the options <br />
                            first: First row offset <br />
                            last: Last row offset
                        </td>
                    </tr>
                    <tr>
                        <td>footer</td>
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
