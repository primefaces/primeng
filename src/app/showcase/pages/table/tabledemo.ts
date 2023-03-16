import { Component } from '@angular/core';
import { TableContextMenuDemo } from '../../doc/table/contextmenudoc';
import { TableBasicDemo } from '../../doc/table/basicdoc';
import { TableCellEditDemo } from '../../doc/table/celleditdoc';
import { TableCheckboxSelectionDemo } from '../../doc/table/checkboxselectiondoc';
import { TableColumnGroupDemo } from '../../doc/table/columngroupdoc';
import { TableColumnResizeExpandModeDemo } from '../../doc/table/columnresizeexpandmodedoc';
import { TableColumnResizeScrollableModeDemo } from '../../doc/table/columnresizescrollablemodedoc';
import { TableColumnSelectionDemo } from '../../doc/table/columnselectiondoc';
import { TableColumnToggleDemo } from '../../doc/table/columntoggledoc';
import { TableControlledSelectionDemo } from '../../doc/table/controlledselectiondoc';
import { TableCustomersDemo } from '../../doc/table/customersdoc';
import { TableCustomSortDemo } from '../../doc/table/customsortdoc';
import { TableDynamicDemo } from '../../doc/table/dynamicdoc';
import { TableExpandableRowGroupDemo } from '../../doc/table/expandablerowgroupdoc';
import { TableExportDemo } from '../../doc/table/exportdoc';
import { TableFilterMenuDemo } from '../../doc/table/filtermenudoc';
import { TableFilterRowDemo } from '../../doc/table/filterrowdoc';
import { TableFlexibleScrollDemo } from '../../doc/table/flexiblescrolldoc';
import { TableFrozenColumnsDemo } from '../../doc/table/frozencolumnsdoc';
import { TableFrozenRowsDemo } from '../../doc/table/frozenrowsdoc';
import { TableGridlinesDemo } from '../../doc/table/gridlinesdoc';
import { ImportDoc } from '../../doc/table/importdoc';
import { TableHorizontalAndVerticalScrollDemo } from '../../doc/table/horizontalandverticaldoc';
import { TableLazyLoadDemo } from '../../doc/table/lazyloaddoc';
import { TableMultipleSelectionDemo } from '../../doc/table/multipleselectiondoc';
import { TablePageOnlySelectionDemo } from '../../doc/table/pageonlyselectiondoc';
import { TablePaginatorBasicDemo } from '../../doc/table/paginatorbasicdoc';
import { TablePaginatorProgrammaticDemo } from '../../doc/table/paginatorprogrammaticdoc';
import { TableProductsDemo } from '../../doc/table/productsdoc';
import { TableRadioButtonSelectionDemo } from '../../doc/table/radiobuttonselectiondoc';
import { TableReorderDemo } from '../../doc/table/reorderdoc';
import { TableResponsiveScrollDemo } from '../../doc/table/responsivescrolldoc';
import { TableResponsiveStackDemo } from '../../doc/table/responsivestackdoc';
import { TableRowEditDemo } from '../../doc/table/roweditdoc';
import { TableRowExpandDemo } from '../../doc/table/rowexpanddoc';
import { TableRowspanGroupingDemo } from '../../doc/table/rowspangroupingdoc';
import { TableSingleColumnSortDemo } from '../../doc/table/singlecolumnsortdoc';
import { TableSingleSelectionDemo } from '../../doc/table/singleselectiondoc';
import { TableSizeDemo } from '../../doc/table/sizedoc';
import { TableStatefulDemo } from '../../doc/table/statefuldoc';
import { TableStripedDemo } from '../../doc/table/stripeddoc';
import { TableStyleDemo } from '../../doc/table/styledoc';
import { TableSubheaderGroupingDemo } from '../../doc/table/subheadergroupingdoc';
import { TableTemplateDemo } from '../../doc/table/templatedoc';
import { TableVerticalScrollDemo } from '../../doc/table/verticalscrolldoc';
import { TableVirtualScrollDemo } from '../../doc/table/virtualscrolldoc';
import { TableVirtualScrollLazyDemo } from '../../doc/table/virtualscrolllazydoc';
import { TableColumnResizeFitModeDemo } from '../../doc/table/columnresizefitmodedoc';
import { TableSelectionEventsDemo } from '../../doc/table/selectioneventsdoc';
import { PropsDoc } from '../../doc/table/propsdoc';
import { EventsDoc } from '../../doc/table/eventsdoc';
import { StylingDoc } from '../../doc/table/stylingdoc';
import { MethodsDoc } from '../../doc/table/methodsdoc';
import { TemplatesDoc } from '../../doc/table/templatesdoc';

