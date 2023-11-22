import { Component } from '@angular/core';

@Component({
    selector: 'style-doc',
    template: `
        <app-docsectiontext>
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
                        <td>p-dropdown</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-clearable</td>
                        <td>Container element when showClear is on.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-label</td>
                        <td>Element to display label of selected option.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-trigger</td>
                        <td>Icon element.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-panel</td>
                        <td>Icon element.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-items-wrapper</td>
                        <td>Wrapper element of items list.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-items</td>
                        <td>List element of items.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-item</td>
                        <td>An item in the list.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-filter-container</td>
                        <td>Container of filter input.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-filter</td>
                        <td>Filter element.</td>
                    </tr>
                    <tr>
                        <td>p-dropdown-open</td>
                        <td>Container element when overlay is visible.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class StyleDoc {
  
}
