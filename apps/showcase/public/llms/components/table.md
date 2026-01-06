# Angular Table Component

Table displays data in tabular format.

## accessibility-doc

Screen Reader Default role of the table is table . Header, body and footer elements use rowgroup , rows use row role, header cells have columnheader and body cells use cell roles. Sortable headers utilizer aria-sort attribute either set to "ascending" or "descending". Table rows and table cells should be specified by users using the aria-posinset , aria-setsize , aria-label , and aria-describedby attributes, as they are determined through templating. Built-in checkbox and radiobutton components for row selection use checkbox and radiobutton . The label to describe them is retrieved from the aria.selectRow and aria.unselectRow properties of the locale API. Similarly header checkbox uses selectAll and unselectAll keys. When a row is selected, aria-selected is set to true on a row. The element to expand or collapse a row is a button with aria-expanded and aria-controls properties. Value to describe the buttons is derived from aria.expandRow and aria.collapseRow properties of the locale API. The filter menu button use aria.showFilterMenu and aria.hideFilterMenu properties as aria-label in addition to the aria-haspopup , aria-expanded and aria-controls to define the relation between the button and the overlay. Popop menu has dialog role with aria-modal as focus is kept within the overlay. The operator dropdown use aria.filterOperator and filter constraints dropdown use aria.filterConstraint properties. Buttons to add rules on the other hand utilize aria.addRule and aria.removeRule properties. The footer buttons similarly use aria.clear and aria.apply properties. filterInputProps of the Column component can be used to define aria labels for the built-in filter components, if a custom component is used with templating you also may define your own aria labels as well. Editable cells use custom templating so you need to manage aria roles and attributes manually if required. The row editor controls are button elements with aria.editRow , aria.cancelEdit and aria.saveEdit used for the aria-label . Paginator is a standalone component used inside the Table, refer to the paginator for more information about the accessibility features. Keyboard Support Any button element inside the Table used for cases like filter, row expansion, edit are tabbable and can be used with space and enter keys. Sortable Headers Keyboard Support Key Function tab Moves through the headers. enter Sorts the column. space Sorts the column. Filter Menu Keyboard Support Key Function tab Moves through the elements inside the popup. escape Hides the popup. enter Opens the popup. Selection Keyboard Support Key Function tab Moves focus to the first selected row, if there is none then first row receives the focus. up arrow Moves focus to the previous row. down arrow Moves focus to the next row. enter Toggles the selected state of the focused row depending on the metaKeySelection setting. space Toggles the selected state of the focused row depending on the metaKeySelection setting. home Moves focus to the first row. end Moves focus to the last row. shift + down arrow Moves focus to the next row and toggles the selection state. shift + up arrow Moves focus to the previous row and toggles the selection state. shift + space Selects the rows between the most recently selected row and the focused row. control + shift + home Selects the focused rows and all the options up to the first one. control + shift + end Selects the focused rows and all the options down to the last one. control + a Selects all rows.

## basic-doc

DataTable requires a collection to display along with column components for the representation of the data.

## celledit-doc

In-cell editing is enabled by adding pEditableColumn directive to an editable cell that has a p-cellEditor helper component to define the input-output templates for the edit and view modes respectively.

## checkboxselection-doc

Multiple selection can also be handled using checkboxes by enabling the selectionMode property of column as multiple .

## columngroup-doc

Columns can be grouped using rowspan and colspan properties.

## columnresizeexpandmode-doc

Setting columnResizeMode as expand changes the table width as well.

## columnresizefitmode-doc

Columns can be resized using drag drop by setting the resizableColumns to true . Fit mode is the default one and the overall table width does not change when a column is resized.

## columnselection-doc

Row selection with an element inside a column is implemented with templating.

## columntoggle-doc

This demo uses a multiselect component to implement toggleable columns.

## contextmenu-doc

Table has exclusive integration with contextmenu component. In order to attach a menu to a table, add pContextMenuRow directive to the rows that can be selected with context menu, define a local template variable for the menu and bind it to the contextMenu property of the table. This enables displaying the menu whenever a row is right clicked. Optional pContextMenuRowIndex property is available to access the row index. A separate contextMenuSelection property is used to get a hold of the right clicked row. For dynamic columns, setting pContextMenuRowDisabled property as true disables context menu for that particular row.

## controlledselection-doc

