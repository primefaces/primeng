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
                        <td>p-divider</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-divider-horizontal</td>
                        <td>Container element in horizontal layout.</td>
                    </tr>
                    <tr>
                        <td>p-divider-vertical</td>
                        <td>Container element in vertical layout.</td>
                    </tr>
                    <tr>
                        <td>p-divider-solid</td>
                        <td>Container element with solid border.</td>
                    </tr>
                    <tr>
                        <td>p-divider-dashed</td>
                        <td>Container element with dashed border.</td>
                    </tr>
                    <tr>
                        <td>p-divider-dotted</td>
                        <td>Container element with dotted border.</td>
                    </tr>
                    <tr>
                        <td>p-divider-left</td>
                        <td>Container element with content aligned to left.</td>
                    </tr>
                    <tr>
                        <td>p-divider-right</td>
                        <td>Container element with content aligned to right.</td>
                    </tr>
                    <tr>
                        <td>p-divider-center</td>
                        <td>Container element with content aligned to center.</td>
                    </tr>
                    <tr>
                        <td>p-divider-bottom</td>
                        <td>Container element with content aligned to bottom.</td>
                    </tr>
                    <tr>
                        <td>p-divider-top</td>
                        <td>Container element with content aligned to top.</td>
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
