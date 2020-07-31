import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {BadgeDemo} from './badgedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: BadgeDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class BadgeDemoRoutingModule {}