@Component({
    templateUrl: './tabledemo.html',
    styleUrls: ['./tabledemo.scss']
})
export class TableDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: TableBasicDemo
        },
        {
            id: 'dynamic',
            label: 'Dynamic Columns',
            component: TableDynamicDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: TableTemplateDemo
        },
        {
            id: 'size',
            label: 'Size',
            component: TableSizeDemo
        },
        {
            id: 'gridlines',
            label: 'Grid Lines',
            component: TableGridlinesDemo
        },
        {
            id: 'striped',
            label: 'Striped Rows',
            component: TableStripedDemo
        },
        {
            id: 'table-style',
            label: 'Style',
            component: TableStyleDemo
        },
        {
            id: 'responsive',
            label: 'Responsive',
            children: [
                {
                    id: 'responsive-scroll',
                    label: 'Scroll',
                    component: TableResponsiveScrollDemo
                },
                {
                    id: 'responsive-stack',
                    label: 'Stack',
                    component: TableResponsiveStackDemo
                }
            ]
        },
        {
            id: 'paginator',
            label: 'Paginator',
            children: [
                {
                    id: 'paginator-basic',
                    label: 'Basic',
                    component: TablePaginatorBasicDemo
                },
                {
                    id: 'paginator-programmatic',
                    label: 'Programmatic',
                    component: TablePaginatorProgrammaticDemo
                }
            ]
        },
        {
            id: 'sort',
            label: 'Sort',
            children: [
                {
                    id: 'single-column-sort',
                    label: 'Single Column',
                    component: TableSingleColumnSortDemo
                },
                {
                    id: 'custom-sort',
                    label: 'Custom Sort',
                    component: TableCustomSortDemo
                }
            ]
        },
        {
            id: 'filter',
            label: 'Filter',
            children: [
                {
                    id: 'filter-menu',
                    label: 'Filter Menu',
                    component: TableFilterMenuDemo
                },
                {
                    id: 'filter-row',
                    label: 'Filter Row',
                    component: TableFilterRowDemo
                }
            ]
        },
        {
            id: 'row-selection',
            label: 'Row Selection',
            children: [
                {
                    id: 'single-selection',
                    label: 'Single Selection',
                    component: TableSingleSelectionDemo
                },
                {
                    id: 'multiple-selection',
                    label: 'Multiple Selection',
                    component: TableMultipleSelectionDemo
                },
                {
                    id: 'checkbox-selection',
                    label: 'Checkbox Selection',
                    component: TableCheckboxSelectionDemo
                },
                {
                    id: 'radio-button-selection',
                    label: 'Radio Button Selection',
                    component: TableRadioButtonSelectionDemo
                },
                {
                    id: 'controlled-selection',
                    label: 'Controlled Selection',
                    component: TableControlledSelectionDemo
                },
                {
                    id: 'page-only-selection',
                    label: 'Page Only Selection',
                    component: TablePageOnlySelectionDemo
                },
                {
                    id: 'selection-events',
                    label: 'Events',
                    component: TableSelectionEventsDemo
                }
            ]
        },
        {
            id: 'column-selection',
            label: 'Column Selection',
            component: TableColumnSelectionDemo
        },
        {
            id: 'row-expand',
            label: 'Row Expand',
            component: TableRowExpandDemo
        },
        {
            id: 'Edit',
            label: 'Edit',
            children: [
                {
                    id: 'row-edit',
                    label: 'Row Edit',
                    component: TableRowEditDemo
                },
                {
                    id: 'cell-edit',
                    label: 'Cell Edit',
                    component: TableCellEditDemo
                }
            ]
        },
        {
            id: 'lazy-load',
            label: 'Lazy Load',
            component: TableLazyLoadDemo
        },
        {
            id: 'scroll',
            label: 'Scroll',
            children: [
                {
                    id: 'vertical-scroll',
                    label: 'Vertical Scroll',
                    component: TableVerticalScrollDemo
                },
                {
                    id: 'horizontal-and-vertical-scroll',
                    label: 'Horizontal and Vertical Scroll',
                    component: TableHorizontalAndVerticalScrollDemo
                },
                {
                    id: 'flex-scroll',
                    label: 'Flex Scroll',
                    component: TableFlexibleScrollDemo
                },
                {
                    id: 'frozen-rows',
                    label: 'Frozen Rows',
                    component: TableFrozenRowsDemo
                },
                {
                    id: 'frozen-columns',
                    label: 'Frozen Columns',
                    component: TableFrozenColumnsDemo
                }
            ]
        },
        {
            id: 'virtual-scroll',
            label: 'Virtual Scroll',
            children: [
                {
                    id: 'virtual-scroll-basic',
                    label: 'Preload',
                    component: TableVirtualScrollDemo
                },
                {
                    id: 'virtual-scroll-lazy',
                    label: 'Lazy',
                    component: TableVirtualScrollLazyDemo
                }
            ]
        },
        {
            id: 'column-group',
            label: 'Column Group',
            component: TableColumnGroupDemo
        },
        {
            id: 'row-group',
            label: 'Row Group',
            children: [
                {
                    id: 'subheader',
                    label: 'Subheader',
                    component: TableSubheaderGroupingDemo
                },
                {
                    id: 'expand',
                    label: 'Expandable',
                    component: TableExpandableRowGroupDemo
                },
                {
                    id: 'row-span',
                    label: 'RowSpan',
                    component: TableRowspanGroupingDemo
                }
            ]
        },
        {
            id: 'column-resize',
            label: 'Column Resize',
            children: [
                {
                    id: 'fit-mode',
                    label: 'Fit Mode',
                    component: TableColumnResizeFitModeDemo
                },
                {
                    id: 'expand-mode',
                    label: 'Expand Mode',
                    component: TableColumnResizeExpandModeDemo
                },
                {
                    id: 'scrollable',
                    label: 'Scrollable',
                    component: TableColumnResizeScrollableModeDemo
                }
            ]
        },
        {
            id: 'reorder',
            label: 'Reorder',
            component: TableReorderDemo
        },
        {
            id: 'column-toggle',
            label: 'Column Toggle',
            component: TableColumnToggleDemo
        },
        {
            id: 'export',
            label: 'Export',
            component: TableExportDemo
        },
        {
            id: 'context-menu',
            label: 'Context Menu',
            component: TableContextMenuDemo
        },
        {
            id: 'stateful',
            label: 'Stateful',
            component: TableStatefulDemo
        },
        {
            id: 'samples',
            label: 'Samples',
            children: [
                {
                    id: 'customers',
                    label: 'Customers',
                    component: TableCustomersDemo
                },
                {
                    id: 'products',
                    label: 'Products',
                    component: TableProductsDemo
                }
            ]
        },
        {
            id: 'styling',
            label: 'Styling',
            component: StylingDoc
        }
    ];

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
