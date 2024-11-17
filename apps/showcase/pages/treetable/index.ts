import { AccessibilityDoc } from '@/doc/treetable/accessibilitydoc';
import { BasicDoc } from '@/doc/treetable/basicdoc';
import { ColumnGroupDoc } from '@/doc/treetable/columngroupdoc';
import { ResizeExpandDoc } from '@/doc/treetable/columnresizeexpanddoc';
import { ResizeFitDoc } from '@/doc/treetable/columnresizefitdoc';
import { ResizeScrollableDoc } from '@/doc/treetable/columnresizescrollabledoc';
import { ColumnToggleDoc } from '@/doc/treetable/columntoggledoc';
import { ConditionalStyleDoc } from '@/doc/treetable/conditionalstyledoc';
import { ContextMenuDoc } from '@/doc/treetable/contextmenudoc';
import { ControlledDoc } from '@/doc/treetable/controlleddoc';
import { DynamicColumnsDoc } from '@/doc/treetable/dynamiccolumnsdoc';
import { FilterDoc } from '@/doc/treetable/filterdoc';
import { ScrollFlexibleDoc } from '@/doc/treetable/flexiblescrolldoc';
import { GridlinesDoc } from '@/doc/treetable/gridlinesdoc';
import { ImportDoc } from '@/doc/treetable/importdoc';
import { LazyLoadDoc } from '@/doc/treetable/lazyloaddoc';
import { PaginatorBasicDoc } from '@/doc/treetable/paginatorbasicdoc';
import { PaginatorLocaleDoc } from '@/doc/treetable/paginatorlocaledoc';
import { PaginatorTemplateDoc } from '@/doc/treetable/paginatortemplatedoc';
import { ReorderDoc } from '@/doc/treetable/reorderdoc';
import { FrozenColumnsDoc } from '@/doc/treetable/scrollfrozencolumnsdoc';
import { ScrollHorizontalDoc } from '@/doc/treetable/scrollhorizontaldoc';
import { ScrollVerticalDoc } from '@/doc/treetable/scrollverticaldoc';
import { SelectionCheckboxDoc } from '@/doc/treetable/selectioncheckboxdoc';
import { SelectionEventsDoc } from '@/doc/treetable/selectioneventscdoc';
import { SelectionMultipleDoc } from '@/doc/treetable/selectionmultipledoc';
import { SelectionSingleDoc } from '@/doc/treetable/selectionsingledoc';
import { SizeDoc } from '@/doc/treetable/sizedoc';
import { SortMultipleColumnsDoc } from '@/doc/treetable/sortmultiplecolumnsdoc';
import { SortSingleColumnDoc } from '@/doc/treetable/sortsinglecolumndoc';
import { TemplateDoc } from '@/doc/treetable/templatedoc';
import { TreeTableDocModule } from '@/doc/treetable/treetabledoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular TreeTable Component"
        header="TreeTable"
        description="TreeTable is used to display hierarchical data in tabular format."
        [docs]="docs"
        [apiDocs]="['TreeTable', 'TreeTableNode', 'TreeNode']"
        themeDocs="treetable"
    ></app-doc>`,
    standalone: true,
    imports: [TreeTableDocModule]
})
export class TreeTableDemo {
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
            id: 'paginator',
            label: 'Paginator',
            children: [
                {
                    id: 'paginatorbasic',
                    label: 'Basic',
                    component: PaginatorBasicDoc
                },
                {
                    id: 'paginatorlocale',
                    label: 'Locale',
                    component: PaginatorLocaleDoc
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
