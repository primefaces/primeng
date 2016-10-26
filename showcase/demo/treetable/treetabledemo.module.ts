import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeTableDemo} from './treetabledemo';
import {TreeTableDemoRoutingModule} from './treetabledemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		TreeTableDemoRoutingModule
	],
	declarations: [
		TreeTableDemo
	]
})
export class TreeTableDemooModule {}
