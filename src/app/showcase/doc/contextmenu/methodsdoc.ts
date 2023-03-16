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
                        <td>toggle</td>
                        <td>event (optional): mouse event</td>
                        <td>Toggles the visibility of the popup menu.</td>
                    </tr>
                    <tr>
                        <td>show</td>
                        <td>event: browser event</td>
                        <td>Displays the popup menu.</td>
                    </tr>
                    <tr>
                        <td>hide</td>
                        <td>-</td>
                        <td>Hides the popup menu.</td>
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
