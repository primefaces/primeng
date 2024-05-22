import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ButtonModule } from 'primeng/button';
import { BasicDoc } from './basicdoc';
import { TemplateDoc } from './templatedoc';
import { DynamicColumnsDoc } from './dynamiccolumnsdoc';
import { ImportDoc } from './importdoc';
import { PaginatorBasicDoc } from './paginatorbasicdoc';
import { PaginatorTemplateDoc } from './paginatortemplatedoc';
import { RouterModule } from '@angular/router';
import { SortSingleColumnDoc } from './sortsinglecolumndoc';
import { FilterDoc } from './filterdoc';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SelectionSingleDoc } from './selectionsingledoc';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectionMultipleDoc } from './selectionmultipledoc';
import { SelectionCheckboxDoc } from './selectioncheckboxdoc';
import { SelectionEventsDoc } from './selectioneventscdoc';
import { ToastModule } from 'primeng/toast';
import { ColumnGroupDoc } from './columngroupdoc';
import { LazyLoadDoc } from './lazyloaddoc';
import { EditDoc } from './editdoc';
import { ScrollVerticalDoc } from './scrollverticaldoc';
import { ScrollHorizontalDoc } from './scrollhorizontaldoc';
import { FrozenColumnsDoc } from './scrollfrozencolumnsdoc';
import { ResizeFitDoc } from './columnresizefitdoc';
import { ResizeExpandDoc } from './columnresizeexpanddoc';
import { ReorderDoc } from './reorderdoc';
import { ColumnToggleDoc } from './columntoggledoc';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConditionalStyleDoc } from './conditionalstyledoc';
import { ContextMenuDoc } from './contextmenudoc';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StyleDoc } from './styledoc';
import { ResizeScrollableDoc } from './columnresizescrollabledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { PaginatorLocaleDoc } from './paginatorlocaledoc';
import { SizeDoc } from './sizedoc';
import { GridlinesDoc } from './gridlinesdoc';
import { ControlledDoc } from './controlleddoc';
import { DeferredDemo } from '../../demo/deferreddemo';
import { SortMultipleColumnsDoc } from './sortmultiplecolumnsdoc';
import { ScrollFlexibleDoc } from './flexiblescrolldoc';
import { DialogModule } from 'primeng/dialog';
import { SortRemovableDoc } from './sortremovabledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, TreeTableModule, ButtonModule, RouterModule, InputTextModule, SelectButtonModule, FormsModule, InputSwitchModule, ToastModule, MultiSelectModule, ContextMenuModule, DialogModule, DeferredDemo],
    exports: [AppDocModule],
    declarations: [
        ImportDoc,
        BasicDoc,
        DynamicColumnsDoc,
        TemplateDoc,
        PaginatorBasicDoc,
        PaginatorTemplateDoc,
        SortSingleColumnDoc,
        SortMultipleColumnsDoc,
        SortRemovableDoc,
        FilterDoc,
        SelectionSingleDoc,
        SelectionMultipleDoc,
        SelectionCheckboxDoc,
        SelectionEventsDoc,
        ColumnGroupDoc,
        LazyLoadDoc,
        EditDoc,
        ScrollVerticalDoc,
        ScrollHorizontalDoc,
        ScrollFlexibleDoc,
        FrozenColumnsDoc,
        ResizeFitDoc,
        ResizeExpandDoc,
        ReorderDoc,
        ColumnToggleDoc,
        ConditionalStyleDoc,
        ContextMenuDoc,
        StyleDoc,
        AccessibilityDoc,
        PaginatorLocaleDoc,
        ResizeScrollableDoc,
        SizeDoc,
        GridlinesDoc,
        ControlledDoc
    ]
})
export class TreeTableDocModule {}
