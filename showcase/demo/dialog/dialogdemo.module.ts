import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogDemo} from './dialogdemo';
import {DialogDemoRoutingModule} from './dialogdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DialogDemoRoutingModule
	],
	declarations: [
		DialogDemo
	]
})
export class DialogDemoModule {}
