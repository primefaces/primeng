import { Component } from '@angular/core';
import { ContextMenuDoc } from '@doc/table/contextmenudoc';
import { BasicDoc } from '@doc/table/basicdoc';
import { CellEditDoc } from '@doc/table/celleditdoc';
import { CheckboxSelectionDoc } from '@doc/table/checkboxselectiondoc';
import { ColumnGroupDoc } from '@doc/table/columngroupdoc';
import { ColumnResizeExpandModeDoc } from '@doc/table/columnresizeexpandmodedoc';
import { ColumnResizeScrollableModeDoc } from '@doc/table/columnresizescrollablemodedoc';
import { ColumnSelectionDoc } from '@doc/table/columnselectiondoc';
import { ColumnToggleDoc } from '@doc/table/columntoggledoc';
import { CustomersDoc } from '@doc/table/customersdoc';
import { DynamicDoc } from '@doc/table/dynamicdoc';
import { ExpandableRowGroupDoc } from '@doc/table/expandablerowgroupdoc';
import { ExportDoc } from '@doc/table/exportdoc';
import { FilterBasicDoc } from '@doc/table/filterbasic';
import { FlexibleScrollDoc } from '@doc/table/flexiblescrolldoc';
import { FrozenColumnsDoc } from '@doc/table/frozencolumnsdoc';
import { FrozenRowsDoc } from '@doc/table/frozenrowsdoc';
import { GridlinesDoc } from '@doc/table/gridlinesdoc';
import { ImportDoc } from '@doc/table/importdoc';
import { HorizontalScrollDoc } from '@doc/table/horizontalscrolldoc';
import { LazyLoadDoc } from '@doc/table/lazyloaddoc';
import { MultipleSelectionDoc } from '@doc/table/multipleselectiondoc';
import { PaginatorBasicDoc } from '@doc/table/paginatorbasicdoc';
import { PaginatorProgrammaticDoc } from '@doc/table/paginatorprogrammaticdoc';
import { ProductsDoc } from '@doc/table/productsdoc';
import { RadioButtonSelectionDoc } from '@doc/table/radiobuttonselectiondoc';
import { ReorderDoc } from '@doc/table/reorderdoc';
import { ResponsiveScrollDoc } from '@doc/table/responsivescrolldoc';
import { ResponsiveStackDoc } from '@doc/table/responsivestackdoc';
import { RowEditDoc } from '@doc/table/roweditdoc';
import { RowExpansionDoc } from '@doc/table/rowexpansiondoc';
import { RowspanGroupingDoc } from '@doc/table/rowspangroupingdoc';
import { SingleColumnSortDoc } from '@doc/table/singlecolumnsortdoc';
import { MultipleColumnsSortDoc } from '@doc/table/multiplecolumnssortdoc';
import { SingleSelectionDoc } from '@doc/table/singleselectiondoc';
import { SizeDoc } from '@doc/table/sizedoc';
import { StatefulDoc } from '@doc/table/statefuldoc';
import { StripedDoc } from '@doc/table/stripeddoc';
import { StyleDoc } from '@doc/table/styledoc';
import { SubheaderGroupingDoc } from '@doc/table/subheadergroupingdoc';
import { TemplateDoc } from '@doc/table/templatedoc';
import { VerticalScrollDoc } from '@doc/table/verticalscrolldoc';
import { VirtualScrollDoc } from '@doc/table/virtualscrolldoc';
import { VirtualScrollLazyDoc } from '@doc/table/virtualscrolllazydoc';
import { ColumnResizeFitModeDoc } from '@doc/table/columnresizefitmodedoc';
import { SelectionEventsDoc } from '@doc/table/selectioneventsdoc';
import { StylingDoc } from '@doc/table/stylingdoc';
import { AccessibilityDoc } from '@doc/table/accessibilitydoc';
import { PreSortDoc } from '@doc/table/presortdoc';
import { FilterSortEditDoc } from '@doc/table/filtersorteditdoc';

