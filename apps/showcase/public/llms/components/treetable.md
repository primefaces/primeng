# Angular TreeTable Component

TreeTable is used to display hierarchical data in tabular format.

## accessibility-doc

Screen Reader Default role of the table is table . Header, body and footer elements use rowgroup , rows use row role, header cells have columnheader and body cells use cell roles. Sortable headers utilizer aria-sort attribute either set to "ascending" or "descending". Row elements manage aria-expanded for state and aria-level attribute to define the hierachy by ttRow directive. Table rows and table cells should be specified by users using the aria-posinset , aria-setsize , aria-label , and aria-describedby attributes, as they are determined through templating. When selection is enabled, ttSelectableRow directive sets aria-selected to true on a row. In checkbox mode, the built-in checkbox component use checkbox role with aria-checked state attribute. Editable cells use custom templating so you need to manage aria roles and attributes manually if required. Paginator is a standalone component used inside the TreeTable, refer to the paginator for more information about the accessibility features. Sortable Headers Keyboard Support Key Function tab Moves through the headers. enter Sorts the column. space Sorts the column. Keyboard Support Key Function tab Moves focus to the first selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the next focusable element in the page tab sequence. shift + tab Moves focus to the last selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the previous focusable element in the page tab sequence. enter Selects the focused treenode. space Selects the focused treenode. down arrow Moves focus to the next treenode. up arrow Moves focus to the previous treenode. right arrow If node is closed, opens the node otherwise moves focus to the first child node. left arrow If node is open, closes the node otherwise moves focus to the parent node.

## basic-doc

TreeTable requires a collection of TreeNode instances as a value components as children for the representation.

## columnresizeexpand-doc

Setting columnResizeMode as expand changes the table width as well.

## columnresizefit-doc

Columns can be resized with drag and drop when resizableColumns is enabled. Default resize mode is fit that does not change the overall table width.

## columnresizescrollable-doc

To utilize the column resize modes with a scrollable TreeTable, a colgroup template must be defined. The default value of scrollHeight is "flex," it can also be set as a string value.

## columntoggle-doc

Column visibility based on a condition can be implemented with dynamic columns, in this sample a MultiSelect is used to manage the visible columns.

## conditionalstyle-doc

Particular rows and cells can be styled based on conditions. The ngClass receives a row data as a parameter to return a style class for a row whereas cells are customized using the body template.

## contextmenu-doc

TreeTable has exclusive integration with contextmenu component. In order to attach a menu to a table, add ttContextMenuRow directive to the rows that can be selected with context menu, define a local template variable for the menu and bind it to the contextMenu property of the table. This enables displaying the menu whenever a row is right clicked. A separate contextMenuSelection property is used to get a hold of the right clicked row. For dynamic columns, setting ttContextMenuRowDisabled property as true disables context menu for that particular row.

## controlled-doc

Expansion state is controlled with expandedKeys property.

## dynamiccolumns-doc

Columns can be created programmatically.

## edit-doc

Incell editing is enabled by defining input elements with treeTableCellEditor .

## filter-doc

The filterMode specifies the filtering strategy, in lenient mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in strict mode when the query matches a node, filtering continues on all descendants. A general filled called filterGlobal is also provided to search all columns that support filtering.

## flexiblescroll-doc

Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data viewport adjusts itself according to the size changes.

## gridlines-doc

Enabling showGridlines displays grid lines.

## lazyload-doc

Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime paging , sorting and filtering occurs. Sample below imitates lazy loading data from a remote datasource using an in-memory list and timeouts to mimic network connection. Enabling the lazy property and assigning the logical number of rows to totalRecords by doing a projection query are the key elements of the implementation so that paginator displays the UI assuming there are actually records of totalRecords size although in reality they are not present on page, only the records that are displayed on the current page exist. In addition, only the root elements should be loaded, children can be loaded on demand using onNodeExpand callback.

## loadingmask-doc

The loading property displays a mask layer to indicate busy state. Use the paginator to display the mask.

## loadingskeleton-doc

Skeleton component can be used as a placeholder during the loading process.

## paginatorbasic-doc

Pagination is enabled by adding paginator property and defining rows per page.

## paginatortemplate-doc

