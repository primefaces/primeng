import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicDialogModule} from '../../../components/dynamicdialog/dynamicdialog';
import {DynamicDialogDemo} from './dynamicdialogdemo';
import {DynamicDialogDemoRoutingModule} from './dynamicdialogdemo-routing.module';
import {CarsListDemo} from './carslistdemo';
import {ToastModule} from '../../../components/toast/toast';
import {TableModule} from '../../../components/table/table';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		DynamicDialogDemoRoutingModule,
		DynamicDialogModule,
		ToastModule,
		TableModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		DynamicDialogDemo,
		CarsListDemo
	],
	entryComponents: [
		CarsListDemo
	]
})
export class DynamicDialogDemoModule {}
