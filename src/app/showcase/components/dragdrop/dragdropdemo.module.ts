import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropDemo} from './dragdropdemo';
import {DragDropDemoRoutingModule} from './dragdropdemo-routing.module';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';


@NgModule({
	imports: [
		CommonModule,
		DragDropDemoRoutingModule,
        DragDropModule,
        PanelModule,
        TableModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		DragDropDemo
	]
})
export class DragDropDemoModule {}
