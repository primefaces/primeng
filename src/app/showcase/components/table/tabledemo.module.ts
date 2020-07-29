import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableDemo } from './tabledemo';
import { TableBasicDemo } from './tablebasicdemo';
import { TableDynamicDemo } from './tabledynamicdemo';
import { TableTemplatingDemo } from './tabletemplatingdemo';
import { TableSizeDemo } from './tablesizedemo';
import { TableGridLinesDemo } from './tablegridlinesdemo';
import { TableStripedDemo } from './tablestripeddemo';
import { TablePageDemo } from './tablepagedemo';
import { TableSortDemo } from './tablesortdemo';
import { TableSelectionDemo } from './tableselectiondemo';
import { TableFilterDemo } from './tablefilterdemo';
import { TableStyleDemo } from './tablestyledemo';
import { TableLazyDemo } from './tablelazydemo';
import { TableExportDemo } from './tableexportdemo';
import { TableColGroupDemo } from './tablecolgroupdemo';
import { TableRowExpansionDemo } from './tablerowexpansiondemo';
import { TableScrollDemo } from './tablescrolldemo';
import { TableVirtualScrollDemo } from './tablevirtualscrolldemo';
import { TableFlexScrollDemo } from './tableflexscrolldemo';
import { TableColToggleDemo } from './tablecoltoggledemo';
import { TableCrudDemo } from './tablecruddemo';
import { TableResponsiveDemo } from './tableresponsivedemo';
import { TableContextMenuDemo } from './tablecontextmenudemo';
import { TableColResizeDemo } from './tablecolresizedemo';
import { TableReorderDemo } from './tablereorderdemo';
import { TableEditDemo } from './tableeditdemo';
import { TableStateDemo } from './tablestatedemo';
import { TableStickyDemo } from './tablestickydemo';
import { TableRowGroupDemo } from './tablerowgroupdemo';
import { TableDemoRoutingModule } from './tabledemo-routing.module';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TableDemoRoutingModule,
        TableModule,
        CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
        InputTextModule,
        ProgressBarModule,
        TooltipModule,
        TabViewModule,
        RatingModule,
        CodeHighlighterModule,
        AppCodeModule
	],
	declarations: [
		TableDemo,
		TableBasicDemo,
		TableDynamicDemo,
        TableTemplatingDemo,
        TableSizeDemo,
        TableGridLinesDemo,
        TableStripedDemo,
		TablePageDemo,
		TableSortDemo,
		TableSelectionDemo,
		TableFilterDemo,
		TableStyleDemo,
		TableLazyDemo,
		TableExportDemo,
		TableColGroupDemo,
		TableRowExpansionDemo,
        TableScrollDemo,
        TableVirtualScrollDemo,
        TableFlexScrollDemo,
		TableColToggleDemo,
		TableCrudDemo,
		TableResponsiveDemo,
		TableContextMenuDemo,
		TableColResizeDemo,
		TableReorderDemo,
		TableEditDemo,
        TableRowGroupDemo,
        TableStateDemo,
        TableStickyDemo
	]
})
export class TableDemoModule { }
