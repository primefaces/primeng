import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Templates of TabView</h3>
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
                            <td>nexticon</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>previousicon</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Templates of TabPanel</h3>
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
                            <td>content</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>lefticon</td>
                            <td>$implicit: style class of the element.</td>
                        </tr>
                        <tr>
                            <td>righticon</td>
                            <td>$implicit: style class of the element.</td>
                        </tr>
                        <tr>
                            <td>closeicon</td>
                            <td>$implicit: style class of the element.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </section>`
})
export class TemplatesDoc {
    @Input() id: string;

    @Input() title: string;
}
