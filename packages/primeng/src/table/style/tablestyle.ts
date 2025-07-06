import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/datatable';
import { BaseStyle } from 'primeng/base';

const theme = /*css*/ `
    ${style}

    /* For PrimeNG */
    .p-datatable-scrollable-table > .p-datatable-thead {
        top: 0;
        z-index: 2;
    }

    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {
        position: sticky;
        z-index: 2;
    }

    .p-datatable-scrollable-table > .p-datatable-frozen-tbody + .p-datatable-frozen-tbody {
        z-index: 1;
    }

    .p-datatable-scrollable > tr:not(:has(.p-datatable-selectable-row)) > .p-datatable-frozen-column {
        position: sticky;
        background: dt('datatable.header.cell.background');
    }

    .p-datatable-scrollable th.p-datatable-frozen-column {
        z-index: 1;
        position: sticky;
        background: dt('datatable.header.cell.background');
    }
    .p-datatable-scrollable td.p-datatable-frozen-column {
        z-index: 1;
        position: sticky;
        background: dt('datatable.header.cell.background');
    }

    .p-datatable-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
    }

    .p-datatable-filter-overlay {
        position: absolute;
        background: dt('datatable.filter.overlay.select.background');
        color: dt('datatable.filter.overlay.select.color');
        border: 1px solid dt('datatable.filter.overlay.select.border.color');
        border-radius: dt('datatable.filter.overlay.select.border.radius');
        box-shadow: dt('datatable.filter.overlay.select.shadow');
        min-width: 12.5rem;
    }

    .p-datatable-filter-rule {
        border-bottom: 1px solid dt('datatable.filter.rule.border.color');
    }

    .p-datatable-filter-rule:last-child {
        border-bottom: 0 none;
    }

    .p-datatable-filter-add-rule-button,
    .p-datatable-filter-remove-rule-button {
        width: 100%;
    }

    .p-datatable-filter-remove-button {
        width: 100%;
    }

    .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.padding');
        background: dt('datatable.header.cell.background');
        border-color: dt('datatable.header.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.header.cell.color');
        font-weight: dt('datatable.column.title.font.weight');
        text-align: start;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-thead > tr > th p-columnfilter {
        font-weight: normal;
    }

    .p-datatable-thead > tr > th,
    .p-datatable-sort-icon,
    .p-datatable-sort-badge {
        vertical-align: middle;
    }

    .p-datatable-thead > tr > th.p-datatable-column-sorted {
        background: dt('datatable.header.cell.selected.background');
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-thead > tr > th.p-datatable-column-sorted .p-datatable-sort-icon {
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd) {
        background: dt('datatable.row.striped.background');
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd).p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    p-sortIcon {
        display: inline-flex;
        align-items: center;
        gap: dt('datatable.header.cell.gap');
    }

    .p-datatable .p-editable-column.p-cell-editing {
        padding: 0;
    }

    .p-datatable .p-editable-column.p-cell-editing p-celleditor {
        display: block;
        width: 100%;
    }
`;

