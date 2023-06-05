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
                        <td>value</td>
                        <td>$implicit: value</td>
                    </tr>
                    <tr>
                        <td>option</td>
                        <td>$implicit: option</td>
                    </tr>
                    <tr>
                        <td>triggericon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>clearicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>optiongroupicon</td>
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
