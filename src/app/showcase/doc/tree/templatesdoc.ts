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
                        <td>header</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>empty</td>
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
                        <td>togglericon</td>
                        <td>$implicit: Expanded state of tree node.</td>
                    </tr>
                    <tr>
                        <td>checkboxicon</td>
                        <td>
                            $implicit: Selected state. <br />
                            partialSelected: Whether the node is partial selected or not.
                        </td>
                    </tr>
                    <tr>
                        <td>loadingicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>filtericon</td>
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