Paginator UI is customized using the paginatorleft and paginatorright property. Each element can also be customized further with your own UI to replace the default one, refer to the Paginator component for more information about the advanced customization options.

## reorder-doc

Order of the columns can be changed using drag and drop when reorderableColumns is present.

## scrollfrozencolumns-doc

A column can be fixed during horizontal scrolling by enabling the frozenColumns property.

## scrollhorizontal-doc

Horizontal scrolling is enabled when the total width of columns exceeds table width.

## scrollvertical-doc

Adding scrollable property along with a scrollHeight for the data viewport enables vertical scrolling with fixed headers.

## selectioncheckbox-doc

Selection of multiple nodes via checkboxes is enabled by configuring selectionMode as checkbox . In checkbox selection mode, value binding should be a key-value pair where key (or the dataKey) is the node key and value is an object that has checked and partialChecked properties to represent the checked state of a node.

## selectioneventsc-doc

TreeTable provides onNodeSelect and onNodeUnselect events to listen selection events.

## selectionmultiple-doc

More than one node is selectable by setting selectionMode to multiple . By default in multiple selection mode, metaKey press (e.g. ⌘ ) is necessary to add to existing selections however this can be configured with disabling the metaKeySelection property. Note that in touch enabled devices, TreeTable always ignores metaKey.

## selectionsingle-doc

Single node selection is configured by setting selectionMode as single along with selection properties to manage the selection value binding. By default, metaKey press (e.g. ⌘ ) is necessary to unselect a node however this can be configured with disabling the metaKeySelection property. In touch enabled devices this option has no effect and behavior is same as setting it to false

## size-doc

In addition to a regular treetable, alternatives with alternative sizes are available. Add p-treetable-sm class to reduce the size of treetable or p-treetable-lg to enlarge it.

## sortmultiplecolumns-doc

Multiple columns can be sorted by defining sortMode as multiple . This mode requires metaKey (e.g. ⌘ ) to be pressed when clicking a header.

## sortremovable-doc

The removable sort can be implemented using the customSort property.

## sortsinglecolumn-doc

Sorting on a column is enabled by adding the ttSortableColumn property.

## template-doc

Custom content at caption , header , body and summary sections are supported via templating.

## Tree Table

