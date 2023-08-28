import { Component } from '@angular/core';
import { ContextMenuDoc } from '../../doc/table/contextmenudoc';
import { BasicDoc } from '../../doc/table/basicdoc';
import { CellEditDoc } from '../../doc/table/celleditdoc';
import { CheckboxSelectionDoc } from '../../doc/table/checkboxselectiondoc';
import { ColumnGroupDoc } from '../../doc/table/columngroupdoc';
import { ColumnResizeExpandModeDoc } from '../../doc/table/columnresizeexpandmodedoc';
import { ColumnResizeScrollableModeDoc } from '../../doc/table/columnresizescrollablemodedoc';
import { ColumnSelectionDoc } from '../../doc/table/columnselectiondoc';
import { ColumnToggleDoc } from '../../doc/table/columntoggledoc';
import { ControlledSelectionDoc } from '../../doc/table/controlledselectiondoc';
import { CustomersDoc } from '../../doc/table/customersdoc';
import { CustomSortDoc } from '../../doc/table/customsortdoc';
import { DynamicDoc } from '../../doc/table/dynamicdoc';
import { ExpandableRowGroupDoc } from '../../doc/table/expandablerowgroupdoc';
import { ExportDoc } from '../../doc/table/exportdoc';
import { FilterMenuDoc } from '../../doc/table/filtermenudoc';
import { FilterRowDoc } from '../../doc/table/filterrowdoc';
import { FlexibleScrollDoc } from '../../doc/table/flexiblescrolldoc';
import { FrozenColumnsDoc } from '../../doc/table/frozencolumnsdoc';
import { FrozenRowsDoc } from '../../doc/table/frozenrowsdoc';
import { GridlinesDoc } from '../../doc/table/gridlinesdoc';
import { ImportDoc } from '../../doc/table/importdoc';
import { HorizontalAndVerticalScrollDoc } from '../../doc/table/horizontalandverticaldoc';
import { LazyLoadDoc } from '../../doc/table/lazyloaddoc';
import { MultipleSelectionDoc } from '../../doc/table/multipleselectiondoc';
import { PageOnlySelectionDoc } from '../../doc/table/pageonlyselectiondoc';
import { PaginatorBasicDoc } from '../../doc/table/paginatorbasicdoc';
import { PaginatorProgrammaticDoc } from '../../doc/table/paginatorprogrammaticdoc';
import { ProductsDoc } from '../../doc/table/productsdoc';
import { RadioButtonSelectionDoc } from '../../doc/table/radiobuttonselectiondoc';
import { ReorderDoc } from '../../doc/table/reorderdoc';
import { ResponsiveScrollDoc } from '../../doc/table/responsivescrolldoc';
import { ResponsiveStackDoc } from '../../doc/table/responsivestackdoc';
import { RowEditDoc } from '../../doc/table/roweditdoc';
import { RowExpandDoc } from '../../doc/table/rowexpanddoc';
import { RowspanGroupingDoc } from '../../doc/table/rowspangroupingdoc';
import { SingleColumnSortDoc } from '../../doc/table/singlecolumnsortdoc';
import { SingleSelectionDoc } from '../../doc/table/singleselectiondoc';
import { SizeDoc } from '../../doc/table/sizedoc';
import { StatefulDoc } from '../../doc/table/statefuldoc';
import { StripedDoc } from '../../doc/table/stripeddoc';
import { StyleDoc } from '../../doc/table/styledoc';
import { SubheaderGroupingDoc } from '../../doc/table/subheadergroupingdoc';
import { TemplateDoc } from '../../doc/table/templatedoc';
import { VerticalScrollDoc } from '../../doc/table/verticalscrolldoc';
import { VirtualScrollDoc } from '../../doc/table/virtualscrolldoc';
import { VirtualScrollLazyDoc } from '../../doc/table/virtualscrolllazydoc';
import { ColumnResizeFitModeDoc } from '../../doc/table/columnresizefitmodedoc';
import { SelectionEventsDoc } from '../../doc/table/selectioneventsdoc';
import { StylingDoc } from '../../doc/table/stylingdoc';
import { AccessibilityDoc } from '../../doc/table/accessibilitydoc';
import { PaginatorLocaleDoc } from '../../doc/table/paginatorlocaledoc';

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
                    id: 'paginator-locale',
                    label: 'Locale',
                    component: PaginatorLocaleDoc
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
                    id: 'custom-sort',
                    label: 'Custom Sort',
                    component: CustomSortDoc
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
                    component: FilterMenuDoc
                },
                {
                    id: 'filter-row',
                    label: 'Filter Row',
                    component: FilterRowDoc
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
                    component: SingleSelectionDoc
                },
                {
                    id: 'multiple-selection',
                    label: 'Multiple Selection',
                    component: MultipleSelectionDoc
                },
                {
                    id: 'checkbox-selection',
                    label: 'Checkbox Selection',
                    component: CheckboxSelectionDoc
                },
                {
                    id: 'radio-button-selection',
                    label: 'Radio Button Selection',
                    component: RadioButtonSelectionDoc
                },
                {
                    id: 'controlled-selection',
                    label: 'Controlled Selection',
                    component: ControlledSelectionDoc
                },
                {
                    id: 'page-only-selection',
                    label: 'Page Only Selection',
                    component: PageOnlySelectionDoc
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
            id: 'row-expand',
            label: 'Row Expand',
            component: RowExpandDoc
        },
        {
            id: 'Edit',
            label: 'Edit',
            children: [
                {
                    id: 'row-edit',
                    label: 'Row Edit',
                    component: RowEditDoc
                },
                {
                    id: 'cell-edit',
                    label: 'Cell Edit',
                    component: CellEditDoc
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
                    label: 'Vertical Scroll',
                    component: VerticalScrollDoc
                },
                {
                    id: 'horizontal-and-vertical-scroll',
                    label: 'Horizontal and Vertical Scroll',
                    component: HorizontalAndVerticalScrollDoc
                },
                {
                    id: 'flex-scroll',
                    label: 'Flex Scroll',
                    component: FlexibleScrollDoc
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
