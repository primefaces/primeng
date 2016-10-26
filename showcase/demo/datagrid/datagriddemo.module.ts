import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridDemo} from './datagriddemo';
import {DataGridDemoRoutingModule} from './datagriddemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DataGridDemoRoutingModule
	],
	declarations: [
		DataGridDemo
	]
})
export class DataGridDemoModule {}