TreeTable is used to display hierarchical data in tabular format.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TreeTablePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| columns | any[] | - | An array of objects to represent dynamic columns. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| tableStyle | { [klass: string]: any } | - | Inline style of the table. |
| tableStyleClass | string | - | Style class of the table. |
| autoLayout | boolean | false | Whether the cell widths scale according to their content or not. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| lazyLoadOnInit | boolean | true | Whether to call lazy loading on initialization. |
| paginator | boolean | false | When specified as true, enables the pagination. |
| rows | number | - | Number of rows to display per page. |
| first | number | 0 | Index of the first row to be displayed. |
| pageLinks | number | 5 | Number of page links to display in paginator. |
| rowsPerPageOptions | any[] | - | Array of integer/object values to display inside rows per page dropdown of paginator |
| alwaysShowPaginator | boolean | true | Whether to show it even there is only one page. |
| paginatorPosition | "top" \| "bottom" \| "both" | bottom | Position of the paginator. |
| paginatorStyleClass | string | - | Custom style class for paginator |
| paginatorDropdownAppendTo | any | - | Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| currentPageReportTemplate | string | {currentPage} of {totalPages} | Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords} |
| showCurrentPageReport | boolean | false | Whether to display current page report. |
| showJumpToPageDropdown | boolean | false | Whether to display a dropdown to navigate to any page. |
| showFirstLastIcon | boolean | true | When enabled, icons are displayed on paginator to go first and last page. |
| showPageLinks | boolean | true | Whether to show page links. |
| defaultSortOrder | number | 1 | Sort order to use when an unsorted column gets sorted by user interaction. |
| sortMode | "multiple" \| "single" | single | Defines whether sorting works on single column or on multiple columns. |
| resetPageOnSort | boolean | true | When true, resets paginator to first page after sorting. |
| customSort | boolean | false | Whether to use the default sorting or a custom one using sortFunction. |
| selectionMode | string | - | Specifies the selection mode, valid values are "single" and "multiple". |
| contextMenuSelection | any | - | Selected row with a context menu. |
| contextMenuSelectionMode | string | separate | Mode of the contet menu selection. |
| dataKey | string | - | A property to uniquely identify a record in data. |
| metaKeySelection | boolean | false | Defines whether metaKey is should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically. |
| compareSelectionBy | string | deepEquals | Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields. |
| rowHover | boolean | false | Adds hover effect to rows without the need for selectionMode. |
| loading | boolean | false | Displays a loader to indicate data load is in progress. |
| loadingIcon | string | - | The icon to show while indicating data load is in progress. |
| showLoader | boolean | true | Whether to show the loading mask when loading property is true. |
| scrollable | boolean | false | When specified, enables horizontal and/or vertical scrolling. |
| scrollHeight | string | - | Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of a row to use in calculations of virtual scrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| virtualScrollDelay | number | 150 | The delay (in milliseconds) before triggering the virtual scroll. This determines the time gap between the user's scroll action and the actual rendering of the next set of items in the virtual scroll. |
| frozenWidth | string | - | Width of the frozen columns container. |
| frozenColumns | { [klass: string]: any } | - | An array of objects to represent dynamic columns that are frozen. |
| resizableColumns | boolean | false | When enabled, columns can be resized using drag and drop. |
| columnResizeMode | string | fit | Defines whether the overall table width should change on column resize, valid values are "fit" and "expand". |
| reorderableColumns | boolean | false | When enabled, columns can be reordered using drag and drop. |
| contextMenu | any | - | Local ng-template varilable of a ContextMenu. |
| rowTrackBy | Function | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. |
| filters | { [s: string]: FilterMetadata } | {} | An array of FilterMetadata objects to provide external filters. |
| globalFilterFields | string[] | - | An array of fields as string to use in global filtering. |
| filterDelay | number | 300 | Delay in milliseconds before filtering the data. |
| filterMode | string | lenient | Mode for filtering valid values are "lenient" and "strict". Default is lenient. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| paginatorLocale | string | - | Locale to be used in paginator formatting. |
| totalRecords | number | - | Number of total records, defaults to length of value when not defined. |
| sortField | string | - | Name of the field to sort data by default. |
| sortOrder | number | - | Order to sort when default sorting is enabled. |
| multiSortMeta | SortMeta[] | - | An array of SortMeta objects to sort the data by default in multiple sort mode. |
| selection | any | - | Selected row in single mode or an array of values in multiple mode. |
| value | TreeNode<any>[] | - | An array of objects to display. |
| virtualRowHeight | number | - | Indicates the height of rows to be scrolled. **(Deprecated)** |
| selectionKeys | any | - | A map of keys to control the selection state. |
| showGridlines | boolean | false | Whether to show grid lines between cells. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| selectionChange | value: TreeTableNode<any | Callback to invoke on selected node change. |
| contextMenuSelectionChange | value: TreeTableNode<any | Callback to invoke on context menu selection change. |
| onFilter | event: TreeTableFilterEvent | Callback to invoke when data is filtered. |
| onNodeExpand | event: TreeTableNodeExpandEvent<any | Callback to invoke when a node is expanded. |
| onNodeCollapse | event: TreeTableNodeCollapseEvent<any | Callback to invoke when a node is collapsed. |
| onPage | value: TreeTablePaginatorState | Callback to invoke when pagination occurs. |
| onSort | value: any | Callback to invoke when a column gets sorted. |
| onLazyLoad | event: TreeTableLazyLoadEvent | Callback to invoke when paging, sorting or filtering happens in lazy mode. |
| sortFunction | event: TreeTableSortEvent | An event emitter to invoke on custom sorting, refer to sorting section for details. |
| onColResize | event: TreeTableColResizeEvent | Callback to invoke when a column is resized. |
| onColReorder | event: TreeTableColumnReorderEvent | Callback to invoke when a column is reordered. |
| onNodeSelect | value: TreeTableNode<any | Callback to invoke when a node is selected. |
| onNodeUnselect | event: TreeTableNodeUnSelectEvent | Callback to invoke when a node is unselected. |
| onContextMenuSelect | event: TreeTableContextMenuSelectEvent | Callback to invoke when a node is selected with right click. |
| onHeaderCheckboxToggle | event: TreeTableHeaderCheckboxToggleEvent | Callback to invoke when state of header checkbox changes. |
| onEditInit | event: TreeTableEditEvent | Callback to invoke when a cell switches to edit mode. |
| onEditComplete | event: TreeTableEditEvent | Callback to invoke when cell edit is completed. |
| onEditCancel | event: TreeTableEditEvent | Callback to invoke when cell edit is cancelled with escape key. |
| selectionKeysChange | value: any | Callback to invoke when selectionKeys are changed. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| resetScrollTop |  | void | Resets scroll to top. |
| scrollToVirtualIndex | index: number | void | Scrolls to given index when using virtual scroll. |
| scrollTo | options: ScrollToOptions | void | Scrolls to given index. |
| reset |  | void | Clears the sort and paginator state. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| loading | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the loading's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |
| loadingIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the loading icon's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcPaginator | PaginatorPassThrough | Used to pass attributes to the Paginator component. |
| wrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the wrapper's DOM element. |
| table | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the table's DOM element. |
| thead | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the thead's DOM element. |
| tbody | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the tbody's DOM element. |
| tfoot | PassThroughOption<HTMLTableSectionElement, I> | Used to pass attributes to the tfoot's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| scrollableWrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable wrapper's DOM element. |
| scrollableView | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable container's DOM element. |
| scrollableHeader | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable header's DOM element. |
| scrollableHeaderBox | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable header box's DOM element. |
| scrollableHeaderTable | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the scrollable header table's DOM element. |
| virtualScroller | VirtualScrollerPassThrough | Used to pass attributes to the Scroller component. |
| scrollableBody | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable body's DOM element. |
| scrollableFooter | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable footer's DOM element. |
| scrollableFooterBox | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the scrollable footer box's DOM element. |
| scrollableFooterTable | PassThroughOption<HTMLTableElement, I> | Used to pass attributes to the scrollable footer table's DOM element. |
| columnResizerHelper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the column resizer helper's DOM element. |
| reorderIndicatorUp | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the reorder indicator up's DOM element. |
| reorderIndicatorDown | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the reorder indicator down's DOM element. |
| sortableColumn | PassThroughOption<HTMLTableCellElement, I> | Used to pass attributes to the sortable column's DOM element. |
| sortableColumnIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the sortable column icon's DOM element. |
| pcSortableColumnBadge | BadgePassThrough | Used to pass attributes to the Badge component for sortable column. |
| row | PassThroughOption<HTMLTableRowElement, I> | Used to pass attributes to the row's DOM element. |
| pcRowCheckbox | CheckboxPassThrough | Used to pass attributes to the Checkbox component for row. |
| pcHeaderCheckbox | CheckboxPassThrough | Used to pass attributes to the Checkbox component for header. |
| cellEditor | PassThroughOption<HTMLElement, I> | Used to pass attributes to the cell editor's DOM element. |
| rowToggleButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the row toggle button's DOM element. |
| toggler | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the toggler's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-treetable | Class name of the root element |
| p-treetable-loading | Class name of the loading element |
| p-treetable-mask | Class name of the mask element |
| p-treetable-loading-icon | Class name of the loading icon element |
| p-treetable-header | Class name of the header element |
| p-treetable-paginator-[position] | Class name of the paginator element |
| p-treetable-table-container | Class name of the table container element |
| p-treetable-table | Class name of the table element |
| p-treetable-thead | Class name of the thead element |
| p-treetable-column-resizer | Class name of the column resizer element |
| p-treetable-column-title | Class name of the column title element |
| p-treetable-sort-icon | Class name of the sort icon element |
| p-treetable-sort-badge | Class name of the sort badge element |
| p-treetable-tbody | Class name of the tbody element |
| p-treetable-node-toggle-button | Class name of the node toggle button element |
| p-treetable-node-toggle-icon | Class name of the node toggle icon element |
| p-treetable-node-checkbox | Class name of the node checkbox element |
| p-treetable-empty-message | Class name of the empty message element |
| p-treetable-tfoot | Class name of the tfoot element |
| p-treetable-footer | Class name of the footer element |
| p-treetable-column-resize-indicator | Class name of the column resize indicator element |
| p-treetable-wrapper | Class name of the wrapper element |
| p-treetable-scrollable-wrapper | Class name of the scrollable wrapper element |
| p-treetable-scrollable-view | Class name of the scrollable view element |
| p-treetable-frozen-view | Class name of the frozen view element |
| p-treetable-column-resizer-helper | Class name of the column resizer helper element |
| p-treetable-reorder-indicator-up | Class name of the reorder indicator up element |
| p-treetable-reorder-indicator-down | Class name of the reorder indicator down element |
| p-treetable-scrollable-header | Class name of the scrollable header element |
| p-treetable-scrollable-header-box | Class name of the scrollable header box element |
| p-treetable-scrollable-header-table | Class name of the scrollable header table element |
| p-treetable-scrollable-body | Class name of the scrollable body element |
| p-treetable-scrollable-footer | Class name of the scrollable footer element |
| p-treetable-scrollable-footer-box | Class name of the scrollable footer box element |
| p-treetable-scrollable-footer-table | Class name of the scrollable footer table element |
| p-sortable-column-icon | Class name of the sortable column icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| treetable.transition.duration | --p-treetable-transition-duration | Transition duration of root |
| treetable.border.color | --p-treetable-border-color | Border color of root |
| treetable.header.background | --p-treetable-header-background | Background of header |
| treetable.header.border.color | --p-treetable-header-border-color | Border color of header |
| treetable.header.color | --p-treetable-header-color | Color of header |
| treetable.header.border.width | --p-treetable-header-border-width | Border width of header |
| treetable.header.padding | --p-treetable-header-padding | Padding of header |
| treetable.header.cell.background | --p-treetable-header-cell-background | Background of header cell |
| treetable.header.cell.hover.background | --p-treetable-header-cell-hover-background | Hover background of header cell |
| treetable.header.cell.selected.background | --p-treetable-header-cell-selected-background | Selected background of header cell |
| treetable.header.cell.border.color | --p-treetable-header-cell-border-color | Border color of header cell |
| treetable.header.cell.color | --p-treetable-header-cell-color | Color of header cell |
| treetable.header.cell.hover.color | --p-treetable-header-cell-hover-color | Hover color of header cell |
| treetable.header.cell.selected.color | --p-treetable-header-cell-selected-color | Selected color of header cell |
| treetable.header.cell.gap | --p-treetable-header-cell-gap | Gap of header cell |
| treetable.header.cell.padding | --p-treetable-header-cell-padding | Padding of header cell |
| treetable.header.cell.focus.ring.width | --p-treetable-header-cell-focus-ring-width | Focus ring width of header cell |
| treetable.header.cell.focus.ring.style | --p-treetable-header-cell-focus-ring-style | Focus ring style of header cell |
| treetable.header.cell.focus.ring.color | --p-treetable-header-cell-focus-ring-color | Focus ring color of header cell |
| treetable.header.cell.focus.ring.offset | --p-treetable-header-cell-focus-ring-offset | Focus ring offset of header cell |
| treetable.header.cell.focus.ring.shadow | --p-treetable-header-cell-focus-ring-shadow | Focus ring shadow of header cell |
| treetable.column.title.font.weight | --p-treetable-column-title-font-weight | Font weight of column title |
| treetable.row.background | --p-treetable-row-background | Background of row |
| treetable.row.hover.background | --p-treetable-row-hover-background | Hover background of row |
| treetable.row.selected.background | --p-treetable-row-selected-background | Selected background of row |
| treetable.row.color | --p-treetable-row-color | Color of row |
| treetable.row.hover.color | --p-treetable-row-hover-color | Hover color of row |
| treetable.row.selected.color | --p-treetable-row-selected-color | Selected color of row |
| treetable.row.focus.ring.width | --p-treetable-row-focus-ring-width | Focus ring width of row |
| treetable.row.focus.ring.style | --p-treetable-row-focus-ring-style | Focus ring style of row |
| treetable.row.focus.ring.color | --p-treetable-row-focus-ring-color | Focus ring color of row |
| treetable.row.focus.ring.offset | --p-treetable-row-focus-ring-offset | Focus ring offset of row |
| treetable.row.focus.ring.shadow | --p-treetable-row-focus-ring-shadow | Focus ring shadow of row |
| treetable.body.cell.border.color | --p-treetable-body-cell-border-color | Border color of body cell |
| treetable.body.cell.padding | --p-treetable-body-cell-padding | Padding of body cell |
| treetable.body.cell.gap | --p-treetable-body-cell-gap | Gap of body cell |
| treetable.body.cell.selected.border.color | --p-treetable-body-cell-selected-border-color | Selected border color of body cell |
| treetable.footer.cell.background | --p-treetable-footer-cell-background | Background of footer cell |
| treetable.footer.cell.border.color | --p-treetable-footer-cell-border-color | Border color of footer cell |
| treetable.footer.cell.color | --p-treetable-footer-cell-color | Color of footer cell |
| treetable.footer.cell.padding | --p-treetable-footer-cell-padding | Padding of footer cell |
| treetable.column.footer.font.weight | --p-treetable-column-footer-font-weight | Font weight of column footer |
| treetable.footer.background | --p-treetable-footer-background | Background of footer |
| treetable.footer.border.color | --p-treetable-footer-border-color | Border color of footer |
| treetable.footer.color | --p-treetable-footer-color | Color of footer |
| treetable.footer.border.width | --p-treetable-footer-border-width | Border width of footer |
| treetable.footer.padding | --p-treetable-footer-padding | Padding of footer |
| treetable.column.resizer.width | --p-treetable-column-resizer-width | Width of column resizer |
| treetable.resize.indicator.width | --p-treetable-resize-indicator-width | Width of resize indicator |
| treetable.resize.indicator.color | --p-treetable-resize-indicator-color | Color of resize indicator |
| treetable.sort.icon.color | --p-treetable-sort-icon-color | Color of sort icon |
| treetable.sort.icon.hover.color | --p-treetable-sort-icon-hover-color | Hover color of sort icon |
| treetable.sort.icon.size | --p-treetable-sort-icon-size | Size of sort icon |
| treetable.loading.icon.size | --p-treetable-loading-icon-size | Size of loading icon |
| treetable.node.toggle.button.hover.background | --p-treetable-node-toggle-button-hover-background | Hover background of node toggle button |
| treetable.node.toggle.button.selected.hover.background | --p-treetable-node-toggle-button-selected-hover-background | Selected hover background of node toggle button |
| treetable.node.toggle.button.color | --p-treetable-node-toggle-button-color | Color of node toggle button |
| treetable.node.toggle.button.hover.color | --p-treetable-node-toggle-button-hover-color | Hover color of node toggle button |
| treetable.node.toggle.button.selected.hover.color | --p-treetable-node-toggle-button-selected-hover-color | Selected hover color of node toggle button |
| treetable.node.toggle.button.size | --p-treetable-node-toggle-button-size | Size of node toggle button |
| treetable.node.toggle.button.border.radius | --p-treetable-node-toggle-button-border-radius | Border radius of node toggle button |
| treetable.node.toggle.button.focus.ring.width | --p-treetable-node-toggle-button-focus-ring-width | Focus ring width of node toggle button |
| treetable.node.toggle.button.focus.ring.style | --p-treetable-node-toggle-button-focus-ring-style | Focus ring style of node toggle button |
| treetable.node.toggle.button.focus.ring.color | --p-treetable-node-toggle-button-focus-ring-color | Focus ring color of node toggle button |
| treetable.node.toggle.button.focus.ring.offset | --p-treetable-node-toggle-button-focus-ring-offset | Focus ring offset of node toggle button |
| treetable.node.toggle.button.focus.ring.shadow | --p-treetable-node-toggle-button-focus-ring-shadow | Focus ring shadow of node toggle button |
| treetable.paginator.top.border.color | --p-treetable-paginator-top-border-color | Border color of paginator top |
| treetable.paginator.top.border.width | --p-treetable-paginator-top-border-width | Border width of paginator top |
| treetable.paginator.bottom.border.color | --p-treetable-paginator-bottom-border-color | Border color of paginator bottom |
| treetable.paginator.bottom.border.width | --p-treetable-paginator-bottom-border-width | Border width of paginator bottom |

