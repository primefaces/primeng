import { Component, Input } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <section class="py-4">
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
                        <td>p-chips</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-chips-token</td>
                        <td>Chip element container.</td>
                    </tr>
                    <tr>
                        <td>p-chips-token-icon</td>
                        <td>Icon of a chip.</td>
                    </tr>
                    <tr>
                        <td>p-chips-token-label</td>
                        <td>Label of a chip.</td>
                    </tr>
                    <tr>
                        <td>p-chips-input-token</td>
                        <td>Container of input element.</td>
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