Row selection can be controlled by utilizing rowSelectable and disabled properties.

## customers-doc

DataTable with selection, pagination, filtering, sorting and templating.

## dynamic-doc

Columns can be defined dynamically using the *ngFor directive.

## expandablerowgroup-doc

When expandableRowGroups is present in subheader based row grouping, groups can be expanded and collapsed. State of the expansions are controlled using the expandedRows and onRowToggle properties.

## export-doc

Table can export its data to CSV format.

## filter-advanced-doc

Filters are displayed in an overlay.

## filterbasic-doc

Data filtering is enabled by defining the filters property referring to a DataTableFilterMeta instance. Each column to filter also requires filter to be enabled. Built-in filter element is a input field and using filterElement , it is possible to customize the filtering with your own UI. The optional global filtering searches the data against a single value that is bound to the global key of the filters object. The fields to search against is defined with the globalFilterFields .

## flexiblescroll-doc

Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data viewport adjusts itself according to the size changes.

## frozencolumns-doc

Certain columns can be frozen by using the pFrozenColumn directive of the table component. In addition, alignFrozen is available to define whether the column should be fixed on the left or right.

## frozenrows-doc

Frozen rows are used to fix certain rows while scrolling, this data is defined with the frozenValue property.

## gridlines-doc

Enabling showGridlines displays borders between cells.

## horizontalscroll-doc

Horizontal scrollbar is displayed when table width exceeds the parent width.

## lazyload-doc

Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking onLazyLoad callback everytime paging , sorting and filtering happens. Sample here loads the data from remote datasource efficiently using lazy loading. Also, the implementation of checkbox selection in lazy tables is left entirely to the user. Since the table component does not know what will happen to the data on the next page or whether there are instant data changes, the selection array can be implemented in several ways. One of them is as in the example below.

## loadingmask-doc

The loading property displays a mask layer to indicate busy state. Use the paginator to display the mask.

## loadingskeleton-doc

Skeleton component can be used as a placeholder during the loading process.

## multiplecolumnssort-doc

Multiple columns can be sorted by defining sortMode as multiple . This mode requires metaKey (e.g. ⌘ ) to be pressed when clicking a header.

## multipleselection-doc

More than one row is selectable by setting selectionMode to multiple . By default in multiple selection mode, metaKey press (e.g. ⌘ ) is not necessary to add to existing selections. When the optional metaKeySelection is present, behavior is changed in a way that selecting a new row requires meta key to be present. Note that in touch enabled devices, DataTable always ignores metaKey.

## paginatorbasic-doc

Pagination is enabled by setting paginator property to true and defining a rows property to specify the number of rows per page.

## paginatorlocale-doc

paginator localization information such as page numbers and rows per page options are defined with the paginatorLocale property which defaults to the user locale.

## paginatorprogrammatic-doc

Paginator can also be controlled via model using a binding to the first property where changes trigger a pagination.

## presort-doc

Defining a default sortField and sortOrder displays data as sorted initially in single column sorting. In multiple sort mode, multiSortMeta should be used instead by providing an array of DataTableSortMeta objects.

## products-doc

CRUD implementation example with a Dialog.

## radiobuttonselection-doc

Single selection can also be handled using radio buttons.

## removablesort-doc

The removable sort can be implemented using the customSort property.

## reorder-doc

Order of the columns and rows can be changed using drag and drop. Column reordering is configured by adding reorderableColumns property. Similarly, adding reorderableRows property enables draggable rows. For the drag handle a column needs to have rowReorder property and onRowReorder callback is required to control the state of the rows after reorder completes.

## rowedit-doc

Row editing toggles the visibility of all the editors in the row at once and provides additional options to save and cancel editing. Row editing functionality is enabled by setting the editMode to "row" on table, defining a dataKey to uniquely identify a row, adding pEditableRow directive to the editable rows and defining the UI Controls with pInitEditableRow , pSaveEditableRow and pCancelEditableRow directives respectively. Save and Cancel functionality implementation is left to the page author to provide more control over the editing business logic. Example below utilizes a simple implementation where a row is cloned when editing is initialized and is saved or restored depending on the result of the editing. An implicit variable called "editing" is passed to the body template so you may come up with your own UI controls that implement editing based on your own requirements such as adding validations and styling. Note that pSaveEditableRow only switches the row to back view mode when there are no validation errors. Moreover, you may use setting pEditableRowDisabled property as true to disable editing for that particular row and in case you need to display rows in edit mode by default, use the editingRowKeys property which is a map whose key is the dataKey of the record where the value is any arbitrary number greater than zero.

