import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {MenubarDemo} from './menubardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MenubarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MenubarDemoRoutingModule {}
