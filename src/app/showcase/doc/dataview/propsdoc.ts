import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>value</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to display.</td>
                    </tr>
                    <tr>
                        <td>layout</td>
                        <td>string</td>
                        <td>list</td>
                        <td>Layout of the items, valid values are "list" and "grid".</td>
                    </tr>
                    <tr>
                        <td>paginator</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified as true, enables the pagination.</td>
                    </tr>
                    <tr>
                        <td>rows</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Number of rows to display per page.</td>
                    </tr>
                    <tr>
                        <td>totalRecords</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Number of total records, defaults to length of value when not defined.</td>
                    </tr>
                    <tr>
                        <td>pageLinks</td>
                        <td>number</td>
                        <td>5</td>
                        <td>Number of page links to display in paginator.</td>
                    </tr>
                    <tr>
                        <td>rowsPerPageOptions</td>
                        <td>array</td>
                        <td>null</td>
                        <td>Array of integer/object values to display inside rows per page dropdown of paginator</td>
                    </tr>
                    <tr>
                        <td>paginatorPosition</td>
                        <td>string</td>
                        <td>bottom</td>
                        <td>Position of the paginator, options are "top","bottom" or "both".</td>
                    </tr>
                    <tr>
                        <td>alwaysShowPaginator</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show it even there is only one page.</td>
                    </tr>
                    <tr>
                        <td>showFirstLastIcon</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, icons are displayed on paginator to go first and last page.</td>
                    </tr>
                    <tr>
                        <td>paginatorDropdownAppendTo</td>
                        <td>any</td>
                        <td>null</td>
                        <td>
                            Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div
                            element having #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>paginatorDropdownScrollHeight</td>
                        <td>string</td>
                        <td>200px</td>
                        <td>Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.</td>
                    </tr>
                    <tr>
                        <td>currentPageReportTemplate</td>
                        <td>string</td>
                        <td>(&#123;currentPage&#125; of &#123;totalPages&#125;)</td>
                        <td>Template of the current page report element. Available placeholders are &#123;currentPage&#125;,&#123;totalPages&#125;,&#123;rows&#125;,&#123;first&#125;,&#123;last&#125; and &#123;totalRecords&#125;</td>
                    </tr>
                    <tr>
                        <td>showCurrentPageReport</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display current page report.</td>
                    </tr>
                    <tr>
                        <td>showJumpToPageDropdown</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display a dropdown to navigate to any page.</td>
                    </tr>
                    <tr>
                        <td>showPageLinks</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show page links.</td>
                    </tr>
                    <tr>
                        <td>lazy</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if data is loaded and interacted with in lazy manner.</td>
                    </tr>
                    <tr>
                        <td>emptyMessage</td>
                        <td>string</td>
                        <td>No records found.</td>
                        <td>Text to display when there is no data. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>gridStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the grid.</td>
                    </tr>
                    <tr>
                        <td>trackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Comma separated list of fields in the object graph to search against.</td>
                    </tr>
                    <tr>
                        <td>filterLocale</td>
                        <td>string</td>
                        <td>undefined</td>
                        <td>Locale to use in filtering. The default locale is the host environment's current locale.</td>
                    </tr>
                    <tr>
                        <td>loading</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays a loader to indicate data load is in progress.</td>
                    </tr>
                    <tr>
                        <td>loadingIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>The icon to show while indicating data load is in progress.</td>
                    </tr>
                    <tr>
                        <td>first</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Index of the first row to be displayed.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
