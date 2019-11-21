import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {PanelMenuDemo} from './panelmenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: PanelMenuDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class PanelMenuDemoRoutingModule {}
