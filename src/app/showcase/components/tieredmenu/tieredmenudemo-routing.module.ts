import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TieredMenuDemo} from './tieredmenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TieredMenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TieredMenuDemoRoutingModule {}
