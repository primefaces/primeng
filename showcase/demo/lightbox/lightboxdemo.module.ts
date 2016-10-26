import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {LightboxDemo} from './lightboxdemo';
import {LightboxDemoRoutingModule} from './lightboxdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		LightboxDemoRoutingModule
	],
	declarations: [
		LightboxDemo
	]
})
export class LightboxDemoModule {}
