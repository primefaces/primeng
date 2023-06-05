import { Component, Input } from '@angular/core';

@Component({
    selector: 'service-doc',
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
                        <td>confirm</td>
                        <td>confirm: Confirmation Object</td>
                        <td>Displays the dialog using the confirmation object options.</td>
                    </tr>
                    <tr>
                        <td>close</td>
                        <td>-</td>
                        <td>Hides the dialog without invoking accept or reject callbacks.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class ServiceDoc {
    @Input() id: string;

    @Input() title: string;
}
