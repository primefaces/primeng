import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {CardDemo} from './carddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: CardDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CardDemoRoutingModule {}
