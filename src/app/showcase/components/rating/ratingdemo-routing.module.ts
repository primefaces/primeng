import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {RatingDemo} from './ratingdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: RatingDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class RatingDemoRoutingModule {}
