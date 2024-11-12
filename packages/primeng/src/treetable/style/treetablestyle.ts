import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
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
    width: ${dt('treetable.column.resizer.width')};
    height: 100%;
    padding: 0px;
    cursor: col-resize;
    border: 1px solid transparent;
}

.p-treetable .p-column-resizer-helper {
    width: ${dt('treetable.resize.indicator.width')};
    position: absolute;
    z-index: 10;
    display: none;
    background: ${dt('treetable.resize.indicator.color')};
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
    font-size: ${dt('treetable.loading.icon.size')};
    width: ${dt('treetable.loading.icon.size')};
    height: ${dt('treetable.loading.icon.size')};
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
    border-color: ${dt('treetable.paginator.top.border.color')};
    border-style: solid;
    border-width: ${dt('treetable.paginator.top.border.width')};
}

.p-treetable .p-paginator-bottom {
    border-color: ${dt('treetable.paginator.bottom.border.color')};
    border-style: solid;
    border-width: ${dt('treetable.paginator.bottom.border.width')};
}

.p-treetable .p-treetable-header {
    background: ${dt('treetable.header.background')};
    color: ${dt('treetable.header.color')};
    border-color: ${dt('treetable.header.border.color')};
    border-style: solid;
    border-width: ${dt('treetable.header.border.width')};
    padding: ${dt('treetable.header.padding')};
    font-weight: ${dt('treetable.column.title.font.weight')};
}

.p-treetable .p-treetable-footer {
    background: ${dt('treetable.footer.background')};
    color: ${dt('treetable.footer.color')};
    border-color: ${dt('treetable.footer.border.color')};
    border-style: solid;
    border-width: ${dt('treetable.footer.border.width')};
    padding: ${dt('treetable.footer.padding')};
    font-weight: ${dt('treetable.column.footer.font.weight')};
}

.p-treetable .p-treetable-thead>tr>th {
    padding: ${dt('treetable.header.cell.padding')};
    background: ${dt('treetable.header.cell.background')};
    border-color: ${dt('treetable.header.cell.border.color')};
    border-style: solid;
    border-width: 0 0 1px 0;
    color: ${dt('treetable.header.cell.color')};
    font-weight: ${dt('treetable.column.title.font.weight')};
    text-align: left;
    transition: background ${dt('treetable.transition.duration')}, color ${dt('treetable.transition.duration')}, border-color ${dt('treetable.transition.duration')},
            outline-color ${dt('treetable.transition.duration')}, box-shadow ${dt('treetable.transition.duration')};
}

.p-treetable .p-treetable-tfoot>tr>td {
    text-align: left;
    padding: ${dt('treetable.footer.cell.padding')};
    border-color: ${dt('treetable.footer.cell.border.color')};
    border-style: solid;
    border-width: 0 0 1px 0;
    color: ${dt('treetable.footer.cell.color')};
    background: ${dt('treetable.footer.cell.background')};
    font-weight: ${dt('treetable.column.footer.font.weight')};
}

.p-treetable .p-sortable-column {
    cursor: pointer;
    user-select: none;
    outline-color: transparent;
    vertical-align: middle;
}

.p-treetable .p-sortable-column .p-sortable-column-icon {
    color: ${dt('treetable.sort.icon.color')};
    transition: color ${dt('treetable.transition.duration')};
}


.p-treetable .p-sortable-column:not(.p-treetable-column-sorted):hover {
    background: ${dt('treetable.header.cell.hover.background')};
    color: ${dt('treetable.header.cell.hover.color')};
}

.p-treetable .p-sortable-column:not(.p-treetable-column-sorted):hover .p-sortable-column-icon {
    color: ${dt('treetable.sort.icon.hover.color')};
}

.p-treetable .p-sortable-column.p-treetable-column-sorted {
    background: ${dt('treetable.header.cell.selected.background')};
    color: ${dt('treetable.header.cell.selected.color')};
}

.p-treetable .p-sortable-column.p-treetable-column-sorted .p-sortable-column-icon {
    color: ${dt('treetable.header.cell.selected.color')};
}

