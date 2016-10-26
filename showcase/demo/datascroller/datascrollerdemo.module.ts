import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataScrollerDemo} from './datascrollerdemo';
import {DataScrollerInfiniteDemo} from './datascrollerinfinitedemo';
import {DataScrollerInlineDemo} from './datascrollerinlinedemo';
import {DataScrollerLoaderDemo} from './datascrollerloaderdemo';
import {DatascrollerDemoRoutingModule} from './datascrollerdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DatascrollerDemoRoutingModule
	],
	declarations: [
		DataScrollerDemo,
        DataScrollerInfiniteDemo,
        DataScrollerInlineDemo,
        DataScrollerLoaderDemo
	]
})
export class DatascrollerDemoModule {}
