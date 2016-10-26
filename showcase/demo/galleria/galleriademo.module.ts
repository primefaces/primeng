import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleriaDemo} from './galleriademo';
import {GalleriaDemoRoutingModule} from './galleriademo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		GalleriaDemoRoutingModule
	],
	declarations: [
		GalleriaDemo
	]
})
export class GalleriaDemoModule {}
