import { Component } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: ` <app-docsectiontext>
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
                        <td>p-autocomplete</td>
                        <td>Container element</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-panel</td>
                        <td>Overlay panel of suggestions.</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-items</td>
                        <td>List container of suggestions.</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-item</td>
                        <td>List item of a suggestion.</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-token</td>
                        <td>Element of a selected item in multiple mode.</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-token-icon</td>
                        <td>Close icon element of a selected item in multiple mode.</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-token-label</td>
                        <td>Label of a selected item in multiple mode.</td>
                    </tr>
                    <tr>
                        <td>p-autocomplete-loader</td>
                        <td>Loader icon.</td>
                    </tr>
                </tbody>
            </table>
        </div>`
})
export class StyleDoc {}
