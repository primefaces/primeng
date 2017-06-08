import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ResponsiveDemo} from './responsivedemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ResponsiveDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ResponsiveDemoRoutingModule {}
