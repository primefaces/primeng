import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DataViewDemo} from './dataviewdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'', component: DataViewDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DataViewDemoRoutingModule {}
