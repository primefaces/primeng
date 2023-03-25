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
                        <td>
                            $implicit: Data of the item<br />
                            index: Index of the item
                        </td>
                    </tr>
                    <tr>
                        <td>sourceHeader</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>targetHeader</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>sourceFilter</td>
                        <td>
                            options.filter: Callback to filter data by the value param<br />
                            options.reset: Resets the filters.
                        </td>
                    </tr>
                    <tr>
                        <td>targetFilter</td>
                        <td>
                            options.filter: Callback to filter data by the value param<br />
                            options.reset: Resets the filters
                        </td>
                    </tr>
                    <tr>
                        <td>emptymessagesource</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptyfiltermessagesource</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptymessagetarget</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptyfiltermessagetarget</td>
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
