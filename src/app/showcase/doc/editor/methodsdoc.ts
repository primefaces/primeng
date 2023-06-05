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
                        <td>getQuill</td>
                        <td>-</td>
                        <td>Returns the underlying quill instance.</td>
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
