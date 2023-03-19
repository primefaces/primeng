import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section>
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
                        <td>p-inputnumber</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-stacked</td>
                        <td>Container element with stacked buttons.</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-horizontal</td>
                        <td>Container element with horizontal buttons.</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-vertical</td>
                        <td>Container element with vertical buttons.</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-input</td>
                        <td>Input element</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-button</td>
                        <td>Input element</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-button-up</td>
                        <td>Increment button</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-button-down</td>
                        <td>Decrement button</td>
                    </tr>
                    <tr>
                        <td>p-inputnumber-button-icon</td>
                        <td>Button icon</td>
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
