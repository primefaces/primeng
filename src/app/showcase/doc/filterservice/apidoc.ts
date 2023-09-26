import { Component, Input } from '@angular/core';

@Component({
    selector: 'api-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Following is the list of structural style classes, for theming classes visit <a href="#" [routerLink]="['/theming']">theming</a> page.</p>
        </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>filter</td>
                        <td>
                            value[]: An array of values to filter<br />
                            fields[]: An array of properties in the value object<br />
                            filterValue: Filter value<br />
                            filterMatchMode: Constraint<br />
                            filterLocale: Locale to use in filtering
                        </td>
                        <td>Whether the property values of the given value collection matches the filter.</td>
                    </tr>
                    <tr>
                        <td>filters</td>
                        <td>-</td>
                        <td>Property to access constraints collection.</td>
                    </tr>
                    <tr>
                        <td>register</td>
                        <td>
                            name: string <br />
                            fn: Filter callback
                        </td>
                        <td>Registers a new constraint in filters.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class ApiDoc {
    @Input() id: string;

    @Input() title: string;
}