.p-treetable .p-sortable-column:focus-visible {
    box-shadow: ${dt('treetable.header.cell.focus.ring.shadow')};
    outline: ${dt('treetable.header.cell.focus.ring.width')} ${dt('treetable.header.cell.focus.ring.style')} ${dt('treetable.header.cell.focus.ring.color')};
    outline-offset: ${dt('treetable.header.cell.focus.ring.offset')};
}

.p-treetable-hoverable .p-treetable-selectable-row {
    cursor: pointer;
}

.p-treetable .p-treetable-tbody > tr {
    outline-color: transparent;
    background: ${dt('treetable.row.background')};
    color: ${dt('treetable.row.color')};
    transition: background ${dt('treetable.transition.duration')}, color ${dt('treetable.transition.duration')}, border-color ${dt('treetable.transition.duration')},
            outline-color ${dt('treetable.transition.duration')}, box-shadow ${dt('treetable.transition.duration')};
}

.p-treetable .p-treetable-tbody>tr>td {
    text-align: left;
    border-color: ${dt('treetable.body.cell.border.color')};
    border-style: solid;
    border-width: 0 0 1px 0;
    padding: ${dt('treetable.body.cell.padding')};
}

.p-treetable .p-treetable-tbody>tr>td .p-treetable-toggler {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: ${dt('treetable.node.toggle.button.size')};
    height: ${dt('treetable.node.toggle.button.size')};
    color: ${dt('treetable.node.toggle.button.color')};
    border: 0 none;
    background: transparent;
    cursor: pointer;
    border-radius: ${dt('treetable.node.toggle.button.border.radius')};
    transition: background ${dt('treetable.transition.duration')}, color ${dt('treetable.transition.duration')}, border-color ${dt('treetable.transition.duration')},
            outline-color ${dt('treetable.transition.duration')}, box-shadow ${dt('treetable.transition.duration')};
    outline-color: transparent;
    user-select: none;
}

.p-treetable .p-treetable-tbody>tr>td .p-treetable-toggler:enabled:hover {
    color: ${dt('treetable.node.toggle.button.hover.color')};
    background: ${dt('treetable.node.toggle.button.hover.background')};
}

.p-treetable .p-treetable-tbody>tr>tr.treetable-row-selected .p-treetable-toggler:hover {
    background: ${dt('treetable.node.toggle.button.selected.hover.background')};
    color: ${dt('treetable.node.toggle.button.selected.hover.color')};
}

.p-treetable .p-treetable-tbody>tr>td .p-treetable-toggler:focus-visible {
    box-shadow: ${dt('treetable.node.toggle.button.focus.ring.shadow')};
    outline: ${dt('treetable.node.toggle.button.focus.ring.width')} ${dt('treetable.node.toggle.button.focus.ring.style')} ${dt('treetable.node.toggle.button.focus.ring.color')};
    outline-offset: ${dt('treetable.node.toggle.button.focus.ring.offset')};
}


.p-treetable .p-treetable-tbody>tr.p-treetable-row-selected {
    background: ${dt('treetable.row.selected.background')};
    color: ${dt('treetable.row.selected.color')};
}

.p-treetable-tbody > tr:focus-visible,
.p-treetable-tbody > tr.p-treetable-contextmenu-row-selected {
    box-shadow: ${dt('treetable.row.focus.ring.shadow')};
    outline: ${dt('treetable.row.focus.ring.width')} ${dt('treetable.row.focus.ring.style')} ${dt('treetable.row.focus.ring.color')};
    outline-offset: ${dt('treetable.row.focus.ring.offset')};
}

.p-treetable .p-treetable-tbody>tr.p-treetable-row-selected .p-treetable-toggler {
    color: inherit;
}

.p-treetable .p-treetable-tbody>tr.p-treetable-row-selected .p-treetable-toggler:hover {
    background: ${dt('treetable.node.toggle.button.selected.hover.background')};
    color: ${dt('treetable.node.toggle.button.selected.hover.color')};
}

.p-treetable.p-treetable-hoverable-rows .p-treetable-tbody>tr:not(.p-treetable-row-selected):hover {
    background: ${dt('treetable.row.hover.background')};
    color: ${dt('treetable.row.hover.color')};
}

