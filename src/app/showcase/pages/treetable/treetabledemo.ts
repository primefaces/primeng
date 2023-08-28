import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/treetable/importdoc';
import { BasicDoc } from '../../doc/treetable/basicdoc';
import { DynamicColumnsDoc } from '../../doc/treetable/dynamiccolumnsdoc';
import { TemplateDoc } from '../../doc/treetable/templatedoc';
import { PaginatorBasicDoc } from '../../doc/treetable/paginatorbasicdoc';
import { PaginatorTemplateDoc } from '../../doc/treetable/paginatortemplatedoc';
import { SortSingleColumnDoc } from '../../doc/treetable/sortsinglecolumndoc';
import { SortMultipleColumnDoc } from '../../doc/treetable/sortmultiplecolumndoc';
import { FilterDoc } from '../../doc/treetable/filterdoc';
import { SelectionSingleDoc } from '../../doc/treetable/selectionsingledoc';
import { SelectionMultipleDoc } from '../../doc/treetable/selectionmultipledoc';
import { SelectionCheckboxDoc } from '../../doc/treetable/selectioncheckboxdoc';
import { SelectionEventsDoc } from '../../doc/treetable/selectioneventscdoc';
import { ColumnGroupDoc } from '../../doc/treetable/columngroupdoc';
import { LazyLoadDoc } from '../../doc/treetable/lazyloaddoc';
import { EditDoc } from '../../doc/treetable/editdoc';
import { ScrollVerticalDoc } from '../../doc/treetable/scrollverticaldoc';
import { ScrollHorizontalDoc } from '../../doc/treetable/scrollhorizontaldoc';
import { FrozenColumnsDoc } from '../../doc/treetable/scrollfrozencolumnsdoc';
import { ResizeFitDoc } from '../../doc/treetable/columnresizefitdoc';
import { ResizeExpandDoc } from '../../doc/treetable/columnresizeexpanddoc';
import { ReorderDoc } from '../../doc/treetable/reorderdoc';
import { ColumnToggleDoc } from '../../doc/treetable/columntoggledoc';
import { ConditionalStyleDoc } from '../../doc/treetable/conditionalstyledoc';
import { ContextMenuDoc } from '../../doc/treetable/contextmenudoc';
import { StyleDoc } from '../../doc/treetable/styledoc';
import { AccessibilityDoc } from '../../doc/treetable/accessibilitydoc';
import { PaginatorLocaleDoc } from '../../doc/treetable/paginatorlocaledoc';

@Component({
    templateUrl: './treetabledemo.html'
})
export class TreeTableDemo {
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
            id: 'dynamiccolumns',
            label: 'Dynamic Columns',
            component: DynamicColumnsDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
                    id: 'sortmultiplecolumn',
                    label: 'Multiple Column',
                    component: SortMultipleColumnDoc
                }
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
        {
            id: 'edit',
            label: 'Edit',
            component: EditDoc
        },
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
