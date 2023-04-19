import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"> </app-docsectiontext>
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
                        <td>value</td>
                        <td>$implicit: Value of the component</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>
                            $implicit: Value of the component <br />
                            options: TreeNode options
                        </td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>
                            $implicit: Value of the component <br />
                            options: TreeNode options
                        </td>
                    </tr>
                    <tr>
                        <td>empty</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>clearicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>triggericon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>filtericon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>closeicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>itemtogglericon</td>
                        <td>$implicit: Expanded state of tree node.</td>
                    </tr>
                    <tr>
                        <td>itemcheckboxicon</td>
                        <td>
                            $implicit: Selected state. <br />
                            partialSelected: Whether the node is partial selected or not.
                        </td>
                    </tr>
                    <tr>
                        <td>itemloadingicon</td>
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