const classes = {
    root: ({ instance }) => [
        'p-datatable p-component',
        {
            'p-datatable-hoverable': instance.rowHover || instance.selectionMode,
            'p-datatable-resizable': instance.resizableColumns,
            'p-datatable-resizable-fit': instance.resizableColumns && instance.columnResizeMode === 'fit',
            'p-datatable-scrollable': instance.scrollable,
            'p-datatable-flex-scrollable': instance.scrollable && instance.scrollHeight === 'flex',
            'p-datatable-striped': instance.stripedRows,
            'p-datatable-gridlines': instance.showGridlines,
            'p-datatable-sm': instance.size === 'small',
            'p-datatable-lg': instance.size === 'large'
        }
    ],
    mask: 'p-datatable-mask p-overlay-mask',
    loadingIcon: 'p-datatable-loading-icon',
    header: 'p-datatable-header',
    pcPaginator: ({ instance }) => 'p-datatable-paginator-' + instance.paginatorPosition,
    tableContainer: 'p-datatable-table-container',
    table: ({ instance }) => [
        'p-datatable-table',
        {
            'p-datatable-scrollable-table': instance.scrollable,
            'p-datatable-resizable-table': instance.resizableColumns,
            'p-datatable-resizable-table-fit': instance.resizableColumns && instance.columnResizeMode === 'fit'
        }
    ],
    thead: 'p-datatable-thead',
    columnResizer: 'p-datatable-column-resizer',
    columnHeaderContent: 'p-datatable-column-header-content',
    columnTitle: 'p-datatable-column-title',
    columnFooter: 'p-datatable-column-footer',
    sortIcon: 'p-datatable-sort-icon',
    pcSortBadge: 'p-datatable-sort-badge',
    filter: ({ instance }) => ({
        'p-datatable-filter': true,
        'p-datatable-inline-filter': instance.display === 'row',
        'p-datatable-popover-filter': instance.display === 'menu'
    }),
    filterElementContainer: 'p-datatable-filter-element-container',
    pcColumnFilterButton: 'p-datatable-column-filter-button',
    pcColumnFilterClearButton: 'p-datatable-column-filter-clear-button',
    filterOverlay: ({ instance }) => ({
        'p-datatable-filter-overlay p-component': true,
        'p-datatable-filter-overlay-popover': instance.display === 'menu'
    }),
    filterConstraintList: 'p-datatable-filter-constraint-list',
    filterConstraint: 'p-datatable-filter-constraint',
    filterConstraintSeparator: 'p-datatable-filter-constraint-separator',
    filterOperator: 'p-datatable-filter-operator',
    pcFilterOperatorDropdown: 'p-datatable-filter-operator-dropdown',
    filterRuleList: 'p-datatable-filter-rule-list',
    filterRule: 'p-datatable-filter-rule',
    pcFilterConstraintDropdown: 'p-datatable-filter-constraint-dropdown',
    pcFilterRemoveRuleButton: 'p-datatable-filter-remove-rule-button',
    pcFilterAddRuleButton: 'p-datatable-filter-add-rule-button',
    filterButtonbar: 'p-datatable-filter-buttonbar',
    pcFilterClearButton: 'p-datatable-filter-clear-button',
    pcFilterApplyButton: 'p-datatable-filter-apply-button',
    tbody: ({ instance }) => ({
        'p-datatable-tbody': true,
        'p-datatable-frozen-tbody': instance.frozenValue || instance.frozenBodyTemplate,
        'p-virtualscroller-content': instance.virtualScroll
    }),
    rowGroupHeader: 'p-datatable-row-group-header',
    rowToggleButton: 'p-datatable-row-toggle-button',
    rowToggleIcon: 'p-datatable-row-toggle-icon',
    rowExpansion: 'p-datatable-row-expansion',
    rowGroupFooter: 'p-datatable-row-group-footer',
    emptyMessage: 'p-datatable-empty-message',
    bodyCell: ({ instance }) => ({
        'p-datatable-frozen-column': instance.columnProp('frozen')
    }),
    reorderableRowHandle: 'p-datatable-reorderable-row-handle',
    pcRowEditorInit: 'p-datatable-row-editor-init',
    pcRowEditorSave: 'p-datatable-row-editor-save',
    pcRowEditorCancel: 'p-datatable-row-editor-cancel',
    tfoot: 'p-datatable-tfoot',
    footerCell: ({ instance }) => ({
        'p-datatable-frozen-column': instance.columnProp('frozen')
    }),
    virtualScrollerSpacer: 'p-datatable-virtualscroller-spacer',
    footer: 'p-datatable-tfoot',
    columnResizeIndicator: 'p-datatable-column-resize-indicator',
    rowReorderIndicatorUp: 'p-datatable-row-reorder-indicator-up',
    rowReorderIndicatorDown: 'p-datatable-row-reorder-indicator-down',
    sortableColumn: ({ instance }) => ({
        'p-datatable-sortable-column': instance.isEnabled(),
        ' p-datatable-column-sorted': instance.sorted
    }),
    sortableColumnIcon: 'p-datatable-sort-icon',
    sortableColumnBadge: 'p-sortable-column-badge',
    selectableRow: ({ instance }) => ({
        'p-datatable-selectable-row': instance.isEnabled(),
        'p-datatable-row-selected': instance.selected
    }),
    resizableColumn: 'p-datatable-resizable-column',
    reorderableColumn: 'p-datatable-reorderable-column',
    rowEditorCancel: 'p-datatable-row-editor-cancel'
};

const inlineStyles = {
    tableContainer: ({ instance }) => ({
        'max-height': instance.virtualScroll ? '' : instance.scrollHeight,
        overflow: 'auto'
    }),
    thead: { position: 'sticky' },
    tfoot: { position: 'sticky' }
};

