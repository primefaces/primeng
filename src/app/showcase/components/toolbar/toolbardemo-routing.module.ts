import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ToolbarDemo} from './toolbardemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ToolbarDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ToolbarDemoRoutingModule {}
