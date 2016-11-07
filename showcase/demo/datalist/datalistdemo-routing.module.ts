import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DataListDemo} from './datalistdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DataListDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DataListDemoRoutingModule {}
