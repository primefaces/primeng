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
                        <td>caption</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>$implicit: columns</td>
                    </tr>
                    <tr>
                        <td>body</td>
                        <td>
                            $implicit: serializedNode<br />
                            node: serializedNode.node<br />
                            rowData: serializedNode.node.data<br />
                            columns: columns
                        </td>
                    </tr>
                    <tr>
                        <td>loadingbody</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>$implicit: columns</td>
                    </tr>
                    <tr>
                        <td>summary</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>colgroup</td>
                        <td>$implicit: columns</td>
                    </tr>
                    <tr>
                        <td>emptymessage</td>
                        <td>
                            $implicit: columns<br />
                            frozen: frozen
                        </td>
                    </tr>
                    <tr>
                        <td>paginatorleft</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatorright</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatordropdownitem</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>frozenheader</td>
                        <td>$implicit: columns</td>
                    </tr>
                    <tr>
                        <td>frozenbody</td>
                        <td>
                            $implicit: serializedNode<br />
                            node: serializedNode.node<br />
                            rowData: serializedNode.node.data<br />
                            columns: columns
                        </td>
                    </tr>
                    <tr>
                        <td>frozenfooter</td>
                        <td>$implicit: columns</td>
                    </tr>
                    <tr>
                        <td>frozencolgroup</td>
                        <td>$implicit: columns</td>
                    </tr>
                    <tr>
                        <td>loadingicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>reorderindicatorupicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>reorderindicatordownicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>sorticon</td>
                        <td>$implicit: sortOrder</td>
                    </tr>
                    <tr>
                        <td>checkboxicon</td>
                        <td>
                            $implicit: checked <br />
                            partialSelected: rowNode.node.partialSelected
                        </td>
                    </tr>
                    <tr>
                        <td>headercheckboxicon</td>
                        <td>$implicit: checked</td>
                    </tr>
                    <tr>
                        <td>togglericon</td>
                        <td>$implicit: rowNode.node.expanded</td>
                    </tr>
                    <tr>
                        <td>paginatorfirstpagelinkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatorlastpagelinkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatorpreviouspagelinkicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>paginatornextpagelinkicon</td>
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
