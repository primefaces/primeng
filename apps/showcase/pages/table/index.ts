import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/table/accessibility-doc';
import { BasicDoc } from '@/doc/table/basic-doc';
import { CellEditDoc } from '@/doc/table/celledit-doc';
import { CheckboxSelectionDoc } from '@/doc/table/checkboxselection-doc';
import { ColumnGroupDoc } from '@/doc/table/columngroup-doc';
import { ColumnResizeExpandModeDoc } from '@/doc/table/columnresizeexpandmode-doc';
import { ColumnResizeFitModeDoc } from '@/doc/table/columnresizefitmode-doc';
import { ColumnResizeScrollableModeDoc } from '@/doc/table/columnresizescrollablemode-doc';
import { ColumnSelectionDoc } from '@/doc/table/columnselection-doc';
import { ColumnToggleDoc } from '@/doc/table/columntoggle-doc';
import { ContextMenuDoc } from '@/doc/table/contextmenu-doc';
import { CustomersDoc } from '@/doc/table/customers-doc';
import { DynamicDoc } from '@/doc/table/dynamic-doc';
import { ExpandableRowGroupDoc } from '@/doc/table/expandablerowgroup-doc';
import { ExportDoc } from '@/doc/table/export-doc';
import { FilterAdvancedDoc } from '@/doc/table/filter-advanced-doc';
import { FilterBasicDoc } from '@/doc/table/filterbasic-doc';
import { FlexibleScrollDoc } from '@/doc/table/flexiblescroll-doc';
import { FrozenColumnsDoc } from '@/doc/table/frozencolumns-doc';
import { FrozenRowsDoc } from '@/doc/table/frozenrows-doc';
import { GridlinesDoc } from '@/doc/table/gridlines-doc';
import { HorizontalScrollDoc } from '@/doc/table/horizontalscroll-doc';
import { ImportDoc } from '@/doc/table/import-doc';
import { LoadingMaskDoc } from '@/doc/table/loadingmask-doc';
import { LoadingSkeletonDoc } from '@/doc/table/loadingskeleton-doc';
import { MultipleColumnsSortDoc } from '@/doc/table/multiplecolumnssort-doc';
import { MultipleSelectionDoc } from '@/doc/table/multipleselection-doc';
import { PaginatorBasicDoc } from '@/doc/table/paginatorbasic-doc';
import { PaginatorProgrammaticDoc } from '@/doc/table/paginatorprogrammatic-doc';
import { PreSortDoc } from '@/doc/table/presort-doc';
import { ProductsDoc } from '@/doc/table/products-doc';
import { PTComponent } from '@/doc/table/pt/PTComponent';
import { RadioButtonSelectionDoc } from '@/doc/table/radiobuttonselection-doc';
import { RemovableSortDoc } from '@/doc/table/removablesort-doc';
import { ReorderDoc } from '@/doc/table/reorder-doc';
import { RowEditDoc } from '@/doc/table/rowedit-doc';
import { RowExpansionDoc } from '@/doc/table/rowexpansion-doc';
import { RowspanGroupingDoc } from '@/doc/table/rowspangrouping-doc';
import { SelectionEventsDoc } from '@/doc/table/selectionevents-doc';
import { SingleColumnSortDoc } from '@/doc/table/singlecolumnsort-doc';
import { SingleSelectionDoc } from '@/doc/table/singleselection-doc';
import { SizeDoc } from '@/doc/table/size-doc';
import { StatefulDoc } from '@/doc/table/stateful-doc';
import { StripedDoc } from '@/doc/table/striped-doc';
import { StyleDoc } from '@/doc/table/style-doc';
import { SubheaderGroupingDoc } from '@/doc/table/subheadergrouping-doc';
import { TemplateDoc } from '@/doc/table/template-doc';
import { VerticalScrollDoc } from '@/doc/table/verticalscroll-doc';
import { VirtualScrollDoc } from '@/doc/table/virtualscroll-doc';
import { VirtualScrollLazyDoc } from '@/doc/table/virtualscrolllazy-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Table Component" header="Table" description="Table displays data in tabular format." [docs]="docs" [apiDocs]="['Table', 'ColumnFilter']" themeDocs="table" [ptDocs]="ptComponent"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    styleUrl: './tabledemo.scss'
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
            label: 'Conditional Style',
            component: StyleDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            children: [
                {
                    id: 'loading-mask',
                    label: 'Mask',
                    component: LoadingMaskDoc
                },
                {
                    id: 'loading-skeleton',
                    label: 'Skeleton',
                    component: LoadingSkeletonDoc
                }
            ]
        },
        {
            id: 'paginator',
            label: 'Pagination',
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
                },
                {
                    id: 'removable-sort',
                    label: 'Removable',
                    component: RemovableSortDoc
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
                },
                {
                    id: 'filter-advanced',
                    label: 'Advanced',
                    component: FilterAdvancedDoc
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
                    id: 'column-selection',
                    label: 'Column',
                    component: ColumnSelectionDoc
                },
                {
                    id: 'selection-events',
                    label: 'Events',
                    component: SelectionEventsDoc
                }
            ]
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
                }
            ]
        },
        // {
        //     id: 'lazy-load',
        //     label: 'Lazy Load',
        //     component: LazyLoadDoc,
        // },
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
