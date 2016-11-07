import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {LightboxDemo} from './lightboxdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: LightboxDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class LightboxDemoRoutingModule {}
