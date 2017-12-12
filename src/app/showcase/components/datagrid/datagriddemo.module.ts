import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridDemo} from './datagriddemo';
import {DataGridDemoRoutingModule} from './datagriddemo-routing.module';
import {DataGridModule} from '../../../components/datagrid/datagrid';
import {PanelModule} from '../../../components/panel/panel';
import {DialogModule} from '../../../components/dialog/dialog';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DataGridDemoRoutingModule,
        DataGridModule,
        PanelModule,
        DialogModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		DataGridDemo
	]
})
export class DataGridDemoModule {}