@Injectable()
export class TableStyle extends BaseStyle {
    name = 'datatable';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * DataTable displays data in tabular format.
 *
 * [Live Demo](https://www.primeng.org/table/)
 *
 * @module tablestyle
 *
 */
export enum TableClasses {
    /**
     * Class name of the root element
     */
    root = 'p-datatable',
    /**
     * Class name of the mask element
     */
    mask = 'p-datatable-mask',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-datatable-loading-icon',
    /**
     * Class name of the header element
     */
    header = 'p-datatable-header',
    /**
     * Class name of the paginator element
     */
    pcPaginator = 'p-datatable-paginator-[position]',
    /**
     * Class name of the table container element
     */
    tableContainer = 'p-datatable-table-container',
    /**
     * Class name of the table element
     */
    table = 'p-datatable-table',
    /**
     * Class name of the thead element
     */
    thead = 'p-datatable-thead',
    /**
     * Class name of the column resizer element
     */
    columnResizer = 'p-datatable-column-resizer',
    /**
     * Class name of the column header content element
     */
    columnHeaderContent = 'p-datatable-column-header-content',
    /**
     * Class name of the column title element
     */
    columnTitle = 'p-datatable-column-title',
    /**
     * Class name of the sort icon element
     */
    sortIcon = 'p-datatable-sort-icon',
    /**
     * Class name of the sort badge element
     */
    pcSortBadge = 'p-datatable-sort-badge',
    /**
     * Class name of the filter element
     */
    filter = 'p-datatable-filter',
    /**
     * Class name of the filter element container element
     */
    filterElementContainer = 'p-datatable-filter-element-container',
    /**
     * Class name of the column filter button element
     */
    pcColumnFilterButton = 'p-datatable-column-filter-button',
    /**
     * Class name of the column filter clear button element
     */
    pcColumnFilterClearButton = 'p-datatable-column-filter-clear-button',
    /**
     * Class name of the filter overlay element
     */
    filterOverlay = 'p-datatable-filter-overlay',
    /**
     * Class name of the filter constraint list element
     */
    filterConstraintList = 'p-datatable-filter-constraint-list',
    /**
     * Class name of the filter constraint element
     */
    filterConstraint = 'p-datatable-filter-constraint',
    /**
     * Class name of the filter constraint separator element
     */
    filterConstraintSeparator = 'p-datatable-filter-constraint-separator',
    /**
     * Class name of the filter operator element
     */
    filterOperator = 'p-datatable-filter-operator',
    /**
     * Class name of the filter operator dropdown element
     */
    pcFilterOperatorDropdown = 'p-datatable-filter-operator-dropdown',
    /**
     * Class name of the filter rule list element
     */
    filterRuleList = 'p-datatable-filter-rule-list',
    /**
     * Class name of the filter rule element
     */
    filterRule = 'p-datatable-filter-rule',
    /**
     * Class name of the filter constraint dropdown element
     */
    pcFilterConstraintDropdown = 'p-datatable-filter-constraint-dropdown',
    /**
     * Class name of the filter remove rule button element
     */
    pcFilterRemoveRuleButton = 'p-datatable-filter-remove-rule-button',
    /**
     * Class name of the filter add rule button element
     */
    pcFilterAddRuleButton = 'p-datatable-filter-add-rule-button',
    /**
     * Class name of the filter buttonbar element
     */
    filterButtonbar = 'p-datatable-filter-buttonbar',
    /**
     * Class name of the filter clear button element
     */
    pcFilterClearButton = 'p-datatable-filter-clear-button',
    /**
     * Class name of the filter apply button element
     */
    pcFilterApplyButton = 'p-datatable-filter-apply-button',
    /**
     * Class name of the tbody element
     */
    tbody = 'p-datatable-tbody',
    /**
     * Class name of the row group header element
     */
    rowGroupHeader = 'p-datatable-row-group-header',
    /**
     * Class name of the row toggle button element
     */
    rowToggleButton = 'p-datatable-row-toggle-button',
    /**
     * Class name of the row toggle icon element
     */
    rowToggleIcon = 'p-datatable-row-toggle-icon',
    /**
     * Class name of the row expansion element
     */
    rowExpansion = 'p-datatable-row-expansion',
    /**
     * Class name of the row group footer element
     */
    rowGroupFooter = 'p-datatable-row-group-footer',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-datatable-empty-message',
    /**
     * Class name of the reorderable row handle element
     */
    reorderableRowHandle = 'p-datatable-reorderable-row-handle',
    /**
     * Class name of the row editor init element
     */
    pcRowEditorInit = 'p-datatable-row-editor-init',
    /**
     * Class name of the row editor save element
     */
    pcRowEditorSave = 'p-datatable-row-editor-save',
    /**
     * Class name of the row editor cancel element
     */
    pcRowEditorCancel = 'p-datatable-row-editor-cancel',
    /**
     * Class name of the tfoot element
     */
    tfoot = 'p-datatable-tfoot',
    /**
     * Class name of the virtual scroller spacer element
     */
    virtualScrollerSpacer = 'p-datatable-virtualscroller-spacer',
    /**
     * Class name of the footer element
     */
    footer = 'p-datatable-footer',
    /**
     * Class name of the column resize indicator element
     */
    columnResizeIndicator = 'p-datatable-column-resize-indicator',
    /**
     * Class name of the row reorder indicator up element
     */
    rowReorderIndicatorUp = 'p-datatable-row-reorder-indicator-up',
    /**
     * Class name of the row reorder indicator down element
     */
    rowReorderIndicatorDown = 'p-datatable-row-reorder-indicator-down',
    /**
     * Class name of the sortable column element
     */
    sortableColumn = 'p-datatable-sortable-column',
    /**
     * Class name of the sortable column icon element
     */
    sortableColumnIcon = 'p-sortable-column-icon',
    /**
     * Class name of the sortable column badge element
     */
    sortableColumnBadge = 'p-sortable-column-badge',
    /**
     * Class name of the selectable row element
     */
    selectableRow = 'p-datatable-selectable-row',
    /**
     * Class name of the resizable column element
     */
    resizableColumn = 'p-datatable-resizable-column',
    /**
     * Class name of the row editor cancel element
     */
    rowEditorCancel = 'p-datatable-row-editor-cancel'
}