@Component({
    templateUrl: './tabledemo.html',
    styleUrls: ['./tabledemo.scss']
})
export class TableDemo {
    docs = [
        {
            id: 'import-demo',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic Columns',
            component: DynamicDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'gridlines',
            label: 'Grid Lines',
            component: GridlinesDoc
        },
        {
            id: 'striped',
            label: 'Striped Rows',
            component: StripedDoc
        },
        {
            id: 'table-style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'responsive',
            label: 'Responsive',
            children: [
                {
                    id: 'responsive-scroll',
                    label: 'Scroll',
                    component: ResponsiveScrollDoc
                },
                {
                    id: 'responsive-stack',
                    label: 'Stack',
                    component: ResponsiveStackDoc
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
                    component: PaginatorBasicDoc
                },
                {
                    id: 'paginator-programmatic',
                    label: 'Programmatic',
                    component: PaginatorProgrammaticDoc
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
                    component: SingleColumnSortDoc
                },
                {
                    id: 'multiple-columns-sort',
                    label: 'Multiple Columns',
                    component: MultipleColumnsSortDoc
                },
                {
                    id: 'pre-sort',
                    label: 'Presort',
                    component: PreSortDoc
                }
            ]
        },
        {
            id: 'filter',
            label: 'Filter',
            children: [
                {
                    id: 'filter-basic',
                    label: 'Basic',
                    component: FilterBasicDoc
                }
            ]
        },
        {
            id: 'row-selection',
            label: 'Row Selection',
            children: [
                {
                    id: 'single-selection',
                    label: 'Single',
                    component: SingleSelectionDoc
                },
                {
                    id: 'multiple-selection',
                    label: 'Multiple',
                    component: MultipleSelectionDoc
                },
                {
                    id: 'radio-button-selection',
                    label: 'RadioButton',
                    component: RadioButtonSelectionDoc
                },
                {
                    id: 'checkbox-selection',
                    label: 'Checkbox',
                    component: CheckboxSelectionDoc
                },
                {
                    id: 'selection-events',
                    label: 'Events',
                    component: SelectionEventsDoc
                }
            ]
        },
        {
            id: 'column-selection',
            label: 'Column Selection',
            component: ColumnSelectionDoc
        },
        {
            id: 'row-expansion',
            label: 'Row Expansion',
            component: RowExpansionDoc
        },
        {
            id: 'Edit',
            label: 'Edit',
            children: [
                {
                    id: 'cell-edit',
                    label: 'Cell',
                    component: CellEditDoc
                },
                {
                    id: 'row-edit',
                    label: 'Row',
                    component: RowEditDoc
                },
                {
                    id: 'filter-sort-edit',
                    label: 'Filter & Sort Cell Edit',
                    component: FilterSortEditDoc
                }
            ]
        },
        {
            id: 'lazy-load',
            label: 'Lazy Load',
            component: LazyLoadDoc
        },
        {
            id: 'scroll',
            label: 'Scroll',
            children: [
                {
                    id: 'vertical-scroll',
                    label: 'Vertical',
                    component: VerticalScrollDoc
                },
                {
                    id: 'flex-scroll',
                    label: 'Flexible',
                    component: FlexibleScrollDoc
                },
                {
                    id: 'horizontal-scroll',
                    label: 'Horizontal',
                    component: HorizontalScrollDoc
                },
                {
                    id: 'frozen-rows',
                    label: 'Frozen Rows',
                    component: FrozenRowsDoc
                },
                {
                    id: 'frozen-columns',
                    label: 'Frozen Columns',
                    component: FrozenColumnsDoc
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
                    component: VirtualScrollDoc
                },
                {
                    id: 'virtual-scroll-lazy',
                    label: 'Lazy',
                    component: VirtualScrollLazyDoc
                }
            ]
        },
        {
            id: 'column-group',
            label: 'Column Group',
            component: ColumnGroupDoc
        },
        {
            id: 'row-group',
            label: 'Row Group',
            children: [
                {
                    id: 'subheader',
                    label: 'Subheader',
                    component: SubheaderGroupingDoc
                },
                {
                    id: 'expand',
                    label: 'Expandable',
                    component: ExpandableRowGroupDoc
                },
                {
                    id: 'row-span',
                    label: 'RowSpan',
                    component: RowspanGroupingDoc
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
                    component: ColumnResizeFitModeDoc
                },
                {
                    id: 'expand-mode',
                    label: 'Expand Mode',
                    component: ColumnResizeExpandModeDoc
                },
                {
                    id: 'scrollable',
                    label: 'Scrollable',
                    component: ColumnResizeScrollableModeDoc
                }
            ]
        },
        {
            id: 'reorder',
            label: 'Reorder',
            component: ReorderDoc
        },
        {
            id: 'column-toggle',
            label: 'Column Toggle',
            component: ColumnToggleDoc
        },
        {
            id: 'export',
            label: 'Export',
            component: ExportDoc
        },
        {
            id: 'context-menu',
            label: 'Context Menu',
            component: ContextMenuDoc
        },
        {
            id: 'stateful',
            label: 'Stateful',
            component: StatefulDoc
        },
        {
            id: 'samples',
            label: 'Samples',
            children: [
                {
                    id: 'customers',
                    label: 'Customers',
                    component: CustomersDoc
                },
                {
                    id: 'products',
                    label: 'Products',
                    component: ProductsDoc
                }
            ]
        },
        {
            id: 'styling',
            label: 'Styling',
            component: StylingDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
