import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarDemo} from './menubardemo';
import {MenubarDemoRoutingModule} from './menubardemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		MenubarDemoRoutingModule
	],
	declarations: [
		MenubarDemo
	]
})
export class MenubarDemoModule {}
