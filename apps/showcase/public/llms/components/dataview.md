# Angular DataView Component

DataView displays data in grid grid-cols-12 gap-4 or list layout with pagination and sorting features.

## accessibility-doc

Screen Reader The container element that wraps the layout options buttons has a group role whereas each button element uses button role and aria-pressed is updated depending on selection state. Values to describe the buttons are derived from the aria.listView and aria.gridView properties of the locale API respectively. Refer to paginator accessibility documentation for the paginator of the component. Keyboard Support Key Function tab Moves focus to the buttons. space Toggles the checked state of a button.

## basic-doc

DataView requires a value to display along with a list template that receives an object in the collection to return content.

## layout-doc

DataView supports list and grid display modes defined with the layout property. The grid mode is not built-in for flexibility purposes and requires a library with CSS grid features like Tailwind.

## loading-doc

While data is being loaded. Skeleton component may be used to indicate the busy state.

## pagination-doc

Pagination is enabled with the paginator and rows properties. Refer to the Paginator for more information about customizing the paginator.

## sorting-doc

Built-in sorting is controlled by bindings sortField and sortOrder properties from a custom UI.

## Data View

DataView displays data in grid or list layout with pagination and sorting features.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DataViewPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| paginator | boolean | false | When specified as true, enables the pagination. |
| rows | number | - | Number of rows to display per page. |
| totalRecords | number | - | Number of total records, defaults to length of value when not defined. |
| pageLinks | number | 5 | Number of page links to display in paginator. |
| rowsPerPageOptions | any[] \| number[] | - | Array of integer/object values to display inside rows per page dropdown of paginator |
| paginatorPosition | "top" \| "bottom" \| "both" | bottom | Position of the paginator. |
| paginatorStyleClass | string | - | Custom style class for paginator |
| alwaysShowPaginator | boolean | true | Whether to show it even there is only one page. |
| paginatorDropdownAppendTo | any | - | Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| paginatorDropdownScrollHeight | string | 200px | Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| currentPageReportTemplate | string | {currentPage} of {totalPages} | Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords} |
| showCurrentPageReport | boolean | false | Whether to display current page report. |
| showJumpToPageDropdown | boolean | false | Whether to display a dropdown to navigate to any page. |
| showFirstLastIcon | boolean | true | When enabled, icons are displayed on paginator to go first and last page. |
| showPageLinks | boolean | true | Whether to show page links. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| lazyLoadOnInit | boolean | true | Whether to call lazy loading on initialization. |
| emptyMessage | string | - | Text to display when there is no data. Defaults to global value in i18n translation configuration. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| gridStyleClass | string | - | Style class of the grid. |
| trackBy | Function | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. |
| filterBy | string | - | Comma separated list of fields in the object graph to search against. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| loading | boolean | false | Displays a loader to indicate data load is in progress. |
| loadingIcon | string | - | The icon to show while indicating data load is in progress. |
| first | number | 0 | Index of the first row to be displayed. |
| sortField | string | - | Property name of data to use in sorting by default. |
| sortOrder | number | - | Order to sort the data by default. |
| value | any[] | - | An array of objects to display. |
| layout | "list" \| "grid" | list | Defines the layout mode. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onLazyLoad | event: DataViewLazyLoadEvent | Callback to invoke when paging, sorting or filtering happens in lazy mode. |
| onPage | event: DataViewPageEvent | Callback to invoke when pagination occurs. |
| onSort | event: DataViewSortEvent | Callback to invoke when sorting occurs. |
| onChangeLayout | event: DataViewLayoutChangeEvent | Callback to invoke when changing layout. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| list | TemplateRef<DataViewListTemplateContext<any>> | Template for the list layout. |
| grid | TemplateRef<DataViewGridTemplateContext<any>> | Template for grid layout. |
| header | TemplateRef<void> | Template for the header section. |
| emptymessage | TemplateRef<void> | Template for the empty message section. |
| footer | TemplateRef<void> | Template for the footer section. |
| paginatorleft | TemplateRef<DataViewPaginatorLeftTemplateContext> | Template for the left side of paginator. |
| paginatorright | TemplateRef<DataViewPaginatorRightTemplateContext> | Template for the right side of paginator. |
| paginatordropdownitem | TemplateRef<DataViewPaginatorDropdownItemTemplateContext> | Template for items in paginator dropdown. |
| loadingicon | TemplateRef<void> | Template for loading icon. |
| listicon | TemplateRef<void> | Template for list icon. |
| gridicon | TemplateRef<void> | Template for grid icon. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| loading | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the loading container's DOM element. |
| loadingOverlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the loading overlay's DOM element. |
| loadingIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the loading icon's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content container's DOM element. |
| emptyMessage | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the empty message's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |
| pcPaginator | PaginatorPassThrough | Used to pass attributes to the Paginator component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-dataview | Class name of the root element |
| p-dataview-header | Class name of the header element |
| p-dataview-loading | Class name of the loading element |
| p-dataview-loading-overlay | Class name of the loading overlay element |
| p-dataview-loading-icon | Class name of the loading icon element |
| p-dataview-paginator-[position] | Class name of the paginator element |
| p-dataview-content | Class name of the content element |
| p-dataview-empty-message | Class name of the empty message element |
| p-dataview-footer | Class name of the footer element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| dataview.border.color | --p-dataview-border-color | Border color of root |
| dataview.border.width | --p-dataview-border-width | Border width of root |
| dataview.border.radius | --p-dataview-border-radius | Border radius of root |
| dataview.padding | --p-dataview-padding | Padding of root |
| dataview.header.background | --p-dataview-header-background | Background of header |
| dataview.header.color | --p-dataview-header-color | Color of header |
| dataview.header.border.color | --p-dataview-header-border-color | Border color of header |
| dataview.header.border.width | --p-dataview-header-border-width | Border width of header |
| dataview.header.padding | --p-dataview-header-padding | Padding of header |
| dataview.header.border.radius | --p-dataview-header-border-radius | Border radius of header |
| dataview.content.background | --p-dataview-content-background | Background of content |
| dataview.content.color | --p-dataview-content-color | Color of content |
| dataview.content.border.color | --p-dataview-content-border-color | Border color of content |
| dataview.content.border.width | --p-dataview-content-border-width | Border width of content |
| dataview.content.padding | --p-dataview-content-padding | Padding of content |
| dataview.content.border.radius | --p-dataview-content-border-radius | Border radius of content |
| dataview.footer.background | --p-dataview-footer-background | Background of footer |
| dataview.footer.color | --p-dataview-footer-color | Color of footer |
| dataview.footer.border.color | --p-dataview-footer-border-color | Border color of footer |
| dataview.footer.border.width | --p-dataview-footer-border-width | Border width of footer |
| dataview.footer.padding | --p-dataview-footer-padding | Padding of footer |
| dataview.footer.border.radius | --p-dataview-footer-border-radius | Border radius of footer |
| dataview.paginator.top.border.color | --p-dataview-paginator-top-border-color | Border color of paginator top |
| dataview.paginator.top.border.width | --p-dataview-paginator-top-border-width | Border width of paginator top |
| dataview.paginator.bottom.border.color | --p-dataview-paginator-bottom-border-color | Border color of paginator bottom |
| dataview.paginator.bottom.border.width | --p-dataview-paginator-bottom-border-width | Border width of paginator bottom |

