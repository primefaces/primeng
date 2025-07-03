import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
/* For PrimeNG */
.p-treetable {
    position: relative;
}

.p-treetable table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
}

.p-treetable .p-sortable-column {
    cursor: pointer;
    user-select: none;
}

.p-treetable .p-sortable-column .p-column-title,
.p-treetable .p-sortable-column .p-sortable-column-icon,
.p-treetable .p-sortable-column .p-sortable-column-badge {
    vertical-align: middle;
}

.p-treetable-sort-icon {
    color: dt('treetable.sort.icon.color');
    font-size: dt('treetable.sort.icon.size');
    width: dt('treetable.sort.icon.size');
    height: dt('treetable.sort.icon.size');
    transition: color dt('treetable.transition.duration');
}

.p-treetable .p-sortable-column .p-sortable-column-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.p-treetable-auto-layout>.p-treetable-wrapper {
    overflow-x: auto;
}

.p-treetable-auto-layout>.p-treetable-wrapper>table {
    table-layout: auto;
}

.p-treetable-hoverable-rows .p-treetable-tbody>tr {
    cursor: pointer;
}

.p-treetable-toggler {
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    overflow: hidden;
    position: relative;
}


/* Scrollable */
.p-treetable-scrollable-wrapper {
    position: relative;
}

.p-treetable-scrollable-header,
.p-treetable-scrollable-footer {
    overflow: hidden;
    flex-shrink: 0;
}

.p-treetable-scrollable-body {
    overflow: auto;
    position: relative;
}

.p-treetable-virtual-table {
    position: absolute;
}

/* Frozen Columns */
.p-treetable-frozen-view .p-treetable-scrollable-body {
    overflow: hidden;
}

.p-treetable-frozen-view>.p-treetable-scrollable-body>table>.p-treetable-tbody>tr>td:last-child {
    border-right: 0 none;
}

.p-treetable-unfrozen-view {
    position: absolute;
    top: 0;
}

/* Flex Scrollable */
.p-treetable-flex-scrollable {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}

.p-treetable-flex-scrollable .p-treetable-scrollable-wrapper,
.p-treetable-flex-scrollable .p-treetable-scrollable-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}

.p-treetable-flex-scrollable .p-treetable-virtual-scrollable-body {
    flex: 1;
}

/* Resizable */
.p-treetable-resizable>.p-treetable-wrapper {
    overflow-x: auto;
}

.p-treetable-resizable .p-treetable-thead>tr>th,
.p-treetable-resizable .p-treetable-tfoot>tr>td,
.p-treetable-resizable .p-treetable-tbody>tr>td {
    overflow: hidden;
}

.p-treetable-resizable .p-resizable-column {
    background-clip: padding-box;
    position: relative;
}

.p-treetable-resizable-fit .p-resizable-column:last-child .p-column-resizer {
    display: none;
}

.p-treetable .p-column-resizer {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    width: dt('treetable.column.resizer.width');
    height: 100%;
    padding: 0px;
    cursor: col-resize;
    border: 1px solid transparent;
}

.p-treetable .p-column-resizer-helper {
    width: dt('treetable.resize.indicator.width');
    position: absolute;
    z-index: 10;
    display: none;
    background: dt('treetable.resize.indicator.color');
}

.p-treetable .p-row-editor-init,
.p-treetable .p-row-editor-save,
.p-treetable .p-row-editor-cancel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}


/* Reorder */
.p-treetable-reorder-indicator-up,
.p-treetable-reorder-indicator-down {
    position: absolute;
    display: none;
}

[ttReorderableColumn] {
    cursor: move;
}

