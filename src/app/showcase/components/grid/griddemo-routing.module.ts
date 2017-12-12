import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {GridDemo} from './griddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: GridDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class GridDemoRoutingModule {}
