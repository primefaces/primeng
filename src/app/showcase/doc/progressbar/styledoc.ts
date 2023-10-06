import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-4">
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
                        <td>p-progressbar</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-progressbar-determinate</td>
                        <td>Container element of a determinate progressbar.</td>
                    </tr>
                    <tr>
                        <td>p-progressbar-indeterminate</td>
                        <td>Container element of an indeterminate progressbar.</td>
                    </tr>
                    <tr>
                        <td>p-progressbar-value</td>
                        <td>Element whose width changes according to value.</td>
                    </tr>
                    <tr>
                        <td>p-progressbar-label</td>
                        <td>Label element that displays the current value.</td>
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