/* Loader */
.p-treetable-mask {
    position: absolute !important;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.p-treetable-loading-icon {
    font-size: dt('treetable.loading.icon.size');
    width: dt('treetable.loading.icon.size');
    height: dt('treetable.loading.icon.size');
}

/* Virtual Scroll */
.p-treetable .p-scroller-loading {
    transform: none !important;
    min-height: 0;
    position: sticky;
    top: 0;
    left: 0;
}

.p-treetable .p-paginator-top {
    border-color: dt('treetable.paginator.top.border.color');
    border-style: solid;
    border-width: dt('treetable.paginator.top.border.width');
}

.p-treetable .p-paginator-bottom {
    border-color: dt('treetable.paginator.bottom.border.color');
    border-style: solid;
    border-width: dt('treetable.paginator.bottom.border.width');
}

.p-treetable .p-treetable-header {
    background: dt('treetable.header.background');
    color: dt('treetable.header.color');
    border-color: dt('treetable.header.border.color');
    border-style: solid;
    border-width: dt('treetable.header.border.width');
    padding: dt('treetable.header.padding');
    font-weight: dt('treetable.column.title.font.weight');
}

.p-treetable .p-treetable-footer {
    background: dt('treetable.footer.background');
    color: dt('treetable.footer.color');
    border-color: dt('treetable.footer.border.color');
    border-style: solid;
    border-width: dt('treetable.footer.border.width');
    padding: dt('treetable.footer.padding');
    font-weight: dt('treetable.column.footer.font.weight');
}

.p-treetable .p-treetable-thead>tr>th {
    padding: dt('treetable.header.cell.padding');
    background: dt('treetable.header.cell.background');
    border-color: dt('treetable.header.cell.border.color');
    border-style: solid;
    border-width: 0 0 1px 0;
    color: dt('treetable.header.cell.color');
    font-weight: dt('treetable.column.title.font.weight');
    text-align: start;
    transition: background dt('treetable.transition.duration'), color dt('treetable.transition.duration'), border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'), box-shadow dt('treetable.transition.duration');
}

.p-treetable .p-treetable-tfoot>tr>td {
    text-align: start;
    padding: dt('treetable.footer.cell.padding');
    border-color: dt('treetable.footer.cell.border.color');
    border-style: solid;
    border-width: 0 0 1px 0;
    color: dt('treetable.footer.cell.color');
    background: dt('treetable.footer.cell.background');
    font-weight: dt('treetable.column.footer.font.weight');
}

.p-treetable .p-sortable-column {
    cursor: pointer;
    user-select: none;
    outline-color: transparent;
    vertical-align: middle;
}

.p-treetable .p-sortable-column .p-sortable-column-icon {
    color: dt('treetable.sort.icon.color');
    transition: color dt('treetable.transition.duration');
}


.p-treetable .p-sortable-column:not(.p-treetable-column-sorted):hover {
    background: dt('treetable.header.cell.hover.background');
    color: dt('treetable.header.cell.hover.color');
}

.p-treetable .p-sortable-column:not(.p-treetable-column-sorted):hover .p-sortable-column-icon {
    color: dt('treetable.sort.icon.hover.color');
}

.p-treetable .p-sortable-column.p-treetable-column-sorted {
    background: dt('treetable.header.cell.selected.background');
    color: dt('treetable.header.cell.selected.color');
}

.p-treetable .p-sortable-column.p-treetable-column-sorted .p-sortable-column-icon {
    color: dt('treetable.header.cell.selected.color');
}

.p-treetable .p-sortable-column:focus-visible {
    box-shadow: dt('treetable.header.cell.focus.ring.shadow');
    outline: dt('treetable.header.cell.focus.ring.width') dt('treetable.header.cell.focus.ring.style') dt('treetable.header.cell.focus.ring.color');
    outline-offset: dt('treetable.header.cell.focus.ring.offset');
}

.p-treetable-hoverable .p-treetable-selectable-row {
    cursor: pointer;
}

.p-treetable .p-treetable-tbody > tr {
    outline-color: transparent;
    background: dt('treetable.row.background');
    color: dt('treetable.row.color');
    transition: background dt('treetable.transition.duration'), color dt('treetable.transition.duration'), border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'), box-shadow dt('treetable.transition.duration');
}

.p-treetable .p-treetable-tbody>tr>td {
    text-align: start;
    border-color: dt('treetable.body.cell.border.color');
    border-style: solid;
    border-width: 0 0 1px 0;
    padding: dt('treetable.body.cell.padding');
}

.p-treetable .p-treetable-tbody>tr>td .p-treetable-toggler {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: dt('treetable.node.toggle.button.size');
    height: dt('treetable.node.toggle.button.size');
    color: dt('treetable.node.toggle.button.color');
    border: 0 none;
    background: transparent;
    cursor: pointer;
    border-radius: dt('treetable.node.toggle.button.border.radius');
    transition: background dt('treetable.transition.duration'), color dt('treetable.transition.duration'), border-color dt('treetable.transition.duration'),
            outline-color dt('treetable.transition.duration'), box-shadow dt('treetable.transition.duration');
    outline-color: transparent;
    user-select: none;
}

.p-treetable .p-treetable-tbody>tr>td .p-treetable-toggler:enabled:hover {
    color: dt('treetable.node.toggle.button.hover.color');
    background: dt('treetable.node.toggle.button.hover.background');
}

.p-treetable .p-treetable-tbody>tr>tr.treetable-row-selected .p-treetable-toggler:hover {
    background: dt('treetable.node.toggle.button.selected.hover.background');
    color: dt('treetable.node.toggle.button.selected.hover.color');
}

.p-treetable .p-treetable-tbody>tr>td .p-treetable-toggler:focus-visible {
    box-shadow: dt('treetable.node.toggle.button.focus.ring.shadow');
    outline: dt('treetable.node.toggle.button.focus.ring.width') dt('treetable.node.toggle.button.focus.ring.style') dt('treetable.node.toggle.button.focus.ring.color');
    outline-offset: dt('treetable.node.toggle.button.focus.ring.offset');
}


.p-treetable .p-treetable-tbody>tr.p-treetable-row-selected {
    background: dt('treetable.row.selected.background');
    color: dt('treetable.row.selected.color');
}

.p-treetable-tbody > tr:focus-visible,
.p-treetable-tbody > tr.p-treetable-contextmenu-row-selected {
    box-shadow: dt('treetable.row.focus.ring.shadow');
    outline: dt('treetable.row.focus.ring.width') dt('treetable.row.focus.ring.style') dt('treetable.row.focus.ring.color');
    outline-offset: dt('treetable.row.focus.ring.offset');
}

.p-treetable .p-treetable-tbody>tr.p-treetable-row-selected .p-treetable-toggler {
    color: inherit;
}

.p-treetable .p-treetable-tbody>tr.p-treetable-row-selected .p-treetable-toggler:hover {
    background: dt('treetable.node.toggle.button.selected.hover.background');
    color: dt('treetable.node.toggle.button.selected.hover.color');
}

.p-treetable.p-treetable-hoverable-rows .p-treetable-tbody>tr:not(.p-treetable-row-selected):hover {
    background: dt('treetable.row.hover.background');
    color: dt('treetable.row.hover.color');
}

.p-treetable-gridlines .p-treetable-header {
    border-width: 1px 1px 0 1px;
}

.p-treetable-gridlines .p-treetable-footer {
    border-width: 0 1px 1px 1px;
}

.p-treetable-gridlines .p-treetable-paginator-top {
    border-width: 1px 1px 0 1px;
}

.p-treetable-gridlines .p-treetable-paginator-bottom {
    border-width: 0 1px 1px 1px;
}

.p-treetable-gridlines .p-treetable-thead > tr > th {
    border-width: 1px 0 1px 1px;
}

.p-treetable-gridlines .p-treetable-thead > tr > th:last-child {
    border-width: 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr > td {
    border-width: 1px 0 0 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr > td:last-child {
    border-width: 1px 1px 0 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr:last-child > td {
    border-width: 1px 0 1px 1px;
}

.p-treetable-gridlines .p-treetable-tbody > tr:last-child > td:last-child {
    border-width: 1px;
}

.p-treetable-gridlines .p-treetable-tfoot > tr > td {
    border-width: 1px 0 1px 1px;
}

.p-treetable-gridlines .p-treetable-tfoot > tr > td:last-child {
    border-width: 1px 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td {
    border-width: 0 0 1px 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-thead + .p-treetable-tfoot > tr > td:last-child {
    border-width: 0 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td {
    border-width: 0 0 1px 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-thead):has(.p-treetable-tbody) .p-treetable-tbody > tr > td:last-child {
    border-width: 0 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td {
    border-width: 0 0 0 1px;
}

.p-treetable.p-treetable-gridlines:has(.p-treetable-tbody):has(.p-treetable-tfoot) .p-treetable-tbody > tr:last-child > td:last-child {
    border-width: 0 1px 0 1px;
}

.p-treetable.p-treetable-sm .p-treetable-header {
    padding: 0.65625rem 0.875rem;
}

.p-treetable.p-treetable-sm .p-treetable-thead>tr>th {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-tbody>tr>td {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-tfoot>tr>td {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-sm .p-treetable-footer {
    padding: 0.375rem 0.5rem;
}

.p-treetable.p-treetable-lg .p-treetable-header {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-thead>tr>th {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-tbody>tr>td {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-tfoot>tr>td {
    padding: 0.9375rem 1.25rem;
}

.p-treetable.p-treetable-lg .p-treetable-footer {
    padding: 0.9375rem 1.25rem;
}

p-treetabletoggler + p-treetablecheckbox .p-checkbox,
p-treetable-toggler + p-treetable-checkbox .p-checkbox,
p-tree-table-toggler + p-tree-table-checkbox .p-checkbox {
    vertical-align: middle;
}

p-treetabletoggler + p-treetablecheckbox + span,
p-treetable-toggler + p-treetable-checkbox + span,
p-tree-table-toggler + p-tree-table-checkbox + span {
    vertical-align: middle;
}

p-treetable-sort-icon {
    display: inline-flex;
    align-items: center;
    gap: dt('treetable.header.cell.gap');
}
`;

const classes = {
    root: ({ instance }) => [
        'p-treetable p-component',
        {
            'p-treetable-gridlines': instance.showGridlines,
            'p-treetable-hoverable-rows': instance.rowHover || instance.selectionMode === 'single' || instance.selectionMode === 'multiple',
            'p-treetable-auto-layout': instance.autoLayout,
            'p-treetable-resizable': instance.resizableColumns,
            'p-treetable-resizable-fit': instance.resizableColumns && instance.columnResizeMode === 'fit',
            'p-treetable-flex-scrollable': instance.scrollable && instance.scrollHeight === 'flex'
        }
    ],
    loading: 'p-treetable-loading', //TODO: required?
    mask: 'p-treetable-mask p-overlay-mask',
    loadingIcon: 'p-treetable-loading-icon',
    header: 'p-treetable-header',
    pcPaginator: ({ instance }) => ['p-treetable-paginator-' + instance.paginatorPosition, instance.paginatorStyleClass],
    tableContainer: 'p-treetable-table-container',
    table: ({ instance }) => ({
        'p-treetable-table': true,
        'p-treetable-scrollable-table': instance.scrollable,
        'p-treetable-resizable-table': instance.resizableColumns,
        'p-treetable-resizable-table-fit': instance.resizableColumns && instance.columnResizeMode === 'fit'
    }),
    thead: 'p-treetable-thead',
    sortableColumn: ({ instance }) => ({
        'p-sortable-column': instance.isEnabled(),
        'p-treetable-column-sorted': instance.sorted
    }),
    sortableColumnIcon: 'p-treetable-sort-icon',
    sortableColumnBadge: 'p-sortable-column-badge',
    columnResizer: 'p-treetable-column-resizer',
    columnHeaderContent: 'p-treetable-column-header-content',
    columnTitle: 'p-treetable-column-title',
    sortIcon: 'p-treetable-sort-icon',
    pcSortBadge: 'p-treetable-sort-badge',
    tbody: 'p-treetable-tbody',
    row: ({ instance }) => ({
        'p-treetable-row-selected': instance.selected
    }),
    contextMenuRow: ({ instance }) => ({
        'p-treetable-contextmenu-row-selected': instance.selected
    }),
    toggler: 'p-treetable-toggler',
    nodeToggleButton: 'p-treetable-node-toggle-button',
    nodeToggleIcon: 'p-treetable-node-toggle-icon',
    pcNodeCheckbox: 'p-treetable-node-checkbox',
    tfoot: 'p-treetable-tfoot',
    footerCell: ({ instance }) => ({
        'p-treetable-frozen-column': instance.columnProp('frozen')
    }),
    footer: 'p-treetable-footer',
    columnResizeIndicator: 'p-treetable-column-resize-indicator',
    wrapper: 'p-treetable-wrapper',
    scrollableWrapper: 'p-treetable-scrollable-wrapper',
    scrollableView: 'p-treetable-scrollable-view',
    frozenView: 'p-treetable-frozen-view',
    columnResizerHelper: 'p-column-resizer-helper',
    reorderIndicatorUp: 'p-treetable-reorder-indicator-up',
    reorderIndicatorDown: 'p-treetable-reorder-indicator-down',
    scrollableHeader: 'p-treetable-scrollable-header',
    scrollableHeaderBox: 'p-treetable-scrollable-header-box',
    scrollableHeaderTable: 'p-treetable-scrollable-header-table',
    scrollableBody: 'p-treetable-scrollable-body',
    scrollableFooter: 'p-treetable-scrollable-footer',
    scrollableFooterBox: 'p-treetable-scrollable-footer-box',
    scrollableFooterTable: 'p-treetable-scrollable-footer-table'
};

@Injectable()
export class TreeTableStyle extends BaseStyle {
    name = 'treetable';

    theme = theme;

    classes = classes;
}

/**
 *
 * TreeTable is used to display hierarchical data in tabular format.
 *
 * [Live Demo](https://www.primeng.org/treetable/)
 *
 * @module treetablestyle
 *
 */
export enum TreeTableClasses {
    /**
     * Class name of the root element
     */
    root = 'p-treetable',
    /**
     * Class name of the loading element
     */
    loading = 'p-treetable-loading',
    /**
     * Class name of the mask element
     */
    mask = 'p-treetable-mask',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-treetable-loading-icon',
    /**
     * Class name of the header element
     */
    header = 'p-treetable-header',
    /**
     * Class name of the paginator element
     */
    pcPaginator = 'p-treetable-paginator-[position]',
    /**
     * Class name of the table container element
     */
    tableContainer = 'p-treetable-table-container',
    /**
     * Class name of the table element
     */
    table = 'p-treetable-table',
    /**
     * Class name of the thead element
     */
    thead = 'p-treetable-thead',
    /**
     * Class name of the column resizer element
     */
    columnResizer = 'p-treetable-column-resizer',
    /**
     * Class name of the column title element
     */
    columnTitle = 'p-treetable-column-title',
    /**
     * Class name of the sort icon element
     */
    sortIcon = 'p-treetable-sort-icon',
    /**
     * Class name of the sort badge element
     */
    pcSortBadge = 'p-treetable-sort-badge',
    /**
     * Class name of the tbody element
     */
    tbody = 'p-treetable-tbody',
    /**
     * Class name of the node toggle button element
     */
    nodeToggleButton = 'p-treetable-node-toggle-button',
    /**
     * Class name of the node toggle icon element
     */
    nodeToggleIcon = 'p-treetable-node-toggle-icon',
    /**
     * Class name of the node checkbox element
     */
    pcNodeCheckbox = 'p-treetable-node-checkbox',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-treetable-empty-message',
    /**
     * Class name of the tfoot element
     */
    tfoot = 'p-treetable-tfoot',
    /**
     * Class name of the footer element
     */
    footer = 'p-treetable-footer',
    /**
     * Class name of the column resize indicator element
     */
    columnResizeIndicator = 'p-treetable-column-resize-indicator',
    /**
     * Class name of the wrapper element
     */
    wrapper = 'p-treetable-wrapper',
    /**
     * Class name of the scrollable wrapper element
     */
    scrollableWrapper = 'p-treetable-scrollable-wrapper',
    /**
     * Class name of the scrollable view element
     */
    scrollableView = 'p-treetable-scrollable-view',
    /**
     * Class name of the frozen view element
     */
    frozenView = 'p-treetable-frozen-view',
    /**
     * Class name of the column resizer helper element
     */
    columnResizerHelper = 'p-treetable-column-resizer-helper',
    /**
     * Class name of the reorder indicator up element
     */
    reorderIndicatorUp = 'p-treetable-reorder-indicator-up',
    /**
     * Class name of the reorder indicator down element
     */
    reorderIndicatorDown = 'p-treetable-reorder-indicator-down',
    /**
     * Class name of the scrollable header element
     */
    scrollableHeader = 'p-treetable-scrollable-header',
    /**
     * Class name of the scrollable header box element
     */
    scrollableHeaderBox = 'p-treetable-scrollable-header-box',
    /**
     * Class name of the scrollable header table element
     */
    scrollableHeaderTable = 'p-treetable-scrollable-header-table',
    /**
     * Class name of the scrollable body element
     */
    scrollableBody = 'p-treetable-scrollable-body',
    /**
     * Class name of the scrollable footer element
     */
    scrollableFooter = 'p-treetable-scrollable-footer',
    /**
     * Class name of the scrollable footer box element
     */
    scrollableFooterBox = 'p-treetable-scrollable-footer-box',
    /**
     * Class name of the scrollable footer table element
     */
    scrollableFooterTable = 'p-treetable-scrollable-footer-table',
    /**
     * Class name of the sortable column icon element
     */
    sortableColumnIcon = 'p-sortable-column-icon'
}

export interface TreeTableStyle extends BaseStyle {}