## rowexpansion-doc

Row expansion allows displaying detailed content for a particular row. To use this feature, define a dataKey , add a template named expandedrow and use the pRowToggler directive on an element as the target to toggle an expansion. This enables providing your custom UI such as buttons, links and so on. Example below uses an anchor with an icon as a toggler. Setting pRowTogglerDisabled as true disables the toggle event for the element.

## rowspangrouping-doc

When rowGroupMode is configured to be rowspan , the grouping column spans multiple rows.

## selectionevents-doc

Table provides onRowSelect and onRowUnselect events to listen selection events.

## singlecolumnsort-doc

A column can be made sortable by adding the pSortableColumn directive whose value is the field to sort against and a sort indicator via p-sortIcon component. For dynamic columns, setting pSortableColumnDisabled property as true disables sorting for that particular column. Default sorting is executed on a single column, in order to enable multiple field sorting, set sortMode property to "multiple" and use metakey when clicking on another column.

## singleselection-doc

Single row selection is enabled by defining selectionMode as single along with a value binding using selection property. When available, it is suggested to provide a unique identifier of a row with dataKey to optimize performance. By default, metaKey press (e.g. ⌘ ) is necessary to unselect a row however this can be configured with disabling the metaKeySelection property. In touch enabled devices this option has no effect and behavior is same as setting it to false.

## size-doc

In addition to a regular table, alternatives with alternative sizes are available.

## stateful-doc

Stateful table allows keeping the state such as page, sort and filtering either at local storage or session storage so that when the page is visited again, table would render the data using the last settings. Change the state of the table e.g paginate, navigate away and then return to this table again to test this feature, the setting is set as session with the stateStorage property so that Table retains the state until the browser is closed. Other alternative is local referring to localStorage for an extended lifetime.

## striped-doc

Alternating rows are displayed when stripedRows property is present.

## style-doc

Certain rows or cells can easily be styled based on conditions.

## subheadergrouping-doc

Rows are grouped with the groupRowsBy property. When rowGroupMode is set as subheader , a header and footer can be displayed for each group. The content of a group header is provided with groupheader and footer with groupfooter templates.

## template-doc

Custom content at header , body and footer sections are supported via templating.

## virtualscroll-doc

Virtual Scrolling is an efficient way to render large amount data. Usage is similar to regular scrolling with the addition of virtualScrollerOptions property to define a fixed itemSize . Internally, VirtualScroller component is utilized so refer to the API of VirtualScroller for more information about the available options. In this example, 10000 preloaded records are rendered by the Table.

## virtualscrolllazy-doc

VirtualScroller is a performance-approach to handle huge data efficiently. Setting virtualScroll property as true and providing a virtualScrollItemSize in pixels would be enough to enable this functionality. It is also suggested to use the same virtualScrollItemSize value on the tr element inside the body template.

## Table