.p-treetable.p-treetable-gridlines .p-datatable-header {
    border-width: 1px 1px 0 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-footer {
    border-width: 0 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-top {
    border-width: 0 1px 0 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-bottom {
    border-width: 0 1px 1px 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-thead>tr>th {
    border-width: 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-tbody>tr>td {
    border-width: 1px;
}

.p-treetable.p-treetable-gridlines .p-treetable-tfoot>tr>td {
    border-width: 1px;
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

p-treetabletoggler + p-treetablecheckbox .p-checkbox {
    vertical-align: middle;
}

p-treetabletoggler + p-treetablecheckbox + span {
    vertical-align: middle;
}
`;

const classes = {
    root: ({ instance }) => ({
        'p-treetable p-component': true,
        'p-treetable-hoverable': instance.rowHover || instance.selectionMode,
        'p-treetable-resizable': instance.resizableColumns,
        'p-treetable-resizable-fit': instance.resizableColumns && instance.columnResizeMode === 'fit',
        'p-treetable-scrollable': instance.scrollable,
        'p-treetable-flex-scrollable': instance.scrollable && instance.scrollHeight === 'flex',
        'p-treetable-gridlines': instance.showGridlines,
        'p-treetable-sm': instance.size === 'small',
        'p-treetable-lg': instance.size === 'large'
    }),
    loading: 'p-treetable-loading', //TODO: required?
    mask: 'p-treetable-mask p-overlay-mask',
    loadingIcon: 'p-treetable-loading-icon',
    header: 'p-treetable-header',
    paginator: ({ instance }) => 'p-treetable-paginator-' + instance.paginatorPosition,
    tableContainer: 'p-treetable-table-container',
    table: ({ instance }) => ({
        'p-treetable-table': true,
        'p-treetable-scrollable-table': instance.scrollable,
        'p-treetable-resizable-table': instance.resizableColumns,
        'p-treetable-resizable-table-fit': instance.resizableColumns && instance.columnResizeMode === 'fit'
    }),
    thead: 'p-treetable-thead',
    headerCell: ({ instance }) => ({
        'p-treetable-header-cell': true,
        'p-treetable-sortable-column': instance.sortable,
        'p-treetable-resizable-column': instance.resizableColumns,
        'p-treetable-column-sorted': instance?.sorted,
        'p-treetable-frozen-column': instance.columnProp('frozen')
    }),
    columnResizer: 'p-treetable-column-resizer',
    columnHeaderContent: 'p-treetable-column-header-content',
    columnTitle: 'p-treetable-column-title',
    sortIcon: 'p-treetable-sort-icon',
    pcSortBadge: 'p-treetable-sort-badge',
    tbody: 'p-treetable-tbody',
    row: ({ instance }) => ({
        'p-treetable-row-selected': instance.selected
    }),
    bodyCell: ({ instance }) => ({
        'p-treetable-frozen-column': instance.columnProp('frozen')
    }),
    bodyCellContent: ({ instance }) => ({
        'p-treetable-body-cell-content': true,
        'p-treetable-body-cell-content-expander': instance.columnProp('expander')
    }),
    toggler: 'p-treetable-body-cell-content-expander',
    nodeToggleButton: 'p-treetable-node-toggle-button',
    nodeToggleIcon: 'p-treetable-node-toggle-icon',
    pcNodeCheckbox: 'p-treetable-node-checkbox',
    emptyMessage: 'p-treetable-empty-message',
    tfoot: 'p-treetable-tfoot',
    footerCell: ({ instance }) => ({
        'p-treetable-frozen-column': instance.columnProp('frozen')
    }),
    footer: 'p-treetable-footer',
    columnResizeIndicator: 'p-treetable-column-resize-indicator'
};

const inlineStyles = {
    tableContainer: { overflow: 'auto' },
    thead: { position: 'sticky' },
    tfoot: { position: 'sticky' }
};

@Injectable()
export class TreeTableStyle extends BaseStyle {
    name = 'treetable';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
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
    paginator = 'p-treetable-paginator-[position]',
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
    columnResizeIndicator = 'p-treetable-column-resize-indicator'
}

export interface TreeTableStyle extends BaseStyle {}
