import { Component, Input } from '@angular/core';

@Component({
    selector: 'templates-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <h3>Templates of Table</h3>
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
                        <tr>
                            <td>loadingicon</td>
                            <td>-</td>
                            <td>Template selector for loading icon.</td>
                        </tr>
                        <tr>
                            <td>reorderindicatorupicon</td>
                            <td>-</td>
                            <td>Template selector for reorder indicator up icon.</td>
                        </tr>
                        <tr>
                            <td>reorderindicatordownicon</td>
                            <td>-</td>
                            <td>Template selector for reorder indicator down icon.</td>
                        </tr>
                        <tr>
                            <td>sorticon</td>
                            <td>$implicit: sortOrder</td>
                            <td>Template selector for sort icon.</td>
                        </tr>
                        <tr>
                            <td>checkboxicon</td>
                            <td>-</td>
                            <td>Template selector for table checkbox icon.</td>
                        </tr>
                        <tr>
                            <td>headercheckboxicon</td>
                            <td>$implicit: checked</td>
                            <td>Template selector for table header checkbox icon.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Templates of ColumnFilter</h3>
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
                            <td>header</td>
                            <td>$implicit: field</td>
                            <td>Header content of the column filter.</td>
                        </tr>
                        <tr>
                            <td>filter</td>
                            <td>
                                $implicit: filterConstraint.value,<br />
                                filterCallback: filterCallback,<br />
                                type: type,<br />
                                field: field,<br />
                                filterConstraint: filterConstraint,<br />
                                placeholder: placeholder,<br />
                                minFractionDigits: minFractionDigits,<br />
                                maxFractionDigits: maxFractionDigits,<br />
                                prefix: prefix,<br />
                                suffix: suffix,<br />
                                locale: locale,<br />
                                localeMatcher: localeMatcher,<br />
                                currency: currency,<br />
                                currencyDisplay: currencyDisplay,<br />
                                useGrouping: useGrouping,<br />
                                showButtons: showButtons
                            </td>
                            <td>Filter content of the column filter.</td>
                        </tr>
                        <tr>
                            <td>footer</td>
                            <td>-</td>
                            <td>Footer content of the column filter.</td>
                        </tr>
                        <tr>
                            <td>filtericon</td>
                            <td>-</td>
                            <td>Template selector of the filter icon.</td>
                        </tr>
                        <tr>
                            <td>removeruleicon</td>
                            <td>-</td>
                            <td>Template selector of the remove filter constraint button.</td>
                        </tr>
                        <tr>
                            <td>addruleicon</td>
                            <td>-</td>
                            <td>Template selector of the add filter constraint button.</td>
                        </tr>
                        <tr>
                            <td>paginatorfirstpagelinkicon</td>
                            <td>-</td>
                            <td>Template selector of the first page icon of paginator.</td>
                        </tr>
                        <tr>
                            <td>paginatorlastpagelinkicon</td>
                            <td>-</td>
                            <td>Template selector of the last page icon of paginator.</td>
                        </tr>
                        <tr>
                            <td>paginatorpreviouspagelinkicon</td>
                            <td>-</td>
                            <td>Template selector of the previous page icon of paginator.</td>
                        </tr>
                        <tr>
                            <td>paginatornextpagelinkicon</td>
                            <td>-</td>
                            <td>Template selector of the next page icon of paginator.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </section>`
})
export class TemplatesDoc {
    @Input() id: string;

    @Input() title: string;
}
