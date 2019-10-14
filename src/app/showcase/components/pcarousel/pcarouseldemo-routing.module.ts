import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {PCarouselDemo} from './pcarouseldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: PCarouselDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CarouselDemoRoutingModule {}
