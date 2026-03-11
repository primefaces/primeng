import { AccessibilityDoc } from '@/doc/treetable/accessibility-doc';
import { BasicDoc } from '@/doc/treetable/basic-doc';
import { ColumnGroupDoc } from '@/doc/treetable/columngroup-doc';
import { ResizeExpandDoc } from '@/doc/treetable/columnresizeexpand-doc';
import { ResizeFitDoc } from '@/doc/treetable/columnresizefit-doc';
import { ResizeScrollableDoc } from '@/doc/treetable/columnresizescrollable-doc';
import { ColumnToggleDoc } from '@/doc/treetable/columntoggle-doc';
import { ConditionalStyleDoc } from '@/doc/treetable/conditionalstyle-doc';
import { ContextMenuDoc } from '@/doc/treetable/contextmenu-doc';
import { ControlledDoc } from '@/doc/treetable/controlled-doc';
import { DynamicColumnsDoc } from '@/doc/treetable/dynamiccolumns-doc';
import { FilterDoc } from '@/doc/treetable/filter-doc';
import { ScrollFlexibleDoc } from '@/doc/treetable/flexiblescroll-doc';
import { GridlinesDoc } from '@/doc/treetable/gridlines-doc';
import { ImportDoc } from '@/doc/treetable/import-doc';
import { LazyLoadDoc } from '@/doc/treetable/lazyload-doc';
import { PaginatorBasicDoc } from '@/doc/treetable/paginatorbasic-doc';
import { PaginatorTemplateDoc } from '@/doc/treetable/paginatortemplate-doc';
import { PTComponent } from '@/doc/treetable/pt/PTComponent';
import { ReorderDoc } from '@/doc/treetable/reorder-doc';
import { FrozenColumnsDoc } from '@/doc/treetable/scrollfrozencolumns-doc';
import { ScrollHorizontalDoc } from '@/doc/treetable/scrollhorizontal-doc';
import { ScrollVerticalDoc } from '@/doc/treetable/scrollvertical-doc';
import { SelectionCheckboxDoc } from '@/doc/treetable/selectioncheckbox-doc';
import { SelectionEventsDoc } from '@/doc/treetable/selectioneventsc-doc';
import { SelectionMultipleDoc } from '@/doc/treetable/selectionmultiple-doc';
import { SelectionSingleDoc } from '@/doc/treetable/selectionsingle-doc';
import { SizeDoc } from '@/doc/treetable/size-doc';
import { SortMultipleColumnsDoc } from '@/doc/treetable/sortmultiplecolumns-doc';
import { SortSingleColumnDoc } from '@/doc/treetable/sortsinglecolumn-doc';
import { TemplateDoc } from '@/doc/treetable/template-doc';
import { LoadingMaskDoc } from '@/doc/treetable/loadingmask-doc';
import { LoadingSkeletonDoc } from '@/doc/treetable/loadingskeleton-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular TreeTable Component"
        header="TreeTable"
        description="TreeTable is used to display hierarchical data in tabular format."
        [docs]="docs"
        [apiDocs]="['TreeTable', 'TreeTableNode', 'TreeNode']"
        [ptDocs]="ptComponent"
        themeDocs="treetable"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class TreeTableDemo {
    ptComponent = PTComponent;

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
            id: 'dynamiccolumns',
            label: 'Dynamic Columns',
            component: DynamicColumnsDoc
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
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
            label: 'Paginator',
            children: [
                {
                    id: 'paginatorbasic',
                    label: 'Basic',
                    component: PaginatorBasicDoc
                },
                {
                    id: 'paginatortemplate',
                    label: 'Template',
                    component: PaginatorTemplateDoc
                }
            ]
        },
        {
            id: 'sort',
            label: 'Sort',
            children: [
                {
                    id: 'sortsinglecolumn',
                    label: 'Single Column',
                    component: SortSingleColumnDoc
                },
                {
                    id: 'sortmultiplecolumns',
                    label: 'Multiple Columns',
                    component: SortMultipleColumnsDoc
                }
                // {
                //     id: 'sortremovable',
                //     label: 'Removable Sort',
                //     component: SortRemovableDoc
                // }
            ]
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'selection',
            label: 'Selection',
            children: [
                {
                    id: 'selectionsingle',
                    label: 'Single',
                    component: SelectionSingleDoc
                },
                {
                    id: 'selectionmultiple',
                    label: 'Multiple',
                    component: SelectionMultipleDoc
                },
                {
                    id: 'checkbox',
                    label: 'Checkbox',
                    component: SelectionCheckboxDoc
                },
                {
                    id: 'events',
                    label: 'Events',
                    component: SelectionEventsDoc
                }
            ]
        },
        {
            id: 'columngroup',
            label: 'Column Group',
            component: ColumnGroupDoc
        },
        {
            id: 'lazyload',
            label: 'Lazy Load',
            component: LazyLoadDoc
        },
        // {
        //     id: 'edit',
        //     label: 'Edit',
        //     component: EditDoc,
        // },
        {
            id: 'scroll',
            label: 'Scroll',
            children: [
                {
                    id: 'vertical',
                    label: 'Vertical',
                    component: ScrollVerticalDoc
                },
                {
                    id: 'flexible',
                    label: 'Flexible',
                    component: ScrollFlexibleDoc
                },
                {
                    id: 'horizontal',
                    label: 'Horizontal',
                    component: ScrollHorizontalDoc
                },
                {
                    id: 'frozencolumns',
                    label: 'Frozen Columns',
                    component: FrozenColumnsDoc
                }
            ]
        },
        {
            id: 'columnresize',
            label: 'Column Resize',
            children: [
                {
                    id: 'fitmode',
                    label: 'Fit Mode',
                    component: ResizeFitDoc
                },
                {
                    id: 'expandmode',
                    label: 'Expand Mode',
                    component: ResizeExpandDoc
                },
                {
                    id: 'scrollable',
                    label: 'Scrollable',
                    component: ResizeScrollableDoc
                }
            ]
        },
        {
            id: 'reorder',
            label: 'Reorder',
            component: ReorderDoc
        },
        {
            id: 'columntoggle',
            label: 'Column Toggle',
            component: ColumnToggleDoc
        },
        {
            id: 'conditionalstyle',
            label: 'Conditional Style',
            component: ConditionalStyleDoc
        },
        {
            id: 'contextmenu',
            label: 'Context Menu',
            component: ContextMenuDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
