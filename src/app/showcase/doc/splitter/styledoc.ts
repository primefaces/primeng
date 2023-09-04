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
                        <td>p-splitter</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-splitter</td>
                        <td>Container element during resize.</td>
                    </tr>
                    <tr>
                        <td>p-splitter-horizontal</td>
                        <td>Container element with horizontal layout.</td>
                    </tr>
                    <tr>
                        <td>p-splitter-vertical</td>
                        <td>Container element with vertical layout.</td>
                    </tr>
                    <tr>
                        <td>p-splitter-panel</td>
                        <td>Splitter panel element.</td>
                    </tr>
                    <tr>
                        <td>p-splitter-gutter</td>
                        <td>Gutter element to use when resizing the panels.</td>
                    </tr>
                    <tr>
                        <td>p-splitter-gutter-handle</td>
                        <td>Handl element of the gutter.</td>
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
