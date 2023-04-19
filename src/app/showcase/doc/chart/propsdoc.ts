import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>type</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Type of the chart.</td>
                    </tr>
                    <tr>
                        <td>data</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Data to display.</td>
                    </tr>
                    <tr>
                        <td>options</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Options to customize the chart.</td>
                    </tr>
                    <tr>
                        <td>plugins</td>
                        <td>any[]</td>
                        <td>null</td>
                        <td>Array of per-chart plugins to customize the chart behaviour.</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Width of the chart.</td>
                    </tr>
                    <tr>
                        <td>height</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Height of the chart.</td>
                    </tr>
                    <tr>
                        <td>responsive</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether the chart is redrawn on screen size change.</td>
                    </tr>
                    <tr>
                        <td>onDataSelect</td>
                        <td>function</td>
                        <td>null</td>
                        <td>Callback to execute when an element on chart is clicked.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
