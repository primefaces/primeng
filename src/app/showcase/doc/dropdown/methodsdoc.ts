import { Component, Input } from '@angular/core';

@Component({
    selector: 'methods-doc',
    template: ` <div>
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
                        <td>resetFilter</td>
                        <td>-</td>
                        <td>Resets filtering.</td>
                    </tr>
                    <tr>
                        <td>focus</td>
                        <td>-</td>
                        <td>Applies focus.</td>
                    </tr>
                    <tr>
                        <td>show</td>
                        <td>-</td>
                        <td>Displays the panel.</td>
                    </tr>
                    <tr>
                        <td>hide</td>
                        <td>-</td>
                        <td>Hides the panel.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class MethodsDoc {
    @Input() id: string;

    @Input() title: string;
}
