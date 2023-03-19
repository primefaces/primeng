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
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>caption</td>
                        <td>-</td>
                        <td>Caption content of the table.</td>
                    </tr>
                    <tr>
                        <td>header</td>
                        <td>$implicit: Columns</td>
                        <td>Content of the thead element.</td>
                    </tr>
                    <tr>
                        <td>headergrouped</td>
                        <td>$implicit: Columns</td>
                        <td>Content of the thead element. <b> Deprecated: </b> Use header with v14.2.0+.</td>
                    </tr>
                    <tr>
                        <td>body</td>
                        <td>
                            $implicit: Data of the row <br />
                            rowIndex: Index of the row <br />
                            columns: Columns collection <br />
                            expanded: Whether the row is expanded <br />
                            rowgroup: Whether the row is rowgroup <br />
                            rowspan: Row span of the rowgroup
                        </td>
                        <td>Content of the tbody element.</td>
                    </tr>
                    <tr>
                        <td>footer</td>
                        <td>$implicit: Columns</td>
                        <td>Content of the tfoot element.</td>
                    </tr>
                    <tr>
                        <td>footergrouped</td>
                        <td>$implicit: Columns</td>
                        <td>Content of the tfoot element. <b> Deprecated: </b> Use footer with v14.2.0+.</td>
                    </tr>
                    <tr>
                        <td>summary</td>
                        <td>-</td>
                        <td>Summary section to display below the table.</td>
                    </tr>
                    <tr>
                        <td>rowexpansion</td>
                        <td>
                            $implicit: Data of the row <br />
                            rowIndex: Index of the row <br />
                            columns: Columns collection <br />
                        </td>
                        <td>Content of an extended row.</td>
                    </tr>
                    <tr>
                        <td>frozenbody</td>
                        <td>
                            $implicit: Data of the row <br />
                            rowIndex: Index of the row <br />
                            columns: Columns collection <br />
                        </td>
                        <td>Content of the tbody element in frozen side.</td>
                    </tr>
                    <tr>
                        <td>frozenrowexpansion</td>
                        <td>
                            $implicit: Data of the row <br />
                            rowIndex: Index of the row <br />
                            columns: Columns collection <br />
                        </td>
                        <td>Content of an extended row in frozen side.</td>
                    </tr>
                    <tr>
                        <td>groupheader</td>
                        <td>
                            $implicit: Data of the row <br />
                            rowIndex: Index of the row <br />
                            columns: Columns collection <br />
                        </td>
                        <td>Header of the grouped rows.</td>
                    </tr>
                    <tr>
                        <td>groupfooter</td>
                        <td>
                            $implicit: Data of the row <br />
                            rowIndex: Index of the row <br />
                            columns: Columns collection <br />
                        </td>
                        <td>Footer of the grouped rows.</td>
                    </tr>
                    <tr>
                        <td>emptymessage</td>
                        <td>
                            $implicit: Columns <br />
                            frozen: Whether the body belongs to the frozen part of the table.
                        </td>
                        <td>Content to display when there is no value to display.</td>
                    </tr>
                    <tr>
                        <td>paginatorleft</td>
                        <td>
                            state: $implicit state.page: Current page<br />
                            state.pageCount: Total page count<br />
                            state.rows: Rows per page<br />
                            state.first: Index of the first records<br />
                            state.totalRecords: Number of total records<br />
                        </td>
                        <td>Custom content for the left section of the paginator.</td>
                    </tr>
                    <tr>
                        <td>paginatorright</td>
                        <td>
                            state: $implicit state.page: Current page<br />
                            state.pageCount: Total page count<br />
                            state.rows: Rows per page<br />
                            state.first: Index of the first records<br />
                            state.totalRecords: Number of total records<br />
                        </td>
                        <td>Custom content for the right section of the paginator.</td>
                    </tr>
                    <tr>
                        <td>loadingbody</td>
                        <td>columns: Columns collection <br /></td>
                        <td>Content of the tbody element to show when data is being loaded in virtual scroll mode.</td>
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
