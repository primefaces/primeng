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
                        <td>firstpagelinkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>previouspagelinkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>lastpagelinkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>nextpagelinkicon</td>
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
