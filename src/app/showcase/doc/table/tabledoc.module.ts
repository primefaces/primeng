import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { TableContextMenuDemo } from './contextmenudoc';
import { TableBasicDemo } from './basicdoc';
import { TableCellEditDemo } from './celleditdoc';
import { TableCheckboxSelectionDemo } from './checkboxselectiondoc';
import { TableColumnGroupDemo } from './columngroupdoc';
import { TableColumnResizeExpandModeDemo } from './columnresizeexpandmodedoc';
import { TableColumnResizeScrollableModeDemo } from './columnresizescrollablemodedoc';
import { TableColumnSelectionDemo } from './columnselectiondoc';
import { TableColumnToggleDemo } from './columntoggledoc';
import { TableControlledSelectionDemo } from './controlledselectiondoc';
import { TableCustomersDemo } from './customersdoc';
import { TableCustomSortDemo } from './customsortdoc';
import { TableDynamicDemo } from './dynamicdoc';
import { TableExpandableRowGroupDemo } from './expandablerowgroupdoc';
import { TableExportDemo } from './exportdoc';
import { TableFilterMenuDemo } from './filtermenudoc';
import { TableFilterRowDemo } from './filterrowdoc';
import { TableFlexibleScrollDemo } from './flexiblescrolldoc';
import { TableFrozenColumnsDemo } from './frozencolumnsdoc';
import { TableFrozenRowsDemo } from './frozenrowsdoc';
import { TableGridlinesDemo } from './gridlinesdoc';
import { ImportDoc } from './importdoc';
import { TableHorizontalAndVerticalScrollDemo } from './horizontalandverticaldoc';
import { TableLazyLoadDemo } from './lazyloaddoc';
import { TableMultipleSelectionDemo } from './multipleselectiondoc';
import { TablePageOnlySelectionDemo } from './pageonlyselectiondoc';
import { TablePaginatorBasicDemo } from './paginatorbasicdoc';
import { TablePaginatorProgrammaticDemo } from './paginatorprogrammaticdoc';
import { TableProductsDemo } from './productsdoc';
import { TableRadioButtonSelectionDemo } from './radiobuttonselectiondoc';
import { TableReorderDemo } from './reorderdoc';
import { TableResponsiveScrollDemo } from './responsivescrolldoc';
import { TableResponsiveStackDemo } from './responsivestackdoc';
import { TableRowEditDemo } from './roweditdoc';
import { TableRowExpandDemo } from './rowexpanddoc';
import { TableRowspanGroupingDemo } from './rowspangroupingdoc';
import { TableSingleColumnSortDemo } from './singlecolumnsortdoc';
import { TableSingleSelectionDemo } from './singleselectiondoc';
import { TableSizeDemo } from './sizedoc';
import { TableStatefulDemo } from './statefuldoc';
import { TableStickyDemo } from './stickydoc';
import { TableStripedDemo } from './stripeddoc';
import { TableStyleDemo } from './styledoc';
import { TableSubheaderGroupingDemo } from './subheadergroupingdoc';
import { TableTemplateDemo } from './templatedoc';
import { TableVerticalScrollDemo } from './verticalscrolldoc';
import { TableVirtualScrollDemo } from './virtualscrolldoc';
import { TableVirtualScrollLazyDemo } from './virtualscrolllazydoc';
import { TableColumnResizeFitModeDemo } from './columnresizefitmodedoc';
import { PropsDoc } from './propsdoc';
import { EventsDoc } from './eventsdoc';
import { StylingDoc } from './stylingdoc';
import { MethodsDoc } from './methodsdoc';
import { TemplatesDoc } from './templatesdoc';
import { TableSelectionEventsDemo } from './selectioneventsdoc';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        ConfirmDialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        InputSwitchModule,
        InputNumberModule,
        InputTextareaModule,
        ProgressBarModule,
        TooltipModule,
        RadioButtonModule,
        ToolbarModule,
        FileUploadModule,
        TabViewModule,
        ToggleButtonModule,
        RatingModule,
        SkeletonModule,
        SelectButtonModule,
        AppCodeModule,
        AppDocModule
    ],
    declarations: [
        ImportDoc,
        TableBasicDemo,
        TableDynamicDemo,
        TableCellEditDemo,
        TableCheckboxSelectionDemo,
        TableColumnGroupDemo,
        TableColumnResizeExpandModeDemo,
        TableColumnResizeScrollableModeDemo,
        TableColumnResizeFitModeDemo,
        TableColumnSelectionDemo,
        TableColumnToggleDemo,
        TableContextMenuDemo,
        TableControlledSelectionDemo,
        TableCustomersDemo,
        TableCustomSortDemo,
        TableDynamicDemo,
        TableExpandableRowGroupDemo,
        TableExportDemo,
        TableFilterMenuDemo,
        TableFilterRowDemo,
        TableFlexibleScrollDemo,
        TableFrozenColumnsDemo,
        TableFrozenRowsDemo,
        TableGridlinesDemo,
        TableHorizontalAndVerticalScrollDemo,
        TableLazyLoadDemo,
        TableMultipleSelectionDemo,
        TablePageOnlySelectionDemo,
        TablePaginatorBasicDemo,
        TableMultipleSelectionDemo,
        TablePageOnlySelectionDemo,
        TablePaginatorProgrammaticDemo,
        TableProductsDemo,
        TableRadioButtonSelectionDemo,
        TableReorderDemo,
        TableResponsiveScrollDemo,
        TableResponsiveStackDemo,
        TableRowEditDemo,
        TableRowExpandDemo,
        TableRowspanGroupingDemo,
        TableSingleColumnSortDemo,
        TableSingleSelectionDemo,
        TableSizeDemo,
        TableStatefulDemo,
        TableStickyDemo,
        TableStripedDemo,
        TableStyleDemo,
        TableSubheaderGroupingDemo,
        TableTemplateDemo,
        TableVerticalScrollDemo,
        TableVirtualScrollDemo,
        TableVirtualScrollLazyDemo,
        PropsDoc,
        EventsDoc,
        StylingDoc,
        MethodsDoc,
        TemplatesDoc,
        TableSelectionEventsDemo
    ],
    exports: [AppDocModule]
})
export class TableDocModule {}
