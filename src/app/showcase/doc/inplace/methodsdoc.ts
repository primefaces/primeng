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
                        <td>activate</td>
                        <td>-</td>
                        <td>Activates the content.</td>
                    </tr>
                    <tr>
                        <td>deactivate</td>
                        <td>-</td>
                        <td>Deactivates the content.</td>
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
