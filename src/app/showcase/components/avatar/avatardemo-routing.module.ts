import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {AvatarDemo} from './avatardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: AvatarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class AvatarDemoRoutingModule {}