Table displays data in tabular format.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TablePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| frozenColumns | any[] | - | An array of objects to represent dynamic columns that are frozen. |
| frozenValue | any[] | - | An array of objects to display as frozen. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| tableStyle | { [klass: string]: any } | - | Inline style of the table. |
| tableStyleClass | string | - | Style class of the table. |
| paginator | boolean | false | When specified as true, enables the pagination. |
| pageLinks | number | 5 | Number of page links to display in paginator. |
| rowsPerPageOptions | any[] | - | Array of integer/object values to display inside rows per page dropdown of paginator |
| alwaysShowPaginator | boolean | true | Whether to show it even there is only one page. |
| paginatorPosition | "top" \| "bottom" \| "both" | bottom | Position of the paginator, options are "top", "bottom" or "both". |
| paginatorStyleClass | string | - | Custom style class for paginator |
| paginatorDropdownAppendTo | any | - | Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| paginatorDropdownScrollHeight | string | 200px | Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| currentPageReportTemplate | string | {currentPage} of {totalPages} | Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords} |
| showCurrentPageReport | boolean | false | Whether to display current page report. |
| showJumpToPageDropdown | boolean | false | Whether to display a dropdown to navigate to any page. |
| showJumpToPageInput | boolean | false | Whether to display a input to navigate to any page. |
| showFirstLastIcon | boolean | true | When enabled, icons are displayed on paginator to go first and last page. |
| showPageLinks | boolean | true | Whether to show page links. |
| defaultSortOrder | number | 1 | Sort order to use when an unsorted column gets sorted by user interaction. |
| sortMode | "multiple" \| "single" | single | Defines whether sorting works on single column or on multiple columns. |
| resetPageOnSort | boolean | true | When true, resets paginator to first page after sorting. Available only when sortMode is set to single. |
| selectionMode | "multiple" \| "single" | - | Specifies the selection mode, valid values are "single" and "multiple". |
| selectionPageOnly | boolean | false | When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page. |
| contextMenuSelection | any | - | Selected row with a context menu. |
| contextMenuSelectionMode | string | separate | Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property. |
| dataKey | string | - | A property to uniquely identify a record in data. |
| metaKeySelection | boolean | false | Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically. |
| rowSelectable | (row: { data: any; index: number }) => boolean | - | Defines if the row is selectable. |
| rowTrackBy | Function | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| lazyLoadOnInit | boolean | true | Whether to call lazy loading on initialization. |
| compareSelectionBy | "equals" \| "deepEquals" | deepEquals | Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields. |
| csvSeparator | string | , | Character to use as the csv separator. |
| exportFilename | string | download | Name of the exported file. |
| filters | { [s: string]: FilterMetadata \| FilterMetadata[] } | {} | An array of FilterMetadata objects to provide external filters. |
| globalFilterFields | string[] | - | An array of fields as string to use in global filtering. |
| filterDelay | number | 300 | Delay in milliseconds before filtering the data. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| expandedRowKeys | { [s: string]: boolean } | {} | Map instance to keep the expanded rows where key of the map is the data key of the row. |
| editingRowKeys | { [s: string]: boolean } | {} | Map instance to keep the rows being edited where key of the map is the data key of the row. |
| rowExpandMode | "multiple" \| "single" | multiple | Whether multiple rows can be expanded at any time. Valid values are "multiple" and "single". |
| scrollable | boolean | false | Enables scrollable tables. |
| rowGroupMode | "subheader" \| "rowspan" | - | Type of the row grouping, valid values are "subheader" and "rowspan". |
| scrollHeight | string | - | Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| virtualScrollItemSize | number | - | Height of a row to use in calculations of virtual scrolling. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| virtualScrollDelay | number | 250 | Threshold in milliseconds to delay lazy loading during scrolling. |
| frozenWidth | string | - | Width of the frozen columns container. |
| contextMenu | any | - | Local ng-template varilable of a ContextMenu. |
| resizableColumns | boolean | false | When enabled, columns can be resized using drag and drop. |
| columnResizeMode | string | fit | Defines whether the overall table width should change on column resize, valid values are "fit" and "expand". |
| reorderableColumns | boolean | false | When enabled, columns can be reordered using drag and drop. |
| loading | boolean | false | Displays a loader to indicate data load is in progress. |
| loadingIcon | string | - | The icon to show while indicating data load is in progress. |
| showLoader | boolean | true | Whether to show the loading mask when loading property is true. |
| rowHover | boolean | false | Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work. |
| customSort | boolean | false | Whether to use the default sorting or a custom one using sortFunction. |
| showInitialSortBadge | boolean | true | Whether to use the initial sort badge or not. |
| exportFunction | Function | - | Export function. |
| exportHeader | string | - | Custom export header of the column to be exported as CSV. |
| stateKey | string | - | Unique identifier of a stateful table to use in state storage. |
| stateStorage | "session" \| "local" | session | Defines where a stateful table keeps its state, valid values are "session" for sessionStorage and "local" for localStorage. |
| editMode | "row" \| "cell" | cell | Defines the editing mode, valid values are "cell" and "row". |
| groupRowsBy | any | - | Field name to use in row grouping. |
| size | "small" \| "large" | - | Defines the size of the table. |
| showGridlines | boolean | false | Whether to show grid lines between cells. |
| stripedRows | boolean | false | Whether to display rows with alternating colors. |
| groupRowsByOrder | number | 1 | Order to sort when default row grouping is enabled. |
| responsiveLayout | string | scroll | Defines the responsive mode, valid options are "stack" and "scroll". **(Deprecated)** |
| breakpoint | string | 960px | The breakpoint to define the maximum width boundary when using stack responsive layout. |
| paginatorLocale | string | - | Locale to be used in paginator formatting. |
| value | RowData[] | - | An array of objects to display. |
| columns | any[] | - | An array of objects to represent dynamic columns. |
| first | number | - | Index of the first row to be displayed. |
| rows | number | - | Number of rows to display per page. |
| totalRecords | number | 0 | Number of total records, defaults to length of value when not defined. |
| sortField | string | - | Name of the field to sort data by default. |
| sortOrder | number | - | Order to sort when default sorting is enabled. |
| multiSortMeta | SortMeta[] | - | An array of SortMeta objects to sort the data by default in multiple sort mode. |
| selection | any | - | Selected row in single mode or an array of values in multiple mode. |
| selectAll | boolean | - | Whether all data is selected. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| contextMenuSelectionChange | value: any | Callback to invoke on context menu selection change. |
| selectAllChange | event: TableSelectAllChangeEvent | Emits when the all of the items selected or unselected. |
| selectionChange | value: any | Callback to invoke on selection changed. |
| onRowSelect | event: TableRowSelectEvent<RowData | Callback to invoke when a row is selected. |
| onRowUnselect | event: TableRowUnSelectEvent<RowData | Callback to invoke when a row is unselected. |
| onPage | event: TablePageEvent | Callback to invoke when pagination occurs. |
| onSort | value: any | Callback to invoke when a column gets sorted. |
| onFilter | event: TableFilterEvent | Callback to invoke when data is filtered. |
| onLazyLoad | event: TableLazyLoadEvent | Callback to invoke when paging, sorting or filtering happens in lazy mode. |
| onRowExpand | event: TableRowExpandEvent<RowData | Callback to invoke when a row is expanded. |
| onRowCollapse | event: TableRowCollapseEvent | Callback to invoke when a row is collapsed. |
| onContextMenuSelect | event: TableContextMenuSelectEvent<RowData | Callback to invoke when a row is selected with right click. |
| onColResize | event: TableColResizeEvent | Callback to invoke when a column is resized. |
| onColReorder | event: TableColumnReorderEvent | Callback to invoke when a column is reordered. |
| onRowReorder | event: TableRowReorderEvent | Callback to invoke when a row is reordered. |
| onEditInit | event: TableEditInitEvent | Callback to invoke when a cell switches to edit mode. |
| onEditComplete | event: TableEditCompleteEvent | Callback to invoke when cell edit is completed. |
| onEditCancel | event: TableEditCancelEvent | Callback to invoke when cell edit is cancelled with escape key. |
| onHeaderCheckboxToggle | event: TableHeaderCheckboxToggleEvent | Callback to invoke when state of header checkbox changes. |
| sortFunction | value: any | A function to implement custom sorting, refer to sorting section for details. |
| firstChange | value: number | Callback to invoke on pagination. |
| rowsChange | value: number | Callback to invoke on rows change. |
| onStateSave | value: TableState | Callback to invoke table state is saved. |
| onStateRestore | value: TableState | Callback to invoke table state is restored. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| exportCSV | options: ExportCSVOptions | void | Data export method. |
| resetScrollTop |  | void | Resets scroll to top. |
| scrollToVirtualIndex | index: number | void | Scrolls to given index when using virtual scroll. |
| scrollTo | options: any | void | Scrolls to given index. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| filter | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter container element. |
| pcColumnFilterButton | ButtonPassThrough | Used to pass attributes to the column filter button component. |
| filterOverlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter overlay element. |
| filterConstraintList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the filter constraint list element. |
| filterConstraint | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the filter constraint element. |
| filterConstraintSeparator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the filter constraint separator element. |
| emtpyFilterLabel | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty filter label element. |
| filterOperator | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter operator element. |
| pcFilterOperatorDropdown | SelectPassThrough | Used to pass attributes to the filter operator dropdown component. |
| filterRuleList | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter rule list element. |
| filterRule | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter rule element. |
| pcFilterConstraintDropdown | SelectPassThrough | Used to pass attributes to the filter constraint dropdown component. |
| pcFilterRemoveRuleButton | ButtonPassThrough | Used to pass attributes to the filter remove rule button component. |
| pcAddRuleButtonLabel | ButtonPassThrough | Used to pass attributes to the add rule button label. |
| filterButtonBar | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the filter button bar element. |
| pcFilterClearButton | ButtonPassThrough | Used to pass attributes to the filter clear button component. |
| pcFilterApplyButton | ButtonPassThrough | Used to pass attributes to the filter apply button component. |
| pcFilterInputText | InputTextPassThrough | Used to pass attributes to the filter input text component. |
| pcFilterInputNumber | InputNumberPassThrough | Used to pass attributes to the filter input number component. |
| pcFilterCheckbox | CheckboxPassThrough | Used to pass attributes to the filter checkbox component. |
| pcFilterDatePicker | DatePickerPassThrough | Used to pass attributes to the filter datepicker component. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-datatable | Class name of the root element |
| p-datatable-mask | Class name of the mask element |
| p-datatable-loading-icon | Class name of the loading icon element |
| p-datatable-header | Class name of the header element |
| p-datatable-paginator-[position] | Class name of the paginator element |
| p-datatable-table-container | Class name of the table container element |
| p-datatable-table | Class name of the table element |
| p-datatable-thead | Class name of the thead element |
| p-datatable-column-resizer | Class name of the column resizer element |
| p-datatable-column-header-content | Class name of the column header content element |
| p-datatable-column-title | Class name of the column title element |
| p-datatable-sort-icon | Class name of the sort icon element |
| p-datatable-sort-badge | Class name of the sort badge element |
| p-datatable-filter | Class name of the filter element |
| p-datatable-filter-element-container | Class name of the filter element container element |
| p-datatable-column-filter-button | Class name of the column filter button element |
| p-datatable-column-filter-clear-button | Class name of the column filter clear button element |
| p-datatable-filter-overlay | Class name of the filter overlay element |
| p-datatable-filter-constraint-list | Class name of the filter constraint list element |
| p-datatable-filter-constraint | Class name of the filter constraint element |
| p-datatable-filter-constraint-separator | Class name of the filter constraint separator element |
| p-datatable-filter-operator | Class name of the filter operator element |
| p-datatable-filter-operator-dropdown | Class name of the filter operator dropdown element |
| p-datatable-filter-rule-list | Class name of the filter rule list element |
| p-datatable-filter-rule | Class name of the filter rule element |
| p-datatable-filter-constraint-dropdown | Class name of the filter constraint dropdown element |
| p-datatable-filter-remove-rule-button | Class name of the filter remove rule button element |
| p-datatable-filter-add-rule-button | Class name of the filter add rule button element |
| p-datatable-filter-buttonbar | Class name of the filter buttonbar element |
| p-datatable-filter-clear-button | Class name of the filter clear button element |
| p-datatable-filter-apply-button | Class name of the filter apply button element |
| p-datatable-tbody | Class name of the tbody element |
| p-datatable-row-group-header | Class name of the row group header element |
| p-datatable-row-toggle-button | Class name of the row toggle button element |
| p-datatable-row-toggle-icon | Class name of the row toggle icon element |
| p-datatable-row-expansion | Class name of the row expansion element |
| p-datatable-row-group-footer | Class name of the row group footer element |
| p-datatable-empty-message | Class name of the empty message element |
| p-datatable-reorderable-row-handle | Class name of the reorderable row handle element |
| p-datatable-row-editor-init | Class name of the row editor init element |
| p-datatable-row-editor-save | Class name of the row editor save element |
| p-datatable-row-editor-cancel | Class name of the row editor cancel element |
| p-datatable-tfoot | Class name of the tfoot element |
| p-datatable-virtualscroller-spacer | Class name of the virtual scroller spacer element |
| p-datatable-footer | Class name of the footer element |
| p-datatable-column-resize-indicator | Class name of the column resize indicator element |
| p-datatable-row-reorder-indicator-up | Class name of the row reorder indicator up element |
| p-datatable-row-reorder-indicator-down | Class name of the row reorder indicator down element |
| p-datatable-sortable-column | Class name of the sortable column element |
| p-sortable-column-icon | Class name of the sortable column icon element |
| p-sortable-column-badge | Class name of the sortable column badge element |
| p-datatable-selectable-row | Class name of the selectable row element |
| p-datatable-resizable-column | Class name of the resizable column element |
| p-datatable-row-editor-cancel | Class name of the row editor cancel element |
| p-datatable-frozen-column | Class name of the frozen column element |
| p-datatable-contextmenu-row-selected | Class name of the contextmenu row selected element |

