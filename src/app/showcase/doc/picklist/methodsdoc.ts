import { Component, Input } from '@angular/core';

@Component({
    selector: 'methods-doc',
    template: ` <section>
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
                        <td>resetSourceFilter</td>
                        <td>-</td>
                        <td>Resets the filters of the source list.</td>
                    </tr>
                    <tr>
                        <td>resetTargetFilter</td>
                        <td>-</td>
                        <td>Resets the filters of the target list.</td>
                    </tr>
                    <tr>
                        <td>resetFilter</td>
                        <td>-</td>
                        <td>Resets the filters.</td>
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
