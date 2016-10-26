import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselDemo} from './carouseldemo';
import {CarouselDemoRoutingModule} from './carouseldemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		CarouselDemoRoutingModule
	],
	declarations: [
		CarouselDemo
	]
})
export class CarouselDemoModule {}
