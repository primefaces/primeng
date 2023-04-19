import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>item</td>
                        <td>$implicit: Data of the item</td>
                    </tr>
                    <tr>
                        <td>group</td>
                        <td>$implicit: Data of the group item</td>
                    </tr>
                    <tr>
                        <td>selectedItems</td>
                        <td>$implicit: value</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>filter</td>
                        <td>
                            options.filter: Callback to filter data by the value param<br />
                            options.reset: Resets the filter.
                        </td>
                    </tr>
                    <tr>
                        <td>empty</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptyfilter</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>loader</td>
                        <td>options: Options of the scroller on loading. *This template can be used with virtualScroll.</td>
                    </tr>
                    <tr>
                        <td>checkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>filtericon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>removetokenicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>closeicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>clearicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>dropdownicon</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class TemplatesDoc {
    @Input() id: string;

    @Input() title: string;
}
