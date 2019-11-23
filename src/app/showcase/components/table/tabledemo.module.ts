import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableDemo } from './tabledemo';
import { TablePageDemo } from './tablepagedemo';
import { TableSortDemo } from './tablesortdemo';
import { TableSelectionDemo } from './tableselectiondemo';
import { TableFilterDemo } from './tablefilterdemo';
import { TableSectionsDemo } from './tablesectionsdemo';
import { TableSubmenu } from './tablesubmenu';
import { TableStyleDemo } from './tablestyledemo';
import { TableLazyDemo } from './tablelazydemo';
import { TableExportDemo } from './tableexportdemo';
import { TableColGroupDemo } from './tablecolgroupdemo';
import { TableRowExpansionDemo } from './tablerowexpansiondemo';
import { TableScrollDemo } from './tablescrolldemo';
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
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TableDemoRoutingModule,
		TableModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
		InputTextModule,
		TabViewModule,
		CodeHighlighterModule
	],
	declarations: [
		TableSubmenu,
		TableDemo,
		TablePageDemo,
		TableSortDemo,
		TableSelectionDemo,
		TableSectionsDemo,
		TableFilterDemo,
		TableStyleDemo,
		TableLazyDemo,
		TableExportDemo,
		TableColGroupDemo,
		TableRowExpansionDemo,
		TableScrollDemo,
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
