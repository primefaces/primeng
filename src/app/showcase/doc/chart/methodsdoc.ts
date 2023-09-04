import { Component, Input } from '@angular/core';

@Component({
    selector: 'methods-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>refresh</td>
                        <td>-</td>
                        <td>Redraws the graph with new data.</td>
                    </tr>
                    <tr>
                        <td>reinit</td>
                        <td>-</td>
                        <td>Destroys the graph first and then creates it again.</td>
                    </tr>
                    <tr>
                        <td>generateLegend</td>
                        <td>-</td>
                        <td>Returns an HTML string of a legend for that chart. The legend is generated from the legendCallback in the options.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class MethodsDoc {
    @Input() id: string;

    @Input() title: string;
}
