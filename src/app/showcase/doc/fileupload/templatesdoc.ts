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
                        <td>file</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>content</td>
                        <td>$implicit: files</td>
                    </tr>
                    <tr>
                        <td>toolbar</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>chooseicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>uploadicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>cancelicon</td>
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
