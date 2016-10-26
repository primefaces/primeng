import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingDemo} from './ratingdemo';
import {RatingDemoRoutingModule} from './ratingdemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		RatingDemoRoutingModule
	],
	declarations: [
		RatingDemo
	]
})
export class RatingDemoModule {}
