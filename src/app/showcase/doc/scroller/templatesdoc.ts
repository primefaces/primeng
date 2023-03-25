import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
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
                        <td>content</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>item</td>
                        <td>
                            $implicit: Data of the option <br />
                            options: Options of the scroller
                        </td>
                    </tr>
                    <tr>
                        <td>loader</td>
                        <td>options: Options of the scroller on loading</td>
                    </tr>
                    <tr>
                        <td>loadericon</td>
                        <td>options: Options of the scroller on loading</td>
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
