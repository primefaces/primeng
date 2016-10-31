import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {CarouselDemo} from './carouseldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: CarouselDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CarouselDemoRoutingModule {}
