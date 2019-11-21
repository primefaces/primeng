import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ProgressBarDemo} from './progressbardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ProgressBarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ProgressBarDemoRoutingModule {}
