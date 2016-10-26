import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResponsiveDemo} from './responsivedemo';
import {ResponsiveDemoRoutingModule} from './responsivedemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ResponsiveDemoRoutingModule
	],
	declarations: [
		ResponsiveDemo
	]
})
export class ResponsiveDemoModule {}
