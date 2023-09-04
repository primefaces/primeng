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
                        <td>p-speeddial</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-speed-dial-button</td>
                        <td>Button element of speeddial.</td>
                    </tr>
                    <tr>
                        <td>p-speed-dial-mask</td>
                        <td>Mask element of speeddial.</td>
                    </tr>
                    <tr>
                        <td>p-speed-dial-list</td>
                        <td>List of the actions.</td>
                    </tr>
                    <tr>
                        <td>p-speed-dial-item</td>
                        <td>Each action item of list.</td>
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
