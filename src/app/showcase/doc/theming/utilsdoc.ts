import { Component, Input } from '@angular/core';

@Component({
    selector: 'utils-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A couple of utility classes are provided as a solution to common requirements.</p>
        </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-component</td>
                        <td>Applies component theming such as font-family and font-size to an element.</td>
                    </tr>
                    <tr>
                        <td>p-fluid</td>
                        <td>Applies 100% width to all descendant components.</td>
                    </tr>
                    <tr>
                        <td>p-disabled</td>
                        <td>Applies an opacity to display as disabled.</td>
                    </tr>
                    <tr>
                        <td>p-sr-only</td>
                        <td>Element becomes visually hidden however accessibility is still available.</td>
                    </tr>
                    <tr>
                        <td>p-reset</td>
                        <td>Resets the browsers defaults.</td>
                    </tr>
                    <tr>
                        <td>p-link</td>
                        <td>Renders a button as a link.</td>
                    </tr>
                    <tr>
                        <td>p-error</td>
                        <td>Indicates an error text.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class UtilsDoc {
    @Input() id: string;

    @Input() title: string;
}
