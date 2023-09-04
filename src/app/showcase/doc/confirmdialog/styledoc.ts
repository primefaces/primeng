import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-dialog</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-confirmdialog</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-dialog-titlebar</td>
                        <td>Container of header.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-title</td>
                        <td>Header element.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-titlebar-icon</td>
                        <td>Icon container inside header.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-titlebar-close</td>
                        <td>Close icon element.</td>
                    </tr>
                    <tr>
                        <td>p-dialog-content</td>
                        <td>Content element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class StyleDoc {
    @Input() id: string;

    @Input() title: string;
}
