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
                        <td>columns</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to represent dynamic columns.</td>
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
                        <td>tableStyle</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Inline style of the table.</td>
                    </tr>
                    <tr>
                        <td>tableStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the table.</td>
                    </tr>
                    <tr>
                        <td>autoLayout</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the cell widths scale according to their content or not.</td>
                    </tr>
                    <tr>
                        <td>lazy</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if data is loaded and interacted with in lazy manner.</td>
                    </tr>
                    <tr>
                        <td>lazyLoadOnInit</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to call lazy loading on initialization.</td>
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
                        <td>first</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Index of the first row to be displayed.</td>
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
                        <td>null</td>
                        <td>Number of page links to display in paginator.</td>
                    </tr>
                    <tr>
                        <td>rowsPerPageOptions</td>
                        <td>array</td>
                        <td>null</td>
                        <td>Array of integer/object values to display inside rows per page dropdown of paginator</td>
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
                        <td>paginatorPosition</td>
                        <td>string</td>
                        <td>bottom</td>
                        <td>Position of the paginator, options are "top","bottom" or "both".</td>
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
                        <td>defaultSortOrder</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Sort order to use when an unsorted column gets sorted by user interaction.</td>
                    </tr>
                    <tr>
                        <td>sortMode</td>
                        <td>string</td>
                        <td>single</td>
                        <td>Defines whether sorting works on single column or on multiple columns.</td>
                    </tr>
                    <tr>
                        <td>resetPageOnSort</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When true, resets paginator to first page after sorting.</td>
                    </tr>
                    <tr>
                        <td>customSort</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to use the default sorting or a custom one using sortFunction.</td>
                    </tr>
                    <tr>
                        <td>sortField</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the field to sort data by default.</td>
                    </tr>
                    <tr>
                        <td>sortOrder</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Order to sort when default sorting is enabled.</td>
                    </tr>
                    <tr>
                        <td>multiSortMeta</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of SortMeta objects to sort the data by default in multiple sort mode.</td>
                    </tr>
                    <tr>
                        <td>sortFunction</td>
                        <td>function</td>
                        <td>null</td>
                        <td>An event emitter to invoke on custom sorting, refer to sorting section for details.</td>
                    </tr>
                    <tr>
                        <td>filters</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of FilterMetadata objects to provide external filters.</td>
                    </tr>
                    <tr>
                        <td>filterDelay</td>
                        <td>number</td>
                        <td>300</td>
                        <td>Delay in milliseconds before filtering the data.</td>
                    </tr>
                    <tr>
                        <td>globalFilterFields</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of fields as string to use in global filtering.</td>
                    </tr>
                    <tr>
                        <td>filterMode</td>
                        <td>string</td>
                        <td>lenient</td>
                        <td>Mode for filtering valid values are "lenient" and "strict". Default is lenient.</td>
                    </tr>
                    <tr>
                        <td>filterLocale</td>
                        <td>string</td>
                        <td>undefined</td>
                        <td>Locale to use in filtering. The default locale is the host environment's current locale.</td>
                    </tr>
                    <tr>
                        <td>selectionMode</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Specifies the selection mode, valid values are "single" and "multiple".</td>
                    </tr>
                    <tr>
                        <td>selection</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Selected row in single mode or an array of values in multiple mode.</td>
                    </tr>
                    <tr>
                        <td>contextMenuSelection</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Selected row with a context menu.</td>
                    </tr>
                    <tr>
                        <td>dataKey</td>
                        <td>string</td>
                        <td>null</td>
                        <td>A property to uniquely identify a record in data.</td>
                    </tr>
                    <tr>
                        <td>metaKeySelection</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Defines whether metaKey is should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.</td>
                    </tr>
                    <tr>
                        <td>compareSelectionBy</td>
                        <td>string</td>
                        <td>deepEquals</td>
                        <td>Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.</td>
                    </tr>
                    <tr>
                        <td>rowHover</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Adds hover effect to rows without the need for selectionMode.</td>
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
                        <td>showLoader</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show the loading mask when loading property is true.</td>
                    </tr>
                    <tr>
                        <td>scrollable</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specifies, enables horizontal and/or vertical scrolling.</td>
                    </tr>
                    <tr>
                        <td>scrollHeight</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.</td>
                    </tr>
                    <tr>
                        <td>virtualScroll</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the data should be loaded on demand during scroll.</td>
                    </tr>
                    <tr>
                        <td>virtualScrollItemSize</td>
                        <td>number</td>
                        <td>28</td>
                        <td>Height of a row to use in calculations of virtual scrolling.</td>
                    </tr>
                    <tr>
                        <td>virtualScrollOptions</td>
                        <td>ScrollerOptions</td>
                        <td>null</td>
                        <td>Whether to use the scroller feature. The properties of <a href="#" [routerLink]="['/scroller']">scroller</a> component can be used like an object in it.</td>
                    </tr>
                    <tr>
                        <td>frozenWidth</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Width of the frozen columns container.</td>
                    </tr>
                    <tr>
                        <td>frozenColumns</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to represent dynamic columns that are frozen.</td>
                    </tr>
                    <tr>
                        <td>resizableColumns</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, columns can be resized using drag and drop.</td>
                    </tr>
                    <tr>
                        <td>columnResizeMode</td>
                        <td>string</td>
                        <td>fit</td>
                        <td>Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".</td>
                    </tr>
                    <tr>
                        <td>reorderableColumns</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, columns can be reordered using drag and drop.</td>
                    </tr>
                    <tr>
                        <td>contextMenu</td>
                        <td>ContextMenu</td>
                        <td>null</td>
                        <td>Local ng-template varilable of a ContextMenu.</td>
                    </tr>
                    <tr>
                        <td>rowTrackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.</td>
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
