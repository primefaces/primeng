import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <i>theming page.</i></p>
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
                        <td>p-checkbox</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-checkbox-box</td>
                        <td>Container of icon.</td>
                    </tr>
                    <tr>
                        <td>p-checkbox-icon</td>
                        <td>Icon element.</td>
                    </tr>
                    <tr>
                        <td>p-checkbox-label</td>
                        <td>Label element.</td>
                    </tr>
                    <tr>
                        <td>p-label-active</td>
                        <td>Label element of a checked state.</td>
                    </tr>
                    <tr>
                        <td>p-label-focus</td>
                        <td>Label element of a focused state.</td>
                    </tr>
                    <tr>
                        <td>p-label-disabled</td>
                        <td>Label element of a disabled state.</td>
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
