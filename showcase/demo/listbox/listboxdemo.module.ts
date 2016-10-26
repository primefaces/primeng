import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListboxDemo} from './listboxdemo';
import {ListboxDemoRoutingModule} from './listboxdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ListboxDemoRoutingModule
	],
	declarations: [
		ListboxDemo
	]
})
export class ListboxDemoModule {}
